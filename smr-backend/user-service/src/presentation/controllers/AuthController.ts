import { IForgotPasswordUseCase } from "@/application/interfaces/use-case/auth/IForgotPasswordUseCase.js";
import { IGoogleAuthUseCase } from "@/application/interfaces/use-case/auth/IGoogleAuthUseCase.js";
import { ILoginUserUseCase } from "@/application/interfaces/use-case/auth/ILoginUserUseCase.js";
import { IRegisterUserUseCase } from "@/application/interfaces/use-case/auth/IRegisterUserUseCase.js";
import { IResetPasswordUseCase } from "@/application/interfaces/use-case/auth/IResetPasswordUseCase.js";
import { IVerifyEmailAndLoginUseCase } from "@/application/interfaces/use-case/auth/IVerifyEmailAndLoginUseCase.js";
import { IResendOtpUseCase } from "@/application/interfaces/use-case/otp/IResendOTPEMailUseCase.js";
import { ISendOTPEMailUseCase } from "@/application/interfaces/use-case/otp/ISendOTPEMailUseCase.js";
import { IVerifyEmailOTPUseCase } from "@/application/interfaces/use-case/otp/IVerifyEmailOTPUseCase.js";
import { IVerifyForgotPasswordOTPUseCase } from "@/application/interfaces/use-case/otp/IVerifyForgotPasswordOTPUseCase.js";
import { ICreateSessionUseCase } from "@/application/interfaces/use-case/session/ICreateSessionUseCase.js";
import { ILogoutUserUseCase } from "@/application/interfaces/use-case/auth/ILogoutUserUseCase.js";
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
  AppError,
  AppErrorCode,
  AppMessages,
  AuthMessages,
  HttpStatus,
  logger,
  LoginUserSchema,
  makeSuccessResponse,
  OTPType,
  RegisterUserBaseSchema,
  ResetPasswordSchema,
  safeParseOrThrow,
  SendEmailOTPData,
  VerifyOtpSchema,
} from "@smr/shared";
import { Request, Response } from "express";

export class AuthController implements IAuthController {
  constructor(
    private readonly _registerUserUseCase: IRegisterUserUseCase,
    private readonly _sendOTPMailUseCase: ISendOTPEMailUseCase,
    private readonly _loginUserUseCase: ILoginUserUseCase,
    private readonly _verifyEmailOTPUseCase: IVerifyEmailOTPUseCase,
    private readonly _verifyEmailAndLogin: IVerifyEmailAndLoginUseCase,
    private readonly _resendOtpUseCase: IResendOtpUseCase,
    private readonly _forgotPasswordUseCase: IForgotPasswordUseCase,
    private readonly _verifyForgotPasswordOTPUseCase: IVerifyForgotPasswordOTPUseCase,
    private readonly _resetPasswordUseCase: IResetPasswordUseCase,
    private readonly _googleAuthUseCase: IGoogleAuthUseCase,
    private readonly _createSessionUseCase: ICreateSessionUseCase,
    private readonly _logoutUserUseCase: ILogoutUserUseCase,
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

      logger.info(`Register OTP Email sent to ${userData.email}.`);

      logger.info(`User created: ${newUser.userId}`);
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

      const sessionData = {
        userId: loggedInUser.user.userId,
        role: loggedInUser.user.role,
        accessToken: loggedInUser.accessToken,
        refreshToken: loggedInUser.refreshToken,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      };
      const sessionId = await this._createSessionUseCase.execute(sessionData);

      logger.info(`User logged in: ${loggedInUser.user.userId}`);
      res
        .status(HttpStatus.CREATED)
        .json(
          makeSuccessResponse(
            AuthMessages.LOGIN_SUCCESS,
            toLoginResponseDto(loggedInUser, sessionId),
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

      const sessionData = {
        userId: loggedInUser.user.userId,
        role: loggedInUser.user.role,
        accessToken: loggedInUser.accessToken,
        refreshToken: loggedInUser.refreshToken,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      };

      const sessionId = await this._createSessionUseCase.execute(sessionData);

      logger.info(
        `Registreed email verified. User logger in: ${loggedInUser.user.userId}`,
      );
      res
        .status(HttpStatus.CREATED)
        .json(
          makeSuccessResponse(
            AuthMessages.LOGIN_SUCCESS,
            toLoginResponseDto(loggedInUser, sessionId),
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
  async resendEmailOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email_id: email, otp_type: type } = safeParseOrThrow(
        VerifyOtpSchema.pick({
          email_id: true,
          otp_type: true,
        }),
        req.body,
      );

      logger.info(`Resend Email OTP Attempt: ${email}. Type: ${type}`);
      await this._resendOtpUseCase.execute(email, type);
      logger.info(`Resend Email OTP Success: ${email}. Type: ${type}`);

      res
        .status(HttpStatus.OK)
        .json(makeSuccessResponse(AuthMessages.OTP_GENERATED));
    } catch (error: unknown) {
      handleControllerError(res, error, "Resend OTP Controller");
    }
  }

  /**
   * This function calls the forgot passoword use case
   * which finds the right user for the email and
   * sends an otp for forgot password verification
   *
   * @param req request object with email id in body
   * @param res
   */
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email_id: email } = safeParseOrThrow(
        LoginUserSchema.pick({ email_id: true }),
        req.body,
      );

      logger.info("Sending forgot password OTP: " + email);

      await this._forgotPasswordUseCase.execute(email);

      logger.info("Sent forgot password OTP: " + email);
      res
        .status(HttpStatus.CREATED)
        .json(makeSuccessResponse(AuthMessages.OTP_GENERATED));
    } catch (error: unknown) {
      handleControllerError(res, error, "Forgot Password Controller");
    }
  }

  /**
   *
   * This function calls the verify otp for password reset
   * use case.
   *
   * It verfies the otp and returns a token for validation before
   * password reset
   *
   * @param req req object with email otp and type
   * @param res
   * @returns
   */
  async verifyForgotPasswordOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email_id, otp_number, otp_type } = safeParseOrThrow(
        VerifyOtpSchema,
        req.body,
      );

      logger.info("Verfying OTP to reset password: " + email_id);

      const { verifyToken: token } =
        await this._verifyForgotPasswordOTPUseCase.execute({
          email: email_id,
          otp: otp_number,
          type: otp_type,
        });

      logger.info("Verified OTP to reset password: " + email_id);
      res
        .status(HttpStatus.OK)
        .json(
          makeSuccessResponse(AuthMessages.OTP_VERIFIED, { email_id, token }),
        );
      return;
    } catch (error: unknown) {
      handleControllerError(res, error, "Verify Forgot Password Controller");
    }
  }

  /**
   *
   * This funciton calls the rest password use case
   * that changes and resets the users password
   *
   * @param req req object with email token and new password
   * @param res
   */
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const {
        email_id: email,
        reset_token: token,
        new_password: newPassword,
      } = safeParseOrThrow(ResetPasswordSchema, req.body);

      logger.info(`Reset password attempt: ${email}`);
      await this._resetPasswordUseCase.execute(email, token, newPassword);

      logger.info(`Password reset: ${email}`);
      res
        .status(HttpStatus.OK)
        .json(makeSuccessResponse(AuthMessages.PASSWORD_UPDATE_SUCCESS));
    } catch (error: unknown) {
      handleControllerError(res, error, "Reset Password Controller");
    }
  }

  /**
   * This functio takes detials verified by google
   * and calls google auth use case
   *
   * it creates a new user or logs in existing user
   *
   * @param req user details verified by google
   * @param res
   * @returns
   */
  async googleAuth(req: Request, res: Response): Promise<void> {
    try {
      const {
        email_id: email,
        first_name: firstName,
        last_name: lastName,
        profile_image: profileImage,
      } = safeParseOrThrow(
        RegisterUserBaseSchema.pick({
          email_id: true,
          first_name: true,
          last_name: true,
          profile_image: true,
        }),
        req.body,
      );

      logger.info(`Google Auth attempt: ${email}`);
      const loggedInUser = await this._googleAuthUseCase.execute({
        email,
        firstName,
        lastName,
        profileImage,
      });

      const sessionData = {
        userId: loggedInUser.user.userId,
        role: loggedInUser.user.role,
        accessToken: loggedInUser.accessToken,
        refreshToken: loggedInUser.refreshToken,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      };
      const sessionId = await this._createSessionUseCase.execute(sessionData);

      logger.info(`Logged in with google: ${loggedInUser.user.userId}`);
      res
        .status(HttpStatus.CREATED)
        .json(
          makeSuccessResponse(
            AuthMessages.LOGIN_SUCCESS,
            toLoginResponseDto(loggedInUser, sessionId),
          ),
        );
      return;
    } catch (error: unknown) {
      handleControllerError(res, error, "Google Auth Controller");
    }
  }

  /**
   * This function logs out the user by clearing the session
   *
   * @param req request object
   * @param res response object
   */
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const headerValue = req.headers["x-session-id"];
      const sessionId = Array.isArray(headerValue)
        ? headerValue[0]
        : headerValue;

      if (!sessionId) {
        throw new AppError(
          AppErrorCode.BAD_REQUEST,
          AppMessages.BAD_REQUEST,
          HttpStatus.BAD_REQUEST,
        );
      }

      logger.info(`Logout attempt: ${sessionId}`);

      await this._logoutUserUseCase.execute(sessionId);

      logger.info(`Logged out successfully: ${sessionId}`);

      res
        .status(HttpStatus.OK)
        .json(makeSuccessResponse("Logged out successfully"));
    } catch (error: unknown) {
      handleControllerError(res, error, "Logout Controller");
    }
  }
}
