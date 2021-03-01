import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { CommitmentConstants } from "src/app/constants/CommitmentConstants";
import { CommitmentsService } from "src/app/services/commitments.service";
import * as moment from "moment";
import { PrimeNGConfig } from "primeng/api";

declare var $: any;

@Component({
  selector: "app-commitment",
  templateUrl: "./commitment.component.html",
  styleUrls: ["./commitment.component.css"],
  // encapsulation: ViewEncapsulation.None
})
export class CommitmentComponent implements OnInit {
  lang = CommitmentConstants["en"];
  displayedCommitments = "all";
  allObligations: any = [];
  todaysObligations: any = [];
  nextObligations: any = [];
  filteredBills: any = [];
  allBills: any = [];
  todaysBills: any = [];
  nextBills: any = [];
  filteredReturns: any = [];
  allReturns: any = [];
  todaysReturns: any = [];
  nextReturns: any = [];
  dateRange = null;
  dateRangeFilteredObligations: any = [];
  dateRangeFilteredBills: any = [];
  dateRangeFilteredReturns: any = [];
  primeRange: any = null;

  constructor(
    public commitmentService: CommitmentsService,
    private config: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.config.setTranslation({
      dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    });
    if (localStorage.getItem("lang") === "ar") {
      this.lang = CommitmentConstants["ar"];
      this.config.setTranslation({
        monthNames: [
          "يناير",
          "فبراير",
          "مارس",
          "ابريل",
          "مايو",
          "يونيو",
          "يوليو",
          "أغسطس",
          "سبتمبر",
          "أكتوبر",
          "نوفمبر",
          "ديسمبر",
        ],
        dayNamesMin: [
          "أحد",
          "إثنين",
          "ثلاثاء",
          "أربعاء",
          "خميس",
          "جمعة",
          "سبت",
        ],
      });
    }
    const date = new Date();
    const fromDate = moment(new Date(date.getFullYear(), date.getMonth(), 1))
      .locale("en-us")
      .format("YYYY-MM-DDTH:mm");
    console.log(fromDate);
    const toDate = moment(new Date(date.getFullYear(), date.getMonth() + 2, 0))
      .locale("en-us")
      .format("YYYY-MM-DDTH:mm");
    console.log(toDate);
    // this.getCalendarData(fromDate, toDate, date);
    this.getEncryptedTins();
  }

  @HostListener("click")
  onClick() {
    console.log("eee");
    $("td:has(span.p-highlight)").addClass("td-p-highlight");
    $("td.td-p-highlight")
      .not(":has(span.p-highlight)")
      .removeClass("td-p-highlight");
    $("td:has(span span.p-startDate)").addClass("td-p-startDate");
    $("td.td-p-startDate")
      .not(":has(span span.p-startDate)")
      .removeClass("td-p-startDate");
    $("td:has(span span.p-endDate)").addClass("td-p-endDate");
    $("td.td-p-endDate")
      .not(":has(span span.p-endDate)")
      .removeClass("td-p-endDate");
  }

  primeSelected(event) {
    console.log(event);
    console.log(this.primeRange);
    if (this.primeRange[0] !== null && this.primeRange[1] !== null) {
      const startDate = moment(this.primeRange[0]);
      const endDate = moment(this.primeRange[1]);
      this.dateRange = {
        begin: this.primeRange[0],
        end: this.primeRange[1],
      };
      this.dateRangeFilteredObligations = [];
      this.dateRangeFilteredBills = [];
      this.dateRangeFilteredReturns = [];
      for (let i = 0; i < this.allObligations.length; i++) {
        const obligationDate = moment(this.allObligations[i]["Faedn"]);
        if (
          obligationDate.isSameOrAfter(startDate, "day") &&
          obligationDate.isSameOrBefore(endDate, "day")
        ) {
          this.dateRangeFilteredObligations.push(this.allObligations[i]);
        }
      }
      for (let i = 0; i < this.filteredBills.length; i++) {
        const billDate = moment(this.filteredBills[i]["Faedn"]);
        if (
          billDate.isSameOrAfter(startDate, "day") &&
          billDate.isSameOrBefore(endDate, "day")
        ) {
          this.dateRangeFilteredBills.push(this.filteredBills[i]);
        }
      }
      for (let i = 0; i < this.filteredReturns.length; i++) {
        const returnDate = moment(this.filteredReturns[i]["DueDt"]);
        if (
          returnDate.isSameOrAfter(startDate, "day") &&
          returnDate.isSameOrBefore(endDate, "day")
        ) {
          this.dateRangeFilteredReturns.push(this.filteredReturns[i]);
        }
      }
    } else {
      this.dateRange = null;
    }
  }

  dateClass = (d: Date) => {
    const date = moment(d);
    for (let i = 0; i < this.filteredBills.length; i++) {
      const billDate = moment(this.filteredBills[i]["Faedn"]);
      if (billDate.isSame(date, "day")) {
        return "zs-calendarEvent";
      }
    }
    return "";
  };

  getDisplayDate() {
    const startDate = moment(this.dateRange["begin"]);
    const endDate = moment(this.dateRange["end"]);
    startDate.locale("en-us");
    endDate.locale("en-us");
    if (startDate.isSame(endDate, "month")) {
      return `${startDate.format("Do")} - ${endDate.format("Do")} ${
        this.lang.months[endDate.format("MM")]["full"]
      } ${endDate.format("YYYY")}`;
    } else if (startDate.isSame(endDate, "year")) {
      return `${startDate.format("Do")} ${
        this.lang.months[startDate.format("MM")]["full"]
      } - ${endDate.format("Do")} ${
        this.lang.months[endDate.format("MM")]["full"]
      } ${endDate.format("YYYY")}`;
    } else {
      return `${startDate.format("Do")} ${
        this.lang.months[startDate.format("MM")]["full"]
      } ${startDate.format("YYYY")} - ${endDate.format("Do")} ${
        this.lang.months[endDate.format("MM")]["full"]
      } ${endDate.format("YYYY")}`;
    }
  }

  dateRangeSelect(val) {
    const endDate = moment(val["end"]);
    const startDate = moment(val["begin"]);
    this.dateRange = val;
    this.dateRangeFilteredObligations = [];
    this.dateRangeFilteredBills = [];
    this.dateRangeFilteredReturns = [];
    for (let i = 0; i < this.allObligations.length; i++) {
      const obligationDate = moment(this.allObligations[i]["Faedn"]);
      if (
        obligationDate.isSameOrAfter(startDate, "day") &&
        obligationDate.isSameOrBefore(endDate, "day")
      ) {
        this.dateRangeFilteredObligations.push(this.allObligations[i]);
      }
    }
    for (let i = 0; i < this.filteredBills.length; i++) {
      const billDate = moment(this.filteredBills[i]["Faedn"]);
      if (
        billDate.isSameOrAfter(startDate, "day") &&
        billDate.isSameOrBefore(endDate, "day")
      ) {
        this.dateRangeFilteredBills.push(this.filteredBills[i]);
      }
    }
    for (let i = 0; i < this.filteredReturns.length; i++) {
      const returnDate = moment(this.filteredReturns[i]["DueDt"]);
      if (
        returnDate.isSameOrAfter(startDate, "day") &&
        returnDate.isSameOrBefore(endDate, "day")
      ) {
        this.dateRangeFilteredReturns.push(this.filteredReturns[i]);
      }
    }
  }

  onLoad(args: any) {
    // if (args.date.getDate() === new Date().getDate()){
    //   let div: HTMLElement;
    //     div = document.createElement('div');
    //     let span = document.createElement('span');
    //     span.setAttribute("class", "event green");
    //     let span1 = document.createElement('span');
    //     span1.setAttribute('class', 'event red');
    //     div.appendChild(span);
    //     div.appendChild(span1);
    //     div.setAttribute("class", "events");
    //     args.element.appendChild(div);
    // }
    let primaryEvent = false;
    let secondaryEvent = false;
    let errorEvent = false;
    let div = document.createElement("div");
    div.setAttribute("class", "events");
    const date = moment(args.date);
    for (let i = 0; i < this.allObligations.length; i++) {
      if (primaryEvent && secondaryEvent && errorEvent) {
        break;
      }
      const obligationDate = moment(this.allObligations[i]["Faedn"]);
      if (obligationDate.isSame(date, "day")) {
      }
    }
    if (args.date.getDate() === 29) {
    }
    for (let i = 0; i < this.allBills.length; i++) {
      if (primaryEvent && secondaryEvent && errorEvent) {
        break;
      }
      const billDate = moment(this.allBills[i]["Faedn"]);
      if (billDate.isSame(date, "day")) {
        if (!primaryEvent && this.allBills[i]["Status"] === "P") {
          let span = document.createElement("span");
          span.setAttribute("class", "event primaryEvent");
          span.setAttribute("style", "background-color: #006450 !important;");
          div.appendChild(span);
          primaryEvent = true;
        } else if (!secondaryEvent && this.allBills[i]["Status"] === "I") {
          let span = document.createElement("span");
          span.setAttribute("class", "event secondaryEvent");
          span.setAttribute("style", "background-color: #d99a29 !important;");
          div.appendChild(span);
          secondaryEvent = true;
        } else if (!errorEvent && this.allBills[i]["Status"] === "O") {
          let span = document.createElement("span");
          span.setAttribute("class", "event errorEvent");
          span.setAttribute("style", "background-color: #aa0c19 !important;");
          div.appendChild(span);
          errorEvent = true;
        }
      }
    }
    if (primaryEvent || secondaryEvent || errorEvent) {
      if (args.element) {
        args.element.appendChild(div);
      }
    }
  }

  selectCommitment(type) {
    this.displayedCommitments = type;
    this.filterCommitments();
    if (this.dateRange) {
      this.dateRangeSelect(this.dateRange);
    }
  }

  startOrEndDate(date: any) {
    if (this.dateRange !== null) {
      const beginDate = moment(this.dateRange["begin"]);
      const endDate = moment(this.dateRange["end"]);
      if (beginDate.isSame(date, "day")) {
        return "p-startDate";
      } else if (endDate.isSame(date, "day")) {
        return "p-endDate";
      }
    }
    return "p-normalDate";
  }

  isPaidBill(date: any) {
    const momentDate = moment(
      `${date.month + 1}/${date.day}/${date.year}`,
      "M/D/YYYY"
    )
      .locale("en-us")
      .format("DD/MM/YYYY");
    for (let i = 0; i < this.filteredBills.length; i++) {
      const billDate = moment(this.filteredBills[i]["Faedn"]);
      if (
        billDate.isSame(date, "day") &&
        this.filteredBills[i]["Status"] === "P"
      ) {
        return true;
      }
    }
    return false;
  }

  isUnpaidBill(date: any) {
    const momentDate = moment(
      `${date.month + 1}/${date.day}/${date.year}`,
      "M/D/YYYY"
    )
      .locale("en-us")
      .format("DD/MM/YYYY");
    for (let i = 0; i < this.filteredBills.length; i++) {
      const billDate = moment(this.filteredBills[i]["Faedn"]);
      if (
        billDate.isSame(date, "day") &&
        this.filteredBills[i]["Status"] === "O"
      ) {
        return true;
      }
    }
    for (let i = 0; i < this.filteredReturns.length; i++) {
      const returnDate = moment(this.filteredReturns[i]["DueDt"]);
      if (
        returnDate.isSame(date, "day") &&
        this.filteredReturns[i]["returnStatus"] === "Overdue"
      ) {
        return true;
      }
    }
    return false;
  }

  isPartialPaidBill(date: any) {
    const momentDate = moment(
      `${date.month + 1}/${date.day}/${date.year}`,
      "M/D/YYYY"
    )
      .locale("en-us")
      .format("DD/MM/YYYY");
    for (let i = 0; i < this.filteredBills.length; i++) {
      const billDate = moment(this.filteredBills[i]["Faedn"]);
      if (
        billDate.isSame(date, "day") &&
        this.filteredBills[i]["Status"] === "I"
      ) {
        return true;
      }
    }
    return false;
  }

  isUnsubmittedReturn(date: any) {
    const momentDate = moment(
      `${date.month + 1}/${date.day}/${date.year}`,
      "M/D/YYYY"
    )
      .locale("en-us")
      .format("DD/MM/YYYY");
    for (let i = 0; i < this.filteredReturns.length; i++) {
      const returnDate = moment(this.filteredReturns[i]["DueDt"]);
      if (
        returnDate.isSame(date, "day") &&
        this.filteredReturns[i]["returnStatus"] === "Unsubmitted"
      ) {
        return true;
      }
    }
    return false;
  }

  filterCommitments() {
    if (this.displayedCommitments === "all") {
      this.filteredBills = [...this.allBills];
      this.filteredReturns = [...this.allReturns];
    } else if (this.displayedCommitments === "zakat") {
      this.filteredBills = this.allBills.filter(
        (bill) =>
          bill["Abtypt"] === "Zakat" ||
          bill["Abtypt"] === "Income Tax" ||
          bill["Abtypt"] === "الزكاة"
      );
      this.filteredReturns = this.allReturns.filter(
        (returnObj) => returnObj["returnType"] === "zakat"
      );
    } else if (this.displayedCommitments === "vat") {
      this.filteredBills = this.allBills.filter(
        (bill) =>
          bill["Abtypt"] === "VAT" || bill["Abtypt"] === "ضريبة القيمة المضافة"
      );
      this.filteredReturns = this.allReturns.filter(
        (returnObj) => returnObj["returnType"] === "vat"
      );
    } else if (this.displayedCommitments === "excise") {
      this.filteredBills = this.allBills.filter(
        (bill) =>
          bill["Abtypt"] === "Excise Tax" ||
          bill["Abtypt"] === "الضريبة الانتقائية"
      );
      this.filteredReturns = this.allReturns.filter(
        (returnObj) => returnObj["returnType"] === "excise"
      );
    } else if (this.displayedCommitments === "withholding") {
      this.filteredBills = this.allBills.filter(
        (bill) =>
          bill["Abtypt"] === "Withholding Tax" ||
          bill["Abtypt"] === "ضريبة الاستقطاع"
      );
      this.filteredReturns = this.allReturns.filter(
        (returnObj) => returnObj["returnType"] === "withholding"
      );
    }
    const today = moment(new Date());
    this.todaysBills = [];
    this.nextBills = [];
    for (let i = 0; i < this.filteredBills["length"]; i++) {
      const obligationDate = moment(this.filteredBills[i]["Faedn"]);
      if (today.isSame(obligationDate, "day")) {
        this.todaysBills.push(this.filteredBills[i]);
      } else if (today.isBefore(obligationDate, "day")) {
        this.nextBills.push(this.filteredBills[i]);
      }
    }
    console.log(this.todaysBills, this.todaysObligations);
    this.todaysReturns = [];
    this.nextReturns = [];
    for (let i = 0; i < this.filteredReturns["length"]; i++) {
      const returnDate = moment(this.filteredReturns[i]["DueDt"]);
      if (today.isSame(returnDate, "day")) {
        this.todaysReturns.push(this.filteredReturns[i]);
      } else if (today.isBefore(returnDate, "day")) {
        this.nextReturns.push(this.filteredReturns[i]);
      }
    }
    console.log(this.todaysBills, this.todaysObligations);
  }

  getDate(date) {
    return (
      moment(date).locale("en-us").format("D") +
      " " +
      this.lang.months[moment(date).locale("en-us").format("MM")]["half"]
    );
  }

  getMonth(date) {
    return moment(date).locale("en-us").format("YYYY");
  }

  getNumber(amount) {
    let num = parseFloat(amount);
    return num.toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  getCalendarData(fromDate, toDate, date) {
    this.commitmentService.getCalendarData(fromDate, toDate).subscribe(
      (res) => {
        // this.allObligations = res["d"]["results"];
        // const today = moment(date);
        // for (let i = 0; i < this.allObligations["length"]; i++) {
        //   const obligationDate = moment(this.allObligations[i]["Faedn"]);
        //   if (today.isSame(obligationDate, "day")) {
        //     this.todaysObligations.push(this.allObligations[i]);
        //   } else if (today.isBefore(obligationDate, "day")) {
        //     this.nextObligations.push(this.allObligations[i]);
        //   }
        // }
        this.allBills = res["d"]["results"];
        this.filterCommitments();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getBillsData() {
    this.commitmentService.getBillsData().subscribe(
      (res) => {
        this.allBills = res["d"]["results"];
        const today = moment(new Date());
        this.commitmentService.getUnsubmittedReturn().subscribe(
          (res) => {
            console.log(res);
            this.allReturns = res["d"]["results"].filter(
              (returnObj) =>
                returnObj["Incotyp"] !== "" && returnObj["IcrStatusAn"] !== ""
            );
            this.allReturns = this.allReturns.map((returnObj) => {
              if (
                returnObj["Incotyp"] === "G-01-A" ||
                returnObj["Incotyp"] === "G-02-A" ||
                returnObj["Incotyp"] === "G-03-A" ||
                returnObj["Incotyp"] === "G-04-A" ||
                returnObj["Incotyp"] === "G-05-A" ||
                returnObj["Incotyp"] === "G-08-A" ||
                returnObj["Incotyp"] === "G-10-A" ||
                returnObj["Incotyp"] === "G-11-A" ||
                returnObj["Incotyp"] === "H-01-A" ||
                returnObj["Incotyp"] === "H-02-A" ||
                returnObj["Incotyp"] === "H-03-A" ||
                returnObj["Incotyp"] === "H-04-A" ||
                returnObj["Incotyp"] === "H-05-A" ||
                returnObj["Incotyp"] === "H-08-A" ||
                returnObj["Incotyp"] === "H-10-A" ||
                returnObj["Incotyp"] === "G-08-A-I" ||
                returnObj["Incotyp"] === "G-08-A-P" ||
                returnObj["Incotyp"] === "G-10-A-I" ||
                returnObj["Incotyp"] === "G-04-A-I" ||
                returnObj["Incotyp"] === "G-04-A-P" ||
                returnObj["Incotyp"] === "G-05-A-I" ||
                returnObj["Incotyp"] === "H-04-A-I" ||
                returnObj["Incotyp"] === "H-04-A-P" ||
                returnObj["Incotyp"] === "H-05-A-I" ||
                returnObj["Incotyp"] === "H-08-A-I" ||
                returnObj["Incotyp"] === "H-08-A-P" ||
                returnObj["Incotyp"] === "H-10-A-I"
              ) {
                returnObj["returnType"] = "zakat";
              } else if (
                returnObj["Incotyp"] === "G-VT-M" ||
                returnObj["Incotyp"] === "G-VT-Q" ||
                returnObj["Incotyp"] === "H-VT-M" ||
                returnObj["Incotyp"] === "H-VT-Q"
              ) {
                returnObj["returnType"] = "vat";
              } else if (
                returnObj["Incotyp"] === "H-ET-B" ||
                returnObj["Incotyp"] === "G-ET-B"
              ) {
                returnObj["returnType"] = "excise";
              } else if (
                returnObj["Incotyp"] === "G-09-A" ||
                returnObj["Incotyp"] === "G-06-M" ||
                returnObj["Incotyp"] === "H-09-A" ||
                returnObj["Incotyp"] === "H-06-M"
              ) {
                returnObj["returnType"] = "withholding";
              }
              if (
                returnObj["IcrStatusAn"] === "Unsubmitted Return" ||
                returnObj["IcrStatusAn"] === "إقرار غير مقدم"
              ) {
                returnObj["returnStatus"] = "Unsubmitted";
              } else if (
                returnObj["IcrStatusAn"] === "Overdue Return" ||
                returnObj["IcrStatusAn"] === "إقرار متأخر"
              ) {
                returnObj["returnStatus"] = "Overdue";
              }
              return returnObj;
            });
            this.filterCommitments();
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getEncryptedTins() {
    this.commitmentService.getEncryptedTins().subscribe(
      (res) => {
        this.getDashboardData(
          res["d"]["Val1"],
          res["d"]["Val2"],
          res["d"]["Val3"],
          res["d"]["Val4"],
          res["d"]["Val5"]
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getDashboardData(euser1, euser2, euser3, euser4, euser5) {
    this.commitmentService
      .getDashboardData(euser1, euser2, euser3, euser4, euser5)
      .subscribe(
        (res) => {
          localStorage.setItem("euser", res["d"]["Euser"]);
          localStorage.setItem("fbguid", res["d"]["Fbguid"]);
          this.getBillsData();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
