import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonResidentCompanyComponent } from './non-resident-company.component';

describe('NonResidentCompanyComponent', () => {
  let component: NonResidentCompanyComponent;
  let fixture: ComponentFixture<NonResidentCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonResidentCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonResidentCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
