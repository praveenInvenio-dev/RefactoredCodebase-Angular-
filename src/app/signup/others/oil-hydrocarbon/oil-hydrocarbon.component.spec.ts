import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilHydrocarbonComponent } from './oil-hydrocarbon.component';

describe('OilHydrocarbonComponent', () => {
  let component: OilHydrocarbonComponent;
  let fixture: ComponentFixture<OilHydrocarbonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilHydrocarbonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilHydrocarbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
