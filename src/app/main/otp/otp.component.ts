import { Component, OnInit } from "@angular/core";
import { constants } from "../../constants/constants.model";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { NotifierService } from "angular-notifier";
import { environment } from "src/environments/environment";
import { DashboardService } from "src/app/services/dashboard-service";
import { SessionService } from "src/app/services/session-service";
declare var $: any;

@Component({
  selector: "app-otp",
  templateUrl: "./otp.component.html",
  styleUrls: ["./otp.component.css"],
})
export class OtpComponent implements OnInit {
  lang = constants.langz.eng.otp;
  url;
  baseUrl = environment.url;
  sapclient = environment.sapclient;
  count = 0;
  logouturl = environment.logouturl;
  count2= 0;
  counts = 0;

  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    public appservice: AppService,
    public notifierService: NotifierService,
    public dashboardService: DashboardService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    let lng;
    let lang;
    if (localStorage.getItem("lang") === "ar") {
      lng = "A";
      lang = "ar";
    } else {
      lng = "E";
      lang = "en";
    }      
    document.getElementById("loader").style.display = "block";
    //For QA
    //this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl+"sap/bc/ui5_ui5/sap/zuibmybill/index.html?sap-client="+this.sapclient+"&sap-ui-language="+lang.toUpperCase()+"&Euser=00000010000000084520&fGUID=005056B1365C1EDAAFD1428337E5E354");
    //For Dev
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.baseUrl +
        "sap/bc/ui5_ui5/sap/zuib_ang_intfc/index.html?sap-language='" +
        lng +
        "'&sap-client=" +
        this.sapclient +
        "&sap-ui-language=" +
        lang
    );

    //https://tstdg1as1.mygazt.gov.sa:8080/sap/bc/ui5_ui5/sap/zuib_ang_intfc/index.html?sap-client=100&sap-ui-language=EN
    //this.reload();
    $("#myIframe").on(
      "load",
      function () {
        //here you have the control over the body of the iframe document
        var iBody = $("#myIframe").contents().find("body");

        //here you have the control over any element (#myContent)
        var myContent = iBody.find("#myIframe");
        this.count++;
        console.log(this.count);
        setTimeout(() => {
          this.getUserInfo();
        }, 5000);
      }.bind(this)
    );
  }

  // test() {
  //   this.count++;
  //   if (this.count == 2) {
  //     setTimeout(() => {
  //       this.getUserInfo();
  //     }, 3000);
  //   }
  // }

  getUserInfo(): any {
    if (this.counts < 1) {
      this.dashboardService.getDashboardData$().subscribe((res: any) => {
        this.counts++;
        console.log("userdata", res);
        document.getElementById("loader").style.display = "none";
        console.log("OtpComponent");
        this.sessionService.startSession();
        this.router.navigate(["mains"]);
      },(err) => {
          localStorage.clear();
          this.notifierService.notify(
            "error",
            "Authentication Error Please Login Again(Error Fetching Tin Information)"
          );
          setTimeout(() => {
            localStorage.clear();
            window.location.replace(this.logouturl);
          }, 1000);
        });
      // this.appservice.logout().subscribe(
      //   (res) => {
      //     this.counts++;
      //     console.log("userdata", res);
      //     document.getElementById("loader").style.display = "none";
      //     this.router.navigate(["mains"]);
      //   },
      //   (err) => {
      //     localStorage.clear();
      //     this.notifierService.notify(
      //       "error",
      //       "Authentication Error Please Login Again(Error Fetching Tin Information)"
      //     );
      //     setTimeout(() => {
      //       localStorage.clear();
      //       window.location.replace(this.logouturl);
      //     }, 1000);
      //   }
      // );
    }
  }

  //   getQuickAction(): any {
  //   this.dashboardService.getUserInfo(3311654936).subscribe(
  //     (res) => {
  //       console.log("quick", res);
  //     },
  //     (err) => {
  //       this.notifierService.notify(
  //         "error",
  //         err.error.error.innererror.errordetails[0].message
  //       );
  //     }
  //   );
  // }

  reload() {
    if (localStorage.getItem("isRefreshed") === null) {
      localStorage.setItem("isRefreshed", "1");
      window.location.reload();
    } else {
      console.log("sdasd", localStorage.getItem("isRefreshed"));
    }
  }

  // redirect(){
  //   window.open('http://localhost:2000/#/home', '_self');
  // }
}
