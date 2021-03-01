import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { DashboardService } from "src/app/services/dashboard-service";
import { RefundsLandingService } from "src/app/services/refunds-landing.service";
import { RefundsConstants } from "../../constants/refunds-landing.constants";
import {VatrefundService} from "../../services/vatrefund.service";
import { NotifierService } from "angular-notifier";
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: "app-refunds-landing",
  templateUrl: "./refunds-landing.component.html",
  styleUrls: ["./refunds-landing.component.css"],
})
export class RefundsLandingComponent implements OnInit, OnDestroy {
  lang = RefundsConstants.en;
  displayedRefunds = "all";
  sukukRefunds: any = [];
  listView = false;
  searchFilter = "";
  filtermodel="";
  showNewRefund = false;
  paramSubmscription: Subscription = null;
  vatRefunds:any="";
  vatRefundsdata:any="";
  filterStatus:any="";
  filterData=[{status:"IN PROCESS",id:"E0029"},{status :"COMPLETED",id:"E0045"},
  {status :"DRAFT",id:"E0013"},{status:"CANCELED",id:"E0043"}];
  constructor(
    public dbService: DashboardService,
    public refundsLandingService: RefundsLandingService,
    public router: Router,
    private route: ActivatedRoute,
    public VatrefundService:VatrefundService,
    public notifierService:NotifierService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = RefundsConstants.ar;
      this.filterData=[{status:"قيد الدراسة",id:"E0029"},{status :"مكتمل",id:"E0045"},{status :"مسودة",id:"E0013"},{status:"ملغاة",id:"E0043"}]
    }
    this.paramSubmscription = this.route.params.subscribe((params: Params) => {
      switch (params.type) {
        case "new": {
          this.toggleNewRefund();
          break;
        }
        case "sukuk": {
          this.displayedRefunds = "sukuk";
          break;
        }
        case "vat": {
          this.displayedRefunds = "vat";
          break;
        }
      }
    });
    this.dbService.getDashboardData$().subscribe(
      (response: any) => {
        console.log(response);
        if (response?.d.Euser) {
          this.getAllSukukRefunds(response?.d.Euser, response?.d.Fbguid);
        }
      },
      (error) => {}
    );
    this.applicationList()
  }

  selectRefund(type: string) {
    this.displayedRefunds = type;
  }

  toggleListView(viewType: string) {
    this.listView = viewType === "list";
  }

  newRefund() {
    localStorage.setItem('RefundFbnum',"");
    if (this.displayedRefunds === "all") {
      this.showNewRefund = true;
    } else if (this.displayedRefunds === "sukuk") {
      this.router.navigate(["/mains/sukukbonds"]);
    }else if (this.displayedRefunds === "vat") {
      this.landingData();
    }
  }

  toggleNewRefund() {
    this.showNewRefund = !this.showNewRefund;
  }

  getAllSukukRefunds(euser, fbguid) {
    this.refundsLandingService.getAllSukukRefunds(euser, fbguid).subscribe(
      (refunds: any) => {
        console.log(refunds);
        if (refunds?.d.Hdr_WISet.results) {
          this.sukukRefunds = refunds.d.Hdr_WISet.results
            ? refunds.d.Hdr_WISet.results
            : [];
        }
      },
      (error) => {}
    );
  }



  getSukukRefundStatus(sukukStatus) {
    if (sukukStatus === "IP011" || sukukStatus === "IP017") {
      return "tag-unsubmit";
    } else if (sukukStatus === "IP014") {
      return "tag-success";
    } else if (sukukStatus === "IP020") {
      return "tag-danger";
    } else if (sukukStatus === "IP021") {
      return "tag-partial";
    }
    return "tag-unsubmit";
  }

    // vat refund
    applicationList(){
      this.VatrefundService.applicationList().subscribe(
        (res) => {
          this.vatRefundsdata=res
          this.vatRefunds=this.vatRefundsdata.d.VatRef_HeaderSet.results;
          for(let i=0 ; i<this.vatRefundsdata.d.VatRef_HeaderSet.results.length;i++){
            this.vatRefundsdata.d.VatRef_HeaderSet.results[i].RefundReqDt=this.getValidDate(this.vatRefunds[i].RefundReqDt)
          }
        },(err) => {
        })
    }
    landingData(){
      this.VatrefundService.landingData().subscribe(
        (res) => {
          this.router.navigate(["/mains/newvatrefund"]);
        },(err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        })
    }
    newvatrefundhanler(){
      this.landingData();
    }
    statusColorVat(fbnum){
      let dta = this.vatRefundsdata.d.WI_DTLSet.results.filter(data => {
        return data.Fbnum == fbnum;
      })
      let stclr=this.VatstatusColor(dta[0].Status);
      return stclr;
    }
    VatstatusColor(status) {
      let yellow = ["E0029"]
      let red = ["E0043"]
      let green = ["E0045"]
      let grey = ["E0013"]
      if (yellow.findIndex(each => status == each) != -1) {
        return "tag-partial";
      }
      else if (red.findIndex(each => status == each) != -1) {
        return "tag-danger";
      }
      else if (green.findIndex(each => status == each) != -1) {
        return "tag-success";
      }
      else if (grey.findIndex(each => status == each) != -1) {
        return "tag-unsubmit";
      }
      else {
        return "tag32 tag-unsubmit"
      }
    }

    getValidDate(arg){
      const date1 = parseInt(arg.replace(/\D/g, ''));
      const Cdate1 = moment(date1).locale("en-us").format('DD-MM-YYYY');
      return Cdate1;
    }
    openSelectedCard(args){
      localStorage.setItem('RefundFbnum',args);
      this.router.navigate(["/mains/newvatrefund"]);
    }

// filter
FilterClick(){
  $('#filterpopup').modal('toggle');
}
closeFilterPopup(){
  $('#filterpopup').modal('hide');
}
applyFilter(){
  $('#filterpopup').modal('hide');
  if(this.filterStatus){
    let dta = this.vatRefundsdata.d.VatRef_HeaderSet.results.filter(data => {
      return data.Status == this.filterStatus;
    })
    this.vatRefunds=dta;
  }else{
    let dta = this.vatRefundsdata.d.VatRef_HeaderSet.results;
    this.vatRefunds=dta;
  }
}
resetFilter(){
  this.filtermodel="";
  $('#filterpopup').modal('hide');
  this.filterStatus="";
  let dta = this.vatRefundsdata.d.VatRef_HeaderSet.results
  this.vatRefunds=dta;
}
getselstatusx(e){

}
getselstatus(arg){
  // console.log(evt);
  // this.filtermodel=arg;
  // if(arg){
  this.filterStatus=arg;
  // }else{
  //   $('#filterpopup').modal('hide');
  //   this.filterStatus="";
  //   let dta = this.vatRefundsdata.d.VatRef_HeaderSet.results
  //   this.vatRefunds=dta;
  // }
  // let statustxt=this.filterData.filter(data => {
  //   return data.status== arg;
  //   this.filterStatus=status;
  // })
}

getAmountString(amount) {
  return this.VatrefundService.getAmountString(amount);
}

  ngOnDestroy() {
    if (this.paramSubmscription) {
      this.paramSubmscription.unsubscribe();
    }
  }
}
