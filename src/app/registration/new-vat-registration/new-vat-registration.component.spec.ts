import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVatRegistrationComponent } from './new-vat-registration.component';

describe('NewVatRegistrationComponent', () => {
  let component: NewVatRegistrationComponent;
  let fixture: ComponentFixture<NewVatRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVatRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVatRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
