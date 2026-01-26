import { Request, Response, NextFunction } from "express";

export interface IAdminController {
  processDriverApplication(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
