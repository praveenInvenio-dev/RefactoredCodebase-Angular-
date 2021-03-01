import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestInstallmentComponent } from './request-installment.component';

describe('RequestInstallmentComponent', () => {
  let component: RequestInstallmentComponent;
  let fixture: ComponentFixture<RequestInstallmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestInstallmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
