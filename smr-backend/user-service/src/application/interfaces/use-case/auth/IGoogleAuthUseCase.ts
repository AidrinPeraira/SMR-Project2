import { GoogleAuthInput } from "@/application/dto/GoogleAuthDTO.js";
import { LoginUserResultDTO } from "@/application/dto/UserDTO.js";

export interface IGoogleAuthUseCase {
  execute(input: GoogleAuthInput):Promise<Omit<LoginUserResultDTO, "sessionId">>;
}
