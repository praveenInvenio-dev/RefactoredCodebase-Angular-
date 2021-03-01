import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { ReturnsService } from "../returns.service";

import { DatePipe } from "@angular/common";
import { CommonValidation } from "src/app/constants/commonValidations";
import { constants } from "src/app/constants/constants.model";
import { VATConstants } from "src/app/constants/VATConstants";
import { AppService } from "src/app/app.service";
import { Input } from "@angular/core";
import { NotifierService } from "angular-notifier";
declare var jQuery: any;
declare var $: any;
enum Status {
  P = "Paid",
  I = "Partially",
  O = "Unpaid",
}

enum StatusAr {
  P = "مدفوعة",
  O = "جزئيا",
  I = " غير مدفوعة",
}

@Component({
  selector: "app-search-returns",
  templateUrl: "./search-returns.component.html",
  styleUrls: ["./search-returns.component.css"],
})
export class SearchReturnsComponent implements OnInit {
  @Input() selectedIndex: number | null;

  headerComponent = CalendarComponent;

  viewBills = false;
  count = 3;
  searchText = "";
  data: any = {};
  commitmentPartialBillDt: any;
  events: any;
  events1: any;
  minDate: any;
  commitmentPartialBillAmount: any;
  commitmentPartialCurrency: any;
  tabs = [];
  statuses = [];
  filterTab;
  bills: boolean = true;
  billDetails: boolean = false;
  billDetailsobj;
  unpaidTot: number = 0;
  data2 = [];
  statusesNew = [];
  selectedTab: any;
  from = 0;
  to = 0;
  fromDate: any;
  toDate: any;
  lang: any;
  img1: string;
  img2: string;
  dir: string;
  dirName: string;
  tab2: any[];
  menu = VATConstants.menuExcise;
  optionSlected = 1;
  sub = false;
  returnsTabs = [];
  returndata = [];
  returnsTabs2 = [];
  returnStatuses = [];
  returnStatusesNew = [];
  returnsData = [];
  search;
  dtype: any;
  returnType: any;
  demo1TabIndex = 1;
  selectedTab1: number = 2;
  //Added by hema on 19-11-2020
  Year_En = [
    {
      Key: "2000",
      Text: "",
    },
    {
      Key: "2007",
      Text: "2007",
    },
    {
      Key: "2008",
      Text: "2008",
    },
    {
      Key: "2009",
      Text: "2009",
    },
    {
      Key: "2010",
      Text: "2010",
    },
    {
      Key: "2011",
      Text: "2011",
    },
    {
      Key: "2012",
      Text: "2012",
    },
    {
      Key: "2013",
      Text: "2013",
    },
    {
      Key: "2014",
      Text: "2014",
    },
    {
      Key: "2015",
      Text: "2015",
    },
    {
      Key: "2016",
      Text: "2016",
    },
    {
      Key: "2017",
      Text: "2017",
    },
    {
      Key: "2018",
      Text: "2018",
    },
    {
      Key: "2019",
      Text: "2019",
    },
    {
      Key: "2020",
      Text: "2020",
    },
    {
      Key: "2021",
      Text: "2021",
    },
    {
      Key: "2022",
      Text: "2022",
    },
    {
      Key: "2023",
      Text: "2023",
    },
    {
      Key: "2024",
      Text: "2024",
    },
  ];
  Month_En = [
    {
      Key: "00",
      Text: "",
    },
    {
      Key: "01",
      Text: "01",
    },
    {
      Key: "02",
      Text: "02",
    },
    {
      Key: "03",
      Text: "03",
    },
    {
      Key: "04",
      Text: "04",
    },
    {
      Key: "05",
      Text: "05",
    },
    {
      Key: "06",
      Text: "06",
    },
    {
      Key: "07",
      Text: "07",
    },
    {
      Key: "08",
      Text: "08",
    },
    {
      Key: "09",
      Text: "09",
    },
    {
      Key: "10",
      Text: "10",
    },
    {
      Key: "11",
      Text: "11",
    },
    {
      Key: "12",
      Text: "12",
    },
  ];
  Year_H = [
    {
      Key: "2000",
      Text: "",
    },
    {
      Key: "1428",
      Text: "1428",
    },
    {
      Key: "1429",
      Text: "1429",
    },
    {
      Key: "1430",
      Text: "1430",
    },
    {
      Key: "1431",
      Text: "1431",
    },
    {
      Key: "1432",
      Text: "1432",
    },
    {
      Key: "1433",
      Text: "1433",
    },
    {
      Key: "1434",
      Text: "1434",
    },
    {
      Key: "1435",
      Text: "1435",
    },
    {
      Key: "1436",
      Text: "1436",
    },
    {
      Key: "1437",
      Text: "1437",
    },
    {
      Key: "1438",
      Text: "1438",
    },
    {
      Key: "1439",
      Text: "1439",
    },
    {
      Key: "1440",
      Text: "1440",
    },
    {
      Key: "1441",
      Text: "1441",
    },
    {
      Key: "1442",
      Text: "1442",
    },
    {
      Key: "1443",
      Text: "1443",
    },
    {
      Key: "1444",
      Text: "1444",
    },
    {
      Key: "1445",
      Text: "1445",
    },
  ];
  Month_H = [
    {
      Key: "00",
      Text: "",
    },
    {
      Key: "01",
      Text: "01",
    },
    {
      Key: "02",
      Text: "02",
    },
    {
      Key: "03",
      Text: "03",
    },
    {
      Key: "04",
      Text: "04",
    },
    {
      Key: "05",
      Text: "05",
    },
    {
      Key: "06",
      Text: "06",
    },
    {
      Key: "07",
      Text: "07",
    },
    {
      Key: "08",
      Text: "08",
    },
    {
      Key: "09",
      Text: "09",
    },
    {
      Key: "10",
      Text: "10",
    },
    {
      Key: "11",
      Text: "11",
    },
    {
      Key: "12",
      Text: "12",
    },
  ];
  toLimit: any;
  dateErr: boolean;
  dateMsg: string;
  returnDashStatus: any;
  returnTaxTypeData = [];
  returnTypeName: any;
  //Added by hema on 19-11-2020

  constructor(
    public returnsService: ReturnsService,
    public datePipe: DatePipe,
    public commonVaidation: CommonValidation,
    public appSrv: AppService,
    private router: Router,
    private routers: ActivatedRoute,
    public notifierService: NotifierService
  ) {}

  ngAfterViewInit(): void {
    console.log("new changes", this.returnType);
  }
  public alloverDue: string = "1";
  ngOnInit(): void {
    this.returnType = this.routers.snapshot.queryParamMap.get("return");
    this.alloverDue = this.routers.snapshot.queryParamMap.get("alloverDue");

    this.appSrv.data7.subscribe((res) => {
      this.returnDashStatus = res;
    });

    if (localStorage.getItem("lang") === "ar") {
      this.returnTypeName = VATConstants.billsReturnArb;
      this.lang = constants.langz.arb.returns || {};
      this.dir = constants.langz.arb.dir;
      this.search = "بحث";
      this.lang.form6Details =
        constants.langz.arb.newReturnsWHT.form6Details || {};
    } else {
      this.returnTypeName = VATConstants.billsReturn;
      this.lang = constants.langz.eng.returns || {};
      this.dir = constants.langz.eng.dir;
      this.search = "Search";
      this.lang.form6Details =
        constants.langz.eng.newReturnsWHT.form6Details || {};
    }

    this.img1 = "assets/image/table (1).svg";
    this.img2 = "assets/image/cards (1).svg";

    if (this.dir === "rtl") {
      this.dirName = "جميع الفواتير";
    } else {
      this.dirName = "All Bills";
    }
    //this.loadBillsData();
    this.loadReturns();
    // this.appSrv.data1.subscribe((res) => {

    // });
    this.returnsService.getReturnTaxpayer().subscribe((res) => {
      this.returnTaxTypeData = res["d"]["results"];
      console.log("new changed", res);
    });
  }

  changesToDate() {
    let fromsdate = new Date(
      this.fromDate["calendarStart"].year +
        "-" +
        this.fromDate["calendarStart"].month +
        "-" +
        this.fromDate["calendarStart"].day
    );

    if (this.toDate !== null && this.fromDate != null) {
      let fromsdate1 = new Date(
        this.fromDate["calendarStart"].year +
          "-" +
          this.fromDate["calendarStart"].month +
          "-" +
          this.fromDate["calendarStart"].day
      );
      let tosdate1 = new Date(
        this.toDate["calendarStart"].year +
          "-" +
          this.toDate["calendarStart"].month +
          "-" +
          this.toDate["calendarStart"].day
      );

      if (fromsdate1 > tosdate1) {
        this.dateErr = true;
        this.dateMsg = "Select To Date greater than From Date";
        // this.toDate = null;
      } else {
        this.dateErr = false;
      }
    }

    fromsdate.setDate(fromsdate.getDate());
    console.log("fromfdate", fromsdate);
    this.appSrv.data1.subscribe((res) => {
      this.toLimit = this.commonVaidation.dateFormate(
        this.commonVaidation.toJulianDate(fromsdate),
        res
      );
    });

    this.appSrv.data1.subscribe((res) => {
      this.dtype = res;
    });

    if (this.toDate !== null) {
      if (this.toDate["calendarName"] !== this.dtype) {
        this.toDate = null;
      }
    }
  }

  changesFromDate() {
    let fromsdate = new Date(
      this.fromDate["calendarStart"].year +
        "-" +
        this.fromDate["calendarStart"].month +
        "-" +
        this.fromDate["calendarStart"].day
    );

    if (this.toDate !== null && this.fromDate != null) {
      let fromsdate1 = new Date(
        this.fromDate["calendarStart"].year +
          "-" +
          this.fromDate["calendarStart"].month +
          "-" +
          this.fromDate["calendarStart"].day
      );
      let tosdate1 = new Date(
        this.toDate["calendarStart"].year +
          "-" +
          this.toDate["calendarStart"].month +
          "-" +
          this.toDate["calendarStart"].day
      );

      if (fromsdate1 > tosdate1) {
        this.dateErr = true;
        this.dateMsg = "Select To Date greater than From Date";
        // this.toDate = null;
      } else {
        this.dateErr = false;
      }
    }
    this.appSrv.data1.subscribe((res) => {
      this.dtype = res;
    });
    if (this.fromDate !== null) {
      if (this.fromDate["calendarName"] !== this.dtype) {
        this.fromDate = null;
      }
    }
  }

  loadReturns() {
    this.returnsService
      .getReturns(localStorage.getItem("gpart"))
      .subscribe((res) => {
        this.returndata = res["d"]["results"];
        this.returndata.forEach((ele) => {
          if (ele.StatusTxt === "Submitted") {
            this.dir === "rtl"
              ? (ele["status"] = "تم تقديمه")
              : (ele["status"] = "Submitted");
          }
          if (ele.StatusTxt === "Non Submitted" && ele.Due === "X") {
            this.dir === "rtl"
              ? (ele["status"] = "متأخرة")
              : (ele["status"] = "Overdue");
          }
          if (ele.StatusTxt === "Non Submitted" && ele.Due === "") {
            this.dir === "rtl"
              ? (ele["status"] = "لم يتم تقديمه")
              : (ele["status"] = "Unsubmitted");
          }
          let year = new Date(ele["AbrzoC"]).getFullYear();
          if (year < 1900) ele["AbrzoCtxt"] = this.getArabicFormat(ele.AbrzoC);
          else ele["AbrzoCtxt"] = this.getEnglishFormat(ele.AbrzoC);

          let year1 = new Date(ele["AbrzuC"]).getFullYear();
          if (year1 < 1900) ele["AbrzuCtxt"] = this.getArabicFormat(ele.AbrzuC);
          else ele["AbrzuCtxt"] = this.getEnglishFormat(ele.AbrzuC);

          let year2 = new Date(ele["DueDtC"]).getFullYear();
          if (year2 < 1900) ele["DueDtCtxt"] = this.getArabicFormat(ele.DueDtC);
          else ele["DueDtCtxt"] = this.getEnglishFormat(ele.DueDtC);

          year < 1900 ? (ele["year"] = 0) : (ele["year"] = 1);

          if (
            (ele["SytStatusAng"] === "IP014" &&
              (ele["UsrStatusAng"] === "E0001" ||
                ele["UsrStatusAng"] === "E0002" ||
                ele["UsrStatusAng"] === "E0006" ||
                ele["UsrStatusAng"] === "E0003" ||
                ele["UsrStatusAng"] === "E0004" ||
                ele["UsrStatusAng"] === "E0008" ||
                ele["UsrStatusAng"] === "E0010" ||
                ele["UsrStatusAng"] === "E0011" ||
                ele["UsrStatusAng"] === "E0013" ||
                ele["UsrStatusAng"] === "E0045")) ||
            (ele["SytStatusAng"] === "IP011" &&
              (ele["UsrStatusAng"] === "E0055" ||
                ele["UsrStatusAng"] === "E0058")) ||
            (ele["SytStatusAng"] === "IP020" &&
              (ele["UsrStatusAng"] === "E0051" ||
                ele["UsrStatusAng"] === "E0059")) ||
            (ele["SytStatusAng"] === "IP021" && ele["UsrStatusAng"] === "E0001")
          ) {
            ele["newStatus"] = "001";
          }

          if (
            (ele["SytStatusAng"] === "IP015" &&
              (ele["UsrStatusAng"] === "E0001" ||
                ele["UsrStatusAng"] === "E0047" ||
                ele["UsrStatusAng"] === "E0005" ||
                ele["UsrStatusAng"] === "E0012" ||
                ele["UsrStatusAng"] === "E0046")) ||
            (ele["SytStatusAng"] === "IP021" &&
              (ele["UsrStatusAng"] === "E0076" ||
                ele["UsrStatusAng"] === "E0077" ||
                ele["UsrStatusAng"] === "E0008" ||
                ele["UsrStatusAng"] === "E0078" ||
                ele["UsrStatusAng"] === "E0012")) ||
            (ele["SytStatusAng"] === "IP011" &&
              ele["UsrStatusAng"] === "E0007") ||
            (ele["SytStatusAng"] === "IP019" &&
              ele["UsrStatusAng"] === "E0009") ||
            (ele["SytStatusAng"] === "IP017" && ele["UsrStatusAng"] === "E0057")
          ) {
            ele["newStatus"] = "002";
          }

          if (
            ele["SytStatusAng"] === "IP011" &&
            ele["UsrStatusAng"] === "E0001"
          ) {
            ele["newStatus"] = "003";
          }

          if (
            (ele["SytStatusAng"] === "IP017" &&
              (ele["UsrStatusAng"] === "E0001" ||
                ele["UsrStatusAng"] === "E0013" ||
                ele["UsrStatusAng"] === "E0056")) ||
            (ele["SytStatusAng"] === "IP021" && ele["UsrStatusAng"] === "E0020")
          ) {
            ele["newStatus"] = "004";
          }
        });
        //this.returnsData = res["d"]["results"];
        console.log("res returns", this.returndata);

        if (this.returnDashStatus !== "") {
          this.returndata = this.returndata.filter(
            (x) => x.status === this.returnDashStatus
          );
        } else {
          this.returndata = this.returndata;
        }

        this.getTabs1();
        this.getReturnStatuses();

        if (this.returnDashStatus === "")
          this.changeReturnsTab("All Returns", "ts");
      });
  }

  showTooltip() {
    console.log("sdsds");
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  backs() {
    // if (this.optionSlected > 1) this.optionSlected--;
    // else {
    //   this.router.navigate(["mains/tax"]);
    // }
  }

  loadBillsData() {
    this.returnsService.getBills().subscribe(
      (res) => {
        console.log("Bills response is SUCCESS", res);
        this.data = res["d"]["results"];
        this.getUnpaidTot();
        this.updateStatus();
        this.getTabs();
        this.getStatuses();
      },
      (err) => {
        // console.log('Bills response is Failed');
        // this.data = billsData.d.results;
        // this.updateStatus();
        // this.getTabsFail();
        // this.getStatusesFail();
      }
    );
  }
  getUnpaidTot() {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]["Status"] == "O")
        this.unpaidTot = this.unpaidTot + Number(this.data[i]["Betrw"]);
      console.log("unpaidTot ->" + this.unpaidTot);
    }
  }

  getStatuses() {
    for (let i = 0; i < this.data.length; i++) {
      this.statuses.push(this.data[i]["Status"]);
    }
    this.statuses = this.statuses.filter((el, i, a) => i === a.indexOf(el));

    this.statuses.forEach((i) => {
      let obj = {
        name: i,
        flag: false,
        img: "",
      };
      if (i === "Submitted" || i === "تم تقديمه")
        obj.img = "assets/image/submitted.svg";
      if (i === "Unsubmitted" || i === "لم يتم تقديمه")
        obj.img = "assets/image/unsubmitted.svg";
      if (i === "Overdue" || i === "متأخرة")
        obj.img = "assets/image/overdue.svg";

      this.statusesNew.push(obj);
    });
    console.log(" this.statusesNew", this.statusesNew);
  }

  getReturnStatuses() {
    for (let i = 0; i < this.returndata.length; i++) {
      this.returnStatuses.push(this.returndata[i]["status"]);
    }
    this.returnStatuses = this.returnStatuses.filter(
      (el, i, a) => i === a.indexOf(el)
    );

    this.returnStatuses.forEach((i) => {
      let obj = {
        name: i,
        flag: false,
        img: "",
      };
      if (i === "Submitted" || i === "تم تقديمه")
        obj.img = "assets/image/submitted.svg";
      if (i === "Unsubmitted" || i === "لم يتم تقديمه")
        obj.img = "assets/image/unsubmitted.svg";
      if (i === "Overdue" || i === "متأخرة")
        obj.img = "assets/image/overdue.svg";
      this.returnStatusesNew.push(obj);
    });

    console.log("status", this.returnStatuses, this.returnStatusesNew);
  }
  getTabs() {
    if (this.dir === "rtl") {
      this.tabs.push("جميع الفواتير");
      this.dirName = "جميع الفواتير";
    } else {
      this.tabs.push("All Bills");
      this.dirName = "All Bills";
    }
    for (let i = 0; i < this.data.length; i++) {
      this.tabs.push(this.data[i]["Abtypt"]);
    }
    this.tabs = this.tabs.filter((el, i, a) => i === a.indexOf(el));

    console.log("tabs2", this.tab2);
  }

  getTabsList() {
    this.tab2 = [];
    this.tabs.forEach((item) => {
      let obj = {
        name: item,
        flag: false,
      };
      if (item != this.dirName) this.tab2.push(obj);
    });
  }

  getTabs1() {
    if (this.dir === "rtl") {
      this.returnsTabs.push("كل الإقرارات");
      this.dirName = "كل الإقرارات";
    } else {
      this.returnsTabs.push("All Returns");
      this.dirName = "All Returns";
    }

    // for (let i = 0; i < this.returndata.length; i++) {
    //   this.returnsTabs.push(this.returndata[i]["TaxtpText"]);
    // }
    // let cnt = 0;
    // this.returnsTabs.forEach((res) => {
    //   if (res === "Withholding Tax" || res === "ضريبة الإستقطاع") cnt++;
    // });

    this.returnTaxTypeData.forEach((res) => {
      if (res.Vktyp === "05") this.returnsTabs.push(this.returnTypeName.zakat);
      if (res.Vktyp === "01")
        this.returnsTabs.push(this.returnTypeName.withholding);
      if (res.Vktyp === "03") this.returnsTabs.push(this.returnTypeName.vat);
      if (res.Vktyp === "07") this.returnsTabs.push(this.returnTypeName.et);
    });

    // if (this.returndata.length === 0 || cnt === 0) {
    //   if (this.dir === "rtl") this.returnsTabs.push("ضريبة الإستقطاع");
    //   else this.returnsTabs.push("Withholding Tax");
    // }

    this.returnsTabs = this.returnsTabs.filter(
      (el, i, a) => i === a.indexOf(el)
    );

    // if (this.returnType != null) {
    //   if(this.returnType === 1){
    //     this.changeReturnsTab("Zakat & CIT");
    //   }
    //   console.log("returnType", this.returnType)
    //  }
    console.log("returnsTabs", this.returnsTabs);
  }

  getTabsList1() {
    this.returnsTabs2 = [];
    this.returnsTabs.forEach((item) => {
      let obj = {
        name: item,
        flag: false,
      };
      if (item != this.dirName) this.returnsTabs2.push(obj);
    });
    console.log("returnsTabs", this.returnsTabs2);
  }

  changeReturnsTab(tab, event) {
    if (event == "html") {
      console.log(localStorage.getItem("ActiveTab"));
      if (localStorage.getItem("ActiveTab") != null) {
        this.selectedTab = JSON.parse(localStorage.getItem("ActiveTab"));
        tab = this.selectedTab;
        this.selectedTab1 = this.returnsTabs.indexOf(
          JSON.parse(localStorage.getItem("ActiveTab"))
        );
      }
    } else {
    }

    if (tab === "All Returns") {
      //this.selectedTab = tab;
      this.returnsData = [];
      //this.returnsData = this.returndata;
      if (this.returnType !== null) {
        if (this.returnType === "1") {
          this.dir === "rtl"
            ? (this.selectedTab = "الزكاة و ضريبة الدخل")
            : (this.selectedTab = "Zakat & CIT");
          this.returnsData = this.returndata.filter(
            (x) =>
              x.TaxtpText === this.selectedTab ||
              this.selectedTab === this.dirName
          );
        }
        if (this.returnType === "2") {
          //this.selectedTab = "Zakat & CIT";
          this.dir === "rtl"
            ? (this.selectedTab = "ضريبة القيمة المضافة")
            : (this.selectedTab = "VAT");
          this.returnsData = this.returndata.filter(
            (x) =>
              x.TaxtpText === this.selectedTab ||
              this.selectedTab === this.dirName
          );
        }
        if (this.returnType === "3") {
          this.dir === "rtl"
            ? (this.selectedTab = "ضريبة السلع الانتقائية")
            : (this.selectedTab = "Excise Tax");
          //this.selectedTab = "Excise Tax";
          this.returnsData = this.returndata.filter(
            (x) =>
              x.TaxtpText === this.selectedTab ||
              this.selectedTab === this.dirName
          );
        }
        if (this.returnType === "4") {
          this.dir === "rtl"
            ? (this.selectedTab = "ضريبة الإستقطاع")
            : (this.selectedTab = "Withholding Tax");
          //this.selectedTab = "Excise Tax";
          this.returnsData = this.returndata.filter(
            (x) =>
              x.TaxtpText === this.selectedTab ||
              this.selectedTab === this.dirName
          );
        }
      } else {
        this.selectedTab = tab;
        this.returnsData = this.returndata;
      }
    } else {
      if (this.returnType === "2") {
        this.selectedTab = "VAT";
      } else if (tab.tab) {
        if (localStorage.getItem("ActiveTab") != null) {
          localStorage.removeItem("ActiveTab");
        } else {
          this.selectedTab = tab.tab.textLabel;
        }
      } else {
        if (localStorage.getItem("ActiveTab") != null) {
          localStorage.removeItem("ActiveTab");
        }
      }
      this.returnsData = this.returndata.filter(
        (x) =>
          x.TaxtpText === this.selectedTab || this.selectedTab === this.dirName
      );
    }

    if (this.returnsData.length >= 4) {
      this.count = 3;
    } else {
      this.count = this.returnsData.length - 1;
    }

    if (this.selectedTab === this.dirName) this.getTabsList1();
    else this.returnsTabs2 = [];

    console.log("tab", this.returnsData);
    if (this.alloverDue == "1") {
      this.displayType("");
      this.reset();
      this.returnStatusesNew.forEach((status) => {
        status.flag = false;
        if (status.name == "Overdue" || status.name == "متأخرة") {
          status.flag = true;
        }
      });
      this.filterList();
    }

    //for active tab from return details
    // console.log(this.returnsTabs);
    // console.log(JSON.parse(localStorage.getItem("ActiveTab1")));
    // console.log(
    //   this.returnsTabs.indexOf(JSON.parse(localStorage.getItem("ActiveTab")))
    // );

    // if (localStorage.getItem("ActiveTab1") != null) {

    //   this.selectedTab1 = this.returnsTabs.indexOf(
    //     JSON.parse(localStorage.getItem("ActiveTab1"))
    //   );
    //   console.log("selectedTab1",this.selectedTab1)
    //   localStorage.removeItem("ActiveTab1");
    // }
  }

  ///////////////////////////////////////////////////////////////////////

  changeTab(tab) {
    console.log("tab", tab.tab.textLabel);
    this.selectedTab = tab.tab.textLabel;
    this.data2 = this.data.filter(
      (x) => x.Abtypt === tab.tab.textLabel || tab.tab.textLabel == this.dirName
    );

    //this.unpaidTot = this.unpaidTot + Number(this.data[i]["Betrw"]);
    if (this.data2.length >= 4) {
      this.count = 3;
    } else {
      this.count = this.data2.length - 1;
    }
    // this.tab2 = [];
    // if (this.selectedTab === this.dirName)
    //   this.tab2 = this.tabs.filter((x) => x != this.dirName);

    this.unpaidTot = 0;
    this.data2.forEach((item) => {
      this.unpaidTot = this.unpaidTot + Number(item["Betrw"]);
    });

    if (this.selectedTab === this.dirName) this.getTabsList();
    else this.tab2 = [];

    console.log("tab", this.data2, this.tab2, this.unpaidTot);
  }

  changeType(type, i) {
    this.returnStatusesNew[i].flag
      ? (this.returnStatusesNew[i].flag = false)
      : (this.returnStatusesNew[i].flag = true);

    // for (var j = 0; j < this.statusesNew.length; j++) {
    //   if (j != i) {
    //     this.statusesNew[j].flag = false;
    //   } else {
    //     this.statusesNew[i].flag = true;
    //   }
    // }
  }

  changeTabz(i) {
    this.returnsTabs2[i].flag
      ? (this.returnsTabs2[i].flag = false)
      : (this.returnsTabs2[i].flag = true);
  }

  changeAmt(amt, amt2) {
    this.data2 = this.data.filter(
      (x) => x.Abtypt === this.selectedTab || this.selectedTab === this.dirName
    );
    this.data2 = this.data2.filter((x) => x.Betrw >= 1 && x.Betrw <= 20000);
  }

  trackByMethod(index: number, el: any): number {
    return el.TaxtpText;
  }

  filterList() {
    let type = "";
    if (this.returnsTabs2.length > 0) {
      let newList = [];
      this.returnsTabs2.forEach((item) => {
        if (item.flag) {
          type = item.name;
          newList.push(
            this.returndata.filter((x) => x.TaxtpText === item.name)
          );
        }
      });

      this.returnsData = [];
      if (newList.length > 0) {
        for (var i = 0; i < newList.length; i++) {
          for (var j = 0; j < newList[i].length; j++) {
            this.returnsData.push(newList[i][j]);
          }
        }
      } else {
        this.returnsData = this.returndata.filter(
          (x) =>
            x.TaxtpText === this.selectedTab ||
            this.selectedTab === this.dirName
        );
      }
      console.log("filtered", this.returnsData);
    } else {
      this.returnsData = this.returndata.filter(
        (x) =>
          x.TaxtpText === this.selectedTab || this.selectedTab === this.dirName
      );
    }

    if (this.returnStatusesNew.length > 0) {
      let newList = [];
      this.returnStatusesNew.forEach((item) => {
        if (item.flag) {
          type = item.name;
          newList.push(this.returnsData.filter((x) => x.status === item.name));
        }
      });
      if (newList.length > 0) {
        this.returnsData = [];
        for (var i = 0; i < newList.length; i++) {
          for (var j = 0; j < newList[i].length; j++) {
            this.returnsData.push(newList[i][j]);
          }
        }
      } else {
        if (type === "") {
          this.returnsData = this.returndata.filter(
            (x) =>
              x.TaxtpText === this.selectedTab ||
              this.selectedTab === this.dirName
          );
        } else {
          this.returnsData = this.returnsData;
        }
      }

      console.log("filtered", this.returnsData);
    }

    // this.statusesNew.forEach((item) => {
    //   if (item.flag) type = item.name;
    // });

    // if (type != "") {
    //   this.returnsData = this.data.filter(
    //     (x) =>
    //       x.Abtypt === this.selectedTab || this.selectedTab === this.dirName
    //   );

    //   this.returnsData = this.returnsData.filter((x) => x.Status === type);
    // }

    // if (this.from > 0 && this.to > 0) {
    //   this.returnsData = this.returnsData.filter(
    //     (x) =>
    //       Math.round(x.Betrw) >= this.from && Math.round(x.Betrw) <= this.to
    //   );
    // }

    if (this.fromDate != null || this.toDate != null)
      this.returnsData = this.getdateFiltered(this.returnsData);

    if (this.returnsData.length >= 4) {
      this.count = 3;
    } else {
      this.count = this.returnsData.length - 1;
    }

    // this.unpaidTot = 0;
    // this.returnsData.forEach((item) => {
    //   this.unpaidTot = this.unpaidTot + Number(item["Betrw"]);
    // });

    if (type === "" && (this.fromDate === null || this.toDate === null)) {
      // this.selectedTab=JSON.parse(localStorage.getItem("ActiveTab1"));
      // alert("filterlist");
      // this.dirName=JSON.parse(localStorage.getItem("ActiveTab1"));
      this.changeReturnsTab(this.selectedTab, "ts");
    }
  }

  getArabicFormat(data) {
    let datz = "";
    let value = data;
    let year = "";
    let mnth = "";
    let day = "";
    let d = new Date(value);
    year = d.getFullYear().toString();

    //value = value.substring(value.indexOf("/") + 1);
    if (d.getMonth() + 1 < 10) mnth = "0" + (d.getMonth() + 1);
    else mnth = (d.getMonth() + 1).toString();
    //value = value.substring(value.indexOf("/") + 1);
    if (d.getDate() < 10) day = "0" + d.getDate();
    else day = d.getDate().toString();

    console.log("values", year, mnth, day);
    switch (parseInt(mnth)) {
      case 1: {
        if (this.dir === "rtl") datz = "محرم" + " " + day + ", " + year;
        //if (this.dir === "rtl") datz = "Muharram" + " " + day + ", " + year;
        else datz = "Muharram" + " " + day + ", " + year;
        break;
      }
      case 2: {
        if (this.dir === "rtl") datz = "صفر" + " " + day + ", " + year;
        //if (this.dir === "rtl") datz = "Safar" + " " + day + ", " + year;
        else datz = "Safar" + " " + day + ", " + year;
        break;
      }
      case 3: {
        if (this.dir === "rtl") datz = "ربيع الاول" + " " + day + ", " + year;
        //if (this.dir === "rtl")
        //  datz = "Rabi' al-awwal" + " " + day + ", " + year;
        else datz = "Rabi' al-awwal" + " " + day + ", " + year;
        break;
      }
      case 4: {
        if (this.dir === "rtl") datz = "ربيع الآخر" + " " + day + ", " + year;
        //if (this.dir === "rtl")
        //datz = "Rabi' al-Thani" + " " + day + ", " + year;
        else datz = "Rabi' al-Thani" + " " + day + ", " + year;
        break;
      }
      case 5: {
        if (this.dir === "rtl") datz = "جمادى الاول" + " " + day + ", " + year;
        //if (this.dir === "rtl")
        //datz = "Jumada al-awwal" + " " + day + ", " + year;
        else datz = "Jumada al-awwal" + " " + day + ", " + year;
        break;
      }
      case 6: {
        if (this.dir === "rtl") datz = "جمادى الآخر" + " " + day + ", " + year;
        //if (this.dir === "rtl")
        //datz = "Jumada al-Thani" + " " + day + ", " + year;
        else datz = "Jumada al-Thani" + " " + day + ", " + year;
        break;
      }
      case 7: {
        if (this.dir === "rtl") datz = "رجب" + " " + day + ", " + year;
        //if (this.dir === "rtl") datz = "Rajab" + " " + day + ", " + year;
        else datz = "Rajab" + " " + day + ", " + year;
        break;
      }
      case 8: {
        if (this.dir === "rtl") datz = "شعبان" + " " + day + ", " + year;
        //if (this.dir === "rtl") datz = "Sha'ban" + " " + day + ", " + year;
        else datz = "Sha'ban" + " " + day + ", " + year;
        break;
      }

      case 9: {
        if (this.dir === "rtl") datz = "رمضان" + " " + day + ", " + year;
        //if (this.dir === "rtl") datz = "Ramadan" + " " + day + ", " + year;
        else datz = "Ramadan" + " " + day + ", " + year;
        break;
      }
      case 10: {
        if (this.dir === "rtl") datz = "شوال" + " " + day + ", " + year;
        //if (this.dir === "rtl") datz = "Shawwal" + " " + day + ", " + year;
        else datz = "Shawwal" + " " + day + ", " + year;
        break;
      }
      case 11: {
        if (this.dir === "rtl") datz = "ذو القعدة" + " " + day + ", " + year;
        //if (this.dir === "rtl") datz = "Dhu al-Qadah" + " " + day + ", " + year;
        else datz = "Dhu al-Qadah" + " " + day + ", " + year;
        break;
      }
      default: {
        if (this.dir === "rtl") datz = "ذو الحجة" + " " + day + ", " + year;
        //if (this.dir === "rtl")
        //datz = "Dhu al-Hijjah" + " " + day + ", " + year;
        else datz = "Dhu al-Hijjah" + " " + day + ", " + year;
        break;
      }
    }

    return datz;
  }

  getEnglishFormat(data) {
    let datz = "";
    let value = data;
    let year = "";
    let mnth = "";
    let day = "";
    let d = new Date(value);
    year = d.getFullYear().toString();

    //value = value.substring(value.indexOf("/") + 1);
    if (d.getMonth() + 1 < 10) mnth = "0" + (d.getMonth() + 1);
    else mnth = (d.getMonth() + 1).toString();
    //value = value.substring(value.indexOf("/") + 1);
    if (d.getDate() < 10) day = "0" + d.getDate();
    else day = d.getDate().toString();

    console.log("values", year, mnth, day);
    switch (parseInt(mnth)) {
      case 1: {
        // if (this.dir === "rtl") datz = "محرم" + " " + day + ", " + year;
        if (this.dir === "rtl") datz = "يناير" + " " + day + ", " + year;
        else datz = "Jan" + " " + day + ", " + year;
        break;
      }
      case 2: {
        // if (this.dir === "rtl") datz = "صفر" + " " + day + ", " + year;
        if (this.dir === "rtl") datz = "فبراير" + " " + day + ", " + year;
        else datz = "Feb" + " " + day + ", " + year;
        break;
      }

      case 3: {
        //if (this.dir === "rtl") datz = "ربيع الآخر" + " " + day + ", " + year;
        if (this.dir === "rtl") datz = "مارس" + " " + day + ", " + year;
        else datz = "Mar" + " " + day + ", " + year;
        break;
      }
      case 4: {
        //if (this.dir === "rtl") datz = "جمادى الاول" + " " + day + ", " + year;
        if (this.dir === "rtl") datz = "ابريل" + " " + day + ", " + year;
        else datz = "Apr" + " " + day + ", " + year;
        break;
      }
      case 5: {
        //if (this.dir === "rtl") datz = "جمادى الآخر" + " " + day + ", " + year;
        if (this.dir === "rtl") datz = "مايو" + " " + day + ", " + year;
        else datz = "May" + " " + day + ", " + year;
        break;
      }
      case 6: {
        // if (this.dir === "rtl") datz = "رجب" + " " + day + ", " + year;
        if (this.dir === "rtl") datz = "يونيو" + " " + day + ", " + year;
        else datz = "June" + " " + day + ", " + year;
        break;
      }
      case 7: {
        // if (this.dir === "rtl") datz = "شعبان" + " " + day + ", " + year;
        if (this.dir === "rtl") datz = "يوليو" + " " + day + ", " + year;
        else datz = "July" + " " + day + ", " + year;
        break;
      }

      case 8: {
        // if (this.dir === "rtl") datz = "رمضان" + " " + day + ", " + year;
        if (this.dir === "rtl") datz = "اغسطس" + " " + day + ", " + year;
        else datz = "Aug" + " " + day + ", " + year;
        break;
      }
      case 9: {
        // if (this.dir === "rtl") datz = "شوال" + " " + day + ", " + year;
        if (this.dir === "rtl") datz = "سبتمبر" + " " + day + ", " + year;
        else datz = "Sep" + " " + day + ", " + year;
        break;
      }
      case 10: {
        // if (this.dir === "rtl") datz = "ذو القعدة" + " " + day + ", " + year;
        if (this.dir === "rtl") datz = "اكتوبر" + " " + day + ", " + year;
        else datz = "Oct" + " " + day + ", " + year;
        break;
      }
      case 11: {
        // if (this.dir === "rtl") datz = "ذو القعدة" + " " + day + ", " + year;
        if (this.dir === "rtl") datz = "نوفمبر" + " " + day + ", " + year;
        else datz = "Nov" + " " + day + ", " + year;
        break;
      }
      default: {
        // if (this.dir === "rtl") datz = "ذو الحجة" + " " + day + ", " + year;
        if (this.dir === "rtl") datz = "ديسمبر" + " " + day + ", " + year;
        else datz = "Dec" + " " + day + ", " + year;
        break;
      }
    }

    return datz;
  }

  getdateFiltered(value) {
    let newxsx = value.filter((x) => {
      let value = x.DueDtC;
      let year = value.substr(0, 4);
      value = value.substring(value.indexOf("/") + 1);
      let mnth = value.substr(0, 2);
      value = value.substring(value.indexOf("/") + 1);
      let day = value.substr(0, 2);

      return (
        new Date(year + "-" + mnth + "-" + day) >=
          new Date(
            this.fromDate["calendarStart"].year +
              "-" +
              this.fromDate["calendarStart"].month +
              "-" +
              this.fromDate["calendarStart"].day
          ) &&
        new Date(year + "-" + mnth + "-" + day) <=
          new Date(
            this.toDate["calendarStart"].year +
              "-" +
              this.toDate["calendarStart"].month +
              "-" +
              this.toDate["calendarStart"].day
          )
      );
    });

    return newxsx;
  }

  updateStatus() {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].Status = this.getStatus(this.data[i].Status);
      this.data[i].Faedn =
        this.commonVaidation.getDateFormated(this.data[i].Faedn) + "";
    }

    console.log("this.data", this.data);
  }

  changeDate(Faedn: string): string {
    Faedn.split("/");
    return "";
  }

  getStatus(status: any) {
    if (this.dir === "rtl") {
      if (status === "P") {
        return StatusAr.P;
      } else if (status === "I") {
        return StatusAr.I;
      } else {
        return StatusAr.O;
      }
    } else {
      if (status === "P") {
        return Status.P;
      } else if (status === "I") {
        return Status.I;
      } else {
        return Status.O;
      }
    }
  }

  changeView() {
    this.viewBills ? (this.viewBills = false) : (this.viewBills = true);
    this.viewBills
      ? ((this.img1 = "assets/image/table.svg"),
        (this.img2 = "assets/image/cards.svg"))
      : ((this.img1 = "assets/image/table (1).svg"),
        (this.img2 = "assets/image/cards (1).svg"));
  }

  viewMore() {
    this.count = 0;
    this.count = this.returnsData.length - 1;
  }

  filterItemsOfType(type) {
    return this.data.filter((x) => x.Abtypt == type || type == this.dirName);
  }

  filterTabs() {
    return this.tabs.filter((x) => x != this.dirName);
  }

  displayType(tab) {
    this.filterTab = tab;
    console.log("filterTab->", this.filterTab);
  }
  changeColor() {
    console.log("");
  }

  details(i) {
    // alert('details' + i);
    this.billDetailsobj = i;
    this.bills = false;
    this.billDetails = true;
  }

  back() {
    this.bills = true;
    this.billDetails = false;
    this.data2 = this.data;
    this.unpaidTot = 0;
    this.data2.forEach((item) => {
      this.unpaidTot = this.unpaidTot + Number(item["Betrw"]);
    });
  }

  reset() {
    this.dateErr = false;
    this.dateMsg = "";
    this.fromDate = null;
    this.toDate = null;
    this.from = 0;
    this.to = 0;
    for (var j = 0; j < this.returnStatusesNew.length; j++) {
      this.returnStatusesNew[j].flag = false;
    }
    for (var j = 0; j < this.returnsTabs2.length; j++) {
      this.returnsTabs2[j].flag = false;
    }
  }

  /* Added by Praveen Kumar Pitta on 28-10-2020 */

  onReturnSelect(returnObj) {
    //added by hema for active tab all returns starts
    localStorage.setItem("ActiveTab", JSON.stringify(this.selectedTab));
    //added by hema for active tab all returns ends
    console.log("Selected Return Obj", returnObj);
    if (returnObj.TaxType == "VATX") {
      if (returnObj.Open != true) {
        this.notifierService.notify("error", returnObj.Msg);
      } else {
        this.router.navigate([
          "mains/returns/vat/" + returnObj.Fbguid + "/" + returnObj.Stat,
        ]);
      }
      //returnObj.Fbnum
    } else if (returnObj.TaxType == "ETAX") {
      this.router.navigate([
        "mains/returns/excisetax",
        returnObj.Fbguid,
        returnObj.Stat,
      ]);
    } else if (returnObj.TaxType == "WHTX") {
      if (returnObj.Open == false) {
        this.notifierService.notify("error", returnObj.Msg);
      } else {
        this.router.navigate([
          "mains/returns/withholdingtax",
          returnObj.Fbguid,
          returnObj.Fbtyp,
          returnObj.Stat,
        ]);
      }
    } else if (returnObj.TaxType == "ITAX" && returnObj.Fbtyp == "FZ12") {
      this.router.navigate([
        "mains/returns/formtwelve",
        returnObj.Fbguid,
        "0000000000" + returnObj.Gpart,
      ]);
    } else if (returnObj.TaxType == "ITAX" && returnObj.Fbtyp == "ITXE") {
      if (returnObj.Open != true) {
        this.notifierService.notify("error", returnObj.Msg);
      } else {
        this.router.navigate([
          "mains/returns/formfour",
          returnObj.Fbguid,
          "0000000000" + returnObj.Gpart,
          returnObj.Stat,
        ]);
      }
    } else if (returnObj.TaxType == "ITAX" && returnObj.Fbtyp == "ZI11") {
      if (returnObj.Open != true) {
        this.notifierService.notify("error", returnObj.Msg);
      } else {
        this.router.navigate([
          "mains/returns/formeleven",
          returnObj.Fbguid,
          "0000000000" + returnObj.Gpart,
          returnObj.Stat,
        ]);
      }
    } else if (returnObj.TaxType == "ITAX" && returnObj.Fbtyp == "ZKTE") {
      if (returnObj.Open != true) {
        this.notifierService.notify("error", returnObj.Msg);
      } else {
        this.router.navigate([
          "mains/returns/formfive",
          returnObj.Fbguid,
          "0000000000" + returnObj.Gpart,
        ]);
      }
    } else if (returnObj.TaxType == "ITAX" && returnObj.Fbtyp == "ZKTN") {
      if (returnObj.Open != true) {
        this.notifierService.notify("error", returnObj.Msg);
      } else {
        this.router.navigate([
          "mains/returns/formtwo",
          returnObj.Fbguid,
          "0000000000" + returnObj.Gpart,
        ]);
      }
    } else if (returnObj.TaxType == "ITAX" && returnObj.Fbtyp == "ITXN") {
      if (returnObj.Open != true) {
        this.notifierService.notify("error", returnObj.Msg);
      } else {
        this.router.navigate([
          "mains/returns/formthree",
          returnObj.Fbguid,
          "0000000000" + returnObj.Gpart,
        ]);
      }
    } else if (returnObj.TaxType == "ITAX" && returnObj.Fbtyp == "ZI10") {
      if (returnObj.Open != true) {
        this.notifierService.notify("error", returnObj.Msg);
      } else {
        this.router.navigate([
          "mains/returns/formten",
          returnObj.Fbguid,
          "0000000000" + returnObj.Gpart,
          returnObj.Fbnum,
        ]);
      }
    } else if (returnObj.TaxType == "ITAX" && returnObj.Fbtyp == "ITZC") {
      if (returnObj.Open != true) {
        this.notifierService.notify("error", returnObj.Msg);
      } else {
        this.router.navigate([
          "mains/returns/formeight",
          returnObj.Fbguid,
          "0000000000" + returnObj.Gpart,
          returnObj.Fbnum,
        ]);
      }
    }
  }

  public CalendarType: string = "G";
  public MonthsYearsSet: any[] = [];
  public createdform6year: any = "";
  public createdform6month: any = "";
  CalendarTypeChange() {
    //added by hema on 19-11-2020
    this.MonthsYearsSet = [];
    this.MonthsYearsSet.push({});
    this.MonthsYearsSet.push({});
    if (this.CalendarType == "G") {
      this.MonthsYearsSet[0].Year = this.Year_En;
      this.MonthsYearsSet[1].Month = this.Month_En;
    } else if (this.CalendarType == "H") {
      this.MonthsYearsSet[0].Year = this.Year_H;
      this.MonthsYearsSet[1].Month = this.Month_H;
    }
    //added by hema on 19-11-2020 ends
  }
  AddForm6() {
    //added by hema on 19-11-2020
    this.MonthsYearsSet = [];
    this.MonthsYearsSet.push({});
    this.MonthsYearsSet.push({});
    if (this.CalendarType == "G") {
      this.MonthsYearsSet[0].Year = this.Year_En;
      this.MonthsYearsSet[1].Month = this.Month_En;
    } else if (this.CalendarType == "H") {
      this.MonthsYearsSet[0].Year = this.Year_H;
      this.MonthsYearsSet[1].Month = this.Month_H;
    }
    jQuery("#AddForm6Modal").modal("show");
    //added by hema on 19-11-2020 ends
  }
  Form6Creation() {
    this.returnsService.getUserDetails().subscribe(
      (res) => {
        console.log("resdata", res["d"]);
        let withholdingsObject = res;
        this.returnsService
          .Form6Creation(
            withholdingsObject["d"]["Gpartz"],
            this.createdform6year,
            this.createdform6month,
            this.CalendarType,
            withholdingsObject["d"]["Euser"]
          )
          .subscribe(
            (data) => {
              console.log("Form6Creation", data);
              jQuery("#AddForm6Modal").modal("hide");
              if (data[0]["d"]) {
                this.router.navigate([
                  "mains/returns/withholdingtax",
                  data[0]["d"]["Guid"],
                  "WHTM",
                  "",
                ]);
              }
            },
            (err) => {
              console.log(err);
              console.log(err.error.error.innererror.errordetails[0].message);
              this.notifierService.notify(
                "error",
                err.error.error.innererror.errordetails[0].message
              );
            }
          );
      },
      (error) => {}
    );
  }
}
