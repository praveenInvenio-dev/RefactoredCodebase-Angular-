import { Component, OnInit } from '@angular/core';
import { RefundConstants } from "src/app/constants/RefundConstants";
import { Router } from '@angular/router';

@Component({
  selector: 'app-refund-type',
  templateUrl: './new-refund.component.html',
  styleUrls: ['./new-refund.component.css']
})
export class NewRefundComponent implements OnInit {
  dir: String = "ltr";
  labels: any;
  RefundType: any;

  constructor(public router: Router) {
  }

  ngOnInit(): void {
    let lang = (localStorage.getItem("lang") === 'ar') ? 'ar' : 'en';
    this.dir = (lang === "ar") ? 'rtl' : 'ltr';
    this.labels = RefundConstants[lang];
  }

  back() {
    this.router.navigate(['/mains/']);
  }

  getRefundType(value) {
    this.RefundType = value;
    switch (value) {
      case 0:
        this.router.navigate(['/mains/refunds/new-excise-tax-refund']);
        break;
      case 1:
        this.router.navigate(['/mains/refunds/new-exports-refund']);
        break;
      case 2:
        this.router.navigate(['/mains/refunds/new-appeal-refund']);
        break;
      case 3:
        this.router.navigate(['/mains/refunds/new-sale-assets-refund']);
        break;
      default:
        break;
    }
  }
}
