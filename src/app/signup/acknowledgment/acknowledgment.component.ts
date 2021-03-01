import { Component, OnInit, Input } from "@angular/core";
import { constants } from "src/app/constants/constants.model";

@Component({
  selector: "app-acknowledgment",
  templateUrl: "./acknowledgment.component.html",
  styleUrls: ["./acknowledgment.component.css"],
})
export class AcknowledgmentComponent implements OnInit {
  @Input("no") no: string;
  @Input("name") name: string;
  @Input("type") type: string;
  lang: any;
  direction: any;
  date = new Date().toDateString();

  constructor() {}

  ngOnInit() {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.acknowledgment;
      this.direction = constants.langz.arb.dir;
    } else {
      this.lang = constants.langz.eng.acknowledgment;
      this.direction = constants.langz.eng.dir;
    }
    console.log("Language :: ", this.lang);
  }
}
