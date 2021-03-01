import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentOldDesignComponent } from './establishment-old-design.component';

describe('EstablishmentOldDesignComponent', () => {
  let component: EstablishmentOldDesignComponent;
  let fixture: ComponentFixture<EstablishmentOldDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentOldDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentOldDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
