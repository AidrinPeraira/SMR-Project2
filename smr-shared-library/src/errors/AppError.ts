import { AppErrorCode, HttpStatus } from "enums";

export class AppError extends Error {
  public readonly code: AppErrorCode;
  public readonly details?: any;
  public readonly httpStatus: HttpStatus;

  /**
   *
   * @param message the message to be sent with response
   * @param code the code describing nature of error
   * @param httpStatus http code for error
   * @param details additional details that can be sent.
   */
  constructor(
    code: AppErrorCode,
    message: string,
    httpStatus: HttpStatus,
    details?: any,
  ) {
    super(message);
    this.code = code;
    this.details = details;
    this.httpStatus = httpStatus;

    /**
     * This line is required to continue the prototype chain
     * Extending classes breaks the prototype chain
     * Checking the instance of class that extends BaseError will be BaseError and not the child
     * this sets it back to whatever child extends this class.
     */
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
