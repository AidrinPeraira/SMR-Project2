export interface DriverEntity {
  driverId: string;
  userId: string;
  
  licenseNumber: string;
  licenseExpiry: Date;
  licenseImage: string;
  
  isVerified: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}
