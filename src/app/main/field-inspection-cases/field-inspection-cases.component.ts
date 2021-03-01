import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { fieldCasesConstants } from 'src/app/constants/fieldInspectionCasesConstants';
import { DashboardService } from 'src/app/services/dashboard-service';
import { FieldInspectionCasesService } from 'src/app/services/field-inspection-cases.service';
import { DownloadDialogBoxComponent } from './download-dialog-box/download-dialog-box.component';
import { AppService } from "src/app/app.service";

@Component({
  selector: 'app-field-inspection-cases',
  templateUrl: './field-inspection-cases.component.html',
  styleUrls: ['./field-inspection-cases.component.css']
})
export class FieldInspectionCasesComponent implements OnInit {

  lang: any;
  img1: string;
  img2: string;
  dir: string;
  viewFieldCases: boolean = false;
  fieldCaseDetail: boolean = false;
  field: boolean = true;
  searchText = "";
  search;
  etData: any = [];
  inspDate:any;
  fieldObj:any;
  fieldObjDate;
  objInspDate;
  month:any;

  constructor(
      public feildCasesServ : FieldInspectionCasesService, 
      public dbServ : DashboardService, 
      public dialog: MatDialog, 
      public router : Router,
      public appSrv: AppService  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = fieldCasesConstants.langz.arb.fieldInspectionCases;
      this.month = fieldCasesConstants.langz.arb.months;
      this.dir = fieldCasesConstants.langz.arb.dir;
      this.search = "بحث";
    } else {
      this.lang = fieldCasesConstants.langz.eng.fieldInspectionCases;
      this.month = fieldCasesConstants.langz.eng.months;
      this.dir = fieldCasesConstants.langz.eng.dir;
      this.search = "Search";
    }

    this.img1 = "assets/image/table (1).svg";
    this.img2 = "assets/image/cards.svg";
    this.loadFieldInspection();
  }

  back(){
    this.field = true;
    this.fieldCaseDetail = false;
  }

  backTo(process): void {
    this.appSrv.updatedDataSelection9(process);
    this.router.navigate(["/mains/tax"]);
  }

  changeView(viewType) {
    (viewType === "grid") ? (this.viewFieldCases = false) : (this.viewFieldCases = true);
    this.viewFieldCases 
      ? ((this.img1 = "assets/image/table.svg"),
        (this.img2 = "assets/image/gridSelection.svg"))
      : ((this.img1 = "assets/image/table (1).svg"),
        (this.img2 = "assets/image/cards.svg"));
  }
  
  fieldCaseDetails(ele) {
    this.fieldObj = ele;
    this.fieldCaseDetail = true;
    this.field = false;
  }

  loadFieldInspection(){
    this.feildCasesServ.getFieldInspectionCases().subscribe((fieldCaseItem) => {
     console.log("response of fieldCaseItem =>",fieldCaseItem)
     this.etData = fieldCaseItem["d"]["DataSet"]["results"]
     console.log(this.etData)
     for (let i = 0;i<this.etData.length;i++){
      this.etData[i]["title"] = this.lang.t1;
      this.etData[i]["constructorDate"] = this.getDate(this.etData[i].InspDate)
      this.etData[i]["constructorpenalty"] = this.getDate(this.etData[i].PenaltyAmount)
      this.etData[i]["constructorFbnum"] = this.etData[i].Fbnum
      this.etData[i]["constructorstatus"] = this.etData[i].PaymentStatus
    }
    },
    (err) => {
      console.log("response is failed")
    });
  }

  fieldDownload(){
    const dialogRef = this.dialog.open(DownloadDialogBoxComponent, {
      height: "456px",
      width: "667px",
      data: {
        lang: this.lang,
        direction:  this.dir,
        etData:this.etData,
        month:this.month
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  getDate(ele){
    if(ele){
      const y = moment(ele).locale("en-us")
      const x = y.format("Do") + " "+ this.month[y.format("MM")] + " " + y.format("YYYY");
      return x;
    }
    return ""
  }

  numberWithCommas(x){
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  routeToTax() {
    this.router.navigate(['mains/tax']);
  }
  
  routeToVatService(){
    this.router.navigate(['mains/exciseServices']);
  }
}
