import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AccountStatementService } from "src/app/services/account-statement.service";

@Component({
  selector: "app-account-statement",
  templateUrl: "./account-statement.component.html",
  styleUrls: ["./account-statement.component.css"],
})
export class AccountStatementComponent implements OnInit, OnDestroy {
  stepNumber = 1;

  subs: Subscription = null;
  constructor(private accStatementService: AccountStatementService) {}

  ngOnInit() {
    this.subs = this.accStatementService.stepListener$.subscribe(
      (index) => (this.stepNumber = index)
    );
  }

  ngOnDestroy() {
    if (this.subs) this.subs.unsubscribe();
    this.accStatementService.filterInfo = {};
    this.accStatementService.searchKeyword = null;
  }
}
