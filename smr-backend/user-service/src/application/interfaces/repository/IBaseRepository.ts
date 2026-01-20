export interface IBaseRepository<EntityType> {
  findById(id: string): Promise<EntityType | null>;
  save(item: EntityType): Promise<EntityType>;
  update(customId: string, item: Partial<EntityType>): Promise<EntityType>;
  delete(id: string): Promise<boolean>;
}
