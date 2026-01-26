import { AppConfig } from "@/application.config.js";
import { LoginUserResultDTO } from "@/application/dto/UserDTO.js";
import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { ITokenService } from "@/application/interfaces/service/ITokenService.js";
import { IVerifyEmailAndLoginUseCase } from "@/application/interfaces/use-case/auth/IVerifyEmailAndLoginUseCase.js";
import {
  AppError,
  AppErrorCode,
  AuthMessages,
  HttpStatus,
  TokenType,
} from "@smr/shared";

export class VerifyEmailAndLoginUseCase implements IVerifyEmailAndLoginUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _tokenService: ITokenService,
  ) {}

  /**
   * This function facilitates login after email has been verified.
   * @param email email after successful otp verification
   * @returns access and refresh tokens
   */
  async execute(email: string): Promise<Omit<LoginUserResultDTO, "sessionId">>{
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        AppErrorCode.BAD_REQUEST,
        AuthMessages.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.emailVerified) {
      await this._userRepository.update(user.userId, {
        emailVerified: true,
        updatedAt: new Date(),
      });
    }

    const now = Math.floor(Date.now() / 1000);

    const accessToken = this._tokenService.signAccessToken({
      user_id: user.userId,
      email: user.email,
      role: user.role,
      type: TokenType.ACCESS,
      iat: now,
      exp: now + AppConfig.ACCESS_TOKEN_LIFE,
    });

    const refreshToken = this._tokenService.signRefreshToken({
      user_id: user.userId,
      email: user.email,
      role: user.role,
      type: TokenType.REFRESH,
      iat: now,
      exp: now + AppConfig.REFRESH_TOKEN_LIFE,
    });

    return {
      user: {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage ?? "",
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }
}
