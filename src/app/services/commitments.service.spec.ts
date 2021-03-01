import { TestBed } from '@angular/core/testing';

import { CommitmentsService } from './commitments.service';

describe('CommitmentsService', () => {
  let service: CommitmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
