import { SessionCreationDTO } from "@/application/dto/SessionDTO.js";

export interface ICreateSessionUseCase {
  execute(params: SessionCreationDTO): Promise<string>;
}
