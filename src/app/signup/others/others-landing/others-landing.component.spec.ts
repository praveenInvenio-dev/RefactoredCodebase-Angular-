import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersLandingComponent } from './others-landing.component';

describe('OthersLandingComponent', () => {
  let component: OthersLandingComponent;
  let fixture: ComponentFixture<OthersLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
