import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

import { CommonValidation } from "src/app/constants/commonValidations";
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { RequesToReleaseSecuritiesService } from './../../services/reques-to-release-securities.service';
import { RequesToReleaseSecuritiesConstant } from './../../constants/request-release-to-securities';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import * as moment from 'moment'  ;
declare var $: any;
const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
let maxLength = 132;
@Component({
  selector: 'app-reques-to-release-securities',
  templateUrl: './reques-to-release-securities.component.html',
  styleUrls: ['./reques-to-release-securities.component.css']
})
export class RequesToReleaseSecuritiesComponent implements OnInit {
  lang = RequesToReleaseSecuritiesConstant.eng;
  viewOnlyModeRequestData:any={}
  isSuccessPage=false;
  optionActive = 1;
  showIdNumError = false;
  isAgree = false;
  isViewOnlyMode=false;
  AfterSubmitAPIResponse: any = {};
  requestedReleaseSecurityList=[];
  requestedReleaseSecurityListAll=[];
  filterStatusValue;
  dataTorequestedReleaseSecurityLis: any = {};
  filterTypes=[];
  isIdValidated = false;
  id1 = "";
  dobMsg = "";
  layoutType = 'grid';
  showSearch=true;
  onSubmit1Flag=false;
  idMsg;
 searchText;
 today=null;
  idErr1 = false;
  onSubmit3Flag=false;
  onSubmit4Flag=false;
  dob1: any;
  IbanList=[];
  dobErr = false;
  typeOfSecurityIsDisable=false;
  baseUrl = environment.url;  
  
  constructor(public commonValid: CommonValidation, private router: Router, public appSrv: AppService,   private _formBuilder: FormBuilder,  public sanitizer: DomSanitizer,
    public notifierService: NotifierService,
  
  
    public requestToReleaseSecurity: RequesToReleaseSecuritiesService,) { }

    securityDetailForm=this._formBuilder.group
    ({
      TypeOfSecuritySubmitted:['',Validators.required],
      CashreferenceNumber: ['',Validators.required],
      SecurityAmount: [''],
      SubmissionDate:[''],
      PreferredRefundMethod: [''],
      IbanNumber:['']
    });
    DeclarationFormGroup= this._formBuilder.group({
      idType: ["", Validators.required],
      idNum: ["", Validators.required],
      name: ["", [Validators.required, Validators.pattern(nonWhitespaceRegExp)]],
      
      cbdeclaration: ["", Validators.requiredTrue],
    });
  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.lang=RequesToReleaseSecuritiesConstant.arb
    }
    else 
    {
      this.lang = RequesToReleaseSecuritiesConstant.eng ;
    }
    this.getRequestedReleaseSecurityListData();

    this.appSrv.data1.subscribe((res) => {
      this.today = this.commonValid.dateFormate(
        this.commonValid.toJulianDate(new Date()),
        res
      );
      console.log(this.today);
    });
  }


  changeReferenceNumber(e)
  {
    this.getDataForCorrespondingReferenceNumber(e.value.Refno);
    // this.securityDetailForm.controls.CashreferenceNumber.setValue(e.target.value.Refno,{
    //   onlySelf:true
    // })
  //  this.securityDetailForm.controls.CashreferenceNumber.patchValue('');
   

  }
  TaxManagement()
  {
    this.appSrv.updatedDataSelection9('');
  this.router.navigate(["/mains/tax"]);
  }
  VatServicesClicked()
  {
    this.appSrv.updatedDataSelection9('001');
    this.router.navigate(["/mains/tax"]);
  }
  releaseSecurityClicked()
  {
    this.router.navigate(['/mains/requestreleasesecurities'])
  }
  getRequestedReleaseSecurityListData() {
    this.requestToReleaseSecurity.getRequestedSecuritiesList().subscribe(
      (res) => {
        console.log("Requested Release Security  list response is SUCCESS", res);
        this.requestedReleaseSecurityList=res['d']['ASSLISTSet']['results'].filter (x => x.Fbtyp == 'SWVT');
        this.requestedReleaseSecurityListAll=this.requestedReleaseSecurityList;
        this.filterTypes=res['d']['STATUSSet']['results'];
        console.log("Requested Release Security  list Array is SUCCESS",this.requestedReleaseSecurityList );

      },
      (err) => {
        this.notifierService.notify(
          "error",
          err['error']['error']['innererror']['errordetails'][0].message
        );
      }
    );
  }
  getDataToRequestReleaseSecurity() {
    this.requestToReleaseSecurity.getDataToRequestedSecurities().subscribe(
      (res) => {
        console.log("Requested Release Security  Data response is SUCCESS", res);
       this.dataTorequestedReleaseSecurityLis=res;
       $("#terms").modal("toggle");
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err['error']['error']['innererror']['errordetails'][0].message
        );
      }
    );
  }  
  getDataToRequestReleaseSecurityForWorkItem(fbguid) {
    this.requestToReleaseSecurity.getDataToRequestedSecuritiesWorkItem(fbguid).subscribe(
      (res) => {
        console.log(" ", res);
        this.viewOnlyModeRequestData=res['d'];
        this.dataTorequestedReleaseSecurityLis=res;
        this.getUIControlInfo(this.viewOnlyModeRequestData.Fbnumz,this.viewOnlyModeRequestData.Statusz)
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err['error']['error']['innererror']['errordetails'][0].message
        );
      }
    );
  }  

  getUIControlInfo(fbNum,status) {
    this.requestToReleaseSecurity. getUIControlInfo(fbNum,status).subscribe(
      (res) => {
        if(res['d']['EditFgz']!='X')
        {
          this.setViewOnlyMode();
        }
        else
        {
         this.setViewofIndraftReports();
        }
        console.log("XML Parsed",res );
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err['error']['error']['innererror']['errordetails'][0].message
        );
      }
    );
  }  
 // getUIControlInfo
setViewOnlyMode()
{
  this.optionActive=5;
  this.isViewOnlyMode=true;
}
setViewofIndraftReports()
{ if(this.dataTorequestedReleaseSecurityLis.d.Insfg=='1')
{
  this.isAgree=true;
  this.optionActive=2;
}else
{
   $("#terms").modal("toggle");
  this.isAgree=false;
}
  
  if(this.dataTorequestedReleaseSecurityLis.d.Sectp=='C')
  {
    this.Title1Clicked();
  }
  else if(this.dataTorequestedReleaseSecurityLis.d.Sectp=='B')
  {
    this.Title2Clicked();
  }
   if(this.dataTorequestedReleaseSecurityLis.d.Refmt=='B')
   {
   this.CashRefundMethodTileClicked()
   }
   if(this.dataTorequestedReleaseSecurityLis.d.Refmt=='V')
   {
   this.CarryForwardRefundMethodTileClicked()
   }
  if(this.dataTorequestedReleaseSecurityLis.d.Iban!=null && this.dataTorequestedReleaseSecurityLis.d.Iban!=undefined)
  {
    this.securityDetailForm.controls.IbanNumber.setValue(this.dataTorequestedReleaseSecurityLis.d.Iban);
  }
  if(this.dataTorequestedReleaseSecurityLis.d.Refno!=null&&this.dataTorequestedReleaseSecurityLis.d.Refno!=''&&this.dataTorequestedReleaseSecurityLis.d.Refno!=undefined)
  {
    this.securityDetailForm.controls.CashreferenceNumber.setValue(this.dataTorequestedReleaseSecurityLis.d.SecRefSet.results.filter(x => x.Refno == this.dataTorequestedReleaseSecurityLis.d.Refno)[0]); //  dataTorequestedReleaseSecurityLis.d.SecRefSet.results
    this.getDataForCorrespondingReferenceNumber(this.dataTorequestedReleaseSecurityLis.d.SecRefSet.results.filter(x => x.Refno == this.dataTorequestedReleaseSecurityLis.d.Refno)[0].Refno);
  }
  //Decf1 
  if(this.dataTorequestedReleaseSecurityLis.d.Decf1=='1')
  {
    this.DeclarationFormGroup.controls.cbdeclaration.setValue(true);
  }
  else
  {
    this.DeclarationFormGroup.controls.cbdeclaration.setValue(false);
  }//Idnumber
  
  if(this.dataTorequestedReleaseSecurityLis.d.Type!=null && this.dataTorequestedReleaseSecurityLis.d.Type!=''&&this.dataTorequestedReleaseSecurityLis.d.Type!=undefined)
  {
    this.DeclarationFormGroup.controls.idType.setValue(this.dataTorequestedReleaseSecurityLis.d.Type); 
  }
  if(this.dataTorequestedReleaseSecurityLis.d.Idnumber!=null && this.dataTorequestedReleaseSecurityLis.d.Idnumber!=''&&this.dataTorequestedReleaseSecurityLis.d.Idnumber    !=undefined)
  {
    // this.DeclarationFormGroup.controls.idNum.setValue("11111111");
   this.DeclarationFormGroup.controls.idNum.setValue(this.dataTorequestedReleaseSecurityLis.d.Idnumber); 
  }
  if(this.dataTorequestedReleaseSecurityLis.d.Decnm!=null && this.dataTorequestedReleaseSecurityLis.d.Decnm!='' && this.dataTorequestedReleaseSecurityLis.d.Decnm!=undefined)
  {
    this.DeclarationFormGroup.controls.name.setValue(this.dataTorequestedReleaseSecurityLis.d.Decnm); 
  }
  this.getIbanList();
}
  onWorkItemList_ItemTapped(selectedListItem)
  {
    this.getInitialStatusDataForWorkItem(selectedListItem.Fbnum,selectedListItem.Fbust);
  } 
  getInitialStatusDataForWorkItem(fbnum,status){
    this.requestToReleaseSecurity.getInitialStatusDataForWorkItem(fbnum,status).subscribe(
      (res) => {
        console.log("Response of work list", res);
        //this.getDataToRequestReleaseSecurity()
       this.getDataToRequestReleaseSecurityForWorkItem(res['d']['Fbguid'])
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err['error']['error']['innererror']['errordetails'][0].message
        );
      }
    );
  }
  getDataForCorrespondingReferenceNumber(referenceNumber) {
    this.requestToReleaseSecurity.getDataForCorrespondingReferenceNumber(referenceNumber).subscribe(
      (res) => {
        console.log("Data response For Corresponding Reference number is SUCCESS", res);
     
        this.securityDetailForm.controls.SecurityAmount.setValue(res['d'].Reamt);
        this.securityDetailForm.controls.SubmissionDate.setValue(res['d'].Secdt);
        console.log(this.securityDetailForm.get('SecurityAmount').value);
        console.log(this.securityDetailForm.get('SubmissionDate').value);
        this.securityDetailForm.controls.CashreferenceNumber.setErrors(null);
        if(res['d'].Sectp=='C')
        {
          this.securityDetailForm.controls.TypeOfSecuritySubmitted.setValue('Cash');
          this.typeOfSecurityIsDisable=true;
          this.securityDetailForm.controls.PreferredRefundMethod.setValidators([Validators.required]);
          this.securityDetailForm.controls.PreferredRefundMethod.updateValueAndValidity();
        }
        if(res['d'].Sectp=='B')
        {
          this.securityDetailForm.controls.TypeOfSecuritySubmitted.setValue('Bank');
          this.typeOfSecurityIsDisable=true;
          this.securityDetailForm.controls.PreferredRefundMethod.clearValidators();
          this.securityDetailForm.controls.PreferredRefundMethod.updateValueAndValidity();
        }
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err['error']['error']['innererror']['errordetails'][0].message
        );
        this.typeOfSecurityIsDisable=false;
        this.securityDetailForm.controls.CashreferenceNumber.setErrors({'incorrect': true});
        this.securityDetailForm.controls.SecurityAmount.setValue("");
        this.securityDetailForm.controls.SubmissionDate.setValue("");
      }
    );
  }


  

  submitRequestForReleaseSecurities(operationId) {
    this.requestToReleaseSecurity.submitRequestForReleaseSecurities(this.dataTorequestedReleaseSecurityLis,operationId).subscribe(
      (res) => {
      console.log( "submit success " +res);
      this.isSuccessPage= true;
      this.AfterSubmitAPIResponse=res;
      console.log("OperationPerformed=",operationId);
      console.log("After Submit Response",operationId);
      },
      (err) => {
        console.error(err);
        let message = err['error']['error']['innererror']['errordetails'][0].message;
        this.notifierService.notify(
          "error" ,message
          
        );
      //alert(message);
      }
  
    );
  } 
  onSubmit()
  {
    this.isAgree=false;
    this.onSubmit1Flag=false;
    console.log("Option chqnged to 2 ");
    console.log (this.lang.menu[this.optionActive - 1].title);
    this.getDataToRequestReleaseSecurity();
    
  
    
    
 
    
  }
   getIbanList()
  {
    for(var i=0;i<this.dataTorequestedReleaseSecurityLis.d.IBANSet.results.length; i++)
    {
       let bankCode = this.dataTorequestedReleaseSecurityLis.d.IBANSet.results[i].Iban.substr(4,2);
  
  this.requestToReleaseSecurity.getBankLogo(bankCode).subscribe(
    (res) => {
      
     let img = "data:image/svg+xml;base64," +  res["d"]["results"][0]["LogoBid"];
     //this.bankLogo = this.transform(img);
     let name = res["d"]["results"][0]["Descr"]
     let bankcd= res["d"]["results"][0]["Bnkcd"]
     let obj = {
       //id: lastFiveChars,
       //ibn: this.iban,
       Bnkcd:bankcd,
       Iban:"",
       flag: true,
       name: name,
       img: this.transform(img)}
       this.IbanList.push(obj);
    
    }, 
    (err) => {
      let obj = {
        //id: lastFiveChars,
        //ibn: this.iban,
        Bnkcd:"",
        Iban:"",
        flag: false,
        name:"",
        img: ""}
     // this.notifierService.notify('error', err.error.error.innererror.errordetails[0].message);
     this.IbanList.push(obj);
    }
    


  );

}  
  //  });
    console.log("IbanListNew Successs" ,this.IbanList);
   
  }
  
  back() {
    if(!this.isViewOnlyMode)
    {
      if (this.optionActive > 1)
    {
      
      
      if(this.optionActive==2)
      {  this.optionActive--;
        window.location.reload();
      }
      else
      {
        this.optionActive--;
      }
    
    } 
    else
    {
      this.appSrv.updatedDataSelection9('001');
      this.router.navigate(["/mains/tax"]);
    }

    }
    else
    {
      this.optionActive=1;
      window.location.reload();
    }
    
    
  }
  onSubmit2()
  {this.getIbanList();
   
    this.optionActive= 3;
  }
  onSubmit3()
  {
    this.onSubmit3Flag=true;
    if(!this.securityDetailForm.invalid)
    {
  this.optionActive= 4;
  console.log(this.dataTorequestedReleaseSecurityLis);
    }
    else
    {
      this.notifierService.notify("error", this.lang.pleasecorrectthehighlightedfields);
    }

  }
  onSubmit4()
  {
   this.onSubmit4Flag=true;
    if(!(this.DeclarationFormGroup.invalid || this.isIdValidated == false))
    {
      this.optionActive=5; 
      console.log(this.DeclarationFormGroup.value);
    }
    else
    {
      this.notifierService.notify("error", this.lang.pleasecorrectthehighlightedfields);
    }
   
  }

 
  onSubmit5()
  {
    if(this.DeclarationFormGroup.get('cbdeclaration').value) 
  {
    this.dataTorequestedReleaseSecurityLis.d.Decf1="1";
  }
  this.dataTorequestedReleaseSecurityLis.d.Type = this.DeclarationFormGroup.get('idType').value;
  this.dataTorequestedReleaseSecurityLis.d.Idnumber = this.DeclarationFormGroup.get('idNum').value;
  this.dataTorequestedReleaseSecurityLis.d.Decnm = this.DeclarationFormGroup.get('name').value;
  this.dataTorequestedReleaseSecurityLis.d.Insfg = "1";
  if( this.securityDetailForm.get('TypeOfSecuritySubmitted').value=='Cash')
  {
   this.dataTorequestedReleaseSecurityLis.d.Sectp = "C";
   if(this.securityDetailForm.get('PreferredRefundMethod').value=='CashRefundMethod')
   {
     this.dataTorequestedReleaseSecurityLis.d.Refmt = "B"; 
     this.dataTorequestedReleaseSecurityLis.d.Iban = this.securityDetailForm.get('IbanNumber').value; 

   }
   else
   {
     this.dataTorequestedReleaseSecurityLis.d.Refmt = "V"; 
    
   }
  }
  else if( this.securityDetailForm.get('TypeOfSecuritySubmitted').value=='Bank')//Bank
  {
   this.dataTorequestedReleaseSecurityLis.d.Sectp = "B";
    
 }

 this.dataTorequestedReleaseSecurityLis.d.Refno = this.securityDetailForm.get('CashreferenceNumber').value.Refno; 
 this.dataTorequestedReleaseSecurityLis.d.Security = this.securityDetailForm.get('CashreferenceNumber').value.Security;
 this.dataTorequestedReleaseSecurityLis.d.UserTypz = "TP"; 
 this.dataTorequestedReleaseSecurityLis.d.Secdt = this.securityDetailForm.get('SubmissionDate').value; 
 this.dataTorequestedReleaseSecurityLis.d.Reamt = this.securityDetailForm.get('SecurityAmount').value; 


  console.log("Data To Submit", this.dataTorequestedReleaseSecurityLis);

   //forSubmit-01
   //for save as draft - 05
   if(this.dataTorequestedReleaseSecurityLis.d.Refmt=== "V")
   {
    this.getSubmitApi("41");
   }
   else
   {
    this.getSubmitApi("01");  
   }

}
  Title1Clicked()
  {
this.securityDetailForm.controls.TypeOfSecuritySubmitted.setValue("Cash");
console.log(this.securityDetailForm.get('TypeOfSecuritySubmitted').value);
this.securityDetailForm.controls.PreferredRefundMethod.setValidators([Validators.required]);
this.securityDetailForm.controls.PreferredRefundMethod.updateValueAndValidity();
//setValidators([Validators.required, Validators.maxLength(10), Validators.minLength(5)])PreferredRefundMethod

this.securityDetailForm.get('PreferredRefundMethod').setValidators(Validators.required);
  }
  Title2Clicked()
  {
this.securityDetailForm.controls.TypeOfSecuritySubmitted.setValue("Bank");
console.log(this.securityDetailForm.get('TypeOfSecuritySubmitted').value);
this.securityDetailForm.get('PreferredRefundMethod').clearValidators();
this.securityDetailForm.controls.PreferredRefundMethod.updateValueAndValidity();
  }
  CashRefundMethodTileClicked()
  {
  this.securityDetailForm.controls.PreferredRefundMethod.setValue("CashRefundMethod");
  this.securityDetailForm.get('IbanNumber').setValidators(Validators.required);
  this.securityDetailForm.controls.IbanNumber.updateValueAndValidity();
 
  }
  CarryForwardRefundMethodTileClicked()
  {
  this.securityDetailForm.controls.PreferredRefundMethod.setValue("CarryForwardRefundMethod");
  this.securityDetailForm.controls.IbanNumber.clearValidators();
  this.securityDetailForm.controls.IbanNumber.updateValueAndValidity();
  }
  onIdSelect() {
    // if (this.vatReviewFormGroup6.controls.idType.value == "ZS0001" || this.vatReviewFormGroup6.controls.idType.value == "ZS0002") {
    this.isIdValidated = false;
    this.DeclarationFormGroup.controls.idNum.setValue("");
    this.DeclarationFormGroup.controls.name.setValue("");
    this.dob1 = undefined;
    this.id1 = undefined;

    if (this.DeclarationFormGroup .controls.idType.value != "ZS0003") {
      $("#aftSelect").modal("show");

    }
   

    // }
  }
  IDtypeValidation1(idNum) {
    let obj = this.commonValid.IDtypeValidation(
      this.DeclarationFormGroup.value.idType,
      idNum
    );
    this.idErr1 = obj.flag;
    this.idMsg = obj.msg;
  }
  public matcher(event) {
    const allowedRegex = /[0-9]/g;

    if (!event.key.match(allowedRegex)) {
        event.preventDefault();
    }
}
  validateID2() {

if(!this.idErr1)
{
  let d;
    let currentdate;
    if (this.id1 === ""||this.id1 === undefined) {
      this.idErr1 = true;
      // this.idMsg = this.vatErr.e5;
      this.idMsg =this.lang.idMsg;
      if (this.dob1 === undefined && this.DeclarationFormGroup.controls.idType.value != "ZS0003") {
       // this.idErr1 = false;
        this.dobErr = true;
        // this.dobMsg = this.vatErr.e6;dobMsg
        this.dobMsg = this.lang.dobMsg;
      } 

    } else if (this.dob1 === undefined && this.DeclarationFormGroup.controls.idType.value != "ZS0003") {
      this.idErr1 = false;
      this.dobErr = true;
      // this.dobMsg = this.vatErr.e6;dobMsg
      this.dobMsg = this.lang.dobMsg;
    } else {
      this.dobErr = false;
      if (this.DeclarationFormGroup.controls.idType.value == "ZS0001" || this.DeclarationFormGroup.controls.idType.value == "ZS0002") {
        this.IDtypeValidation1(this.id1);
        d = this.dob1;
        // if (d.day < 10) {
        //   d.day = d.day;
        // }
        // if (d.month < 10) {
        //   d.month = d.month;
        // }
        console.log(d);
        currentdate = (d.calendarStart.year).toString() + ('0' + (d.calendarStart.month).toString()).slice(-2) + ('0' + (d.calendarStart.day).toString()).slice(-2);
        console.log(currentdate);
      }
      else {
        d = new Date();
        console.log(d);
        let year = (d.getFullYear()).toString();
        let month = ('0' + (d.getMonth() + 1).toString()).slice(-2);
        let day = ('0' + (d.getDate()).toString()).slice(-2);

        // let dateNow= new Date() ;
        currentdate = year + month + day;
        console.log(currentdate);
      }

      console.log(currentdate);

      let obj = {
        type: this.DeclarationFormGroup.value.idType,
        idNumber: this.id1,
      };
      if (!this.idErr1) {

        console.log(currentdate);
        this.requestToReleaseSecurity.getUserValidation(obj, currentdate).subscribe(
          (res) => {
            // this.tinErr = false;
            console.log("res", res);
            // this.iddErr = false;
            this.DeclarationFormGroup.controls["idNum"].setValue(
              res["d"]["Idnum"]
            );
            if ('FullName' in res['d'] && res['d']['FullName'] != "") {

              this.DeclarationFormGroup.controls["name"].setValue(
                res["d"]["FullName"]
              );
            }
            else if ('Name1' in res['d'] && res['d']['Name1'] != "") {
              this.DeclarationFormGroup.controls["name"].setValue(
                res["d"]["Name1"] + " " + res["d"]["Name2"]
              );

            }

            // if ('FullName' in res['d']) {

            //   this.DeclarationFormGroup.controls["name"].setValue(
            //     res["d"]["FullName"]
            //   );
            // }
            // else if ('Name1' in res['d']) {
            //   this.DeclarationFormGroup.controls["name"].setValue(
            //     res["d"]["Name1"] + " " + res["d"]["Name2"]
            //   );

            // }

            $("#aftSelect").modal("hide");

            //this.vatFormThirdGroup.get("Decname").disable();
            //this.notifierService.notify("success", "Valid ID Number");

            this.isIdValidated = true;
          },
          (err) => {
            console.log(err);
            this.isIdValidated = false;

            this.notifierService.notify(
              "error",
              err.error.error.innererror.errordetails[0].message
            );
          }
        );
      }
    }
}

  
  }

  reset() {
    this.idErr1 = false;
    this.dobErr = false;
    this.DeclarationFormGroup .controls.idType.setValue(null);
  }
  onIdNumChange()
  {

   if (this.DeclarationFormGroup.controls.idType.value == "ZS0003" && (this.DeclarationFormGroup.controls.idNum.value.length < 7 || this.DeclarationFormGroup.controls.idNum.value.length > 15)) {
     this.showIdNumError = true;
     this.isIdValidated = false;
   }
   else {
     this.showIdNumError = false;
     this.isIdValidated = true;
   }

 }
 
 IbanSelectorCardClicker(index)
 {
console.log(this.dataTorequestedReleaseSecurityLis.d.IBANSet.results[index].Iban);
this.securityDetailForm.controls.IbanNumber.setValue(this.dataTorequestedReleaseSecurityLis.d.IBANSet.results[index].Iban);
 console.log(this.securityDetailForm.get('IbanNumber').value);
}

getSubmitApi(operationCode) {
  this.requestToReleaseSecurity.getSubmitApi().subscribe(
    (res) => {
      this.submitRequestForReleaseSecurities(operationCode);
   
    },
    (err) => {
    }
  );
} 
GetFormattedSubmissionDate(date)
{
  console.log("Formatted Date : ",date )
  if(date!=="")
  {
    return  moment(date).locale('en').format("YYYY-MM-DD");
  } 
  else
  {
    return "";
  }
  
}
GetFormattedCreationDate(date)
{
  console.log("Formatted Date : ",date )
  if(date!=="" && date!=null)
  {
    return  moment(date).locale('en').format("YYYY-MM-DD");
  } 
  else
  {
    return "-";
  }
  
}
DownloadCertificateAcknowledgemnet()
{const fbnum= this.AfterSubmitAPIResponse.d.Fbnumz;
  const url = this.baseUrl +
  "sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='"
  + fbnum+
  "')/$value";
  window.open(url,"_self");
  console.log('Download Ack Url', url);

}
onSearchFocusIn() {
  this.showSearch = false;
}

onSearchHoverIn(){
  if(!this.searchText)
  {

  }
  else
  {
    if(this.searchText.length>0)
    {
      this.showSearch = false;
    }
  }
 
}

closeModal(cardType) {
  // console.log(' $("#aftsubmit").modal("show");');

  if (cardType === "terms") {
    this.isAgree = false
    $("#terms").modal("toggle");
  }
} 
onSearchFocusOut() {
  if ($("#SearchInput").is(":focus")) {
    
  }
  else
  {
    this.showSearch = true;
  }
  
}
changeLayoutType(type) {

  // type == grid or table 
  this.layoutType = type;

}
SubmissionDetailEditClicked()
{
this.optionActive=3;

}
TapayerDetailEditClicked()
{
  this.optionActive=2;
}
DeclarationPageEditClicked()
{
  this.optionActive= 4;
}
TermConditionDialogueContinueClicked()
{
  this.onSubmit1Flag=true;
  if(this.isAgree)
  {
    this.closeModal('terms');
    this.optionActive=2;
  }
  else
  {
    this.notifierService.notify("error", this.lang.pleasecorrectthehighlightedfields);
  }
 
}
GoToDashBoardClicked()
{

  
}

isSubmittedRequestPresent()
{

  if (!this.requestedReleaseSecurityList)
  {
    return true;
  }
   else 
  {
    if (this.requestedReleaseSecurityList.length > 0)
    {
      return false;
    }
    else
    {
      return true;
    }

  }
}

trimIban(Value)
{
  return !Value?"":"...." + Value.substr(-4);
}
transform(val) {
  return this.sanitizer.bypassSecurityTrustResourceUrl(val);
}


getBankName(value)
{
if(!value)
{
  return "";
}
else
{
  if(value.length>6)
  {
   let bankcd= value.substr(4,2);
      
    return this.IbanList.filter(x => x.Bnkcd == bankcd)[0].name;
  }
  else
  {
    return "";
  }

}
}
idnumberValueChange(value)
{
  if(value!=undefined && value!=null)
  {
  if(value.length === 10)
  {
    this.idErr1=false;
    if(this.DeclarationFormGroup.controls.idType.value=='ZS0001'&& value.substring(0,1)!= 1)
    {
      this.idErr1=true;
      this.idMsg=this.lang.NationalIDstartswith1;  

    }
    else if(this.DeclarationFormGroup.controls.idType.value=='ZS0002' &&value.substring(0,1)!= 2)
    {
      this.idErr1=true;
      this.idMsg=this.lang.IqamaIDstartswith2;  

    }

  }
  else
  {
    if(value.length>=1)
    {
      if(this.DeclarationFormGroup.controls.idType.value=='ZS0001'&& value.substring(0,1)!= 1)
      {
        this.idErr1=true;
        this.idMsg=this.lang.NationalIDstartswith1;  
  
      }
      else if(this.DeclarationFormGroup.controls.idType.value=='ZS0002' &&value.substring(0,1)!= 2)
      {
        this.idErr1=true;
        this.idMsg=this.lang.IqamaIDstartswith2;  
  
      }
      else
      {
        if(this.DeclarationFormGroup.controls.idType.value=='ZS0001')
        {
          this.idMsg=this.lang.NationalIDlengthis10digit;  
        }
        else if(this.DeclarationFormGroup.controls.idType.value=='ZS0002')
        {
          this.idMsg=this.lang.IqamaIDlengthis10digit;  
        }
        else
        {
          this.idMsg="ID length is to be 10"
        }
       
      }
    }
    else
    {
      if(this.DeclarationFormGroup.controls.idType.value=='ZS0001')
      {
        this.idMsg=this.lang.NationalIDlengthis10digit;  
      }
      else if(this.DeclarationFormGroup.controls.idType.value=='ZS0002')
      {
        this.idMsg=this.lang.IqamaIDlengthis10digit;  
      }
      else
      {
        this.idMsg="ID length is to be 10"
      }
    }
    this.idErr1=true;
  
  }
} 
console.log(value);
}

onInputBlur() {
  const name = this.DeclarationFormGroup.value.contactPersonName;
  this.DeclarationFormGroup.controls.name.setValue(name.trim());
}
showFilterDialogue()
{
  this.filterStatusValue=null;
  $("#filterModal").modal("show");
}
closeFilter()
{
  $("#filterModal").modal("hide");
}
applyFilter()
{
  if(this.filterStatusValue!=null)
  {
    if(this.filterStatusValue=='01')
    {
      this.requestedReleaseSecurityList=this.requestedReleaseSecurityListAll;
    }
    else
    {
      this.requestedReleaseSecurityList=this.requestedReleaseSecurityListAll.filter (x => x.Fbust == this.filterStatusValue);
    }
  }
  else
  {
    this.requestedReleaseSecurityList=this.requestedReleaseSecurityListAll; 
  }
  $("#filterModal").modal("hide")
}
nameValidator(event) {
    let name = event.target.value;
    name = name.replace(/[^\u0621-\u064Aa-zA-Z \s]/g, "");
    name = name.replace(/[\s]{2,}/g, " ");
    this.DeclarationFormGroup.controls.name.setValue(name);
    
  }

getBankLogo(value)
{
if(!value)
{
  return "";
}
else
{
  if(value.length>6)
  {
   let bankcd= value.substr(4,2);
      
    return this.IbanList.filter(x => x.Bnkcd == bankcd)[0].img;
  }
  else
  {
    return "";
  }

}
}
DownloadConfirmation(){
  const fbnum= this.viewOnlyModeRequestData.Fbnumz;
  const url = this.baseUrl +
  "sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='"
  + fbnum+
  "')/$value";
  window.open(url,"_self");

}
isOrangeStatus(statusCode)
{
  if(statusCode==undefined||statusCode==null||statusCode=='')
  {
    return false;
  }
  else
  {
    if(statusCode=='E0018'||statusCode=='E0015'||statusCode=='E0016'||statusCode=='E0071'||statusCode=='E0019'||statusCode=='E0021'||statusCode=='E0052'||statusCode=='E0053'||statusCode=='E0054'||statusCode=='E0041'||statusCode=='E0049'||statusCode=='E0050'||statusCode=='E0044'||
    statusCode=='E0061'||statusCode=='E0062'||statusCode=='E0063'||statusCode=='E0066'||statusCode=='E0067'||statusCode=='E0069'||statusCode=='E0083'||statusCode=='E0087')
    {
      return true;
    }
    else
    {
      return false;
    }

  }


}
isGreenStatus(statusCode)
{
  if(statusCode==undefined||statusCode==null||statusCode=='')
  {
    return false;
  }
  else
  {
    if(statusCode=='E0045'||statusCode=='E0048'||statusCode=='E0064'||statusCode=='E0065'||statusCode=='E0084'||statusCode=='E0085'||statusCode=='E0086')
    {
      return true;
    }
    else
    {
      return false;
    }
  }

}
isRedStatus(statusCode)
{
  if(statusCode==undefined||statusCode==null||statusCode=='')
  {
    return false;
  }
  else
  {
    if(statusCode=='E0051'||statusCode=='E0043'||statusCode=='E0088')
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
isGreyStatus(statusCode)
{
  if(statusCode==undefined||statusCode==null||statusCode=='')
  {
    return false;
  }
  else
  {
    if(statusCode=='E0013'||statusCode=='E0001'||statusCode=='E0018')
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}


}
