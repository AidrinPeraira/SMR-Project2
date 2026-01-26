import { OTPTokenData } from "@/application/dto/OtpDTO.js";
import { UserRoles } from "@smr/shared";

export interface RegisterUserRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface RegisterUserResultDTO {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
}

export interface LoginUserRequestDTO {
  email: string;
  password: string;
}

export interface LoginUserResultDTO {
  user: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    role: UserRoles;
  };
  accessToken: string;
  refreshToken: string;
  sessionId: string;
}

export interface ForgotPasswordResultDTO {
  user: OTPTokenData;
  resetToken: string;
}

export interface UserProfileResultDTO {
  user: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    role: UserRoles;
  };
  driver?: {
    driverId: string;
    licenseNumber: string;
    licenseExpiry: Date;
    licenseImage: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  vehicles?: Array<{
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
  }> | null;
}
