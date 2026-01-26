import { IDriverRepository } from "@/application/interfaces/repository/IDriverRepository.js";
import { DriverEntity } from "@/domain/entities/DriverEntity.js";
import { DriverDoc } from "@/infrastructure/database/models/MongoDriverModel.js";
import { MongoBaseRepository } from "./MongoBaseRepository.js";
import { Model } from "mongoose";

export class MongoDriverRepository
  extends MongoBaseRepository<DriverEntity, DriverDoc>
  implements IDriverRepository
{
  private readonly _driverModel: Model<DriverDoc>;

  constructor(driverModel: Model<DriverDoc>) {
    super(driverModel, "driverId");
    this._driverModel = driverModel;
  }

  protected _toEntity(doc: DriverDoc): DriverEntity {
    return {
      driverId: doc.driverId,
      userId: doc.userId,
      licenseNumber: doc.licenseNumber,
      licenseExpiry: doc.licenseExpiry,
      licenseImage: doc.licenseImage,
      isVerified: doc.isVerified,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async findByUserId(userId: string): Promise<DriverEntity | null> {
    const driver = await this._driverModel.findOne({ userId }).lean().exec();
    return driver ? this._toEntity(driver as DriverDoc) : null;
  }
}
