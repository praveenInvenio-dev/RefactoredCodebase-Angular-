import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { constants } from "src/app/constants/constants.model";
import { ProfileConstants } from "src/app/constants/profileConstants";
import { DashboardService } from "src/app/services/dashboard-service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-deregistration",
  templateUrl: "./deregistration.component.html",
  styleUrls: ["./deregistration.component.scss"],
})
export class DeregistrationComponent implements OnInit {
  data: any;
  img: string;
  img1: string;
  dir: string;
  lang;
  baseUrl = environment.url;

  constructor(
    public appSrv: AppService,
    private router: Router,
    private dashboardSrv: DashboardService
  ) {}

  ngOnInit() {
    this.dashboardSrv.getDashboardData$().subscribe((data: any) => {
      console.log("Dashboard Data :: ", data);
      this.data = data["d"];
    });

    if (localStorage.getItem("lang") === "ar") {
      this.img = "assets/image/arrow-right.svg";
      this.img1 = "assets/image/circle-arrow-right-copy-18.svg";
      this.lang = constants.langz.arb.regDeRegDetails;
      this.dir = constants.langz.arb.dir;
    } else {
      this.img = "assets/image/arrow-left.svg";
      this.img1 = "assets/image/arrow-right.svg";
      this.lang = constants.langz.eng.regDeRegDetails;
      this.dir = constants.langz.eng.dir;
    }
  }

  back() {
    this.router.navigate(["mains/profile"]);
  }

  showTile(scrSec, tileNo) {
    if (this.data) {
      return (
        this.data["MainTileSet"]["results"].filter(
          (t) => t["ScreenSection"] === scrSec && t["Tileno"] === tileNo
        ).length > 0
      );
    }
  }

  toVatUI5(val) {
    let tSys = this.data["Protocol"] + "://" + this.data["SystemName"];
    if (this.data["PortNo"] !== "") {
      tSys += ":" + this.data["PortNo"];
    }
    let url =
      this.baseUrl +
      ProfileConstants.externalURLs[val]
        .replace("val1", this.data["Client"])
        .replace("val2", this.data["Lang"])
        .replace("val3", this.data["Bpnum"])
        .replace("val4", this.data["Euser"])
        .replace("val5", this.data["Fbguid"])
        .replace("val6", tSys);
    window.location.href = url;
  }

  toExciseUI5(val) {
    let tSys = this.data["Protocol"] + "://" + this.data["SystemName"];
    if (this.data["PortNo"] !== "") {
      tSys += ":" + this.data["PortNo"];
    }
    let url =
      this.baseUrl +
      ProfileConstants.externalURLs[val]
        .replace("val1", this.data["Client"])
        .replace("val2", this.data["Lang"])
        .replace("val3", this.data["Bpnum"])
        .replace("val4", this.data["Euser"])
        .replace("val5", this.data["Client"])
        .replace("val6", this.data["Fbguid"])
        .replace("val7", tSys);
    window.location.href = url;
  }
}
