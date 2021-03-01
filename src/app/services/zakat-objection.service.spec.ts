import { TestBed } from '@angular/core/testing';

import { ZakatObjectionService } from './zakat-objection.service';

describe('ZakatObjectionService', () => {
  let service: ZakatObjectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZakatObjectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
