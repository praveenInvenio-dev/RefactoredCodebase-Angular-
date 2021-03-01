import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAttachmentsComponent } from './signup-attachments.component';

describe('SignupAttachmentsComponent', () => {
  let component: SignupAttachmentsComponent;
  let fixture: ComponentFixture<SignupAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
