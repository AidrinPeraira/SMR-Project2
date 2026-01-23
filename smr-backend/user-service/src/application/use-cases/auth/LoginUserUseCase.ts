import { AppConfig } from "@/application.config.js";
import {
  LoginUserRequestDTO,
  LoginUserResultDTO,
} from "@/application/dto/UserDTO.js";
import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { IPasswordHasher } from "@/application/interfaces/service/IPasswordHasher.js";
import { ITokenService } from "@/application/interfaces/service/ITokenService.js";
import { ILoginUserUseCase } from "@/application/interfaces/use-case/auth/ILoginUserUseCase.js";
import {
  AccountStatus,
  AppError,
  AppErrorCode,
  AuthMessages,
  HttpStatus,
  TokenType,
} from "@smr/shared";

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _tokenService: ITokenService,
  ) {}

  /**
   * this funciton checks user in db
   * compares paswrods
   * if match returns token for login
   *
   * @param input email and password
   */
  async execute(input: LoginUserRequestDTO): Promise<LoginUserResultDTO> {
    const { email, password } = input;

    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        AppErrorCode.BAD_REQUEST,
        AuthMessages.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.emailVerified) {
      throw new AppError(
        AppErrorCode.FORBIDDEN,
        AuthMessages.EMAIL_VERIFICATION_REQUIRED,
        HttpStatus.FORBIDDEN,
      );
    }

    if (user.accountStatus !== AccountStatus.ACTIVE) {
      throw new AppError(
        AppErrorCode.FORBIDDEN,
        AuthMessages.ACCOUNT_UNAVAILABLE,
        HttpStatus.FORBIDDEN,
      );
    }

    const isMatch = await this._passwordHasher.compare(
      password,
      user.passwordHash,
    );

    if (!isMatch) {
      throw new AppError(
        AppErrorCode.BAD_REQUEST,
        AuthMessages.EMAIL_VERIFICATION_REQUIRED,
        HttpStatus.FORBIDDEN,
      );
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
