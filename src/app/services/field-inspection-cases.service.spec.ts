import { TestBed } from '@angular/core/testing';

import { FieldInspectionCasesService } from './field-inspection-cases.service';

describe('FieldInspectionCasesService', () => {
  let service: FieldInspectionCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldInspectionCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
