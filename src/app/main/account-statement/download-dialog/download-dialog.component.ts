import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { yearsPerPage } from '@angular/material/datepicker';
import { NotifierService } from "angular-notifier";
import { toGregorian, toHijri } from "hijri-converter";
import { CalendarDate, JDNConvertibleCalendar } from "jdnconvertiblecalendar";
import { JDNConvertibleCalendarDateAdapter } from "jdnconvertiblecalendardateadapter";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { AccountStatementService } from "src/app/services/account-statement.service";
import { StatementListConstants } from "../account-statement.constants";

@Component({
  selector: "app-download-dialog",
  templateUrl: "./download-dialog.component.html",
  styleUrls: [
    "./download-dialog.component.css",
    "../account-statement.component.css",
  ],
})
export class DownloadDialogComponent implements OnInit {
  @Input() data: any;
  @Input() output: Subscription;

  fromDate = new FormControl();
  toDate = new FormControl();

  translation: any = {};
  selectedTaxType: any;
  fiscalyearList:any;
  selectedFiscalYear:any="";

  calendarComponent = CalendarComponent;

  maxDate: Date;

  constructor(
    private constData: StatementListConstants,
    private accoutStatementService: AccountStatementService,
    private _dateAdapter: DateAdapter<JDNConvertibleCalendar>,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.translation = this.constData.translation[this.data.lang];
    this.selectedTaxType = this.data.selectedFilter;
    this.fiscalyearList=this.data.fiscalYearList;
    this.setMaxDate(this.data.lang === "ar" ? "Islamic" : "Gregorian");
  }

  private setMaxDate(calendarName: "Islamic" | "Gregorian") {
    const dt = new Date();
    const convertedDt =
      calendarName === "Islamic"
        ? toHijri(dt.getFullYear(), dt.getMonth(), dt.getDate())
        : {
            hd: dt.getDate(),
            hm: dt.getMonth() + 1,
            hy: dt.getFullYear(),
          };
    this.maxDate = new Date(convertedDt.hy, convertedDt.hm - 1, convertedDt.hd);
  }

  private getRawDate(field: FormControl) {
    return {
      year: (<CalendarDate>field.value.calendarStart).year,
      month: (<CalendarDate>field.value.calendarStart).month,
      day: (<CalendarDate>field.value.calendarStart).day,
    };
  }

  private getDate(field: FormControl): moment.Moment {
    if (!field.value) {
      return null;
    }
    let dt = this.getRawDate(field);
    if (field.value.calendarName === "Islamic") {
      let convertedDate = toGregorian(dt.year, dt.month, dt.day);
      dt = {
        year: convertedDate.gy,
        month: convertedDate.gm,
        day: convertedDate.gd,
      };
    }
    return moment(new Date(dt.year, dt.month - 1, dt.day));
  }

  private getFromDate(): moment.Moment {
    return this.getDate(this.fromDate);
  }

  private getToDate(): moment.Moment {
    return this.getDate(this.toDate);
  }

  onDownloadClick(format: string = "PDF"): void {
    let fromDt = this.getFromDate();
    let toDt = this.getToDate();

	// let fiscalYear = this.accoutStatementService.filterInfo.fiscalYear || null;
	let fiscalYear = this.selectedFiscalYear|| null;
	console.log("Fiscal Year",fiscalYear);
    console.log(
      "Date range selected",
      this.getRawDate(this.fromDate),
      fromDt,
      this.getRawDate(this.toDate),
      toDt
    );
    if (
      fiscalYear &&
      (this.getRawDate(this.fromDate).year != fiscalYear ||
        this.getRawDate(this.toDate).year != fiscalYear)
    ) {
      this.notifierService.notify(
        "error",
        this.translation.validationError.invalidDateRange
      );
      return;
    }
    if (fromDt > toDt) {
      this.notifierService.notify(
        "error",
        this.translation.validationError.fromGreaterThanTo
      );
      return;
    }

    let errorMessage = "";
    if (format === "CSV")
      errorMessage = this.accoutStatementService.downloadCSVStatement(
        fromDt,
        toDt,
        this.selectedTaxType,
        {
          listInfo: this.data.listInfo,
          otherData: this.data.otherData,
        },
        fiscalYear
      );
    else
      errorMessage = this.accoutStatementService.downloadPDFStatement(
        fromDt,
        toDt,
        this.selectedTaxType,
        {
          listInfo: this.data.listInfo,
          otherData: this.data.otherData,
        },
        fiscalYear
      );
    if (errorMessage.length > 0) {
      this.notifierService.notify("error", errorMessage);
    }
  }
  onFiscalYearChange(event) {
    this.selectedFiscalYear = event.value;
    console.log("Selected Fiscal yearsPerPage", this.selectedFiscalYear)
  }

  isInfoComplete() {
    return this.getFromDate() != null && this.getToDate() != null;
  }

  onDateChange(origin: "from" | "to") {
    if (!(this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter)) {
      console.error("Date adapter is not of valid type ", this._dateAdapter);
      return;
    }
    let maxCalendarValue = this.toDate.value;
    let minCalendarValue = this.fromDate.value;

    this.setMaxDate(
      origin === "from"
        ? minCalendarValue.calendarName
        : maxCalendarValue.calendarName
    );

    if (!minCalendarValue || !maxCalendarValue) return;

    if (minCalendarValue.calendarName === maxCalendarValue.calendarName) return;

    if (origin === "from") {
      maxCalendarValue = this._dateAdapter.convertCalendar(
        maxCalendarValue,
        minCalendarValue.calendarName
      );
      this.toDate.setValue(maxCalendarValue);
    } else {
      minCalendarValue = this._dateAdapter.convertCalendar(
        minCalendarValue,
        maxCalendarValue.calendarName
      );
      this.fromDate.setValue(minCalendarValue);
    }
  }
}
