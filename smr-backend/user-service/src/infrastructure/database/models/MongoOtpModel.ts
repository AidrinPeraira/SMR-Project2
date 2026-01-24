import { OTPType } from "@smr/shared";
import { Document, model, Schema } from "mongoose";

export interface OtpDoc extends Document {
  email: string;
  otp: string;
  type: OTPType;
  attempts: number;
  resends: number;
  expires_at: Date;
  created_at: Date;
}

const OtpSchema = new Schema<OtpDoc>({
  email: { type: String, required: true, index: true },
  otp: { type: String, required: true },
  type: { type: String, enum: Object.values(OTPType), required: true },
  attempts: { type: Number, required: true, default: 0 },
  resends: { type: Number, required: true, default: 0 },
  expires_at: { type: Date, required: true, expires: 0 },
  created_at: { type: Date, required: true },
});

//we keep a combination of email and otptype unique. for future
OtpSchema.index({ email: 1, type: 1 }, { unique: true });

export const OtpModel = model<OtpDoc>("Otp", OtpSchema);
