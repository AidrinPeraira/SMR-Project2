import { DriverApplicationActionData, SendEmailOTPData } from "@smr/shared";

export interface IEmailService {
  sendOtpEmail(data: SendEmailOTPData): Promise<void>;
  sendDriverApplicationStatusEmail(
    data: DriverApplicationActionData,
  ): Promise<void>;
}
