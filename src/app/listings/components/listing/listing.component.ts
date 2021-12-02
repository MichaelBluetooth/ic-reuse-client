import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingDetails } from 'src/app/core/models/listing-details';
import { ListingsService } from 'src/app/core/services/listings.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.less'],
})
export class ListingComponent implements OnInit {
  listing: ListingDetails;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingsService
  ) {}

  ngOnInit(): void {
    this.listingService
      .getListing(this.route.snapshot.params['id'])
      .subscribe((listing: ListingDetails) => {
        this.listing = listing;
      });
  }
}
