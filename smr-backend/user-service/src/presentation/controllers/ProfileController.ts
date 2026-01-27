import { IGetProfileUseCase } from "@/application/interfaces/use-case/auth/IGetProfileUseCase.js";
import { IProfileController } from "@/presentation/interfaces/IProfileController.js";
import { handleControllerError } from "@/presentation/utils/ErrorHandler.js";
import {
  AppError,
  AppErrorCode,
  AuthMessages,
  HttpStatus,
  makeSuccessResponse,
} from "@smr/shared";
import { Request, Response } from "express";
import { logger } from "@smr/shared/logger";

export class ProfileController implements IProfileController {
  constructor(private readonly _getProfileUseCase: IGetProfileUseCase) {}

  /**
   * This function gets the profile of the current logged in user
   *
   * @param req request object with user id
   * @param res response object
   */
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const headerValue = req.headers["x-user-id"];
      const userId = Array.isArray(headerValue) ? headerValue[0] : headerValue;

      if (!userId) {
        throw new AppError(
          AppErrorCode.UNAUTHORIZED,
          AuthMessages.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED,
        );
      }

      logger.info(`Get Profile attempt: ${userId}`);

      const profile = await this._getProfileUseCase.execute(userId);

      logger.info(`Profile fetched successfully: ${userId}`);

      res
        .status(HttpStatus.OK)
        .json(makeSuccessResponse("Profile fetched successfully", profile));
    } catch (error: unknown) {
      handleControllerError(res, error, "Get Profile Controller");
    }
  }
}
