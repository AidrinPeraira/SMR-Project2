import { AdminComment, DriverApplicationStatus } from "@smr/shared";

export interface DriverApplicationEntity {
  applicationId: string;
  userId: string;
  email: string;

  licenseNumber: string;
  licenseExpiry: Date;
  licenseImage: string;

  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleImage: string;

  registrationNumber: string;
  registrationImage: string;
  registrationExpiry: Date;

  insuranceNumber: string;
  insuranceExpiry: Date;
  insuranceImage: string;

  status: DriverApplicationStatus;
  isActive: boolean;
  adminComments?: AdminComment[];

  createdAt: Date;
  updatedAt: Date;
}
