import { Component, OnInit } from '@angular/core';
import { RefundConstants } from "src/app/constants/RefundConstants";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-exports-refund',
  templateUrl: './new-exports-refund.component.html',
  styleUrls: ['./new-exports-refund.component.css']
})
export class NewExportsRefundComponent implements OnInit {

  dir: String = "ltr";
  labels: any;
  slideNumber: number = 0;
  declarationForm: FormGroup;
  RefundType: any;
  bankAccount: any;

  constructor(public router: Router, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    let lang = (localStorage.getItem("lang") === 'ar') ? 'ar' : 'en';
    this.dir = (lang === "ar") ? 'rtl' : 'ltr';
    this.labels = RefundConstants[lang];

    this.declarationForm = this._formBuilder.group({
      id_type: [],
      id_number: [],
      date: [],
      name: []
    });
  }

  toggleIcon(e) {
    if (e.target.className === 'show') {
      e.target.src ='assets/image/circle-arrow-down.svg';
      e.target.classList.remove("show");
    } else {
      e.target.src ='assets/image/circle-arrow-up.svg';
      e.target.classList.add("show");
    }
  }

  getRefundType(value) {
    this.RefundType = value;
  }

  selectBankAccount(value) {
    this.bankAccount = value;
  }

  addTaxPayerDetails() {
    //add taxpayer details tab validation logic here
    this.next();
  }

  addRefundDetails() {
    //add refund details tab validation logic here
    this.next();
  }

  addDeclaration() {
    //add declaration tab validation logic here
    this.next();
  }

  confirmRefund() {
    this.router.navigate(['/mains/refunds/refund-success']);
  }

  goToDeclaration() {
    this.slideNumber = 2;
  }

  goToRefundDetails() {
    this.slideNumber = 1;
  }

  next() {
    this.slideNumber++;
  }

  back() {
    if (this.slideNumber > 0) {
      this.slideNumber--;
    } else {
      this.router.navigate(['/mains/refunds']);
    }
  }
}


