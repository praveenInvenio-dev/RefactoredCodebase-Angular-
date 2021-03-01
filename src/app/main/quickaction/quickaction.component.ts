import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { AppService } from 'src/app/app.service';
import { constants } from "src/app/constants/constants.model";
import { ExciseConstants } from "src/app/constants/ExciseConstants";
import { VATConstants } from "src/app/constants/VATConstants";
import { DashboardService } from "src/app/services/dashboard-service";
declare var $: any;
@Component({
  selector: "app-quickaction",
  templateUrl: "./quickaction.component.html",
  styleUrls: ["./quickaction.component.css"],
})
export class QuickactionComponent implements OnInit {
  lang: any;
  dir: string;
  menu: any;
  optionSlected = 1;
  quickMenu = VATConstants.menu;
  cardErr: boolean;
  cardMsg: string;
  tinNumber: string;
  quickMenuList = [];

  constructor(
    private router: Router,
    public dashboardService: DashboardService,
    public notifierService: NotifierService,
    public appServ: AppService
  ) {}

  ngOnInit() {
    this.tinNumber = localStorage.getItem("gpart");
    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.QuickAction;
      this.dir = constants.langz.arb.dir;
      this.menu = ExciseConstants.QuickActionArb;
    } else {
      this.lang = constants.langz.eng.QuickAction;
      this.dir = constants.langz.eng.dir;
      this.menu = ExciseConstants.QuickActionEng;
    }
    $("#custom").modal("show");
    this.getQuickAction();
  }

  back() {
    this.router.navigate(["mains/dashboard"]);
  }

  getQuickAction(): any {
    this.dashboardService.getQickAction(this.tinNumber).subscribe(
      (res) => {
        console.log("quick", res);
        let cnt = 0;
        this.quickMenuList = res["d"];
        this.quickMenu = this.quickMenuList["ActionItemSet"].results;
        this.quickMenu.forEach((ele) => {
          this.quickMenuList["ActionItemFavSet"].results.forEach((item) => {
            if (ele["ActDesc"] === item.ActDesc) {
              ele.flag = true;
              cnt++;
            }
          });
        });

        if (cnt >= 4) {
          this.cardErr = true;
        } else {
          this.cardErr = false;
        }
        console.log("cnt", this.quickMenu,  this.quickMenuList["ActionItemFavSet"]);
      },

      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  onCardClick(i) {
    let cnt = 0;
    if (this.quickMenu[i].flag) {
      this.quickMenu[i].flag = false;
    } else {
      let count = 0;
      this.quickMenu.forEach((item) => {
        if (item.flag) {
          count++;
        }
      });
      if (count >= 4) {
        //this.cardErr = true;
        //this.cardMsg = "Please select any 4";
      } else {
        this.quickMenu[i].flag
          ? (this.quickMenu[i].flag = false)
          : (this.quickMenu[i].flag = true);
        console.log(i, this.menu);
      }
    }
    this.quickMenu.forEach((item) => {
      if (item.flag) {
        cnt++;
      }
    });

    if (cnt >= 4) {
      this.cardErr = true;
    } else {
      this.cardErr = false;
    }
    console.log("cnt", cnt);
  }

  save() {
    let a = [];
    this.quickMenu.forEach((ele) => {
      if (ele.flag) {
        delete ele["__metadata"];
        ele["Selflg"] = "X";
      } else {
        ele["Selflg"] = "";
        delete ele["__metadata"];
      }
    });
    a = this.quickMenu;
    console.log("seece", this.quickMenu);
    this.quickMenuList["ActionItemFavSet"] = [];
    for (var i = 0; i < a.length; i++) {
      let obj = {
        ActDesc: a[i].ActDesc,
        Applink: a[i].Applink,
        Begda: a[i].Begda,
        Bpkind: a[i].Bpkind,
        Endda: a[i].Endda,
        Lang: a[i].Lang,
        // Mandt: a[i].Mandt,
        QactService: a[i].QactService,
        Sysid: a[i].Sysid,
        TaxtypSection: a[i].TaxtypSection,
        Selflg: "",
        Partner: this.tinNumber,
        Icon: a[i].Icon
      };
      if (a[i].flag) {
        obj.Selflg = "X";
      } else {
        obj.Selflg = "";
      }

      this.quickMenuList["ActionItemFavSet"].push(obj);
    }

    console.log("seece", this.quickMenuList);
    this.quickMenuList["ActionItemSet"].results.forEach((element) => {
      delete element["flag"];
      delete element["Selflg"]
    });
    
    console.log("seece", this.quickMenuList);
    this.dashboardService
      .postQickAction(this.tinNumber, this.quickMenuList)
      .subscribe(
        (res) => {
          console.log("res", res);
          this.appServ.updatedDataSelection5("1");
          this.getQuickAction();
          this.router.navigate(["mains/dashboard"]);
          //this.notifierService.notify("success", "Valid ID Number");
        },
        (err) => {
          this.notifierService.notify(
            "error",
            "Could not update quick actions"
          );
        }
      );
    console.log(this.quickMenuList, a);
  }
}
