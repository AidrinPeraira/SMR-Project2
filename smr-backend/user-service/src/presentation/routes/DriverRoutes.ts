import { IDriverController } from "@/presentation/interfaces/IDriverController";
import { asyncHandler } from "@/presentation/utils/AsyncHandler";
import { Router } from "express";

export function createDriverRouter(driverController: IDriverController) {
  const router = Router();

  router.post(
    "/create-application",
    asyncHandler(driverController.createApplication.bind(driverController)),
  );

  return router;
}
