import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundsLandingComponent } from './refunds-landing.component';

describe('RefundsLandingComponent', () => {
  let component: RefundsLandingComponent;
  let fixture: ComponentFixture<RefundsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
