import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWithholdingTaxObjectionComponent } from './new-withholding-tax-objection.component';

describe('NewWithholdingTaxObjectionComponent', () => {
  let component: NewWithholdingTaxObjectionComponent;
  let fixture: ComponentFixture<NewWithholdingTaxObjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWithholdingTaxObjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWithholdingTaxObjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
