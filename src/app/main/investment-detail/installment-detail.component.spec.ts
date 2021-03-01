import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentDetailComponent } from './installment-detail.component';

describe('InvestmentDetailComponent', () => {
  let component: InstallmentDetailComponent;
  let fixture: ComponentFixture<InstallmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstallmentDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
