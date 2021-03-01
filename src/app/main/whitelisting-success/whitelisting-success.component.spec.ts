import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistingSuccessComponent } from './whitelisting-success.component';

describe('WhitelistingSuccessComponent', () => {
  let component: WhitelistingSuccessComponent;
  let fixture: ComponentFixture<WhitelistingSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhitelistingSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistingSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
