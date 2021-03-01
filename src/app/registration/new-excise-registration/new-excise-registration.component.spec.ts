import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExciseRegistrationComponent } from './new-excise-registration.component';

describe('NewExciseRegistrationComponent', () => {
  let component: NewExciseRegistrationComponent;
  let fixture: ComponentFixture<NewExciseRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExciseRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExciseRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
