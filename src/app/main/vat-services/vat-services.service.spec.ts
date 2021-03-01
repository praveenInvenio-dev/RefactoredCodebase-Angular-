import { TestBed } from '@angular/core/testing';

import { VatServicesService } from './vat-services.service';

describe('VatServicesService', () => {
  let service: VatServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
