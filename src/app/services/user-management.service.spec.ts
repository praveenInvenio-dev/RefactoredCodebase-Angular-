import { TestBed } from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ApiConstants} from "src/app/constants/userManagement.constants";

import { UserManagementService } from './user-management.service';

describe('UserManagementService', () => {
  let service: UserManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
