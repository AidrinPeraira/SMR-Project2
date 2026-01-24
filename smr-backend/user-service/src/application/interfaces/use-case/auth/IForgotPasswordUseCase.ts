import { ForgotPasswordResultDTO } from "@/application/dto/UserDTO.js";

export interface IForgotPasswordUseCase {
  execute(email: string): Promise<ForgotPasswordResultDTO>;
}
