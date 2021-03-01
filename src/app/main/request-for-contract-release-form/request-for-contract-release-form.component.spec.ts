import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForContractReleaseFormComponent } from './request-for-contract-release-form.component';

describe('RequestForContractReleaseFormComponent', () => {
  let component: RequestForContractReleaseFormComponent;
  let fixture: ComponentFixture<RequestForContractReleaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestForContractReleaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForContractReleaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
