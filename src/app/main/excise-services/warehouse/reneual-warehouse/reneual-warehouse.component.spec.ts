import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReneualWarehouseComponent } from './reneual-warehouse.component';

describe('ReneualWarehouseComponent', () => {
  let component: ReneualWarehouseComponent;
  let fixture: ComponentFixture<ReneualWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReneualWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReneualWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
