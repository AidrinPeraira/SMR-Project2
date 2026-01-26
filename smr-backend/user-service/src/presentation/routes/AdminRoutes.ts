import { IAdminController } from "@/presentation/interfaces/IAdminController";
import { Router } from "express";

export function createAdminRouter(adminController: IAdminController) {
  const router = Router();

  router.post(
    "/driver/process-application",
    adminController.processDriverApplication.bind(adminController),
  );

  return router;
}
