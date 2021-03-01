import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualsSignUpComponent } from './individuals-sign-up.component';

describe('IndividualsSignUpComponent', () => {
  let component: IndividualsSignUpComponent;
  let fixture: ComponentFixture<IndividualsSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualsSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualsSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
