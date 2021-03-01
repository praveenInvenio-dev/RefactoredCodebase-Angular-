import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VATEligiblePersonComponent } from './vat-eligible-person.component';

describe('VATEligiblePersonComponent', () => {
  let component: VATEligiblePersonComponent;
  let fixture: ComponentFixture<VATEligiblePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VATEligiblePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VATEligiblePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
