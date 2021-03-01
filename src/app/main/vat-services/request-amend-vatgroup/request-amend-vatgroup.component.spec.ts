import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAmendVatgroupComponent } from './request-amend-vatgroup.component';

describe('RequestAmendVatgroupComponent', () => {
  let component: RequestAmendVatgroupComponent;
  let fixture: ComponentFixture<RequestAmendVatgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestAmendVatgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAmendVatgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
