import { Router } from "express";
import { IAuthController } from "@/presentation/interfaces/IAuthController.js";
import { asyncHandler } from "@/presentation/utils/AsyncHandler.js";

/**
 *
 * this function initailises and returns and express router with
 * the right routing defined.
 *
 *
 * @param authController instance of the authcontroller
 * @returns
 */
export function createAuthRouter(authController: IAuthController) {
  const router = Router();

  router.post(
    "/register",
    asyncHandler(authController.register.bind(authController)),
  );

  router.post(
    "/login",
    asyncHandler(authController.login.bind(authController)),
  );

  router.post(
    "/verify-and-register",
    asyncHandler(authController.verifyRegisterOtp.bind(authController)),
  );

  router.post(
    "/resend-otp",
    asyncHandler(authController.resendOtp.bind(authController)),
  );

  return router;
}

/**
 *  * Note:
 *  - the register method in the controller instance is passed as callback to the router.post() method
 *  - now only the definition is taken as callback by JS
 *  - Remember the this context of a normal function depends on how it is called. If it is not called as chained to an object the this context will be undefined
 *  - so we will get a function definition which is supposed to be in an object outside an object
 *  - this context of the register function will be lost
 *  - so we manually give it back by binding the object
 */
