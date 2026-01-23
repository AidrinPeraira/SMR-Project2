import { OTPType } from "enums/OTPTypes.js";
import { z } from "zod";

export const VerifyOtpSchema = z.object({
  otp_number: z.string().trim(),
  email_id: z.string().trim().email(),
  otp_type: z.nativeEnum(OTPType),
});

export type VerifyOtpRequest = z.infer<typeof VerifyOtpSchema>;
