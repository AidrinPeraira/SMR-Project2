import { LoginUserResultDTO } from "@/application/dto/UserDTO.js";

export interface IVerifyEmailAndLoginUseCase {
  execute(email: string): Promise<Omit<LoginUserResultDTO, "sessionId">>;
}
