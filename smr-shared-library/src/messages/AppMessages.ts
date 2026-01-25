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
  USER_REGISTERED = "New User registerd. Verify Email to continue.",
  USER_NOT_FOUND = "User not registered with this email. Signup to continue.",

  INVALID_CREDENTIALS = "The email or password provided is incorrect.",
  LOGOUT_SUCCESS = "You have been successfully logged out.",
  LOGIN_SUCCESS = "You have been successfully logged in.",

  TOKEN_EXPIRED = "Your session has expired. Please log in again.",
  TOKEN_INVALID = "The security token provided is invalid.",

  PASSWORD_RESET_SENT = "If an account exists for this email, a reset link has been sent.",
  PASSWORD_UPDATE_SUCCESS = "Your password has been updated successfully.",

  EMAIL_VERIFICATION_REQUIRED = "Email not verified. Signup to continue registration.",
  EMAIL_VERIFIED_SUCCESS = "Your email has been successfully verified.",
  VERIFICATION_LINK_EXPIRED = "The verification link has expired. Please request a new one.",

  ACCOUNT_LOCKED = "Your account has been locked due to multiple failed login attempts.",
  ACCOUNT_UNAVAILABLE = "This account has been suspended / deleted. Please contact support.",

  OTP_INVALID = "The OTP provided is invalid.",
  OTP_VERIFIED = "OTP successfuly verified.",
  OTP_EXPIRED = "The OTP has expired.",
  OTP_NOT_FOUND = "No OTP Found.",
  OTP_LIMIT_EXCEEDED = "You have exceeded the limit for OTP generations. Please try later.",
  OTP_GENERATED = "New otp generated and sent to your registered Email.",
}

export enum DriverMessages {
  DRIVER_APPLICATION_PENDING = "A pending driver application already exists for this user.",
  DRIVER_ALREADY_EXISTS = "Driver already exists.",
  DRIVER_APPLICATION_SUCCESS = "Driver application submitted successfully.",
  DRIVER_NOT_FOUND = "Driver not found.",
  DRIVER_REGISTERED = "Driver registered successfully.",
  DRIVER_UPDATED = "Driver updated successfully.",
  DRIVER_DELETED = "Driver deleted successfully.",
}
