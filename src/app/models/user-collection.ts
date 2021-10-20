import { User } from "./user";

export interface UserCollection {
  results: User[];
  currentPage: number;
  pageCount: number;
  pageSize: number;
  firstResult: number;
  lastResult: number;
}
