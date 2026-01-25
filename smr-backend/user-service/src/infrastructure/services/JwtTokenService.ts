import { AppConfig } from "@/application.config.js";
import { ITokenService } from "@/application/interfaces/service/ITokenService.js";
import {
  AppError,
  AppErrorCode,
  AuthMessages,
  HttpStatus,
  logger,
  TokenPayloadType,
} from "@smr/shared";
import jwt from "jsonwebtoken";

export class JwtTokenService implements ITokenService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  private readonly genericTokenSecret: string;

  constructor() {
    this.accessTokenSecret = AppConfig.ACCESS_TOKEN_SECRET;
    this.refreshTokenSecret = AppConfig.REFRESH_TOKEN_SECRET;
    this.genericTokenSecret = AppConfig.GENERIC_TOKEN_SECRET;
  }

  signAccessToken(payload: TokenPayloadType): string {
    return jwt.sign(payload, this.accessTokenSecret);
  }

  signRefreshToken(payload: TokenPayloadType): string {
    return jwt.sign(payload, this.refreshTokenSecret);
  }

  verifyRefreshToken(token: string): TokenPayloadType {
    try {
      return jwt.verify(token, this.refreshTokenSecret) as TokenPayloadType;
    } catch (error: unknown) {
      logger.error("Error verifying refresh token: ", error);
      throw new AppError(
        AppErrorCode.TOKEN_INVALID,
        AuthMessages.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  createToken<PayloadType extends object>(payload: PayloadType): string {
    return jwt.sign(payload, this.genericTokenSecret);
  }

  verifyToken<PayloadType>(token: string): PayloadType {
    try {
      return jwt.verify(token, this.genericTokenSecret) as PayloadType;
    } catch (error) {
      logger.error("Error verifying generic token: ", error);
      throw new AppError(
        AppErrorCode.TOKEN_INVALID,
        "Invalid or expired token",
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
