import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ListingsService } from 'src/app/services/listings.service';

import { AddListingComponent } from './add-listing.component';

describe('AddListingComponent', () => {
  let component: AddListingComponent;
  let fixture: ComponentFixture<AddListingComponent>;
  let mockListingService = jasmine.createSpyObj('listingService', [
    'addListing',
  ]);
  let mockRouter = jasmine.createSpyObj('router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: ListingsService, useValue: mockListingService },
        { provide: Router, useValue: mockRouter },
      ],
      declarations: [AddListingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    setField('#name', 'test_name');
    setField('#price', 20);
    setField('#description', 'test_description');
    setField('#tags', 'tag1, tag2');
    //We cannot programatically set an input where type=file for security reasons! Browsers won't let us!

    const mockResponse = {id: 'test-id'};

    mockListingService.addListing.and.returnValue(of(mockResponse));

    fixture.debugElement.query(By.css('#submitBtn')).nativeElement.click();

    expect(mockListingService.addListing).toHaveBeenCalledWith(jasmine.objectContaining({
      name: 'test_name',
      price: 20,
      description: 'test_description',
      tags: ['tag1', 'tag2']
    }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['listings', mockResponse.id]);
  });

  let setField = function (fieldSelector: string, fieldValue: any) {
    const field = fixture.debugElement.query(
      By.css(fieldSelector)
    ).nativeElement;
    field.value = fieldValue;
    field.dispatchEvent(new Event('input'));
  };
});