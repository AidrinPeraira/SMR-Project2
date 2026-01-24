import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { IPasswordHasher } from "@/application/interfaces/service/IPasswordHasher.js";
import { ITokenService } from "@/application/interfaces/service/ITokenService.js";
import { IResetPasswordUseCase } from "@/application/interfaces/use-case/auth/IResetPasswordUseCase.js";
import {
  AppError,
  AppErrorCode,
  AuthMessages,
  HttpStatus,
  OTPTokenPayloadType,
  TokenType,
} from "@smr/shared";

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _tokenService: ITokenService,
  ) {}

  async execute(
    email: string,
    token: string,
    newPassword: string,
  ): Promise<void> {
    const verifiedToken =
      this._tokenService.verifyToken<OTPTokenPayloadType>(token);

    if (
      !verifiedToken ||
      verifiedToken.email !== email ||
      verifiedToken.type !== TokenType.FORGOT_PASSWORD
    ) {
      throw new AppError(
        AppErrorCode.BAD_REQUEST,
        AuthMessages.TOKEN_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this._userRepository.findByEmail(email);
    if (!user) {
      throw new AppError(
        AppErrorCode.NOT_FOUND,
        AuthMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const passwordHash = await this._passwordHasher.hash(newPassword);

    await this._userRepository.update(user.userId, {
      passwordHash,
    });
  }
}
