import { Request, Response } from "express";

export interface IAuthController {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  verifyRegisterOtp(req: Request, res: Response): Promise<void>;
  resendEmailOtp(req: Request, res: Response): Promise<void>;
  forgotPassword(req: Request, res: Response): Promise<void>;
  verifyForgotPasswordOTP(req: Request, res: Response): Promise<void>;
}
