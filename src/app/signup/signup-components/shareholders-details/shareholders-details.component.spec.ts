import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholdersDetailsComponent } from './shareholders-details.component';

describe('ShareholdersDetailsComponent', () => {
  let component: ShareholdersDetailsComponent;
  let fixture: ComponentFixture<ShareholdersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareholdersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareholdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
