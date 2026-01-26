import { DriverApplicationRequestDTO, DriverApplicationResultDTO } from "@/application/dto/DriverApplicationDTO";

export interface ICreateDriverApplicationUseCase {
  execute(data: DriverApplicationRequestDTO): Promise<DriverApplicationResultDTO>;
}
