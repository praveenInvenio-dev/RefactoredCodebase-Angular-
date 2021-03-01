import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedAccountsComponent } from './consolidated-accounts.component';

describe('ConsolidatedAccountsComponent', () => {
  let component: ConsolidatedAccountsComponent;
  let fixture: ComponentFixture<ConsolidatedAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
