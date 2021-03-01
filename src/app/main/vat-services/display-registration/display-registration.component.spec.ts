import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRegistrationComponent } from './display-registration.component';

describe('DisplayRegistrationComponent', () => {
  let component: DisplayRegistrationComponent;
  let fixture: ComponentFixture<DisplayRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
