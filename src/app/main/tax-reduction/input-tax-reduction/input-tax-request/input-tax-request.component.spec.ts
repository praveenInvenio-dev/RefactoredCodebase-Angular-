import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTaxRequestComponent } from './input-tax-request.component';

describe('InputTaxRequestComponent', () => {
  let component: InputTaxRequestComponent;
  let fixture: ComponentFixture<InputTaxRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTaxRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTaxRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
