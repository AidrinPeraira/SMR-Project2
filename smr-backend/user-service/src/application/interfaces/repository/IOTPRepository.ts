import { OtpModel, OTPType } from "@smr/shared";

export interface IOTPRepository {
  saveOtp(otp: OtpModel): Promise<void>;
  findOtp(email: string, type: OTPType): Promise<OtpModel | null>;
  deleteOtp(email: string, type: OTPType): Promise<void>;
  incrementAttempts(email: string, type: OTPType): Promise<void>;
}
