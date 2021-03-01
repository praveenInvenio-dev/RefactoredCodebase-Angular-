import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { constants } from "src/app/constants/constants.model";
import { ProfileConstants } from "src/app/constants/profileConstants";
import { DashboardService } from "src/app/services/dashboard-service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-zakat-deregistration",
  templateUrl: "./zakat-deregistration.component.html",
  styleUrls: ["./zakat-deregistration.component.scss"],
})
export class ZakatDeregistrationComponent implements OnInit {
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
    this.router.navigate(["mains/deregister"]);
  }

  showTile(uTileNo, appCd) {
    if (this.data) {
      return (
        this.data["SubTileSet"]["results"].filter(
          (t) => t["UTileno"] === uTileNo && t["Appcd"] === appCd
        ).length > 0
      );
    }
  }

  toOutletUI5(val) {
    // sap/bc/ui5_ui5/sap/zuibdreg/index.html?sap-client=val1&tPayer=val2&sap-ui-language=val3&pPTIN=&pPPermit=&pPOutlet=X&System=val4
    // let tSys =
    //   this.data["Protocol"] +
    //   "://" +
    //   this.data["SystemName"];
    //   if(this.data["PortNo"] !== "") {
    //     tSys += ":" + this.data["PortNo"]
    //   }
    // let url =
    //   this.baseUrl +
    //   ProfileConstants.externalURLs[val]
    //     .replace("val1", this.data["Client"])
    //     .replace("val3", this.data["Lang"])
    //     .replace("val2", this.data["Bpnum"])
    //     .replace("val4", tSys);
    // window.location.href = url;
    this.router.navigate(["mains/outletDereg"]);
  }

  toTinDeregUI5(val) {
    // sap/bc/ui5_ui5/sap/zuibdreg/index.html?sap-client=val1&tPayer=val2&sap-ui-language=val3&pPTIN=X&pPPermit=&pPOutlet=&System=val4
    // let tSys =
    //   this.data["Protocol"] +
    //   "://" +
    //   this.data["SystemName"];
    //   if(this.data["PortNo"] !== "") {
    //     tSys += ":" + this.data["PortNo"]
    //   }
    // let url =
    //   this.baseUrl +
    //   ProfileConstants.externalURLs[val]
    //     .replace("val1", this.data["Client"])
    //     .replace("val2", this.data["Bpnum"])
    //     .replace("val3", this.data["Lang"])
    //     .replace("val4", tSys);
    // window.location.href = url;
    this.router.navigate(["mains/tinderegistration"]);
  }

  tolicenseUI5(val) {
    // sap/bc/ui5_ui5/sap/zuibdreg/index.html?sap-client=val1&tPayer=val2&sap-ui-language=val3&pPTIN=&pPPermit=X&pPOutlet=&System=val4
    // let tSys =
    //   this.data["Protocol"] +
    //   "://" +
    //   this.data["SystemName"];
    //   if(this.data["PortNo"] !== "") {
    //     tSys += ":" + this.data["PortNo"]
    //   }
    // let url =
    //   this.baseUrl +
    //   ProfileConstants.externalURLs[val]
    //     .replace("val1", this.data["Client"])
    //     .replace("val3", this.data["Lang"])
    //     .replace("val2", this.data["Bpnum"])
    //     .replace("val4", tSys);
    // window.location.href = url;
    this.router.navigate(["mains/permitDereg"]);
  }
}
