import {
  VerifyOtpRequestDTO,
  VerifyOtpResultDTO,
} from "@/application/dto/OtpDTO.js";
import { IOTPRepository } from "@/application/interfaces/repository/IOTPRepository.js";
import { IVerifyEmailOTPUseCase } from "@/application/interfaces/use-case/otp/IVerifyEmailOTPUseCase.js";
import { AppError, AppErrorCode, AuthMessages, HttpStatus } from "@smr/shared";

export class VerifyEmailOTPUseCase implements IVerifyEmailOTPUseCase {
  constructor(private readonly _otpRepository: IOTPRepository) {}

  /**
   * This funcion verifies the otp sent to the user's email
   * It verifies that the OTP is same and returns the comparison result
   *
   * @param input data for otp verification. {email, otp, otpType}
   * @returns
   */
  async execute(input: VerifyOtpRequestDTO): Promise<VerifyOtpResultDTO> {
    const { email, otp, type } = input;

    const storedOtp = await this._otpRepository.findOtp(email, type);

    //check otp exists and not expired and equal
    if (!storedOtp) {
      throw new AppError(
        AppErrorCode.NOT_FOUND,
        AuthMessages.OTP_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const now = new Date();

    if (now > storedOtp.expires_at) {
      await this._otpRepository.deleteOtp(email, type);
      throw new AppError(
        AppErrorCode.BAD_REQUEST,
        AuthMessages.OTP_EXPIRED,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (storedOtp.attempts > 2) {
      await this._otpRepository.deleteOtp(email, type);
      throw new AppError(
        AppErrorCode.BAD_REQUEST,
        AuthMessages.OTP_EXPIRED,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (storedOtp.otp !== otp) {
      await this._otpRepository.incrementAttempts(email, type);
      throw new AppError(
        AppErrorCode.BAD_REQUEST,
        AuthMessages.OTP_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this._otpRepository.deleteOtp(email, type);

    return { email, type };
  }
}
