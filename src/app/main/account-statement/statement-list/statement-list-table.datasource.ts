import { DataSource } from "@angular/cdk/table";
import { CalendarDate } from "jdnconvertiblecalendar";
import * as moment from "moment";
import { Observable, of as observableOf } from "rxjs";
import { map } from "rxjs/operators";

class TableData {
  id: number;
  desc: string;
  sadad_number: string;
  amount: number;
  balance: number;
  txn_date: moment.Moment;
  taxable_period: string;
  due_date: moment.Moment;
  status: string;
  _raw: any;
}

// Source referenced from https://github.com/academind/angular-material-introduction/blob/03-data-table/src/app/data-table/data-table-datasource.ts
export class StatementListDataSource extends DataSource<any> {
  public filteredData = [];
  private onlyFilteredData = [];
  private readonly PAGE_SIZE = 5;

  constructor(
    private data: TableData[],
    private otherData: {
      totalCredit: number;
      totalDebit: number;
      closingBalance: number;
      openingBalance: number;
    },
    private filter: any,
    private searchKeyword: string = ""
  ) {
    super();
  }

  connect(): Observable<any> {
    return observableOf(this.filteredData).pipe(
      map(() => {
        return this.getFilteredData([...this.data]);
      })
    );
  }

  private getPaginatedData() {
    if (!this.filter.page) {
      this.filter.page = 0;
    }

    this.filteredData = this.onlyFilteredData.slice(
      this.filter.page * this.PAGE_SIZE,
      (this.filter.page + 1) * this.PAGE_SIZE
    );

    return this.filteredData;
  }

  private getFilteredData(data: any[]) {
    // Filter on amount
    if (this.filter.amount && this.filter.amount.min != null)
      data = data.filter((info) => info.amount >= this.filter.amount.min);
    if (this.filter.amount && this.filter.amount.max != null)
      data = data.filter((info) => info.amount <= this.filter.amount.max);

    // Filter on transaction date
    if (this.filter.txn_date && this.filter.txn_date.min != null)
      data = data.filter((info) => {
        let dt = moment(
          new Date(
            (<CalendarDate>this.filter.txn_date.min.calendarStart).year,
            (<CalendarDate>this.filter.txn_date.min.calendarStart).month - 1,
            (<CalendarDate>this.filter.txn_date.min.calendarStart).day
          )
        );
        return info.txn_date >= dt;
      });
    if (this.filter.txn_date && this.filter.txn_date.max != null)
      data = data.filter((info) => {
        let dt = moment(
          new Date(
            (<CalendarDate>this.filter.txn_date.max.calendarStart).year,
            (<CalendarDate>this.filter.txn_date.max.calendarStart).month - 1,
            (<CalendarDate>this.filter.txn_date.max.calendarStart).day
          )
        );

        return info.txn_date <= dt;
      });

    // Filter on search keyword if any
    if (this.searchKeyword) {
      data = data.filter((info: TableData) => {
        for (let attr in info) {
          if (attr.startsWith("_")) {
            continue;
          }
          if (
            // This works as long as we don't have keyword search on datetime fields (we don't have it right now in table anyway)
            info[attr].toString().toLowerCase().indexOf(this.searchKeyword) >= 0
          )
            return true;
        }
        return false;
      });
    }
    this.onlyFilteredData = [...data];

    // console.log("Filtered the data in data source", data);
    data = this.getPaginatedData();

    return data;
  }

  get getPages() {
    return Math.ceil(this.onlyFilteredData.length / this.PAGE_SIZE);
  }

  public get length(): number {
    return this.filteredData.length;
  }

  public get aggregate_values(): any {
    return {
      total: this.otherData.closingBalance,
      totalCredit: this.otherData.totalCredit,
      totalDebit: this.otherData.totalDebit,
    };
  }

  disconnect(): void {}
}
