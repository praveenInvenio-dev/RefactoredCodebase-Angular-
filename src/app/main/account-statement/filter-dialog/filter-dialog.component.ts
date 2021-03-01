import { Component, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { CalendarDate, JDNConvertibleCalendar } from "jdnconvertiblecalendar";
import { JDNConvertibleCalendarDateAdapter } from "jdnconvertiblecalendardateadapter";
import { Subject } from "rxjs";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { AccountStatementService } from "src/app/services/account-statement.service";
import { FilterDialogConstants } from "../account-statement.constants";
import * as moment from "moment";
import { NotifierService } from "angular-notifier";
import { toHijri } from "hijri-converter";
import { MatDatepicker } from "@angular/material/datepicker";

@Component({
  selector: "app-filter-dialog",
  templateUrl: "./filter-dialog.component.html",
  styleUrls: [
    "./filter-dialog.component.css",
    "../account-statement.component.css",
  ],
})
export class FilterDialogComponent implements OnInit {
  @Input() data: any;
  @Input() output: Subject<any>;
  @Output() close = new Subject<void>();

  translation: any = {};

  amountTextFields = {
    min: new FormControl(),
    max: new FormControl(),
  };

  finalOutputData = {
    type: null,
    amount: {
      min: new FormControl(),
      max: new FormControl(),
    },
    txn_date: {
      min: new FormControl(),
      max: new FormControl(),
    },
    fiscalYear: null,
  };
  maxDate: Date;

  constructor(
    private constData: FilterDialogConstants,
    private _dateAdapter: DateAdapter<JDNConvertibleCalendar>,
    private accService: AccountStatementService,
    private notifierService: NotifierService
  ) {}

  calendarComponent = CalendarComponent;

  ngOnInit(): void {
    this.translation = this.constData.translation[this.data.lang];
    this.setDefaultFilters();
    this.output.next(this.finalOutputData);
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

  private setDefaultFilters() {
    this.data.filterTypeList.map((item) => {
      if (item.active) this.finalOutputData.type = item;
    });

    this.finalOutputData.amount.min.setValue(
      this.data.filterInfo.amount && this.data.filterInfo.amount.min
    );
    this.onAmountChange("min", "str");

    this.finalOutputData.amount.max.setValue(
      this.data.filterInfo.amount && this.data.filterInfo.amount.max
    );
    this.onAmountChange("max", "str");

    this.finalOutputData.txn_date.min.setValue(
      this.data.filterInfo.txn_date && this.data.filterInfo.txn_date.min
    );
    this.finalOutputData.txn_date.max.setValue(
      this.data.filterInfo.txn_date && this.data.filterInfo.txn_date.max
    );

    this.finalOutputData.fiscalYear = this.data.filterInfo.fiscalYear;

    console.log("Default filter applied", this.finalOutputData);
  }

  getDate(target: "from" | "to") {
    let dateField = this.finalOutputData.txn_date.min;
    if (target === "to") {
      dateField = this.finalOutputData.txn_date.max;
    }
    if (!dateField.value) {
      return null;
    }
    return moment(
      new Date(
        (<CalendarDate>dateField.value.calendarStart).year,
        (<CalendarDate>dateField.value.calendarStart).month - 1,
        (<CalendarDate>dateField.value.calendarStart).day
      )
    );
  }

  isItemSelected(item) {
    return !!item.active;
  }

  get fiscalYearList() {
    return this.data.fiscalYearList;
  }

  get selectedFiscalYear() {
    return this.finalOutputData.fiscalYear || null;
  }

  onFiscalYearChange(event) {
    this.finalOutputData.fiscalYear = event.value;
    this.output.next(this.finalOutputData);
  }

  onFilterTypeClick(index: number) {
    this.data.filterTypeList.map((item, idx: number) => {
      item.active = index === idx;
      if (item.active) this.finalOutputData.type = item;
      return item;
    });
    this.output.next(this.finalOutputData);
  }

  onAmountChange(
    targetInput: "min" | "max",
    conversionTo: "str" | "float",
    event?: any
  ) {
    let sourceObject = this.amountTextFields;
    let targetObject = this.finalOutputData.amount;
    if (conversionTo === "str") {
      sourceObject = this.finalOutputData.amount;
      targetObject = this.amountTextFields;
    }
    let sourceField = sourceObject.min,
      targetField = targetObject.min;
    if (targetInput === "max") {
      sourceField = sourceObject.max;
      targetField = targetObject.max;
    }

    if (conversionTo === "str") {
      targetField.setValue(
        this.accService.getAmountString(sourceField.value || 0)
      );
    } else {
      const cursorPos = event.target.selectionEnd;
      const sourceNumericalValue =
        parseFloat((sourceField.value + "" || "0").replace(/,/g, "")) || 0;
      targetField.setValue(sourceNumericalValue);
      sourceField.setValue(
        this.accService.getAmountString(sourceNumericalValue)
      );
      event.target.selectionEnd = cursorPos;
    }
  }

  onApplyClick() {
    if (
      this.getDate("from") &&
      this.getDate("to") &&
      this.getDate("from") > this.getDate("to")
    ) {
      this.notifierService.notify(
        "error",
        this.translation.validationError.fromGreaterThanTo
      );
      return;
    }
    this.output.next(this.finalOutputData);
    this.close.next();
  }

  changesToDate(
    formInput: { min: FormControl; max: FormControl },
    origin: "from" | "to",
    datePicker: MatDatepicker<Date>
  ) {
    if (!(this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter)) {
      console.error("Date adapter is not of valid type ", this._dateAdapter);
      return;
    }

    datePicker.close();

    let minCalendarValue = formInput.min.value;
    let maxCalendarValue = formInput.max.value;

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
      formInput.max.setValue(maxCalendarValue);
    } else {
      minCalendarValue = this._dateAdapter.convertCalendar(
        minCalendarValue,
        maxCalendarValue.calendarName
      );
      formInput.min.setValue(minCalendarValue);
    }
  }
}
