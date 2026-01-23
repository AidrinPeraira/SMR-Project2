import { AccountStatus, UserRoles } from "enums/UserEnums.js";

export interface RegisterResponseDto {
  user_id: string;
  first_name: string;
  last_name: string;
  email_id: string;
  email_verified: boolean;
}

export interface LoginResponseDTO {
  user: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
  };
  accessToken: string;
  refreshToken: string;
}
