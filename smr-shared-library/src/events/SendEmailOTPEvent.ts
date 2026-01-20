import { OTPType } from "enums/OTPTypes.js";
import { DomainEvent } from "events/DomainEvent.js";

interface SendEmailOTPData {
  user_id: string;
  email_id: string;
  otp: string;
  otp_type: OTPType;
  expires_in: number;
}
export type SendEmailOTPEvent = DomainEvent<SendEmailOTPData>;
