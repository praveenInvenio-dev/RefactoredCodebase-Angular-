import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';
import { switchMap, startWith, scan, takeWhile, takeUntil, mapTo } from 'rxjs/operators';

@Component({
  selector: 'number-tracker',
  template: `
     {{ currentNumber }}
  `
})
export class NumberTrackerComponent implements OnDestroy {
  @Input()
  set end(endRange: number) {
    this._counterSub$.next(endRange);
  }
  @Input() countInterval = 20;
  public currentNumber = 0;
  private _counterSub$ = new Subject();
  private _onDestroy$ = new Subject();

  constructor() {
    this._counterSub$
      .pipe(
        switchMap(endRange => {
          return timer(0, this.countInterval).pipe(
            mapTo(this.positiveOrNegative(endRange, this.currentNumber)),
            startWith(this.currentNumber),
            scan((acc: number, curr: number) => acc + curr),
            takeWhile(this.isApproachingRange(endRange, this.currentNumber))
          )
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe((val: number) => this.currentNumber = val);
  }

  private positiveOrNegative(endRange, currentNumber) {
    return endRange > currentNumber ? 1 : -1;
  }

  private isApproachingRange(endRange, currentNumber) {
    return endRange > currentNumber
      ? val => val <= endRange
      : val => val >= endRange;
  }

  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
