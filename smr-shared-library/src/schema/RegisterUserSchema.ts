import { UserRoles } from "enums";
import { z } from "zod";

export const RegisterUserBaseSchema = z.object({
  first_name: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(2, { message: "First name must be at least 2 characters long" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "First name is of invalid format.",
    }),

  last_name: z
    .string({ required_error: "Last name is required" })
    .trim()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Last name is of invalid format.",
    }),

  email_id: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .min(5, { message: "Email has to be at least 5 characters long." })
    .max(255, { message: "Email cannot exceed 255 characters" })
    .regex(
      /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]{3,})[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
      { message: "Email is of invalid format." },
    ),

  phone_number: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, {
      message: "Phone number has to be 10 digits, witout prefixes (+91).",
    })
    .regex(/^[6-9]\d{9}$/, { message: "Invalid phone number format." }),

  user_role: z.nativeEnum(UserRoles, {
    errorMap: () => ({ message: "Please select a valid user role" }),
  }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/, {
      message: "Password must contain at least one special character",
    })
    .regex(/^[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+$/, {
      message: "Password contains invalid characters",
    }),

  confirm_password: z
    .string({ required_error: "Please confirm your password" })
    .trim(),

  email_verified: z.boolean({
    required_error: "Email verification status is required",
    invalid_type_error: "Email verification status must be a boolean",
  }),
});

export const RegisterUserSchema = RegisterUserBaseSchema.refine(
  (data) => data.password === data.confirm_password,
  {
    path: ["confirm_password"],
    message: "Passwords do not match",
  },
);

export type RegisterUserRequest = z.infer<typeof RegisterUserSchema>;
