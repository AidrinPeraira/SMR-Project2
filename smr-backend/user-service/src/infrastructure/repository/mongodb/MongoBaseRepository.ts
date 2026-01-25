import { IBaseRepository } from "@/application/interfaces/repository/IBaseRepository.js";
import {
  AppMessages,
  HttpStatus,
  RepoErrorCode,
  RepositoryError,
} from "@smr/shared";
import { Model, Document, QueryFilter } from "mongoose";

/**
 * This is a base repository for mongodb.
 * This class contains the common methods
 * we use on mongo db documents.
 *
 * The ones common for all the repos we will create
 *
 */
export abstract class MongoBaseRepository<
  EntityType,
  DocType extends Document,
> implements IBaseRepository<EntityType> {
  constructor(
    protected readonly model: Model<DocType>,
    private readonly _customIdName: string,
  ) {}

  /**
   * This function is forced on classes to.
   * This function is to convert the document into a shape needed for the domain
   * The reutn is a entity
   * @param doc The document we get after a querry
   */
  protected abstract _toEntity(doc: DocType): EntityType;

  async findById(id: string): Promise<EntityType | null> {
    const doc = await this.model.findById(id).lean().exec();
    return doc ? this._toEntity(doc as DocType) : null;
  }

  async save(item: EntityType): Promise<EntityType> {
    const created = await this.model.create(
      item as unknown as Partial<DocType>,
    );
    return this._toEntity(created);
  }

  async update(
    customId: string,
    item: Partial<EntityType>,
  ): Promise<EntityType> {
    const query: QueryFilter<DocType> = {
      [this._customIdName]: customId,
    };

    const updatedDoc = await this.model
      .findOneAndUpdate(
        query,
        { $set: item as unknown as Partial<DocType> },
        {
          new: true,
          lean: true,
        },
      )
      .exec();

    if (!updatedDoc) {
      throw new RepositoryError(
        RepoErrorCode.DOCUMENT_NOT_FOUND,
        AppMessages.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this._toEntity(updatedDoc as unknown as DocType);
  }

  async delete(customId: string): Promise<boolean> {
    const query: QueryFilter<DocType> = {
      [this._customIdName]: customId,
    };
    const result = await this.model.deleteOne(query).exec();

    return result.deletedCount > 0;
  }
}
