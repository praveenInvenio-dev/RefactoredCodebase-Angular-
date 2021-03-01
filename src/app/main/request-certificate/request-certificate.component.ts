import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { environment } from './../../../environments/environment';
import { D, RequestCertificate, SubmittedBillData, DropDownItem, SubmitedCertificateListObject, TaxyearDropDown } from './../../model/request-certificate.model';
import { RequestCertificateService } from 'src/app/services/request-certificate.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { requestCertificateConstants } from "src/app/constants/request-certificate-constants";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { LoaderService } from 'src/app/loader/loader.service';
import { AppService } from 'src/app/app.service';

declare var $: any;
@Component({
  selector: 'app-request-certificate',
  templateUrl: './request-certificate.component.html',
  styleUrls: ['./request-certificate.component.css']
})
export class RequestCertificateComponent implements OnInit {
  lang = requestCertificateConstants.eng;
  optionActive = 1;
  requestRulingFormGroup2: FormGroup = this._formBuilder.group({
    reportDetailNote: ['', Validators.required],
    docType: [""],
    doc: this._formBuilder.array([]),
  });
  isTaxYearValid = false;
  layoutType="grid";
  searchText;
 termAndConditionFlag=false;
  baseUrl = environment.url;
  headerComponent = CalendarComponent;
  bondsSubmitted = false;
  data: any = {};
  showSearch = true;
  dataForNewCertificate: any = {};
  dataForAlreadySubmittedCertificate: any = {};
  SubmitedCertificateList: SubmitedCertificateListObject[];
  submittedBilldata: SubmittedBillData;
   // submittedBilldatas:SubmittedBillData;'
  DataToSbmitRequest;
  DropDownItem: DropDownItem[];
  certificatetypeSummery: string;
  certificateyearSummery: string;
  certificateNumberSummery = new FormControl();
isRequestSubmitted = false;
selectedCertificate = null;
selectedYear = null;
  TaxYearDropDownItem: TaxyearDropDown[];
  certificateTypeHasError = false;
  TaxYearHasError = false;
  generatedFbNum;
  isViewOnly=false;
  isAgree = false;
  constructor(public appSrv: AppService,
    private _formBuilder : FormBuilder,
    public notifierService: NotifierService,
    public requestCertificateService: RequestCertificateService,public loaderService: LoaderService,private router: Router,
    ) { }

  ngOnInit(): void {
this.DataToSbmitRequest=new SubmittedBillData();
    if (localStorage.getItem("lang") === "ar") {
      this.lang = requestCertificateConstants.arb;

    }
  this.getRequestedCertificateListData();
  


  }
  resetFormDAta()
  {
    this.selectedCertificate=null;
    this.selectedYear=null;
   this.certificateTypeHasError=false;
   this.TaxYearHasError=false;
   this.certificateNumberSummery=new FormControl();
  }
  getRequestedCertificateListData() {
    this.requestCertificateService.getListOfSubmitedCertificateRequest().subscribe(
      (res) => {
        console.log("Requested certificate  list response is SUCCESS", res);
        this.data=res;
       this.SubmitedCertificateList=res["d"]["ListSet"]["results"] as SubmitedCertificateListObject[];
       console.log("this is the submitted list",this.SubmitedCertificateList);
    
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err['error']['error']['innererror']['errordetails'][0].message
        );
      }
    );
  }
  zakatServicesClicked()
  {
    
    this.appSrv.updatedDataSelection9('003');
    this.router.navigate(["/mains/tax"]);
  }
  zakatTaxCertificateClicked()
  {
    window.location.reload();
  }

  taxManagementClicked()
  {
    this.appSrv.updatedDataSelection9('');
    this.router.navigate(["/mains/tax"]);
  }//getAlreadySubmittedRequestDetails
  getAlreadySubmittedRequestDetails(listItemTapped) {
    this.requestCertificateService.getAlreadySubmittedRequestDetails(listItemTapped).subscribe(
      (res) => {
        
       this.getSubmittedReqAttachmentDetails(res['d']['Fbnum'])
        console.log("Submitted request certificate response is SUCCESS", res);
      },
      (err) => {
        console.error(err);
        let message = this.lang['somethingWentWrong'];
        this.notifierService.notify(
          "error" ,message
          
        );
   
      }
    );
  }  
  getSubmittedReqAttachmentDetails(fbNum) {
    this.requestCertificateService.getSubmittedReqAttachmentDetails(fbNum).subscribe(
      (res) => {
        this.dataForAlreadySubmittedCertificate=res;
        this.isViewOnly=true;
        this.optionActive=4;
        console.log("Submitted request Attachment Detail", res);
      },
      (err) => {
        console.error(err);
        let message = this.lang['somethingWentWrong'];
        this.notifierService.notify(
          "error" ,message
          
        );
   
      }
    );
  }  


  // getSubmittedReqAttachmentDetails(fbNum)

getDataForRequestingCertificate() {
  this.requestCertificateService.getDataForRequestingCertificate().subscribe(
    (res) => {

      console.log("request certificate response is SUCCESS", res);
      //this.dataForNewCertificate=res;
    this.DataToSbmitRequest=res["d"];
    this.isRequestSubmitted=true;
    this.isAgree=false;
    this.termAndConditionFlag=false;
    $("#terms").modal("show");
     
  
    },
    (err) => {
      console.error(err);
      let message = this.lang['somethingWentWrong'];
      this.notifierService.notify(
        "error" ,message
        
      );
 
    }
  );
}  


//getValueForCertificateTypeDropDown
getValueForCertificateTypeDropDown() {
  this.requestCertificateService.getValueForCertificateTypeDropDown().subscribe(
    (res) => {
      
    this.DropDownItem=res["d"]["results"] as DropDownItem[];
    this.DropDownItem= this.DropDownItem.filter (x => x.TransactionType == 'TP07_1');
    console.log(res);
    console.log( "DropDown Api Success" +this.DropDownItem);
   
    },
    (err) => {
      console.error(err);
      let message = err['error']['error']['innererror']['errordetails'][0].message;
      this.notifierService.notify(
        "error" ,message
        
      );
   // alert(message);
    }
  );
}  
getValueForTaxYearDropDown(taxTypeKEy) {
  this.requestCertificateService.getTaxYearDropDown(taxTypeKEy).subscribe(
    (res) => {
    console.log( "DropDownTaxType Api Success" +res);
    this.TaxYearDropDownItem=res["d"]["results"]as TaxyearDropDown[];
   
    },
    (err) => {
    }
  );
}  
submitRequestForCertificate() {
  this.requestCertificateService.submitRequestForCertificate(this.DataToSbmitRequest).subscribe(
    (res) => {
    console.log( "submit success " +res);
    this.generatedFbNum=res["d"]["Fbnumz"] as string;
    this.bondsSubmitted = true;
    },
    (err) => {
      console.error(err);
      let message = err['error']['error']['innererror']['errordetails'][0].message;
      this.notifierService.notify(
        "error" ,message
        
      );
   // alert(message);
    }

  );
}  
getTaxYearValidationForCertificate(Pkey) {
  this.requestCertificateService.getTaxYearValidationForCertificate(Pkey).subscribe(
    (res) => {
      
      this.isTaxYearValid = true;
    },
    (err) => {
      this.isTaxYearValid = false;

      this.notifierService.notify(
        "error",
        err['error']['error']['innererror']['errordetails'][0].message
      );
    }
  );
} 


changedCertificateType(e) {
  console.log(e.value);
  this.TaxYearDropDownItem=[];
  this.getValueForTaxYearDropDown(e.value.TransactionType);
  this.certificatetypeSummery=e.value.TrantypeText;
  this.DataToSbmitRequest.ACertificateTp =e.value.TransactionType;
  this.selectedCertificate=e.value;
  this.certificateTypeHasError=false;
}

changedTaxYear(e) {
  console.log("Tax Year Value",e.value.Persl);
  this.certificateyearSummery = e.value.Txt50;
  this.DataToSbmitRequest.APeriod = e.value.Persl;
  this.selectedYear = e.value;
  this.TaxYearHasError = false;
  this.isTaxYearValid=false;
  if(e.value.Persl!== "")
  {
    this.getTaxYearValidationForCertificate(e.value.Persl);
  }
  
}
DownloadCertificateAcknowledgemnet()
{
  const url = this.baseUrl +
  "sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='"
  + this.generatedFbNum +
  "')/$value";
  window.open(url,"_self");
  console.log('Download Ack Url', url);

}
downloadAckForSubmittedRequest()
{const url = this.baseUrl +
  "sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='"
  + this.dataForAlreadySubmittedCertificate.d.Fbnumz +
  "')/$value";
  window.open(url,"_self");
  console.log('Download Ack Url', url);

}
DownloadCertificateForm()
{
  const url = this.baseUrl +
  "sap/opu/odata/SAP/Z_GET_COVER_FORM_SRV/cover_formSet(Fbnum=''"
  + this.generatedFbNum +
  //+'040000004522'+
  "')/$value";
  window.open(url,"_self");
  console.log('Download Ack Url', url);

}



//  AttachmentUpload

uploadFile(res, fileSize) {

  let obj = {
    name: res['d']['Filename'],
    size: fileSize,
    id: "RAGA",
    flag: true,
    url: res["d"]["DocUrl"],
    did: res["d"]["Doguid"]

  };

  let control = <FormArray>this.requestRulingFormGroup2.controls.doc;

  control.push(this._formBuilder.group(obj));

  console.log(this.requestRulingFormGroup2.controls.doc);



}
GetVisibilityOfAddAttachment()
{
  if(this.requestRulingFormGroup2.controls.doc.value.length > 0)
{
  return false;
}
else
{
  return true;
}
}
getAttachmentSize(inKb)
{
  
  if(inKb!=="")
  {
    let bytes= inKb * 10000;
    let sizeInMB = (bytes / (1024 * 1024)).toFixed(2);
    return   sizeInMB + "MB";
  }
  else
{
  return "";
}

}
deleteAttachmentFromSer(dotyp, doguid, index) {
  this.requestCertificateService.deleteAttachment(dotyp, doguid).subscribe((res) => {
    console.log("delete", res);
    let control = <FormArray>this.requestRulingFormGroup2.controls.doc;
    control.removeAt(index);
  }, (err) => {
    console.log("err in delete attachement");

  });
}
public showLoader(): void {
  this.loaderService.show();
}
public hideLoader(): void {
  this.loaderService.hide();
}

uploadFiles(e) {
  this.showLoader();
  let control = <FormArray>this.requestRulingFormGroup2.controls.doc;
  const frmData = new FormData();
  let filename;
  let size;
console.log("Form Array Attachment",this.requestRulingFormGroup2.controls.doc.value); 
if(this.requestRulingFormGroup2.controls.doc.value.length > 0)
{this.notifierService.notify("error", this.lang['maximumnoofallowedattachments']);
  this.hideLoader();
  return false;
}
  for (var i = 0; i < 1; i++) {
    console.log(e[i])
    if (e[i] == undefined) {
      this.hideLoader()
      return false
    }
    filename = e[i]['name'];
    const parseExt = filename.split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();

    if (filename.length > 100) {
      this.notifierService.notify("error", this.lang['fileNameLarge']);
      this.hideLoader();

      return false;
    }

    if (fileExt !== 'doc' && fileExt !== 'docx' && fileExt !== 'jpeg' && fileExt !== 'jpg' && fileExt !== 'pdf' && fileExt !== 'xls' && fileExt !== 'xlsx') {
      this.notifierService.notify("error", this.lang['uploadFileWithAllowedExtensionOnly']);
      this.hideLoader();

      return false;
    }
    if (e[i]['size'] ==0) {
     this.notifierService.notify("error", this.lang['zeroKbFileError']);
      this.hideLoader();

      return false;
    }
    if (e[i]['size'] > 10485760) {
      this.notifierService.notify("error", this.lang['filesizeshouldbelessthanXMB']);
      this.hideLoader();

      return false;
    }
    console.log(control.value)
    const fileIndex = control.value.findIndex(file => filename === file['name']);
    if (fileIndex > -1) {
      this.notifierService.notify("error", this.lang['fileWithSameNameExits']);
      this.hideLoader();

      return false;
    }

    size = e[i].size / 10000;
    frmData.append("fileUpload", e[i]);
  }
  console.log("res", filename, e[i]);
  console.log(control);
  // console.log(idd);

  console.log('Data to submit ',this.DataToSbmitRequest['CaseGuid']);
  let stringFileName=filename.split(".");
  let fileNameToSend=encodeURI(stringFileName[0]) +"."+stringFileName[1];
  this.requestCertificateService
    .attachmentSubmit(
      this.DataToSbmitRequest['CaseGuid'],
      // control.controls[idd].value.id,
      "N07A",
      fileNameToSend,
      frmData
    )
   
    .subscribe(
      (res) => {
        console.log("upload", res);


        this.uploadFile(res, size);
        this.hideLoader();
        // control.controls[idd]["controls"].name.setValue(filename);

        //control.controls[idd].value.id
        // this.notifierService.notify(
        //   "success",
        //   "Successfully uploaded the file"
        // );
      },
      (err) => {
        this.hideLoader()
        this.notifierService.notify(
          "error",
          err['error']['error']['innererror']['errordetails'][0].message
        );
      }
    );




}



onSubmit() {
  this.resetFormDAta();
//  this.optionActive = 2;

  this.getDataForRequestingCertificate();
  this.getValueForCertificateTypeDropDown() ;
  }
  // ZakatTaxCertificateClicked()
  // {
  //   this.bondsSubmitted = false;
  //   this.optionActive = 1;
  
  // }
  onSubmit2() {
    let flag=true;
    if(this.selectedCertificate == null||this.selectedCertificate.TransactionType.trim()=='')
    {
      flag    = false;
      this.certificateTypeHasError=true;
    }
    if(this.selectedYear==null||this.selectedYear.Persl.trim()==''||!this.isTaxYearValid)
    {
      flag=false;
      this.TaxYearHasError=true;
    }
    if(flag)
    {
      this.optionActive = 3;
    } 
  }

  onSubmit3() {
    this.optionActive = 4;
  }

  onSubmit4() {
  this.DataToSbmitRequest.ACertificateNum=this.certificateNumberSummery.value;
this.submitRequestForCertificate() ;

  }

  onSubmit5() {
    this.optionActive = 6;
  }

  back() {
    if(this.isViewOnly)
    {
      window.location.reload();
    }
    else
    {
      if (this.optionActive > 1) 
    {
      this.optionActive--;
    }
    else
    {
      this.appSrv.updatedDataSelection9('003');
      this.router.navigate(["/mains/tax"]);
    }
    }
    
  }

  certificateDetailEdit()
  {
    this.optionActive = 2;
  }
  editAttachment()
  {
    this.optionActive = 3;

  }
  changeLayoutType(type) {

    // type == grid or table 
    this.layoutType = type;

  }
  closeModal(cardType) {
    // console.log(' $("#aftsubmit").modal("show");');

    if (cardType === "terms") {

      $("#terms").modal("toggle");
    }

  


  }
  startProcess() {
    this.termAndConditionFlag=true;
    if(this.isAgree)
    {
      this.closeModal('terms');
    this.optionActive = 2;
    }
    
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
  landindPageListItemTapped(listItem)
  {
   this.getAlreadySubmittedRequestDetails(listItem);
  }
  onSearchFocusOut()
   {
    if ($("#SearchInput").is(":focus")) {
    
    }
    else
    {
      this.showSearch = true;
    }
   
    
  }
  isPdf(fileName) {
    const parseExt = fileName.split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();
    return fileExt.toLowerCase() === 'pdf';
  }
  downloadAttachemnt(url)
  {
    window.open(url,"_self");
  }
  isListEmptyCheck()
  {
    if(!this.SubmitedCertificateList)
   {
     return true;
   }
   else
   {
    if(this.SubmitedCertificateList.length>0)
    {
      return false;
    }
    else
    {
      return true;
    }
   }
  }
}