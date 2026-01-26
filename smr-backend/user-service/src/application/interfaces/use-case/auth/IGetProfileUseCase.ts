import { UserProfileResultDTO } from "@/application/dto/UserDTO.js";

export interface IGetProfileUseCase {
  execute(userId: string): Promise<UserProfileResultDTO>;
}
