import {
  DriverApplicationRequestDTO,
  DriverApplicationResultDTO,
} from "@/application/dto/DriverApplicationDTO.js";
import { DriverApplicationEntity } from "@/domain/entities/DriverApplicationEntity";
import {
  DriverApplicationResponseDTO,
  DriverApplicationSchema,
  safeParseOrThrow,
} from "@smr/shared";
import { Request } from "express";

export function toDriverApplicationInput(
  req: Request,
): DriverApplicationRequestDTO {
  const validated = safeParseOrThrow(DriverApplicationSchema, req.body);

  return {
    userId: validated.user_id,
    email: validated.email_id,

    licenseNumber: validated.license_number,
    licenseExpiry: validated.license_expiry,
    licenseImage: validated.license_image,

    vehicleType: validated.vehicle_type,
    vehicleBrand: validated.vehicle_brand,
    vehicleModel: validated.vehicle_model,
    vehicleImage: validated.vehicle_image,

    registrationNumber: validated.registration_number,
    registrationImage: validated.registration_image,
    registrationExpiry: validated.registration_expiry,

    insuranceNumber: validated.insurance_number,
    insuranceExpiry: validated.insurance_expiry,
    insuranceImage: validated.insurance_image,
  };
}

export function toDriverApplicationResponse(
  data: DriverApplicationResultDTO,
): DriverApplicationResponseDTO {
  return {
    user_id: data.userId,
    application_id: data.applicationId,
  };
}
