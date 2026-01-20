export interface IBaseRepository<T> {
  getByMongoId(id: string): Promise<T | null>;
  getByCustomId(id: string): Promise<T | null>;
  save(item: T): Promise<T>;
  update(customId: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}
