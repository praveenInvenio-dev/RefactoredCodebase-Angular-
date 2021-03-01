import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  WhitelistConstants,
  searchConstants,
  monthConstants,
} from "src/app/constants/whitelist.constant";
import * as moment from "moment";

@Component({
  selector: "app-whitelisting-success",
  templateUrl: "./whitelisting-success.component.html",
  styleUrls: ["./whitelisting-success.component.css"],
})
export class WhitelistingSuccessComponent implements OnInit {
  direction = "ltr";

  months = monthConstants.eng;
  lang = WhitelistConstants.eng;
  searchConstants = searchConstants;
  @Input() acknowledgement: any = null;
  @Input() requestType = "";
  today = "";
  userName = "";

  constructor(public router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = WhitelistConstants.arb;
      this.months = monthConstants.arb;
      this.direction = "rtl";
    }
    this.today = this.getDate(new Date());
    this.userName = localStorage.getItem("name");
  }

  goToDashboard() {
    this.router.navigate(["/mains"]);
  }

  getDate(date) {
    if (date) {
      const momentDate = moment(date).locale("en-us");
      return `${
        this.direction === "rtl"
          ? momentDate.format("DD")
          : momentDate.format("Do")
      } ${this.months[momentDate.format("MM")]} ${momentDate.format("YYYY")} `;
    }
    return "";
  }
}
