export interface ICounterService {
  /**
   * This function gets the id of the document that tracks the count
   * the id can be user count or vehicle count or any such value
   * each document is built to keep count of the correspondeing id item
   *
   * It then queries the db to return the last updated count
   *
   * @param key "count of what"
   */
  getNextSequence(key: string): Promise<number>;
}

// quick note
//what if the create document fails? shouldn't the count inc be reversed?
