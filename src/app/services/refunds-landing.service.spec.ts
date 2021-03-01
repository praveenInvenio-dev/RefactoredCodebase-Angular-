import { TestBed } from '@angular/core/testing';

import { RefundsLandingService } from './refunds-landing.service';

describe('RefundsLandingService', () => {
  let service: RefundsLandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefundsLandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
