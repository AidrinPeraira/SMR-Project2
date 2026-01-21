import dotenv from "dotenv";

dotenv.config();

export const AppConfig = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: process.env.NOTIFICATION_SERVICE_PORT ?? "4002",

  RABBITMQ_URL: process.env.RABBITMQ_URL ?? "amqp://guest:guest@rabbit-mq:5672",
  NOTIFICATION_EXCHANGE_NAME: process.env.EXCHANGE_NAME ?? "sharemyride.events",
  NOTIFICATION_QUEUE_OTP:
    process.env.QUEUE_NAME ?? "notification-service.email",

  NODEMAILER_EMAIL_USER: process.env.NODEMAILER_EMAIL_USER ?? "",
  NODEMAILER_EMAIL_PASS: process.env.NODEMAILER_EMAIL_PASS ?? "",
};
