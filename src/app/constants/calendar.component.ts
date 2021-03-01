import { Component, OnInit, Host, Inject } from "@angular/core";
import {
  MatCalendar,
  MatDatepickerContent,
} from "@angular/material/datepicker";
import { JDNConvertibleCalendar } from "jdnconvertiblecalendar";
import { DateAdapter } from "@angular/material/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JDNConvertibleCalendarDateAdapter } from "jdnconvertiblecalendardateadapter";
import { AppService } from "../app.service";
import { DatepickerUtilitiesService } from '../shared/services/datepicker-utilities.service';

@Component({
  selector: "app-calendar-header",
  template: `
    <mat-select
      placeholder="Calendar Format"
      [formControl]="form.controls['calendar']"
      style="background: #2fbb85;
      color: white;
      padding: 10px;
      text-align:end
      "
      [style.direction]="langs === 'ar' ? 'ltr' : 'rtl'"
    >
      <mat-option *ngFor="let cal of calendarFormatsList" [value]="cal.type">
        {{ cal.label }}
      </mat-option>
    </mat-select>
    <mat-calendar-header></mat-calendar-header>
  `,
  styleUrls: [],
})
export class CalendarComponent<D> implements OnInit {
  datz = [];
  calendarFormatsbyLocale = {
    en: [
      { label: "Gregorian", type: "Gregorian" },
      { label: "Hijri", type: "Islamic" },
    ],
    ar: [
      { label: "ميلادي", type: "Gregorian" },
      { label: "هجري", type: "Islamic" },
    ],
  };
  calendarFormatsList = [];
  langs: string;
  constructor(
    @Host() private _calendar: MatCalendar<JDNConvertibleCalendar>,
    private _dateAdapter: DateAdapter<JDNConvertibleCalendar>,
    private _datepickerContent: MatDatepickerContent<JDNConvertibleCalendar>,
    public appSrv: AppService,
    @Inject(FormBuilder) private fb: FormBuilder,
    private dpuService: DatepickerUtilitiesService
  ) {
    this.langs = localStorage.getItem("lang") || "en";
    let lang = localStorage.getItem("lang") || "en";
    this.calendarFormatsList = this.calendarFormatsbyLocale[lang];
    if (lang === "ar") {
      this._dateAdapter.setLocale("ar");
    }
  }

  form: FormGroup;

  supportedCalendarFormats = JDNConvertibleCalendar.supportedCalendars;

  activeFormat;

  ngOnInit() {
    this.activeFormat = "Islamic";
    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      this.activeFormat = this._dateAdapter.activeCalendar;
    }

    console.log("lan", this.supportedCalendarFormats);
    // build a form for the calendar format selection
    this.form = this.fb.group({
      calendar: [this.activeFormat, Validators.required],
    });

    // update the selected calendar format
    this.form.valueChanges.subscribe((data) => {
      console.log("valueChanges");
      this.convertCalendar(data.calendar);
    });

    //commented  by praveen kumar on 31-JAN-2020
    //  setTimeout(() => {
    //   console.log("hi")
    //   this.form.patchValue({'calendar':this._calendar.activeDate.calendarName})
    // }, 200);

    //added by praveen kumar on 21-JAN-2020
    this.dpuService.datepickerChanged(this.activeFormat);
  }

  /**
   * Converts the date in the current format into the target format.
   *
   * @param {"Gregorian" | "Julian"} calendar the target calendar format.
   */
  convertCalendar(calendar: "Gregorian" | "Julian" | "Islamic") {
    console.log("Calendar Header Component convertCalendar()");
    console.log("Calendar Type", calendar);
    console.log("before conversion", this._calendar.activeDate);
    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      const convertedDate = this._dateAdapter.convertCalendar(
        this._calendar.activeDate,
        calendar
      );
      console.log("after conversion", convertedDate);
      this._calendar.activeDate = convertedDate;
      this._datepickerContent.datepicker.select(convertedDate);
      //console.log("dateaft", this._calendar);
      this._calendar.updateTodaysDate();
      this.appSrv.updatedDataSelection1(calendar);
      this.dpuService.datepickerChanged(calendar);
    }
  }
}
