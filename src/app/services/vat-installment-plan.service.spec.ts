import { TestBed } from '@angular/core/testing';

import { VatInstallmentPlanService } from './vat-installment-plan.service';

describe('VatInstallmentPlanService', () => {
  let service: VatInstallmentPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatInstallmentPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
