export interface IUserIDGenerator {
  createUID(): `UID${string}`;
}
