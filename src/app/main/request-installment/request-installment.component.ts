import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DatePipe, Location } from "@angular/common";
import { InstallmentPlan } from "src/app/constants/InstallmentPlan";
import { RequestForInstallmentService } from "src/app/services/request-for-installment-service";
import { MatDialog } from "@angular/material/dialog";
import { CommonValidation } from "src/app/constants/commonValidations";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbdModalContent } from "./check-notification.dialog";
import { ErrorMessageModal } from "./error.message.modal";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { NotifierService } from "angular-notifier";
import { VatInstallmentPlanService } from "src/app/services/vat-installment-plan.service";

@Component({
  selector: "app-request-installment",
  templateUrl: "./request-installment.component.html",
  styleUrls: ["./request-installment.component.css"],
  // encapsulation: ViewEncapsulation.None,
})
export class RequestInstallmentComponent implements OnInit {
  dir: string;
  zakatList: any;
  lang;
  tin;
  searchText: string;
  fbgUid: any;
  Euser: string;
  viewTable: boolean = false;
  img1: string;
  img2: string;
  euser: any;
  count: number;
  data2 = [];
  getInstalmentList: any;
  Zuser: any;
  Eusers: any;
  tabs = [];
  dirName: string;
  tab2: any[];
  selectedTab: any;
  color: string;
  mode: string;
  value: number;
  bufferValue: number;
  cls: any;
  vatSelect: boolean = true;
  from: number;
  to: number;
  fromDate: any;
  toDate: any;
  headerComponent = CalendarComponent;

  private dataSource1 = new BehaviorSubject<any>("Gregorian");
  data1 = this.dataSource1.asObservable();
  dtype: any;
  from2: number;
  to2: number;
  impOrExp = [];
  newList: any[];
  vatList: any = [];

  // tabMenu = InstallmentPlan.menu;
  constructor(
    public dialog: MatDialog,
    private location: Location,
    private router: Router,
    private reqestService: RequestForInstallmentService,
    private http: HttpClient,
    private notifierService: NotifierService,
    public datePipe: DatePipe,
    private commonVaidation: CommonValidation,
    private modalService: NgbModal,
    private vatInstallmentService: VatInstallmentPlanService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = InstallmentPlan.langz.arb;
      this.dir = InstallmentPlan.langz.arb.dir;
    } else {
      this.lang = InstallmentPlan.langz.eng;
      this.dir = InstallmentPlan.langz.eng.dir;
    }

    this.img1 = "assets/image/table (1).svg";
    this.img2 = "assets/image/cards (1).svg";
    this.cls = "1";
    this.tin = localStorage.getItem("gpart");

    if (this.dir === "rtl") {
      this.dirName = "جميع الفواتير";
    } else {
      this.dirName = "All Instalment Plans";
    }
    this.loadInstallmentForZakat();
    // this.getEuser(this.tin);
    // this.getInstalmentDetails();
  }

  async loadInstallmentForZakat() {
    this.reqestService.getEUSERDetails(this.tin).subscribe(
      (res) => {
        this.Eusers = res["d"];
        this.getFbguid(this.Eusers);
        // console.log('vfavfs', userDetails);
      },
      (err) => {}
    );
  }

  filterList() {
    let type = "";
    // this.newList = [];
    let filteredData = [];
    if (this.tabs[0] === this.dirName) {
      const filteredTypes = this.tab2.filter((tabItem) => tabItem["flag"]);
      if (filteredTypes.length > 0) {
        if (this.tab2[0].flag) {
          filteredData = filteredData.concat(this.zakatList);
          filteredData = filteredData.concat(this.vatList);
        } else {
          for (let i = 1; i < this.tab2.length; i++) {
            if (this.tab2[i].flag === true && i === 1) {
              filteredData = filteredData.concat(this.zakatList);
            } else if (this.tab2[i].flag === true && i === 2) {
              filteredData = filteredData.concat(this.vatList);
            }
          }
        }
      } else {
        filteredData = filteredData.concat(this.zakatList);
        filteredData = filteredData.concat(this.vatList);
      }
    } else if (this.tabs[1] === this.dirName) {
      filteredData = filteredData.concat(this.zakatList);
    } else if (this.tabs[2] === this.dirName) {
      filteredData = filteredData.concat(this.vatList);
    }

    let filteredData2 = [];
    if (this.impOrExp.length > 0) {
      if (this.impOrExp.indexOf("1") !== -1) {
        filteredData2 = filteredData2.concat(
          filteredData.filter((res) => res.key_status === 1)
        );
      }
      if (this.impOrExp.indexOf("2") !== -1) {
        filteredData2 = filteredData2.concat(
          filteredData.filter((res) => res.key_status === 2)
        );
      }

      if (this.impOrExp.indexOf("3") !== -1) {
        filteredData2 = filteredData2.concat(
          filteredData.filter((res) => res.key_status === 3)
        );
      }
      if (this.impOrExp.indexOf("4") !== -1) {
        filteredData2 = filteredData2.concat(
          filteredData.filter((res) => res.key_status === 4)
        );
      }
      if (this.impOrExp.indexOf("5") !== -1) {
        filteredData2 = filteredData2.concat(
          filteredData.filter((res) => res.key_status === 5)
        );
      }
      if (this.impOrExp.indexOf("6") !== -1) {
        filteredData2 = filteredData2.concat(
          filteredData.filter((res) => res.key_status === 6)
        );
      }
    } else {
      filteredData2 = filteredData;
    }

    if (this.from !== null && this.to !== null) {
      if (this.from > 0 && this.to > 0) {
        filteredData2 = filteredData2.filter((x) => {
          if (x.Fbtyp === "VTIA") {
            return false;
          } else {
            return (
              Math.round(x.DpAmt) >= this.from && Math.round(x.DpAmt) <= this.to
            );
          }
        });
      }
    }
    if (this.from2 !== null && this.to2 !== null) {
      if (this.from2 > 0 && this.to2 > 0) {
        filteredData2 = filteredData2.filter((x) => {
          if (x.Fbtyp === "VTIA") {
            return false;
          } else {
            return (
              Math.round(x.TotAmt) >= this.from2 &&
              Math.round(x.TotAmt) <= this.to2
            );
          }
        });
      }
    }

    // if (this.fromDate != null || this.toDate != null)
    //   this.data2 = this.getdateFiltered(this.data2);
    this.data2 = filteredData2;

    if (this.data2.length >= 4) {
      this.count = 3;
    } else {
      this.count = this.data2.length - 1;
    }
  }

  changesToDate() {
    this.data1.subscribe((res) => {
      this.dtype = res;
    });
    if (this.toDate !== null) {
      if (this.toDate["calendarName"] !== this.dtype) {
        this.toDate = null;
      }
    }
  }

  changesFromDate() {
    this.data1.subscribe((res) => {
      this.dtype = res;
    });
    if (this.fromDate !== null) {
      if (this.fromDate["calendarName"] !== this.dtype) {
        this.fromDate = null;
      }
    }
  }

  changeTab(tab) {
    this.dirName = tab.tab.textLabel;
    if (tab.tab.textLabel === this.tabs[2]) {
      this.data2 = this.vatList;
      this.vatSelect = true;
    } else if (tab.tab.textLabel === this.tabs[1]) {
      this.vatSelect = true;
      this.data2 = this.zakatList;
    } else {
      this.vatSelect = true;
      this.selectedTab = tab.tab.textLabel;
      this.data2 = this.zakatList.concat(this.vatList);
    }
    // this.data2 = this.zakatList.filter(
    //   (x) => x.Abtypt === tab.tab.textLabel || tab.tab.textLabel == this.dirName
    // );
    //this.unpaidTot = this.unpaidTot + Number(this.data[i]["Betrw"]);
    if (this.data2.length >= 4) {
      this.count = 3;
    } else {
      this.count = this.data2.length - 1;
    }
    if (this.selectedTab === this.dirName) this.getTabsList();
    else this.tab2 = this.data2;
    this.tab2 = [];
    if (this.selectedTab === this.dirName)
      this.tab2 = this.tabs.filter((x) => x != this.dirName);
    if (this.selectedTab === this.dirName) this.getTabsList();
    else this.tab2 = [];
  }

  reset() {
    this.fromDate = null;
    this.toDate = null;
    this.from = null;
    this.to = null;
    this.from2 = null;
    this.to2 = null;
    this.impOrExp = [];
    for (var j = 0; j < this.tab2.length; j++) {
      this.tab2[j].flag = false;
    }
  }

  getTabs() {
    if (this.dir === "rtl") {
      this.tabs.push("جميع الفواتير");
      this.tabs.push("الزكاة وضريبة الدخل");
      this.tabs.push("ضريبة القيمة المضافة");
      this.dirName = "جميع الفواتير";
    } else {
      this.tabs.push("All Instalment Plans");
      this.tabs.push("Zakat & CIT");
      this.tabs.push("VAT");
      this.dirName = "All Instalment Plans";
    }
    this.tabs = this.tabs.filter((el, i, a) => i === a.indexOf(el));
  }

  changeTabFilter(tab) {
    this.tab2.filter((item) => {
      console.log(item);
    });
  }

  getTabsList() {
    this.tab2 = [];
    this.tabs.forEach((item) => {
      let obj = {
        name: item,
        flag: false,
      };
      this.tab2.push(obj);
      //if (item != this.dirName) this.tab2.push(obj);
    });
  }

  changeTabz(i) {
    this.tab2[i].flag
      ? (this.tab2[i].flag = false)
      : (this.tab2[i].flag = true);
  }

  getFormattedAmount(amount) {
    if (amount) {
      const floatNumber = parseFloat(amount);
      if (isNaN(floatNumber)) {
        return "";
      } else {
        return floatNumber.toFixed(2);
      }
    } else {
      return "";
    }
  }

  async getFbguid(euser) {
    this.reqestService.getFbguidDetails(euser).subscribe(
      (res) => {
        this.fbgUid = res["d"].Fbguid;
        this.Euser = res["d"].Euser;
        // console.log(' trewefg', res['d'].Euser);
        this.Zuser = res["d"].Zuser;
        this.getVATInstalmentPlans();
        //return res;
      },
      (err) => {}
    );
  }

  // getList(tin) {
  //   this.reqestService.getList(tin).subscribe((res) => {
  //     console.log('response', res);

  //   }, (err) => {
  //     console.log('response', err);

  //   });

  // }

  getVATInstalmentPlans() {
    this.vatInstallmentService.getVATInstalmentPlans().subscribe(
      (res: any) => {
        console.log(res);
        let vatList = res?.d?.ASSLISTSet?.results
          ? res?.d?.ASSLISTSet?.results
          : [];
        vatList = vatList.filter((item) => item.Fbtyp === "VTIA");
        for (let i = 0; i < vatList.length; i++) {
          const status = vatList[i]["Fbust"];
          switch (status) {
            case "E0045":
            case "E0048":
            case "E0064":
            case "E0065":
            case "E0084":
            case "E0085":
            case "E0086":
              vatList[i]["key_status"] = 2;
              break;
            case "E0013":
            case "E0001":
              vatList[i]["key_status"] = 5;
              break;
            case "E0018":
              vatList[i]["key_status"] = 6;
              break;
            case "E0015":
            case "E0016":
            case "E0071":
            case "E0019":
            case "E0021":
            case "E0052":
            case "E0053":
            case "E0054":
            case "E0041":
            case "E0049":
            case "E0050":
            case "E0044":
            case "E0061":
            case "E0062":
            case "E0063":
            case "E0066":
            case "E0067":
            case "E0069":
            case "E0083":
            case "E0087":
              vatList[i]["key_status"] = 3;
              break;
            case "E0051":
            case "E0043":
            case "E0088":
              vatList[i]["key_status"] = 4;
              break;
            default:
              vatList[i]["key_status"] = 0;
          }
        }
        console.log(vatList);
        this.vatList = [...vatList];
        this.getInstalmentDetails();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getInstalmentDetails() {
    console.log(" this.fbgUid", this.fbgUid);

    this.reqestService
      .getInstalmentForRequest("IPRR", this.fbgUid, this.Euser, this.Zuser)
      .subscribe(
        (res) => {
          const workList = res["d"].WorklistSet["results"];

          this.reqestService
            .getInstalmentForRequest(
              "IPRA",
              this.fbgUid,
              this.Euser,
              this.Zuser
            )
            .subscribe(
              (res) => {
                this.getInstalmentList = res["d"];
                this.zakatList = res["d"].WorklistSet["results"].concat(
                  workList
                );

                // this.getZakatBillDtails =
                // this.zakatList = [{ "DueAmt": "1080000.00", "Fbtyp": "IPRA", "PymntFreq": "01", "SubmitDt": null, "Fbsta": "IP017", "UserTyp": "TP", "Fbust": "E0013", "Tin": "3102435657", "Fbnum": "85000000692", "TotAmt": "1350000.00", "DpAmt": "270000.00", "PlanDur": "06", "Waers": "SAR", "Status": "Draft" }]
                // this.zakatList = res["d"].WorklistSet["results"];
                for (let i = 0; i < this.zakatList.length; i++) {
                  if (
                    this.zakatList[i].IptypeFg === "NZ" ||
                    this.zakatList[i].IptypeFg === "OZ"
                  ) {
                    this.zakatList[i].taxType =
                      localStorage.lang === "ar" ? "الزكاة" : "Zakat";
                  }
                  if (
                    this.zakatList[i].IptypeFg === "NI" ||
                    this.zakatList[i].IptypeFg === "OI"
                  ) {
                    this.zakatList[i].taxType =
                      localStorage.lang === "ar" ? "ضريبة الدخل" : "Income Tax";
                  }
                  if (
                    this.zakatList[i].Fbsta === "IP017" &&
                    this.zakatList[i].Fbust === "E0013"
                  ) {
                    this.zakatList[i].newStatus =
                      localStorage.lang === "ar" ? "مسودة" : "Draft";
                    this.zakatList[i].key_status = 5;
                  }
                  if (
                    (this.zakatList[i].Fbsta === "IP011" &&
                      this.zakatList[i].Fbust === "E0055") ||
                    (this.zakatList[i].Fbsta === "IP021" &&
                      this.zakatList[i].Fbust === "E0015")
                  ) {
                    this.zakatList[i].newStatus =
                      localStorage.lang === "ar" ? "مقدمة" : "Submitted";
                    this.zakatList[i].key_status = 1;
                  }
                  if (
                    (this.zakatList[i].Fbsta === "IP011" &&
                      this.zakatList[i].Fbust === "E0018") ||
                    (this.zakatList[i].Fbsta === "IP017" &&
                      this.zakatList[i].Fbust === "E0018")
                  ) {
                    this.zakatList[i].newStatus =
                      localStorage.lang === "ar"
                        ? "مطلوب بيانات اضافية"
                        : "Additional Information Required";
                    this.zakatList[i].key_status = 6;
                  }

                  if (
                    this.zakatList[i].Fbsta === "IP020" ||
                    this.zakatList[i].Status === "Revoked" ||
                    this.zakatList[i].Status === "منقوض" ||
                    this.zakatList[i].Status ===
                      "Revoked - Failure to pay Instalments" ||
                    this.zakatList[i].Status === "تم الإلغاء - عدم دفع الأقساط"
                  ) {
                    this.zakatList[i].newStatus =
                      localStorage.lang === "ar" ? "تم إلغائها" : "Cancelled";
                    this.zakatList[i].key_status = 4;
                  }
                  if (
                    (this.zakatList[i].Fbsta === "IP021" &&
                      this.zakatList[i].Fbust ===
                        ("E0016" ||
                          "E0019" ||
                          "E0041" ||
                          "E0044" ||
                          "E0049" ||
                          "E0050" ||
                          "E0052" ||
                          "E0053" ||
                          "E0054" ||
                          "E0058" ||
                          "E0062" ||
                          "E0063")) ||
                    (this.zakatList[i].Fbsta === "IP021" &&
                      this.zakatList[i].Fbust === "E0058")
                  ) {
                    this.zakatList[i].newStatus =
                      localStorage.lang === "ar"
                        ? "قيد المراجعة"
                        : "In Process";
                    this.zakatList[i].key_status = 3;
                  }
                  if (
                    this.zakatList[i].Fbsta === "IP014" &&
                    this.zakatList[i].Fbust === "E0045" &&
                    this.zakatList[i].Status !== "Revoked" &&
                    this.zakatList[i].Status !== "منقوض" &&
                    this.zakatList[i].Status !==
                      "Revoked - Failure to pay Instalments" &&
                    this.zakatList[i].Status !== "تم الإلغاء - عدم دفع الأقساط"
                  ) {
                    this.zakatList[i].newStatus =
                      localStorage.lang === "ar" ? "موافقة" : "Approved";
                    this.zakatList[i].key_status = 2;
                  }
                }

                this.mode = "determinate";
                for (let i = 0; i < this.zakatList.length; i++) {
                  if (
                    this.zakatList[i].Fbsta === "IP021" &&
                    this.zakatList[i].Fbust === "E0015"
                  ) {
                    this.zakatList[i].bufferValue =
                      (Number(this.zakatList[i].DueAmt) /
                        Number(this.zakatList[i].TotAmt)) *
                      100;
                  } else {
                    this.zakatList[i].bufferValue = 0;
                  }
                }
                //this.bufferValue = 75;
                this.getTabs();
                for (let i = 0; i < this.zakatList.length; i++) {
                  this.zakatList[i].SubmitDt =
                    this.commonVaidation.getDateFormated(
                      this.zakatList[i].SubmitDt
                    ) + "";
                }
              },
              (err) => {
                this.notifierService.notify(
                  "error",
                  err.error.error.innererror.errordetails[0].message
                );
              }
            );
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
  }

  openContentOne() {
    this.location.back();
  }

  goToZakat(fbNum, status, ipStatus, statusText) {
    this.router.navigate(["/mains/zakatdetail"], {
      queryParams: {
        fbNum: fbNum,
        Euser: this.Euser,
        status: status,
        ipStatus: ipStatus,
        statusText: statusText,
      },
    });
  }

  goToVAT(fbNum, fbStatus) {
    this.router.navigate(["/mains/vatinstallmentplan"], {
      queryParams: { fbNum, fbStatus },
    });
  }

  getStatusColor(status) {
    switch (status) {
      case "E0045":
      case "E0048":
      case "E0064":
      case "E0065":
      case "E0084":
      case "E0085":
      case "E0086":
        return "tag-success";
      case "E0013":
      case "E0001":
        return "tag-unsubmit";
      case "E0018":
      case "E0015":
      case "E0016":
      case "E0071":
      case "E0019":
      case "E0021":
      case "E0052":
      case "E0053":
      case "E0054":
      case "E0041":
      case "E0049":
      case "E0050":
      case "E0044":
      case "E0061":
      case "E0062":
      case "E0063":
      case "E0066":
      case "E0067":
      case "E0069":
      case "E0083":
      case "E0087":
        return "tag-partial";
      case "E0051":
      case "E0043":
      case "E0088":
        return "tag-danger";
      default:
        return "tag-unsubmit";
    }
  }

  changeView(value) {
    this.cls = value;
    this.viewTable ? (this.viewTable = false) : (this.viewTable = true);
    this.viewTable
      ? ((this.img1 = "assets/image/table.svg"),
        (this.img2 = "assets/image/cards-gray.svg"))
      : ((this.img1 = "assets/image/table (1).svg"),
        (this.img2 = "assets/image/cards (1).svg"));
  }

  viewMore() {
    this.count = 0;
    this.count = this.data2.length - 1;
  }

  async createNewInstalment(tab) {
    // if(tab === 'Zakat & CIT'){

    // }
    if (this.dirName === this.tabs[2]) {
      this.router.navigate(["/mains/vatinstallmentplan"]);
    } else if (
      this.getInstalmentList.EvtNotif1Set.results.length === 0 &&
      this.getInstalmentList.EvtNotif12Set.results.length === 0
    ) {
      this.reqestService
        .getZaktDetail("", this.fbgUid, this.Euser, "N")
        .subscribe(
          (res) => {
            this.router.navigate(["/mains/installmentdetail"], {
              queryParams: { Euser: this.Euser, fbgUid: this.fbgUid, tab: tab },
            });
          },
          (err) => {
            // console.log(
            //   "errwrtyurtyuio", err.error
            // );
            const modalRef = this.modalService.open(ErrorMessageModal);
            modalRef.componentInstance.data =
              err.error.error.innererror.errordetails[0].message;
            // alert(err.error.error.innererror.errordetails[0].message);
          }
        );
    } else {
      this.checkCreateNewNotif();
    }
  }

  getImpExp(value) {
    if (this.impOrExp.indexOf(value) === -1) {
      this.impOrExp.push(value);
    } else {
      const _index = this.impOrExp.indexOf(value);
      this.impOrExp.splice(_index, 1);
      // this.impOrExp.push(value);
    }
  }

  checkCreateNewNotif() {
    const modalRef = this.modalService.open(NgbdModalContent, { size: "lg" });
    if (this.getInstalmentList.EvtNotif1Set.results === []) {
      modalRef.componentInstance.table1 = this.getInstalmentList.EvtNotif12Set.results;
    } else {
      modalRef.componentInstance.table1 = this.getInstalmentList.EvtNotif12Set.results;
    }
  }

  // makeActive(name) {
  //   this.tabMenu.forEach((item) => {
  //     item.title === name ? (item.flag = true) : (item.flag = false);
  //   });
  // }
}
