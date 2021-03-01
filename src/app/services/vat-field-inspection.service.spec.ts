import { TestBed } from '@angular/core/testing';

import { VatFieldInspectionService } from './vat-field-inspection.service';

describe('VatFieldInspectionService', () => {
  let service: VatFieldInspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatFieldInspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
