import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListingsService } from './listings.service';

describe('ListingsService', () => {
  let service: ListingsService;
  let mockHttp = jasmine.createSpyObj('http', ['get']);

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
});
