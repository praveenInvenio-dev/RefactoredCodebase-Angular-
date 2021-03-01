import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
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
