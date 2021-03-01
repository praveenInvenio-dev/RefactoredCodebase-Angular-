import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTaxReductionComponent } from './input-tax-reduction.component';

describe('InputTaxReductionComponent', () => {
  let component: InputTaxReductionComponent;
  let fixture: ComponentFixture<InputTaxReductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTaxReductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTaxReductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
