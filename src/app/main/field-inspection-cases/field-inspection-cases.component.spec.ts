import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldInspectionCasesComponent } from './field-inspection-cases.component';

describe('FieldInspectionCasesComponent', () => {
  let component: FieldInspectionCasesComponent;
  let fixture: ComponentFixture<FieldInspectionCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldInspectionCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldInspectionCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
