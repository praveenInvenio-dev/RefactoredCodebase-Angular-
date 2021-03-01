import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WitholdingTaxObjectionComponent } from './witholding-tax-objection.component';

describe('WitholdingTaxObjectionComponent', () => {
  let component: WitholdingTaxObjectionComponent;
  let fixture: ComponentFixture<WitholdingTaxObjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WitholdingTaxObjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitholdingTaxObjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
