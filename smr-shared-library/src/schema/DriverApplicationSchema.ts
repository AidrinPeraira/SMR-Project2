import { z } from "zod";

const LICENSE_REGEX = /^[A-Z]{2}[0-9]{13}$/; // Example: KL1320210001234 (Common format)
const RC_NUMBER_REGEX = /^[A-Z]{2}[0-9]{2}[A-Z]{0,3}[0-9]{4}$/; // Example: KL07BN1234

export const DriverApplicationSchema = z.object({
  user_id: z.string(),
  email_id: z.string().email(),

  license_number: z
    .string()
    .min(15, "Indian DL number must be exactly 15 characters")
    .max(15, "Indian DL number must be exactly 15 characters")
    .regex(
      LICENSE_REGEX,
      "Invalid format. Use 2 letters followed by 13 digits (e.g., KL0120230000001)",
    )
    .transform((val) => val.toUpperCase()),

  license_expiry: z.coerce.date().refine((date) => date > new Date(), {
    message: "License has expired",
  }),

  license_image: z.string().url("License image must be a valid URL"),

  vehicle_type: z.string().min(1, "Vehicle type is required"),
  vehicle_brand: z.string().min(1, "Vehicle brand is required"),
  vehicle_model: z.string().min(1, "Vehicle model is required"),
  vehicle_image: z.string().url("Vehicle image must be a valid URL"),

  registration_number: z
    .string()
    .regex(
      RC_NUMBER_REGEX,
      "Invalid Registration Number format (e.g. KL07BN1234)",
    ),

  registration_image: z.string().url("Registration image must be a valid URL"),
  registration_expiry: z.coerce
    .date({
      required_error: "Registration expiry is required",
    })
    .refine((date) => date > new Date(), {
      message: "Registration has expired",
    }),

  insurance_number: z.string().min(5, "Invalid Insurance Policy Number"),

  insurance_expiry: z.coerce.date().refine((date) => date > new Date(), {
    message: "Insurance has expired",
  }),
  insurance_image: z.string().url("Insurance image must be a valid URL"),
});

export type DriverApplicationInput = z.infer<typeof DriverApplicationSchema>;
