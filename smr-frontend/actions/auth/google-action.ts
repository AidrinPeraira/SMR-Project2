"use server";

import { postGoogleAuthRequest } from "@/api/AuthAPI";
import { AppConfig } from "@/application.config";
import { handleAxiosError } from "@/lib/axios-error-handler";
import { GoogelInput } from "@/types/AuthTypes";
import { ActionResponse } from "@/types/ResponseTypes";
import { LoginResponseDTO } from "@smr/shared";
import { OAuth2Client } from "google-auth-library";
import { cookies } from "next/headers";

const googleClient = new OAuth2Client(AppConfig.auth.googleClientId);
const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
  AppConfig.auth.accessTokenSecret,
);

/**
 * This function takes data and makes request to the backend
 * to handle user login.
 *
 * @param data data entered by the user during login
 * @returns response from the server with user data
 */
export async function googleAuthAction(
  googleToken: string,
): Promise<ActionResponse<LoginResponseDTO>> {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.name) {
      return { success: false, message: "Invalid Google token." };
    }

    const { email, name, picture } = payload;

    const data: GoogelInput = {
      email_id: email,
      first_name: name.split(" ")[0],
      last_name: name.split(" ").slice(1).join(" "),
      profile_image: picture,
    };

    const response = await postGoogleAuthRequest(data);

    if (response.data.success) {
      const cookieStore = await cookies();

      cookieStore.set(
        "refresh_token",
        response.data.payload?.refresh_token ?? "",
        {
          httpOnly: true,
          secure: AppConfig.nodeEnv == "production",
          sameSite: "lax",
          path: "/",
          maxAge: Number(AppConfig.refreshTokenLife) ?? 60 * 60 * 24 * 2,
        },
      );

      cookieStore.set("session_id", response.data.payload?.session_id ?? "", {
        httpOnly: true,
        secure: AppConfig.nodeEnv == "production",
        sameSite: "lax",
        path: "/",
        maxAge: Number(AppConfig.accessTokenLife) ?? 900,
      });

      return {
        success: true,
        message: response.data.message,
        data: response.data.payload!,
      };
    }

    return {
      success: false,
      message: response.data.message,
      error: (response.data as any).error,
    };
  } catch (error: unknown) {
    const handledError = handleAxiosError(error);
    console.log("Login Action Error: ", handledError);
    return handledError;
  }
}
