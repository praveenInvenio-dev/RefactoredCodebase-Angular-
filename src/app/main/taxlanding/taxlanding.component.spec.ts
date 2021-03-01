import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxlandingComponent } from './taxlanding.component';

describe('TaxlandingComponent', () => {
  let component: TaxlandingComponent;
  let fixture: ComponentFixture<TaxlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
