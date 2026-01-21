import { TokenPayloadType } from "@smr/shared";

export interface ITokenService {
  signAccessToken(payload: TokenPayloadType): string;
  signRefreshToken(payload: TokenPayloadType): string;
  verifyRefreshToken(token: string): TokenPayloadType;
}
