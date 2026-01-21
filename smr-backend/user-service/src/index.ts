import { createApp } from "@/app.js";
import { AppConfig } from "@/application.config.js";
import { connectToDatabase } from "@/infrastructure/database/mongo-connection.js";
import { eventBus } from "@/presentation/factories/EventBusFactory.js";
import { logger } from "@smr/shared";

async function startServer(): Promise<void> {
  const app = createApp();
  const PORT = Number(AppConfig.PORT);

  //this wrapper is to make testing simple.
  if (AppConfig.NODE_ENV !== "test") {
    await connectToDatabase();
  }

  await eventBus.connect();

  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`The user service is running at port: ${PORT}.`);
  });
}

startServer().catch((error: unknown) => {
  logger.error("Error: Failed to start the user-service server: ", error);
});
