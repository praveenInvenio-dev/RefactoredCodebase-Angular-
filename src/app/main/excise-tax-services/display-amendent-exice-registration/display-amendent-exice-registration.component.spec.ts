import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAmendentExiceRegistrationComponent } from './display-amendent-exice-registration.component';

describe('DisplayAmendentExiceRegistrationComponent', () => {
  let component: DisplayAmendentExiceRegistrationComponent;
  let fixture: ComponentFixture<DisplayAmendentExiceRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAmendentExiceRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAmendentExiceRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
