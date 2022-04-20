import { TestBed } from '@angular/core/testing';

import { APIUsersService } from './apiusers.service';

describe('APIUsersService', () => {
  let service: APIUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
