import { IVehicleRepository } from "@/application/interfaces/repository/IVehicleRepository.js";
import { VehicleEntity } from "@/domain/entities/VehicleEntity.js";
import { VehicleDoc } from "@/infrastructure/database/models/MongoVehicleModel.js";
import { MongoBaseRepository } from "./MongoBaseRepository.js";
import { Model } from "mongoose";

export class MongoVehicleRepository
  extends MongoBaseRepository<VehicleEntity, VehicleDoc>
  implements IVehicleRepository
{
  private readonly _vehicleModel;

  constructor(vehicleModel: Model<VehicleDoc>) {
    super(vehicleModel, "vehicleId");
    this._vehicleModel = vehicleModel;
  }

  protected _toEntity(doc: VehicleDoc): VehicleEntity {
    return {
      vehicleId: doc.vehicleId,
      driverId: doc.driverId,
      type: doc.type,
      brand: doc.brand,
      modelName: doc.modelName,
      image: doc.image,
      registrationNumber: doc.registrationNumber,
      registrationImage: doc.registrationImage,
      registrationExpiry: doc.registrationExpiry,
      insuranceNumber: doc.insuranceNumber,
      insuranceImage: doc.insuranceImage,
      insuranceExpiry: doc.insuranceExpiry,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async findByDriverId(driverId: string): Promise<VehicleEntity[]> {
    const vehicles = await this._vehicleModel.find({ driverId }).lean().exec();
    return vehicles.map((vehicle) => this._toEntity(vehicle as VehicleDoc));
  }
}
