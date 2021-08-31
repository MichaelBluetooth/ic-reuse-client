import { Listing } from "./listing";

export interface ListingCollection {
  results: Listing[];
  currentPage: number;
  pageCount: 1;
  pageSize: number;
  firstResult: 1;
  lastResult: number;
}
