import { DriverApplicationActionDTO } from "@/application/dto/DriverApplicationDTO.js";

export interface IProcessDriverApplicationUseCase {
  execute(action: DriverApplicationActionDTO): Promise<void>;
}
