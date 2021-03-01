import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewZakatObjectionComponent } from "./new-zakat-objection.component";

describe("NewZakatObjectionComponent", () => {
  let component: NewZakatObjectionComponent;
  let fixture: ComponentFixture<NewZakatObjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewZakatObjectionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewZakatObjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
