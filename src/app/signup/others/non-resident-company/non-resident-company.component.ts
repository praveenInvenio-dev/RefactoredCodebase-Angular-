import { Component, OnInit, DoCheck, HostListener, ViewEncapsulation, ViewChild } from '@angular/core';
import { nRCLabels } from "./non-resident-company.constants";
import { interval, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import { DateAdapter } from '@angular/material/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
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
import { FinancialDetailsComponent } from '../../signup-components/financial-details/financial-details.component';
import { ResidentiaryDetailsComponent } from '../../signup-components/residentiary-details/residentiary-details.component';
import * as _ from 'underscore';
declare var jQuery: any;


@Component({
  selector: 'app-non-resident-company',
  templateUrl: './non-resident-company.component.html',
  styleUrls: ['./non-resident-company.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})


export class NonResidentCompanyComponent implements OnInit {
  lng: string;
  url = "/signup/others";
  lang;
  direction;
  nRCompanyForm: FormGroup;
  shareHolderDetailsForm: FormGroup;
  branchDetailsForm: FormGroup;
  compnayDetails: any = {};
  errorMsgsList: any = []; 
  businessCommencementDate: any = null;
  applicationNo: any;
  companyName: any;
  applicationSubmissionDate = new Date().toDateString();

  public BranchesList: any = [];
  public registrationObj: any = {};
  public showAcknowledgement: boolean = false;
  public reportingBranchesList: any = [];
  public phoneCodes: any = [];
  public mobileNumberMask = "0{15}";
  public contractNumberMask = "A{20}";
  public companyNameMask = "A{80}";
  public shareHoldersList: any = [];
  public tinDetails: any = {};
  public cpIdNumberMask = "0*";
  public citiesList: any = [];
  
  hideOnOtpVerification: boolean = false
  step2Validated: boolean = false;
  step2Completed: boolean = false;
  step3Completed: boolean = false;
  commencementDate: any = null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatHorizontalStepper) mainStepper: MatHorizontalStepper;
  @ViewChild(FinancialDetailsComponent)
  private FinancialDetailsComponent: FinancialDetailsComponent;
  @ViewChild(ResidentiaryDetailsComponent)
  private ResidentiaryDetailsComponent: ResidentiaryDetailsComponent;
  @ViewChild('sholderFormDirective') sholderFormDirective;
  @ViewChild(MatVerticalStepper) shareholderStepper: MatVerticalStepper;

  sholdersListdataSource: MatTableDataSource<any>;


  constructor(private _dateAdapter: DateAdapter<JDNConvertibleCalendar>, private _formBuilder: FormBuilder, private appSrv: AppService, private signupService: SignupService, public commonValid: CommonValidation, public notifierService: NotifierService, private router: Router) { }

  ngOnInit(): void {


    if (localStorage.getItem("lang") === "ar") {
      this.lng = "A";
      this.lang = nRCLabels.langz.arb.nRCompany;
      this.direction = nRCLabels.langz.arb.dir;
    } else {
      this.lng = "E";
      this.lang = nRCLabels.langz.eng.nRCompany;
      this.direction = nRCLabels.langz.eng.dir;
    }

    this.nRCompanyForm = this.getNRCompanyForm();
    this.shareHolderDetailsForm = this.getShareHolderDetailsForm();
    this.getPhoneCodes();
    this.getBranchesList();
    this.getRegistrationSet();
    this.commencementDate = new Date().getTime();
    this.businessCommencementDate = new Date().getTime();
    moment.locale('en-US');
  }

  onMainStepChange(event) {
    if (event.selectedIndex == 0) {
      this.nRCompanyForm.get("orgInfo").get("otpVerified").setValue('');
      this.nRCompanyForm.get("orgInfo").get("otpVerified").setValidators(Validators.required);
      this.nRCompanyForm.get("orgInfo").get("otpVerified").updateValueAndValidity();
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

  getNRCompanyForm() {
    let nRCompanyForm = this._formBuilder.group({
      orgInfo: this._formBuilder.group({
        tinNumber: ['', [Validators.minLength(10), Validators.pattern("^[3][0-9]*$")]],
        companyID: ['', [Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]],
        companyName: ['', [Validators.required, containsOnlyNumbers(), specialCharctersValidator()]],
        contractNumber: [''],
        reportingBranch: ['', Validators.required],
        otpVerified: ['', Validators.required],
        accounting: ['315A', Validators.required],
        compInyourCountryNumber: ['', [Validators.required, Validators.minLength(10)]],
        tinInyourCountryNumber: ['', [Validators.required, Validators.minLength(10)]],
      }),
      contactInfo: this._formBuilder.group({
        mobileNumber: ['', [Validators.required, Validators.maxLength(10)]], //, startsWithValidator("5")
        mobileCode: ['966', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email, EmailValidator('email')]]
      }),
      branchDetails: this._formBuilder.array([]),
      shareHolderDetails: this._formBuilder.array([]),
      financialDetails: this._formBuilder.group({
        accounting: ['A'],
        calendarType: ['H'],
        hijriSelected: [true],
        gregorianSelected: [true],
        tinNumber: [null],
        tanNumber: [null],
        capitalRegistrationDate: [null, futureDateValidator()],
        capitalAmount: [null],
        endOfFinancialDay: [null, Validators.required],
        endOfFinancialMonth: [null, Validators.required],
        commencementDate: [{ value: '', disabled: true }],
        taxableDate: [{ value: '', disabled: true }],
        taxableDateTime: ['']
      }),
      attachmentsList: this._formBuilder.array([])
    });
    return nRCompanyForm;
  }

  getTINDetails() {
    this.tinDetails = {};
    if (this.nRCompanyForm.get("orgInfo").get("tinNumber").valid && this.nRCompanyForm.get("orgInfo").get("tinNumber").value) {
      let tinNumber = this.nRCompanyForm.value.orgInfo.tinNumber;
      this.signupService.getTINDetails(tinNumber).subscribe((response) => {
        this.tinDetails = response["d"] || {};

        if (response["d"]["Idtype"] !== 'ZS0001' && response["d"]["Idtype"] !== 'ZS0002' && response["d"]["Idtype"] !== 'ZS0003' && response["d"]["Idtype"] !== 'FS0002') {
          return true;
        }       
        let dob = null;
        let issueDt = null;
        if (this.tinDetails.Birthdt) {
          issueDt = +this.tinDetails.Birthdt.substring(
            6,
            this.tinDetails.Birthdt.length - 2
          );
          dob = this.commonValid.toJulianDate1(new Date(issueDt));
        }

      }, (error) => {
        this.notifierService.notify(
          "error",
          error.error.error.innererror.errordetails[0].message
        );
      });
    } 
  }

  onCompanyIDChange() {

    this.nRCompanyForm.get("orgInfo").get("companyID").setValidators([Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
    this.nRCompanyForm.get("orgInfo").get("companyID").updateValueAndValidity();
    if (!this.nRCompanyForm.get("orgInfo").get("companyID").value) {
      this.nRCompanyForm.get("orgInfo").get("companyID").setValidators([Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
      this.nRCompanyForm.get("orgInfo").get("companyName").enable();
      this.nRCompanyForm.get("orgInfo").get("companyName").updateValueAndValidity();
      this.compnayDetails = {};
      this.nRCompanyForm.get("orgInfo").patchValue({ "tinNumber": "", "companyName": "" });
    } else if (this.nRCompanyForm.get("orgInfo").get("companyID").value && this.nRCompanyForm.get("orgInfo").get("companyID").valid) {
      let companyID = this.nRCompanyForm.value.orgInfo.companyID;
      this.signupService.getCompanyDetails(companyID).subscribe((response) => {
        this.compnayDetails = response["d"] || {};
        (this.compnayDetails.Source || "111")
        this.nRCompanyForm.get("orgInfo").patchValue({ "tinNumber": (this.compnayDetails.Tin || ''), "companyName": this.compnayDetails.FullName || "" });
  
        if (this.compnayDetails.FullName) {
          this.nRCompanyForm.get("orgInfo").get("companyName").disable();
        } else {
          this.nRCompanyForm.get("orgInfo").get("companyName").enable();
        }
        this.nRCompanyForm.get("orgInfo").get("companyName").updateValueAndValidity();
      }, (err) => {
        this.nRCompanyForm.get("orgInfo").get("companyID").setValidators([Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
        this.nRCompanyForm.get("orgInfo").get("companyName").enable();
        this.nRCompanyForm.get("orgInfo").get("companyName").updateValueAndValidity();
        this.nRCompanyForm.get("orgInfo").get("companyID").updateValueAndValidity();

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

  onMobileCodeChange() {
    this.nRCompanyForm.get("contactInfo").get("mobileNumber").reset();
    let code = this.nRCompanyForm.get("contactInfo").get("mobileCode").value;
    let validators = [];
  }

  getPhoneCodes() {
    this.appSrv.getPhoneCode().subscribe((res) => {
      this.phoneCodes = res["d"]["results"];
      this.phoneCodes.forEach((item) => {
        item["maxLength"] = 13 - item.Telefto.length;
      });
    });
  }

  onSubmitStep1() {
    if (!this.nRCompanyForm.get("contactInfo").valid || !this.nRCompanyForm.get('orgInfo').get('companyName').value || !this.nRCompanyForm.get('orgInfo').get('reportingBranch').valid) {
      return true;
    }
    let nRCompanyObj = this.nRCompanyForm.getRawValue();
    this.registrationObj["Id"] = nRCompanyObj.orgInfo.companyID;
    this.registrationObj["IdType"] = "ZS0005";
    this.registrationObj["Augrp"] = nRCompanyObj.orgInfo.reportingBranch;
    this.registrationObj["Regtype"] = "1";
    this.registrationObj["Operationx"] = "00";
    this.registrationObj["StepNumberx"] = "01";
    this.registrationObj["Taxtpdetermination"] = "1";
    this.registrationObj["Mobno"] = "00" + nRCompanyObj.contactInfo.mobileCode + nRCompanyObj.contactInfo.mobileNumber;
    this.registrationObj["Atype"] = "2";
    this.registrationObj["PortalUsrx"] = nRCompanyObj.contactInfo.email;
    this.registrationObj["NameOrg1"] = nRCompanyObj.orgInfo.companyName;
    this.registrationObj["Gpartx"] = nRCompanyObj.orgInfo.tinNumber;
    this.registrationObj.Nreg_OutletSet = [];
    this.registrationObj.Nreg_ActivitySet = [];
    this.registrationObj.Nreg_ShareholderSet = [];
    this.registrationObj.Nreg_AddressSet = [];
    this.registrationObj.Nreg_CpersonSet = [];
    this.registrationObj.Nreg_ContactSet = [];
    this.registrationObj.Nreg_IdSet = [];
    this.registrationObj["Nreg_BtnSet"] = [];
    this.registrationObj["off_notesSet"] = [];
    this.registrationObj["AttDetSet"] = [];
    this.registrationObj["Nreg_MSGSet"] = [];
    this.registrationObj["Nreg_FormEdit"] = {};
    delete this.registrationObj["__metadata"];

    this.ResidentiaryDetailsComponent.label.heading1 = this.ResidentiaryDetailsComponent.label.heading;
    this.ResidentiaryDetailsComponent.showTin = false;
    this.ResidentiaryDetailsComponent.showRepBranch = false;
    this.ResidentiaryDetailsComponent.resDetailsForm.get("resStatus").setValue("2");

    this.saveNRCompany(this.registrationObj, "step1");
  }

  saveNRCompany(registrationObj, action = '', dataObj = {}) {
    this.signupService.postNewRegSet(registrationObj).subscribe((response: any) => {
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
        this.companyName = response["d"]["NameOrg1"];
        this.showAcknowledgement = true;
        this.step3Completed = true;
      }

    }, (err) => {
      this.step2Completed = false;
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
      this.errorMsgsList = temp || [];
      if (this.errorMsgsList.length > 1) {
        jQuery("#errorMsgsModal").modal('show');
      } else {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    });
  }

  otpParams = {
    "IdType": "",
    "Id": "",
    "MobileNo": ""
  };
  startOTPverification() {
    this.nRCompanyForm.get("orgInfo").get("otpVerified").reset();
    let nRCompanyObj = this.nRCompanyForm.getRawValue();
    this.otpParams = {
      "IdType": nRCompanyObj.orgInfo.companyID ? "ZS0005" : "ZS0007",
      "Id": (!nRCompanyObj.orgInfo.companyID) ? nRCompanyObj.orgInfo.contractNumber || "" : nRCompanyObj.orgInfo.companyID || "",
      "MobileNo": "00" + nRCompanyObj.contactInfo.mobileCode + nRCompanyObj.contactInfo.mobileNumber,
    }

    if (nRCompanyObj.contactInfo.oldMobileNumber == this.otpParams.MobileNo) {
      this.onOTPSuccess({});
    } else {
      setTimeout(() => {
        this.hideOnOtpVerification = true;
      });
    }
  }

  onOTPSuccess(response) {
    this.notifierService.hideAll();
    this.nRCompanyForm.get("orgInfo").get("otpVerified").setValue(true);
    this.nRCompanyForm.get("contactInfo").patchValue({ "oldMobileNumber": "00" + this.nRCompanyForm.getRawValue().contactInfo.mobileCode + this.nRCompanyForm.getRawValue().contactInfo.mobileNumber });
    this.hideOnOtpVerification = false;
    this.mainStepper.selected.completed = true;

    this.mainStepper.next();
  }
  onInvalidOTP(response) {
    this.nRCompanyForm.get("orgInfo").get("otpVerified").reset();
  }
  onOTPError(error) {
    this.nRCompanyForm.get("orgInfo").get("otpVerified").reset();
  }

  onResDetailsChange(resDetails) {
    this.registrationObj = {...this.registrationObj, ...resDetails};
  }

  onBranchSaveSuccess(response) {
    this.registrationObj = response.apiResponse;
    this.BranchesList = response.branchesList;
    this.registrationObj["Commdt"] = "\/Date(" + response.commencementDate + ")\/";
    this.commencementDate = "\/Date(" + response.commencementDate + ")\/";
    this.businessCommencementDate = +response.commencementDate;
  }

  onBranchSaveEror(error) {
    this.step2Completed = false;
  }

  getBranchesList() {
    this.signupService.getBranches().subscribe((res: any) => {
      this.reportingBranchesList = res.d.results || [];;
    });
  }

  onShareholderSaveSuccess(response) {
    this.registrationObj = response.apiResponse;
    this.shareHoldersList = response.shareHoldersList;
  }

  onShareholderSaveEror(error) {
    this.step2Completed = false;
  }

  getRegistrationSet() {
    this.signupService.getNewRegSet({ tin: "", email: "", id: "", mobile: "", otp: "", }).subscribe((response: any) => {
      this.registrationObj = response["d"] || {};
      this.registrationObj['Taxtpdetermination'] = '1';
    })
  }

  onFinancialInfoChange(financialDetails) {
    this.nRCompanyForm.get("financialDetails").patchValue(financialDetails);
  }
  validateShareholderDetails() {
    let regObj: any = {};

    regObj = Object.assign({}, this.registrationObj);

    regObj.Chkfg = "X";
    regObj.Operationx = "";
    regObj.StepNumberx = "06";
    regObj.Nreg_OutletSet = [];
    regObj.Nreg_ActivitySet = [];
    regObj.Nreg_ShareholderSet = [];
    regObj.Nreg_AddressSet = [];
    regObj.Nreg_CpersonSet = [];
    regObj.Nreg_ContactSet = [];
    regObj.Nreg_IdSet = [];

    regObj["Nreg_BtnSet"] = [];
    regObj["off_notesSet"] = [];
    regObj["AttDetSet"] = [];
    regObj["Nreg_MSGSet"] = [];
    regObj["Nreg_FormEdit"] = {};
    delete regObj["__metadata"];
    return this.signupService.postNewRegSet(regObj);
  }

  validateFinancialDetails() {

    this.FinancialDetailsComponent.submit();
    let financialDetailsObj = this.nRCompanyForm.getRawValue().financialDetails;
    let regObj: any = {};

    regObj = Object.assign({}, this.registrationObj);

    regObj.Chkfg = "X";
    regObj.Operationx = "";
    regObj.StepNumberx = "04";
    regObj.Nreg_OutletSet = [];
    regObj.Nreg_ActivitySet = [];
    regObj.Nreg_ShareholderSet = [];
    regObj.Nreg_AddressSet = [];
    regObj.Nreg_CpersonSet = [];
    regObj.Nreg_ContactSet = [];
    regObj.Nreg_IdSet = [];

    regObj["Nreg_BtnSet"] = [];
    regObj["off_notesSet"] = [];
    regObj["AttDetSet"] = [];
    regObj["Nreg_MSGSet"] = [];
    regObj["Nreg_FormEdit"] = {};
    delete regObj["__metadata"];

    regObj["Accmethod"] = financialDetailsObj.accounting;
    regObj["Caltp"] = financialDetailsObj.calendarType;
    regObj["Fdcalender"] = financialDetailsObj.calendarType == "H" ? "2" : "1";
    regObj["Fdenddt"] = "\/Date(" + financialDetailsObj.taxableDateTime + ")\/";
    regObj["Fdday"] = financialDetailsObj.endOfFinancialDay || "";
    regObj["Fdmonth"] = financialDetailsObj.endOfFinancialMonth || "";
    regObj['Capamt'] = (financialDetailsObj.capitalAmount) ? parseFloat(financialDetailsObj.capitalAmount).toFixed(2).toString() : "0.00";
    regObj['Capregdt'] = null;
    return this.signupService.postNewRegSet(regObj);
  }


  validateStep2() {

    this.FinancialDetailsComponent.submit();
    this.ResidentiaryDetailsComponent.submit();
    this.step2Validated = false;
    this.step2Completed = false;
    let financialDetailsObj = this.nRCompanyForm.getRawValue().financialDetails;

    if (this.BranchesList.length == 0 || this.shareHoldersList.length == 0 || !financialDetailsObj.endOfFinancialDay || !financialDetailsObj.endOfFinancialMonth || this.ResidentiaryDetailsComponent.resDetailsForm.invalid) {
      this.step2Validated = false;
      return true;
    }
    this.step2Validated = true;
    this.validateShareholderDetails().subscribe((response) => {
      this.validateFinancialDetails().subscribe((response1) => {
        this.step2Validated = true;
        this.step2Completed = true;
        this.onSubmitStep2();
      }, (err) => {
        let errorsList = err.error.error.innererror.errordetails || [];
        errorsList.forEach((errorObj) => {
          if (errorObj.code != "/IWBEP/CX_MGW_BUSI_EXCEPTION") {
            this.notifierService.notify(
              "error",
              errorObj.message
            );
          }
        });
      })
    }, (err) => {

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
  }

  onSubmitStep2() {
    let financialDetailsObj = this.nRCompanyForm.getRawValue().financialDetails;

    this.registrationObj.Operationx = "05";
    this.registrationObj.StepNumberx = "04";
    this.registrationObj["Accmethod"] = financialDetailsObj.accounting;
    this.registrationObj["Caltp"] = financialDetailsObj.calendarType;
    this.registrationObj["Fdcalender"] = financialDetailsObj.calendarType == "H" ? "2" : "1";
    this.registrationObj["Fdenddt"] = "\/Date(" + financialDetailsObj.taxableDateTime + ")\/";
    this.registrationObj["Fdday"] = financialDetailsObj.endOfFinancialDay || "";
    this.registrationObj["Fdmonth"] = financialDetailsObj.endOfFinancialMonth || "";
    this.registrationObj['Capamt'] = (financialDetailsObj.capitalAmount) ? parseFloat(financialDetailsObj.capitalAmount).toFixed(2).toString() : "0.00";
    this.registrationObj['Capregdt'] = null;
    this.registrationObj.Nreg_OutletSet = [];
    this.registrationObj.Nreg_ActivitySet = [];
    this.registrationObj.Nreg_ShareholderSet = [];
    this.registrationObj.Nreg_AddressSet = [];
    this.registrationObj.Nreg_CpersonSet = [];
    this.registrationObj.Nreg_ContactSet = [];
    this.registrationObj.Nreg_IdSet = [];

    this.registrationObj["Nreg_BtnSet"] = [];
    this.registrationObj["off_notesSet"] = [];
    this.registrationObj["AttDetSet"] = [];
    this.registrationObj["Nreg_MSGSet"] = [];
    this.registrationObj["Nreg_FormEdit"] = {};
    delete this.registrationObj["__metadata"];

    this.saveNRCompany(this.registrationObj, 'step2');
  }

  submitConsortiumRegistration(password) {


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

    this.saveNRCompany(this.registrationObj, 'submit');

  }

  markAllControlsAsPristine(formGroup: FormGroup) {        
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {            
        control.markAsPristine({ onlySelf: true });
        control.markAsUntouched();
        control.updateValueAndValidity();
        control.setErrors(null);
      } else if (control instanceof FormGroup) {        
        this.markAllControlsAsPristine(control);            
      }
    });
  }

  disableAllFormControls(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {
        control.disable();         
        control.markAsPristine();
        control.markAsUntouched();
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {        
        this.markAllControlsAsPristine(control);            
      }
    });
  }

  /* ******************************* Shareholder Details Starts ************************************** */
  generateShareholderNumber() {
    var l = this.shareHoldersList.length + 1;
    if (l <= 9) {
      l = "00" + l;
      return l;
    }
    if (l > 9 && l <= 99) {
      l = "0" + l;
      return l;
    }

  }


  onsharePercentageTypeChange(selectedspt) {
    const shareHolderPercentageDetailsForm = this.shareHolderDetailsForm.get("shareHolderPercentageDetails");
    shareHolderPercentageDetailsForm.patchValue({
      typeOfSharePercentage: selectedspt.id
    });
  }
  getShareHolderDetailsForm() {
    let shareHolderDetailsForm = this._formBuilder.group({
      action: [''],
      shareHolderDetails: this._formBuilder.group({
        shNo: [''],
        shareCapital: ['', Validators.required],
        shareCapitalStartDate: ['', [Validators.required, futureDateValidator()]],
        shareProfit: ['', Validators.required],
        shareProfitStartDate: ['', [Validators.required, futureDateValidator()]]
      }),
      shareHolderPercentageDetails: this._formBuilder.group({
        shareHolderType: ['MC01', Validators.required],
        tinNumber: ['', Validators.required],
        idType: ['ZS0001', Validators.required],
        idNumber: ['', Validators.required],
        issueCountry: ['', Validators.required],
        companyName: ['', Validators.required],
        startDate: ['', [Validators.required, futureDateValidator()]],
        typeOfSharePercentage: ['', Validators.required],
        saudiGccShare: ['', Validators.required],
        foreignShare: ['', Validators.required],
        dateOfBirth: ['', [Validators.required, futureDateValidator()]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        mobileCode: ['966'],
        mobileNumber: ['', Validators.required],
        email: ['', Validators.required],
        Shrbvalue: [''],
        Shleapplicable: [''],
        copyOfFile: ['', Validators.required]
      }),
      addressDetails: this._formBuilder.group({
        country: [''],
        province: [''],
        city: [''],
        cityCode: [''],
        cityName: [''],
        district: [''],
        streetName: ['', Validators.maxLength(60)],
        buildingNumber: ['', Validators.maxLength(10)],
        zipCode: [''],
        additionalNumber: ['', Validators.maxLength(10)],
        unitNumber: ['', Validators.maxLength(10)]
      }),
      communicationDetails: this._formBuilder.group({
        mobileCode: ['966'],
        mobileNumber: ['', Validators.required],
        email: ['', Validators.required]
      })
    });
    return shareHolderDetailsForm;
  }
  getFileLabel() {
    const idTypeValue = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("idType").value;
    let selectedIdType = this.shIdTypesList.filter((idType) => {
      if (idType.Key == idTypeValue) {
        return true;
      }
    });
    if (selectedIdType.length > 0) {
      return this.lang.err.copyOfText + selectedIdType[0].Text;
    } else {
      return "";
    }
  }
  transformSharehodlerDetails(shareholderObj) {


    let Nreg_ShareholderSet = [];
    let shareHolder = new Shareholder();
    shareHolder.Shbirthdt = null;
    shareHolder.Caltp = "H";
    shareHolder.DataVersion = "";
    shareHolder.Shattfg = "X";
    shareHolder.Shcap = shareholderObj.shareHolderDetails.shareCapital || "0";

    shareHolder.Shcapstartdt = this.commonValid.changeDate1(
      shareholderObj.shareHolderDetails.shareCapitalStartDate
    );
    shareHolder.Shcapenddt = "/Date(253402251010000)/";
    shareHolder.Shprof = shareholderObj.shareHolderDetails.shareProfit || "0";
    shareHolder.Shprofstartdt = this.commonValid.changeDate1(
      shareholderObj.shareHolderDetails.shareProfitStartDate
    );
    shareHolder.Shprofenddt = "/Date(253402251010000)/";
    shareHolder.Shgccattfg = false;

    shareHolder.Shnm1 = shareholderObj.shareHolderPercentageDetails.companyName || "";
    shareHolder.Shno = shareholderObj.shareHolderDetails.shNo || "";
    shareHolder.Shreltp = "ZMC001";
    shareHolder.Shstartdt = "/Date(" + this.getCommencementDate() + ")/";
    shareHolder.Shenddt = "/Date(253402251010000)/";
    shareHolder.Shtin = shareholderObj.shareHolderPercentageDetails.tinNumber || "";
    shareHolder.Shtp = shareholderObj.shareHolderPercentageDetails.shareHolderType || "";


    let Shrbvalue = "";
    let Shleapplicable = "";

    if (shareholderObj.shareHolderPercentageDetails.idType == "ZS0005" || shareholderObj.shareHolderPercentageDetails.idType == "ZS0012" || shareholderObj.shareHolderPercentageDetails.idType == "ZS0011") {

      if (shareholderObj.shareHolderPercentageDetails.typeOfSharePercentage == "RS") {
        Shrbvalue = "01";
        Shleapplicable = "S";
      } else if (shareholderObj.shareHolderPercentageDetails.typeOfSharePercentage == "RF") {
        Shrbvalue = "02";
        Shleapplicable = "F";
      } else if (shareholderObj.shareHolderPercentageDetails.typeOfSharePercentage == "RM") {
        Shrbvalue = "03";
        Shleapplicable = "M";
      } else if (shareholderObj.shareHolderPercentageDetails.typeOfSharePercentage == "RG") {
        Shrbvalue = "04";
        Shleapplicable = "M";
      } else if (shareholderObj.shareHolderPercentageDetails.typeOfSharePercentage == "RO") {
        Shrbvalue = "05";
        Shleapplicable = "M";
      } else {
        Shrbvalue = "";
        Shleapplicable = "";
      }
    }
    shareHolder.Shletype = shareholderObj.shareHolderPercentageDetails.typeOfSharePercentage || "";
    shareHolder.Shsagccshare = shareholderObj.shareHolderPercentageDetails.saudiGccShare || "0";
    shareHolder.Shforeignshare = shareholderObj.shareHolderPercentageDetails.foreignShare || "0";
    shareHolder.Shrbvalue = Shrbvalue || "";
    shareHolder.Shleapplicable = Shleapplicable || "";

    Nreg_ShareholderSet.push(shareHolder);
    return Nreg_ShareholderSet;
  }
  resetShareholderPercentageDetailsForm() {
    const shareHolderPercentageDetailsForm = <FormGroup>this.shareHolderDetailsForm.get("shareHolderPercentageDetails");
    let data = shareHolderPercentageDetailsForm.value;
    shareHolderPercentageDetailsForm.patchValue({
      shareHolderType: 'MC01',
      issueCountry: '',
      startDate: this.commonValid.toJulianDate1(new Date()),
      typeOfSharePercentage: '',
      saudiGccShare: '',
      foreignShare: '',
      dateOfBirth: null,
      companyName: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      confirmEmail: '',
      copyOfCommercialNumberFile: '',
      copyOfIquamaFile: '',
      copyOfPassportFile: '',
      Shrbvalue: '',
      Shleapplicable: ''
    });

    const commcontrol = this.shareHolderDetailsForm.get("communicationDetails");
    commcontrol.patchValue({
      "mobileNumber": '',
      "email": ''
    });
  }
  onShareholderTINChange() {
    this.updateShareholderPercentageDetailsValidators();
    const shareHolderPercentageDetailsForm = <FormGroup>this.shareHolderDetailsForm.get("shareHolderPercentageDetails");
    let data = shareHolderPercentageDetailsForm.value;

    const tinControl = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("tinNumber");
    const idTypeControl = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("idType");
    const idNumberControl = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("idNumber");

    idTypeControl.setValue("ZS0001");
    idNumberControl.reset();
    this.resetShareholderPercentageDetailsForm();
    if (tinControl.invalid) {
      return true;
    }

    this.getTaxPayerDetails();
  }
  public shTinDetails: any = {};
  getTaxPayerDetails() {
    let shareHolderDetails = this.shareHolderDetailsForm.value.shareHolderPercentageDetails;
    this.signupService.getTaxPayerDetails(shareHolderDetails.tinNumber || '',
      shareHolderDetails.idType || '',
      shareHolderDetails.idNumber || '',
      shareHolderDetails.issueCountry || '',
      '',
      shareHolderDetails.dateOfBirth || '').subscribe((response: any) => {
        this.shTinDetails = response["d"] || {};
        if (this.shTinDetails.Bpkind == '06A' || this.shTinDetails.Bpkind == '00' || true) {

          let dob = null;
          if (this.shTinDetails.Birthdt) {
            let issueDt = +this.shTinDetails.Birthdt.substring(
              6,
              this.shTinDetails.Birthdt.length - 2
            );
            dob = this.commonValid.toJulianDate1(new Date(issueDt))
          }


          const control = this.shareHolderDetailsForm.get("shareHolderPercentageDetails");
          control.patchValue({
            "tinNumber": this.shTinDetails.Tin,
            "idType": this.shTinDetails.Idtype,
            "idNumber": this.shTinDetails.Idnum,
            "issueCountry": this.shTinDetails.Country,
            "dateOfBirth": dob,
            "companyName": this.shTinDetails.FullName,
            "firstName": this.shTinDetails.Name1,
            "lastName": this.shTinDetails.Name2,
            "mobileNumber": this.shTinDetails.Mobile,
            "email": this.shTinDetails.Email,
            "saudiGccShare": "0.0000",
            "foreignShare": "0.0000"
          });

          const addrcontrol = this.shareHolderDetailsForm.get("addressDetails");
          addrcontrol.patchValue({
            "country": this.shTinDetails.Country,
            "province": this.shTinDetails.Province,
            "city": this.shTinDetails.Province,
            "cityName": "",
            "cityCode": "",
            "district": this.shTinDetails.Quarter,
            "streetName": this.shTinDetails.Street1,
            "buildingNumber": this.shTinDetails.BuildingNo,
            "zipCode": this.shTinDetails.PostalCode,
            "additionalNumber": this.shTinDetails.AdditionalNo,
            "floor": this.shTinDetails.Floor,
            "quarter": this.shTinDetails.Quarter,
            "unitNumber": this.shTinDetails.Floor
          });

          const commcontrol = this.shareHolderDetailsForm.get("communicationDetails");
          commcontrol.patchValue({
            "mobileNumber": this.shTinDetails.Mobile,
            "email": this.shTinDetails.Email
          });

          this.updateShareholderPercentageDetailsValidators();
          this.updateSaudiAndForeignShare();
        } else {
          this.updateShareholderPercentageDetailsValidators();
          this.updateSaudiAndForeignShare();
        }
      }, (error) => {
        this.updateShareholderPercentageDetailsValidators();
        this.updateSaudiAndForeignShare();

        this.notifierService.notify(
          "error",
          error.error.error.innererror.errordetails[0].message
        );
      });
  }
  closeModal(id) {
    jQuery("#" + id).modal('hide');
  }
  onShareholderIdTypeChange() {
    this.updateShareholderPercentageDetailsValidators();
    this.resetShareholderPercentageDetailsForm();
    const tinControl = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("tinNumber");
    const idTypeControl = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("idType");
    if (idTypeControl.value == 'ZS0011') {
      jQuery("#tinInYourCountryInfoModal").modal("show");
    }
    tinControl.reset(); 
    if (idTypeControl.invalid) {
      return true;
    }
    this.updateSaudiAndForeignShare();

    this.getTaxPayerDetails();
  }
  onShareholderIdNumberChange() {
    this.resetShareholderPercentageDetailsForm();
    this.updateShareholderPercentageDetailsValidators();
    const tinControl = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("tinNumber");
    const idNumberControl = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("idNumber");
    tinControl.reset();

    if (idNumberControl.invalid) {
      return true;
    }
    this.getTaxPayerDetails();
  }
  updateSaudiAndForeignShare(saudiGccShare = "0.0000", foreignShare = "0.0000") {

    const shareHolderPercentageDetailsForm = this.shareHolderDetailsForm.get("shareHolderPercentageDetails");
    let idType = shareHolderPercentageDetailsForm.get("idType").value;

    shareHolderPercentageDetailsForm.get("saudiGccShare").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("foreignShare").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("typeOfSharePercentage").setValidators(Validators.required);
    if (idType == "ZS0011") {
      shareHolderPercentageDetailsForm.patchValue({
        saudiGccShare: "0.0000",
        foreignShare: "100.0000",
        typeOfSharePercentage: "RO"
      });
      shareHolderPercentageDetailsForm.get("saudiGccShare").disable();
      shareHolderPercentageDetailsForm.get("foreignShare").disable();
      shareHolderPercentageDetailsForm.get("typeOfSharePercentage").disable();
    } else if (idType == "ZS0012") {
      shareHolderPercentageDetailsForm.patchValue({
        saudiGccShare: saudiGccShare || "",
        foreignShare: foreignShare || "",
        typeOfSharePercentage: "RG"
      });
      shareHolderPercentageDetailsForm.get("typeOfSharePercentage").disable();
    } else if (idType == "ZS0005") {
      shareHolderPercentageDetailsForm.patchValue({
        saudiGccShare: saudiGccShare || "",
        foreignShare: foreignShare || "",
        typeOfSharePercentage: ""
      });

    } else {

      shareHolderPercentageDetailsForm.get("saudiGccShare").setValidators(null);
      shareHolderPercentageDetailsForm.get("foreignShare").setValidators(null);
      shareHolderPercentageDetailsForm.get("typeOfSharePercentage").setValidators(null);

      shareHolderPercentageDetailsForm.patchValue({
        saudiGccShare: "0.0000",
        foreignShare: "0.0000",
        typeOfSharePercentage: ""
      });
      shareHolderPercentageDetailsForm.get("saudiGccShare").enable();
      shareHolderPercentageDetailsForm.get("foreignShare").enable();
      shareHolderPercentageDetailsForm.get("typeOfSharePercentage").enable();
    }
    shareHolderPercentageDetailsForm.updateValueAndValidity();
    this.updateTypeOfsharePercentageDetails();
    this.shareHolderDetailsForm.updateValueAndValidity();
  }
  updateTypeOfsharePercentageDetails() {
    let shareHolderPercentageDetails = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").value;
    const shareHolderPercentageDetailsForm = this.shareHolderDetailsForm.get("shareHolderPercentageDetails");

    if (shareHolderPercentageDetails.IdType == "ZS0005" || shareHolderPercentageDetails.IdType == "ZS0012" || shareHolderPercentageDetails.IdType == "ZS0011") {
      let Shrbvalue = "";
      let Shleapplicable = "";


      if (shareHolderPercentageDetails.typeOfSharePercentage == "RS") {
        Shrbvalue = "01";
        Shleapplicable = "S";
      } else if (shareHolderPercentageDetails.typeOfSharePercentage == "RF") {
        Shrbvalue = "02";
        Shleapplicable = "F";
      } else if (shareHolderPercentageDetails.typeOfSharePercentage == "RM") {
        Shrbvalue = "03";
        Shleapplicable = "M";
      } else if (shareHolderPercentageDetails.typeOfSharePercentage == "RG") {
        Shrbvalue = "04";
        Shleapplicable = "M";
      } else if (shareHolderPercentageDetails.typeOfSharePercentage == "RO") {
        Shrbvalue = "05";
        Shleapplicable = "M";
      }
      shareHolderPercentageDetailsForm.patchValue({
        Shrbvalue: Shrbvalue,
        Shleapplicable: Shleapplicable
      });

    } else {
      shareHolderPercentageDetailsForm.patchValue({
        Shrbvalue: "",
        Shleapplicable: ""
      });
    }
  }
  updateShareholderPercentageDetailsValidators() {
    let shareHolderPercentageDetails = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").value;
    const shareHolderPercentageDetailsForm = <FormGroup>this.shareHolderDetailsForm.get("shareHolderPercentageDetails");
    shareHolderPercentageDetailsForm.get("tinNumber").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[3][0-9]*$")]);
    shareHolderPercentageDetailsForm.get("idType").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("idNumber").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("issueCountry").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("companyName").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("dateOfBirth").setValidators([Validators.required, futureDateValidator()]);
    shareHolderPercentageDetailsForm.get("firstName").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("lastName").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("startDate").setValidators([Validators.required, futureDateValidator()]);
    shareHolderPercentageDetailsForm.get("mobileNumber").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("email").setValidators([Validators.required, Validators.email]);
    shareHolderPercentageDetailsForm.get("copyOfFile").setValidators(Validators.required);

    shareHolderPercentageDetailsForm.enable();

    const commcontrol = this.shareHolderDetailsForm.get("communicationDetails");
    commcontrol.get("mobileNumber").setValidators(Validators.required);
    commcontrol.get("email").setValidators([Validators.required, Validators.email]);
    commcontrol.enable();

    if (shareHolderPercentageDetailsForm.get("tinNumber").value && shareHolderPercentageDetailsForm.get("tinNumber").valid) {
      shareHolderPercentageDetailsForm.get("firstName").disable();
      shareHolderPercentageDetailsForm.get("lastName").disable();
      shareHolderPercentageDetailsForm.get("mobileNumber").disable();
      shareHolderPercentageDetailsForm.get("email").disable();
      shareHolderPercentageDetailsForm.get("dateOfBirth").disable();
      shareHolderPercentageDetailsForm.get("issueCountry").disable();
      shareHolderPercentageDetailsForm.get("companyName").disable();

      shareHolderPercentageDetailsForm.get("firstName").clearValidators();
      shareHolderPercentageDetailsForm.get("lastName").clearValidators();
      shareHolderPercentageDetailsForm.get("mobileNumber").clearValidators();
      shareHolderPercentageDetailsForm.get("email").clearValidators();
      shareHolderPercentageDetailsForm.get("dateOfBirth").clearValidators();
      shareHolderPercentageDetailsForm.get("issueCountry").clearValidators();
      shareHolderPercentageDetailsForm.get("companyName").clearValidators();


      commcontrol.get("mobileNumber").disable();
      commcontrol.get("email").disable();
      commcontrol.get("mobileNumber").clearValidators();
      commcontrol.get("email").clearValidators();

    } else if (shareHolderPercentageDetails.idType == 'ZS0001') {
      this.cpIdNumberMask = "0000000000";
      shareHolderPercentageDetailsForm.get("idNumber").setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[1][0-9]*$")]);
    } else if (shareHolderPercentageDetails.idType == 'ZS0002') {
      this.cpIdNumberMask = "0000000000";
      shareHolderPercentageDetailsForm.get("idNumber").setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[2][0-9]*$")]);
    } else if (shareHolderPercentageDetails.idType == 'ZS0003') {
      this.cpIdNumberMask = "0{15}";
      shareHolderPercentageDetailsForm.get("idNumber").setValidators([Validators.required, Validators.minLength(7), Validators.maxLength(15), Validators.pattern("^[0-9]*$")]);
    }
    else if (shareHolderPercentageDetails.idType == 'FS0002') {
      this.cpIdNumberMask = "A{20}";
      shareHolderPercentageDetailsForm.get("idNumber").setValidators([Validators.required, Validators.maxLength(20)]);
    }

    shareHolderPercentageDetailsForm.updateValueAndValidity();
    this.shareHolderDetailsForm.updateValueAndValidity();

  }

  addNewShareholder() {

    jQuery("#addShareholderDetailsModal").modal("show");
    this.sholderFormDirective.resetForm();
    this.shareHolderDetailsForm = this.getShareHolderDetailsForm();
    this.shareholderStepper.reset();
    this.shareHolderDetailsForm.patchValue({ "action": "add_sholder" });
    let commdate = new Date(this.getCommencementDate());
    this.shareHolderDetailsForm.get("shareHolderDetails").patchValue({
      "shNo": this.generateShareholderNumber(),
      "shareCapitalStartDate": this.commonValid.toJulianDate1(commdate),
      "shareProfitStartDate": this.commonValid.toJulianDate1(commdate),
    });
    let shareHolderPercentageDetailsForm = this.shareHolderDetailsForm.get("shareHolderPercentageDetails");

    shareHolderPercentageDetailsForm.patchValue({
      saudiGccShare: "100.0000",
      foreignShare: "100.0000"
    });
  }
  editShareholder(shareHolderObj) {
    this.sholderFormDirective.resetForm();
    this.shareHolderDetailsForm = this.getShareHolderDetailsForm();
    this.shareholderStepper.reset();
    shareHolderObj.shareHolderPercentageDetails.copyOfCommercialNumberFile = '';
    shareHolderObj.shareHolderPercentageDetails.copyOfIquamaFile = '';
    shareHolderObj.shareHolderPercentageDetails.copyOfPassportFile = '';
    shareHolderObj.action = 'update_sholder';
    this.shareHolderDetailsForm.patchValue(shareHolderObj);
    this.updateShareholderPercentageDetailsValidators();
    jQuery("#addShareholderDetailsModal").modal("show");

  }
  deleteShareHolderObj: any = {};
  confirmDeleteShareholder(shareHolderObj) {
    this.deleteShareHolderObj = shareHolderObj;
    jQuery("#confirmDeleteShareholderModal").modal("show");
  }


  deleteShareholder(shareHolderObj) {

    let delShareHolderObj = {
      fbNum: this.registrationObj["ReturnIdx"],
      shNo: shareHolderObj.shareHolderDetails.shNo,
      email: this.registrationObj["PortalUsrx"]
    }
    this.signupService.deleteShareholder(delShareHolderObj).subscribe((response: any) => {
      this.deleteShareHolderObj = {};
      jQuery("#confirmDeleteShareholderModal").modal("hide");
      this.calcluateSharePercentages();
      this.updateShareholdersList('delete_sholder', shareHolderObj);
    }, (error) => {
      this.deleteShareHolderObj = {};
      jQuery("#confirmDeleteShareholderModal").modal("hide");

      this.notifierService.notify(
        "error",
        error.error.error.innererror.errordetails[0].message
      );
    });
  }
  saveShareholder() {
    this.shareholderStepper.next();

    let shareholderObj = this.shareHolderDetailsForm.getRawValue();

    shareholderObj.addressDetails.tinNumber = shareholderObj.shareHolderPercentageDetails.tinNumber || "";;
    shareholderObj.communicationDetails.tinNumber = shareholderObj.shareHolderPercentageDetails.tinNumber || "";

    let Nreg_ShareholderSet = this.transformSharehodlerDetails(shareholderObj);
    let Nreg_AddressSet = this.transformAddressDetails(shareholderObj.addressDetails, 'Shareholder');
    let Nreg_CpersonSet = this.transformContactPersonDetails(shareholderObj.shareHolderPercentageDetails, 'Shareholder');
    let Nreg_ContactSet = this.transformContactDetails(shareholderObj.communicationDetails, 'Shareholder');
    let Nreg_IdSet = this.transformIdDetails(shareholderObj.shareHolderPercentageDetails);


    this.registrationObj.Operationx = "";
    this.registrationObj.StepNumberx = "06";
    this.registrationObj.UserTypx = "TP";
    this.registrationObj.Nreg_ShareholderSet = Nreg_ShareholderSet;
    this.registrationObj.Nreg_AddressSet = Nreg_AddressSet;
    this.registrationObj.Nreg_CpersonSet = Nreg_CpersonSet;
    this.registrationObj.Nreg_ContactSet = Nreg_ContactSet;
    this.registrationObj.Nreg_IdSet = Nreg_IdSet;
    this.registrationObj.Nreg_OutletSet = [];
    this.registrationObj.Nreg_ActivitySet = [];

    this.registrationObj["Nreg_BtnSet"] = [];
    this.registrationObj["off_notesSet"] = [];
    this.registrationObj["AttDetSet"] = [];
    this.registrationObj["Nreg_MSGSet"] = [];
    this.registrationObj["Nreg_FormEdit"] = {};
    delete this.registrationObj["__metadata"];

    this.saveNRCompany(this.registrationObj, shareholderObj.action, shareholderObj);


  }

  public shIdTypesList: any = [];
  getShIdeTypesList(lang) {
    this.shIdTypesList = this.signupService.getShIdeTypesList(lang);
  }

  getCommencementDate() {
    let commDateTickFormat: any = null;
    let a = [];
    let minDate = new Date("2006-01-01").getTime();

    this.BranchesList.forEach((branchObj) => {
      branchObj.activityDetails.identificationsList.filter((identification) => {
        let tmpdate = this.commonValid.changeDate1(identification.validFrom);
        let validFromTimeStamp = +tmpdate.replace(/\D/g, '');
        a.push(validFromTimeStamp);
      });
    });

    a.sort(function (a, b) { return a - b });
    if (a[0] < minDate) {
      commDateTickFormat = minDate;

    } else {
      commDateTickFormat = a[0] || minDate;
    }

    this.registrationObj["Commdt"] = "\/Date(" + commDateTickFormat + ")\/";
    this.commencementDate = "\/Date(" + commDateTickFormat + ")\/";
    return commDateTickFormat;
  }

  calcluateSharePercentages() {

    let regObj: any = {};

    regObj = Object.assign({}, this.registrationObj);

    regObj.Chkfg = "X";
    regObj.Nreg_ShareholderSet = [];
    regObj.Nreg_AddressSet = [];
    regObj.Nreg_CpersonSet = [];
    regObj.Nreg_ContactSet = [];
    regObj.Nreg_IdSet = [];
    regObj["Nreg_BtnSet"] = [];
    regObj["off_notesSet"] = [];
    regObj["AttDetSet"] = []; 
    regObj["Nreg_MSGSet"] = [];
    regObj["Nreg_FormEdit"] = {};
    delete regObj["__metadata"];
    this.signupService.postNewRegSet(regObj).subscribe((response: any) => {
      this.getUpdatedRegSet();
    }, (err) => {
      this.getUpdatedRegSet();
    });
  }

  updateShareholdersList(action, shObj) {
    if (action == 'add_sholder') {
      this.shareHoldersList.push(shObj);
    } else if (action == 'update_sholder') {
      let shIndex = this.shareHoldersList.findIndex(sholder => sholder.shareHolderDetails.shNo == shObj.shareHolderDetails.shNo);
      this.shareHoldersList[shIndex] = shObj;
    } else if (action == 'delete_sholder') {
      let shIndex = this.shareHoldersList.findIndex(sholder => sholder.shareHolderDetails.shNo == shObj.shareHolderDetails.shNo);
      this.shareHoldersList.splice(shIndex, 1);
    }
    this.sholdersListdataSource = new MatTableDataSource(<any>this.shareHoldersList);
  }

  transformAddressDetails(addressDetails, source = 'Outlet') {
    let addressList = [];
    let addressObj = new AddressSet();


    delete addressObj.CorAddrnumber;
    delete addressObj.DataVersion;
    delete addressObj.StdAddrnumber;
    delete addressObj.StrSuppl1;
    delete addressObj.StrSuppl2;
    delete addressObj.RankingOrder;
    delete addressObj.FormGuid;
    delete addressObj.LineNo;
    delete addressObj.Mandt;


    addressObj.AddrType = "XXDEFAULT";
    addressObj.Begda = this.commonValid.changeDate1(this.commonValid.toJulianDate1(new Date()));
    addressObj.Building = addressDetails.buildingNumber || "";


    let selectedCity = [];
    selectedCity = this.citiesList.filter((city) => {
      return (city.CityCode == addressDetails.city)
    })
    if (selectedCity.length > 0) {
      addressObj.City1 = selectedCity[0].CityName
    } else {
      addressObj.City1 = "";
    }
    addressObj.City2 = addressDetails.district || "";;
    addressObj.CityCode = addressDetails.city || "";;
    addressObj.Country = addressDetails.country || "";;
    addressObj.Endda = "/Date(253402214400000)/";
    addressObj.Floor = addressDetails.unitNumber || "";;
    addressObj.Gpart = addressDetails.tinNumber || "";;
    addressObj.HouseNum1 = addressDetails.additionalNumber || "";;
    addressObj.HouseNum2 = addressDetails.additionalNumber || "";
    addressObj.PostCode1 = addressDetails.zipCode || "";
    addressObj.Region = addressDetails.province || "";
    addressObj.Sameasphy = "X";
    addressObj.Srcidentify = (source == 'Outlet') ? ("O" + this.generateOutletNumber()) : ('S' + this.generateShareholderNumber());
    addressObj.Street = addressDetails.streetName || "";

    addressList.push(addressObj);

    let addressObj1 = new AddressSet();


    delete addressObj1.CorAddrnumber;
    delete addressObj1.DataVersion;
    delete addressObj1.StdAddrnumber;
    delete addressObj1.StrSuppl1;
    delete addressObj1.StrSuppl2;
    delete addressObj1.RankingOrder;
    delete addressObj1.FormGuid;
    delete addressObj1.LineNo;
    delete addressObj1.Mandt;
    delete addressObj1.Sameasphy;

    addressObj1.AddrType = "0001";
    addressObj1.Begda = this.commonValid.changeDate1(this.commonValid.toJulianDate1(new Date()));
    addressObj1.Building = addressDetails.buildingNumber || "";

    selectedCity = [];
    selectedCity = this.citiesList.filter((city) => {
      return (city.CityCode == addressDetails.city)
    })
    if (selectedCity.length > 0) {
      addressObj1.City1 = selectedCity[0].CityName
    } else {
      addressObj1.City1 = "";
    }

    addressObj1.City2 = addressDetails.district || "";
    addressObj1.CityCode = addressDetails.city || "";
    addressObj1.Country = addressDetails.country || "";
    addressObj1.Endda = "/Date(253402214400000)/";
    addressObj1.Floor = addressDetails.unitNumber || "";
    addressObj1.Gpart = addressDetails.tinNumber || "";
    addressObj1.HouseNum1 = addressDetails.additionalNumber || "";
    addressObj1.HouseNum2 = addressDetails.additionalNumber || "";
    addressObj1.PostCode1 = addressDetails.zipCode || "";
    addressObj1.Region = addressDetails.province || "";
    addressObj1.Srcidentify = (source == 'Outlet') ? ("O" + this.generateOutletNumber()) : ('S' + this.generateShareholderNumber());
    addressObj1.Street = addressDetails.streetName || "";

    addressList.push(addressObj1);
    return addressList;
  }
  
  transformContactPersonDetails(contactPersonDetails, source = 'Outlet') {
    let contactPersonList = [];
    let contactPersonObj = new CpersonSet();

    delete contactPersonObj.Cpoldfg;
    delete contactPersonObj.DataVersion;
    delete contactPersonObj.FormGuid;
    delete contactPersonObj.LineNo;
    delete contactPersonObj.Mandt;
    delete contactPersonObj.RankingOrder;
    delete contactPersonObj.DataVersion;
    contactPersonObj.Srcidentify = "C" + this.generateOutletNumber();
    contactPersonObj.Outletnm = (source == 'Outlet') ? ("O" + this.generateOutletNumber()) : ('S' + this.generateShareholderNumber()); // Derive it dynamically based on Outlet length
    contactPersonObj.Contacttp = "BUR001";
    contactPersonObj.Dobdt = (contactPersonDetails.dateOfBirth) ? this.commonValid.changeDate1(
      contactPersonDetails.dateOfBirth
    ) : null;
    contactPersonObj.Startdt = contactPersonDetails.startDate ? this.commonValid.changeDate1(contactPersonDetails.startDate) : null;
    contactPersonObj.Enddt = "/Date(253402214400000)/";
    contactPersonObj.Familynm = contactPersonDetails.lastName || "";;
    contactPersonObj.Lastnm = contactPersonDetails.lastName || "";
    contactPersonObj.Firstnm = contactPersonDetails.firstName || "";
    contactPersonObj.Gmatt = true;
    contactPersonObj.Gpart = contactPersonDetails.tinNumber || "";
    contactPersonList.push(contactPersonObj);
    return contactPersonList;

  }
  transformContactDetails(contactPersonDetails, source = 'Outlet') {

    let contactList = [];
    let mobilecontactObj = new ContactSet();

    delete mobilecontactObj.Consnumber;
    delete mobilecontactObj.DataVersion;
    delete mobilecontactObj.FormGuid;
    delete mobilecontactObj.LineNo;
    delete mobilecontactObj.Mandt;
    delete mobilecontactObj.RankingOrder;

    mobilecontactObj.Begda = this.commonValid.changeDate1(
      this.commonValid.toJulianDate1(new Date())
    );

    mobilecontactObj.Endda = "/Date(253402214400000)/";
    mobilecontactObj.Srcidentify = (source == 'Outlet') ? "C" + this.generateOutletNumber() : ('S' + this.generateShareholderNumber());
    mobilecontactObj.SmtpAddr = "";
    mobilecontactObj.TelNumber = "00" + contactPersonDetails.mobileCode + "" + contactPersonDetails.mobileNumber;
    mobilecontactObj.R3User = "";
    mobilecontactObj.Gpart = contactPersonDetails.tinNumber || "";
    contactList.push(mobilecontactObj);

    let mobilecontactObj2 = Object.assign({}, mobilecontactObj);
    mobilecontactObj2.R3User = "X";
    mobilecontactObj2.SmtpAddr = contactPersonDetails.email;

    contactList.push(mobilecontactObj2);

    return contactList;

  }
  transformIdDetails(contactPersonDetails) {
    let IdList = [];
    let idObj: any = {};
    idObj.Type = contactPersonDetails.idType || "";
    idObj.Idnumber = contactPersonDetails.idNumber || "";
    idObj.Gpart = contactPersonDetails.tinNumber || "";
    idObj.Srcidentify = "C" + this.generateOutletNumber();
    idObj.Country = contactPersonDetails.issueCountry || "";
    IdList.push(idObj);
    return IdList;
  }

  
  getUpdatedRegSet() {
    let regObj: any = {};
    regObj = Object.assign({}, this.registrationObj);
    regObj.Fbnumx = this.registrationObj.FbnumAngx;
    this.signupService.getUpdatedRegSet(regObj).subscribe((response: any) => {
      this.registrationObj.Sapartnershare = response["d"].Sapartnershare || {};
      this.registrationObj.Saprofitshare = response["d"].Saprofitshare || {};

      this.registrationObj.Forpartnershare = response["d"].Forpartnershare || {};
      this.registrationObj.Forprofitshare = response["d"].Forprofitshare || {};
    });
  }

  
  generateOutletNumber() {
    var l = this.BranchesList.length;
    if (l <= 9) {
      l = "00" + l;
      return l;
    }
    if (l > 9 && l <= 99) {
      l = "0" + l;
      return l;
    }

  }
  /* ******************************* Shareholder Details Ends ************************************** */
}

export function companyIDValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    return { 'invalidID': { value: control.value } };
  };
}

export function containsOnlyNumbers(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    var regexp = /^\d+$/;
    let isOnlyNumbers = false;
    isOnlyNumbers = regexp.test(control.value);
    return isOnlyNumbers ? { 'containsOnlyNumbers': { value: control.value } } : null
  };
}

export function specialCharctersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    let regexp = new RegExp("(?=.*[$@$!%*#?&])");
    const containsSpecialChars = regexp.test(control.value);
    return containsSpecialChars ? { 'containsSpecialChars': { value: control.value } } : null
  };
}

export function startsWithZeroValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    var regexp = /^[1-9][0-9]*$/
    let startsWithZero = false;
    startsWithZero = !regexp.test(control.value);
    return startsWithZero ? { 'startsWithZero': { value: control.value } } : null
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

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    let date = control.value.calendarStart;
    let calendarType = control.value.calendarName;
    let format = "YYYY/MM/DD";
    if (calendarType == "Islamic") {
      format = 'iYYYY/iMM/iDD';
    }
    let timeStamp = moment(date.year + '/' + date.month + '/' + date.day, format).valueOf();
    let futureDate = new Date().getTime() < timeStamp;
    if (futureDate) {
      control.markAsTouched();
    }
    return futureDate ? { 'futureDate': true } : null;
  };


}

