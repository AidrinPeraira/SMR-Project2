import { IRegisterUserUseCase } from "@/application/interfaces/use-case/IRegisterUserUseCase.js";
import { ISendOTPEMailUseCase } from "@/application/interfaces/use-case/otp/ISendOTPEMailUseCase.js";
import { IAuthController } from "@/presentation/interfaces/IAuthController.js";
import {
  toRegisterRequestDto,
  toRegisterResponseDto,
} from "@/presentation/mapper/AuthMapper.js";
import {
  AppMessages,
  HttpStatus,
  logger,
  makeSuccessResponse,
  OTPType,
  SendEmailOTPData,
} from "@smr/shared";
import { Request, Response } from "express";

export class AuthController implements IAuthController {
  constructor(
    private readonly _registerUser: IRegisterUserUseCase,
    private readonly _sendOTPMailUseCase: ISendOTPEMailUseCase,
  ) {}

  /**
   * This function validates and creates the new user
   * it sets the role as passenger. (in use case)
   * it sets the email verified field as flase. (in use case)
   *
   * when the user is created successfuly this method calls the
   * use case to verify the email using OTP
   *
   * @param req request object with register user data
   * @param res sucessa or failure response
   * @returns
   */
  async register(req: Request, res: Response): Promise<void> {
    const userData = toRegisterRequestDto(req);

    logger.info(`Register attempt: ${userData.email}`);

    const newUser = await this._registerUser.execute({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
    });

    logger.info(
      `Register attempt: ${userData.email}. Verifying Email with OTP.`,
    );

    const data: Partial<SendEmailOTPData> = {
      user_id: newUser.userId,
      email_id: newUser.email,
      user_name: newUser.firstName + " " + newUser.lastName,
      otp_type: OTPType.REGISTER,
    };

    await this._sendOTPMailUseCase.execute(data);

    res
      .status(HttpStatus.CREATED)
      .json(
        makeSuccessResponse(
          AppMessages.SUCCESS,
          toRegisterResponseDto(newUser),
        ),
      );

    return;
  }
}
