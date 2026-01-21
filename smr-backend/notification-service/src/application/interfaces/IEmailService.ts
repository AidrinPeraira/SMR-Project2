import { OTPType, SendEmailOTPData } from "@smr/shared";

export interface IEmailService {
  sendOtpEmail(data: SendEmailOTPData): Promise<void>;
}
