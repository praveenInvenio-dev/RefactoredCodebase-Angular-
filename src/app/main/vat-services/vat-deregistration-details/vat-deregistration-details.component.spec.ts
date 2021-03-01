import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatDeregistrationDetailsComponent } from './vat-deregistration-details.component';

describe('VatDeregistrationDetailsComponent', () => {
  let component: VatDeregistrationDetailsComponent;
  let fixture: ComponentFixture<VatDeregistrationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatDeregistrationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatDeregistrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
