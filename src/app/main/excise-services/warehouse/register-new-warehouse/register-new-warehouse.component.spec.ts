import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewWarehouseComponent } from './register-new-warehouse.component';

describe('RegisterNewWarehouseComponent', () => {
  let component: RegisterNewWarehouseComponent;
  let fixture: ComponentFixture<RegisterNewWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNewWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
