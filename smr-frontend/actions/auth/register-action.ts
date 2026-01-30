"use server";

import { postRegisterRequest } from "@/api/AuthAPI";
import { handleAxiosError } from "@/lib/axios-error-handler";
import { ActionResponse } from "@/types/ResponseTypes";
import { RegisterResponseDto, RegisterUserRequest } from "@smr/shared";

type FieldError = {
  field: string;
  message: string;
};

export type RegisterState = {
  data: RegisterUserRequest;
  success: boolean;
  message: string;
  eroors: Omit<RegisterUserRequest, "email_verified" | "user_role">;
};

export async function registerAction(
  data: RegisterUserRequest,
): Promise<ActionResponse<RegisterResponseDto>> {
  try {
    const response = await postRegisterRequest(data);

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        data: response.data.payload!,
      };
    }

    return {
      success: false,
      message: response.data.message,
      error: (response.data as any).error,
    };
  } catch (error: unknown) {
    const handledError = handleAxiosError(error);
    console.log("Register Action Error: ", handledError);
    return handledError;
  }
}
