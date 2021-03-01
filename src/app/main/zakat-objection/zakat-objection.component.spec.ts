import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakatObjectionComponent } from './zakat-objection.component';

describe('ZakatObjectionComponent', () => {
  let component: ZakatObjectionComponent;
  let fixture: ComponentFixture<ZakatObjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZakatObjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZakatObjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
