import { OTPType } from "enums";

export interface OtpModel {
  email: string;
  otp: string;
  type: OTPType;
  attempts: number;
  expires_at: Date;
  created_at: Date;
}
