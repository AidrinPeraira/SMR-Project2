import { AppErrorCode, HttpStatus } from "enums";
import { AppError } from "errors/AppError.js";
import { AppMessages } from "messages/AppMessages.js";
import { ZodSchema } from "zod";

/**
 * This function takes the schema and the data as arguments
 * it also takes the return type as a generic
 *
 * the data is parsed with the schema and returned if successful
 * else it throws a validation error
 *
 * @param schema
 */
export function safeParseOrThrow<T>(schema: ZodSchema<T>, payload: unknown) {
  const result = schema.safeParse(payload);

  if (result.success) return result.data;

  const issues = result.error.errors.map((err) => {
    return {
      field: err.path.join("."),
      message: err.message,
    };
  });

  throw new AppError(
    AppErrorCode.VALIDATION_FAILED,
    AppMessages.VALIDATION_FAILED,
    HttpStatus.BAD_REQUEST,
    issues,
  );
}
