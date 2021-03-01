import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotUNameOrPwdComponent } from './forgot-uname-or-pwd.component';

describe('ForgotUNameOrPwdComponent', () => {
  let component: ForgotUNameOrPwdComponent;
  let fixture: ComponentFixture<ForgotUNameOrPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotUNameOrPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotUNameOrPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
