import { TestBed } from '@angular/core/testing';

import { SukukBondsService } from './sukuk-bonds.service';

describe('SukukBondsService', () => {
  let service: SukukBondsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SukukBondsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
