import dotenv from "dotenv";

dotenv.config();

export const AppConfig = {
  PORT: Number(process.env.PORT) || 4001,
  NODE_ENV: String(process.env.NODE_ENV) || "production",
  OTP_LENGTH: Number(process.env.OTP_LENGTH) || 6,
  OTP_EXPIRY_SECONDS: Number(process.env.OTP_EXPIRY_SECONDS) || 60,
  DB_URL: String(process.env.DB_URL) || "mongodb://127.0.0.1:27017/shareMyRide",
  ACCESS_TOKEN_SECRET:
    String(process.env.ACCESS_TOKEN_SECRET) || "your-access-secret",
  REFRESH_TOKEN_SECRET:
    String(process.env.REFRESH_TOKEN_SECRET) || "your-refresh-secret",

  ACCESS_TOKEN_LIFE: Number(process.env.ACCESS_TOKEN_LIFE) || 900,
  REFRESH_TOKEN_LIFE: Number(process.env.REFRESH_TOKEN_LIFE) || 172800,

  RABBITMQ_URL:
    String(process.env.RABBITMQ_URL) || "amqp://guest:guest@rabbit-mq:5672",
  EXCHANGE_NAME: String(process.env.EXCHANGE_NAME) || "sharemyride.events",

  GENERIC_TOKEN_SECRET:
    String(process.env.GENERIC_TOKEN_SECRET) || "random-long-secret-key",
};
