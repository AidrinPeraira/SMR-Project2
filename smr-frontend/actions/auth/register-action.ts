"use server";

import { postRegisterRequest } from "@/api/AuthAPI";
import { handleAxiosError } from "@/lib/axios-error-handler";
import { ActionResponse } from "@/types/ResponseTypes";
import { RegisterResponseDto, RegisterUserRequest } from "@smr/shared";

/**
 * This function takes data and makes request to the backend
 * to handle user registration.
 *
 * The backend endpoint handles sending the email otp for verification automaticaly
 *
 * @param data data entered by the user during registration
 * @returns response from the server with user data
 */
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
