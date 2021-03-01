import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickactionComponent } from './quickaction.component';

describe('QuickactionComponent', () => {
  let component: QuickactionComponent;
  let fixture: ComponentFixture<QuickactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
