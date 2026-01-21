import dotenv from "dotenv";

dotenv.config();

export const AppConfig = {
  PORT: Number(process.env.PORT) || 4000,
  NODE_ENV: String(process.env.NODE_ENV) || "production",

  AUTH_SERVICE_URL:
    String(process.env.AUTH_SERVICE_URL) || "http://localhost:4001",

  ACCESS_TOKEN_SECRET:
    String(process.env.ACCESS_TOKEN_SECRET) || "your-access-secret",
  REFRESH_TOKEN_SECRET:
    String(process.env.REFRESH_TOKEN_SECRET) || "your-refresh-secret",
};
