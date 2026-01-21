import { OTPType } from "enums/OTPTypes.js";
import { DomainEvent } from "events/DomainEvent.js";

export interface SendEmailOTPData {
  user_id: string;
  email_id: string;
  user_name: string;
  otp: string;
  otp_type: OTPType;
  expirest_at: Date;
}
export type SendEmailOTPEvent = DomainEvent<SendEmailOTPData>;
