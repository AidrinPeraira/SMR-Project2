import { ICreateDriverApplicationUseCase } from "@/application/interfaces/use-case/driver/ICreateDriverApplicationUseCase.js";
import { IDriverController } from "@/presentation/interfaces/IDriverController.js";
import {
  toDriverApplicationInput,
  toDriverApplicationResponse,
} from "@/presentation/mapper/DriverMapper.js";
import { handleControllerError } from "@/presentation/utils/ErrorHandler.js";
import { DriverMessages, HttpStatus, makeSuccessResponse } from "@smr/shared";
import { logger } from "@smr/shared/logger";
import { Request, Response } from "express";

export class DriverController implements IDriverController {
  constructor(
    private readonly _createDriverApplicationUseCase: ICreateDriverApplicationUseCase,
  ) {}

  async createApplication(req: Request, res: Response): Promise<void> {
    try {
      const applicationData = toDriverApplicationInput(req);

      logger.info(`New Driver Application: ${applicationData.userId}`);

      const result =
        await this._createDriverApplicationUseCase.execute(applicationData);

      logger.info(`New Driver Applied: ${applicationData.userId}`);
      res
        .status(HttpStatus.CREATED)
        .json(
          makeSuccessResponse(
            DriverMessages.DRIVER_APPLICATION_SUCCESS,
            toDriverApplicationResponse(result),
          ),
        );
    } catch (error: unknown) {
      handleControllerError(res, error, "Driver Controller");
    }
  }
}
