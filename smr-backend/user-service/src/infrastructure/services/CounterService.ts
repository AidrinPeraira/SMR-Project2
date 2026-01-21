import { ICounterService } from "@/application/interfaces/service/ICounterService.js";
import { CounterDoc } from "@/infrastructure/database/models/MongoCounterModel.js";
import { Model } from "mongoose";

export class MongoCounterService implements ICounterService {
  constructor(private readonly _counterModel: Model<CounterDoc>) {}

  /**
   *
   * queries count collection to find , update and return newest count for next document
   *
   * @param key identifier for the counter
   * @returns the next count
   */
  async getNextSequence(key: string): Promise<number> {
    const result = await this._counterModel.findOneAndUpdate(
      { _id: key },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    return result.seq;
  }
}
