import { logger } from "logger/winston.js";
import morgan, { StreamOptions } from "morgan";

// Connect Morgan to your Winston 'http' method
const stream: StreamOptions = {
  write: (message) => logger.http(message.trim()),
};

// Only log 4xx and 5xx errors in production if you want to reduce noise
// or keep it simple as you had it:
const skip = () => false;

const morganFormat =
  ":method :url :status :res[content-length] - :response-time ms";

export const httpLogger = morgan(morganFormat, { stream, skip });
