import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRegTPComponent } from './non-reg-tp.component';

describe('NonRegTPComponent', () => {
  let component: NonRegTPComponent;
  let fixture: ComponentFixture<NonRegTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonRegTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRegTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
