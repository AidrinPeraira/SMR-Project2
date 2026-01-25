export interface SessionCreationDTO {
  userId: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  ip?: string;
  userAgent?: string;
}
