import { AppConfig } from "@/application.config.js";
import { logger } from "@smr/shared";
import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(AppConfig.DB_URL);
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}
