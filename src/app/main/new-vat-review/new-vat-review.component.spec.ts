import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVatReviewComponent } from './new-vat-review.component';

describe('NewVatReviewComponent', () => {
  let component: NewVatReviewComponent;
  let fixture: ComponentFixture<NewVatReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVatReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVatReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
