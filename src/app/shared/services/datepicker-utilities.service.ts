import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { CalendarDate, CalendarPeriod, GregorianCalendarDate, IslamicCalendarDate, JDNConvertibleCalendar, JDNPeriod } from 'jdnconvertiblecalendar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatepickerUtilitiesService {

  private datepickerEventsSubject = new BehaviorSubject<any>("Gregorian");
  datepickerEvents = this.datepickerEventsSubject.asObservable();
  constructor(private _dateAdapter: DateAdapter<JDNConvertibleCalendar>) { }

  getCalendarFormatDateFromAPIDate(apiDate, calendarType) {
    //converts the apiDate '/Date(timestamp)/' to Calendar Date of calendarType
    console.log("getCalendarFormatDateFromAPIDate", apiDate);

    if (!apiDate) {
      return null;
    }

    // let timeStamp = apiDate.replace(/\D/g, '');
    let timeStamp = apiDate.substring(
      apiDate.lastIndexOf("(") + 1,
      apiDate.lastIndexOf(")")
    );
    console.log("getCalendarFormatDateFromAPIDate", timeStamp, +timeStamp);
    let date = new Date(+timeStamp);
    let calendarFormatDate = this.getConvertedDate(date, calendarType);
    return calendarFormatDate;
  }
  getAPIFormatDate(date) {
    //console.log("getAPIFormatDate", date);
    if (!date) {
      return null;
    }
    let gregTimeStamp = null;
    if (date instanceof Date) {
      gregTimeStamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    } else {
      let gregDate = new GregorianCalendarDate(new JDNPeriod(date.jdnStart, date.jdnEnd));
      let dateobj = gregDate["calendarStart"];;
      gregTimeStamp = new Date(dateobj.year, dateobj.month - 1, dateobj.day).getTime();
    }
    ///console.log(gregTimeStamp, new Date(gregTimeStamp));
    return gregTimeStamp ? "/Date(" + gregTimeStamp + ")/" : null;
  }
  getConvertedDate(date, calendarType) {
    console.log("getConvertedDate", date, calendarType);
    if (!date) {
      return null;
    }
    let gregorianDate = null;
    let islamicDate = null;
    let julianDate = null;
    if (date instanceof Date) {
      //console.log("instanceof date", date);
      //gregTimeStamp = new Date(c, date.getMonth(), date.getDate()).getTime();
      let calendarDate = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
      ///julianDate = new JulianCalendarDate(new CalendarPeriod(calendarDate, calendarDate));
      console.log(calendarDate, julianDate);
      gregorianDate = new GregorianCalendarDate(new CalendarPeriod(calendarDate, calendarDate));
      // islamicDate = new IslamicCalendarDate(new JDNPeriod(gregorianDate.jdnStart, gregorianDate.jdnEnd));
      islamicDate = new IslamicCalendarDate(new CalendarPeriod(calendarDate, calendarDate));

    } else {
      gregorianDate = new GregorianCalendarDate(new JDNPeriod(date.jdnStart, date.jdnEnd));
      islamicDate = new IslamicCalendarDate(new JDNPeriod(date.jdnStart, date.jdnEnd));
    }
    console.log(date,gregorianDate, islamicDate);
    return calendarType == 'Gregorian' ? gregorianDate : calendarType == 'Islamic' ? islamicDate : null;
  }

  datepickerChanged(calendarType) {
    this.datepickerEventsSubject.next(calendarType);
  }

  updateCalendarType(formGroup: FormGroup, fields, calendarType) {
    //this method updates all date picker fields mentioned in fields in a formgroup to the calendaType.
    console.log("updateCalendarType", fields, calendarType);
    Object.keys(formGroup.controls).forEach(field => {
      //console.log("form field***", field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (fields.indexOf(field) != -1) {
          console.log("Date Field", field);
          // console.log("control value", control.value);
          if (control.value) {
            let frmtddate = this.getConvertedDate(control.value, calendarType);
            control.setValue(frmtddate);
          }
        }
      } else if (control instanceof FormGroup) {
        this.updateCalendarType(control, fields, calendarType);
      } else if (control instanceof FormArray) {
        control.value.forEach((factrl, index) => {
          // if (control.at(index) instanceof FormGroup) {
          this.updateCalendarType(<FormGroup>control.at(index), fields, calendarType);
          // }
        });
      }
    });
  }
}
