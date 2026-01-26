import { DriverEntity } from "@/domain/entities/DriverEntity.js";
import { IBaseRepository } from "@/application/interfaces/repository/IBaseRepository.js";

export interface IDriverRepository extends IBaseRepository<DriverEntity> {
  findByUserId(userId: string): Promise<DriverEntity | null>;
}
