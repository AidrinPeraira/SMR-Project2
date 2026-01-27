"use server";

import { RegisterUserSchema, safeParseOrThrow } from "@smr/shared";

export async function registerAction(formData: FormData) {
  // const validatedFields = safeParseOrThrow(RegisterUserSchema, formData);
  console.log("Register Payload: ", formData);
}

//{
//     first_name: string;
//     last_name: string;
//     email_id: string;
//     phone_number: string;
//     user_role: UserRoles;
//     password: string;
//     confirm_password: string;
//     email_verified: boolean;
//     profile_image?: string | undefined;
//}
