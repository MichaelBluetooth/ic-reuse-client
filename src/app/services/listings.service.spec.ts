import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddListing } from '../models/add-listing';
import { ListingsService } from './listings.service';

describe('ListingsService', () => {
  let service: ListingsService;
  let mockHttp = jasmine.createSpyObj('http', ['get', 'post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockHttp }],
    });
    service = TestBed.inject(ListingsService);
  });

  it('should execute the expected API when getting a collection of listings', () => {
    const mockResult = {results: []};
    mockHttp.get.and.returnValue(of(mockResult));
    service.getListings().subscribe(() => {
      expect(mockHttp.get).toHaveBeenCalledWith(environment.baseUrl + 'listings');      
    });
  });

  it('should execute the expected API when getting a specific listing resource', () => {
    const mockResult = {id: 'test_id'};
    mockHttp.get.and.returnValue(of(mockResult));
    service.getListing(mockResult.id).subscribe(() => {
      expect(mockHttp.get).toHaveBeenCalledWith(environment.baseUrl + 'listings/' + mockResult.id);
    });
  });

  it('should execute the expected API when creating a new listing', () => {
    const newListing: AddListing = {
      name: 'test',
      price: 42,
      description: 'test_description',
      tags: ['tag1', 'tag2'],
      image: <File> new Blob([""], {type: 'text'}) //a fake file!
    };

    mockHttp.post.and.returnValue(of({}));
    service.addListing(newListing).subscribe(_ => {
      expect(mockHttp.post).toHaveBeenCalledWith(environment.baseUrl + 'listings', new FormData());
    });
  });
});