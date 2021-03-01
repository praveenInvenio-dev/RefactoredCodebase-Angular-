import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferralVatPaymentComponent } from './deferral-vat-payment.component';

describe('DeferralVatPaymentComponent', () => {
  let component: DeferralVatPaymentComponent;
  let fixture: ComponentFixture<DeferralVatPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeferralVatPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeferralVatPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
