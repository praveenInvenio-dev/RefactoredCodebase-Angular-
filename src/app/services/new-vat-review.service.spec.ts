import { TestBed } from '@angular/core/testing';

import { NewVatReviewService } from './new-vat-review.service';

describe('NewVatReviewService', () => {
  let service: NewVatReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewVatReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
