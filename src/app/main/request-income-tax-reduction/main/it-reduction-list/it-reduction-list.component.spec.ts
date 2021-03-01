import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItReductionListComponent } from './it-reduction-list.component';

describe('ItReductionListComponent', () => {
  let component: ItReductionListComponent;
  let fixture: ComponentFixture<ItReductionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItReductionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItReductionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
