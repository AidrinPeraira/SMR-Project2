import { UserRoles } from "enums";
import { z } from "zod";

export const RegisterUserBaseSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-zA-Z\s]+$/),

  last_name: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-zA-Z\s]+$/),

  email_id: z
    .string()
    .trim()
    .toLowerCase()
    .min(5)
    .max(255)
    .regex(
      /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]{3,})[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
      { message: "Email prefix must be at least 3 characters long" },
    ),
  phone_number: z
    .string()
    .trim()
    .min(10)
    .regex(/^[6-9]\d{9}$/),

  user_role: z.nativeEnum(UserRoles),

  password: z
    .string()
    .trim()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[0-9]/)
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/)
    .regex(/^[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+$/),

  confirm_password: z.string().trim(),

  email_verified: z.boolean(),
});

export const RegisterUserSchema = RegisterUserBaseSchema.refine(
  (data) => data.password === data.confirm_password,
  {
    path: ["confirm_password"],
    message: "Passwords do not match",
  },
);

export type RegisterUserRequest = z.infer<typeof RegisterUserSchema>;
