import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExciseServicesComponent } from './excise-services.component';

describe('ExciseServicesComponent', () => {
  let component: ExciseServicesComponent;
  let fixture: ComponentFixture<ExciseServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExciseServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExciseServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
