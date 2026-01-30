import z from "zod";

export const LoginUserSchema = z.object({
  email_id: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, { message: "Invalid email address" })
    .max(255)
    .regex(
      /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]{3,})[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
      { message: "Invalid email address" },
    ),
  password: z
    .string()
    .trim()
    .min(8, { message: "Invalid Password. Try Again." }),
});

export type LoginUserRequest = z.infer<typeof LoginUserSchema>;
