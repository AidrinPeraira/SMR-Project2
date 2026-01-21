import { IOTPGenerator } from "@/application/interfaces/service/IOTPGenerator.js";

export class OtpGenerator implements IOTPGenerator {
  /**
   * this function makes a string of numbers
   * by randomly selecting a digit from 0 to 9
   * to make an otp of given length
   *
   * @param length number of digits in otp
   * @returns otp as a string
   */
  generate(length: number): string {
    const digits = "0123456789";
    let otp = "";

    for (let i = 0; i < length; i++) {
      otp += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    return otp;
  }
}
