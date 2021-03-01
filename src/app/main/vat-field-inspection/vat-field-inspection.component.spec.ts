import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatFieldInspectionComponent } from './vat-field-inspection.component';

describe('VatFieldInspectionComponent', () => {
  let component: VatFieldInspectionComponent;
  let fixture: ComponentFixture<VatFieldInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatFieldInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatFieldInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
