import { AppConfig } from "@/application.config.js";
import { INotificationProcessor } from "@/application/interfaces/INotificationProcessor.js";
import { DomainEvent, EventName } from "@smr/shared";
import { logger } from "@smr/shared/logger";

import amqp from "amqplib";

export class RabbitMQConsumer {
  constructor(private _notificationProcessor: INotificationProcessor) {}

  async start(): Promise<void> {
    try {
      logger.info("Connecting to RabbitMQ.");

      const connection = await amqp.connect(AppConfig.RABBITMQ_URL);
      const channel = await connection.createChannel();

      const EXCHANGE = AppConfig.NOTIFICATION_EXCHANGE_NAME;
      const QUEUE = AppConfig.NOTIFICATION_QUEUE_OTP;

      await channel.assertExchange(EXCHANGE, "topic", { durable: true });
      await channel.assertQueue(QUEUE, { durable: true });

      //we keep looking into the following queues
      await channel.bindQueue(QUEUE, EXCHANGE, EventName.SEND_EMAIL_OTP);
      await channel.bindQueue(
        QUEUE,
        EXCHANGE,
        EventName.DRIVER_APPLICATION_APPROVED,
      );
      await channel.bindQueue(
        QUEUE,
        EXCHANGE,
        EventName.DRIVER_APPLICATION_REJECTED,
      );

      logger.info("Notification service consumer connected to RabbitMQ");

      //reconnect on failure.
      connection.on("close", () => {
        logger.error("RabbitMQ connection closed. Reconnecting");
        setTimeout(() => this.start(), 5000);
      });

      connection.on("error", (err) => {
        logger.error("RabbitMQ connection error:", err);
      });

      channel.consume(
        QUEUE,
        async (msg) => {
          if (!msg) return;

          try {
            const event = JSON.parse(msg.content.toString()) as DomainEvent;
            logger.info(`Received event: ${event.event}`);

            await this._notificationProcessor.process(event);

            //acknowledge consumption of event
            channel.ack(msg);
          } catch (err) {
            logger.error("Error processing event:", err);
            channel.nack(msg, false, false);
          }
        },
        { noAck: false }, //don't delete unless acknowledged
      );
    } catch (error) {
      logger.error("RabbitMQ connection failed: ", error);

      // Retry after 5 seconds
      setTimeout(() => {
        void this.start();
      }, 5000);
    }
  }
}
