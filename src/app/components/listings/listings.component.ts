import { Component, OnInit } from '@angular/core';
import { ListingCollection } from 'src/app/models/listing-collection';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.less'],
})
export class ListingsComponent implements OnInit {
  listings: ListingCollection;
  queryTerm: string = '';

  constructor(private listingService: ListingsService) {}

  ngOnInit() {
    this.listingService
      .getListings()
      .subscribe((listings: ListingCollection) => {
        this.listings = listings;
      });
  }

  search(){
    this.listingService
      .getListings(this.queryTerm)
      .subscribe((listings: ListingCollection) => {
        this.listings = listings;
      });
  }
}
