import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { of } from 'rxjs';
import { ListingCollection } from 'src/app/models/listing-collection';
import { PricePipe } from 'src/app/pipes/price/price.pipe';
import { ListingsService } from 'src/app/services/listings.service';

import { ListingsComponent } from './listings.component';
import { LocationStrategy } from '@angular/common';

describe('ListingsComponent', () => {
  let component: ListingsComponent;
  let fixture: ComponentFixture<ListingsComponent>;
  let mockListingService = jasmine.createSpyObj('listingService', [
    'getListings',
  ]);
  let mockListingCollection: ListingCollection = {
    results: [
      {
        id: '12345',
        name: 'Dummy Listing 1',
        price: 10,
        tags: ['one', 'two'],
      },
      {
        id: '4723',
        name: 'Dummy Listing 2',
        price: 15,
        tags: ['one'],
      },
    ],
    currentPage: 1,
    firstResult: 1,
    lastResult: 1,
    pageCount: 1,
    pageSize: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ListingsComponent, PricePipe],
      providers: [
        { provide: ListingsService, useValue: mockListingService },
        { provide: LocationStrategy, useClass: MockLocationStrategy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockListingService.getListings.and.returnValue(of(mockListingCollection));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display all the listing results', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody > tr'));
    expect(rows.length).toBe(mockListingCollection.results.length);
  });

  it('should display the name of each listing', () => {
    const names = fixture.debugElement
      .queryAll(By.css('tbody > tr > td:nth-child(2)'))
      .map((row) => row.nativeElement.textContent);
    expect(names).toEqual(mockListingCollection.results.map((r) => r.name));
  });
});
