import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddListing } from 'src/app/models/add-listing';
import { ListingDetails } from 'src/app/models/listing-details';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.less'],
})
export class AddListingComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  listingForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    price: new FormControl(null),
    description: new FormControl(null),
    tags: new FormControl(null),
    image: new FormControl(null),
  });

  constructor(
    private listingService: ListingsService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  submit() {
    if (this.listingForm.valid) {
      const addListing: AddListing = {
        name: this.listingForm.controls.name.value,
        price: this.listingForm.controls.price.value,
        description: this.listingForm.controls.description.value,
        tags: this.listingForm.controls.tags.value
          .split(',')
          .map((tag: string) => tag.trim()),
        image:
          this.fileInput.nativeElement.files.length > 0
            ? this.fileInput.nativeElement.files[0]
            : null,
      };
      this.listingService
        .addListing(addListing)
        .subscribe((created: ListingDetails) => {
          this.alertService.alert('Successfully created new listing', 'primary');
          this.router.navigate(['listings', created.id]);
        });
    }
  }
}
