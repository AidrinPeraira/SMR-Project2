"use server";

import { postVerifyOTPAndRegister } from "@/api/OtpAPI";
import { AppConfig } from "@/application.config";
import { handleAxiosError } from "@/lib/axios-error-handler";
import { ActionResponse } from "@/types/ResponseTypes";
import { LoginResponseDTO, VerifyOtpRequest } from "@smr/shared";
import { cookies } from "next/headers";

export async function verifyOTPAndRegisterAction(
  data: VerifyOtpRequest,
): Promise<ActionResponse<LoginResponseDTO>> {
  try {
    const response = await postVerifyOTPAndRegister(data);

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
    console.log("Verify Register OTP Action Error: ", handledError);
    return handledError;
  }
}
