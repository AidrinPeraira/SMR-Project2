import { Document, Schema, model } from "mongoose";

export interface DriverDoc extends Document {
  driverId: string;
  userId: string;

  licenseNumber: string;
  licenseExpiry: Date;
  licenseImage: string;

  isVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const DriverSchema = new Schema<DriverDoc>({
  driverId: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },

  licenseNumber: { type: String, required: true },
  licenseExpiry: { type: Date, required: true },
  licenseImage: { type: String, required: true },

  isVerified: { type: Boolean, default: true },

  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() },
});

export const DriverModel = model<DriverDoc>("Driver", DriverSchema);
