import { AppConfig } from "@/application.config.js";
import {
  RegisterUserRequestDTO,
  RegisterUserResultDTO,
} from "@/application/dto/UserDTO.js";
import { IOTPRepository } from "@/application/interfaces/repository/IOTPRepository.js";
import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { ICounterService } from "@/application/interfaces/service/ICounterService.js";
import { IEventBus } from "@/application/interfaces/service/IEventBus.js";
import { IOTPGenerator } from "@/application/interfaces/service/IOTPGenerator.js";
import { IPasswordHasher } from "@/application/interfaces/service/IPasswordHasher.js";
import { IRegisterUserUseCase } from "@/application/interfaces/use-case/IRegisterUserUseCase.js";
import {
  AccountStatus,
  AppError,
  AppErrorCode,
  AppMessages,
  EventName,
  HttpStatus,
  OTPType,
  SendEmailOTPEvent,
  UserRoles,
} from "@smr/shared";

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _counterService: ICounterService,
    private readonly _otpRepository: IOTPRepository,
    private readonly _otpGenerator: IOTPGenerator,
    private readonly _eventBus: IEventBus,
  ) {}

  /**
   * This function checks for existing user
   * and creates a new user if there isn't one.
   * else it throws an error.
   *
   * This function also genreates an OTP for the email verification
   * and publishes an event for the notification service.
   *
   * (This two actions are set to gether because they always happen together
   * they are part of the samse business logic)
   *
   * @param input Validated user register data recieved form controller
   * @returns basic info about the registered user
   */
  async execute(input: RegisterUserRequestDTO): Promise<RegisterUserResultDTO> {
    const { firstName, lastName, email, phoneNumber, password } = input;

    const existingUser = await this._userRepository.findByEmail(email);

    //if user is registered and already verified
    if (existingUser && existingUser.emailVerified) {
      throw new AppError(
        AppErrorCode.EMAIL_ALREADY_EXISTS,
        AppMessages.USER_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await this._passwordHasher.hash(password);
    const now = new Date();
    let newUser;

    if (existingUser) {
      //if user is registered but not verified, update document with new data
      existingUser.firstName = firstName;
      existingUser.lastName = lastName;
      existingUser.passwordHash = hashedPassword;
      existingUser.phoneNumber = phoneNumber;
      existingUser.updatedAt = now;

      newUser = await this._userRepository.update(
        existingUser.userId,
        existingUser,
      );

      return newUser;
    } else {
      //absolutely new user

      const nextSeq =
        await this._counterService.getNextSequence("user_counter");
      const userId = `USR${String(nextSeq).padStart(5, "0")}`;

      newUser = await this._userRepository.save({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        passwordHash: hashedPassword,
        role: UserRoles.PASSENGER,
        profileImage: "/profile-placeholder.webp",
        createdAt: now,
        updatedAt: now,
        emailVerified: false,
        accountStatus: AccountStatus.ACTIVE,
      });
    }

    //generate otp and publish event for the notification service to send an email
    const otp = this._otpGenerator.generate(AppConfig.OTP_LENGTH);

    await this._otpRepository.saveOtp({
      email,
      otp,
      type: OTPType.REGISTER,
      attempts: 0,
      created_at: now,
      expires_at: new Date(now.getTime() + 60 * 1000),
    });

    const event: SendEmailOTPEvent = {
      event: EventName.SEND_EMAIL_OTP,
      data: {
        user_id: newUser.userId,
        email_id: email,
        otp,
        otp_type: OTPType.REGISTER,
        expires_in: AppConfig.OTP_EXPIRY_SECONDS,
      },
      timestamp: Date.now(),
    };

    await this._eventBus.publish(event);
    return newUser;
  }
}
