import { TestBed } from '@angular/core/testing';

import { SignupComponentsService } from './signup-components.service';

describe('SignupComponentsService', () => {
  let service: SignupComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
