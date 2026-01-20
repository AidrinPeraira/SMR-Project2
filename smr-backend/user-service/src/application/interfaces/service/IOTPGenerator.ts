export interface IOTPGenerator {
  /**
   * Generates an OTP of the given length.
   *
   * @param length Number of digits to generate
   * @returns OTP as a string
   */
  generate(length: number): string;
}
