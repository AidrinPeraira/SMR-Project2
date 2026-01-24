import { AppConfig } from "@/application.config.js";
import { IOTPRepository } from "@/application/interfaces/repository/IOTPRepository.js";
import { IEventBus } from "@/application/interfaces/service/IEventBus.js";
import { IOTPGenerator } from "@/application/interfaces/service/IOTPGenerator.js";
import { ISendOTPEMailUseCase } from "@/application/interfaces/use-case/otp/ISendOTPEMailUseCase.js";
import {
  AppError,
  AppErrorCode,
  AppMessages,
  EventName,
  HttpStatus,
  SendEmailOTPData,
  SendEmailOTPEvent,
} from "@smr/shared";

export class SendOTPMailUseCase implements ISendOTPEMailUseCase {
  constructor(
    private readonly _otpRepository: IOTPRepository,
    private readonly _otpGenerator: IOTPGenerator,
    private readonly _eventBus: IEventBus,
  ) {}

  /**
   * This function sends an email otp for the given type
   * it needs email, userId, user name and otp type
   *
   * It publishes an event to message broker to send an email
   * form the notification service
   *
   * @param data Data needed for generating an otp email
   */
  async execute(data: Partial<SendEmailOTPData>): Promise<void> {
    if (!data.user_id || !data.email_id || !data.user_name || !data.otp_type) {
      throw new AppError(
        AppErrorCode.UNPROCESSABLE_ENTITY,
        AppMessages.UNPROCESSABLE_ENTITY,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const existingOtp = await this._otpRepository.findOtp(
      data.email_id,
      data.otp_type,
    );

    if (existingOtp) return;

    //generate otp and publish event for the notification service to send an email
    const otp = this._otpGenerator.generate(AppConfig.OTP_LENGTH);
    const now = new Date();

    await this._otpRepository.saveOtp({
      email: data.email_id,
      otp,
      type: data.otp_type,
      attempts: 0,
      resends: 0,
      created_at: now,
      expires_at: new Date(now.getTime() + AppConfig.OTP_EXPIRY_SECONDS * 1000),
    });

    const event: SendEmailOTPEvent = {
      event: EventName.SEND_EMAIL_OTP,
      data: {
        user_id: data.user_id,
        email_id: data.email_id,
        user_name: data.user_name,
        otp,
        otp_type: data.otp_type,
        expirest_at: new Date(
          now.getTime() + AppConfig.OTP_EXPIRY_SECONDS * 1000,
        ),
      },
      timestamp: now,
    };

    await this._eventBus.publish(event);
  }
}
