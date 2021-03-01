import { TestBed } from '@angular/core/testing';

import { ExciseTaxServicesService } from './excise-tax-services.service';

describe('ExciseTaxServicesService', () => {
  let service: ExciseTaxServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExciseTaxServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
