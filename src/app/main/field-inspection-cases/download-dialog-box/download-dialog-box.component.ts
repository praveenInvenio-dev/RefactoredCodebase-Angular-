import { Component,ElementRef,Inject,Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { Subscription } from 'rxjs/Subscription';
import { DateAdapter } from "@angular/material/core";
import { AppService } from 'src/app/app.service';
import * as moment from 'moment';
import { CommonValidation } from 'src/app/constants/commonValidations';
import { CalendarComponent } from "src/app/constants/calendar.component";
import { fieldCasesConstants } from 'src/app/constants/fieldInspectionCasesConstants';
import { Subject } from 'rxjs/Subject';
import * as XLSX from 'xlsx'; 
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-download-dialog-box',
  templateUrl: './download-dialog-box.component.html',
  styleUrls: ['./download-dialog-box.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DownloadDialogBoxComponent implements OnInit {

  dataOutput: Subject<any>;
  output: any = {};
  dir: String ;
  headerComponent = CalendarComponent;
  fromDate = null;
  toDate = null;
  dtype: any;
  today = null;
  translation: any = {};
  etData:any=[];
  excel:any=[];
  fileName= 'ExcelSheet.xlsx'; 
  months:any;
  excelsheet:boolean = false
  filteretData:any=[];
  @ViewChild('excelTable') excelTable: ElementRef;

  constructor(private dialogRef: MatDialogRef<DownloadDialogBoxComponent>,@Inject(MAT_DIALOG_DATA) public data, private notifierService: NotifierService, public commonValid: CommonValidation,public appSrv: AppService, private _dateAdapter: DateAdapter<JDNConvertibleCalendar>) {}

  ngOnInit(): void {
    console.log(this.data)
    this.translation = this.data.lang.trans
    this.etData= this.data.etData
    this.filteretData= this.etData
    this.excel= this.data.lang
    this.months = this.data.month
    this.dir = this.data.direction
    // for (let i = 0;i<this.etData.length;i++){
    //   this.etData[i]["constructorDate"] = this.getDate(this.etData[i].InspDate)
    // }
    console.log(moment().valueOf());
    console.log(moment().locale("ar-sa"));
    this.appSrv.data1.subscribe((res) => {
      this.today = this.commonValid.dateFormate(
        this.commonValid.toJulianDate(new Date()),
        res
      );
      console.log(
        "formatted Date",
        this._dateAdapter.format(this.today, "DD-MM-YYYY")
      );
      console.log(this.today);
    });
  }

onClose() {
  this.dialogRef.close({ ...this.data, handleData: true });
}

onCrossClick() {
  this.dialogRef.close({ ...this.data, handleData: false });
}

getDate(ele){
  if(ele){
    const y = moment(ele).locale("en-us")
    const x = y.format("Do") + " "+ this.months[y.format("MM")] + " " + y.format("YYYY");
    return x;
  }
  return ""
}

  changesToDate() {
    console.log(this.appSrv.data1);
    this.appSrv.data1.subscribe((res) => {
      console.log(res);
      this.dtype = res;
    });
    if (this.toDate !== null) {
      if (this.toDate["calendarName"] !== this.dtype) {
        this.toDate = this.commonValid.dateFormate(this.toDate, this.dtype);
      }
    }
  }

  changesFromDate() {
    console.log(this.appSrv.data1);
    this.appSrv.data1.subscribe((res) => {
      console.log(res);
      this.dtype = res;
    });
    if (this.fromDate !== null) {
      if (this.fromDate["calendarName"] !== this.dtype) {
        this.fromDate = this.commonValid.dateFormate(this.fromDate, this.dtype);
      }
    }
  }

  dateChange(){
   if(this.fromDate != null && this.toDate != null){
     let todt:any = this._dateAdapter.format(this.toDate, "DD-MM-YYYY");
     let frmdt:any = this._dateAdapter.format(this.fromDate, "DD-MM-YYYY");
     frmdt = moment(frmdt,"DD-MM-YYYY")
     todt = moment(todt,"DD-MM-YYYY")
   
        this.filteretData = this.etData.filter(fieldInspection=>{
        console.log(fieldInspection)
        console.log(frmdt)
        console.log(todt)
         let inspDate = moment(fieldInspection.InspDate)
         console.log(inspDate)
         console.log(inspDate.isSameOrAfter(frmdt,"day"))
         console.log(inspDate.isSameOrBefore(todt,"day"))
         if(inspDate.isSameOrAfter(frmdt,"day") && inspDate.isSameOrBefore(todt,"day")){
           return true;
         }
         return false;
        });
        console.log(this.filteretData)
   }
  }

  exportexcel(): void 
    {
      this.excelsheet = true;
       /* table id is passed over here */   
      //  let element = document.getElementById('excelTable'); 
      console.log(this.excelTable.nativeElement)
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(this.excelTable.nativeElement);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
  }
}
