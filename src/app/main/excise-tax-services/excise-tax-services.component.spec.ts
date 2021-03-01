import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExciseTaxServicesComponent } from './excise-tax-services.component';

describe('ExciseTaxServicesComponent', () => {
  let component: ExciseTaxServicesComponent;
  let fixture: ComponentFixture<ExciseTaxServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExciseTaxServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExciseTaxServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
