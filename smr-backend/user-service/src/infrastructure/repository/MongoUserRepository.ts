import { IUserRepository } from "@/application/interfaces/repository/IUserRepository.js";
import { UserEntity } from "@/domain/entities/UserEntity.js";
import { UserDoc } from "@/infrastructure/database/models/MongoUserModel.js";
import { MongoBaseRepository } from "@/infrastructure/repository/MongoBaseRepository.js";
import { Model } from "mongoose";

export class MongoUserRepository
  extends MongoBaseRepository<UserEntity, UserDoc>
  implements IUserRepository
{
  private readonly _userModel;

  constructor(userModel: Model<UserDoc>) {
    super(userModel, "userId");
    this._userModel = userModel;
  }

  /**
   * This function will be used to convert _id to id i
   * It is a mapping function.
   * Also removes unnecessary mongoose fields before return
   *
   * @param doc the document from mongoDB query
   */
  _toEntity(doc: UserDoc): UserEntity {
    return {
      userId: doc.userId,
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
      phoneNumber: doc.phoneNumber,
      passwordHash: doc.passwordHash,
      profileImage: doc.profileImage,
      role: doc.role,
      emailVerified: doc.emailVerified,
      accountStatus: doc.accountStatus,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  /**
   * this funciton searches for a user based on email
   * it return null or the user entity
   *
   * @param email email of user to find from use case
   */
  async findByEmail(email: string): Promise<UserEntity | null> {
    const userDoc = await this._userModel
      .findOne({ email: email })
      .lean()
      .exec();
    if (!userDoc) return null;
    return this._toEntity(userDoc);
  }
}
