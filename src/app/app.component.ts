import { Component, OnInit } from '@angular/core';
import { ListingCollection } from './models/listing-collection';
import { ListingsService } from './services/listings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  listings: ListingCollection;

  constructor(private listingService: ListingsService) {}

  ngOnInit() {
    this.listingService
      .getListings()
      .subscribe((listings: ListingCollection) => {
        this.listings = listings;
      });
  }
}
