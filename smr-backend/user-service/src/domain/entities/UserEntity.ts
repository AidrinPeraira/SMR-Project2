import { AccountStatus, UserRoles } from "@smr/shared";

export interface UserEntity {
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
