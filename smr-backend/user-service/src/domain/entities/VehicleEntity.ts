export interface VehicleEntity {
  vehicleId: string;
  driverId: string;

  type: string;
  brand: string;
  modelName: string;
  image: string;

  registrationNumber: string;
  registrationImage: string;
  registrationExpiry: Date;

  insuranceNumber: string;
  insuranceImage: string;
  insuranceExpiry: Date;

  createdAt: Date;
  updatedAt: Date;
}
