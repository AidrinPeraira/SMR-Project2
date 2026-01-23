import { Response } from "express";
import {
  AppError,
  AppMessages,
  HttpStatus,
  logger,
  makeFailedResponse,
  AppErrorCode,
} from "@smr/shared";

/**
 * This is a reusable function that is used to handle errors in the
 * catch block. It handles the differnet types of errors that can occur.
 *
 * The location of the error is passes as 'context'
 *
 * @param res response object
 * @param error error caught
 * @param context the location where this function is called
 * @returns void. This funciton sends the response to client
 */
export const handleControllerError = (
  res: Response,
  error: unknown,
  context: string,
) => {
  if (error instanceof AppError) {
    logger.error(`${context} AppError: ${error.message}`, error.details);
    return res
      .status(error.httpStatus)
      .json(
        makeFailedResponse(
          error.message,
          error.message,
          error.code,
          error.details,
        ),
      );
  }

  if (error instanceof Error) {
    logger.error(`${context} Error: ${error.message}`, { stack: error.stack });
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        makeFailedResponse(
          error.message,
          AppMessages.INTERNAL_ERROR,
          AppErrorCode.INTERNAL_ERROR,
        ),
      );
  }

  logger.error(`${context} Unknown Error:`, error);
  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json(
      makeFailedResponse(
        AppMessages.INTERNAL_ERROR,
        AppMessages.INTERNAL_ERROR,
        AppErrorCode.INTERNAL_ERROR,
      ),
    );
};
