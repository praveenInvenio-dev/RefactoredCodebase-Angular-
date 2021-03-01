import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DateAdapter, mixinColor } from '@angular/material/core';
// import { MatCalendar } from '@angular'
import { DaterangeValue } from '../../models/daterange-value';
import { daterangeAnimations } from '../../models/daterange.animations';
import { DaterangeComponent } from '../daterange/daterange.component';
import { Subscription } from 'rxjs/Subscription';
import { MatCalendar } from '@angular/material/datepicker';

export class DaterangeContentBase {
  constructor(public _elementRef: ElementRef) { }
}
export const _DaterangeContentMixinBase = mixinColor(DaterangeContentBase);

@Component({
  selector: 'daterange-content',
  templateUrl: './daterange-content.component.html',
  styleUrls: ['./daterange-content.component.scss'],
  host: {
    'class': 'daterange-content',
    '[@transformPanel]': '"enter"',
    // '[class.daterange-content-touch]': 'daterange.touchUi',
  },
  animations: [
    daterangeAnimations.transformPanel,
    daterangeAnimations.fadeInCalendar,
  ],
  exportAs: 'matDatepickerContent',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaterangeContentComponent<D>
  extends _DaterangeContentMixinBase
  implements AfterViewInit, OnDestroy {

  private _daterangeSelectedChangeSubscription: Subscription;

  @ViewChild('fromCalendar')
  fromCalendar: MatCalendar<D>;

  @ViewChild('toCalendar')
  toCalendar: MatCalendar<D>;

  private _daterange: DaterangeComponent<D>;
  get daterange(): DaterangeComponent<D> {
    return this._daterange;
  }
  set daterange(value: DaterangeComponent<D>) {
    if (value) {
      this._daterange = value;
      this._daterangeSelectedChangeSubscription = this._daterange._selectedChanged.subscribe((selectedValue: DaterangeValue<D>) => {
        this._onSelectedChanged(selectedValue);
      });
    }
  }

  fromDate: string;
  toDate: string;

  constructor(
    _elementRef: ElementRef,
    private _dateAdapter: DateAdapter<D>) {
    super(_elementRef);
  }

  ngAfterViewInit() {
    // this.fromCalendar._focusActiveCell();
  }

  ngOnDestroy() {
    if (this._daterangeSelectedChangeSubscription) {
      this._daterangeSelectedChangeSubscription.unsubscribe();
    }
  }

  _onSelectedChanged(value: DaterangeValue<D>): void {
    if (this._dateAdapter.compareDate(value.fromDate, value.toDate) === 0) {
      this.toCalendar._goToDateInView(value.fromDate, 'month');
    }
  }

  _select(calendar: MatCalendar<D>, event: any) {
    console.log(calendar);
    calendar.selected = event;

    this.daterange._select({
      fromDate: this.fromCalendar.selected,
      toDate: this.toCalendar.selected
    });
  }

  today() {
    const today = this._dateAdapter.today();
    this.daterange._select({
      fromDate: today,
      toDate: today
    });
  }

  apply() {

  }

  cancel() {

  }

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
    var Y = 100 * b + d - 4800 + Math.floor(f / 10)+1;

    return new Date(Y, M, D);
  }

}
