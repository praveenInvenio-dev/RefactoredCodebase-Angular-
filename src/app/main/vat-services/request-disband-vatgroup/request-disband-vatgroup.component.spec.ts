import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDisbandVatgroupComponent } from './request-disband-vatgroup.component';

describe('RequestDisbandVatgroupComponent', () => {
  let component: RequestDisbandVatgroupComponent;
  let fixture: ComponentFixture<RequestDisbandVatgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDisbandVatgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDisbandVatgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
