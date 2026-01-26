import { ApiEndpoint } from "@/lib/axios.js";
import {
  ApiResponse,
  RegisterResponseDto,
  RegisterUserRequest,
} from "@smr/shared";
import { AxiosResponse } from "axios";

export async function postRegisterRequest(
  data: RegisterUserRequest,
): Promise<AxiosResponse<ApiResponse<RegisterResponseDto>>> {
  return ApiEndpoint.post("/user-service/auth/register", data);
}
