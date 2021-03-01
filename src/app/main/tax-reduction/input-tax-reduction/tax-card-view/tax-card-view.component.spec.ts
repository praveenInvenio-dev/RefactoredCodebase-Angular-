import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCardViewComponent } from './tax-card-view.component';

describe('TaxCardViewComponent', () => {
  let component: TaxCardViewComponent;
  let fixture: ComponentFixture<TaxCardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxCardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
