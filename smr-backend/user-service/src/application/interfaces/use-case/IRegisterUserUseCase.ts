import {
  RegisterUserRequestDTO,
  RegisterUserResultDTO,
} from "@/application/dto/UserDTO.js";

export interface IRegisterUserUseCase {
  execute(input: RegisterUserRequestDTO): Promise<RegisterUserResultDTO>;
}
