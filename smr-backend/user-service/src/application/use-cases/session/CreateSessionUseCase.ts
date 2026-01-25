import { AppConfig } from "@/application.config.js";
import { SessionCreationDTO } from "@/application/dto/SessionDTO.js";
import { ISessionRepository } from "@/application/interfaces/repository/ISessionRepository.js";
import { ICounterService } from "@/application/interfaces/service/ICounterService.js";
import { ICreateSessionUseCase } from "@/application/interfaces/use-case/session/ICreateSessionUseCase.js";
import { SessionData } from "@smr/shared";

export class CreateSessionUseCase implements ICreateSessionUseCase {
  constructor(
    private readonly _sessionRepository: ISessionRepository,
    private readonly _counterService: ICounterService,
  ) {}

  /**
   * This use case creates a new sesion with a
   * new id with the given details.
   *
   * @param params data to create session
   * @returns
   */
  async execute(params: SessionCreationDTO): Promise<string> {
    const nextSeq = await this._counterService.getNextSequence("user_counter");
    const sessionID = `SID${String(nextSeq).padStart(5, "0")}`;

    const sessionData: SessionData = {
      userId: params.userId,
      role: params.role,
      accessToken: params.accessToken,
      refreshToken: params.refreshToken,
      ipAddress: params.ip,
      userAgent: params.userAgent,
      isBlocked: false,
      createdAt: Date.now(),
    };

    const TTL = AppConfig.ACCESS_TOKEN_LIFE;

    await this._sessionRepository.save(sessionID, sessionData, TTL);

    return sessionID;
  }
}
