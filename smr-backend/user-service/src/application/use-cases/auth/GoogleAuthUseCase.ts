import { AppConfig } from "@/application.config.js";
import { GoogleAuthInput } from "@/application/dto/GoogleAuthDTO.js";
import { LoginUserResultDTO } from "@/application/dto/UserDTO.js";
import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { ICounterService } from "@/application/interfaces/service/ICounterService.js";
import { ITokenService } from "@/application/interfaces/service/ITokenService.js";
import { IGoogleAuthUseCase } from "@/application/interfaces/use-case/auth/IGoogleAuthUseCase.js";
import {
  AccountStatus,
  AppError,
  AppErrorCode,
  AuthMessages,
  HttpStatus,
  TokenType,
  UserRoles,
} from "@smr/shared";

export class GoogleAuthUseCase implements IGoogleAuthUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _tokenService: ITokenService,
    private readonly _counterService: ICounterService,
  ) {}

  async execute(input: GoogleAuthInput): Promise<LoginUserResultDTO> {
    const { email, firstName, lastName, profileImage } = input;

    let user = await this._userRepository.findByEmail(email);
    if (!user) {
      const nextSeq =
        await this._counterService.getNextSequence("user_counter");
      const userId = `USR${String(nextSeq).padStart(5, "0")}`;
      const now = new Date();

      const newUser = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: "",
        passwordHash: "GOOGLE_AUTH_USER_PLACEHOLDER",
        role: UserRoles.PASSENGER,
        profileImage: profileImage ?? "/profile-placeholder.webp",
        createdAt: now,
        updatedAt: now,
        emailVerified: true,
        accountStatus: AccountStatus.ACTIVE,
      };

      user = await this._userRepository.save(newUser);
    }

    if (!user.emailVerified) {
      user = await this._userRepository.update(user.userId, {
        emailVerified: true,
      });
    }

    if (user.accountStatus !== AccountStatus.ACTIVE) {
      throw new AppError(
        AppErrorCode.FORBIDDEN,
        AuthMessages.ACCOUNT_UNAVAILABLE,
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
