import { VerifyOtpRequestDTO } from "@/application/dto/OtpDTO.js";
import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { ITokenService } from "@/application/interfaces/service/ITokenService.js";
import { IVerifyEmailOTPUseCase } from "@/application/interfaces/use-case/otp/IVerifyEmailOTPUseCase.js";
import { IVerifyForgotPasswordOTPUseCase } from "@/application/interfaces/use-case/otp/IVerifyForgotPasswordOTPUseCase.js";
import { AppError, AppErrorCode, AuthMessages, HttpStatus } from "@smr/shared";

export class VerifyForgotPasswordOTPUseCase implements IVerifyForgotPasswordOTPUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _verifyEMailOTPUseCase: IVerifyEmailOTPUseCase,
    private readonly _tokenService: ITokenService,
  ) {}

  async execute(data: VerifyOtpRequestDTO): Promise<{ verifyToken: string }> {
    const verification = await this._verifyEMailOTPUseCase.execute(data);

    const user = await this._userRepository.findByEmail(verification.email);

    if (!user) {
      throw new AppError(
        AppErrorCode.NOT_FOUND,
        AuthMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const token = this._tokenService.createToken({ user_id: user.userId });

    return { verifyToken: token };
  }
}
