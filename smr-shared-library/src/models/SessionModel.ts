// smr-shared-library/src/models/session.model.ts
import { z } from "zod";

export const SessionSchema = z.object({
  userId: z.string(),
  role: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  isBlocked: z.boolean().default(false),
  createdAt: z.number(),
});

export type SessionData = z.infer<typeof SessionSchema>;
