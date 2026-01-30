"use server";

import { postResendOTP, postVerifyOTPAndRegister } from "@/api/OtpAPI";
import { handleAxiosError } from "@/lib/axios-error-handler";
import { ActionResponse } from "@/types/ResponseTypes";
import { LoginResponseDTO, VerifyOtpRequest } from "@smr/shared";

export async function resendOTPAction(
  data: Omit<VerifyOtpRequest, "otp_number">,
): Promise<ActionResponse<null>> {
  try {
    const response = await postResendOTP(data);

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
    console.log("Verify Register OTP Action Error: ", handledError);
    return handledError;
  }
}
