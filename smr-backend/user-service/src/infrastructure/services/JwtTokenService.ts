import { AppConfig } from "@/application.config.js";
import { ITokenService } from "@/application/interfaces/service/ITokenService.js";
import {
  AppError,
  AppErrorCode,
  AppMessages,
  HttpStatus,
  logger,
  TokenPayloadType,
} from "@smr/shared";
import jwt from "jsonwebtoken";

export class JwtTokenService implements ITokenService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;

  constructor() {
    this.accessTokenSecret = AppConfig.ACCESS_TOKEN_SECRET;
    this.refreshTokenSecret = AppConfig.REFRESH_TOKEN_SECRET;
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
        AppMessages.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
