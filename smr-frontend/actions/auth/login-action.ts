"use server";

import { postLoginRequest } from "@/api/AuthAPI";
import { AppConfig } from "@/application.config";
import { handleAxiosError } from "@/lib/axios-error-handler";
import { ActionResponse } from "@/types/ResponseTypes";
import { LoginResponseDTO, LoginUserRequest } from "@smr/shared";
import { cookies } from "next/headers";

/**
 * This function takes data and makes request to the backend
 * to handle user login.
 *
 * @param data data entered by the user during login
 * @returns response from the server with user data
 */
export async function loginAction(
  data: LoginUserRequest,
): Promise<ActionResponse<LoginResponseDTO>> {
  try {
    const response = await postLoginRequest(data);

    if (response.data.success) {
      const cookieStore = await cookies();

      cookieStore.set(
        "refresh_token",
        response.data.payload?.refresh_token ?? "",
        {
          httpOnly: true,
          secure: AppConfig.nodeEnv == "production",
          sameSite: "lax",
          path: "/",
          maxAge: Number(AppConfig.refreshTokenLife) ?? 60 * 60 * 24 * 2,
        },
      );

      cookieStore.set("session_id", response.data.payload?.session_id ?? "", {
        httpOnly: true,
        secure: AppConfig.nodeEnv == "production",
        sameSite: "lax",
        path: "/",
        maxAge: Number(AppConfig.accessTokenLife) ?? 900,
      });

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
    console.log("Login Action Error: ", handledError);
    return handledError;
  }
}
