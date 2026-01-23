import {
  LoginUserRequestDTO,
  LoginUserResult,
} from "@/application/dto/UserDTO.js";

export interface ILoginUserUseCase {
  execute(input: LoginUserRequestDTO): Promise<LoginUserResult>;
}
