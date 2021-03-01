import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherslandingComponent } from './otherslanding.component';

describe('OtherslandingComponent', () => {
  let component: OtherslandingComponent;
  let fixture: ComponentFixture<OtherslandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherslandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherslandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
