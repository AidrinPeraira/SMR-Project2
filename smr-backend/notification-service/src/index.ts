import { AppConfig } from "@/application.config.js";
import { NotificationProcessor } from "@/application/NotificationProcessor.js";
import { NodemailerEmailService } from "@/infrastructure/email/NodeMailerService.js";
import { RabbitMQConsumer } from "@/infrastructure/rabbitmq/RabbitMQConsumer.js";
import { logger } from "@smr/shared/logger";
import express from "express";

async function startServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // connect ot rabbit mq
  const emailService = new NodemailerEmailService();
  const processor = new NotificationProcessor(emailService);
  const consumer = new RabbitMQConsumer(processor);

  await consumer.start();

  const PORT = Number(AppConfig.PORT) || 4002;
  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`Notification Service listening on port ${PORT}`);
  });

  return app;
}

startServer().catch((err) => {
  logger.error("Notification service failed to start", err);
  process.exit(1);
});
