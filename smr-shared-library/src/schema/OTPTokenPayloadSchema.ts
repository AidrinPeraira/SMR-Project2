import { TokenType } from "enums/TokenTypes.js";
import { z } from "zod";

export const OTPTokenPayloadSchema = z.object({
  user_id: z.string(),
  email: z.string().email(),
  type: z.nativeEnum(TokenType),
  iat: z.number(),
  exp: z.number(),
});
export type OTPTokenPayloadType = z.infer<typeof OTPTokenPayloadSchema>;
