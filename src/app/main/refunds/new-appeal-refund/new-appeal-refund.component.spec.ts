import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppealRefundComponent } from './new-appeal-refund.component';

describe('NewAppealRefundComponent', () => {
  let component: NewAppealRefundComponent;
  let fixture: ComponentFixture<NewAppealRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAppealRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppealRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
