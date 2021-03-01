import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelConsolidatedAccountsComponent } from './cancel-consolidated-accounts.component';

describe('CancelConsolidatedAccountsComponent', () => {
  let component: CancelConsolidatedAccountsComponent;
  let fixture: ComponentFixture<CancelConsolidatedAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelConsolidatedAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelConsolidatedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
