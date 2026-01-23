import { UserRoles } from "enums/UserEnums.js";

export interface RegisterResponseDto {
  user_id: string;
  first_name: string;
  last_name: string;
  email_id: string;
  email_verified: boolean;
}

export interface LoginResponseDTO {
  user: {
    user_id: string;
    email_id: string;
    first_name: string;
    last_name: string;
    profile_image: string;
    user_role: UserRoles;
  };
  access_token: string;
  refresh_token: string;
}
