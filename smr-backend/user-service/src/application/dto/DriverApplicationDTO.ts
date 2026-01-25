
export interface DriverApplicationRequestDTO {
  userId: string;
  email: string;

  licenseNumber: string;
  licenseExpiry: string; 
  licenseImage: string;

  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleImage: string;

  registrationNumber: string;
  registrationImage: string;
  registrationExpiry: string;

  insuranceNumber: string;
  insuranceExpiry: string;
  insuranceImage: string;
}

export interface DriverApplicationResultDTO {
    applicationId: string,
    userId: string;
}


