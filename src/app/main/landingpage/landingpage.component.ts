import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { VATConstants } from "src/app/constants/VATConstants";
import { AppService } from "src/app/app.service";
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/environments/environment";
import { filter } from "rxjs/operators";
import { DashboardService } from "src/app/services/dashboard-service";
import { Location } from "@angular/common";
import { correspondanceConstants } from "../../constants/correspondanceConstants";
import { constants } from "src/app/constants/constants.model";
import { CorrespondanceService } from "src/app/services/correspondance.service";
import * as moment from "moment";
import { NotificationService } from "src/app/services/notification.service";
import { SessionService } from "src/app/services/session-service";
import { lpConstants } from "./landingpage.constants";
declare var $: any;
@Component({
  selector: "app-landingpage",
  templateUrl: "./landingpage.component.html",
  styleUrls: ["./landingpage.component.css"],
})
export class LandingpageComponent implements OnInit {
  direction = "ltr";
  baseUrl = environment.url;
  directionz: any;
  title: string;
  url;
  dashMenu = [];
  name: any;
  logouturl = environment.logouturl;
  txt1;
  txt2: string;
  qmenu: boolean;
  restrictProfileViewText: string;
  close: string;
  correspondanceConstants;
  lang;
  notification: any = {
    show: false,
    title: "",
    description: "",
  };
  notifications: any = [];
  notificationsBKP: any = [];
  tin: string;
  notificationDetails: any;
  filteredList = [];
  correspondanceList = [];

  selectedMessages = [];

  selectAll: boolean = false;

  viewMessage = null;

  viewMessageIndex: number;

  searchFilter: string = "";
  pathList: any = ["/mains/newvat", "", "/mains/tax", "/mains/returns/search"];
  showNotif: boolean = true;
  isReturnsadded: boolean = false;
  isFirst: boolean = true;
  helpLink: string = "";
  helpLink1: string = "";
  listDashboard = [];
  menuList: any[];
  listDashboardz = [];
  tpType: string;
  menuLists = [];
  auditDashmenu = [];
  pendingAppLabels: any = {};
  logouts: boolean = false;
  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private routers: ActivatedRoute,
    public appServ: AppService,
    public dashboardService: DashboardService,
    private _location: Location,
    public correspondanceService: CorrespondanceService,
    private notificationService: NotificationService,
    private sessionService: SessionService
  ) {
    notificationService.OpenNotification$.subscribe((notification) => {
      this.notification = notification;
    });
    this.appServ.data5.subscribe((res) => {
      $(document).ready(function () {
        $(window).scrollTop(0);
      });
      if (res === "1") this.qmenu = true;
      else this.qmenu = false;
    });
    // this.appServ.data3.subscribe(res=>{
    //   this.name = res;
    //   console.log("resxzzczxc",res)
    // })

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log("landing page event.url", event.url);
        if (event.url === "/mains/profile") {
          this.dashMenu.forEach((item) => (item.active = false));
          this.showNotif = false;
        } else if (event.url === "/mains/dashboard" || event.url === "/mains") {
          this.showNotif = true;
          this.getNotifications(this.tin);
        } else {
          this.showNotif = false;
          console.log("ELSE Route", this.showNotif);
        }
      }
    });
  }
  public language: string = "en";
  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.baseUrl +
        "sap/public/bc/icf/logoff?keepMYSAPSSO2Cookie=true&dsmguid=1588829910165"
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
          console.log("test");
        }, 5000);
      }.bind(this)
    );

    this.tpType = localStorage.getItem("tpType");

    if (localStorage.getItem("lang") === "ar") {
      this.direction = "rtl";
      this.menuLists = VATConstants.ETdashMenuArb;
      this.auditDashmenu = VATConstants.dashMenuAuditorArb;
      this.title = "Create New Account";
      this.txt1 = "الوصول السريع";
      this.txt2 = "تم تحديث خدمات الوصول السريع";
      this.restrictProfileViewText = "الرجاء اكمال تسجيلك";
      this.close = "إغلاق";
      this.lang = constants.langz.arb;
      this.language = "ar";
      this.pendingAppLabels = lpConstants.langz.arb.pendingApp;
    } else {
      this.direction = "ltr";
      this.title = "Create New Account";
      this.txt1 = "Quick Actions";
      this.txt2 = "Your selection of quick action services is updated";
      this.restrictProfileViewText = "Please complete your registration";
      this.auditDashmenu = VATConstants.dashMenuAuditor;
      this.close = "Close";
      this.lang = constants.langz.eng;
      this.language = "en";
      this.menuLists = VATConstants.ETdashMenu;
      this.pendingAppLabels = lpConstants.langz.eng.pendingApp;
    }
    moment.locale(this.language);
    // Added as part of CRD - 5640

    this.changeColor();
    this.correspondanceConstants = correspondanceConstants;
    this.tin = localStorage.getItem("gpart") || "";
    //

    if (this.language == "en") {
      // this.helpLink =
      //   "https://gazt.gov.sa/en/HelpCenter/FAQs/Pages/FAQArchiveEservicesMV.aspx";
      this.helpLink =
        "https://gazt.gov.sa/en/HelpCenter/FAQs/Pages/FAQArchiveEservices.aspx";
      this.helpLink1 = "https://chat.gazt.gov.sa/I3root/index.html?lang=en";
    } else if (this.language == "ar") {
      // this.helpLink =
      //   "https://gazt.gov.sa/ar/HelpCenter/FAQs/Pages/FAQArchiveEservicesMV.aspx";
      this.helpLink =
        "https://gazt.gov.sa/ar/HelpCenter/FAQs/Pages/FAQArchiveEservices.aspx";

      this.helpLink1 = "https://chat.gazt.gov.sa/I3root/index.html?lang=ar";
    }

    if (this.tpType == "TA") {
      this.dashMenu = this.auditDashmenu;
      let urlval = window.location.href;
      urlval = urlval.substring(urlval.indexOf("#") + 1);
      this.dashMenu.forEach((item) => {
        if (urlval === item.path) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    }
    this.getData();
  }
  getInitialData() {
    this.correspondanceList = [];
    this.correspondanceService.getInitialData().subscribe(
      (response) => {},
      (error) => {}
    );

    this.correspondanceService.getZakatCorresepondanceList().subscribe(
      (response) => {
        this.formatResponseData(response);
      },
      (error) => {
        //console.log(error);
      }
    );

    this.correspondanceService.getVatCorrespondanceList().subscribe(
      (response) => {
        this.formatResponseData(response);
      },
      (error) => {
        //console.log(error);
      }
    );

    this.correspondanceService.getEtCorrespondanceList().subscribe(
      (response) => {
        this.formatResponseData(response);
      },
      (error) => {
        //console.log(error);
      }
    );

    this.correspondanceService.getEpCorrespondanceList().subscribe(
      (response) => {
        this.formatResponseData(response);
      },
      (error) => {
        //console.log(error);
      }
    );
  }

  formatResponseData(response) {
    if (response.d.results.length > 0) {
      response.d.results.map((item) => {
        let correspondanceItem = {
          Cotxt: item.Cotxt,
          Descript: item.Descript,
          Cotyp: item.Cotyp,
          Fbnum: item.Fbnum,
          Cokey: item.Cokey,
          Ltrno: item.LetterNum,
          Txtdo: `${item.CoidtAr} - ${item.CoitmAr}`,
          Langu: item.Langz,
          Cdate: "",
          date: "",
          Vkont: item.Vkont,
        };

        if (item.Zzfav || item.Zzfav === "") {
          correspondanceItem["Zzfav"] = item.Zzfav;
        }
        //console.log("laggggggggggggggggggggggggggggggg", this.lang);
        //moment.locale(this.lang);
        moment.locale(this.language);
        const date = parseInt(item.Cdate.replace(/\D/g, ""));

        const Cday =
          this.language === "en"
            ? moment(date).format("ddd")
            : correspondanceConstants.message.days.ar[moment(date).day()];

        const Cdate = `${Cday} ${moment(date).format("Do MMM YYYY")} ${moment(
          item.Coitm.replace(/\D/g, ""),
          "hhmmss"
        ).format("hh:mm a")}`;

        correspondanceItem.Cdate = Cdate;

        const day =
          this.lang === "en"
            ? moment(correspondanceItem.Txtdo, "YYYY/MM/DD - hh:mm").format(
                "ddd"
              )
            : correspondanceConstants.message.days.ar[
                moment(correspondanceItem.Txtdo, "YYYY/MM/DD - hh:mm").day()
              ];

        correspondanceItem.date = `${day} ${moment(
          correspondanceItem.Txtdo,
          "YYYY/MM/DD - hh:mm"
        ).format("Do MMM YYYY hh:mm a")}`;

        this.correspondanceList = [
          ...this.correspondanceList,
          correspondanceItem,
        ];
      });
    }

    const list = this.correspondanceList.sort((a, b) => {
      const d1: any = moment(a.Cdate, "Do MMM YYYY hh:mm a").valueOf();
      const d2: any = moment(b.Cdate, "Do MMM YYYY hh:mm a").valueOf();
      return d2 - d1;
    });

    this.correspondanceList = list;
    this.filteredList = list;
  }
  getNotifications(tinNumber: any = "") {
    this.notifications = [];

    if (this.tpType == "TA") {
      return true;
    }

    this.dashboardService.getNotifications(tinNumber).subscribe(
      (res) => {
        console.log(res);
        this.notificationsBKP = res["d"]["results"];
        this.notifications = [];
        console.log("BKP List :: " + this.notificationsBKP);

        for (let i = 0; i < this.notificationsBKP.length; i++) {
          // this.notifications[i]["NotifTy"] = '01';//For TEST - MUST DELETE/COMMENT AFER TEST
          // this.notifications[i]["NotifRead"] = '';//For TEST - MUST DELETE/COMMENT AFER TEST

          if (
            !this.isRead(this.notificationsBKP[i]) &&
            this.notificationsBKP[i].NotifDisp === ""
          ) {
            let notifIndex = 0;
            if (this.notificationsBKP[i]["NotifTy"] == "01") {
              this.notificationsBKP[i].path = this.pathList[0];
              notifIndex = 0;
            } else if (this.notificationsBKP[i]["NotifTy"] == "02") {
              notifIndex = 1;
              this.notificationsBKP[i].path = this.pathList[1];
            } else if (this.notificationsBKP[i]["NotifTy"] == "03") {
              notifIndex = 2;
              this.notificationsBKP[i].path = this.pathList[2];
            } else if (this.notificationsBKP[i]["NotifTy"] == "04") {
              notifIndex = 3;
              this.notificationsBKP[i].path = this.pathList[3];
            }
            this.notificationsBKP[i].title = this.lang.notifications[
              notifIndex
            ].title;
            this.notificationsBKP[i].description = this.lang.notifications[
              notifIndex
            ].description;
            if (
              this.notificationsBKP[i]["NotifTy"] == "01" ||
              this.notificationsBKP[i]["NotifTy"] == "02" ||
              this.notificationsBKP[i]["NotifTy"] == "03" ||
              this.notificationsBKP[i]["NotifTy"] == "04"
            ) {
              // || this.notificationsBKP[i]["NotifTy"] == '03'
              if (this.notificationsBKP[i]["NotifTy"] == "04") {
                if (!this.isReturnsadded) {
                  this.notifications.push(this.notificationsBKP[i]);
                  this.isReturnsadded = true;
                }
              } else {
                this.notifications.push(this.notificationsBKP[i]);
              }
            }
          }
        }
        this.isReturnsadded = false;
        console.log("List :: " + this.notifications);
        if (this.notifications.length > 0) {
          this.notificationDetails = this.notifications[0];
        } else {
          this.notificationDetails = {};
        }
      },
      (err) => {
        this.notifications = [];
        this.notificationDetails = {};
      }
    );
  }
  isRead(notif: any) {
    // if (notif.NotifTy === '04') {
    //   return localStorage.getItem(notif.Persl) === 'X';
    // }
    return localStorage.getItem(notif.NotifTy) === "X";
  }

  navigate() {
    // $("#restrictProfileView").modal("show");
    this.dashboardService.getEncryptedValues().subscribe((res) => {
      console.log(res);
      this.dashboardService.getProfileStatus(res["d"]).subscribe((res) => {
        console.log(res);
        if (res["d"]["Type"] == "X") {
          $("#restrictProfileView").modal("show");
        } else {
          this.router.navigate(["/mains/profile"]);
        }
      });
    });
  }

  changeColor() {
    if (window.location.href.includes("profile")) {
      return true;
    } else {
      return false;
    }
  }

  cancleReturn() {
    this.appServ.updatedDataSelection7("");
  }

  makeActive(name) {
    if (this.tpType !== "TA") {
      if (name !== "Tax Management") {
        this.appServ.updatedDataSelection9("");
        this.appServ.updatedDataSelection11("");
      }

      if (name !== "Dashboard") {
        this.qmenu = false;
        this.appServ.updatedDataSelection5("0");
        this.showNotif = false;
      } else this.showNotif = true;
      this.dashMenu = [];

      if (this.tpType === "TE") {
        this.dashMenu = this.menuLists;
      } else {
        this.dashMenu = this.menuList;
      }
      this.dashMenu.forEach((item) => {
        item.name === name ? (item.active = true) : (item.active = false);
      });
    } else {
      this.dashMenu.forEach((item) => {
        item.name === name ? (item.active = true) : (item.active = false);
      });
    }
  }

  test() {
    console.log("test");
  }

  closeQuickMenu() {
    this.qmenu = false;
    this.appServ.updatedDataSelection5("0");
  }

  getUserInfo(tin): any {
    this.appServ.getUserInfo(tin).subscribe(
      (res) => {
        console.log("userdata", res);
        if (this.tpType !== "TA") {
          this.appServ.updatedDataSelection4("1");
        } else {
          this.appServ.updatedDataSelection4("0");
        }
        if (res["d"]["NameFirst"] === "" && res["d"]["NameLast"] === "")
          this.name = res["d"]["NameOrg1"];
        else this.name = res["d"]["NameFirst"] + " " + res["d"]["NameLast"];

        this.appServ.updatedDataSelection3(this.name);
        localStorage.setItem("name", this.name);
      },
      (err) => {
        this.appServ.updatedDataSelection4("0");
      }
    );
  }

  getData(): any {
    this.dashboardService.getDashboardData$().subscribe(
      (res) => {
        console.log("DashboardData :: ", res);

        //     if (this.tpType === "TA") {
        //       //this.getUserInfo(res["d"]["AudTin"]);
        //       this.name = res["d"]["Title"];
        //       this.appServ.updatedDataSelection3(this.name);
        //       localStorage.setItem("name", this.name);
        //     } else {
        //  this.getUserInfo(res["d"]["Bpnum"]);
        //       this.listDashboard = res["d"]["MainTileSet"]["results"];
        //       console.log("dashboard", this.listDashboard);
        //       this.menuList = [];
        //       let m = [];
        //       m = this.listDashboard.filter((x) => x.ScreenSection === "10");
        //       m = m.sort(function (a, b) {
        //         return Number(a.SortSeq) > Number(b.SortSeq) ? 1 : -1;
        //       });
        //       m.forEach((element) => {
        //         let obj = {
        //           name: "",
        //           active: true,
        //           path: "",
        //         };
        //         if (element.ScreenSection === "10") {
        //           if (element.SortSeq === "01") obj.active = true;
        //           else obj.active = false;

        //           obj.name = element.Tilenm;
        //           obj.path = element.AngUrl;
        //           this.menuList.push(obj);
        //         }
        //       });
        //       console.log("listDashboard", this.menuList);

        //       if (this.tpType === "TE") {
        //         this.dashMenu = this.menuLists;
        //       } else {
        //         this.dashMenu = this.menuList;
        //       }

        //       let urlval = window.location.href;
        //       urlval = urlval.substring(urlval.indexOf("#") + 1);
        //       this.dashMenu.forEach((item) => {
        //         if (urlval === item.path) {
        //           item.active = true;
        //         } else {
        //           item.active = false;
        //         }
        //       });

        //       console.log("test", window.location.href, urlval);
        //       let data = this.listDashboard.filter((x) => x.ScreenSection !== "10");
        //       this.listDashboardz = data;
        //       let total = data.length + m.length;

        //       if (total === 11) {
        //         let cnt = 0;

        //         this.listDashboard.forEach((element) => {
        //           if (element.Tileno === "05" || element.Tileno === "04") cnt++;
        //         });
        //         if (cnt === 2) {
        //           $("#tiles").modal("show");
        //         }
        //         console.log("listDashboard", this.listDashboard);
        //       }
        //     }

        //     this.tin = res["d"]["Bpnum"];
        //     localStorage.setItem("gpart", this.tin);
        //     this.getNotifications(this.tin);

        this.validateRegistration(res);
      },
      (error) => {
        // this.sessionService.validateSession();
      }

      // if (this.tpType === "TA") {
      //   this.name = res["d"]["Title"];
      //   this.appServ.updatedDataSelection3(this.name);
      //   localStorage.setItem("name", this.name);
      // } else {
      //   this.getUserInfo(res["d"]["Bpnum"]);
      //   this.listDashboard = res["d"]["MainTileSet"]["results"];
      //   console.log("dashboard", this.listDashboard);
      //   this.menuList = [];
      //   let m = [];
      //   m = this.listDashboard.filter((x) => x.ScreenSection === "10");
      //   m = m.sort(function (a, b) {
      //     return Number(a.SortSeq) > Number(b.SortSeq) ? 1 : -1;
      //   });
      //   m.forEach((element) => {
      //     let obj = {
      //       name: "",
      //       active: true,
      //       path: "",
      //     };
      //     if (element.ScreenSection === "10") {
      //       if (element.SortSeq === "01") obj.active = true;
      //       else obj.active = false;

      //       obj.name = element.Tilenm;
      //       obj.path = element.AngUrl;
      //       this.menuList.push(obj);
      //     }
      //   });
      //   console.log("listDashboard", this.menuList);

      //   if (this.tpType === "TE") {
      //     this.dashMenu = this.menuLists;
      //   } else {
      //     this.dashMenu = this.menuList;
      //   }

      //   let urlval = window.location.href;
      //   urlval = urlval.substring(urlval.indexOf("#") + 1);
      //   this.dashMenu.forEach((item) => {
      //     if (urlval === item.path) {
      //       item.active = true;
      //     } else {
      //       item.active = false;
      //     }
      //   });

      //   console.log("test", window.location.href, urlval);
      //   let data = this.listDashboard.filter((x) => x.ScreenSection !== "10");
      //   this.listDashboardz = data;
      //   let total = data.length + m.length;

      //   if (total === 11) {
      //     let cnt = 0;

      //     this.listDashboard.forEach((element) => {
      //       if (element.Tileno === "05" || element.Tileno === "04") cnt++;
      //     });
      //     if (cnt === 2) {
      //       $("#tiles").modal("show");
      //     }
      //     console.log("listDashboard", this.listDashboard);
      //   }
      // }

      // this.tin = res["d"]["Bpnum"];
      // localStorage.setItem("gpart", this.tin);
      // this.getNotifications(this.tin);

      //   this.listDashboard.forEach((element) => {
      //     if (element.Tileno === "05" || element.Tileno === "04") cnt++;
      //   });
      //   if (cnt === 2) {
      //     $("#tiles").modal("show");
      //   }
      //   console.log("listDashboard", this.listDashboard);
      // }

      // this.tin = res["d"]["Bpnum"];
      // localStorage.setItem("gpart", this.tin);
      // this.getNotifications(this.tin);
      //this.sessionService.validateSession();
    );
  }

  setAppMenuAndNotifications(res) {
    if (this.tpType === "TA") {
      this.name = res["d"]["Title"];
      this.appServ.updatedDataSelection3(this.name);
      localStorage.setItem("name", this.name);
    } else {
      this.getUserInfo(res["d"]["Bpnum"]);
      this.listDashboard = res["d"]["MainTileSet"]["results"];
      console.log("dashboard", this.listDashboard);
      this.menuList = [];
      let m = [];
      m = this.listDashboard.filter((x) => x.ScreenSection === "10");
      m = m.sort(function (a, b) {
        return Number(a.SortSeq) > Number(b.SortSeq) ? 1 : -1;
      });
      m.forEach((element) => {
        let obj = {
          name: "",
          active: true,
          path: "",
        };
        if (element.ScreenSection === "10") {
          if (element.SortSeq === "01") obj.active = true;
          else obj.active = false;

          obj.name = element.Tilenm;
          obj.path = element.AngUrl;
          this.menuList.push(obj);
        }
      });
      console.log("listDashboard", this.menuList);

      if (this.tpType === "TE") {
        this.dashMenu = this.menuLists;
      } else {
        this.dashMenu = this.menuList;
      }

      let urlval = window.location.href;
      urlval = urlval.substring(urlval.indexOf("#") + 1);
      this.dashMenu.forEach((item) => {
        if (urlval === item.path) {
          item.active = true;
        } else {
          item.active = false;
        }
      });

      console.log("test", window.location.href, urlval);
      let data = this.listDashboard.filter((x) => x.ScreenSection !== "10");
      this.listDashboardz = data;
      let total = data.length + m.length;

      if (total === 11) {
        let cnt = 0;

        this.listDashboard.forEach((element) => {
          if (element.Tileno === "05" || element.Tileno === "04") cnt++;
        });
        if (cnt === 2) {
          $("#tiles").modal("show");
        }
        console.log("listDashboard", this.listDashboard);
      }
    }

    this.tin = res["d"]["Bpnum"];
    localStorage.setItem("gpart", this.tin);
    this.getNotifications(this.tin);
  }

  logout() {
    this.logouts = true;
    console.log("test");
    localStorage.clear();
    $("#tiles").modal().hide();
    $("#applicationPendingModal").modal("hide");
    //window.location.replace(this.logouturl);
    this.sessionService.logOut();
    // this.appServ.logoutmain2().subscribe(res=>{

    // })
    // this.appServ.logoutMain().subscribe(res=>{

    // })
    // this.router.navigate(["login"]);
  }
  openNotification(notificationDetails) {
    console.log("no0000000000000000000", notificationDetails);
    let path = notificationDetails.path;

    this.closeNotif(notificationDetails);

    if (path !== undefined && path !== "") {
      if (notificationDetails.NotifTy == "04") {
        this.router.navigate([path], { queryParams: { alloverDue: "1" } });
      } else {
        this.router.navigate([path]);
      }
    }
  }
  updateNotifStatus() {
    this.prepareNotifObject();
    this.dashboardService
      .updateNotifications(this.notificationDetails)
      .subscribe(
        (res) => {
          this.getNotifications(this.tin);
        },
        (err) => {
          this.notificationDetails = {};
        }
      );
  }
  closeNotif(notificationDetails) {
    // if (notificationDetails.NotifTy === '04') {
    //   localStorage.setItem(notificationDetails.Persl, 'X');
    // } else

    localStorage.setItem(notificationDetails.NotifTy, "X");
    this.notificationDetails = notificationDetails;
    this.updateNotifStatus();
  }
  prepareNotifObject() {
    // this.notificationDetails.NotifDisp = 'X';
    this.notificationDetails.NotifRead = "X";
    this.notificationDetails.Inpch = "243";
    delete this.notificationDetails.title;
    delete this.notificationDetails.description;
    delete this.notificationDetails.path;

    return this.notificationDetails;
  }

  isEmpty(fieldValue: any) {
    if (fieldValue === "" || fieldValue === undefined || fieldValue === null) {
      return true;
    }
    return false;
  }
  gotoHelp() {}

  applicationPendingInfo: any = { referenceNumber: "", dateOfReceipt: "" };
  validateRegistration(dashAPIresponse) {
    let regCheckParams = {
      PortalUsrx: dashAPIresponse["d"]["Zuser"],
      Gpartx: dashAPIresponse["d"]["Bpnum"],
    };
    // console.log("validateRegistration", regCheckParams);
    this.dashboardService.getRegistrationStatus(regCheckParams).subscribe(
      (response: any) => {
        // console.log("RegistrationStatus", response);
        // && response["d"].UserTypx === "TP"
        if (response["d"].Fbsta && response["d"].Fbsta != "IP011") {
          this.applicationPendingInfo.referenceNumber = response["d"].Fbnumx;
          this.applicationPendingInfo.dateOfReceipt = new Date();
          $("#applicationPendingModal").modal("show");
        } else {
          $("#applicationPendingModal").modal("hide");
        }
        this.setAppMenuAndNotifications(dashAPIresponse);
      },
      (error) => {
        $("#applicationPendingModal").modal("hide");
        this.setAppMenuAndNotifications(dashAPIresponse);
      }
    );
  }
}
