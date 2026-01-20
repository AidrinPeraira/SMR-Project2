import dotenv from "dotenv";

dotenv.config();

export const AppConfig = {
  OTP_LENGTH: Number(process.env.OTP_LENGTH) ?? 6,
  OTP_EXPIRY_SECONDS: Number(process.env.OTP_EXPIRY_SECONDS) ?? 60,
};
