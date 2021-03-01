import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectionReviewsComponent } from './objection-reviews.component';

describe('ObjectionReviewsComponent', () => {
  let component: ObjectionReviewsComponent;
  let fixture: ComponentFixture<ObjectionReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectionReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectionReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
