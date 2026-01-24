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
}

export interface ForgotPasswordResultDTO {
  user: OTPTokenData;
  resetToken: string;
}
