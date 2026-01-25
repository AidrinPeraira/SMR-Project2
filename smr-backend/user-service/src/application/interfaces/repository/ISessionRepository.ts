import { SessionData } from "@smr/shared";

export interface ISessionRepository {
  save(sessionId: string, data: SessionData, ttl: number): Promise<void>;
  get(sessionId: string): Promise<SessionData | null>;
  delete(sessionId: string): Promise<void>;
  update(sessionId: string, data: Partial<SessionData>): Promise<void>;
}
