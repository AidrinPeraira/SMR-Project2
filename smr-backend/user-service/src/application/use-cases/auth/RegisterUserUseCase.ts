import {
  RegisterUserRequestDTO,
  RegisterUserResultDTO,
} from "@/application/dto/UserDTO.js";
import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { ICounterService } from "@/application/interfaces/service/ICounterService.js";
import { IPasswordHasher } from "@/application/interfaces/service/IPasswordHasher.js";
import { IRegisterUserUseCase } from "@/application/interfaces/use-case/IRegisterUserUseCase.js";
import {
  AccountStatus,
  AppError,
  AppErrorCode,
  AuthMessages,
  HttpStatus,
  UserRoles,
} from "@smr/shared";

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _counterService: ICounterService,
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
        AuthMessages.USER_ALREADY_EXISTS,
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

    return newUser;
  }
}
