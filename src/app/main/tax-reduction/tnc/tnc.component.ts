import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SupportedPages } from 'src/app/services/request-input-tax.service';

export interface TnCInputData {
  translation: any;
  page: SupportedPages.Input | SupportedPages.Income;
}

export interface TncOutputData {
  agreed: boolean; // Whether the checkbox was checked or not
  closed: boolean; // Whether the user closed it using X icon
}

@Component({
  selector: "app-tnc",
  templateUrl: "./tnc.component.html",
  styleUrls: ["./tnc.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class TncComponent implements OnInit {
  checkboxSelected = false;

  constructor(
    public dialogRef: MatDialogRef<TncComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TnCInputData
  ) {}

  ngOnInit(): void {}

  toggleCheckbox() {
    this.checkboxSelected = !this.checkboxSelected
  }

  onCrossClick() {
    this.dialogRef.close({
      agreed: false,
      closed: true,
    });
  }

  onButtonClick() {
    this.dialogRef.close({
      agreed: this.checkboxSelected,
      closed: false,
    });
  }
}
