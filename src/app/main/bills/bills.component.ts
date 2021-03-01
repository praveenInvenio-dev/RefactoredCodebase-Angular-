import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { ActivatedRoute, Router } from "@angular/router";
import { BillsService } from "src/app/services/bills.service";
import { DatePipe } from "@angular/common";
import { CommonValidation } from "src/app/constants/commonValidations";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { constants } from "src/app/constants/constants.model";
import { AppService } from "src/app/app.service";

enum Status {
  P = "Paid",
  I = "Partially",
  O = "Unpaid",
}

enum StatusAr {
  P = "مدفوع",
  I = "جزئي",
  O = "غير مدفوع",
}

@Component({
  selector: "app-bills",
  templateUrl: "./bills.component.html",
  styleUrls: ["./bills.component.css"],
})
export class BillsComponent implements OnInit {
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
  search;
  dtype: any;
  toLimit: any;
  dateErr: boolean;
  dateMsg: string;
  amtErr: boolean;
  amtMsg: string;
  billsDashStatus: string;

  constructor(
    public billsService: BillsService,
    public datePipe: DatePipe,
    public commonVaidation: CommonValidation,
    public appSrv: AppService
  ) {}

  ngOnInit(): void {
    
    this.appSrv.data8.subscribe((res) => {
      this.billsDashStatus = res;
    });
    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.bills;
      this.dir = constants.langz.arb.dir;
      this.search = "بحث";
    } else {
      this.lang = constants.langz.eng.bills;
      this.dir = constants.langz.eng.dir;
      this.search = "Search";
    }

    this.img1 = "assets/image/table (1).svg";
    this.img2 = "assets/image/cards (1).svg";

    if (this.dir === "rtl") {
      this.dirName = "جميع الفواتير";
    } else {
      this.dirName = "All Bills";
    }
    this.loadBillsData();
  }

  chnagesFromAmt() {
    if (this.to !== 0 && this.from !== 0) {
      if (this.from > this.to) {
        this.amtErr = true;
        this.amtMsg = "Select To Amount greater than From Amount";
        this.to = 0;
      } else {
        this.amtErr = false;
      }
    }
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

  loadBillsData() {
    this.billsService.getBills().subscribe(
      (res) => {
        console.log("Bills response is SUCCESS", res);
        this.data = res["d"]["results"];
        this.data.forEach((item) => {
          item["from"] = "";
          item["from"] = this.dateformat(item.Period);
          let year2;
          if (this.dir === "rtl") year2 = item.Faednar.substr(0, 4);
          else year2 = item.Faednar.substr(6, 4);

          if (parseInt(year2) < 1900)
            item["DueDtCtxt"] = this.getArabicFormat(item.Faednar);
          else item["DueDtCtxt"] = this.getEnglishFormat(item.Faednar);

          parseInt(year2) < 1900 ? (item["year"] = 0) : (item["year"] = 1);
        });

        if (this.billsDashStatus !== "") {
          this.data = this.data.filter(
            (x) => x.Status === this.billsDashStatus
          );
        } else {
          this.data = this.data;
        }

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
  dateformat(value) {
    let p1 = value.substr(0, 8);
    let p2 = value.substring(value.indexOf("-") + 1);
    return this.dateformatter(p1, p2);
  }

  dateformatter(p1, p2) {
    let datz = "";
    datz =
      p1.substr(0, 4) +
      "/" +
      p1.substr(4, 2) +
      "/" +
      p1.substr(6, 2) +
      " - " +
      p2.substr(0, 4) +
      "/" +
      p2.substr(4, 2) +
      "/" +
      p2.substr(6, 2);
    console.log("dsa", datz);
    return datz;
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
      };
      this.statusesNew.push(obj);
    });
  }
  // getStatusesFail() {
  //   for (let i = 0; i < this.data.length; i++) {
  //     this.statuses.push(billsData.d.results[i].Status);
  //   }
  //   this.statuses = this.statuses.filter((el, i, a) => i === a.indexOf(el));
  // }
  // getTabsFail() {
  //   this.tabs.push("All Bills");
  //   for (let i = 0; i < this.data.length; i++) {
  //     this.tabs.push(billsData.d.results[i].Abtypt);
  //   }
  //   this.tabs = this.tabs.filter((el, i, a) => i === a.indexOf(el));
  // }
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
    this.statusesNew[i].flag
      ? (this.statusesNew[i].flag = false)
      : (this.statusesNew[i].flag = true);

    // for (var j = 0; j < this.statusesNew.length; j++) {
    //   if (j != i) {
    //     this.statusesNew[j].flag = false;
    //   } else {
    //     this.statusesNew[i].flag = true;
    //   }
    // }
  }

  changeTabz(i) {
    this.tab2[i].flag
      ? (this.tab2[i].flag = false)
      : (this.tab2[i].flag = true);
  }

  changeAmt(amt, amt2) {
    this.data2 = this.data.filter(
      (x) => x.Abtypt === this.selectedTab || this.selectedTab === this.dirName
    );
    this.data2 = this.data2.filter((x) => x.Betrw >= 1 && x.Betrw <= 20000);
  }

  filterList() {
    let type = "";
    if (this.tab2.length > 0) {
      let newList = [];
      this.tab2.forEach((item) => {
        if (item.flag) {
          type = item.name;
          newList.push(this.data.filter((x) => x.Abtypt === item.name));
        }
      });

      this.data2 = [];
      if (newList.length > 0) {
        for (var i = 0; i < newList.length; i++) {
          for (var j = 0; j < newList[i].length; j++) {
            this.data2.push(newList[i][j]);
          }
        }
      } else {
        this.data2 = this.data.filter(
          (x) =>
            x.Abtypt === this.selectedTab || this.selectedTab === this.dirName
        );
      }
      console.log("filtered", this.data2);
    } else {
      this.data2 = this.data.filter(
        (x) =>
          x.Abtypt === this.selectedTab || this.selectedTab === this.dirName
      );
    }

    if (this.statusesNew.length > 0) {
      let newList = [];
      this.statusesNew.forEach((item) => {
        if (item.flag) {
          type = item.name;
          newList.push(this.data2.filter((x) => x.Status === item.name));
        }
      });
      if (newList.length > 0) {
        this.data2 = [];
        for (var i = 0; i < newList.length; i++) {
          for (var j = 0; j < newList[i].length; j++) {
            this.data2.push(newList[i][j]);
          }
        }
      } else {
        if (type === "") {
          this.data2 = this.data.filter(
            (x) =>
              x.Abtypt === this.selectedTab || this.selectedTab === this.dirName
          );
        } else {
          this.data2 = this.data2;
        }
      }

      console.log("filtered", this.data2);
    }

    // this.statusesNew.forEach((item) => {
    //   if (item.flag) type = item.name;
    // });

    // if (type != "") {
    //   this.data2 = this.data.filter(
    //     (x) =>
    //       x.Abtypt === this.selectedTab || this.selectedTab === this.dirName
    //   );

    //   this.data2 = this.data2.filter((x) => x.Status === type);
    // }

    if (this.from > 0 && this.to > 0) {
      this.data2 = this.data2.filter(
        (x) =>
          Math.round(x.Betrw) >= this.from && Math.round(x.Betrw) <= this.to
      );
    }

    if (this.fromDate != null || this.toDate != null)
      this.data2 = this.getdateFiltered(this.data2);

    if (this.data2.length >= 4) {
      this.count = 3;
    } else {
      this.count = this.data2.length - 1;
    }

    this.unpaidTot = 0;
    this.data2.forEach((item) => {
      this.unpaidTot = this.unpaidTot + Number(item["Betrw"]);
    });

    if (
      type === "" &&
      this.from <= 0 &&
      this.to <= 0 &&
      (this.fromDate === null || this.toDate === null)
    ) {
      this.changeTab(this.selectedTab);
    }
  }

  getdateFiltered(value) {
    let newxsx = value.filter((x) => {
      let value = x.Faednar;
      let year = "";
      let mnth = "";
      let day = "";
      if (this.dir === "rtl") {
        year = value.substr(0, 4);
        value = value.substring(value.indexOf("/") + 1);
        mnth = value.substr(0, 2);
        value = value.substring(value.indexOf("/") + 1);
        day = value.substr(0, 2);
      } else {
        day = value.substr(0, 2);
        value = value.substring(value.indexOf("/") + 1);
        mnth = value.substr(0, 2);
        value = value.substring(value.indexOf("/") + 1);
        year = value.substr(0, 4);
      }

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
    console.log("date", newxsx);
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
  getStatusTextCSSClass(status) {
    var classList = "";
    if (status === Status.P) {
      classList = "cardTxt4Css P";
    } else if (status === Status.I) {
      classList = "cardTxt4Css I";
    } else if (status === Status.O) {
      classList = "cardTxt4Css O";
    }
    // console.log('text css',classList);
    return classList;
  }
  getStatusCardCSSClass(status) {
    var classList = "";
    if (status === Status.P) {
      classList = "cardTxt5Css P";
    } else if (status === Status.I) {
      classList = "cardTxt5Css I";
    } else if (status === Status.O) {
      classList = "cardTxt5Css O";
    }
    // console.log('Card css',classList);
    return classList;
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
    this.count = this.data2.length - 1;
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
    this.tab2 = [];
    this.tabs.forEach((item) => {
      let obj = {
        name: item,
        flag: false,
      };
      if (item != this.dirName) this.tab2.push(obj);
    });
    console.log("tab2", this.tab2);
  }

  reset() {
    this.amtErr = false;
    this.amtMsg = "";
    this.dateMsg = "";
    this.dateErr = false;
    this.fromDate = null;
    this.toDate = null;
    this.from = 0;
    this.to = 0;
    for (var j = 0; j < this.statusesNew.length; j++) {
      this.statusesNew[j].flag = false;
    }
    for (var j = 0; j < this.tab2.length; j++) {
      this.tab2[j].flag = false;
    }
  }

  getArabicFormat(data) {
    let datz = "";
    let value = data;
    let year = "";
    let mnth = "";
    let day = "";
    if (this.dir === "rtl") {
      year = value.substr(0, 4);
      value = value.substring(value.indexOf("/") + 1);
      mnth = value.substr(0, 2);
      value = value.substring(value.indexOf("/") + 1);
      day = value.substr(0, 2);
    } else {
      day = value.substr(0, 2);
      value = value.substring(value.indexOf("/") + 1);
      mnth = value.substr(0, 2);
      value = value.substring(value.indexOf("/") + 1);
      year = value.substr(0, 4);
    }
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
    if (this.dir === "rtl") {
      year = value.substr(0, 4);
      value = value.substring(value.indexOf("/") + 1);
      mnth = value.substr(0, 2);
      value = value.substring(value.indexOf("/") + 1);
      day = value.substr(0, 2);
    } else {
      day = value.substr(0, 2);
      value = value.substring(value.indexOf("/") + 1);
      mnth = value.substr(0, 2);
      value = value.substring(value.indexOf("/") + 1);
      year = value.substr(0, 4);
    }
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
}
