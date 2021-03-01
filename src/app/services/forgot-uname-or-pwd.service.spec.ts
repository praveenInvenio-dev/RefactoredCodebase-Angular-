import { TestBed } from '@angular/core/testing';

import { ForgotUNameOrPwdService } from './forgot-uname-or-pwd.service';

describe('ForgotUNameOrPwdService', () => {
  let service: ForgotUNameOrPwdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotUNameOrPwdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
