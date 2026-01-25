import { Model } from "mongoose";
import { OtpDoc } from "../database/models/MongoOtpModel";
import { IOTPRepository } from "@/application/interfaces/repository/IOTPRepository.js";
import { OtpModel, OTPType } from "@smr/shared";

/**
 * THis is the repo we initialise and provide to the use cases
 * It  also makes sure the stype is as given in the shared lib
 */
export class MongoOtpRepository implements IOTPRepository {
  constructor(private readonly _otpModel: Model<OtpDoc>) {}

  /**
     * This function gets the data to create a new otp document and saves it
     * otp data looks like: 
     *  {
         email: string;
         otp: string;
         type: OTPType;
         attempts: number;
         expires_at: number;
         created_at: number;
        } 
     * @param otp input data to create otp
     */
  async saveOtp(otp: OtpModel): Promise<void> {
    await this._otpModel
      .findOneAndUpdate(
        { email: otp.email, type: otp.type },
        {
          $set: {
            otp: otp.otp,
            attempts: otp.attempts,
            resends: otp.resends,
            expires_at: otp.expires_at,
            created_at: otp.created_at,
          },
        },
        { upsert: true, new: true },
      )
      .exec();
  }

  /**
   * This function finds the otp document from the database
   * @param email email id of user
   * @param type purpose of otp
   */
  async findOtp(email: string, type: OTPType): Promise<OtpModel | null> {
    const otpDoc = await this._otpModel
      .findOne({ email: email, type: type })
      .lean()
      .exec();

    if (!otpDoc) return null;

    return {
      email: otpDoc.email,
      type: otpDoc.type,
      attempts: otpDoc.attempts,
      resends: otpDoc.resends,
      otp: otpDoc.otp,
      expires_at: otpDoc.expires_at,
      created_at: otpDoc.created_at,
    };
  }

  /**
   * This function deletes the otp document from the database
   * @param email email id of user
   * @param type purpose of otp
   */
  async deleteOtp(email: string, type: OTPType): Promise<void> {
    await this._otpModel.deleteOne({ email: email, type: type }).exec();
  }

  /**
   * This function finds and updates the otp document from the database
   * @param email email id of user
   * @param type purpose of otp
   */
  async incrementAttempts(email: string, type: OTPType): Promise<void> {
    await this._otpModel
      .findOneAndUpdate(
        { email: email, type: type },
        {
          $inc: {
            attempts: 1,
          },
        },
        { new: true },
      )
      .exec();
  }
}
