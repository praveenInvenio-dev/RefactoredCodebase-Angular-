import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExciseTaxComponent } from './excise-tax.component';

describe('ExciseTaxComponent', () => {
  let component: ExciseTaxComponent;
  let fixture: ComponentFixture<ExciseTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExciseTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExciseTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
