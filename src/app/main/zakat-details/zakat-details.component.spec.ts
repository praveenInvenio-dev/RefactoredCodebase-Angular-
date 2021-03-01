import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakatDetailsComponent } from './zakat-details.component';

describe('ZakatDetailsComponent', () => {
  let component: ZakatDetailsComponent;
  let fixture: ComponentFixture<ZakatDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZakatDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZakatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
