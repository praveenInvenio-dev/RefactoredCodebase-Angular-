import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consolidated-accounts',
  templateUrl: './consolidated-accounts.component.html',
  styleUrls: ['./consolidated-accounts.component.css']
})
export class ConsolidatedAccountsComponent implements OnInit {

  direction: string;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.direction = "rtl";
    } else {
      this.direction = "ltr";
    }
  }

}
