import { Document, Schema, model } from "mongoose";

export interface VehicleDoc extends Document {
  vehicleId: string;
  driverId: string;

  type: string;
  brand: string;
  modelName: string;
  image: string;

  registrationNumber: string;
  registrationImage: string;
  registrationExpiry: Date;

  insuranceNumber: string;
  insuranceImage: string;
  insuranceExpiry: Date;

  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema = new Schema<VehicleDoc>({
  vehicleId: { type: String, required: true, unique: true },
  driverId: { type: String, required: true },

  type: { type: String, required: true },
  brand: { type: String, required: true },
  modelName: { type: String, required: true },
  image: { type: String, required: true },

  registrationNumber: { type: String, required: true },
  registrationImage: { type: String, required: true },
  registrationExpiry: { type: Date, required: true },

  insuranceNumber: { type: String, required: true },
  insuranceImage: { type: String, required: true },
  insuranceExpiry: { type: Date, required: true },

  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() },
});

export const VehicleModel = model<VehicleDoc>("Vehicle", VehicleSchema);
