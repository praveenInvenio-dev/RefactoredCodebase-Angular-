import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprintVatCertificateComponent } from './reprint-vat-certificate.component';

describe('ReprintVatCertificateComponent', () => {
  let component: ReprintVatCertificateComponent;
  let fixture: ComponentFixture<ReprintVatCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprintVatCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprintVatCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
