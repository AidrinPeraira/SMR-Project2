import { IDriverApplicationRepository } from "@/application/interfaces/repository/IDriverApplicationRepository.js";
import { DriverApplicationEntity } from "@/domain/entities/DriverApplicationEntity.js";
import { DriverApplicationDoc } from "@/infrastructure/database/models/MongoDriverApplicationModel.js";
import { MongoBaseRepository } from "@/infrastructure/repository/mongodb/MongoBaseRepository.js";
import { Model } from "mongoose";

export class MongoDriverApplicationRepository
  extends MongoBaseRepository<DriverApplicationEntity, DriverApplicationDoc>
  implements IDriverApplicationRepository
{
  private readonly _driverApplicationModel;

  constructor(driverApplicationModel: Model<DriverApplicationDoc>) {
    super(driverApplicationModel, "applicationId");
    this._driverApplicationModel = driverApplicationModel;
  }

  /**
   * This function will be used to convert _id to id i
   * It is a mapping function.
   * Also removes unnecessary mongoose fields before return
   *
   * @param doc the document from mongoDB query
   */
  _toEntity(doc: DriverApplicationDoc): DriverApplicationEntity {
    return {
      applicationId: doc.applicationId,
      userId: doc.userId,
      email: doc.email,

      licenseNumber: doc.licenseNumber,
      licenseExpiry: doc.licenseExpiry,
      licenseImage: doc.licenseImage,

      vehicleType: doc.vehicleType,
      vehicleBrand: doc.vehicleBrand,
      vehicleModel: doc.vehicleModel,
      vehicleImage: doc.vehicleImage,

      registrationNumber: doc.registrationNumber,
      registrationImage: doc.registrationImage,
      registrationExpiry: doc.registrationExpiry,

      insuranceNumber: doc.insuranceNumber,
      insuranceExpiry: doc.insuranceExpiry,
      insuranceImage: doc.insuranceImage,

      status: doc.status,
      isActive: doc.isActive,
      adminComments: doc.adminComments,

      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  /**
   * this funciton searches for an application
   * belonging to the user with given userId
   *
   * @param userId userid of user
   */
  async findByUserId(userId: string): Promise<DriverApplicationEntity | null> {
    const doc = await this._driverApplicationModel
      .findOne({ userId: userId })
      .lean()
      .exec();

    if (!doc) return null;

    return this._toEntity(doc);
  }
}
