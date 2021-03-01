import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithholdingTaxComponent } from './withholding-tax.component';

describe('WithholdingTaxComponent', () => {
  let component: WithholdingTaxComponent;
  let fixture: ComponentFixture<WithholdingTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithholdingTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithholdingTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
