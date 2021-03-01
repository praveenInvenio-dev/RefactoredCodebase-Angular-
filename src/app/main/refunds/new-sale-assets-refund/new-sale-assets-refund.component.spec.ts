import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaleAssetsRefundComponent } from './new-sale-assets-refund.component';

describe('NewSaleAssetsRefundComponent', () => {
  let component: NewSaleAssetsRefundComponent;
  let fixture: ComponentFixture<NewSaleAssetsRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSaleAssetsRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSaleAssetsRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
