import { DashboardService } from "./../../services/dashboard-service";
import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { VATConstants } from "src/app/constants/VATConstants";
import { Label, MultiDataSet, Color } from "ng2-charts";
import {
  Chart,
  ChartType,
  ChartOptions,
  ChartLegendLabelOptions,
  ChartLegendOptions,
  ChartDataSets,
} from "chart.js";
import { MatCalendar, MatCalendarCellCssClasses } from "@angular/material/datepicker";
import { constants } from "src/app/constants/constants.model";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { DomSanitizer } from "@angular/platform-browser";
import { CommonValidation } from "src/app/constants/commonValidations";
import { NotifierService } from "angular-notifier";
import * as moment from "moment";
import { newDashboardLabels } from "./new-dashboard-labels";
import { FormControl, FormGroup } from "@angular/forms";
import { JDNConvertibleCalendar } from "jdnconvertiblecalendar";
import { DateAdapter } from "@angular/material/core";
import { JDNConvertibleCalendarDateAdapter } from "jdnconvertiblecalendardateadapter";
declare var $: any;
@Component({
  selector: "app-new-dashboard",
  templateUrl: "./new-dashboard.component.html",
  styleUrls: ["./new-dashboard.component.css"],
})
export class NewDashboardComponent implements OnInit {
  flx = "80";
  flx2 = "10";
  flx3 = "10";
  count: number = 0;
  // public counterNumber = myBills.d.results[0].DueIcr;
  // public counterNumber1 = myBills.d.results[0].RtnTot; //
  // public counterNumber2 = myBills.d.results[0].RtnTot; // Submitted

  public counterNumber;
  public counterNumber1; //
  public counterNumber2; // Submitted

  public paidZakat;
  public partialpaidZakat;
  public unPaidZakat;
  public totalAmountZakat;

  public paidVAT;
  public partialpaidVAT;
  public unPaidVAT;
  public totalAmountVAT;

  public startDtVAT;
  public endDtVAT;

  public commitmentPartialBillDt;
  public commitmentPartialBillAmount;
  public commitmentPartialCurrency;

  public commitmentPaidBillDt;
  public commitmentPaidBillAmount;
  public commitmentPaidCurrency;
  public commitmentsArray;

  dashMenu = VATConstants.dashMenu;
  direction = "";
  space = " ";
  quickMenu: any;
  lang;
  legend: ChartLegendOptions = {
    align: "center",
    position: "bottom",
    display: false,
  };

  newquick = "/mains/quickMenu";
  newquick1 = "/mains/returns/search";
  newquick2 = "/mains/returns/search";

  // datesToHighlight = ['2020-07-17T18:30:00.000Z', '2020-07-04T18:30:00.000Z', '2020-07-20T18:30:00.000Z', '2020-07-29T18:30:00.000Z', '2020-07-24T18:30:00.000Z', '2020-07-20T18:30:00.000Z', '2020-07-31T18:30:00.000Z'];
  multipleEvents = { name: "multiple", dates: ["2020-12-04T18:30:00.000Z"] };
  greenDots = { name: "green", dates: ["2020-12-20T18:30:00.000Z"] };
  goldDots = { name: "gold", dates: ["2020-12-17T18:30:00.000Z"] };
  redDots = { name: "red", dates: ["2020-12-29T18:30:00.000Z"] };

  // This should be sorted to get all the dots properly.
  events = [
    { name: "multiple", dates: [1607020200000] },
    { name: "gold", dates: [1608163200000] },
    { name: "green", dates: [1608422400000] },
    { name: "red", dates: [1609200000000] },
  ];

  events1 = Object.assign([...this.events]);
  headerComponent = CalendarComponent;
  directionz: any;
  name: any;
  tin;
  todaysDate = new Date();
  month = this.todaysDate.getMonth() + 1;
  year = this.todaysDate.getFullYear();
  minDate = new Date(this.month + "/01/" + this.year);
  url: any;
  img: string;
  tinNumber: string;
  menu = VATConstants.menu;
  qmenu: boolean;
  billsCount = 0;
  listDashboard: any;
  billsChart: boolean;
  cmmttmnts: any;
  selectedDate: any = [];
  showCommittments: boolean;
  campaignOne: FormGroup;
  date;
  innerWidth: number;
  commitmentFlag: boolean;
  installmentFlag: boolean;
  returnFlag: boolean;
  billsFlag: boolean;
  tpType: string;
  txt1: string;
  txt2: string;
  txt3: string;
  txt4: string;
  txt5: string;
  txt6: string;
  // @ViewChild(MatCalendar, {static: false}) calendar: MatCalendar<Date>;
  @ViewChild(MatCalendar, {static: false}) calendar: MatCalendar<JDNConvertibleCalendar>
  private _dateAdapter: DateAdapter<JDNConvertibleCalendar>
  selectedCalType: any;
  // @ViewChild('calendar') calendar: MatCalendar

  @ViewChild('picker') picker;
  flag: boolean = false;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log("soze", this.innerWidth);
    this.getHeight();
  }

  constructor(
    private routers: ActivatedRoute,
    private router: Router,
    public appservice: AppService,
    public dashboardService: DashboardService,
    public sanitizer: DomSanitizer,
    public commonVaidation: CommonValidation,
    public notifierService: NotifierService
  ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
    });

    if (localStorage.getItem("lang") === "ar") {
      this.txt1 = "مدفوعة";
      this.txt2 = " غير مدفوعة";
      this.txt3 = "جزئيا";
    } else {
      this.txt1 = "Paid";
      this.txt2 = "Partially";
      this.txt3 = "Unpaid";
    }

    this.appservice.data4.subscribe((res) => {
      console.log("behave", res);
      this.tin = res;
      if (this.tin === "1") {
        this.tinNumber = localStorage.getItem("gpart");
        this.getReturnsCount();
        this.getCommittmentsUnsubmitted();
        this.getCommittmentsPayentsOverDue();
        this.getBill();
        this.getBillReturnsCount();
        this.getQuickAction();
      }
    });
  }

  ngOnInit(): void {
    this.appservice.data1.subscribe(
      (res) => {
        console.log("test1", res);
        this.selectedCalType = res;
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
    console.log("Calender Ref :: ", this.calendar)
    this.tpType = localStorage.getItem("tpType");
    if (localStorage.getItem("lang") === "ar") {
      this.img = "assets/image/circle-arrow-right-copy-18.svg";
      this.lang = newDashboardLabels.langz.arb;
      this.direction = "rtl";
    } else {
      this.img = "assets/image/arrow-right.svg";
      this.lang = newDashboardLabels.langz.eng;
      this.direction = "ltr";
    }

    if (this.tpType !== "TA") this.getData();

    if (this.tpType === "TA") {
      this.tinNumber = localStorage.getItem("gpart");
      this.getQuickAction();
    }

    this.createChart("doughnut", [0, 0, 0], ["Paid", "Pending", "Unpaid"]);
    this.createChart(
      "doughnut1",
      [25, 65, 10],
      ["Submitted", "Overdue", "Unsubmitted"]
    );
  }

  showTooltip() {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  } 

  createChart(name, data, labels) {
    let subPerf = new Chart(name, {
      type: "doughnut",
      options: {
        elements: {
          point: {
            radius: 50,
          },
        },
        cutoutPercentage: 95,
        responsive: true,
        onClick: (event) => {
          // // let point = Chart.helpers.getRelativePosition(event, subPerf.chart);
          // // let xIndex = subPerf.scales["x-axis-0"].getValueForPixel(point.x);
          // let label = subPerf.data.labels[xIndex];
          // console.log(label + " at index " + xIndex);
        },
        title: {
          display: false,
          text: "Doughnut Chart",
        },
        legend: this.legend,
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
      data: {
        datasets: [
          {
            data: data,
            backgroundColor: ["#065e49", "#d39e05", "#aa0c19"],
            label: "Dataset 1",
            borderWidth: 0,
            borderCapStyle: "round",
            hoverBorderColor: ["#065e49", "#d39e05", "#aa0c19"],
            hoverBorderWidth: 6,
          },
        ],
        labels: labels,
      },
    });
  }

  // getData(): any {
  //   this.appservice.logout().subscribe((res) => {
  //     this.tin = res["d"]["Gpartz"];
  //     localStorage.setItem("gpart", res["d"]["Gpartz"]);

  //     console.log("kjsdalqfb; bwefBSDFsd", res)
  //   });
  //   // this.appservice.logout().subscribe((res) => {
  //   //   localStorage.setItem('gpart', res['d']['Gpartz']);
  //   //   console.log('kjsdalqfb; bwefBSDFsd', res);
  //   // },err=>{
  //   //   console.log(err)
  //   // });
  // }

  getQuickAction(): any {
    this.dashboardService.getQickAction(this.tinNumber).subscribe(
      (res) => {
        console.log("quick", res);
        this.quickMenu = [];
        this.quickMenu = res["d"]["ActionItemFavSet"].results;
        this.quickMenu.forEach((element) => {
          element.Applink = "/" + element.Applink.toLowerCase();

          if (
            element.ActDesc === "VAT Returns" ||
            element.ActDesc === "إقرار زكوي"
          ) {
            element["displayField"] = "1";
          } else if (
            element.ActDesc === "Zakat Returns" ||
            element.ActDesc === "إقرارات ضريبة القيمة المضافة"
          ) {
            element["displayField"] = "2";
          } else {
            element["displayField"] = "0";
          }
        });
        //this.quickMenu = VATConstants.menu;
        // this.quickMenu.forEach((ele) => {
        //   if(ele.)
        // });
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }
  getBill(): any {
    this.dashboardService.getBills(this.tinNumber).subscribe(
      (res) => {
        console.log("Bill", res);
        this.cmmttmnts = res["d"]["results"];
        this.billsCount = res["d"]["results"].length;
        if (this.billsCount === 0) {
          this.billsChart = true;
        } else {
          this.billsChart = false;
        }
        this.addEvent(this.commonVaidation.toJulianDate1(new Date()));
        // this.billsdata
        // this.incomeTax =
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  getBillReturnsCount(): any {
    this.dashboardService.getBillReturnsCount(this.tinNumber).subscribe(
      (res) => {
        console.log("Bill Returns - Success", res);

        this.counterNumber = res["d"]["results"][0]["DueIcr"];
        this.counterNumber1 = res["d"]["results"][0]["NrtnTot"];
        this.counterNumber2 = res["d"]["results"][0]["RtnTot"];

        this.paidZakat = Number(res["d"]["results"][0]["PbillsTot"]);
        this.unPaidZakat = Number(res["d"]["results"][0]["UpbillsTot"]);
        this.partialpaidZakat = Number(res["d"]["results"][0]["PrbillsTot"]);
        this.totalAmountZakat =
          Number(res["d"]["results"][0]["PbillsTot"]) +
          Number(res["d"]["results"][0]["PrbillsTot"]) +
          Number(res["d"]["results"][0]["UpbillsTot"]);

        this.paidVAT = res["d"]["results"][0]["PbillsTot"];
        this.unPaidVAT = res["d"]["results"][0]["UpbillsTot"];
        this.partialpaidVAT = res["d"]["results"][0]["PrbillsTot"];
        this.totalAmountVAT = res["d"]["results"][0]["PbillsTot"];

        this.startDtVAT = res["d"]["results"][0]["Begda"];
        this.endDtVAT = res["d"]["results"][0]["Endda"];

        this.txt4 = res["d"]["results"][0]["PbillsBetrw"] 
        this.txt5 = res["d"]["results"][0]["PrbillsBetrw"]
        this.txt6 = res["d"]["results"][0]["UpbillsBetrw"]

        this.createChart(
          "doughnut",
          [Number(this.txt4), Number(this.txt5), Number(this.txt6)],

          [this.txt1, this.txt2, this.txt3]
        );
      },
      (err) => {
        this.billsChart = true;
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  getReturnsCount(): any {
    this.dashboardService.getReturnsCount(this.tinNumber).subscribe(
      (res) => {
        console.log("Returns -->", res);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  getCommittmentsUnsubmitted(): any {
    this.dashboardService.getCommittmentsUnsubmitted(this.tinNumber).subscribe(
      (res) => {
        console.log("Committments - Unsubmitted", res);
        this.commitmentsArray = res["d"]["results"];
        if (res["d"]["results"].length > 0) {
          let dueDt = +res["d"]["results"][0]["DueDt"].substring(
            6,
            res["d"]["results"][0]["DueDt"].length - 2
          );
          this.commitmentPartialBillDt = dueDt;
          this.commitmentPartialBillAmount = res["d"]["results"][0]["Amount"];
          this.commitmentPartialCurrency = res["d"]["results"][0]["Waers"];
        }
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  getCommittmentsPayentsOverDue(): any {
    this.dashboardService
      .getCommittmentsPayentsOverDue(this.tinNumber)
      .subscribe(
        (res) => {
          console.log("Committments - Payments Overdue", res);
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
  }

  makeActive(name) {
    this.dashMenu.forEach((item) => {
      item.name === name ? (item.active = true) : (item.active = false);
    });
  }

  // doughnutChartLabels: Label[] = ['Paid', 'Pending', 'Unpaid'];
  // doughnutChartData: MultiDataSet = [[55, 25, 20]];
  // public lineChartColors: Color[] = [
  //   {
  //     backgroundColor: ['#065e49', '#d39e05', '#aa0c19'],
  //   },
  // ];

  // doughnutChartLabels1: Label[] = ['Submitted', 'Overdue', 'Unsubmitted'];
  // doughnutChartData1: MultiDataSet = [[25, 65, 10]];
  // public lineChartColors1: Color[] = [
  //   {
  //     backgroundColor: ['#065e49', '#d39e05', '#aa0c19'],
  //   },
  // ];
  // doughnutChartType: ChartType = 'doughnut';
  // dataset: ChartDataSets = {
  //   radius : 40
  // }

  julianIntToDate(n) {
    // convert a Julian number to a Gregorian Date.
    //    S.Boisseau / BubblingApp.com / 2014
    var a = n + 32044;
    var b = Math.floor((4 * a + 3) / 146097);
    var c = a - Math.floor((146097 * b) / 4);
    var d = Math.floor((4 * c + 3) / 1461);
    var e = c - Math.floor((1461 * d) / 4);
    var f = Math.floor((5 * e + 2) / 153);

    var D = e + 1 - Math.floor((153 * f + 2) / 5);
    var M = f + 3 - 12 - Math.round(f / 10);
    var Y = 100 * b + d - 4800 + Math.floor(f / 10);

    return new Date(Y, M, D);
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  dateClass() {
    if(this.calendar){
      if(!this._dateAdapter && this.count < 2){
        this.picker ? this.picker.open(): '';
        this.picker.close();
        this.count++;
      }
      this._dateAdapter ? this._dateAdapter.setLocale(localStorage.getItem('lang')) : '';
      // if(this.selectedCalType !== "Gregorian" && localStorage.getItem("lang") == "ar"){
        if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
          const convertedDate = this._dateAdapter.convertCalendar(
            this.calendar.activeDate,
            this.selectedCalType
          );
          console.log("after conversion", convertedDate);
          this.calendar.activeDate = convertedDate;
          this.calendar.updateTodaysDate();
        }
      }
    if(!this.cmmttmnts) {
      console.log("Calender Reff :: ", this.calendar);
      return }
    return (date: Date): MatCalendarCellCssClasses => {
      let d = this.commonVaidation.changeDate3(date);
      let selectedDate = this.cmmttmnts.filter((e) => e.Faednar == d);
      let partiallyPaidFlag = false; // I
      let unpaidFlag = false; // O
      let paidFlag = false; // P

      if (selectedDate.length > 0) {
        partiallyPaidFlag =
          selectedDate.filter((e) => e.Status == "I").length > 0 ? true : false;
        unpaidFlag =
          selectedDate.filter((e) => e.Status == "O").length > 0 ? true : false;
        paidFlag =
          selectedDate.filter((e) => e.Status == "P").length > 0 ? true : false;

        if (partiallyPaidFlag && unpaidFlag && paidFlag) return "special-date4";
        if (partiallyPaidFlag && unpaidFlag) return "special-date2";
        if (partiallyPaidFlag && paidFlag) return "special-date1";
        if (paidFlag && unpaidFlag) return "special-date3";
        if (paidFlag) return "special-date-green";
        if (unpaidFlag) return "special-date-red";
        if (partiallyPaidFlag) return "special-date-gold";
      }
      // console.log("AFTER :: ",selectedDate, d);
    };
  }

  closeQuickMenu() {
    this.appservice.updatedDataSelection5("0");
  }

  returnNavigate(val) {
    let returnVal;
    if (val === 1) returnVal = this.lang.returns.t1;
    if (val === 2) returnVal = this.lang.returns.t2;
    if (val === 3) returnVal = this.lang.returns.t3;
    this.appservice.updatedDataSelection7(returnVal);
    this.router.navigate(["mains/returns/search"]);
  }

  billsNavigate(val) {
    let returnVal;
    if (val === 1) returnVal = "P";
    if (val === 2) returnVal = "I";
    if (val === 3) returnVal = "O";
    this.appservice.updatedDataSelection8(returnVal);
    this.router.navigate(["mains/bills"]);
  }

  addEvent(event) {
    console.log(event);
    let dt = this.commonVaidation.changeDate3(event);
    this.selectedDate = this.cmmttmnts.filter((e) => e.Faednar == dt);
    console.log(this.selectedDate);
    if (this.selectedDate.length > 0) {
      this.showCommittments = true;
    } else this.showCommittments = false;
  }

  formatDate(date) {
    let d = date.substring(6, date.length - 2);
    return new Date(+d);
  }

  getDate(date) {
    return moment(date).locale("en-us").format("D");
  }

  getMonth(date) {
    return this.lang.months[moment(date).locale("en-us").format("MM")]["half"];
  }

  getHeight() {
    // let height = document.getElementsByClassName('mat-calendar-table')[0].clientHeight;?
      if(this.calendar){
        let height = document.getElementsByClassName('mat-calendar-table')[0].clientHeight;
        return (height + 35)+"px"; 
      }
      let w = window.innerWidth;
      if (w < 1000) {
        return "250px";
      }
      if (w >= 1000 && w < 1200) {
        return "320px";
      }
      if (w >= 1200 && w < 1300) {
        return "390px";
      }
      if (w >= 1300 && w < 1600) {
        return "480px";
      }
      if (w >= 1600 && w < 1900) {
        return "490px";
      }
      if (w >= 1900) {
        return "555px";
      }
  }

  getData(): any {
    this.dashboardService.getDashboardData$().subscribe(
      (res) => {
        let data = res["d"]["MainTileSet"]["results"];
        data.forEach((element) => {
          if (this.tpType === "TE") {
            this.billsFlag = true;
            this.commitmentFlag = false;
            this.returnFlag = false;
            this.installmentFlag = false;
          } else {
            if (element.Tileno === "82") this.commitmentFlag = true;
            if (element.Tileno === "84") this.returnFlag = true;
            if (element.Tileno === "85") this.billsFlag = true;
            if (element.Tileno === "88") this.installmentFlag = true;
          }

          // if(element.Tileno === '')
          // this.Flag = true;
        });
      },
      (error) => {
        // this.sessionService.validateSession();
      }
    );
  }
}
