import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { constants } from 'src/app/constants/constants.model';
import { ProfileConstants } from 'src/app/constants/profileConstants';
import { DashboardService } from 'src/app/services/dashboard-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  data: any;
  img:string;
  img1:string;
  dir:string;
  lang;
  baseUrl = environment.url;

  constructor(public appSrv: AppService,
    private router: Router,
    private dashboardSrv: DashboardService) { }

  ngOnInit() {
    this.dashboardSrv.getDashboardData$()
    .subscribe((data: any) => {
      console.log("Dashboard Data :: ", data)
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

  showTile(uTileNo, appCd) {
    if(this.data) {
     return this.data["SubTileSet"]["results"].filter( t => t["UTileno"] === uTileNo && t["Appcd"] === appCd ).length > 0;
    }
  }

  toTAUI5(val) {
    // sap/bc/ui5_ui5/sap/ztaskallocation/index.html?sap-client=val1&sap-ui-language=val2&Euser=val3&fGUID=val4&calType=val5
    let url =
      this.baseUrl +
      ProfileConstants.externalURLs[val]
      .replace("val1", this.data["Client"])
      .replace("val2", this.data["Lang"])
      .replace("val3", this.data["Euser"])
      .replace("val4", this.data["Fbguid"])
      .replace("val5", this.data["Caltype"]);
    window.location.href = url;
  }

  toUAUI5(val) {
    // /sap/bc/ui5_ui5/sap/zuseradmin/index.html?sap-client=val1&sap-ui-language=val2&Euser=val3&fGUID=val4&calType=val5
    let url =
      this.baseUrl +
      ProfileConstants.externalURLs[val]
        .replace("val1", this.data["Client"])
        .replace("val2", this.data["Lang"])
        .replace("val3", this.data["Euser"])
        .replace("val4", this.data["Fbguid"])
        .replace("val5", this.data["Caltype"]);
    window.location.href = url;
  }

}
