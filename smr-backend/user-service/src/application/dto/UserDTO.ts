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
