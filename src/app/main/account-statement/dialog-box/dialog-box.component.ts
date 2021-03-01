import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject } from "rxjs";

@Component({
  selector: "app-dialog-box",
  templateUrl: "./dialog-box.component.html",
  styleUrls: ["./dialog-box.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class DialogBoxComponent implements OnInit {
  dataOutput: Subject<any>;
  output: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private matDialogRef: MatDialogRef<DialogBoxComponent>
  ) {}

  ngOnInit(): void {
    this.dataOutput = new Subject<any>();

    // TODO: How to fix calendar popup
    this.dataOutput.subscribe((data) => {
      this.output = data;
    });
  }

  onClose() {
    this.matDialogRef.close({ ...this.output, handleData: true });
  }

  onCrossClick() {
    this.matDialogRef.close({ ...this.output, handleData: false });
  }
}
