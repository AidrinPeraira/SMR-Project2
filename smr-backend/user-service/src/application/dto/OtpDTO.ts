import { OTPType } from "@smr/shared";

export interface VerifyOtpRequestDTO {
  email: string;
  otp: string;
  type: OTPType;
}

export interface VerifyOtpResultDTO {
  email: string;
  type: OTPType;
}

export interface OTPTokenData {
  user_id: string;
  email_id: string;
  user_name: string;
  otp_type: OTPType;
}
