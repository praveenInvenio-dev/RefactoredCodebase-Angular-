import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelWarehouseComponent } from './cancel-warehouse.component';

describe('CancelWarehouseComponent', () => {
  let component: CancelWarehouseComponent;
  let fixture: ComponentFixture<CancelWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
