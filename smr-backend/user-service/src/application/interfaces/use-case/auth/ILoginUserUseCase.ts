import {
  LoginUserRequestDTO,
  LoginUserResultDTO,
} from "@/application/dto/UserDTO.js";

export interface ILoginUserUseCase {
  execute(input: LoginUserRequestDTO): Promise<LoginUserResultDTO>;
}
