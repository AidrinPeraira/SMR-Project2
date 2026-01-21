import { IPasswordHasher } from "@/application/interfaces/service/IPasswordHasher.js";
import bcrypt from "bcryptjs";

/**
 * Creates a password hasher object
 */
export class BcryptPasswordHasher implements IPasswordHasher {
  private readonly _saltRounds = 10;

  /**
   *
   * @param password string password
   * @returns hashed password
   */
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this._saltRounds);
  }

  /**
   *
   * @param password string password
   * @param hash hashed password from db
   * @returns boolean comparison result
   */
  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
