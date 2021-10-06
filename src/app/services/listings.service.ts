import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddListing } from '../models/add-listing';
import { ListingCollection } from '../models/listing-collection';
import { ListingDetails } from '../models/listing-details';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor(private http: HttpClient) {}

  getListings(): Observable<ListingCollection> {
    return this.http.get(`${environment.baseUrl}listings`).pipe(
      map((resp: any) => {
        return resp as ListingCollection;
      })
    );
  }

  getListing(id: string): Observable<ListingDetails> {
    return this.http.get(`${environment.baseUrl}listings/${id}`).pipe(
      map((resp: any) => {
        return resp as ListingDetails;
      })
    );
  }

  addListing(listing: AddListing): Observable<ListingDetails> {
    const formData: FormData = new FormData();
    formData.append(
      'json',
      JSON.stringify({
        name: listing.name,
        price: listing.price,
        description: listing.description,
        tags: listing.tags,
      })
    );
    formData.append('image', listing.image);

    return this.http.post<ListingDetails>(
      `${environment.baseUrl}listings`,
      formData
    );
  }
}
