import { TestBed } from '@angular/core/testing';

import { DeferralVatPaymentService } from './deferral-vat-payment.service';

describe('DeferralVatPaymentService', () => {
  let service: DeferralVatPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeferralVatPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
