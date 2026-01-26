import { Router } from "express";
import { IProfileController } from "@/presentation/interfaces/IProfileController.js";
import { asyncHandler } from "@/presentation/utils/AsyncHandler.js";

export function createProfileRouter(profileController: IProfileController) {
  const router = Router();

  router.get(
    "/",
    asyncHandler(profileController.getProfile.bind(profileController)),
  );

  return router;
}
