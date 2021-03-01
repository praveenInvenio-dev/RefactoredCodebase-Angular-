import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinDeregistrationComponent } from './tin-deregistration.component';

describe('TinDeregistrationComponent', () => {
  let component: TinDeregistrationComponent;
  let fixture: ComponentFixture<TinDeregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinDeregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinDeregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
