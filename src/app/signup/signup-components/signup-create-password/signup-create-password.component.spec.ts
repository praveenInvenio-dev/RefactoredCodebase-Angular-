import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCreatePasswordComponent } from './signup-create-password.component';

describe('SignupCreatePasswordComponent', () => {
  let component: SignupCreatePasswordComponent;
  let fixture: ComponentFixture<SignupCreatePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupCreatePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCreatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
