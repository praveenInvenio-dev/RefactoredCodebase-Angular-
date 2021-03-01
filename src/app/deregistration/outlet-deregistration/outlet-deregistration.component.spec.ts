import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletDeregistrationComponent } from './outlet-deregistration.component';

describe('OutletDeregistrationComponent', () => {
  let component: OutletDeregistrationComponent;
  let fixture: ComponentFixture<OutletDeregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletDeregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletDeregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
