import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExciseTaxDeregistrationComponent } from './excise-tax-deregistration.component';

describe('ExciseTaxDeregistrationComponent', () => {
  let component: ExciseTaxDeregistrationComponent;
  let fixture: ComponentFixture<ExciseTaxDeregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExciseTaxDeregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExciseTaxDeregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
