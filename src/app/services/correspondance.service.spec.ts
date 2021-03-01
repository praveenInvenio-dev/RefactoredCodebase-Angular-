import { TestBed } from '@angular/core/testing';

import { CorrespondanceService } from './correspondance.service';

describe('CorrespondanceService', () => {
  let service: CorrespondanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrespondanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
