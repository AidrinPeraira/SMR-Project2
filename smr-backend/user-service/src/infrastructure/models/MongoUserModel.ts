import { AccountStatus, UserRoles } from "@smr/shared";
import { Document, model, Schema } from "mongoose";

export interface UserDoc extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  profileImage?: string | null;
  role: UserRoles;
  emailVerified: boolean;
  accountStatus: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDoc>({
  userId: { type: String, required: true, unique: true, index: true },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false },

  passwordHash: { type: String, required: true },
  profileImage: { type: String, default: null },

  role: {
    type: String,
    enum: Object.values(UserRoles),
    default: UserRoles.PASSENGER,
  },

  emailVerified: { type: Boolean, default: false },
  accountStatus: {
    type: String,
    enum: Object.values(AccountStatus),
    default: AccountStatus.ACTIVE,
  },

  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export const UserModel = model<UserDoc>("User", UserSchema);
