import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginfirstComponent } from './loginfirst.component';

describe('LoginfirstComponent', () => {
  let component: LoginfirstComponent;
  let fixture: ComponentFixture<LoginfirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginfirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginfirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
