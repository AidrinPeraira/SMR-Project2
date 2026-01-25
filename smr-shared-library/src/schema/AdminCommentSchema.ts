import { DriverApplicationStatus } from "enums/DriverEnums.js";
import { z } from "zod";

export const AdminCommentSchema = z.object({
  adminId: z.string().min(1, "Admin ID is required"),
  content: z
    .string()
    .trim()
    .min(3, "Comment must be at least 3 characters long")
    .max(500, "Comment cannot exceed 500 characters"),
  statusAtTime: z.nativeEnum(DriverApplicationStatus),
  timestamp: z.date().default(() => new Date()),
});

export type AdminComment = z.infer<typeof AdminCommentSchema>;
