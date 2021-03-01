import { TestBed } from '@angular/core/testing';

import { TinDeregistrationService } from './tin-deregistration.service';

describe('TinDeregistrationService', () => {
  let service: TinDeregistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinDeregistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
