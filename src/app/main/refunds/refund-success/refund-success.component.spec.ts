import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundSuccessComponent } from './refund-success.component';

describe('RefundSuccessComponent', () => {
  let component: RefundSuccessComponent;
  let fixture: ComponentFixture<RefundSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
