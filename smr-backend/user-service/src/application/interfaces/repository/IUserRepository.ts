import { IBaseRepository } from "@/application/interfaces/repository/IBaseRepository.js";
import { UserEntity } from "@/domain/entities/UserEntity.js";

export interface IUserRepository extends IBaseRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
}
