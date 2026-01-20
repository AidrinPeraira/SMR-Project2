import { DomainEvent } from "events/DomainEvent.js";

interface SendEmailOTPData {
  user_id: string;
  email_id: string;
  otp: string;
  expires_in: number;
}
export type SendEmailOTPEvent = DomainEvent<SendEmailOTPData>;
