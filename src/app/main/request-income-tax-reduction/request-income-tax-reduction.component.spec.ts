import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestIncomeTaxReductionComponent } from './request-income-tax-reduction.component';

describe('RequestIncomeTaxReductionComponent', () => {
  let component: RequestIncomeTaxReductionComponent;
  let fixture: ComponentFixture<RequestIncomeTaxReductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestIncomeTaxReductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestIncomeTaxReductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
