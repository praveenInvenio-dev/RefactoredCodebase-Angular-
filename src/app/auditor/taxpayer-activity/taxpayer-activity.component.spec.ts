import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerActivityComponent } from './taxpayer-activity.component';

describe('TaxpayerActivityComponent', () => {
  let component: TaxpayerActivityComponent;
  let fixture: ComponentFixture<TaxpayerActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxpayerActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxpayerActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
