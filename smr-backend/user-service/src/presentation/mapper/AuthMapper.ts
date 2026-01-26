import {
  LoginUserRequestDTO,
  LoginUserResultDTO,
  RegisterUserRequestDTO,
  RegisterUserResultDTO,
} from "@/application/dto/UserDTO.js";
import {
  LoginResponseDTO,
  LoginUserSchema,
  RegisterResponseDto,
  RegisterUserSchema,
  safeParseOrThrow,
} from "@smr/shared";
import { Request } from "express";

/**
 *
 * This funciton takes the req object
 * and parses user data in body to
 * validate, using zod schema from shared lib,
 * and convert shape to domain shape.
 *
 * @param req req body form controller
 * @returns UserEntity without id. Domain style
 */
export function toRegisterRequestDto(req: Request): RegisterUserRequestDTO {
  const validated = safeParseOrThrow(RegisterUserSchema, req.body);

  return {
    firstName: validated.first_name,
    lastName: validated.last_name,
    email: validated.email_id,
    phoneNumber: validated.phone_number,
    password: validated.password,
  };
}

/**
 * This funciton takes the data from the use case,
 * converts it into the shape needed for the frontend
 *
 * @param newUser the data to be sent to frontend after reg
 * @returns data in frontend shape
 */
export function toRegisterResponseDto(
  newUser: RegisterUserResultDTO,
): RegisterResponseDto {
  return {
    user_id: newUser.userId,
    first_name: newUser.firstName,
    last_name: newUser.lastName,
    email_id: newUser.email,
    email_verified: newUser.emailVerified,
  };
}

/**
 *
 * This funciton takes the req object
 * and parses user data in body to
 * validate, using zod schema from shared lib,
 * and convert shape to domain shape.
 *
 * @param req req body form controller
 * @returns UserEntity without id. Domain style
 */
export function toLoginRequestDto(req: Request): LoginUserRequestDTO {
  const validated = safeParseOrThrow(LoginUserSchema, req.body);

  return {
    email: validated.email_id,
    password: validated.password,
  };
}

/**
 * This funciton takes the data from the use case,
 * converts it into the shape needed for the frontend
 *
 * @param newUser the data to be sent to frontend after reg
 * @returns data in frontend shape
 */
export function toLoginResponseDto(
  data: Omit<LoginUserResultDTO, "sessionId">,
  session_id: string,
): LoginResponseDTO {
  return {
    user: {
      user_id: data.user.userId,
      email_id: data.user.email,
      first_name: data.user.firstName,
      last_name: data.user.lastName,
      profile_image: data.user.profileImage,
      user_role: data.user.role,
    },
    access_token: data.accessToken,
    refresh_token: data.refreshToken,
    session_id,
  };
}
