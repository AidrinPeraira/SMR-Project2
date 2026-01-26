import { ISessionRepository } from "@/application/interfaces/repository/ISessionRepository.js";
import { ILogoutUserUseCase } from "@/application/interfaces/use-case/auth/ILogoutUserUseCase.js";

export class LogoutUserUseCase implements ILogoutUserUseCase {
  constructor(private readonly _sessionRepository: ISessionRepository) {}

  async execute(sessionId: string): Promise<void> {
    if (sessionId) {
      await this._sessionRepository.delete(sessionId);
    }
  }
}
