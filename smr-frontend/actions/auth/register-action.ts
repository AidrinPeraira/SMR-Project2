"use server";

import { postRegisterRequest } from "@/api/AuthAPI";
import {
  AppError,
  RegisterUserRequest,
  RegisterUserSchema,
  safeParseOrThrow,
  UserRoles,
} from "@smr/shared";
import { errorToJSON } from "next/dist/server/render";

type FieldError = {
  field: string;
  message: string;
};

export type RegisterState = {
  data: RegisterUserRequest;
  success: boolean;
  message: string;
  eroors: Omit<RegisterUserRequest, "email_verified" | "user_role">;
};

export async function registerAction(state: RegisterState, formData: FormData) {
  try {
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email_id: formData.get("email_id"),
      phone_number: formData.get("phone_number"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
      user_role: UserRoles.PASSENGER,
      email_verified: false,
    };

    const verifiedData = safeParseOrThrow(RegisterUserSchema, data);
    console.log("Register Payload: ", verifiedData);
    // const response = postRegisterRequest(verifiedData);
    return {
      ...state,
      success: true,
      message: "Validated",
    };
  } catch (error: unknown) {
    console.log("Register Action Error: ", error);
    return {
      ...state,
      success: false,
      message: "Validation failed",
    };
  }
}
