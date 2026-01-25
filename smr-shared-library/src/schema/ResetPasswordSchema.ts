import { TokenType } from "enums/TokenTypes.js";
import { z } from "zod";

export const ResetPasswordSchema = z.object({
  email_id: z.string(),
  reset_token: z.string(),
  new_password: z
    .string()
    .trim()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[0-9]/)
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/)
    .regex(/^[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+$/),
});
export type ResetPasswordRequest = z.infer<typeof ResetPasswordSchema>;
