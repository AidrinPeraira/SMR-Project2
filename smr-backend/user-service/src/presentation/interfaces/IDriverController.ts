import { Request, Response } from "express";

export interface IDriverController {
  createApplication(req: Request, res: Response): Promise<void>;
}
