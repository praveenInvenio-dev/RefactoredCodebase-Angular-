import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatInstallmentPlanComponent } from './vat-installment-plan.component';

describe('VatInstallmentPlanComponent', () => {
  let component: VatInstallmentPlanComponent;
  let fixture: ComponentFixture<VatInstallmentPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatInstallmentPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatInstallmentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
