import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { CommonValidation } from "src/app/constants/commonValidations";
import * as moment from "moment";
import { DateAdapter } from "@angular/material/core";
import { JDNConvertibleCalendar } from "jdnconvertiblecalendar";

@Component({
  selector: "app-common-component",
  templateUrl: "./common-component.component.html",
  styleUrls: ["./common-component.component.css"],
})
export class CommonComponentComponent implements OnInit {
  dir: String = "ltr";
  headerComponent = CalendarComponent;
  fromDate = null;
  toDate = null;
  dtype: any;
  today = null;
  constructor(
    public appSrv: AppService,
    public commonValid: CommonValidation,
    private _dateAdapter: DateAdapter<JDNConvertibleCalendar>
  ) {}

  ngOnInit(): void {
    console.log(moment().valueOf());
    console.log(moment().locale("ar-sa"));
    this.appSrv.data1.subscribe((res) => {
      this.today = this.commonValid.dateFormate(
        this.commonValid.toJulianDate(new Date()),
        res
      );
      console.log(
        "formatted Date",
        this._dateAdapter.format(this.today, "DD-MM-YYYY")
      );
      console.log(this.today);
    });
  }

  changesToDate() {
    console.log(this.appSrv.data1);
    this.appSrv.data1.subscribe((res) => {
      console.log(res);
      this.dtype = res;
    });
    if (this.toDate !== null) {
      if (this.toDate["calendarName"] !== this.dtype) {
        this.toDate = this.commonValid.dateFormate(this.toDate, this.dtype);
      }
    }
  }

  changesFromDate() {
    console.log(this.appSrv.data1);
    this.appSrv.data1.subscribe((res) => {
      console.log(res);
      this.dtype = res;
    });
    if (this.fromDate !== null) {
      if (this.fromDate["calendarName"] !== this.dtype) {
        this.fromDate = this.commonValid.dateFormate(this.fromDate, this.dtype);
      }
    }
  }

  toggle() {
    this.dir = this.dir === "ltr" ? "rtl" : "ltr";
  }
}
