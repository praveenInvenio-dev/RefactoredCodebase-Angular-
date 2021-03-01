import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { VatServicesService } from '../vat-services.service';
import { vatderegistrationconstants } from "src/app/main/vat-services/vat-deregistration-details/vatderegistrationconstants.model";
import { CommonValidation } from 'src/app/constants/commonValidations';
import { NotifierService } from 'angular-notifier';
import { AppService } from 'src/app/app.service';
import { CalendarComponent } from "src/app/constants/calendar.component";
import * as FileSaver from 'file-saver';
import * as moment from 'moment';

declare var $;
@Component({
  selector: 'app-vat-deregistration-details',
  templateUrl: './vat-deregistration-details.component.html',
  styleUrls: ['./vat-deregistration-details.component.css']
})
export class VatDeregistrationDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild('infoModal', {static: false}) infoModal:ElementRef;

  InstructionFormGroup: FormGroup = new FormGroup({});
  DeregisterFormGroup: FormGroup = new FormGroup({});
  DeclarationFormGroup: FormGroup = new FormGroup({});
  AttchmentFormGroup: FormGroup = new FormGroup({});
  IdTypeOwnerShipFormgroup: FormGroup;
  headerComponent = CalendarComponent;

  StringPattern = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";//"[a-zA-Z \s]*$";//
  NumberPattern = "^[0-9]*$";
  ContactNoPattern = "[5][0-9]{8}";
  

  FilesizeError: boolean = false;
  enddate: any;
  id1: string;
  errorMessage: any;
  dob1: any;
  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 1;
  CurrentDate = new Date();
  WholeData: any;
  WholeDatadetails: any;
  ReferenceNo: any;
  Status: any;
  ReturnId: any;
  UserTypx: any;
  RequestTypeValue: string;
  TransactionType: string;
  RequestName: string;
  Reasons: any;
  ReasonValue: any;
  ShowReasonOthers: boolean = false;
  ICRDate: any;
  SuspensionDetails: any;
  StartDate: string;
  EndDate: string;
  SuspensionFrom: any;
  SuspensionTo: any;
  NextFillingFrom: any;
  NextFillingTo: any;
  DueDate: any;
  AttachmentSelectList: any;
  AttachFiles: any[] = [];
  AttachmentRows: any[] = [];
  FinalAttachmentsList: any[] = [];
  IdTypeName: string;
  ValidateIdNo: any;
  IdTypeList: any;
  LastICRErrorMsg: any;
  SuspensionDetailsErrorMsg: any;
  OtherReasonValue: any;
  lang:any;
  direction: string;
  Address: any;
  isNationalValidNumber: boolean = false;
  isIqamaValidNumber: boolean = false;
  isNationalEnterValidNumber:boolean=false;
  isIqamaEnterValidNumber:boolean=false;
  isConfirm:boolean=false;
  FullName: any;
  rejectionStatus:boolean=false;
  AttachmentTypeName:any;

  DeregisterData = new DeregisterDetailsModel();
  DeclarationData = new DeclarationDetailsModel();
  AcknowledgementData = new AcknowledgementDetailsModel();


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private vatServices: VatServicesService,
    public commonValidation: CommonValidation,
    public notifierService: NotifierService,
    public appSrv: AppService
    ) { 
    this.GPartz = localStorage.getItem('gpart');

    if (localStorage.getItem("lang") === "ar") {
      this.lang = vatderegistrationconstants.langz.arb.vatderegistration;
      this.direction = vatderegistrationconstants.langz.arb.dir;
            this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = vatderegistrationconstants.langz.eng.vatderegistration;
      this.direction = vatderegistrationconstants.langz.eng.dir;
            this.Direction = "ltl";
      this.Language = "E";
    }
  }

  ngOnInit() {
    this.appSrv.data1.subscribe((res) => {
      this.enddate = this.commonValidation.dateFormate(
        this.commonValidation.toJulianDate(new Date()),
        res
      );
    });
    
    
    this.IdTypeOwnerShipFormgroup = new FormGroup({
      Idnumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(10)]),
      Dob: new FormControl(undefined, [Validators.required]),
    });
    this.declarationFormControls();
    
    this.vatServices.getWholeData(this.GPartz, this.Language).subscribe(data => {
      if(data) {
        console.log('data', data["d"]);
        this.WholeData = data["d"];
        //this.requestType(this.WholeData.Reqtp);
        this.WholeDatadetails= data["d"];
        this.Status = data["d"].Statusx;
        this.ReturnId = data["d"].ReturnIdx;
        this.UserTypx = data["d"].UserTypx;
        this.WholeData.Taxdt =new Date(+this.WholeData.Taxdt.substr(6, 13)).toISOString().slice(0, 19);//new Date(+this.WholeData.Taxdt.substr(6, 13));
        this.Address = {
          Addr: `${data["d"].AddressSet.results[0].Building} ${data["d"].AddressSet.results[0].Street} ${data["d"].AddressSet.results[0].HouseNum1} ${data["d"].AddressSet.results[0].Region} ${data["d"].AddressSet.results[0].City1} ${data["d"].AddressSet.results[0].PostCode1}`
        };
        if(this.WholeData.Fbustx=="E0018"){
          this.rejectionStatus=true;
        }
        this.getbindsavedraft(this.WholeData);
        
        
      }
    }, (error) => {
      console.log('err', error);
      this.router.navigate(['/mains/tax']);
    });

    this.stepsChecking();
  }
  getbindsavedraft(value){
    if(this.rejectionStatus==true){
    this.DeclarationFormGroup.patchValue({
      idNumber:value.Idnumbr,
      idType:value.Type,
      name:value.Contactnm
    })
    // this.DeregisterFormGroup.patchValue({
    //   reason:value.Reason     
    // })
    // this.onReasonSelected(value.Reason);
  }
    
    
     /* let startDt;
      let endDt;
    this.DeclarationFormGroup.patchValue({
      idNumber:value.Idnumbr,
      idType:value.Type,
      name:value.Contactnm
    })
    
    moment.locale('en-Us');
    if (this.WholeData.StartDate !== undefined && this.WholeData.StartDate !== "" && this.WholeData.StartDate !== null) {
      if (this.WholeData.StartDate.includes('/Date')) {

        startDt = moment(new Date(+(((this.WholeData.StartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
      
        if (this.Language === 'E') {
          startDt = this.commonValidation.toJulianDate1(new Date(startDt));
        }
        else {
          startDt = this.commonValidation.toJulianDate1(new Date(startDt));
          startDt = (this.commonValidation.dateFormate(startDt, "Islamic"))
          //  startDt = this.commonValidation.getArabicFormat(new Date(startDt));
        }
      }
      else {
        startDt = this.datePickerValue(this.WholeData.StartDate);
       
      }
    } else {
      startDt = this.CurrentDate.toISOString().slice(0, 19);
     
    }
    if (this.WholeData.EndDate !== undefined && this.WholeData.EndDate !== "" && this.WholeData.EndDate !== null) {
      if (this.WholeData.EndDate.includes('/Date')) {

        endDt = moment(new Date(+(((this.WholeData.EndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
      
        if (this.Language === 'E') {
          endDt = this.commonValidation.toJulianDate1(new Date(endDt));
        }
        else {
          endDt = this.commonValidation.toJulianDate1(new Date(endDt));
          endDt = (this.commonValidation.dateFormate(endDt, "Islamic"))
          //  startDt = this.commonValidation.getArabicFormat(new Date(startDt));
        }
      }
      else {
        endDt = this.datePickerValue(this.WholeData.EndDate);
       
      }
    } else {
      endDt = this.CurrentDate.toISOString().slice(0, 19);
     
    }   
    this.DeregisterFormGroup.patchValue({
      reason:value.Reason,
      startDate:startDt,
      endDate:endDt
      this.bindingAttachment();
    })
   */
   
   
   
  }
  bindingAttachment() {
    var attahmentata = this.WholeData.AttdetSet.results
    var list=this.AttchmentFormGroup.get('attachControls') as FormArray;
    list.controls[0].patchValue({
      attachmentType:attahmentata[0].Dotyp
    })
    // this.AttchmentFormGroup.controls[0].patchValue({
    //   "attachmentType":attahmentata[0].Dotyp
    // })
  // this.AttachmentSelectList.DmsTp=attahmentata[0].Dotyp;
    if (attahmentata.length > 0) {
      for (let i = 0; i < attahmentata.length; i++) {
        if (attahmentata[i].Dotyp == 'ZVTI') {
          var file = attahmentata[i].Filename;
          var fileName = file.split(".");
          var obj = { Filename: '', name: '', size: 0, type: '', url: '', did: '', Doguid: '' };
          obj.Filename = attahmentata[i].Filename;
          obj.name = fileName[0];
          obj.size = 0;
          obj.type = fileName[1];
          obj.did = attahmentata[i].Doguid;
          this.AttachFiles.push([obj]);
       }
      
        // if (attahmentata[i].Dotyp == 'WA02') {
        //   var file = attahmentata[i].Filename;
        //   var fileName = file.split(".");
        //   var obj = { Filename: '', name: '', size: 0, type: '', url: '', did: '', Doguid: '' };
        //   obj.Filename = attahmentata[i].Filename;
        //   obj.name = fileName[0];
        //   obj.size = 0;
        //   obj.type = fileName[1];
        //   obj.did = attahmentata[i].Doguid;
        //   this.DimensionAttachFiles.push(obj);
        // }
      }
    }
    console.log('arr- WA01 error uploa', this.AttachFiles);
   // console.log('arr- WA02 error uploa', this.DimensionAttachFiles);


  }
 
  DownloadFormMethod() {
    let fnumb =this.ReferenceNo;
    this.vatServices.downloadfilledform(fnumb).subscribe((data: any) => {

      FileSaver.saveAs(data, "DeregisterofVatForm.pdf");

    }, (error) => {
      console.log('err-2', error);
    });
  }
  
  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.instructionFormControls();
        break;
      case 2:
        if(this.rejectionStatus==false){
          this.requestType('D');
        }
        else{
          this.requestType('S');
        }
        break;
      case 3:
        this.getAttachmentList();
        break;
      case 4:
        this.getDeclarationDetails();
        break;
      case 5:
        
        break;
      case 6:
      
        break;
      default:
        break;
    }
    
    return this.Step;
  }

  requestType(value) {
    this.RequestTypeValue = value;
    if(value == 'D') {
      this.TransactionType = "VT_DREG";
      if(this.Language=="E"){
      this.RequestName = "De-registration of VAT Account";
      }
      else{
        this.RequestName = "إلغاء تسجيل حساب ضريبة القيمة المضافة";
      }
    }
    else {
      this.TransactionType = "VT_SUSP";
      if(this.Language=="E"){
      this.RequestName = "VAT Return Filing Obligation Suspension";
      }
      else{
        this.RequestName = "تعليق الالتزام برفع ضريبة القيمة المضافة";
      }
    }
    this.reasonsFetchingData();
    this.requestOption();
  }

  requestOption() {
    if(this.RequestTypeValue == 'D') {
      return this.deRegisterFormControls();
    }
    else {
      return this.oblegationSuspensionFormControls();
    }
  }

  reasonsFetchingData() {
    this.vatServices.getReasonsData(this.Language, this.TransactionType).subscribe(data => {
      if(data) {
        console.log('reason-data', data["d"]);
        this.Reasons = data["d"].results;
      }
    }, (error) => {
      console.log('err', error);
    });

    return this.Reasons;
  }

  /* starting step-1 code */
  instructionFormControls() {
    this.InstructionFormGroup.addControl('agree', new FormControl(false, [Validators.required]));
    $('#infoModal').modal('show');
  }

  termsAndConditionsOfInstructionAcceptance() {
    $('#infoModal').modal('hide');
  }

  setTaxpayerDetails() {
    this.Step = 1;
  }

  continueFirstScreen() {
    const obj1 = this.deRegisterDetails();
    if(obj1.ReqType !== undefined) {
      this.Step = 2;
    }
    else  {
      this.step2();
    }
  }
  /* ending step-1 code */

  /* starting step-2 code */
  deRegisterFormControls() {
    this.removeDeregisterControls();
    this.DeregisterFormGroup.addControl('reason', new FormControl('', [Validators.required]));
  }

  oblegationSuspensionFormControls() {
    this.removeDeregisterControls();
    this.DeregisterFormGroup.addControl('reason', new FormControl('', [Validators.required]));
    this.DeregisterFormGroup.addControl('startDate', new FormControl('', [Validators.required]));
    this.DeregisterFormGroup.addControl('endDate', new FormControl('', [Validators.required]));
  }

  setDeRegisterFormControls() {
    this.InstructionFormGroup.addControl('agree', new FormControl(this.DeregisterData.Agreeflg, [Validators.required]));
    this.DeregisterFormGroup.addControl('reason', new FormControl(this.DeregisterData.Reason, [Validators.required]));
    if(this.RequestTypeValue == 'S') {
      this.DeregisterFormGroup.addControl('startDate', new FormControl(this.DeregisterData.StartDate, [Validators.required]));
      this.DeregisterFormGroup.addControl('endDate', new FormControl(this.DeregisterData.EndDate, [Validators.required]));
      this.SuspensionFrom = this.DeregisterData.SusFrom;
      this.SuspensionTo = this.DeregisterData.SusTo;
      this.NextFillingFrom = this.DeregisterData.NextFilFrom;
      this.NextFillingTo = this.DeregisterData.NextFilTo;
      this.DueDate = this.DeregisterData.DueDate;
    }
    this.otherOptionSelection('edit');
    this.Step = 2;
  }

  startEvent(event) {
    let day = event.value.calendarStart.day;
    let month = event.value.calendarStart.month;
    let year = event.value.calendarStart.year;
    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;
    const startDate = `${year}-${month}-${day}T00:00:00`;
    console.log('startDate', startDate);
    this.StartDate = startDate;
    this.suspensionICRDate();
    setTimeout(() => {
      if(this.ICRDate !== undefined) {
        let icrdateConvert = new Date(+this.ICRDate.Lasticrdt.substr(6, 13));
        let LastICRDate = icrdateConvert.toISOString().slice(0, 19);
        console.log('date-conversion', LastICRDate);
        if(startDate <= LastICRDate) {
          this.DeregisterFormGroup.controls['startDate'].setErrors({ 'invalid': true });
        }
      }
      else {
        this.DeregisterFormGroup.controls['startDate'].setErrors({ 'error': true });
      }
    }, 5000);
  }

  endEvent(event) {
    if(this.ICRDate !== undefined) {
      let icrdateConvert = new Date(+this.ICRDate.Lasticrdt.substr(6, 13));
      let LastICRDate = icrdateConvert.toISOString().slice(0, 19);
      console.log('date-conversion', LastICRDate);
      let day = event.value.calendarStart.day;
      let month = event.value.calendarStart.month;
      let year = event.value.calendarStart.year;
      day = day < 10 ? `0${day}` : day;
      month = month < 10 ? `0${month}` : month;
      const endDate = `${year}-${month}-${day}T00:00:00`;
      console.log('endDate', endDate);
      if(endDate <= LastICRDate || endDate <= this.StartDate) {
        this.DeregisterFormGroup.controls['endDate'].setErrors({ 'invalid': true });
      }
      this.EndDate = endDate;
      this.suspensionData();
    }
    else {
      this.DeregisterFormGroup.controls['endDate'].setErrors({ 'icrDate': true });
    }
  }

  suspensionICRDate() {
    this.vatServices.getICRDate(this.GPartz, this.RequestTypeValue, this.UserTypx).subscribe(data => {
      if(data) {
        console.log('icr-date', data["d"].results[0]);
        this.ICRDate = data["d"].results[0];
      }
    }, (error) => {
      console.log('err', error.error.error.innererror.errordetails[0].message);
      this.LastICRErrorMsg = error.error.error.innererror.errordetails[0].message;
    });

    return this.ICRDate;
  }

  suspensionData() {
    this.vatServices.getSuspensionDetails(this.GPartz, this.StartDate, this.EndDate).subscribe(data => {
      if(data) {
        console.log('suspension-data', data["d"].results[0]);
        this.SuspensionDetails = data["d"].results[0];
        this.SuspensionFrom = data["d"].results[0].SuspDtfrom !== undefined && data["d"].results[0].SuspDtfrom !== null ? new Date(+data["d"].results[0].SuspDtfrom.substr(6, 13)).toISOString().slice(0, 19) : undefined;
        this.SuspensionTo = data["d"].results[0].SuspDtto !== undefined && data["d"].results[0].SuspDtto !== null ? new Date(+data["d"].results[0].SuspDtto.substr(6, 13)).toISOString().slice(0, 19) : undefined; 
        this.NextFillingFrom = data["d"].results[0].NextDtfrom !== undefined && data["d"].results[0].NextDtfrom !== null ? new Date(+data["d"].results[0].NextDtfrom.substr(6, 13)).toISOString().slice(0, 19) : undefined;
        this.NextFillingTo = data["d"].results[0].NextDtto !== undefined && data["d"].results[0].NextDtto !== null ? new Date(+data["d"].results[0].NextDtto.substr(6, 13)).toISOString().slice(0, 19) : undefined;
        this.DueDate = data["d"].results[0].Duedate !== undefined && data["d"].results[0].Duedate !== null ? new Date(+data["d"].results[0].Duedate.substr(6, 13)).toISOString().slice(0, 19) : undefined;
      }
    }, (error) => {
      console.log('err', error.error.error.innererror.errordetails[0].message);
      this.SuspensionDetailsErrorMsg = error.error.error.innererror.errordetails[0].message;
      this.DeregisterFormGroup.controls['endDate'].setErrors({ 'error': true });
      this.SuspensionFrom = undefined;
      this.SuspensionTo = undefined; 
      this.NextFillingFrom = undefined;
      this.NextFillingTo = undefined;
      this.DueDate = undefined;
    });

    return this.SuspensionDetails;
  }

  onReasonSelected(value) {
    for(let i=0; i<this.Reasons.length; i++) {
      if(value == this.Reasons[i].Reason) {
        this.ReasonValue = this.Reasons[i].Rdesc;
      }
    }
    this.otherOptionSelection('add');
  }

  otherOptionSelection(value) {
    let otherValue;
    if(value == 'edit') {
      let RsValue = this.DeregisterData.Others !== undefined && this.DeregisterData.Others !== "" ? this.DeregisterData.Others.join("\n") : '';
      otherValue = RsValue;
    }
    else {
      otherValue = '';
    }
    if(this.ReasonValue == "Others (please specify)") {
      this.ShowReasonOthers = true;
      this.DeregisterFormGroup.addControl('others', new FormControl(otherValue, [Validators.required]));
    }
    else {
      this.ShowReasonOthers = false;
      this.DeregisterFormGroup.removeControl('others');
    }
  }

  deRegisterDetails() {
    const InstructionFormValues = this.InstructionFormGroup.value;
    const DeregisterFormValues = this.DeregisterFormGroup.value;
    this.DeregisterData.Agreeflg = InstructionFormValues.agree;
    this.DeregisterData.ReqType = this.RequestTypeValue;
    this.DeregisterData.Reason = DeregisterFormValues.reason;
    this.DeregisterData.Others = DeregisterFormValues.others !== undefined && DeregisterFormValues.others !== "" ? DeregisterFormValues.others.split('\n') : '';
   if(this.StartDate!=null && this.StartDate!=undefined){
    let startDate=this.StartDate;
    this.DeregisterData.StartDate = startDate !== undefined ? startDate : null;
   }
   if(this.EndDate!=null && this.EndDate!=undefined){    
    let endDate=this.EndDate;
    this.DeregisterData.EndDate = endDate !== undefined ? endDate : null; 
   }
   if(this.SuspensionFrom!=null && this.SuspensionFrom!=undefined){
    let suspensionFrom=this.SuspensionFrom;
    this.DeregisterData.SusFrom = suspensionFrom !== undefined ? suspensionFrom : null; 
   }
   if(this.SuspensionTo!=null && this.SuspensionTo!=undefined){
    let suspensionTo=this.SuspensionTo;
    this.DeregisterData.SusTo = suspensionTo !== undefined ? suspensionTo : null;
   }
   if(this.NextFillingFrom!=null && this.NextFillingFrom!=undefined){
    let nextFillingFrom=this.NextFillingFrom;
    this.DeregisterData.NextFilFrom = nextFillingFrom !== undefined ? nextFillingFrom : null;
   }
   if(this.NextFillingTo!=null && this.NextFillingTo!=undefined){
    let nextFillingTo=this.NextFillingTo;
    this.DeregisterData.NextFilTo = nextFillingTo !== undefined ? nextFillingTo : null;
   }
   if(this.DueDate!=null && this.DueDate!=undefined){
    let dueDate=this.DueDate;
    this.DeregisterData.DueDate = dueDate !== undefined ? dueDate : null;
   }
    this.OtherReasonValue = this.reasonTextareaResult();
    return this.DeregisterData;
  }

  continueSecondScreen() {
    const objData = this.deRegisterDetails();
    console.log('sc2', objData);
    if(this.attachRowControls() && this.attachRowControls().length > 0) {
      this.Step = 3;
    }
    else  {
      this.step3();
    }
  }

  saveDeregisterDetails() {
    this.deRegisterDetails();
    this.WholeData.Agreeflg = this.DeregisterData.Agreeflg;
    this.WholeData.Reqtp = this.DeregisterData.ReqType;
    this.WholeData.Reason = this.DeregisterData.Reason;
    this.WholeData.StartDate = this.DeregisterData.StartDate;
    this.WholeData.EndDate = this.DeregisterData.EndDate;
    this.WholeData.SuspDtfrom = this.DeregisterData.SusFrom;
    this.WholeData.SuspDtto = this.DeregisterData.SusTo;
    this.WholeData.NextDtfrom = this.DeregisterData.NextFilFrom;
    this.WholeData.NextDtto = this.DeregisterData.NextFilTo;
    this.WholeData.Duedate = this.DeregisterData.DueDate;
    this.WholeData.NotesSet["results"] = this.OtherReasonValue;
    this.WholeData.Operationx = '05';
    // call service to save details as draft and redirect to next page.
    this.vatServices.saveVatServicesDetails(this.WholeData).subscribe(data => {
      if(data) {
        console.log('deregister-save', data["d"]);
        
        this.notifierService.notify(
          "success",
          "Deregister of VAT Form saved successfully"
        );
      }
    });
  }

  removeInstructionControls() {
    this.InstructionFormGroup.removeControl('agree');
  }

  removeDeregisterControls() {
    this.DeregisterFormGroup.removeControl('reason');
    this.DeregisterFormGroup.removeControl('startDate');
    this.DeregisterFormGroup.removeControl('endDate');
    this.DeregisterFormGroup.removeControl('others');
  }
  /* ending step-2 code */

  /* starting step-3 code */
  getAttachmentList() {
    this.AttchmentFormGroup = this.formBuilder.group({
      attachControls: this.formBuilder.array([])
    });

    this.vatServices.getAttachmentDropDownDetails(this.GPartz, this.Language, this.TransactionType, this.Status).subscribe(data => {
      if(data) {
        console.log('attah-drop-down', data["d"].ELGBL_DOCSet.results);
        this.AttachmentSelectList = data["d"].ELGBL_DOCSet.results;
      }
    }, (error) => {
      console.log('err', error);
    });

    if(this.attachRowControls().length == 0) {
      this.addAttachmentRow();
    }
  }

  attachRowControls(): FormArray {
    return this.AttchmentFormGroup.get("attachControls") as FormArray
  }

  addAttachmentRow() {
    this.attachRowControls().push(this.createAttachmentFormControls());
  }

  createAttachmentFormControls(): FormGroup {
    return this.formBuilder.group({
      attachmentType: this.formBuilder.control('', [Validators.required])
    });
  }

  deleteAttachmentRow(i) {
    let control = <FormArray>this.AttchmentFormGroup.controls.attachControls;
    if (this.attachRowControls().length > 1) {
      control.removeAt(i);
      this.AttachFiles.splice(i, 1);
    }
  }

  deleteAttachment(j, i) {
    this.AttachFiles[i].splice(j, 1);
  }

  onAttchTypeSelection(value, k) {
    if(value !== "") {
      var count = 0;
      if(this.AttchmentFormGroup.controls.attachControls.value.length > 1) {
        this.AttchmentFormGroup.controls.attachControls.value.forEach(element => {
          if(value == element.attachmentType) {
            count++;
          }
        });
      }
      if(count <= 1) {
        this.attachRowControls().at(k).setErrors(null);
      }
      else {
        this.attachRowControls().at(k).setErrors({ 'invalid': true });
      }
    }
  }

  uploadFile(event, k) {
    let AttachType = this.attachRowControls().at(k).value.attachmentType;
   if(AttachType!=""){
    let AttachTypeName;
    for(let b=0; b<this.AttachmentSelectList.length; b++) {
      if(AttachType == this.AttachmentSelectList[b].DmsTp) {
        AttachTypeName = this.AttachmentSelectList[b].Txt50;
      }
    }
    this.AttachmentTypeName=AttachTypeName;

    var obj = { name: '', size: 0, type: '', docType: '', attachTypeName: '',  url: '', did: '' };
    for (let i = 0; i < event.length; i++) {
      const element = event[i];
      obj.name = element.name.split(".")[0];
      obj.size = element.size / 1000000;
      obj.type = element.name.split(".")[1];
      obj.docType = AttachType;
      obj.attachTypeName = AttachTypeName;
    }
    for(let j = 0; j <= this.AttachFiles.length; j++) {
      if(j == k) {       
        if (obj.type.toLowerCase() == 'doc' || obj.type.toLowerCase() == 'docx' || obj.type.toLowerCase() == 'xls' || obj.type.toLowerCase() == 'xlsx' || obj.type.toLowerCase() == 'pdf' || obj.type.toLowerCase() == 'jpg') {
        if (obj.size > 0 && obj.size <= 5) {
        if(!this.AttachFiles[k]) {
          this.AttachFiles.push([obj]);
        }
        else {
          this.AttachFiles[k].push(obj);
        }
        this.FilesizeError = false;
      }
      else{
       // this.FilesizeError = true;
        this.notifierService.notify("error", `${this.lang.nav1.filevalidationmsg}`);
        $("#errorInstructions").modal("show");
      }
    }
    else{ 
     if (obj.type.toLowerCase() != 'doc' && obj.type.toLowerCase() != 'docx' && obj.type.toLowerCase() != 'xls' && obj.type.toLowerCase() != 'xlsx' && obj.type.toLowerCase() != 'pdf' && obj.type.toLowerCase() != 'jpg') {
        this.notifierService.notify("error", `${this.lang.nav1.fileformatsupportmsg}`);
        $("#errorInstructions").modal("show");
      }
    }
      
    }
    }
    console.log ('AttachFiles', this.AttachFiles);
    this.uploadFiles();
   }else{
      this.notifierService.notify("error", `${this.lang.nav1.fileAttachType}`);
   }
  }

  uploadFiles() {
    const frmData = new FormData();
    let fileName;
    let docType;
    for (var i = 0; i < this.AttachFiles.length; i++) {
      fileName = `${this.AttachFiles[i][0]["name"]}.${this.AttachFiles[i][0]["type"]}`;
      docType = this.AttachFiles[i][0]["docType"];
      frmData.append("fileUpload", this.AttachFiles[i][0]);
    }
    console.log("res", fileName, this.AttachFiles[0][0]);
    this.vatServices.postAttachmentDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
      if(data) {
        console.log('attch-data', data["d"]);
        for(let h=0; h<this.AttachFiles.length; h++) {
          if(this.AttachFiles[h][0].url == '') {
            this.AttachFiles[h][0].url = data["d"]["DocUrl"];
            this.AttachFiles[h][0].did = data["d"]["Doguid"];
          }
        }
      }
    });
  }

  setAttachments() {
    this.Step = 3;
  }

  attachmentDetails() {
    for(let c=0; c<this.AttachFiles.length; c++) {
      this.FinalAttachmentsList.push(this.AttachFiles[c][0]);
    }
    return this.FinalAttachmentsList;
  }

  continueThirdScreen() {
    const objData = this.attachmentDetails();
    console.log('sc3', objData);
    this.step4();
  }

  saveAttachmentDetails() {
    this.attachmentDetails();
    this.WholeData.Operationx = '05';
    // call service to save details as draft and redirect to next page.
    this.vatServices.saveVatServicesDetails(this.WholeData).subscribe(data => {
      if(data) {
        console.log('attachment-save', data["d"]);
        this.notifierService.notify(
          "success",
          "Deregister of VAT Form saved successfully"
        );
      }
    });
  }
  /* ending step-3 code */

  /* starting step-4 code */
  getDeclarationDetails() {
    if(this.Language == 'A') {
      this.IdTypeList = {"idTyp": [
          {
            "idKey": "",
            "idText": ""
          },
          {
            "idKey": "ZS0001",
            "idText": "هوية وطنية"
          },
          {
            "idKey": "ZS0002",
            "idText": "هوية مقيم"
          },
          {
            "idKey": "ZS0003",
            "idText": "هوية خليجية"
          }
        ]
      }
    }
    else {
      this.IdTypeList = {"idTyp": [
          {
            "idKey": "",
            "idText": ""
          },
          {
            "idKey": "ZS0001",
            "idText": "National ID"
          },
          {
            "idKey": "ZS0002",
            "idText": "Iqama ID"
          },
          {
            "idKey": "ZS0003",
            "idText": "GCC ID"
          }
        ]
      }
    }
    this.IdTypeList = this.IdTypeList.idTyp;
    //this.declarationFormControls();
  }

  onIdTypeSelection(value) {
    this.isNationalValidNumber = false;
    this.isIqamaValidNumber = false;
    this.isNationalEnterValidNumber=false;
    this.isIqamaEnterValidNumber=false;
   
    for(let i=0; i<this.IdTypeList.length; i++) {
      if(value == this.IdTypeList[i].idKey) {
        this.IdTypeName = this.IdTypeList[i].idText;
      }
    }
    this.IdTypeOwnerShipFormgroup.patchValue({
      DOb:undefined
    })
    if (this.DeclarationFormGroup.value.idType == "ZS0001"||this.DeclarationFormGroup.value.idType == "ZS0002") {
      $("#idDegisterofVAT").modal("show");
    }
    else{
      this.DeclarationFormGroup.value.idNumber='';
    }
  }

  onIdNoChange(value) {
    if(value !== "") {
      const IdType = this.DeclarationFormGroup.value.idType;
      const currentDateFormat = this.CurrentDate.toISOString().slice(0, 10);
      const formatSplit = currentDateFormat.split("-");
      const todayDate = `${formatSplit[0]}${formatSplit[1]}${formatSplit[2]}`;
      setTimeout(() => {
        this.vatServices.validateIdNo(IdType, value, todayDate).subscribe(data => {
          if(data) {
            console.log('validate-id-no', data["d"]);
            this.ValidateIdNo = data["d"];
            if(this.ValidateIdNo.Name1 !== "" && this.ValidateIdNo.Name2 !== "") {
              this.DeclarationFormGroup.controls['name'].setValue(`${this.ValidateIdNo.Name1} ${this.ValidateIdNo.Name2}`);
              this.DeclarationFormGroup.controls['name'].enable({onlySelf: true});
            }
            else {
              this.DeclarationFormGroup.controls['name'].setValue('');
              this.DeclarationFormGroup.controls['name'].enable({onlySelf: true});
            }
          }
        }, (error) => {
          console.log('err', error);
          this.DeclarationFormGroup.controls['name'].setValue('');
          this.DeclarationFormGroup.controls['name'].enable({onlySelf: true});
        });
      }, 500);
    }
    else {
      this.DeclarationFormGroup.controls['name'].setValue('');
      this.DeclarationFormGroup.controls['name'].enable({onlySelf: true});
    }
  }

  declarationFormControls() {
    this.DeclarationFormGroup.addControl('idType', new FormControl('', [Validators.required]));
    this.DeclarationFormGroup.addControl('idNumber', new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(16)]));
    this.DeclarationFormGroup.addControl('date', new FormControl(this.CurrentDate));
    this.DeclarationFormGroup.addControl('name', new FormControl('', [Validators.required, Validators.pattern(this.StringPattern)]));
  }

  setDeclarationFormControls() {
    this.DeclarationFormGroup.addControl('idType', new FormControl(this.DeclarationData.IdType, [Validators.required]));
    this.DeclarationFormGroup.addControl('idNumber', new FormControl(this.DeclarationData.IdNo, [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(16)]));
    this.DeclarationFormGroup.addControl('date', new FormControl(this.DeclarationData.Date));
    this.DeclarationFormGroup.addControl('name', new FormControl(this.DeclarationData.Name, [Validators.required, Validators.pattern(this.StringPattern)]));
    this.Step = 4;
  }

  declarationDetails() {
    const FormValues = this.DeclarationFormGroup.getRawValue();
    this.DeclarationData.IdType = FormValues.idType;
    this.DeclarationData.IdNo = FormValues.idNumber;
    this.DeclarationData.Date = this.CurrentDate;
    this.DeclarationData.Name = FormValues.name;
    return this.DeclarationData;
  }

  continueFourthScreen() {
    const objData = this.declarationDetails();
    console.log('sc4', objData);
    this.step5();
  }

  saveDeclarationDetails() {
    this.declarationDetails();
    this.WholeData.Contactnm = this.DeclarationData.Name;
    this.WholeData.Type = this.DeclarationData.IdType;
    this.WholeData.Idnumbr = this.DeclarationData.IdNo;
    this.WholeData.Declareflg = this.DeregisterData.Agreeflg;
   // this.WholeData.Decdt = this.CurrentDate.toISOString().slice(0, 19);
    this.WholeData.Operationx = '05';
    // call service to save details as draft and redirect to next page. 
    this.vatServices.saveVatServicesDetails(this.WholeData).subscribe(data => {
      if(data) {
        console.log('declaration-save', data["d"]);
        this.notifierService.notify(
          "success",
          "Deregister of VAT Form saved successfully"
        );
      }
    });
  }
  /* ending step-4 code */

  /* starting step-5 code */
  summaryDetails() {
    this.WholeData.Agreeflg = this.DeregisterData.Agreeflg;
    this.WholeData.Reqtp = this.DeregisterData.ReqType;
    this.WholeData.Reason = this.DeregisterData.Reason;
    this.WholeData.StartDate = this.DeregisterData.StartDate;
    this.WholeData.EndDate = this.DeregisterData.EndDate;
    this.WholeData.SuspDtfrom = this.DeregisterData.SusFrom;
    this.WholeData.SuspDtto = this.DeregisterData.SusTo;
    this.WholeData.NextDtfrom = this.DeregisterData.NextFilFrom;
    this.WholeData.NextDtto = this.DeregisterData.NextFilTo;
    this.WholeData.Duedate = this.DeregisterData.DueDate;
    this.WholeData.NotesSet["results"] = this.OtherReasonValue;
    this.WholeData.Contactnm = this.DeclarationData.Name;
    this.WholeData.Type = this.DeclarationData.IdType;
    this.WholeData.Idnumbr = this.DeclarationData.IdNo;
    this.WholeData.Declareflg = this.DeregisterData.Agreeflg;
    this.WholeData.UserTypx="TP";
    return this.WholeData;
  }

  continueFifthScreen() {
    this.isConfirm=true;
    this.WholeData.Operationx = '01';
    
    this.summaryDetails();
   
    console.log('save', this.WholeData);
    this.vatServices.saveVatServicesDetails(this.WholeData).subscribe(data => {
      if(data) {
        console.log('final-submit', data["d"]);
        this.ReferenceNo = data["d"].Fbnumx;
        this.FullName= data["d"].FullName;
        this.isConfirm=false;
        this.acknowledgementDetails();
        this.step6();
      }
    }, (error) => {
      
      this.isConfirm=false;
    });
  }

  saveSummaryDetails() {
    this.WholeData.Operationx = '05';
    this.summaryDetails();
    // call service to save details as draft and redirect to next page.
    this.vatServices.saveVatServicesDetails(this.WholeData).subscribe(data => {
      if(data) {
        console.log('final-save', data["d"]);
        this.ReferenceNo = data["d"].Fbnumx;
        this.acknowledgementDetails();
        this.notifierService.notify(
          "success",
          "Deregister of VAT Form saved successfully"
        );
      }
    });
  }
  /* ending step-5 code */

  /* starting step-6 code */
  acknowledgementDetails() {
    this.AcknowledgementData.Name = this.DeclarationData.Name;
    this.AcknowledgementData.ReferenceNumber = this.ReferenceNo;
    this.AcknowledgementData.Date = this.DeclarationData.Date;
  }
  /* ending step-6 code */

  back1() {
    this.Step = 1;
  }

  back2() {
    this.Step = 2;
  }

  back3() {
    this.Step = 3;
  }

  back4() {
    this.Step = 4;
  }

  back5() {
    this.Step = 5;
  }

  step2() {
    this.Step = 2;
    this.stepsChecking();
  }

  step3() {
    this.Step = 3;
    this.stepsChecking();
  }

  step4() {
    this.Step = 4;
    this.stepsChecking();
  }

  step5() {
    this.Step = 5;
    this.stepsChecking();
  }

  step6() {
    this.Step = 6;
    this.stepsChecking();
  }

  reasonTextareaResult() {
    this.WholeData.NotesSet.results = [];
    if(this.DeregisterData.Others.length > 0) {
      for(let n=0; n<this.DeregisterData.Others.length; n++) {
        const reasonObject = {
          AttByz: "TP",
          ByGpartz: this.GPartz,
          DataVersionz: "",
          ElemNo: 0,
          Erfdtz: this.CurrentDate.toISOString().slice(0, 19),
          Erftmz: null,
          Erfusrz: this.GPartz,
          Lineno: 0,
          Noteno: "",
          Notenoz: `00${n}`,
          Rcodez: "DGVT_OTH",
          Refnamez: "",
          Tdformat: "",
          Tdline: this.DeregisterData.Others[n],
          XInvoicez: "",
          XObsoletez: ""
        }
        this.WholeData.NotesSet.results.push(reasonObject);
      }
      return this.WholeData.NotesSet.results;
    }
    else {
      this.WholeData.NotesSet.results = [];
      return this.WholeData.NotesSet.results;
    }
  }

  ngAfterViewInit () {
    setTimeout(() => {
      this.infoModal.nativeElement.click();
    }, 1000)
  }

  datePickerValue(value) {
    if (value !== undefined && value !== null && value !== "") {
      let day = value.calendarStart.day;
      if (value.calendarStart.day < 10) {
        day = '0' + value.calendarStart.day;
      }
      let month = value.calendarStart.month;
      if (value.calendarStart.month < 10) {
        month = '0' + value.calendarStart.month;
      }
      let year = value.calendarStart.year;
      const convertedDate = `${year}-${month}-${day}T00:00:00`;
      return convertedDate;
    } else {
      return null;
    }
  }
  //To allow numbers only in inputs


 NumberAllow(event) {
 
  let charCode = (event.which) ? event.which : event.keyCode;
  if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 32)) {
    return false;
  }
}
isNumberValid() {

  let value = this.IdTypeOwnerShipFormgroup.value.Idnumber[0];
  
  if (value !== "" && value !== undefined) {    
    if(this.DeclarationFormGroup.value.idType == "ZS0001"){
      if (value == "1") {       
        this.isNationalValidNumber= false;
        
      } else {
        this.isNationalValidNumber= true;
        
      }
    }
    if(this.DeclarationFormGroup.value.idType == "ZS0002"){
      if (value == "2") { 
        this.isIqamaValidNumber = false;
      } else {
        this.isIqamaValidNumber = true;
      }
    }
    
  } else {
    this.isNationalValidNumber= false;
    this.isIqamaValidNumber = false;   
  }

}

  validateWHDeclarationIdz() {
    if (this.DeclarationFormGroup.value.idType == "ZS0001"||this.DeclarationFormGroup.value.idType == "ZS0002") {
      //if (!this.idErr1 && this.dob1) {
      let d = this.IdTypeOwnerShipFormgroup.value.Dob["calendarStart"];
      console.log("sdsd", this.dob1);
      if (d.day < 10 && d.day.toString().length == 1) {
        d.day = "0" + d.day;
      }
      if (d.month < 10 && d.month.toString().length == 1) {
        d.month = "0" + d.month;
      }
      let currentdate = "" + d.year + d.month + d.day;

      let obj = {
        type: this.DeclarationFormGroup.value.idType,
        idNumber: this.IdTypeOwnerShipFormgroup.value.Idnumber,
      };
      this.vatServices.getUserValidation(obj, currentdate).subscribe(
        (res) => {
          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: ''
          });
          this.DeclarationFormGroup.patchValue({
            idNumber: res["d"]["Idnum"]
          });
          this.onIdNoChange( res["d"]["Idnum"])
          $("#idDegisterofVAT").modal("hide");
        },
        (err) => {
          this.errorMessage = '';
         if(this.DeclarationFormGroup.value.idType=='ZS0001'){
          this.isNationalEnterValidNumber=true
        }
        if(this.DeclarationFormGroup.value.idType=='ZS0002'){
          this.isIqamaEnterValidNumber=true;
        }
          $("#errormodel").modal("show");
          this.errorMessage = err.error.error.innererror.errordetails[0].message;
        }
      );
    }

    //}
  }
  clearPopup() {
    this.IdTypeOwnerShipFormgroup.patchValue({
      Idnumber: '',
      Dob: undefined
    });
  }
  
  

}

export class DeregisterDetailsModel {
  Agreeflg: boolean;
  ReqType: string;
  Reason: string;
  Others: any;
  StartDate: any;
  EndDate: any;
  SusFrom: any;
  SusTo: any;
  NextFilFrom: any;
  NextFilTo: any;
  DueDate: any;
}

export class DeclarationDetailsModel {
  IdType: string;
  IdNo: number;
  Name: string;
  Date: any;
}

export class AcknowledgementDetailsModel {
  Name: string;
  ReferenceNumber: number;
  Date: any;
}
