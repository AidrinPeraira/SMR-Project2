export enum AppMessages {
  SUCCESS = "Operation completed successfully.",
  BAD_REQUEST = "The request provided is invalid.",
  NOT_FOUND = "Resource not found.",
  INTERNAL_ERROR = "An unexpected error occurred.",
  VALIDATION_FAILED = "Input validation failed.",
  UNPROCESSABLE_ENTITY = "The data received is insufficient for this action.",
}

export enum AuthMessages {
  UNAUTHORIZED = "Unauthorized request. Please log in to continue.",
  FORBIDDEN = "Access denied. You do not have permission to view this resource.",

  USER_ALREADY_EXISTS = "A user with given credentials already exists. Please login to continue.",
  USER_NOT_FOUND = "User not registered with this email. Signup to continue.",
  INVALID_CREDENTIALS = "The email or password provided is incorrect.",
  LOGOUT_SUCCESS = "You have been successfully logged out.",

  TOKEN_EXPIRED = "Your session has expired. Please log in again.",
  TOKEN_INVALID = "The security token provided is invalid.",

  PASSWORD_RESET_SENT = "If an account exists for this email, a reset link has been sent.",
  PASSWORD_UPDATE_SUCCESS = "Your password has been updated successfully.",
  WEAK_PASSWORD = "The password does not meet the minimum security requirements.",

  EMAIL_VERIFICATION_REQUIRED = "Email not verified. Signup to continue registration.",
  EMAIL_VERIFIED_SUCCESS = "Your email has been successfully verified.",
  VERIFICATION_LINK_EXPIRED = "The verification link has expired. Please request a new one.",

  ACCOUNT_LOCKED = "Your account has been locked due to multiple failed login attempts.",
  ACCOUNT_UNAVAILABLE = "This account has been suspended / deleted. Please contact support.",
}
