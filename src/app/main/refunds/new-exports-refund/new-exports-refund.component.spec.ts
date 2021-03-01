import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExportsRefundComponent } from './new-exports-refund.component';

describe('NewExportsRefundComponent', () => {
  let component: NewExportsRefundComponent;
  let fixture: ComponentFixture<NewExportsRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExportsRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExportsRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
