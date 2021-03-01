import { Component, OnInit } from "@angular/core";
import { AccountStatementService } from "src/app/services/account-statement.service";
import { StatementListConstants } from "../account-statement.constants";

@Component({
  selector: "app-statement-category",
  templateUrl: "./statement-category.component.html",
  styleUrls: [
    "./statement-category.component.css",
    "../account-statement.component.css",
  ],
})
export class StatementCategoryComponent implements OnInit {
  data: any;
  translation: any;

  constructor(
    private constData: StatementListConstants,
    private accStatementService: AccountStatementService
  ) {}

  ngOnInit(): void {
    this.translation = this.constData.translation[
      this.accStatementService.lang
    ];
  }

  private gotoListPage() {
    this.accStatementService.filterInfo = {};
    this.accStatementService.gotoStep(2);
  }

  get direction() {
    return this.accStatementService.lang.toLowerCase() === "en" ? "ltr" : "rtl";
  }

  get currentTaxType() {
    return this.accStatementService.selectedTaxType;
  }

  gotoDirectTax() {
    this.accStatementService.selectedTaxType = "D";
    this.gotoListPage();
  }

  gotoIndirectTax() {
    this.accStatementService.selectedTaxType = "I";
    this.gotoListPage();
  }
}
