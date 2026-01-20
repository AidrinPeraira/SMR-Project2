import dotenv from "dotenv";

dotenv.config();

export const AppConfig = {
  OTP_LENGTH: Number(process.env.OTP_LENGTH) || 6,
  OTP_EXPIRY_SECONDS: Number(process.env.OTP_EXPIRY_SECONDS) || 60,
  DB_URL: String(process.env.DB_URL) || "mongodb://127.0.0.1:27017/shareMyRide",
  ACCESS_TOKEN_SECRET:
    String(process.env.ACCESS_TOKEN_SECRET) || "your-access-secret",
  REFRESH_TOKEN_SECRET:
    String(process.env.REFRESH_TOKEN_SECRET) || "your-refresh-secret",
};
