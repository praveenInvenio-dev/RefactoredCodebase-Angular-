import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyWarehouseLicenseComponent } from './modify-warehouse-license.component';

describe('ModifyWarehouseLicenseComponent', () => {
  let component: ModifyWarehouseLicenseComponent;
  let fixture: ComponentFixture<ModifyWarehouseLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyWarehouseLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyWarehouseLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
