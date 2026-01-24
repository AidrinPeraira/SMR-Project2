import { AppConfig } from "@/application.config.js";
import { OTPTokenData } from "@/application/dto/OtpDTO.js";
import { ForgotPasswordResultDTO } from "@/application/dto/UserDTO.js";
import { IOTPRepository } from "@/application/interfaces/repository/IOTPRepository.js";
import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { IOTPGenerator } from "@/application/interfaces/service/IOTPGenerator.js";
import { ITokenService } from "@/application/interfaces/service/ITokenService.js";
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
    private readonly _tokenService: ITokenService,
  ) {}

  async execute(email: string): Promise<ForgotPasswordResultDTO> {
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

    const resetPayload = {
      user_id: user.userId,
      email_id: user.email,
      user_name: user.firstName + " " + user.lastName,
      otp_type: OTPType.FORGOT_PASSWORD,
    };

    const resetToken =
      this._tokenService.createToken<OTPTokenData>(resetPayload);

    return {
      user: resetPayload,
      resetToken: resetToken,
    };
  }
}
