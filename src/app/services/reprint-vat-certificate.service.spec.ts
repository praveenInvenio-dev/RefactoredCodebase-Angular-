import { TestBed } from '@angular/core/testing';

import { ReprintVatCertificateService } from './reprint-vat-certificate.service';

describe('ReprintVatCertificateService', () => {
  let service: ReprintVatCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReprintVatCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
