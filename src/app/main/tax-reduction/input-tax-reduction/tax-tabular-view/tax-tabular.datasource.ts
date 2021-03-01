import { DataSource } from "@angular/cdk/table";
import { Observable, of as observableOf } from "rxjs";
import { map } from "rxjs/operators";

export class TaxTabularDataSource extends DataSource<any> {
  public filteredData = [];

  constructor(private data: any[], private filter: any = {}) {
    super();
  }

  connect(): Observable<any> {
    return observableOf(this.filteredData).pipe(
      map(() => {
        return this.getFilteredData();
      })
    );
  }

  getFilteredData() {
    this.filteredData = [...this.data];
    return this.filteredData;
  }

  get length() {
    return this.filteredData.length;
  }

  disconnect() {}
}
