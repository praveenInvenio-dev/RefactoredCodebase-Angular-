import { constants } from "./constants.model";
import { Injectable } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import {
  JDNConvertibleCalendar,
  GregorianCalendarDate,
  JDNPeriod,
} from "jdnconvertiblecalendar";
import { JDNConvertibleCalendarDateAdapter } from "jdnconvertiblecalendardateadapter";

@Injectable({
  providedIn: "root",
})
export class CommonValidation {
  vatErr;
  errorMsg;
  dir: any;
  constructor(private _dateAdapter: DateAdapter<JDNConvertibleCalendar>) {
    if (localStorage.getItem("lang") === "ar") {
      this.dir = constants.langz.arb.dir;
      this.vatErr = constants.langz.arb.vatError;
      this.errorMsg = constants.langz.arb.errorMsgs;
    } else {
      this.dir = constants.langz.eng.dir;
      this.vatErr = constants.langz.eng.vatError;
      this.errorMsg = constants.langz.eng.errorMsgs;
    }
  }
  getDateFormated(value) {
    let val = value.substring(value.indexOf("(") + 1);
    val = val.substring(0, val.indexOf(")"));
    return new Date(parseInt(val));
  }

  IDtypeValidation(type, id) {
    // let type = this.vatSecondFormGroup.value.type;
    // let id = this.vatSecondFormGroup.value.idNumber;
    let obj = {
      flag: false,
      msg: "",
    };
    let first = id.substr(0, 1);
    if (type === "ZS0001") {
      if (first === "1") {
        if (id.length === 10) {
          if (this.isNumber(id)) {
            obj.flag = false;
            obj.msg = "";
            return obj;
          } else {
            obj.flag = true;
            obj.msg = this.errorMsg.idErr1; // "ID Number Should be numeric";
            return obj;
          }
        } else {
          obj.flag = true;
          obj.msg = this.errorMsg.idLen; // "ID Number Should contain 10 digits";
          return obj;
        }
      } else {
        obj.flag = true;
        obj.msg = this.vatErr.e14;
        return obj;
      }
    }

    if (type === "ZS0002") {
      if (first === "2") {
        if (id.length === 10) {
          if (this.isNumber(id)) {
            obj.flag = false;
            obj.msg = "";
            return obj;
          } else {
            obj.flag = true;
            obj.msg = this.errorMsg.idErr1; // "ID Number Should be numeric";
            return obj;
          }
        } else {
          obj.flag = true;
          obj.msg = this.errorMsg.idLen; // "ID Number Should contain 10 digits";
          return obj;
        }
      } else {
        obj.flag = true;
        obj.msg = this.vatErr.e15;
        return obj;
      }
    }
    if (type === "ZS0005") {
      if (first != 7) {
        obj.flag = true;
        obj.msg = this.vatErr.e23;
        return obj;
      } else {
        if (id.length != 10) {
          obj.flag = true;
          obj.msg = this.errorMsg.idLen;
          return obj;
        } else {
          obj.flag = false;
          obj.msg = "";
          return obj;
        }
      }
    }
  }

  isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

  isAlphanumeric(n) {
    return /[`!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/.test(n);
  }

  isAlphanumerics(n) {
    return /^(?=.*?[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFA-Za-z])[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFA-Za-z0-9_ -]+$/.test(
      n
    );
  }

  isAlphabet(n) {
    return /^[A-Za-z ]+$/.test(n);
  }

  isArabic(n) {
    return /^[a-zA-Z\u0600-\u06FF ][\sa-zA-Z\u0600-\u06FF ]*$/.test(n);
  }

  isEmailValid(n) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n);
  }

  validateibn(value) {
    let obj = {
      flag: false,
      msg: "",
    };
    let first = value.substr(0, 2);
    let sec = value.substr(2);
    if (first === "SA") {
      if (sec.length == 22) {
        if (this.isNumber(sec)) {
          obj.flag = false;
          obj.msg = "";
          return obj;
        } else {
          obj.flag = true;
          obj.msg = this.vatErr.e17; // "IBAN should start with ‘SA’ and followed by 22 numeric values only";
          return obj;
        }
      } else if (sec.length > 0 && !this.isNumber(sec)) {
        obj.flag = true;
        obj.msg = this.vatErr.e17; // "IBAN should start with ‘SA’ and followed by 22 numeric values only";
        return obj;
      } else {
        obj.flag = true;
        obj.msg = "";
        return obj;
      }
    } else {
      obj.flag = true;
      obj.msg = this.vatErr.e17; // "IBAN should start with ‘SA’ and followed by 22 numeric values only";
      return obj;
    }
  }

  validateibn2(value) {
    let obj = {
      flag: false,
      msg: "",
    };
    if (value.length == 22) {
      if (this.isNumber(value)) {
        obj.flag = false;
        obj.msg = "";
        return obj;
      } else {
        obj.flag = true;
        obj.msg = this.vatErr.e17; // "IBAN should start with ‘SA’ and followed by 22 numeric values only";
        return obj;
      }
    } else if (value.length > 0 && !this.isNumber(value)) {
      obj.flag = true;
      obj.msg = this.vatErr.e17; // "IBAN should start with ‘SA’ and followed by 22 numeric values only";
      return obj;
    } else {
      obj.flag = true;
      obj.msg = "";
      return obj;
    }
  }

  changeDate(d) {
    // d.day < 10 ? (d.day = "0" + d.day) : d.day;
    // d.month < 10 ? (d.month = "0" + d.month) : d.month;
    // To BE passed as YYYY-MM-DDT00:00:00 to get response from OTP API
    return d.year + "-" + d.month + "-" + d.day + "T00:00:00";
  }

  changedate(d) {
    d.day < 10
      ? (d.day = d.day.toString().length == 1 ? "0" + d.day : d.day)
      : d.day;
    d.month < 10
      ? (d.month = d.month.toString().length == 1 ? "0" + d.month : d.month)
      : d.month;
    return (
      "/Date(" + new Date(d.month + "-" + d.day + "-" + d.year).getTime() + ")/"
    );
  }

  validateDate(d1, d2) {
    if (
      new Date(
        d1["calendarStart"].year +
        "-" +
        d1["calendarStart"].month +
        "-" +
        d1["calendarStart"].day
      ) >
      new Date(
        d2["calendarStart"].year +
        "-" +
        d2["calendarStart"].month +
        "-" +
        d2["calendarStart"].day
      )
    )
      return false;
    else return true;
  }

  changedates(d) {
    d.day < 10
      ? (d.day = d.day.toString().length == 1 ? "0" + d.day : d.day)
      : d.day;
    d.month < 10
      ? (d.month = d.month.toString().length == 1 ? "0" + d.month : d.month)
      : d.month;
    return d.year + "/" + d.month + "/" + d.day;
  }

  changeDate1(d) {    
    let dt=JSON.parse(JSON.stringify(d));
    if (dt["calendarName"] != "Gregorian") {
      dt = this.dateFormate(dt, "Gregorian");
    }
    dt = dt["calendarStart"];
    dt.day < 10
      ? (dt.day = dt.day.toString().length == 1 ? "0" + dt.day : dt.day)
      : dt.day;
    dt.month < 10
      ? (dt.month = dt.month.toString().length == 1 ? "0" + dt.month : dt.month)
      : dt.month;
    // To BE passed as YYYY-MM-DDT00:00:00 to get response from OTP API
    dt.month + "-" + dt.day + "-" + dt.year;
    return (
      "/Date(" + new Date(dt.month + "-" + dt.day + "-" + dt.year).getTime() + ")/"
    );


    //return "/Date(" + new Date().getTime() + ")/"
  }

  changeDate2(d) {
    if (d["calendarName"] != "Gregorian") {
      d = this.dateFormate(d, "Gregorian");
    }
    d = d["calendarStart"];
    d.day < 10
      ? (d.day = d.day.toString().length == 1 ? "0" + d.day : d.day)
      : d.day;
    d.month < 10
      ? (d.month = d.month.toString().length == 1 ? "0" + d.month : d.month)
      : d.month;
    // To BE passed as YYYY-MM-DDT00:00:00 to get response from OTP API
    d.month + "-" + d.day + "-" + d.year;
    return d.year + "-" + d.month + "-" + d.day;
  }

  changeDate3(d) {
    if (d["calendarName"] != "Gregorian") {
      d = this.dateFormate(d, "Gregorian");
    }
    d = d["calendarStart"];
    d.day < 10
      ? (d.day = d.day.toString().length == 1 ? "0" + d.day : d.day)
      : d.day;
    d.month < 10
      ? (d.month = d.month.toString().length == 1 ? "0" + d.month : d.month)
      : d.month;
    // To BE passed as YYYY-MM-DDT00:00:00 to get response from OTP API
    d.month + "-" + d.day + "-" + d.year;
    if (localStorage.getItem("lang") === "ar") {
      return d.year + "/" + d.month + "/" + d.day;
    }
    return d.day + "/" + d.month + "/" + d.year;
  }


  changeDate4(d) {
    if (d["calendarName"] != "Gregorian") {
      d = this.dateFormate(d, "Hijri");
    }
    d = d["calendarStart"];
    d.day < 10
      ? (d.day = d.day.toString().length == 1 ? "0" + d.day : d.day)
      : d.day;
    d.month < 10
      ? (d.month = d.month.toString().length == 1 ? "0" + d.month : d.month)
      : d.month;
    // To BE passed as YYYY-MM-DDT00:00:00 to get response from OTP API
    d.month + "-" + d.day + "-" + d.year;
    return d.year + "-" + d.month + "-" + d.day;
  }

  changeDate5(d) {
    if (d["calendarName"] != "Gregorian") {
      d = this.dateFormate(d, "Hijri");
    }
    d = d["calendarStart"];
    d.day < 10
      ? (d.day = d.day.toString().length == 1 ? "0" + d.day : d.day)
      : d.day;
    d.month < 10
      ? (d.month = d.month.toString().length == 1 ? "0" + d.month : d.month)
      : d.month;
    // To BE passed as YYYY-MM-DDT00:00:00 to get response from OTP API
    d.month + "-" + d.day + "-" + d.year;
    return d.day + "/" + d.month + "/" + d.year;
  }
  changeDate6(d) {
    if (d["calendarName"] != "Gregorian") {
      d = this.dateFormate(d, "Hijri");
    }
    d = d["calendarStart"];
    d.day < 10
      ? (d.day = d.day.toString().length == 1 ? "0" + d.day : d.day)
      : d.day;
    d.month < 10
      ? (d.month = d.month.toString().length == 1 ? "0" + d.month : d.month)
      : d.month;
    // To BE passed as YYYY-MM-DDT00:00:00 to get response from OTP API
    d.month + "-" + d.day + "-" + d.year;
    return d.day + "-" + d.month + "-" + d.year;
  }
  dateFormate(date, calendar) {
    console.log("sdas", date);
    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      const convertedDate = this._dateAdapter.convertCalendar(date, calendar);
      return convertedDate;
    }
    // const a = Math.round(this.toJulianDate(date));
    // if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
    //   const convertedDate = this._dateAdapter.convertCalendar(new GregorianCalendarDate(new JDNPeriod(a, a)), calendar);
    //   return convertedDate;
    // }
  }

  toJulianDate(date) {
    var floor = Math.floor;
    var y = date.getUTCFullYear();
    var m = date.getUTCMonth() + 1;
    var d = date.getUTCDate() + (date % 8.64e7) / 8.64e7;

    if (m < 3) {
      y -= 1;
      m += 12;
    }

    var a = floor(y / 100);
    var b = date < new Date(Date.UTC(1582, 9, 15)) ? 0 : 2 - a + floor(a / 4);
    var c = floor(y < 0 ? 365.25 * y - 0.75 : 365.25 * y);
    var e = floor(30.6001 * (m + 1));

    //return b + c + d + e + 1720994.5;
    const res = Math.round(b + c + d + e + 1720994.5);
    return new GregorianCalendarDate(new JDNPeriod(res, res));
  }

  toJulianDate1(date) {
    var floor = Math.floor;
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate() + (date % 8.64e7) / 8.64e7;

    if (m < 3) {
      y -= 1;
      m += 12;
    }

    var a = floor(y / 100);
    var b = date < new Date(Date.UTC(1582, 9, 15)) ? 0 : 2 - a + floor(a / 4);
    var c = floor(y < 0 ? 365.25 * y - 0.75 : 365.25 * y);
    var e = floor(30.6001 * (m + 1));

    //return b + c + d + e + 1720994.5;
    const res = Math.round(b + c + d + e + 1720994.5);
    return new GregorianCalendarDate(new JDNPeriod(res, res));
  }

  convertDateToStandard(value) {
    let val = value.substring(value.indexOf("(") + 1);
    val = val.substring(0, val.indexOf(")"));
    const date = new Date(parseInt(val));
    const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
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
}
