import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeregistrationLandingComponent } from './deregistration-landing.component';

describe('DeregistrationLandingComponent', () => {
  let component: DeregistrationLandingComponent;
  let fixture: ComponentFixture<DeregistrationLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeregistrationLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeregistrationLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
