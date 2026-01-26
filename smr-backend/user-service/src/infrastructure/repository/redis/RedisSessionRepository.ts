import { AppConfig } from "@/application.config.js";
import { ISessionRepository } from "@/application/interfaces/repository/ISessionRepository.js";
import { SessionData } from "@smr/shared";
import Redis from "ioredis";

export class RedisSessionRepository implements ISessionRepository {
  private client: Redis;
  private readonly PREFIX = "session:";

  constructor() {
    this.client = new Redis({
      host: AppConfig.REDIS_HOST,
      port: AppConfig.REDIS_PORT,
    });
  }

  async save(sessionId: string, data: SessionData, ttl: number): Promise<void> {
    await this.client.set(
      `${this.PREFIX}${sessionId}`,
      JSON.stringify(data),
      "EX",
      ttl,
    );
  }

  async get(sessionId: string): Promise<SessionData | null> {
    const raw = await this.client.get(`${this.PREFIX}${sessionId}`);
    return raw ? JSON.parse(raw) : null;
  }

  async delete(sessionId: string): Promise<void> {
    await this.client.del(`${this.PREFIX}${sessionId}`);
  }

  async update(sessionId: string, data: Partial<SessionData>): Promise<void> {
    const current = await this.get(sessionId);
    if (current) {
      const updated = { ...current, ...data };
      await this.save(sessionId, updated, 604800); // 7 days default
    }
  }
}
