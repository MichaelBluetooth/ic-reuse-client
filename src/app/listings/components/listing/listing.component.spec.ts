import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ListingDetails } from 'src/app/core/models/listing-details';
import { PricePipe } from 'src/app/core/pipes/price/price.pipe';
import { ToListingImagePipe } from 'src/app/core/pipes/to-listing-image/to-listing-image.pipe';
import { ListingsService } from 'src/app/core/services/listings.service';

import { ListingComponent } from './listing.component';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  let mockListingService = jasmine.createSpyObj('listingSvc', ['getListing']);
  let mockActivatedRoute = { snapshot: { params: { id: '12345' } } };
  let mockListing: ListingDetails = {
    id: '12345',
    name: 'Name Here',
    description: 'This is the description',
    price: 10,
    tags: ['tag1', 'tag2'],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingComponent, PricePipe, ToListingImagePipe],
      providers: [
        { provide: ListingsService, useValue: mockListingService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockListingService.getListing.and.returnValue(of(mockListing));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  [
    {
      field: 'name',
      elementQuery: '#listingName',
      expectedText: mockListing.name,
    },
    {
      field: 'price',
      elementQuery: '#listingPrice',
      expectedText: '$10.00',
    },
    {
      field: 'description',
      elementQuery: '#listingDescription',
      expectedText: mockListing.description,
    },
  ].forEach((testCase) => {
    it(`should display the ${testCase.field}`, () => {
      const element = fixture.debugElement.query(By.css(testCase.elementQuery));
      expect(element?.nativeElement.textContent).toEqual(testCase.expectedText);
    });
  });

  it('should display the tags', () => {
    const badges = fixture.debugElement.queryAll(By.css('.badge')).map(el => el.nativeElement.textContent);
    expect(badges).toEqual(mockListing.tags);
  });
});
