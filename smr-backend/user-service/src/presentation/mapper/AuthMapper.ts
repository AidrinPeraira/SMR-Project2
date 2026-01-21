import { RegisterUserRequestDTO } from "@/application/dto/UserDTO.js";
import { RegisterUserSchema, safeParseOrThrow } from "@smr/shared";
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
