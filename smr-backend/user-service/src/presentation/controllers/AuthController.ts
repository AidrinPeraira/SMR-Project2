import { ILoginUserUseCase } from "@/application/interfaces/use-case/auth/ILoginUserUseCase.js";
import { IRegisterUserUseCase } from "@/application/interfaces/use-case/auth/IRegisterUserUseCase.js";
import { IVerifyEmailAndLoginUseCase } from "@/application/interfaces/use-case/auth/IVerifyEmailAndLoginUseCase.js";
import { IResendOtpUseCase } from "@/application/interfaces/use-case/otp/IResendOTPEMailUseCase.js";
import { ISendOTPEMailUseCase } from "@/application/interfaces/use-case/otp/ISendOTPEMailUseCase.js";
import { IVerifyEmailOTPUseCase } from "@/application/interfaces/use-case/otp/IVerifyEmailOTPUseCase.js";
import { IAuthController } from "@/presentation/interfaces/IAuthController.js";
import {
  toLoginRequestDto,
  toLoginResponseDto,
  toRegisterRequestDto,
  toRegisterResponseDto,
} from "@/presentation/mapper/AuthMapper.js";
import { toVerifyOTPRequestDTO } from "@/presentation/mapper/OTPMapper.js";
import { handleControllerError } from "@/presentation/utils/ErrorHandler.js";
import {
  AppMessages,
  AuthMessages,
  HttpStatus,
  logger,
  makeSuccessResponse,
  OTPType,
  safeParseOrThrow,
  SendEmailOTPData,
  VerifyOtpSchema,
} from "@smr/shared";
import { resolveMx } from "dns";
import { Request, Response } from "express";

export class AuthController implements IAuthController {
  constructor(
    private readonly _registerUserUseCase: IRegisterUserUseCase,
    private readonly _sendOTPMailUseCase: ISendOTPEMailUseCase,
    private readonly _loginUserUseCase: ILoginUserUseCase,
    private readonly _verifyEmailOTPUseCase: IVerifyEmailOTPUseCase,
    private readonly _verifyEmailAndLogin: IVerifyEmailAndLoginUseCase,
    private readonly _resendOtpUseCase: IResendOtpUseCase,
  ) {}

  /**
   * This function calls the register user use case
   * and then calls send email otp use case to send email verification otp
   *
   * @param req request object with register user data
   * @param res sucessa or failure response
   * @returns
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData = toRegisterRequestDto(req);

      logger.info(`Register attempt: ${userData.email}`);

      const newUser = await this._registerUserUseCase.execute({
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
            AuthMessages.USER_REGISTERED,
            toRegisterResponseDto(newUser),
          ),
        );

      return;
    } catch (error: unknown) {
      handleControllerError(res, error, "Register Controller");
    }
  }

  /**
   * This function calls the login user use case
   *
   * It compares credentials and issues tokens
   *
   * @param req reqest object with login data
   * @param res sucess of failure response
   * @returns
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const userData = toLoginRequestDto(req);

      logger.info(`Login attempt: ${userData.email}`);

      const loggedInUser = await this._loginUserUseCase.execute(userData);

      res
        .status(HttpStatus.CREATED)
        .json(
          makeSuccessResponse(
            AuthMessages.LOGIN_SUCCESS,
            toLoginResponseDto(loggedInUser),
          ),
        );

      return;
    } catch (error: unknown) {
      handleControllerError(res, error, "Login Controller");
    }
  }

  /**
   * This funciton calls the verify otp use case
   * if the verify otp is for register
   * logs in the user by sending back tokens
   *
   * @param req req with otp input from usern in body
   * @param res verificaiton status
   * @returns null
   */
  async verifyRegisterOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp, type } = toVerifyOTPRequestDTO(req);

      logger.info(`Verify email and login attempt: ${email}`);

      const result = await this._verifyEmailOTPUseCase.execute({
        email,
        otp,
        type,
      });

      const loggedInUser = await this._verifyEmailAndLogin.execute(
        result.email,
      );

      res
        .status(HttpStatus.CREATED)
        .json(
          makeSuccessResponse(
            AuthMessages.LOGIN_SUCCESS,
            toLoginResponseDto(loggedInUser),
          ),
        );

      return;
    } catch (error: unknown) {
      handleControllerError(res, error, "Verify EMail and Login Controller");
    }
  }

  /**
   * This function calls the resend otp use case
   *
   * it creates and send new email otp for the given type
   *
   * @param req req object with email and otp type
   * @param res
   */
  async resendOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email_id: email, otp_type: type } = safeParseOrThrow(
        VerifyOtpSchema.pick({
          email_id: true,
          otp_type: true,
        }),
        req.body,
      );

      logger.info(`Rensend Email OTP Attempt: ${email}`);
      await this._resendOtpUseCase.execute(email, type);

      res
        .status(HttpStatus.OK)
        .json(makeSuccessResponse(AuthMessages.OTP_GENERATED));
    } catch (error: unknown) {
      handleControllerError(res, error, "Resend OTP Controller");
    }
  }
}
