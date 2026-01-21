export interface ApiSuccessResponse<payloadType = any> {
  success: true;
  message: string;
  payload?: payloadType;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    error_message: string;
    details?: any;
  };
}

export type ApiResponse<successPayloadType = any> =
  | ApiSuccessResponse<successPayloadType>
  | ApiErrorResponse;

export function makeSuccessResponse<payloadType>(
  message: string,
  payload?: payloadType,
): ApiResponse<payloadType> {
  return {
    success: true,
    message,
    payload,
  };
}

export function makeFailedResponse<payloadType>(
  responseMessage: string,
  error_message: string,
  code: string,
  details?: any,
): ApiErrorResponse {
  return {
    success: false,
    message: responseMessage,
    error: {
      code: code,
      error_message,
      details: details,
    },
  };
}
