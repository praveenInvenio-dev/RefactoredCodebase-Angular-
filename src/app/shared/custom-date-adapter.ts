import { Injectable } from '@angular/core';
import { JDNConvertibleCalendarNames } from 'jdnconvertiblecalendar';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';

@Injectable()
export class CustomDateAdapter extends JDNConvertibleCalendarDateAdapter {
  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (this.activeCalendar === 'Julian' || this.activeCalendar === 'Gregorian') {
      if (this.locale == 'ar') {
        return [
          'يناير',//january
          'فبراير',
          'مارس',
          'أبريل',
          'مايو',
          'يونيو',
          'يوليو',
          'أغسطس',
          'سبتمبر',
          'أكتوبر',//october
          'نوفمبر',//november
          'ديسمبر'
        ];
      } else {
        return JDNConvertibleCalendarNames.getMonthNames('Gregorian', this.locale, style);
      }
    } else if (this.activeCalendar === 'Islamic') {
      if (this.locale == 'en') {
        return ["Muharram", "Safar", "Rabi Al-Awal", "Rabi Al-Thani", "Jumada Al-Awal", "Jumada Al-Thani", "Rajab", "Shaban", "Ramadan", "Shawwal", "Dhul Qadah", "Dhul Hijjah"];
        //return ["Muharram", "Ṣafar", "Rabīʿ I", "Rabīʿ II", "Jumādā I", "Jumādā II", "Rajab", "Shaʿbān", "Ramaḍān", "Shawwāl", "Dhūʿl-Qiʿdah", "Dhūʿl-Ḥijjah"];
      } else {
        // return JDNConvertibleCalendarNames.getMonthNames('Islamic', this.locale, style);
        //starting month right to left
        return ["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"];
      }
    }
  }

  getDateNames(): string[] {
    // TODO: implement this properly, taking calendar and locale into account
    const dateNames: string[] = [];
    for (let i = 1; i <= 31; i++) {
      dateNames.push(String(i));
    }

    return dateNames;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {

    if (this.activeCalendar === 'Julian' || this.activeCalendar === 'Gregorian') {
      if (this.locale == 'ar') {
        let weekdaysLong = 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_');
        let weekdaysShort = 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_');
        let weekdaysNarrow = 'ح_ن_ث_ر_خ_ج_س'.split('_');
        return weekdaysLong;
      } else {
        return JDNConvertibleCalendarNames.getWeekdayNames('Gregorian', this.locale, 'short');
      }
    } else if (this.activeCalendar === 'Islamic') {


      if (this.locale == 'en') {
        // return ["Aḥad", "Ithnayn", "Thulāthāʾ", "Arbiʿāʾ", "Khamīs", "Jumʿah", "Sabt"];
        return JDNConvertibleCalendarNames.getWeekdayNames('Gregorian', this.locale, "short");
      } else {
        return JDNConvertibleCalendarNames.getWeekdayNames('Islamic', this.locale, style);
      }
    }

  }

  // getFirstDayOfWeek(): number {
  //   return 1;
  // }

  // getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {

  //   if (this.activeCalendar === 'Julian' || this.activeCalendar === 'Gregorian') {
  //     return JDNConvertibleCalendarNames.getWeekdayNames('Gregorian', this.locale, style);
  //   } else if (this.activeCalendar === 'Islamic') {
  //     return JDNConvertibleCalendarNames.getWeekdayNames('Islamic', this.locale, style);
  //   }
  // }
}