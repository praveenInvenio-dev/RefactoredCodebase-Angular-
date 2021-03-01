import { TestBed } from '@angular/core/testing';

import { VatrefundService } from './vatrefund.service';

describe('VatrefundService', () => {
  let service: VatrefundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatrefundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
