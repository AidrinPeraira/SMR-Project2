import { AppConfig } from "@/application.config.js";
import { IOTPRepository } from "@/application/interfaces/repository/IOTPRepository.js";
import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { IEventBus } from "@/application/interfaces/service/IEventBus.js";
import { IOTPGenerator } from "@/application/interfaces/service/IOTPGenerator.js";
import { IResendOtpUseCase } from "@/application/interfaces/use-case/otp/IResendOTPEMailUseCase.js";
import {
  AppError,
  AppErrorCode,
  AuthMessages,
  EventName,
  HttpStatus,
  OTPType,
  SendEmailOTPEvent,
} from "@smr/shared";

export class ResendOtpUseCase implements IResendOtpUseCase {
  constructor(
    private readonly _otpRepository: IOTPRepository,
    private readonly _userRepository: IUserRepository,

    private readonly _otpGenerator: IOTPGenerator,
    private readonly _eventBus: IEventBus,
  ) {}

  async execute(email: string, type: OTPType): Promise<void> {
    const existingOtp = await this._otpRepository.findOtp(email, type);

    if (!existingOtp) {
      throw new AppError(
        AppErrorCode.NOT_FOUND,
        AuthMessages.OTP_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (existingOtp.resends >= 3) {
      throw new AppError(
        AppErrorCode.BAD_REQUEST,
        AuthMessages.OTP_LIMIT_EXCEEDED,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        AppErrorCode.NOT_FOUND,
        AuthMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const otp = this._otpGenerator.generate(AppConfig.OTP_LENGTH);
    const now = new Date();

    await this._otpRepository.saveOtp({
      ...existingOtp,
      email: existingOtp.email,
      otp,
      type: existingOtp.type,
      attempts: 0,
      resends: existingOtp.resends + 1,
      created_at: now,
      expires_at: new Date(now.getTime() + AppConfig.OTP_EXPIRY_SECONDS * 1000),
    });

    const event: SendEmailOTPEvent = {
      event: EventName.SEND_EMAIL_OTP,
      data: {
        user_id: user.userId,
        email_id: user.email,
        user_name: user.firstName + " " + user.lastName,
        otp,
        otp_type: type,
        expirest_at: new Date(
          now.getTime() + AppConfig.OTP_EXPIRY_SECONDS * 1000,
        ),
      },
      timestamp: now,
    };
    await this._eventBus.publish(event);
  }
}
