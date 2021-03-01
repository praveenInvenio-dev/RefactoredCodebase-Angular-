import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesToReleaseSecuritiesComponent } from './reques-to-release-securities.component';

describe('RequesToReleaseSecuritiesComponent', () => {
  let component: RequesToReleaseSecuritiesComponent;
  let fixture: ComponentFixture<RequesToReleaseSecuritiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequesToReleaseSecuritiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesToReleaseSecuritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
