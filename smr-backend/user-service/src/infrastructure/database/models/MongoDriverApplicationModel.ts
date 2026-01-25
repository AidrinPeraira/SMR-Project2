import { AdminComment, DriverApplicationStatus } from "@smr/shared";
import { Document, model, Schema } from "mongoose";

//sub schema for admin comments
const AdminCommentSchema = new Schema<AdminComment>(
  {
    adminId: { type: String, required: true },
    content: { type: String, required: true },
    statusAtTime: {
      type: String,
      enum: Object.values(DriverApplicationStatus),
      required: true,
    },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false },
);

export interface DriverApplicationDoc extends Document {
  applicationId: string;
  userId: string;
  email: string;

  licenseNumber: string;
  licenseExpiry: Date;
  licenseImage: string;

  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleImage: string;

  registrationNumber: string;
  registrationImage: string;
  registrationExpiry: Date;

  insuranceNumber: string;
  insuranceExpiry: Date;
  insuranceImage: string;

  status: DriverApplicationStatus;
  isActive: boolean;
  adminComments: AdminComment[];

  createdAt: Date;
  updatedAt: Date;
}

const DriverApplicationSchema = new Schema<DriverApplicationDoc>({
  applicationId: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  email: { type: String, required: true },

  licenseNumber: { type: String, required: true },
  licenseExpiry: { type: Date, required: true },
  licenseImage: { type: String, required: true },

  vehicleType: { type: String, required: true },
  vehicleBrand: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vehicleImage: { type: String, required: true },

  registrationNumber: { type: String, required: true },
  registrationImage: { type: String, required: true },
  registrationExpiry: { type: Date, required: true },

  insuranceNumber: { type: String, required: true },
  insuranceExpiry: { type: Date, required: true },
  insuranceImage: { type: String, required: true },

  status: {
    type: String,
    enum: Object.values(DriverApplicationStatus),
    default: DriverApplicationStatus.PENDING,
  },
  isActive: { type: Boolean, default: true },

  adminComments: { type: [AdminCommentSchema], default: [] },

  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export const DriverApplicationModel = model<DriverApplicationDoc>(
  "DriverApplication",
  DriverApplicationSchema,
);
