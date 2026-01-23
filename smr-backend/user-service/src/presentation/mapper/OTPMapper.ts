import { VerifyOtpRequestDTO } from "@/application/dto/OtpDTO.js";
import { safeParseOrThrow, VerifyOtpSchema } from "@smr/shared";
import { Request } from "express";

export function toVerifyOTPRequestDTO(req: Request): VerifyOtpRequestDTO {
  const data = safeParseOrThrow(VerifyOtpSchema, req.body);

  return {
    email: data.email_id,
    otp: data.otp_number,
    type: data.otp_type,
  };
}
