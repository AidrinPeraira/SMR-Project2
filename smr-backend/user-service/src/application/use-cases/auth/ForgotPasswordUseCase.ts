import { AppConfig } from "@/application.config.js";
import { IOTPRepository } from "@/application/interfaces/repository/IOTPRepository.js";
import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { IOTPGenerator } from "@/application/interfaces/service/IOTPGenerator.js";
import { IForgotPasswordUseCase } from "@/application/interfaces/use-case/auth/IForgotPasswordUseCase.js";
import {
  AppError,
  AppErrorCode,
  AuthMessages,
  HttpStatus,
  logger,
  OTPType,
  SendEmailOTPData,
} from "@smr/shared";

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _otpGenerator: IOTPGenerator,
  ) {}

  async execute(email: string): Promise<Partial<SendEmailOTPData>> {
    logger.info("Reset password attempt: ", email);

    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        AppErrorCode.NOT_FOUND,
        AuthMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const otp = this._otpGenerator.generate(AppConfig.OTP_LENGTH);
    const expiresAt = Date.now() + AppConfig.OTP_EXPIRY_SECONDS * 1000;

    const data: Partial<SendEmailOTPData> = {
      user_id: user.userId,
      email_id: user.email,
      user_name: user.firstName + " " + user.lastName,
      otp_type: OTPType.FORGOT_PASSWORD,
    };

    return data;
  }
}
