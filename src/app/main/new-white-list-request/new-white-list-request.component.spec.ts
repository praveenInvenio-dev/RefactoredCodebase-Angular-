import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWhiteListRequestComponent } from './new-white-list-request.component';

describe('NewWhiteListRequestComponent', () => {
  let component: NewWhiteListRequestComponent;
  let fixture: ComponentFixture<NewWhiteListRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWhiteListRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWhiteListRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
