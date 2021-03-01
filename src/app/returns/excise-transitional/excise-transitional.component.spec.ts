import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExciseTransitionalComponent } from './excise-transitional.component';

describe('ExciseTransitionalComponent', () => {
  let component: ExciseTransitionalComponent;
  let fixture: ComponentFixture<ExciseTransitionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExciseTransitionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExciseTransitionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
