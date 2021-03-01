import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDialogBoxComponent } from './download-dialog-box.component';

describe('DownloadDialogBoxComponent', () => {
  let component: DownloadDialogBoxComponent;
  let fixture: ComponentFixture<DownloadDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
