import z from "zod";

export const LoginUserSchema = z.object({
  email_id: z.string().trim().email(),
  password: z.string().trim().min(8),
});

export type LoginUserRequest = z.infer<typeof LoginUserSchema>;
