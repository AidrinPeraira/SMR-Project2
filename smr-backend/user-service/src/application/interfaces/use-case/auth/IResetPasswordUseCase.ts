export interface IResetPasswordUseCase {
  execute(email: string, token: string, newPassword: string): Promise<void>;
}
