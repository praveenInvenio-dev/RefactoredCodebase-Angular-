import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vat-services',
  templateUrl: './vat-services.component.html',
  styleUrls: ['./vat-services.component.css']
})
export class VatServicesComponent implements OnInit {

  direction: string;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("lang") === "ar") {
      this.direction = "rtl";
    }
    else {
      this.direction = "ltr";
    }
  }

}
