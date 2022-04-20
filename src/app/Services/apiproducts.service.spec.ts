import { TestBed } from '@angular/core/testing';

import { APIProductsService } from './apiproducts.service';

describe('APIProductsService', () => {
  let service: APIProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
