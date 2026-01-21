export enum AppMessages {
  SUCCESS = "Operation completed successfully.",
  BAD_REQUEST = "The request provided is invalid.",
  UNAUTHORIZED = "Unauthorized request.",
  FORBIDDEN = "Access denied.",
  NOT_FOUND = "Resource not found.",
  INTERNAL_ERROR = "An unexpected error occurred.",
  VALIDATION_FAILED = "Input validation failed.",
  USER_ALREADY_EXISTS = "A user with given credentials already exists. Please login to continue.",
  UNPROCESSABLE_ENTITY = "The data recieved is insufficient for this action.",
}
