import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SukukBondsComponent } from './sukuk-bonds.component';

describe('SukukBondsComponent', () => {
  let component: SukukBondsComponent;
  let fixture: ComponentFixture<SukukBondsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SukukBondsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SukukBondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
