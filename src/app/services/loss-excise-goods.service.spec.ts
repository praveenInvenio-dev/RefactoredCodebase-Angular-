import { TestBed } from '@angular/core/testing';

import { LossExciseGoodsService } from './loss-excise-goods.service';

describe('LossExciseGoodsService', () => {
  let service: LossExciseGoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LossExciseGoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
