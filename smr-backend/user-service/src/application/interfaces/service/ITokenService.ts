import { TokenPayloadType } from "@smr/shared";

export interface ITokenService {
  signAccessToken(payload: TokenPayloadType): string;
  signRefreshToken(payload: TokenPayloadType): string;
  verifyRefreshToken(token: string): TokenPayloadType;
  createToken<PayloadType extends object>(payload: PayloadType): string;
  verifyToken<PayloadType>(token: string): PayloadType;
}
