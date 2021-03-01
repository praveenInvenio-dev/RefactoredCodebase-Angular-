import { TestBed } from '@angular/core/testing';

import { NewRequestRulingService } from './new-request-ruling.service';

describe('NewRequestRulingService', () => {
  let service: NewRequestRulingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewRequestRulingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
