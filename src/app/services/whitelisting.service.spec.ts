import { TestBed } from '@angular/core/testing';

import { WhitelistingService } from './whitelisting.service';

describe('WhitelistingService', () => {
  let service: WhitelistingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhitelistingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
