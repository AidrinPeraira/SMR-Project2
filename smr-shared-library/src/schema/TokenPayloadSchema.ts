import { TokenType } from "enums/TokenTypes.js";
import { UserRoles } from "enums/UserEnums.js";
import { z } from "zod";

export const TokenPayloadSchema = z.object({
  user_id: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(UserRoles),
  type: z.nativeEnum(TokenType),
  iat: z.number(),
  exp: z.number(),
});

export type TokenPayloadType = z.infer<typeof TokenPayloadSchema>;
