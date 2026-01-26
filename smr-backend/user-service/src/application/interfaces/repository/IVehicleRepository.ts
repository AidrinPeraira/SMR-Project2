import { VehicleEntity } from "@/domain/entities/VehicleEntity.js";
import { IBaseRepository } from "@/application/interfaces/repository/IBaseRepository.js";

export interface IVehicleRepository extends IBaseRepository<VehicleEntity> {
  findByDriverId(driverId: string): Promise<VehicleEntity[]>;
}
