import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChangeFilingFrequencyComponent } from './new-change-filing-frequency.component';

describe('NewChangeFilingFrequencyComponent', () => {
  let component: NewChangeFilingFrequencyComponent;
  let fixture: ComponentFixture<NewChangeFilingFrequencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChangeFilingFrequencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChangeFilingFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
