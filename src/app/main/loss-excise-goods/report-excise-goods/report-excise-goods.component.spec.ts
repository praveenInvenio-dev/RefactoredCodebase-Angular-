import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExciseGoodsComponent } from './report-excise-goods.component';

describe('ReportExciseGoodsComponent', () => {
  let component: ReportExciseGoodsComponent;
  let fixture: ComponentFixture<ReportExciseGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportExciseGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExciseGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
