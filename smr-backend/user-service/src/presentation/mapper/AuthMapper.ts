import {
  RegisterUserRequestDTO,
  RegisterUserResultDTO,
} from "@/application/dto/UserDTO.js";
import {
  RegisterResponseDto,
  RegisterUserSchema,
  safeParseOrThrow,
} from "@smr/shared";
import { Request } from "express";

/**
 *
 * This function takes the request
 * parses and asserts the type of the user data in the request body
 * using zod schema shared in shared lib
 * maps the data to the UserEntity shape
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
