import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentiaryDetailsComponent } from './residentiary-details.component';

describe('ResidentiaryDetailsComponent', () => {
  let component: ResidentiaryDetailsComponent;
  let fixture: ComponentFixture<ResidentiaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentiaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentiaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
