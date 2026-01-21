import winston from "winston";
import { ILogger } from "./interface";

const { combine, timestamp, printf, colorize, json } = winston.format;

const devFormat = combine(
  colorize(),
  timestamp(),
  printf((info) => {
    const { level, message, timestamp, ...meta } = info as any;
    const safeMessage =
      typeof message === "string" ? message : JSON.stringify(message);
    return `${timestamp} [${level}]: ${safeMessage} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
  }),
);

const prodFormat = combine(timestamp(), json());

class WinstonLogger implements ILogger {
  private logger: winston.Logger;

  constructor() {
    // In shared libs, use process.env directly or a default
    const isProd = process.env.NODE_ENV === "production";
    this.logger = winston.createLogger({
      level: isProd ? "info" : "debug",
      format: isProd ? prodFormat : devFormat,
      transports: [new winston.transports.Console()],
    });
  }

  error(msg: string, meta?: any) {
    this.logger.error(msg, meta);
  }
  warn(msg: string, meta?: any) {
    this.logger.warn(msg, meta);
  }
  info(msg: string, meta?: any) {
    this.logger.info(msg, meta);
  }
  debug(msg: string, meta?: any) {
    this.logger.debug(msg, meta);
  }

  http(msg: string, meta?: any) {
    this.logger.http(msg, meta);
  }
}

export const logger = new WinstonLogger();
