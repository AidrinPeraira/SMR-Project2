import { IEventBus } from "@/application/interfaces/service/IEventBus.js";
import { DomainEvent, logger } from "@smr/shared";
import amqp from "amqplib";

type AmqpConnection = Awaited<ReturnType<typeof amqp.connect>>;
type AmqpChannel = Awaited<ReturnType<AmqpConnection["createChannel"]>>;

export class RabbitMQEventBus implements IEventBus {
  /**
   * connection is the connectoin object that communicates with the rabbimtMq server
   *
   * channel is the individual connection within the main connection. there can be many.
   *      -> Documentaion: "connections are multiplexed with channels that can be thought of as "lightweight connections that share a single TCP connection""
   *
   * url is the url or link to rabbit mq server
   *
   * exhange name is the name given to a instance that handles a set of queues and streams
   *      -> analogy: a express router directs the request to the right controller function which are many.
   */
  private _connection: AmqpConnection | null = null;
  private _channel: AmqpChannel | null = null;
  private readonly _url: string;
  private readonly _exchangeName: string;

  /**
   *
   * @param url the url of the rabbit mq server
   * @param exchangeName any custom name for the exchang if any
   */
  constructor(url: string, exchangeName = "sharemyride.events") {
    this._url = url;
    this._exchangeName = exchangeName;
  }

  /**
   * Method to estabilish connection to RabbitMQ server
   * - creates a connection exchanfe and a channel
   * - retries if connection fails or closes
   */
  async connect(): Promise<void> {
    try {
      logger.info("Initating connection to RabbitMQ");

      this._connection = await amqp.connect(this._url);
      this._channel = await this._connection.createChannel();

      /**
       * assertExchange: Checks if an exchange named "sharemyride.events" exists. If not, it creates it.
       * "topic": Sets the type to "Topic Exchange". This is crucial for routing. It allows you to route messages based on patterns (e.g., user.* gets all user events).
       * durable: true: Ensures the exchange survives if RabbitMQ restarts.
       */
      await this._channel.assertExchange(this._exchangeName, "topic", {
        durable: true,
      });

      logger.info(`RabbitMQ connected. exchange: ${this._exchangeName}`);

      this._connection.on("close", () => {
        logger.error("RabbitMQ connection closed. Retrying connection.");
        setTimeout(() => {
          void this.connect();
        }, 5000);
      });
    } catch (error) {
      logger.error("RabbitMQ connection failed:", error);
      setTimeout(() => {
        void this.connect();
      }, 5000);
    }
  }

  async publish(event: DomainEvent): Promise<void> {
    if (!this._channel) {
      logger.error("RabbitMQ channel not ready. Event dropped. Event: ", event);
    }

    /**
     * Routing Key is a short string (like an address or label) that you attach to a message when you publish it.
     * The RabbitMQ Exchange uses this key to decide which Queue should receive the message
     */
    const routingKey = this.getRoutingKey(event);

    this._channel?.publish(
      this._exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(event)),
      { persistent: true },
    );

    logger.info(`RabbitMQ event published. Routing Key: ${routingKey}`);
  }

  /**
   * helper function to get routing key from event object
   * What it does:
   *  - Checks if the event object has a property called event (e.g., { event: "USER_CREATED", data: ... }).
   *  - If not, gives it a fallback name "unknown.event".
   *  - Crucial logic: It replaces dots (.) with underscores (_).
   */
  private getRoutingKey(event: DomainEvent): string {
    return event.event;
  }
}
