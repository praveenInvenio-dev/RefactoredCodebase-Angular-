import { TestBed } from '@angular/core/testing';

import { RequestCertificateService } from './request-certificate.service';

describe('RequestCertificateService', () => {
  let service: RequestCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
