//we use this file to pass all the dependencies for dependency injection.
//this reduces code in index.js

import { ForgotPasswordUseCase } from "@/application/use-cases/auth/ForgotPasswordUseCase.js";
import { GoogleAuthUseCase } from "@/application/use-cases/auth/GoogleAuthUseCase.js";
import { LoginUserUseCase } from "@/application/use-cases/auth/LoginUserUseCase.js";
import { RegisterUserUseCase } from "@/application/use-cases/auth/RegisterUserUseCase.js";
import { ResetPasswordUseCase } from "@/application/use-cases/auth/ResetPasswordUseCase.js";
import { VerifyEmailAndLoginUseCase } from "@/application/use-cases/auth/VerifyEmailAndLoginUseCase.js";
import { ResendOtpUseCase } from "@/application/use-cases/otp/ResendOTPMailUseCase.js";
import { SendOTPMailUseCase } from "@/application/use-cases/otp/SendOTPMailUseCase.js";
import { VerifyEmailOTPUseCase } from "@/application/use-cases/otp/VerifyEmailOTPUseCase.js";
import { VerifyForgotPasswordOTPUseCase } from "@/application/use-cases/otp/VerifyForgotPasswordOTPUseCase.js";
import { CounterModel } from "@/infrastructure/database/models/MongoCounterModel.js";
import { OtpModel } from "@/infrastructure/database/models/MongoOtpModel.js";
import { UserModel } from "@/infrastructure/database/models/MongoUserModel.js";
import { MongoOtpRepository } from "@/infrastructure/repository/MongoOtpRepository.js";
import { MongoUserRepository } from "@/infrastructure/repository/MongoUserRepository.js";
import { MongoCounterService } from "@/infrastructure/services/CounterService.js";
import { JwtTokenService } from "@/infrastructure/services/JwtTokenService.js";
import { OtpGenerator } from "@/infrastructure/services/OtpGenerator.js";
import { BcryptPasswordHasher } from "@/infrastructure/services/PasswordHasher.js";
import { AuthController } from "@/presentation/controllers/AuthController.js";
import { eventBus } from "@/presentation/factories/EventBusFactory.js";

// ------------ repositories ------------------
const userRepository = new MongoUserRepository(UserModel);
const otpRepository = new MongoOtpRepository(OtpModel);
const counterService = new MongoCounterService(CounterModel);

// ------------ services ------------------
const passwordHasher = new BcryptPasswordHasher();
const otpGenerator = new OtpGenerator();
const tokenService = new JwtTokenService();

// ------------ use cases ------------------
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  passwordHasher,
  counterService,
);
const sendEmailOTPUseCase = new SendOTPMailUseCase(
  otpRepository,
  otpGenerator,
  eventBus,
);
const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  passwordHasher,
  tokenService,
);
const verifyEmailOTPUseCase = new VerifyEmailOTPUseCase(otpRepository);
const verifyEmailAndLoginUseCase = new VerifyEmailAndLoginUseCase(
  userRepository,
  tokenService,
);
const resendEMailOTPUseCase = new ResendOtpUseCase(
  otpRepository,
  userRepository,
  otpGenerator,
  eventBus,
);
const forgotPasswordUseCase = new ForgotPasswordUseCase(
  userRepository,
  sendEmailOTPUseCase,
);
const verifyForgotPasswordOTPUseCase = new VerifyForgotPasswordOTPUseCase(
  userRepository,
  verifyEmailOTPUseCase,
  tokenService,
);
const resetPasswordUseCase = new ResetPasswordUseCase(
  userRepository,
  passwordHasher,
  tokenService,
);
const googleAuthUseCase = new GoogleAuthUseCase(
  userRepository,
  tokenService,
  counterService,
);

// ------------ controller ------------------
export const authController = new AuthController(
  registerUserUseCase,
  sendEmailOTPUseCase,
  loginUserUseCase,
  verifyEmailOTPUseCase,
  verifyEmailAndLoginUseCase,
  resendEMailOTPUseCase,
  forgotPasswordUseCase,
  verifyForgotPasswordOTPUseCase,
  resetPasswordUseCase,
  googleAuthUseCase,
);
