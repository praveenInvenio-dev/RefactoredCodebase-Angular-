import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { fieldConstants } from 'src/app/constants/fieldInspectionConstants';
import { DashboardService } from 'src/app/services/dashboard-service';
import { VatFieldInspectionService } from 'src/app/services/vat-field-inspection.service';
import { AppService } from "src/app/app.service";

@Component({
  selector: 'app-vat-field-inspection',
  templateUrl: './vat-field-inspection.component.html',
  styleUrls: ['./vat-field-inspection.component.css']
})
export class VatFieldInspectionComponent implements OnInit {

  lang: any;
  month:any;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  dir: string;
  count = 2;
  viewFieldInspection: boolean = false;
  fieldDetail: boolean = false;
  field: boolean = true;
  vatData: any = [];
  inspDate:any;
  fieldObj:any;
  fieldObjDate;
  objInspDate;
  searchText = "";
  search;
  
  constructor(
    public feildInspecServ : VatFieldInspectionService, 
    public dbServ : DashboardService,
    public router : Router,
    public appSrv: AppService ) { }

  ngOnInit(): void {
    this.dbServ.getDashboardData$().subscribe(dashItem =>{
      console.log("dashboard service here =>",dashItem)
      this.loadFieldInspection();
    })

    if (localStorage.getItem("lang") === "ar") {
      this.lang = fieldConstants.langz.arb.fieldInspection;
      this.month = fieldConstants.langz.arb.months
      this.dir = fieldConstants.langz.arb.dir;
    } else {
      this.month = fieldConstants.langz.eng.months
      this.lang = fieldConstants.langz.eng.fieldInspection;
      this.dir = fieldConstants.langz.eng.dir;
    }

    this.img1 = "assets/image/table (1).svg";
    this.img2 = "assets/image/cards.svg";
  }

  back(){
    this.field = true;
    this.fieldDetail = false;
  }

  backTo(process): void {
    this.appSrv.updatedDataSelection9(process);
    this.router.navigate(["/mains/tax"]);
  }

  changeView(viewType) {
    (viewType === "grid") ? (this.viewFieldInspection = false) : (this.viewFieldInspection = true);
    this.viewFieldInspection 
      ? ((this.img1 = "assets/image/table.svg"),
        (this.img2 = "assets/image/gridSelection.svg"))
      : ((this.img1 = "assets/image/table (1).svg"),
        (this.img2 = "assets/image/cards.svg"));
  }

  fieldDetails(ele) {
    console.log(ele)
    this.fieldObj = ele;
    console.log(this.fieldObj)
    this.fieldDetail = true;
    this.field = false;
  }

  getDate(ele){
    console.log(ele)
    if(ele){
      const y = moment(ele).locale("en-us")
      const x = y.format("Do") + " "+ this.month[y.format("MM")] + " " + y.format("YYYY");
      return x;
    }
    return ""
  }

  loadFieldInspection(){
    this.feildInspecServ.getFieldInspection().subscribe((fieldItem) =>{
      console.log("success response",fieldItem)
      this.vatData = fieldItem["d"]["FieldInsDataSet"]["results"]
      for (let i = 0;i<this.vatData.length;i++){
        this.vatData[i]["title"] = this.lang.t1;
        this.vatData[i]["constructorDate"] = this.getDate(this.vatData[i].InspDate)
        this.vatData[i]["constructorCompDate"] = this.getDate(this.vatData[i].CompDate)
        this.vatData[i]["constructorComplaintNo"] = this.vatData[i].ComplaintNo
      }
    },
    (err) => {
      console.log("response is failed")
    }
    );
  }
  
   numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

routeToTax() {
  this.router.navigate(['mains/tax']);
}

routeToVatService(){
  this.router.navigate(['mains/vatServices']);
}
}
