import { TestBed } from '@angular/core/testing';

import { ListingsResolver } from './listings.resolver';

describe('ListingsResolver', () => {
  let resolver: ListingsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListingsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
