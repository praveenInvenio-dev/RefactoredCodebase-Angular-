import { TestBed } from '@angular/core/testing';

import { RequestIncomeTaxReductionService } from './request-income-tax-reduction.service';

describe('RequestIncomeTaxReductionService', () => {
  let service: RequestIncomeTaxReductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestIncomeTaxReductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
