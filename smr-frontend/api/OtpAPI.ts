import { ApiEndpoint } from "@/lib/axios";
import { ApiResponse, LoginResponseDTO, VerifyOtpRequest } from "@smr/shared";
import { AxiosResponse } from "axios";

/**
 * This function takes data and makes request to the backend
 * to handle email otp verification for registration.
 *
 * @param data data entered by the user after validation
 * @returns response from the server with login tokens and session id
 */
export async function postVerifyOTPAndRegister(
  data: VerifyOtpRequest,
): Promise<AxiosResponse<ApiResponse<LoginResponseDTO>>> {
  return ApiEndpoint.post("/user-service/auth/verify-and-register", data);
}

/**
 * This function takes data and makes request to the backend
 * to handle email otp resend request.
 *
 * @param data data for resend otp. email and type
 * @returns response from the server with success or failure message only.
 */
export async function postResendOTP(
  data: Omit<VerifyOtpRequest, "otp_number">,
): Promise<AxiosResponse<ApiResponse<null>>> {
  return ApiEndpoint.post("/user-service/auth/resend-otp", data);
}
