import { TestBed } from '@angular/core/testing';

import { ObjectionReviewsService } from './objection-reviews.service';

describe('ObjectionReviewsService', () => {
  let service: ObjectionReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectionReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
