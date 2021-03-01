import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequestRulingComponent } from './new-request-ruling.component';

describe('NewRequestRulingComponent', () => {
  let component: NewRequestRulingComponent;
  let fixture: ComponentFixture<NewRequestRulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRequestRulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRequestRulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
