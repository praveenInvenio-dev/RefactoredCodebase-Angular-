import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRegistrationComponent } from './change-registration.component';

describe('ChangeRegistrationComponent', () => {
  let component: ChangeRegistrationComponent;
  let fixture: ComponentFixture<ChangeRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
