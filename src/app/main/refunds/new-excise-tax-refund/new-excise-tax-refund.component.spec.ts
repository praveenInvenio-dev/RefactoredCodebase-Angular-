import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExciseTaxRefundComponent } from './new-excise-tax-refund.component';

describe('NewExciseTaxRefundComponent', () => {
  let component: NewExciseTaxRefundComponent;
  let fixture: ComponentFixture<NewExciseTaxRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExciseTaxRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExciseTaxRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
