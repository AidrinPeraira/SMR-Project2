export type ActionSuccessResponse<Payload> = {
  success: true;
  message: string;
  data: Payload;
};

export type ActionErrorResponse = {
  success: false;
  message: string;
  error?: {
    code: string;
    error_message: string;
    details?: any;
  };
};

export type ActionResponse<Payload> =
  | ActionSuccessResponse<Payload>
  | ActionErrorResponse;
