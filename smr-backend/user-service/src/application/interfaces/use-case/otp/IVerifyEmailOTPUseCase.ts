import {
  VerifyOtpRequestDTO,
  VerifyOtpResultDTO,
} from "@/application/dto/OtpDTO.js";

export interface IVerifyEmailOTPUseCase {
  execute(input: VerifyOtpRequestDTO): Promise<VerifyOtpResultDTO>;
}
