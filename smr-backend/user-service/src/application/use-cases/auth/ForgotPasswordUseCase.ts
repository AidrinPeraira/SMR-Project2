import { AppConfig } from "@/application.config.js";
import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { IOTPGenerator } from "@/application/interfaces/service/IOTPGenerator.js";
import { ITokenService } from "@/application/interfaces/service/ITokenService.js";
import { IForgotPasswordUseCase } from "@/application/interfaces/use-case/auth/IForgotPasswordUseCase.js";
import { ISendOTPEMailUseCase } from "@/application/interfaces/use-case/otp/ISendOTPEMailUseCase.js";
import {
  AppError,
  AppErrorCode,
  AuthMessages,
  HttpStatus,
  OTPType,
  SendEmailOTPData,
} from "@smr/shared";

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _sendEmailOTPUseCase: ISendOTPEMailUseCase,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        AppErrorCode.NOT_FOUND,
        AuthMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    await this._sendEmailOTPUseCase.execute({
      email_id: user.email,
      user_id: user.userId,
      user_name: user.firstName + " " + user.lastName,
      otp_type: OTPType.FORGOT_PASSWORD,
    });

    return;
  }
}
