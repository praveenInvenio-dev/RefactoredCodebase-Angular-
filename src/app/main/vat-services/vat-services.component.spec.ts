import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatServicesComponent } from './vat-services.component';

describe('VatServicesComponent', () => {
  let component: VatServicesComponent;
  let fixture: ComponentFixture<VatServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
