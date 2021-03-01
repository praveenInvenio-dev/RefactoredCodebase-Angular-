import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { constants } from "src/app/constants/constants.model";
import { ProfileConstants } from "src/app/constants/profileConstants";
import { DashboardService } from "src/app/services/dashboard-service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-registration-details",
  templateUrl: "./registration-details.component.html",
  styleUrls: ["./registration-details.component.css"],
})
export class RegistrationDetailsComponent implements OnInit {
  img: string;
  img1: string;
  dir: string;
  lang;
  data: any;
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

  showZakat(uTileNo, appCd) {
    if (this.data) {
      return (
        this.data["SubTileSet"]["results"].filter(
          (t) => t["UTileno"] === uTileNo && t["Appcd"] === appCd
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
        .replace("val5", this.data["Fbguid"])
        .replace("val6", tSys);
    window.location.href = url;
  }

  toZakatUI5(val) {
    let tSys = this.data["Protocol"] + "://" + this.data["SystemName"];
    if (this.data["PortNo"] !== "") {
      tSys += ":" + this.data["PortNo"];
    }
    let url =
      this.baseUrl +
      ProfileConstants.externalURLs[val]
        .replace("val1", this.data["Client"])
        .replace("val2", tSys)
        .replace("val3", this.data["Lang"])
        .replace("val4", this.data["Bpnum"])
        .replace("val5", this.data["Zuser"]);
    window.location.href = url;
  }
}
