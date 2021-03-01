import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { NewcVATRefundConstants } from 'src/app/constants/VATrefundConstant';
import { environment } from "src/environments/environment";
import { NotifierService } from "angular-notifier";
import { CommonValidation } from "src/app/constants/commonValidations";
import {VatrefundService} from "../../services/vatrefund.service";
import { AppService } from "src/app/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-new-vat-refund',
  templateUrl: './new-vat-refund.component.html',
  styleUrls: ['./new-vat-refund.component.css']
})
export class NewVatRefundComponent implements OnInit {
  lang: any = NewcVATRefundConstants.eng;
  baseUrl = environment.url;
  langX: string;
  langSingle: string;
  optionActive = 1;
  // VATrefundFormGroup1: FormGroup;
  VATrefundFormGroup2: FormGroup;
  VATrefundFormGroup3: FormGroup;
  VATrefundFormGroup4: FormGroup;
  VATrefundFormGroup5: FormGroup;
  viewSel: any = 'listview';
  img1 = "assets/image/table (1).svg"
  img2 = "assets/image/cards (1).svg"
  landingDataNew:any="";
  IDnumSet:any={
    "d":{
      "results":[{}]
    }
  };
  selectedIbnNo:any="";
  chipSelected:any="";
  StchipSelected:any="";
  selectedAcc=-1;
  initloadData:any="";
  buttondata:any="";
  historyData:any="";
  instructionsAccepted=false;
  termsAccepted=false;
  terms2Accepted=false;
  vatobject:any="";
  historyCardData:any="";
  filtData:any="";
  name:any="";
  no:any="";
  cardDetail:any="";
  cardDetail1:any="";
  cardDetail2:any="";
  cardDetail3:any="";
  returnrefno:any="";
  searchText: any = "";
  accno:any="";
  isSubmit=true;
  showerr:any="";
  hideErr:any="";
  checkboxerr:any="";
  errmsg="";
  
  constructor(
    private _formBuilder: FormBuilder,
    public notifierService: NotifierService,
    public commonValid: CommonValidation,
    public VatrefundService :VatrefundService,
    public appSrv: AppService,
    private router: Router,
    private sanitizer: DomSanitizer,
    ) { 
      if (localStorage.getItem("lang") === "ar") {
        this.langX = "AR";
        this.langSingle = "A";
      } else {
        this.langX = "EN";
        this.langSingle = "E";
      }
    }

  ngOnInit(): void {
   if (localStorage.getItem("lang") === "ar") {
      this.lang = NewcVATRefundConstants.arb;
    }
    // this.VATrefundFormGroup1 = this._formBuilder.group({
    //   searchText: [""],
    // })
    this.VATrefundFormGroup2 = this._formBuilder.group({
      DecidTy: ["", Validators.required],
      DecidNo: ["", Validators.required],
    })
    this.VATrefundFormGroup3 = this._formBuilder.group({
    })
    this.VATrefundFormGroup4 = this._formBuilder.group({
    })
    this.VATrefundFormGroup5 = this._formBuilder.group({
    })
    let rfnum="";
    rfnum = localStorage.getItem('RefundFbnum');
    if(rfnum!=""){
      this.applicationList();
    }else{
      this.landingData();
      // $('#vatConfirmation').modal('show');
    }
    
  }

  onSubmit1() {
    $('#vatConfirmation').modal('show');
    
  }
  onSubmit2() {
    if (this.VATrefundFormGroup2.invalid || this.selectedAcc==-1) {
      this.isSubmit = false;
      this.showerr="inputErr";
      return;
    }
    else {
      this.isSubmit = true;
    }
    this.vatobject["d"]["Idtype"]=this.VATrefundFormGroup2.value.DecidTy;
    this.vatobject["d"]["Idnum"]=this.VATrefundFormGroup2.value.DecidNo.Idnumber;
    this.vatobject["d"]["Iban"]=this.initloadData.d.IBANSet.results[this.selectedAcc].Iban;
    this.optionActive = 3

  }
  onSubmit3() {
    this.vatobject["d"]["Agrfg"]= "X";
    this.vatobject["d"]["TcFg"]= "X";
    this.vatobject["d"]["TxnTpx"]= "CRE_VTRF";
    this.vatobject["d"]["IbanCb"]="0";
    this.vatobject["d"]["TcFg"]="X";
    this.vatobject["d"]["Decflg"]="X";
    this.vatobject["d"]["Decdt"]="/Date(" + Date.now() + ")/";
    $('#submitterms').modal('show');
    // this.saveData();
  }
  onSubmit4() {

  }

  landingData(){
    this.VatrefundService.landingData().subscribe(
      (res) => {
        this.landingDataNew= res;
        this.vatobject=this.landingDataNew; //res;
        this.loadData();
      },(err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      })
  }
  loadData(){
    this.VatrefundService.loadData().subscribe(
      (res) => {
        this.initloadData=res
        $('#vatConfirmation').modal('show');
        // this.optionActive = 2
          },(err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
        // setTimeout(() => {
        //   this.router.navigate(["/mains/refundslanding"])
        // },3000)
      })
  }
  fetchID(){
    this.VatrefundService.fetchID(this.VATrefundFormGroup2.value.DecidTy).subscribe(
      (res) => {
        this.IDnumSet=res;
      },(err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      })
  }
  saveData(){
    if(this.terms2Accepted){
        this.checkboxerr="";
        $("#submitConfirmation").modal("hide")
        this.vatobject["d"]["Operationx"] = "01";
        this.vatobject["d"]["StepNumberx"] = "02"
        this.VatrefundService.saveData(this.vatobject).subscribe(
          (res) => {
            this.optionActive = 4;
            this.returnrefno=res;
        });
    }else{
      this.checkboxerr="checkboxerr";
    }
    }
  validateIBN(accno){
    this.VatrefundService.validateIBN(accno).subscribe(
      (res:object) => {
        console.log(res);
        $('#addaccountpopup').modal('hide');
        this.pushtoibanArr(res);
        this.selectAccount(0);
        this.errmsg="";
      },(err) => {
        this.errmsg=err.error.error.innererror.errordetails[0].message;
        // this.notifierService.notify(
        //   "error",
        //   err.error.error.innererror.errordetails[0].message
        // );

      })
  }
  pushtoibanArr(res){
    this.accno="";
    this.initloadData.d.IBANSet.results.push({
      Iban:res.d.Iban
    })
  }
  getButton(){
  }
  applicationList(){
    this.VatrefundService.applicationList().subscribe(
      (res) => {
        this.historyData=res;
        this.filtData=this.historyData.d.VatRef_HeaderSet.results;
        this.openSelectedCard(localStorage.getItem('RefundFbnum'));
      },(err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      })
  }

getCardDetail(fbguid,euser ){
  this.VatrefundService.carddetail(fbguid,euser).subscribe(
      (res) => {
      this.cardDetail=res;
        },(err) => {
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
    })
}

// functionality 

onIdSelect(){
  this.fetchID();
  this.VATrefundFormGroup2.controls["DecidNo"].setValue(
    ""
  );
}


openSelectedCard(fbnum){
  let dta = this.historyData.d.WI_DTLSet.results.filter(data => {
    return data.Fbnum == fbnum
  })
  let dta2 = this.historyData.d.VatRef_HeaderSet.results.filter(data => {
    return data.RefundFbnum == fbnum
  })
  let dta3=[];
   for(let a=0;a < this.historyData.d.VatRef_SubItemsSet.results.length;a++){
    if(this.historyData.d.VatRef_SubItemsSet.results[a].RefundFbnum == fbnum){
      dta3.push(this.historyData.d.VatRef_SubItemsSet.results[a]);
    }
  }
  this.cardDetail1=dta;
  this.cardDetail2=dta2;
  this.cardDetail3=dta3;
  this.getCardDetail(dta[0].Fbguid,dta[0].Euser)
  this.optionActive = 5; 
}

tableView() {
  this.viewSel = "tableview"
  this.img2 = "assets/image/cards-gray.svg"
  this.img1 = "assets/image/table.svg"

}
listview() {
  this.viewSel = "listview"
  this.img1 = "assets/image/table (1).svg"
  this.img2 = "assets/image/cards (1).svg"
}
clr(fbnum){
  let dta = this.historyData.d.WI_DTLSet.results.filter(data => {
    return data.Fbnum == fbnum;
  })
  let stclr=this.statusColor(dta[0].Status);
  return stclr;
}
statusColor(status) {
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

onFilterClick() {
  $('#myModal').modal('show');
}

changeType(i) {
  if (this.chipSelected === i)
    this.chipSelected = -1;
  else
    this.chipSelected = i;
}

selectAccount(i){
  this.showerr=""
  this.hideErr=""
  if (this.selectedAcc === i)
    this.selectedAcc = -1;
  else
    this.selectedAcc = i;
}

changestatus(i) {
  if (this.StchipSelected === i)
    this.StchipSelected = -1;
  else
    this.StchipSelected = i;
}

resetFil() {
  $('#myModal').modal('toggle');
}
filterList(){
  
}
closepopup(arg) {
  $('#myModal').modal('toggle');
}

closeConfirmation(){
  $('#vatConfirmation').modal('toggle');
  $('#vatrefundterms').modal('show');
}

 back() {
    if (this.optionActive == 5 || this.optionActive==1) {
      this.backTo('001')
    } else {
      if(this.optionActive==2){
        this.backTo('001')
      }else{
        if (this.optionActive > 2) this.optionActive--;
      }
      
    }
  }

  getidtype(res){
    if(res=="ZS0001"){
      return this.lang.NationalIqamaId;
    }else if(res=="BUP002"){
      return this.lang.CommercialRegistrationID;
    }else{
      return this.lang.CompanyID;
    }
  }

  getValidDate(arg){
    const date1 = parseInt(arg.replace(/\D/g, ''));
    const Cdate1 = moment(date1).locale("en-us").format('DD/MM/YYYY');
    return Cdate1;
  }

  openaddaccpopup(){
    $('#addaccountpopup').modal('show');
  }

  closweAddaccount(){
    $('#addaccountpopup').modal('hide');
  }
  
  addAccounthandler(){
    this.validateIBN(this.accno);
  }

// final confirmation
// term 
closeModal() {
  this.checkboxerr="";
    $('#vatrefundterms').modal('toggle');
    this.router.navigate(["/mains/refundslanding/vat"]);
}

cnfmodal(){
  if (this.instructionsAccepted) {
    this.checkboxerr="";
    $('#vatrefundterms').modal('toggle');
    this.optionActive = 2
    // this.landingData();
  }else{
    this.checkboxerr="checkboxerr";
  }
}

submitterms() {
  this.checkboxerr="";
    $('#submitterms').modal('hide');
}
submittermscnf(){
  if (this.termsAccepted) {
    this.checkboxerr="";
    $('#submitterms').modal('hide');
    $('#submitConfirmation').modal('show');
  }else{
    this.checkboxerr="checkboxerr";
  }
}


closeSubmitconfirmation(){
  $("#submitConfirmation").modal("hide")
  this.checkboxerr="";
}

closeconfirmpopup(){
  $("#vatConfirmation").modal("hide")
  this.router.navigate(["/mains/refundslanding/vat"]);
}


  backTo(process): void {
    // this.appSrv.updatedDataSelection9(process);
    this.router.navigate(["/mains/refundslanding"]);
}

getAmountString(amount) {
  console.log(amount);
  console.log(this.VatrefundService.getAmountString(amount));
  return this.VatrefundService.getAmountString(amount);
}

// private getNumericalValueForTable(amount: number) {
//   if (this.lang === "en")
//     return this.getAmountString(amount) + " " + this.lang.SAR;

//   return this.sanitizer.bypassSecurityTrustHtml(
//     `<span style="direction: ltr;unicode-bidi: bidi-override; margin-left: 5px">
//       ${this.getAmountString(amount)} 
//     </span>` +
//       " " +
//       this.lang.SAR
//   );
// }



getAmt(arg){
if(this.langX=="AR"){
  console.log(arg +' '+"ريال سعودي");
  // return arg +' '+"ريال سعودي";
  return "ريال سعودي"+" "+arg;
}else{
  console.log(arg+' '+"SAR")
  return arg+' '+"SAR";
}
}



}
