import { Listing } from "./listing";

export interface ListingCollection {
  results: Listing[];
  currentPage: number;
  pageCount: number;
  pageSize: number;
  firstResult: number;
  lastResult: number;
  rowCount: number;
}
