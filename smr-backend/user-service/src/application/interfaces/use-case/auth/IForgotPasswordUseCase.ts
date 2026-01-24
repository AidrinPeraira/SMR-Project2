import { SendEmailOTPData } from "@smr/shared";

export interface IForgotPasswordUseCase {
  execute(email: string): Promise<Partial<SendEmailOTPData>>;
}
