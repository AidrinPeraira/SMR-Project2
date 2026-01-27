import { DriverApplicationActionDTO } from "@/application/dto/DriverApplicationDTO.js";
import { IProcessDriverApplicationUseCase } from "@/application/interfaces/use-case/admin/driver/IProcessDriverApplicationUseCase.js";
import { IAdminController } from "@/presentation/interfaces/IAdminController";
import { handleControllerError } from "@/presentation/utils/ErrorHandler.js";
import {
  DriverApplicationStatus,
  DriverMessages,
  HttpStatus,
  makeSuccessResponse,
} from "@smr/shared";
import { Request, Response } from "express";
import { logger } from "@smr/shared/logger";

export class AdminController implements IAdminController {
  constructor(
    private readonly _processDriverApplicationUseCase: IProcessDriverApplicationUseCase,
  ) {}

  async processDriverApplication(req: Request, res: Response): Promise<void> {
    try {
      const action: DriverApplicationActionDTO = req.body;

      logger.info(
        `Processing driver application: ${action.applicationId} by admin: ${action.adminId}`,
      );

      await this._processDriverApplicationUseCase.execute(action);

      logger.info(
        `Processed driver application: ${action.applicationId} by admin: ${action.adminId}`,
      );

      const message =
        action.applicationStatus === DriverApplicationStatus.APPROVED
          ? DriverMessages.DRIVER_APPLICATION_APPROVED
          : DriverMessages.DRIVER_APPLICATION_REJECTED;

      res.status(HttpStatus.OK).json(makeSuccessResponse(message));
    } catch (error) {
      handleControllerError(
        res,
        error,
        "Process Driver Application Controller",
      );
    }
  }
}
