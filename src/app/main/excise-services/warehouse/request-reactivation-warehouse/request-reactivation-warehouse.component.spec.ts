import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestReactivationWarehouseComponent } from './request-reactivation-warehouse.component';

describe('RequestReactivationWarehouseComponent', () => {
  let component: RequestReactivationWarehouseComponent;
  let fixture: ComponentFixture<RequestReactivationWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestReactivationWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestReactivationWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
