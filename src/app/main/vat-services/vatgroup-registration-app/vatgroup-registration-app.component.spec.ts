import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatgroupRegistrationAppComponent } from './vatgroup-registration-app.component';

describe('VatgroupRegistrationAppComponent', () => {
  let component: VatgroupRegistrationAppComponent;
  let fixture: ComponentFixture<VatgroupRegistrationAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatgroupRegistrationAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatgroupRegistrationAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
