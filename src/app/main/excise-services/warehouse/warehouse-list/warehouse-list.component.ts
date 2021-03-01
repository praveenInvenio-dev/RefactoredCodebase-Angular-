import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { WarehouseService } from '../warehouse.service';
import { warehouselistconstants } from "src/app/main/excise-services/warehouse/warehouse-list/warehouselistconstants.model";

declare var $;
@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {

  GPartz: any;
  Direction: string;
  Language: string;
  WarehouseListData: any;
  isCollapse: boolean = false;
  lang:any;
  direction: string;

  constructor(
    private router: Router,
    private warehouseService: WarehouseService
  ) { 
    this.GPartz = localStorage.getItem('gpart');
    
    if (localStorage.getItem("lang") === "ar") {
      this.lang = warehouselistconstants.langz.arb.warehouselist;
      this.direction = warehouselistconstants.langz.arb.dir;
            this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = warehouselistconstants.langz.eng.warehouselist;
      this.direction = warehouselistconstants.langz.eng.dir;
            this.Direction = "ltl";
      this.Language = "E";
    }
  }

  ngOnInit() {
    this.getWarehouseDetails();
  }

  getWarehouseDetails() {
    this.warehouseService.warehouseDetailsListInfo(this.GPartz, this.Language).subscribe(data => {
      if(data) {
        console.log('list-data', data["d"]);
        this.WarehouseListData = data["d"].WI_TASKSet.results;
      }
    }, (error) => {
      console.log('err', error);
    });
  }

  modifyWarehouse() {
    this.router.navigate(['/mains/exciseServices/warehouse/modifyWarehouse']);
  }

  cancelWarehouse() {
    this.router.navigate(['/mains/exciseServices/warehouse/cancelWarehouse']);
  }

  displayWarehouse() {
    this.router.navigate(['/mains/exciseServices/warehouse/displayWarehouse']);
  }

  reactivationWarehouse() {
    this.router.navigate(['/mains/exciseServices/warehouse/requestReactivation']);
  }
  renewalWarehouse() {
    this.router.navigate(['/mains/exciseServices/warehouse/renewalWarehouse']);
  }

}
