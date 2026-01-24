import { OTPType } from "@smr/shared";

export interface IResendOtpUseCase {
  execute(email: string, type: OTPType): Promise<void>;
}
