import { DriverApplicationEntity } from "@/domain/entities/DriverApplicationEntity.js";
import { IBaseRepository } from "@/application/interfaces/repository/IBaseRepository.js";

export interface IDriverApplicationRepository extends IBaseRepository<DriverApplicationEntity> {
  findByUserId(userId: string): Promise<DriverApplicationEntity | null>;
}
