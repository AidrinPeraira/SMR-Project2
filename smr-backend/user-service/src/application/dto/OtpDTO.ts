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
