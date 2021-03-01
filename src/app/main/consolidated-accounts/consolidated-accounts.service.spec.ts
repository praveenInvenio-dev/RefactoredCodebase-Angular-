import { TestBed } from '@angular/core/testing';

import { ConsolidatedAccountsService } from './consolidated-accounts.service';

describe('ConsolidatedAccountsService', () => {
  let service: ConsolidatedAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsolidatedAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
