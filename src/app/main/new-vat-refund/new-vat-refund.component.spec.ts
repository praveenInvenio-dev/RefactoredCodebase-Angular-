import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVatRefundComponent } from './new-vat-refund.component';

describe('NewVatRefundComponent', () => {
  let component: NewVatRefundComponent;
  let fixture: ComponentFixture<NewVatRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVatRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVatRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
