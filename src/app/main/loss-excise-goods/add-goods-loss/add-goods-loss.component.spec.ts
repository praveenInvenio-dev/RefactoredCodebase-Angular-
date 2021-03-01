import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoodsLossComponent } from './add-goods-loss.component';

describe('AddGoodsLossComponent', () => {
  let component: AddGoodsLossComponent;
  let fixture: ComponentFixture<AddGoodsLossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGoodsLossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoodsLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
