import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form12Component } from './form12.component';

describe('Form12Component', () => {
  let component: Form12Component;
  let fixture: ComponentFixture<Form12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
