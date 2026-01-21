import { AppConfig } from "@/application.config.js";
import { RabbitMQEventBus } from "@/infrastructure/services/EventBus.js";

export const eventBus = new RabbitMQEventBus(
  AppConfig.RABBITMQ_URL,
  AppConfig.EXCHANGE_NAME,
);
