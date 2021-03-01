import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { vatLabels } from "./vat-eligible-person.constant";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import { DateAdapter } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from "src/app/app.service";
import { SignupService } from "src/app/services/signup.service";
import { CommonValidation } from "src/app/constants/commonValidations";
import { NotifierService } from "angular-notifier";
import { OutletSet } from 'src/app/dto/establishment/outlet-set';
import { AddressSet } from 'src/app/dto/establishment/address-set';
import { CpersonSet } from 'src/app/dto/establishment/cperson-set';
import { IdSet } from 'src/app/dto/establishment/id-set';
import { ContactSet } from 'src/app/dto/establishment/contact-set';
import { Shareholder } from 'src/app/dto/shareholder';
import { Router } from "@angular/router";
import * as moment from 'moment-hijri';
import { MatHorizontalStepper, MatVerticalStepper } from '@angular/material/stepper';
import { ActivitySet } from 'src/app/dto/establishment/activity-set';
import { max } from 'rxjs/operators';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';
import * as _ from 'underscore';
import { CustomValidators } from '../../../shared/custom-validators';
import { DatepickerUtilitiesService } from 'src/app/shared/services/datepicker-utilities.service';
import { SignupAttachmentsComponent } from '../../signup-components/signup-attachments/signup-attachments.component';
declare var jQuery: any;


@Component({
  selector: 'app-vat-eligible-person',
  templateUrl: './vat-eligible-person.component.html',
  styleUrls: ['./vat-eligible-person.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class VATEligiblePersonComponent implements OnInit {

  lng: string;
  lang;
  direction;
  mobileCountry: any;
  applicationNo: any;
  crnErr1: boolean;
  crdDType = [];
  count = 0;
  companyDetails: any = {};
  errorMsgsList: any = [];
  refundFrequencyList: any = [];
  selectedLanguage: string = "en";
  calendarType: string = "Gregorian";
  hideOnOtpVerification: boolean = false
  step2Validated: boolean = false;
  step2Completed: boolean = false;
  step3Completed: boolean = false;
  shModalScrollPos: any;
  entityName: any;
  public tinDetails: any = {};
  public phoneCodes: any = [];
  public countiesList: any = [];
  public idTypesList: any = []; 
  public idTypes: any = []; 
  public statesList: any = [];
  public citiesList: any = [];
  crdSet: any;
  crnErr: boolean;
  public shIdTypesList: any = [];
  public getLegalPersonCategory: any = [];
  public eligiblePersCategoryValues: any = []; 
  public eligiblePersCategoryAttachment: any = [];
  public eligiblePersCategoryList: any = []; 
  public cpIdNumberMask = "0*";
  headerComponent = CalendarComponent;
  public registrationObj: any = {};
  public showAcknowledgement: boolean = false;
  public showAttachments: boolean = false;
  vatEligiblePersonForm: FormGroup;
  vatEligiblePersonForm1: FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatHorizontalStepper) mainStepper: MatHorizontalStepper;
  @ViewChild(SignupAttachmentsComponent)
  private SignupAttachmentsComponent: SignupAttachmentsComponent;
  applicationSubmissionDate = new Date().toDateString();
  attachmentsList: FormArray;


  constructor( private dpuService: DatepickerUtilitiesService,private _dateAdapter: DateAdapter<JDNConvertibleCalendar>, 
    private _formBuilder: FormBuilder, private appSrv: AppService, private signupService: SignupService, 
    public commonValid: CommonValidation, public notifierService: NotifierService, private router: Router,) { }

  ngOnInit(): void {

    if (localStorage.getItem("lang") === "ar") {
      this.lng = "A";
      this.lang = vatLabels.langz.arb.vatEligiblePerson;
      this.direction = vatLabels.langz.arb.dir;
      this.selectedLanguage = "ar";
      this.refundFrequencyList.push(
        {Key: "", Text: "" },
        {Key: "MO", Text: "طلب استرداد شهري" },
        {Key: "QU", Text: "طلب استرداد ربع سنوي" },
        {Key: "AN", Text: "طلب استرداد سنوي" },
        );
    } else {
      this.lng = "E";
      this.lang = vatLabels.langz.eng.vatEligiblePerson;
      this.direction = vatLabels.langz.eng.dir;
      this.refundFrequencyList.push(
        {Key: "", Text: "" },
        {Key: "MO", Text: "Monthly refund application" },
        {Key: "QU", Text: "Quarterly refund application" },
        {Key: "AN", Text: "Yearly refund application" },
        );
    }
    moment.locale('en-US');
    //this.branchDetailsForm = this.getBranchDetailsForm();
    this.vatEligiblePersonForm = this.getVATEligiblePersonForm();
    this.vatEligiblePersonForm1 = this.getVATEligiblePersonForm1();
    this.getAddressLookups();
    this.getPhoneCodes();
    this.getSignUpSet();
    this.getIdTypesList(this.selectedLanguage);
    this.getLegalPersonCategoryList();
    this.attachmentsList = this._formBuilder.array([]);
    this.getVATRegistrationSet();
    
      this.eligiblePersCategoryList.push(
        { EpCode: "001", DepDescr: "" },
        {EpCode: "001", DepDescr: "MINISTRIES" },
        {EpCode: "002", DepDescr: "GOVERNMENT AUTHORITIES (E.G. CENTRAL GOVERNMENT DEPARTMENTS AND, REGIONAL & LOCAL GOVERNMENT DEPARTMENTS, ETC.)" },
        {EpCode: "003", DepDescr: "CHARITIES AND NON-GOVERNMENTAL ORGANIZATIONS" },
        {EpCode: "004", DepDescr: "PUBLIC SERVICES ADMINISTRATION BODIES (E.G. PUBLIC SCHOOLS, PUBLIC HOSPITALS, ETC.)" },
        {EpCode: "005", DepDescr: "EXEMPTED ENTITIES" },
        {EpCode: "006", DepDescr: "DIPLOMATIC AND CONSULAR BODIES AND MISSIONS" },
        );
      
    
  }

  getLegalPersonCategoryList(){
    this.signupService.getLegalPersonCategory().subscribe((response: any) => {
      this.eligiblePersCategoryValues = response["d"]["ELG_CATESet"]["results"] || {};
      console.log("getLegalPersonCategory", this.eligiblePersCategoryValues);
    })
  }

  getAddressLookups() {
    this.appSrv.getCountry().subscribe((res) => {
      this.countiesList = res["d"]["country_dropdownSet"]["results"];
      this.statesList = res["d"]["State_dropdownSet"]["results"];
      this.citiesList = res["d"]["city_dropdownSet"]["results"];
      this.citiesList.shift();
      this.citiesList.forEach((ele) => {
        ele.CityName = ele.CityName.toUpperCase();
      });
      console.log("this.countiesList", this.countiesList);
    });
  }

  getVATEligiblePersonForm1(){
    let vatEligiblePersonForm1 = this._formBuilder.group({
      orgInfo: this._formBuilder.group({
        entityName: ['',Validators.required],
        companyID: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]],
        otpVerified: ['', Validators.required],
      }),
      contactInfo: this._formBuilder.group({
        mobileNumber: ['', [Validators.required, Validators.maxLength(10)]], //, startsWithValidator("5")
        mobileCode: ['966', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email, EmailValidator('email')]]
      }),
    });
    return vatEligiblePersonForm1;
  } 
  getVATEligiblePersonForm(){
    let vatEligiblePersonForm = this._formBuilder.group({
      action: [''],
      personDetails: this._formBuilder.group({
        pdNo: [''],
        legalPersonCategory: ['', [Validators.required]], //, startsWithValidator("5")
        preferredRefundFrequency: ['', Validators.required],
        expectedPurchase: ['', Validators.required,Validators.max(99999999999.99)],
        IBAN: ['', [Validators.required]],
        confirmation: ['',[Validators.required]],
        copyOfFile: ['', Validators.required],
      }),
      addressDetails: this._formBuilder.group({
        country: ['SA'],
        province: ['', Validators.required],
        city: ['', Validators.required],
        cityCode: [''],
        cityName: [''],
        district: ['', [Validators.required, Validators.maxLength(10)]],
        streetName: ['', [Validators.required, Validators.maxLength(60)]],
        buildingNumber: ['', [Validators.required, Validators.maxLength(10)]],
        zipCode: ['', [Validators.maxLength(6), Validators.required]],
        additionalNumber: ['', [Validators.required, Validators.maxLength(10)]],
        unitNumber: ['', [Validators.required, Validators.maxLength(10)]]
      }),
      addressDetails1: this._formBuilder.group({
        country: ['SA'],
        province: ['', Validators.required],
        city: ['', Validators.required],
        cityCode: [''],
        cityName: [''],
        district: ['', [Validators.required, Validators.maxLength(10)]],
        streetName: ['', [Validators.required, Validators.maxLength(60)]],
        buildingNumber: ['', [Validators.required, Validators.maxLength(10)]],
        zipCode: ['', [Validators.maxLength(6), Validators.required]],
        additionalNumber: ['', [Validators.required, Validators.maxLength(10)]],
        unitNumber: ['', [Validators.required, Validators.maxLength(10)]]
      }),
      contactPersonDetails: this._formBuilder.group({
        tinNumber: ['', [Validators.minLength(10)]],
        idType: ['ZS0001', Validators.required],
        idNumber: ['', Validators.required],
        jobTitle: ['',Validators.required], //issueCountry: [''],
        dateOfBirth: ['', [Validators.required, CustomValidators.futureDateValidator()]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        mobileCode: ['966', Validators.required],
        mobileNumber: ['', [Validators.minLength(9), Validators.required, CustomValidators.startsWithValidator("5")]],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email, CustomValidators.emailValidator('email')]],
      }),
     attachmentsList: this._formBuilder.array([]),
     doc: this._formBuilder.array([this.createAttachment()]),
    });
    return vatEligiblePersonForm;
  }

  createAttachment() {
    return this._formBuilder.group({
      id: "",
      name: "",
      url: "",
      flag: false,
      did: "",
    });
  }

  deleteAttachment(index) {
    let control = <FormArray>this.vatEligiblePersonForm.controls.doc;
    if (control.length === 1) {
      this.crnErr1 = true;
    } else {
      this.count--;
      this.crnErr1 = false;

      let valuez = control.value[index];
      console.log(control.value[index], valuez);
      console.log(this.crdDType, valuez.id);
      //let ind;

      // for (var i = 0; i < this.crdDType.length; i++) {
      //   if (this.crdDType[i].CrNo === valuez.id) {
      //     ind = i;
      //   }
      // }
      // this.crdDType.splice(ind, 1);
      // console.log(this.crdDType);

      // this.crdSet.forEach((element) => {
      //   if (element.CrNo === valuez.id) {
      //     element.flag = false;
      //   } else {
      //     element.flag = true;
      //   }
      // });
      // this.crdSet = this.crdSet;

      control.removeAt(index);
      let control2 = <FormArray>this.vatEligiblePersonForm.controls.doc;
      let val = control2.value;
      let ind = [];
      for (var i = 0; i < val.length; i++) {
        for (var j = 0; j < this.crdSet.length; j++) {
          if (this.crdSet[j].CrNo === val[i].id) {
            ind.push(j);
          }
        }
      }

      this.crdSet.forEach((element) => {
        element.flag = false;
      });

      ind.forEach((element) => {
        this.crdSet[element].flag = true;
      });
      let cnt = 0;
      for (var i = 0; i < val.length; i++) {
        if (val[i].id === "") {
          cnt++;
          this.crnErr = true;
        }
      }
      if (cnt === 0) {
        this.crnErr = false;
      }
    }
  }

  onMainStepChange(event) {
    if (event.selectedIndex == 0) {
      this.vatEligiblePersonForm1.get("orgInfo").get("otpVerified").setValue('');
      this.vatEligiblePersonForm1.get("orgInfo").get("otpVerified").setValidators(Validators.required);
      this.vatEligiblePersonForm1.get("orgInfo").get("otpVerified").updateValueAndValidity();
      this.step3Completed = false;
      this.step2Validated = false;
     this.step2Completed = false;

    } else if (event.selectedIndex == 1) {
     this.step2Validated = false;
     this.step2Completed = false;
     this.step3Completed = false;
    }
    event.selectedStep.completed = false;
  }

   onCompanyIDChange() {

    this.vatEligiblePersonForm1.get("orgInfo").get("companyID").setValidators([Validators.required,Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
    this.vatEligiblePersonForm1.get("orgInfo").get("companyID").updateValueAndValidity();
    if (!this.vatEligiblePersonForm1.get("orgInfo").get("companyID").value) {
      this.vatEligiblePersonForm1.get("orgInfo").get("companyID").setValidators([Validators.required,Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
      this.companyDetails = {};
    } else if (this.vatEligiblePersonForm1.get("orgInfo").get("companyID").value && this.vatEligiblePersonForm1.get("orgInfo").get("companyID").valid) {
      let companyID = this.vatEligiblePersonForm1.value.orgInfo.companyID;
      this.signupService.getCompanyDetails(companyID).subscribe((response) => {
        this.companyDetails = response["d"] || {};
        (this.companyDetails.Source || "111")
      }, (err) => {
         this.vatEligiblePersonForm1.get("orgInfo").get("companyID").setValidators([Validators.required,Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
        this.vatEligiblePersonForm1.get("orgInfo").get("companyID").updateValueAndValidity();
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );

        let errorsList = err.error.error.innererror.errordetails || [];
        errorsList.forEach((errorObj) => {
          if (errorObj.code != "/IWBEP/CX_MGW_BUSI_EXCEPTION") {
            this.notifierService.notify(
              "error",
              errorObj.message
            );
          }
        });

      });
    } else {
      console.log("compnayID Invalid");
    }
  }

  getPhoneCodes() {
    this.appSrv.getPhoneCode().subscribe((res) => {
      console.log(res);
      this.phoneCodes = res["d"]["results"];
      this.phoneCodes.forEach((item) => {
        item["maxLength"] = 13 - item.Telefto.length;
      });
      console.log("countru", this.phoneCodes);
    });
  }

  onMobileCodeChange() {
    this.vatEligiblePersonForm1.get("contactInfo").get("mobileNumber").reset();
    let code = this.vatEligiblePersonForm1.get("contactInfo").get("mobileCode").value;
    console.log("onMobileCodeChange", code);
    let validators = [];
  }

  getSignUpSet() {
    this.signupService.getNewVATSignUpSet({id: "1"}).subscribe((response: any) => {
      this.registrationObj = response["d"] || {};
      console.log("getSignUpSet", this.registrationObj);
    })
  } 

  getVATRegistrationSet() {
    this.signupService.getVATRegSet("a@a.a").subscribe((response: any) => {
      this.registrationObj = response["d"] || {};
      console.log("getVATRegSet", this.registrationObj);
    })
  }

  onSubmitStep1() {
    console.log("before post", this.registrationObj);
    if (!this.vatEligiblePersonForm1.get("contactInfo").valid || !this.vatEligiblePersonForm1.get('orgInfo').get('companyID').valid) {
      return true;
    }
    let vatEligiblePersonObj = this.vatEligiblePersonForm1.getRawValue();

    this.phoneCodes.forEach((item) => {
      if(item.Telefto == vatEligiblePersonObj.contactInfo.mobileCode){
        console.log("moblcontry 1: ", item.Land1);
        this.mobileCountry = item.Land1;
        console.log("moblcontry 2: ", this.mobileCountry);
      }
    });
    
    //this.registrationObj["AExternal"] = "";
    //this.registrationObj["AInternal"] = "";
    this.registrationObj["Email"] = vatEligiblePersonObj.contactInfo.email;
    this.registrationObj["IdType"] = "ZS0005";
    this.registrationObj["Idnumber"] = vatEligiblePersonObj.orgInfo.companyID;
    this.registrationObj["Mobile"] = "00" + vatEligiblePersonObj.contactInfo.mobileCode + vatEligiblePersonObj.contactInfo.mobileNumber;
    this.registrationObj["MobileCountry"] = this.mobileCountry;
    delete this.registrationObj["__metadata"];

    this.saveVATEligiblePerson(this.registrationObj, "step1");
  }

  
  saveVATEligiblePerson(registrationObj, action = '', dataObj = {}) {
   
    this.signupService.postNewVATSignSet(registrationObj).subscribe((response: any) => {
      this.registrationObj = response["d"];
      if (action == "step1") {
        this.startOTPverification();
      }

      if (action == "step2") {
        this.step2Validated = true;
        this.step2Completed = true;
        this.mainStepper.selected.completed = true;
        this.mainStepper.next();
      } else if (action == "submit") {
        this.applicationNo = response["d"]["FbnumAngx"];
        this.entityName = response["d"]["NameOrg1"];
        this.showAcknowledgement = true;
        this.step3Completed = true;
      }

    }, (err) => {
      console.log("Error while saving");
      this.step2Completed = false;
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
     this.errorMsgsList = [];
      let temp = err.error.error.innererror.errordetails.filter((error) => error.code != "/IWBEP/CX_MGW_BUSI_EXCEPTION");
      let errosgrp = _.groupBy(temp, function (error) {
        return error.message.toLocaleLowerCase();
      });
      temp = [];
      for (let errcode in errosgrp) {
        let errarr = errosgrp[errcode]
        if (errarr.length > 0) {
          temp.push(errarr[0]);
        }
      }
      console.log("temp: ", temp);
     this.errorMsgsList = temp || [];
     
      if (this.errorMsgsList.length > 1) {
        jQuery("#errorMsgsModal").modal('show');
      } else {
        console.log("errorMsgsList: ", this.errorMsgsList);
        this.notifierService.notify(
          "error",
          this.errorMsgsList[0].message
        );
      }
    });
  }

  
  validateStep2() {
    this.step2Validated = false;
    this.step2Completed = false;
    
  }

  getAttachmentList(){
    this.eligiblePersCategoryAttachment = [];
    //console.log("legalPersonCategory ", this.vatEligiblePersonForm.get('personDetails').get('legalPersonCategory').value);
    this.signupService.getAttachmentList(this.vatEligiblePersonForm.get('personDetails').get('legalPersonCategory').value).subscribe((response: any) => {
    response["d"].results.forEach((i)=>{
      if(i.DmsTxt!=""){
        this.eligiblePersCategoryAttachment.push(i);
      }
  
    }

    );
    //console.log("eligiblePersCategoryAttachment",this.eligiblePersCategoryAttachment);
    });
  }
  
  otpParams = {
    "IdType": "",
    "Id": "",
    "MobileNo": ""
  };

  startOTPverification() {
    console.log("step2Completed" ,this.step2Completed);
    console.log("step2Validated" ,this.step2Validated);
    this.vatEligiblePersonForm1.get("orgInfo").get("otpVerified").reset();
    let vatEligiblePersonObj = this.vatEligiblePersonForm1.getRawValue();
    this.otpParams = {
      "IdType": vatEligiblePersonObj.orgInfo.companyID ? "ZS0005" : "ZS0007",
      "Id": (!vatEligiblePersonObj.orgInfo.companyID) ? vatEligiblePersonObj.orgInfo.contractNumber || "" : vatEligiblePersonObj.orgInfo.companyID || "",
      "MobileNo": "00" + vatEligiblePersonObj.contactInfo.mobileCode + vatEligiblePersonObj.contactInfo.mobileNumber,
    }

    if (vatEligiblePersonObj.contactInfo.oldMobileNumber == this.otpParams.MobileNo) {
      this.onOTPSuccess({});
    } else {
      setTimeout(() => {
        this.hideOnOtpVerification = true;
      });
    }
  }

  onOTPSuccess(response) {
    this.notifierService.hideAll();
    this.vatEligiblePersonForm1.get("orgInfo").get("otpVerified").setValue(true);
    this.vatEligiblePersonForm1.get("contactInfo").patchValue({ "oldMobileNumber": "00" + this.vatEligiblePersonForm1.getRawValue().contactInfo.mobileCode + this.vatEligiblePersonForm1.getRawValue().contactInfo.mobileNumber });
    this.hideOnOtpVerification = false;
    this.mainStepper.selected.completed = true;

    this.mainStepper.next();
  }
  onInvalidOTP(response) {
    this.vatEligiblePersonForm1.get("orgInfo").get("otpVerified").reset();
  }
  onOTPError(error) {
    this.vatEligiblePersonForm1.get("orgInfo").get("otpVerified").reset();
  }

  getTINDetails() {
    this.tinDetails = {};
    this.resetContactPersonForm(false, true, false);
    if (this.vatEligiblePersonForm1.get("contactPersonDetails").get("tinNumber").valid && this.vatEligiblePersonForm1.get("contactPersonDetails").get("tinNumber").value) {
      let tinNumber = this.vatEligiblePersonForm1.value.contactPersonDetails.tinNumber;
      this.signupService.getTINDetails(tinNumber).subscribe((response) => {
        console.log("tinNumber details", response);
        this.tinDetails = response["d"] || {};

        if (response["d"]["Idtype"] !== 'ZS0001' && response["d"]["Idtype"] !== 'ZS0002' && response["d"]["Idtype"] !== 'ZS0003' && response["d"]["Idtype"] !== 'FS0002') {
          //this.tinMsg = this.lang.errMsgs.companyTinErr;          
          this.notifierService.notify("error", this.lang.err.companyTinErr);
          // this.resetContactPersonForm(false, true, false);
          // this.updateContactPersonFormValidators();
          return true;
        }
        // if (this.tinDetails.Bpkind == '06A' || this.tinDetails.Bpkind == '00') {        
        let dob = null;
        let issueDt = null;
        if (this.tinDetails.Birthdt) {
          issueDt = +this.tinDetails.Birthdt.substring(
            6,
            this.tinDetails.Birthdt.length - 2
          );
          dob = this.dpuService.getCalendarFormatDateFromAPIDate(this.tinDetails.Birthdt, this.calendarType);
        }
        console.log(dob, issueDt, this.tinDetails.Birthdt);

        const control = this.vatEligiblePersonForm1.get("contactPersonDetails");
        control.patchValue({
          "idType": this.tinDetails.Idtype,
          "idNumber": this.tinDetails.Idnum,
          "issueCountry": this.tinDetails.Country,
          "dateOfBirth": dob,
          "firstName": this.tinDetails.Name1,
          "lastName": this.tinDetails.Name2,
          "mobileNumber": this.tinDetails.Mobile,
          "email": this.tinDetails.Email
        });

        this.updateContactPersonFormValidators();
        // } else {
        //   //not individual tin clear form
        //   this.resetContactPersonForm(false, true, false);
        //   this.updateContactPersonFormValidators();
        // }

      }, (error) => {
        this.notifierService.notify(
          "error",
          error.error.error.innererror.errordetails[0].message
        );
        // error while getting tin details  clear form
        this.resetContactPersonForm(false, true, false);
        this.updateContactPersonFormValidators();
      });
    } else {
      console.log("tinNumber Invalid");
      this.resetContactPersonForm(false, true, false);
      this.updateContactPersonFormValidators();
    }
  }

  IBANValidation(){
    console.log("IBAN: ", this.vatEligiblePersonForm.get('personDetails').get('IBAN').value);

    this.signupService.IBANValidation(this.vatEligiblePersonForm.get('personDetails').get('IBAN')).subscribe((response) => {
      console.log("iban response: ", Response);
    });
  }

  resetContactPersonForm(clearAll = false, exceptTIN = false, exceptIdType = false, exceptidNumber = false, exceptDOB = false) {
    const contactPersonDetailsForm = <FormGroup>this.vatEligiblePersonForm1.get("contactPersonDetails");
    let data = contactPersonDetailsForm.value;
    contactPersonDetailsForm.reset();
    contactPersonDetailsForm.patchValue({
      tinNumber: (clearAll) ? '' : (exceptTIN) ? data.tinNumber : '',
      idType: (clearAll) ? 'ZS0001' : (exceptIdType) ? data.idType : 'ZS0001',
      idNumber: (clearAll) ? '' : (exceptidNumber) ? data.idNumber : '',
      issueCountry: '',
      dateOfBirth: (clearAll) ? '' : (exceptDOB) ? data.dateOfBirth : null,
      firstName: '',
      lastName: '',
      startDate: this.dpuService.getConvertedDate(new Date(), this.calendarType),
      mobileNumber: '',
      mobileCode: '966',
      email: '',
      confirmEmail: ''
      // copyOfGMID: ''
    });
  }

  // getBranchDetailsForm() {
  //   let branchDetailsForm = this._formBuilder.group({
  //     action: [''],
  //     branchDetails: this._formBuilder.group({
  //       branchNo: [''],//actno
  //       branchName: ['', Validators.required],
  //       companyMemorondum: ['', Validators.required]
  //     }),
  //     activityDetails: this._formBuilder.group({
  //       identificationType: [''],
  //       crTypeSelected: [''],
  //       licenseTypeSelected: [''],
  //       contractTypeSelected: [''],
  //       // commercialNumbersList:this.fb.array([]),
  //       // licensesList:this.fb.array([]),
  //       // contractsList:this.fb.array([]),
  //       identificationsList: this._formBuilder.array([])
  //     }),
  //     addressDetails: this._formBuilder.group({
  //       country: ['', Validators.required],
  //       province: ['', Validators.required],
  //       city: ['', Validators.required],
  //       cityCode: [''],
  //       cityName: [''],
  //       district: ['', [Validators.required, Validators.maxLength(10)]],

  //       // streetName: ['', Validators.required],
  //       // buildingNumber: ['', Validators.required],
  //       // zipCode: ['', Validators.required],
  //       // additionalNumber: ['', Validators.required],
  //       // unitNumber: ['', Validators.required]

  //       streetName: ['', [Validators.required, Validators.maxLength(60)]],
  //       buildingNumber: ['', [Validators.required, Validators.maxLength(10)]],
  //       zipCode: ['', [Validators.maxLength(6), Validators.required]],
  //       additionalNumber: ['', [Validators.required, Validators.maxLength(10)]],
  //       unitNumber: ['', [Validators.required, Validators.maxLength(10)]]
  //     }),
  //     contactPersonDetails: this._formBuilder.group({
  //       // Validators.pattern("^[3][0-9]*$")
  //       tinNumber: ['', [Validators.minLength(10)]],
  //       idType: ['ZS0001', Validators.required],
  //       idNumber: ['', Validators.required],
  //       issueCountry: [''],
  //       dateOfBirth: ['', [Validators.required, CustomValidators.futureDateValidator()]],
  //       firstName: ['', Validators.required],
  //       lastName: ['', Validators.required],
  //       startDate: ['', [Validators.required, CustomValidators.futureDateValidator()]],
  //       mobileCode: ['966', Validators.required],
  //       mobileNumber: ['', [Validators.minLength(9), Validators.required, CustomValidators.startsWithValidator("5")]],
  //       email: ['', [Validators.required, Validators.email]],
  //       confirmEmail: ['', [Validators.required, Validators.email, CustomValidators.emailValidator('email')]],
  //       copyOfGMID: ['', Validators.required]
  //     }),
  //     stepCompleted: ['']
  //   });
  //   // branchDetailsForm.reset(branchDetailsForm.value);
  //   // branchDetailsForm.markAsPristine();
  //   // branchDetailsForm.markAsUntouched();
  //   return branchDetailsForm;
  // }
  
  updateContactPersonFormValidators() {
    let contactPersonDetails = this.vatEligiblePersonForm1.get("contactPersonDetails").value;
    const contactPersonDetailsForm = <FormGroup>this.vatEligiblePersonForm1.get("contactPersonDetails");
    //default validators setting

    contactPersonDetailsForm.get("tinNumber").setValidators([Validators.minLength(10)]);
    contactPersonDetailsForm.get("idType").setValidators(Validators.required);
    contactPersonDetailsForm.get("idNumber").setValidators(Validators.required);
    contactPersonDetailsForm.get("issueCountry").clearValidators();
    contactPersonDetailsForm.get("dateOfBirth").setValidators([Validators.required, CustomValidators.futureDateValidator()]);
    contactPersonDetailsForm.get("firstName").setValidators(Validators.required);
    contactPersonDetailsForm.get("lastName").setValidators(Validators.required);
    contactPersonDetailsForm.get("startDate").setValidators([Validators.required, CustomValidators.futureDateValidator()]);
    contactPersonDetailsForm.get("mobileCode").setValidators(Validators.required);
    contactPersonDetailsForm.get("mobileNumber").setValidators([Validators.required, Validators.minLength(9), CustomValidators.startsWithValidator("5")]);
    contactPersonDetailsForm.get("email").setValidators([Validators.required, Validators.email]);
    contactPersonDetailsForm.get("confirmEmail").setValidators([Validators.required, Validators.email, CustomValidators.emailValidator('email')]);
    contactPersonDetailsForm.get("copyOfGMID").setValidators(Validators.required);

    contactPersonDetailsForm.enable();

    if (contactPersonDetailsForm.get("tinNumber").value && contactPersonDetailsForm.get("tinNumber").valid) {

      //if TIN number valid, the below controls should be  auto populated and disabled irrespective of data or no data from tin details
      contactPersonDetailsForm.get("firstName").disable();
      contactPersonDetailsForm.get("lastName").disable();
      contactPersonDetailsForm.get("mobileNumber").disable();
      contactPersonDetailsForm.get("mobileCode").disable();
      contactPersonDetailsForm.get("email").disable();
      // contactPersonDetailsForm.get("confirmEmail").disable();
      contactPersonDetailsForm.get("dateOfBirth").disable();
      // contactPersonDetailsForm.get("idType").disable();
      // contactPersonDetailsForm.get("idNumber").disable();
      contactPersonDetailsForm.get("issueCountry").disable();

      contactPersonDetailsForm.get("firstName").clearValidators();
      contactPersonDetailsForm.get("lastName").clearValidators();
      contactPersonDetailsForm.get("mobileNumber").clearValidators();
      contactPersonDetailsForm.get("mobileCode").clearValidators();
      contactPersonDetailsForm.get("email").clearValidators();
      if (!contactPersonDetailsForm.get("email").value) {
        //contactPersonDetailsForm.get("confirmEmail").clearValidators();
        contactPersonDetailsForm.get("confirmEmail").setValidators([Validators.email, CustomValidators.emailValidator('email')]);
      }
      // contactPersonDetailsForm.get("confirmEmail").clearValidators();
      contactPersonDetailsForm.get("dateOfBirth").clearValidators();
      contactPersonDetailsForm.get("idType").clearValidators();
      contactPersonDetailsForm.get("idNumber").clearValidators();
      contactPersonDetailsForm.get("issueCountry").clearValidators();


    }

    if (contactPersonDetails.idType == 'ZS0001') {
      //NATIONAL ID
      this.cpIdNumberMask = "0000000000";
      contactPersonDetailsForm.get("idNumber").setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[1][0-9]*$")]);
    } else if (contactPersonDetails.idType == 'ZS0002') {
      //Iqama ID ID
      this.cpIdNumberMask = "0000000000";
      contactPersonDetailsForm.get("idNumber").setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[2][0-9]*$")]);
    } else if (contactPersonDetails.idType == 'ZS0003') {
      //GCC ID ID
      this.cpIdNumberMask = "0{15}";
      contactPersonDetailsForm.get("idNumber").setValidators([Validators.required, Validators.minLength(7), Validators.maxLength(15), Validators.pattern("^[0-9]*$")]);
    }
    else if (contactPersonDetails.idType == 'FS0002') {
      //Passport ID
      this.cpIdNumberMask = "A{20}";
      contactPersonDetailsForm.get("idNumber").setValidators([Validators.required, Validators.maxLength(20)]);
      contactPersonDetailsForm.get("issueCountry").setValidators(Validators.required);
    }

    contactPersonDetailsForm.updateValueAndValidity();
  }

  onIdTypeChange() {
    console.log("onIdTypeChange");

    this.resetContactPersonForm(false, false, true);
    this.updateContactPersonFormValidators();
    this.getContactPersonDetailsByIdType();
  }

  getIdTypesList(lang) {
    this.idTypes = this.signupService.getIdTypesList(lang);
    this.idTypes.forEach((i)=>{
        if(i != "Passport"){
          this.idTypesList.push(i);
        }
    
      }
  
      );
  }

  getContactPersonDetailsByIdType() {
    const contactPersonDetailsForm = <FormGroup>this.vatEligiblePersonForm1.get("contactPersonDetails");
    let contactPersonDetails = this.vatEligiblePersonForm1.get('contactPersonDetails').value;

    if (contactPersonDetailsForm.get("idNumber").valid && contactPersonDetails.idType != "ZS0003" && contactPersonDetails.idType != "FS0002" && contactPersonDetails.idType && contactPersonDetails.idNumber && contactPersonDetails.dateOfBirth && contactPersonDetailsForm.get("dateOfBirth").valid) {

      let d = contactPersonDetails.dateOfBirth["calendarStart"];
      let cpdob = "";
      if (d.day < 10) {
        d.day = d.day;
      }
      if (d.month < 10) {
        d.month = d.month;
      }
      let day = "";
      let mnth = "";
      if (d.day < 10) day = "0" + d.day;
      else day = d.day;
      if (d.month < 10) mnth = "0" + d.month;
      else mnth = d.month;
      cpdob = d.year + "" + mnth + "" + day;

      this.signupService.getTaxPayerDetails('', contactPersonDetails.idType, contactPersonDetails.idNumber, '', '', cpdob).subscribe((response: any) => {
        console.log("tinNumber details", response);
        this.tinDetails = response["d"] || {};
        const control = this.vatEligiblePersonForm1.get("contactPersonDetails");

        let dob = null;
        let issueDt = null;
        if (this.tinDetails.Birthdt) {
          issueDt = +this.tinDetails.Birthdt.substring(
            6,
            this.tinDetails.Birthdt.length - 2
          );
          dob = this.dpuService.getCalendarFormatDateFromAPIDate(this.tinDetails.Birthdt, this.calendarType);
        }

        control.patchValue({
          "tinNumber": this.tinDetails.Tin,
          "idType": this.tinDetails.Idtype,
          "idNumber": this.tinDetails.Idnum,
          "issueCountry": this.tinDetails.Country,
          "dateOfBirth": dob ? dob : contactPersonDetails.dateOfBirth ? contactPersonDetails.dateOfBirth : null,
          "firstName": this.tinDetails.Name1,
          "lastName": this.tinDetails.Name2,
          "mobileNumber": this.tinDetails.Mobile,
          "email": this.tinDetails.Email
        });
        this.updateContactPersonFormValidators();
      }, (error) => {
        // error while getting tin details  clear form
        // this.resetContactPersonForm(false, true, false);
        //this.updateContactPersonFormValidators();

        this.notifierService.notify(
          "error",
          error.error.error.innererror.errordetails[0].message
        );

      });
    }
  }

  onBCPIdNumberChange(source = '') {
    console.log("onBCPIdNumberChange");
    if (this.vatEligiblePersonForm1.value.contactPersonDetails.idType == 'ZS0001' || this.vatEligiblePersonForm1.value.contactPersonDetails.idType == 'ZS0002') {
      let exceptDOB = (source == 'dob') ? true : false;
      //const contactPersonDetailsForm = <FormGroup>this.vatEligiblePersonForm1.get("contactPersonDetails");
      this.resetContactPersonForm(false, false, true, true, exceptDOB);
      //this.updateContactPersonFormValidators();
      this.getContactPersonDetailsByIdType();
    }
  }

  closeModal(id) {
    jQuery("#" + id).modal('hide');
    setTimeout(() => {
      if (jQuery('.modal:visible').length) {
        jQuery('body').addClass('modal-open');
      }
    }, 500);
  }
  allowAlphabets(e) {
    var x = e.which || e.keycode;
    var theEvent = e || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex;
    // regex = /[دجحخ هعغفقثصضذطكمنتالبيسشظزوةىلارؤءئإلإلأأ؟آلآ]|\.|\s/;
    regex = /^[a-zA-Z\u0600-\u06FF ][\sa-zA-Z\u0600-\u06FF ]*$/
    if ((x >= 65 && x <= 90) || x == 32 || (x >= 97 && x <= 122) || regex.test(key)) return true;
    else return false;

  }

  
  onBCPMobileCodeChange() {
    this.vatEligiblePersonForm1.get("contactPersonDetails").get("mobileNumber").reset();
    let code = this.vatEligiblePersonForm1.get("contactPersonDetails").get("mobileCode").value;
    console.log("onBCPMobileCodeChange", code);
    // let validators = [];
    if (code != "966") {
      // let maxlength = 14 - (2 + (code.length));
      // Validators.maxLength(maxlength),
      this.vatEligiblePersonForm1.get("contactPersonDetails").get("mobileNumber").setValidators([Validators.required, Validators.minLength(9), CustomValidators.startsWithValidator("5")]);

      this.vatEligiblePersonForm.get("contactPersonDetails").get("mobileNumber").setErrors({ "startsWith": { value: true } })
    }
  }

  onBCPMobileNumberChange() {
    let code = this.vatEligiblePersonForm1.get("contactPersonDetails").get("mobileCode").value;
    console.log("onBCPMobileNumberChange", code);
    if (code != "966") {
      this.vatEligiblePersonForm1.get("contactPersonDetails").get("mobileNumber").setErrors({ "startsWith": { value: true } })
    }
  }

  getUniqueDocTypeRef(source = '', Dotyp, idType, idNumber: any = '') {

    //BR-000-RG01-CR1-123456
    //BR-000-RG02-LN1-123456
    //BR-000-RG02-LN2-123456
    //BR-000-RG08-CN1-123456
    //SH-001-RG09-ID1-1123456

    let uniqueDocTypeRef = "";
    if (source == 'EP') {
      uniqueDocTypeRef = source + "-" + this.vatEligiblePersonForm1.get('orgInfo').get('companyID').value;
    }
    uniqueDocTypeRef = uniqueDocTypeRef + "-" + Dotyp + "-" + idType;
    if (idNumber) {
      uniqueDocTypeRef = uniqueDocTypeRef + "-" + idNumber;
    }

    console.log("uniqueDocTypeRef", uniqueDocTypeRef);

    return uniqueDocTypeRef || "";

  }

  getOutletRefForFileUpload(source, legalPersonCategory = '') {
    //'001-7000013420'
    let OutletRef = "";
    if (source == "EP") {
      OutletRef = this.vatEligiblePersonForm1.get('orgInfo').get('companyID') + "-" + (this.vatEligiblePersonForm.get('personDetails').value.legalPersonCategory || "");
    }
    return OutletRef;
  }

  onClickFileControl(Dotyp, action = '', idNumber = '', control: any = null, displayLabel = '', idType = '') {

    this.shModalScrollPos = jQuery('#addShareholderDetailsModal').scrollTop();
    jQuery('#addShareholderDetailsModal').scrollTop(0);


    let uniqueDocTypeRef = this.getUniqueDocTypeRef(action, Dotyp, idType, idNumber);
    let attachmentObj = {
      ReturnIdx: this.registrationObj.ReturnIdx,
      fileObject: null,
      Dotyp: Dotyp,
      formControl: control,
      displayLabel: displayLabel,
      OutletRef: '',
      FileExtn: null,
      uniqueDocTypeRef: uniqueDocTypeRef,
    };
    this.showAttachments = true;
    console.log("attachmentObj" , attachmentObj);
    this.SignupAttachmentsComponent.setAttachmentObject(attachmentObj);
    this.SignupAttachmentsComponent.show();

    jQuery("#attachmentsModal").modal('show');
  } 

  submitVATEligiblePerson(password) {


    this.registrationObj['Ngotp'] = "1";
    this.registrationObj['Chkfg'] = "";
    this.registrationObj['Decfg'] = "X";
    this.registrationObj["PasswordAng"] = password;
    this.registrationObj["Operationx"] = "01";
    this.registrationObj['StepNumberx'] = '00';

    this.registrationObj.Nreg_ShareholderSet = [];
    this.registrationObj.Nreg_AddressSet = [];
    this.registrationObj.Nreg_CpersonSet = [];
    this.registrationObj.Nreg_ContactSet = [];
    this.registrationObj.Nreg_IdSet = [];
    this.registrationObj["Nreg_BtnSet"] = [];
    this.registrationObj["off_notesSet"] = [];
    this.registrationObj["Nreg_ShareholderSet"] = [];
    this.registrationObj["AttDetSet"] = [];
    this.registrationObj["Nreg_MSGSet"] = [];
    this.registrationObj["Nreg_FormEdit"] = {};
    delete this.registrationObj["__metadata"];

    this.saveVATEligiblePerson(this.registrationObj, 'submit');

  }
  
  onFileUploadSuccess(response) {
    console.log("onFileUploadSuccess", response);
  }
  onAttachmentsClose(response) {
    console.log("onAttachmentsClose", response);
    this.showAttachments = false;
    setTimeout(() => {
      jQuery('#addShareholderDetailsModal').scrollTop(this.shModalScrollPos);
    }, 10);
  }
}

export function startsWithValidator(startString: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    const isStarting = 0 === control.value.indexOf(startString);
    return isStarting ? null : { 'startsWith': { value: control.value } };
  };
}

export function EmailValidator(confirmEmailInput: string) {
  let confirmEmailControl: FormControl;
  let emailControl: FormControl;

  return (control: FormControl) => {
    if (!control.parent) {
      return null;
    }

    if (!confirmEmailControl) {
      confirmEmailControl = control;
      emailControl = control.parent.get(confirmEmailInput) as FormControl;
      emailControl.valueChanges.subscribe(() => {
        confirmEmailControl.updateValueAndValidity();
      });
    }

    if (confirmEmailControl.valid && emailControl.value !== confirmEmailControl.value) {
      return {
        notMatch: true
      };
    }
    return null;
  };
}
