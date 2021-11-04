import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingCollection } from 'src/app/models/listing-collection';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.less'],
})
export class ListingsComponent implements OnInit {
  listings: ListingCollection;
  queryTerm: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(queryString => {
      this.queryTerm = queryString.q;
    });
    this.route.data.subscribe((d) => {
      this.listings = d.listings;
    });
  }

  search() {
    this.router.navigate([''], { queryParams: { q: this.queryTerm } });
  }
}
