import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePwdComponent } from './createPwd.component';

describe('CreatePwdComponent', () => {
  let component: CreatePwdComponent;
  let fixture: ComponentFixture<CreatePwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
