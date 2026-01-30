import { ApiEndpoint } from "@/lib/axios";
import {
  ApiResponse,
  RegisterResponseDto,
  RegisterUserRequest,
} from "@smr/shared";
import { AxiosResponse } from "axios";

/**
 * This function takes data and makes request to the backend
 * to handle user registration.
 *
 * @param data data entered by the user after validation
 * @returns response from the server
 */
export async function postRegisterRequest(
  data: RegisterUserRequest,
): Promise<AxiosResponse<ApiResponse<RegisterResponseDto>>> {
  return ApiEndpoint.post("/user-service/auth/register", data);
}
