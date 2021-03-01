import { Component, OnInit } from "@angular/core";
import { Moment } from "moment";
import { AccountStatementService } from "src/app/services/account-statement.service";
import { StatementListConstants } from "../account-statement.constants";

@Component({
  selector: "app-statement-detail",
  templateUrl: "./statement-detail.component.html",
  styleUrls: [
    "./statement-detail.component.css",
    "../account-statement.component.css",
  ],
})
export class StatementDetailComponent implements OnInit {
  data: any = {};
  selectedInfo: any = {};
  translation: any = {};

  constructor(
    private constData: StatementListConstants,
    private accStatementService: AccountStatementService
  ) {}

  ngOnInit(): void {
    this.data = this.accStatementService.statementDetailData;
    this.translation = this.constData.translation[
      this.accStatementService.statementDetailData.lang
    ];
    this.selectedInfo = this.data.selectedInfo;
  }

  get selectedCategory() {
    return this.accStatementService.selectedTaxType;
  }

  get subTaxTypeName() {
    return this.accStatementService.filterInfo.type.name;
  }

  gotoListPage() {
    this.accStatementService.gotoStep(2);
  }

  gotoCategoryPage() {
    this.accStatementService.gotoStep(1);
  }

  getDateFormat(dt: Moment) {
    return dt.format("Do MMM YYYY");
  }

  getAmountString(amount: number) {
    return this.accStatementService.getAmountString(amount);
  }

  getStatusPillClass(status: string) {
    return this.accStatementService.getStatusStylingClass(status);
  }
}
