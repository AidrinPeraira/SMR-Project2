import { VerifyOtpRequestDTO } from "@/application/dto/OtpDTO.js";

export interface IVerifyForgotPasswordOTPUseCase {
  execute(data: VerifyOtpRequestDTO): Promise<{ verifyToken: string }>;
}
