import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabComponent } from './estab.component';

describe('EstabComponent', () => {
  let component: EstabComponent;
  let fixture: ComponentFixture<EstabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
