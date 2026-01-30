import { ApiEndpoint } from "@/lib/axios";
import { GoogelInput } from "@/types/AuthTypes";
import {
  ApiResponse,
  LoginResponseDTO,
  LoginUserRequest,
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

/**
 * This function takes data and makes request to the backend
 * to handle user login.
 *
 * @param data data entered by the user after validation
 * @returns response from the server
 */
export async function postLoginRequest(
  data: LoginUserRequest,
): Promise<AxiosResponse<ApiResponse<LoginResponseDTO>>> {
  return ApiEndpoint.post("/user-service/auth/login", data);
}

/**
 * This function takes data and makes request to the backend
 * to handle user google login.
 *
 * @param data data recieved after client side google validation
 * @returns response from the server
 */
export async function postGoogleAuthRequest(
  data: GoogelInput,
): Promise<AxiosResponse<ApiResponse<LoginResponseDTO>>> {
  return ApiEndpoint.post("/user-service/auth/google-auth", data);
}
