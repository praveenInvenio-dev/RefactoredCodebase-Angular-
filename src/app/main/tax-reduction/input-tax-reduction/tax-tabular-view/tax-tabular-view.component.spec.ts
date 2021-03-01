import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxTabularViewComponent } from './tax-tabular-view.component';

describe('TaxTabularViewComponent', () => {
  let component: TaxTabularViewComponent;
  let fixture: ComponentFixture<TaxTabularViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxTabularViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxTabularViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
