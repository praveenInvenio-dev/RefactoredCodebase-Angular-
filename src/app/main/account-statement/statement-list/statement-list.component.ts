import { TitleCasePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import * as moment from "moment";
import { map } from "rxjs/operators";
import { AccountStatementService } from "src/app/services/account-statement.service";
import { StatementListConstants } from "../account-statement.constants";
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";
import { StatementListDataSource } from "./statement-list-table.datasource";

@Component({
  selector: "app-statement-list",
  templateUrl: "./statement-list.component.html",
  styleUrls: [
    "./statement-list.component.css",
    "../account-statement.component.css",
  ],
})
export class StatementListComponent implements OnInit {
  lang: string;
  commonData: any = {};
  data: any = {
    tableOtherData: {
      totalCredit: 0,
      totalDebit: 0,
      closingBalance: 0,
      openingBalance: 0,
    },
  };
  dataLength: number = 0;
  translation: any = {};

  aggregate_values: {
    totalCredit: number;
    totalDebit: number;
    total: number;
  } = {
    totalCredit: 0,
    totalDebit: 0,
    total: 0,
  };
  selectedPage: string;
  private statementFilterId: string;

  searchBox = new FormControl();

  statementDataSource: StatementListDataSource;

  constructor(
    private dialog: MatDialog,
    private accStatementService: AccountStatementService,
    public constInfo: StatementListConstants,
    private sanitizer: DomSanitizer,
    private titlecasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.lang = this.accStatementService.lang;
    moment.locale(this.lang);
    this.commonData = this.constInfo.CommonData[this.lang];
    this.translation = this.constInfo.translation[this.lang];

    this.statementDataSource = new StatementListDataSource(
      [],
      this.data.tableOtherData,
      this.accStatementService.filterInfo
    );
    this.accStatementService.ready().then(() => {
      this.accStatementService.getTransactionTypes().subscribe(
        (data) => {
          console.log("[ACC] Transaction types", data);
          this.data.filters = [];
          for (let info of data.d.results) {
            this.data.filters.push({
              id: info.StatementFilter,
              name: info.Txt30,
              txn_group: this.accStatementService.selectedTaxType,
            });
          }
          // TODO: Verify if this is the default value that should be selected always.
          if (!this.accStatementService.filterInfo.type) {
            this.accStatementService.filterInfo.type = this.data.filters.filter(
              (info) => this.isIdAllTransactions(info.id)
            )[0];
          }
          this.onSelectPageClick(
            this.accStatementService.filterInfo.type.id,
            false
          );
        },
        (err) => {
          console.error(err);
        }
      );
    });
  }

  gotoCategoryPage() {
    this.accStatementService.gotoStep(1);
  }

  get selectedCategory() {
    return this.accStatementService.selectedTaxType;
  }

  get subTaxTypeName() {
    return (
      this.accStatementService.filterInfo &&
      this.accStatementService.filterInfo.type &&
      this.accStatementService.filterInfo.type.name
    );
  }

  isAmountSurplus(value, attr) {
    return attr === "amount" && value >= 0;
  }

  getClassForRows(row, attr) {
    switch (attr) {
      case "amount":
        return this.isAmountSurplus(row[attr], attr) ? "acc-surplus-text" : "";
      case "balance":
      case "fb_number":
        return "";
      default:
        return "acc-statement-table-inner-cell";
    }
  }

  getAmountString(amount: number) {
    return this.accStatementService.getAmountString(amount);
  }

  private getNumericalValueForTable(amount: number) {
    if (this.lang === "en")
      return this.getAmountString(amount) + " " + this.translation.sar;

    return this.sanitizer.bypassSecurityTrustHtml(
      `<span style="direction: ltr;unicode-bidi: bidi-override; margin-left: 5px">
        ${this.getAmountString(amount)} 
      </span>` +
        " " +
        this.translation.sar
    );
  }

  getStatusHtml(info: { status: string; _raw: { Status: string } }) {
    let status_class = this.getStatusPillClass(info._raw.Status);
    return (
      "<span " +
      `class='d-flex acc-detail-status-pill ${status_class}' ` +
      "style='margin-top: 8px'> " +
      info.status +
      " </span>"
    );
  }

  getRowContent(row, attr) {
    switch (attr) {
      case "amount":
      case "balance":
        return this.getNumericalValueForTable(row[attr]);
      case "status":
        return this.getStatusHtml(row);
      default:
        return row[attr];
    }
  }

  getHeaderIds() {
    return this.constInfo.tableInfo.headers.map((item) => item.id);
  }

  getStatementList(item) {
    let fiscalYear = this.accStatementService.filterInfo.fiscalYear || null;
    this.accStatementService
      .getStatement(item.txn_group, this.statementFilterId, fiscalYear)
      .pipe(
        map((response: any) => {
          const placeholderPattern = "########";
          response.d.StatmenetLineItemsSet.results = response.d.StatmenetLineItemsSet.results.map(
            (item: any) => {
              let description = item.Desc.replace("VAT", placeholderPattern);
              item.Desc = this.titlecasePipe
                .transform(description)
                .replace(placeholderPattern, "VAT");
              item.StatusDesc = this.titlecasePipe.transform(item.StatusDesc);

              return item;
            }
          );
          return response;
        })
      )
      .subscribe(
        (responseData: any) => {
          // console.log("[Acc] Got statement list", responseData);
          // TODO: The attribute StatmenetLineItemsSet spelling is incorrect
          const results = responseData.d.StatmenetLineItemsSet.results;
          let balance = parseFloat(responseData.d.Open);
          this.data.tableOtherData = {
            closingBalance: parseFloat(responseData.d.Close),
            totalCredit: parseFloat(responseData.d.Credit),
            totalDebit: parseFloat(responseData.d.Debit),
            openingBalance: parseFloat(responseData.d.Open),
          };
          this.data.listInfo = results.map((info, index) => {
            balance += parseFloat(info.Betrh);
            return {
              id: index,
              desc: info.Desc,
              sadad_number: info.Vtre2,
              amount: parseFloat(info.Betrh),
              balance: balance,
              txn_date: moment(+info.Bldat.match(/\d+/)[0]),
              taxable_period: info.PeriodTxt,
              due_date: moment(+info.Bldat2.match(/\d+/)[0]),
              status: info.StatusDesc,
              fb_number: info.Fbnum,
              _raw: info,
            };
          });
          if (this.isStaementWithoutFilterAvailable) this.searchBox.enable();
          else this.searchBox.disable();
          this.populateDataInTable();
        },
        (err) => {
          console.error(err);
        }
      );
  }

  goToPage(pageIndex: number) {
    this.accStatementService.filterInfo.page = pageIndex;
    this.populateDataInTable();
  }

  get currentPageNumber() {
    return this.accStatementService.filterInfo.page || 0;
  }

  get totalPages() {
    return this.statementDataSource.getPages;
  }

  get isStaementWithoutFilterAvailable() {
    return this.data.listInfo && this.data.listInfo.length > 0;
  }

  private populateDataInTable() {
    this.statementDataSource = new StatementListDataSource(
      this.data.listInfo,
      this.data.tableOtherData,
      this.accStatementService.filterInfo,
      this.searchBox.value
    );
    this.statementDataSource.connect().subscribe(() => {
      this.dataLength = this.statementDataSource.length;
      this.aggregate_values = this.statementDataSource.aggregate_values;
    });
  }

  isNoStatementFound() {
    return this.dataLength === 0;
  }

  private isIdAllTransactions(id: string) {
    return this.constInfo.ALL_TRANSACTION_TYPE_IDS.indexOf(id) >= 0;
  }

  onSelectPageClick(filterItemId, resetPage: boolean = true) {
    this.selectedPage = this.isIdAllTransactions(filterItemId) ? "All" : "";
    if (resetPage) this.accStatementService.filterInfo.page = 0;
    this.statementFilterId = filterItemId;
    this.data.filters.map((item) => {
      item.active = filterItemId === item.id;
      if (item.active) {
        this.accStatementService.filterInfo.type = item;
        this.accStatementService
          .getFiscalYearList(item.txn_group, item.id)
          .subscribe((data: { year: string; _raw: any }[]) => {
            if (this.accStatementService.fiscalYearInfo.taxTypeId !== item.id) {
              this.accStatementService.filterInfo.fiscalYear = null;
            }
            this.accStatementService.fiscalYearInfo = {
              taxTypeId: item.id,
              data: data,
            };
            this.getStatementList(item);
          });
      }
      return item;
    });
  }

  onFilterClick() {
    this.dialog
      .open(DialogBoxComponent, {
        data: {
          lang: this.lang,
          filterTypeList: this.data.filters.map((x) => ({ ...x })),
          direction: this.commonData.direction,
          filterInfo: this.accStatementService.filterInfo,
          fiscalYearList: this.accStatementService.fiscalYearInfo.data,
          page: "filter",
        },
        width: "667px",
        panelClass: "acc-dialog-container",
      })
      .afterClosed()
      .subscribe((result) => {
        // console.log("Filter information", result);
        if (!result || result.handleData === false) return;

        this.accStatementService.filterInfo.page = 0;
        this.accStatementService.filterInfo.type = result.type;
        this.accStatementService.filterInfo.amount = {
          min: result.amount.min.value,
          max: result.amount.max.value,
        };
        this.accStatementService.filterInfo.txn_date = {
          min: result.txn_date.min.value,
          max: result.txn_date.max.value,
        };
        this.accStatementService.filterInfo.fiscalYear = result.fiscalYear;
        this.onSelectPageClick(result.type.id);
      });
  }

  onDownloadClick() {
    this.dialog.open(DialogBoxComponent, {
      data: {
        direction: this.commonData.direction,
        selectedFilter: this.data.filters.filter((x) => x.active)[0],
        tableData: this.statementDataSource.filteredData,
        lang: this.lang,
        listInfo: [...this.data.listInfo],
        otherData: { ...this.data.tableOtherData },
        fiscalYearList: this.accStatementService.fiscalYearInfo.data,
        page: "download",
      },
      width: "667px",
      // height: "456px",
      
      panelClass: "acc-dialog-container",
    });
  }

  onStatementClick(info: any) {
    this.accStatementService.statementDetailData = {
      direction: this.commonData.direction,
      selectedInfo: info,
      lang: this.lang,
    };
    window.scroll({ top: 0, left: 0 });
    this.accStatementService.gotoStep(3);
  }

  onSearch() {
    this.populateDataInTable();
  }

  getStatusPillClass(status: string) {
    return this.accStatementService.getStatusStylingClass(status);
  }
}
