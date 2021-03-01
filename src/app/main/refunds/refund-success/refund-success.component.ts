import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefundConstants } from "src/app/constants/RefundConstants";

@Component({
  selector: 'app-refund-success',
  templateUrl: './refund-success.component.html',
  styleUrls: ['./refund-success.component.css']
})
export class RefundSuccessComponent implements OnInit {
  dir: String = "ltr";
  labels: any;
  constructor(public router: Router) { }

  ngOnInit(): void {
    let lang = (localStorage.getItem("lang") === 'ar') ? 'ar' : 'en';
    this.dir = (lang === "ar") ? 'rtl' : 'ltr';
    this.labels = RefundConstants[lang];
  }

  goToRefunds() {
    this.router.navigate(['/mains/refunds']);
  }

}
