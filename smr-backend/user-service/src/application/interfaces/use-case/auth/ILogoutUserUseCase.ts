export interface ILogoutUserUseCase {
  execute(sessionId: string): Promise<void>;
}
