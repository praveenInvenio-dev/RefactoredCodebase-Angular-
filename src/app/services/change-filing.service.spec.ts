import { TestBed } from '@angular/core/testing';

import { ChangeFilingService } from './change-filing.service';

describe('ChangeFilingService', () => {
  let service: ChangeFilingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeFilingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
