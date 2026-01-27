import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  AppError,
  AppErrorCode,
  AppMessages,
  HttpStatus,
  makeFailedResponse,
} from "@smr/shared";
import { createAuthRouter } from "@/presentation/routes/AuthRouter.js";
import { authController } from "@/presentation/factories/AuthControllerFactory.js";
import { createDriverRouter } from "@/presentation/routes/DriverRoutes.js";
import { driverController } from "@/presentation/factories/DriverControllerFactory.js";
import { createAdminRouter } from "@/presentation/routes/AdminRoutes.js";
import { adminController } from "@/presentation/factories/AdminControllerFactory.js";
import { createProfileRouter } from "@/presentation/routes/ProfileRouter.js";
import { profileController } from "@/presentation/factories/ProfileControllerFactory.js";
import { httpLogger, logger } from "@smr/shared/logger";

export function createApp() {
  dotenv.config({ override: false });

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //loging http requests
  app.use(httpLogger);

  app.set("trust proxy", 1); //this is needed to handle request forwarding issues that come from request hopping across services.

  //mounting the routers
  app.use("/auth", createAuthRouter(authController));
  app.use("/driver", createDriverRouter(driverController));
  app.use("/admin", createAdminRouter(adminController));
  app.use("/profile", createProfileRouter(profileController));

  //global error handler
  app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    logger.error("Error caught by global handler:", err);

    if (err instanceof AppError) {
      return res
        .status(err.httpStatus)
        .json(
          makeFailedResponse(err.message, err.message, err.code, err.details),
        );
    }

    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        makeFailedResponse(
          AppMessages.INTERNAL_ERROR,
          err instanceof Error ? err.message : "Unknown error",
          AppErrorCode.INTERNAL_ERROR,
        ),
      );

    next();
  });

  return app;
}
