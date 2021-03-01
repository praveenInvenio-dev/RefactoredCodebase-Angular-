import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistingComponent } from './whitelisting.component';

describe('WhitelistingComponent', () => {
  let component: WhitelistingComponent;
  let fixture: ComponentFixture<WhitelistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhitelistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
