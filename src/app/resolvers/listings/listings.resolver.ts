import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ListingCollection } from 'src/app/models/listing-collection';
import { ListingsService } from 'src/app/services/listings.service';

@Injectable({
  providedIn: 'root',
})
export class ListingsResolver implements Resolve<ListingCollection> {
  constructor(private listingService: ListingsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ListingCollection> {
    const queryTerm = route.queryParams['q'] ?? null;
    return this.listingService.getListings(queryTerm);
  }
}
