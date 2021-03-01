import { TestBed } from '@angular/core/testing';

import { DatepickerUtilitiesService } from './datepicker-utilities.service';

describe('DatepickerUtilitiesService', () => {
  let service: DatepickerUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatepickerUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
