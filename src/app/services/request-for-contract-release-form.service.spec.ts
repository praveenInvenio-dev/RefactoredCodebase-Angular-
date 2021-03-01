import { TestBed } from '@angular/core/testing';

import { RequestForContractReleaseFormService } from './request-for-contract-release-form.service';

describe('RequestForContractReleaseFormService', () => {
  let service: RequestForContractReleaseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestForContractReleaseFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
