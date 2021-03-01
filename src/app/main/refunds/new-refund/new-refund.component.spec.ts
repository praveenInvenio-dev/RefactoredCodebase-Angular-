import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRefundComponent } from './new-refund.component';

describe('NewRefundComponent', () => {
  let component: NewRefundComponent;
  let fixture: ComponentFixture<NewRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
