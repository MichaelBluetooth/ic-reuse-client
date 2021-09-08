import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListingCollection } from '../models/listing-collection';
import { ListingDetails } from '../models/listing-details';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor(private http: HttpClient) {}

  getListings(): Observable<ListingCollection> {
    return this.http
      .get('https://reuseventory.herokuapp.com/api/listings')
      .pipe(
        map((resp: any) => {
          return resp as ListingCollection;
        })
      );
  }

  getListing(id: string): Observable<ListingDetails> {
    return this.http
      .get(`https://reuseventory.herokuapp.com/api/listings/${id}`)
      .pipe(
        map((resp: any) => {
          return resp as ListingDetails;
        })
      );
  }
}
