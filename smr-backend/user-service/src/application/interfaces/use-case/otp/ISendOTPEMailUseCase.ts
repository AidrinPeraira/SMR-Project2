import { SendEmailOTPData } from "@smr/shared";

export interface ISendOTPEMailUseCase {
  execute(data: Partial<SendEmailOTPData>): Promise<void>;
}
