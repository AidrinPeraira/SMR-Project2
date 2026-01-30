import { ActionErrorResponse } from "@/types/ResponseTypes";
import { ApiErrorResponse } from "@smr/shared";
import { AxiosError } from "axios";

export function handleAxiosError(error: unknown): ActionErrorResponse {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiErrorResponse;

    if (apiError && apiError.success === false) {
      return {
        success: false,
        message: apiError.message,
        error: apiError.error,
      };
    }

    return {
      success: false,
      message: error.message || "An unexpected error occurred",
      error: {
        code: "UNKNOWN_ERROR",
        error_message: error.message || "An unexpected error occurred",
      },
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
      error: {
        code: "UNKNOWN_ERROR",
        error_message: error.message,
      },
    };
  }

  return {
    success: false,
    message: "An unknown error occurred",
    error: {
      code: "UNKNOWN_ERROR",
      error_message: "An unknown error occurred",
    },
  };
}
