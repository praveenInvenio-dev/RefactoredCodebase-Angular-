import { Component, OnInit, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { ohConstants } from './oil-hydrocarbon.constants';
import { interval, of, Subscription } from 'rxjs';
import { FinancialDetailsComponent } from '../../signup-components/financial-details/financial-details.component';
import { ResidentiaryDetailsComponent } from '../../signup-components/residentiary-details/residentiary-details.component';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatHorizontalStepper, MatVerticalStepper } from '@angular/material/stepper';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { AppService } from 'src/app/app.service';
import { SignupService } from 'src/app/services/signup.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { DatepickerUtilitiesService } from 'src/app/shared/services/datepicker-utilities.service';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';
import * as _ from 'lodash';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CustomValidators } from 'src/app/shared/custom-validators';
declare var jQuery: any;
@Component({
  selector: 'app-oil-hydrocarbon',
  templateUrl: './oil-hydrocarbon.component.html',
  styleUrls: ['./oil-hydrocarbon.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class OilHydrocarbonComponent implements OnInit {

  public BranchesList: any = [];
  @ViewChild(FinancialDetailsComponent)
  private FinancialDetailsComponent: FinancialDetailsComponent;
  @ViewChild(ResidentiaryDetailsComponent)
  private ResidentiaryDetailsComponent: ResidentiaryDetailsComponent;
  businessCommencementDate: any = null;
  ohForm: FormGroup;
  lang: any = {};
  direction: string = "ltr";
  applicationNo: any;
  companyName: any;
  applicationSubmissionDate = new Date();
  hideOnOtpVerification: boolean = false;
  @ViewChild(MatHorizontalStepper) mainStepper: MatHorizontalStepper;
  public phoneCodes: any = [];
  compnayDetails: any = {};
  public mobileNumberMask = "0{15}";
  public contractNumberMask = "A{20}";
  public companyNameMask = "A{80}";
  //public licenseNumberMask = "A{15}";
  public selectedLanguage = "en";

  errorMsgsList: any = [];
  calendarType: string = "Gregorian";
  public reportingBranchesList: any = [];

  step2Validated: boolean = false;
  step2Completed: boolean = false;
  step3Completed: boolean = false;
  public showAcknowledgement: boolean = false;
  public registrationObj: any = {};
  sharePercentageTypes: any = [];
  commencementDate: any = null;
  public shareHoldersList: any = [];
  public financialDdays: any = [];
  public financialMonths: any = [];
  innerWidth: number;
  headerComponent = CalendarComponent;
  panelOpenState: boolean = false;
  // applicationNo: any;
  // companyName: any;
  // applicationSubmissionDate = new Date().toDateString();
  maxDate = moment([2020 + 1, 11, 31]);//new Date(new Date().setFullYear(2021));
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  
  }
  public countiesList: any = [];
  public statesList: any = [];
  public citiesList: any = [];



  constructor(private _dateAdapter: DateAdapter<JDNConvertibleCalendar>, private _formBuilder: FormBuilder, private appSrv: AppService, private signupService: SignupService, public notifierService: NotifierService, private router: Router, private dpuService: DatepickerUtilitiesService) { }
  ngOnInit(): void {
    
    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      this.calendarType = this._dateAdapter.activeCalendar;
    }
    if (localStorage.getItem("lang") === "ar") {
      this.lang = ohConstants.langz.arb.consortium;
      this.direction = ohConstants.langz.arb.dir;
      this.selectedLanguage = "ar";
    } else {
      this.lang = ohConstants.langz.eng.consortium;
      this.direction = ohConstants.langz.eng.dir;
    }
    this.mobileNumberMask = "0{15}";
    this.contractNumberMask = "A{20}";
    this.companyNameMask = "A{80}";
    this.ohForm = this.getOhForm();
    this.getPhoneCodes();
    this.getBranchesList();
    this.getRegistrationSet();
    this.commencementDate = new Date().getTime();
    this.businessCommencementDate = new Date().getTime();
    moment.locale('en-US');
    this.financialDdays = this.lang.days;
    this.financialMonths = this.lang.months;
    this.sharePercentageTypes = this.lang.sharePercentageTypes;

    jQuery("#attachmentsModal").on('hidden.bs.modal', function (e) {
      jQuery('body').addClass('modal-open');
    });

    this.dpuService.datepickerEvents.subscribe((calendarType) => {
      this.calendarType = calendarType;
      let fields = ["shareCapitalStartDate", "shareProfitStartDate", "startDate", "dateOfBirth", "validFrom"]
    });

  }

  getBranchesList() {
    this.signupService.getBranches().subscribe((res: any) => {
      this.reportingBranchesList = res.d.results || [];;
    });
  }

  getPhoneCodes() {
    this.appSrv.getPhoneCode().subscribe((res) => {
      this.phoneCodes = res["d"]["results"];
      this.phoneCodes.forEach((item) => {
        item["maxLength"] = 13 - item.Telefto.length;
      });
    });
  }


  getRegistrationSet() {
    this.signupService.getNewRegSet({ tin: "", email: "", id: "", mobile: "", otp: "", }).subscribe((response: any) => {
      
      this.registrationObj = response["d"] || {};
    })
  }

  onCompanyIDChange() {

    this.ohForm.get("orgInfo").get("companyID").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
    this.ohForm.get("orgInfo").get("companyID").updateValueAndValidity();
    if (!this.ohForm.get("orgInfo").get("companyID").value) {
      this.ohForm.get("orgInfo").get("companyID").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
      this.ohForm.get("orgInfo").get("companyName").enable();
      this.ohForm.get("orgInfo").get("companyName").updateValueAndValidity();
      this.compnayDetails = {};
      this.ohForm.get("orgInfo").patchValue({ "tinNumber": "", "reportingBranch": "", "companyName": "" });
    } else if (this.ohForm.get("orgInfo").get("companyID").value && this.ohForm.get("orgInfo").get("companyID").valid) {
      let companyID = this.ohForm.value.orgInfo.companyID;
      this.signupService.getCompanyDetails(companyID).subscribe((response) => {
        this.compnayDetails = response["d"] || {};
        (this.compnayDetails.Source || "111")
        this.ohForm.get("orgInfo").patchValue({ "tinNumber": (this.compnayDetails.Tin || ''), "reportingBranch": "", "companyName": this.compnayDetails.FullName || "" });
        if (this.compnayDetails.FullName) {
          this.ohForm.get("orgInfo").get("companyName").disable();
        } else {
          this.ohForm.get("orgInfo").get("companyName").enable();
        }
        this.ohForm.get("orgInfo").get("companyName").updateValueAndValidity();
      }, (err) => {
        this.ohForm.get("orgInfo").get("companyID").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$"), CustomValidators.companyIDValidator()]);
        this.ohForm.get("orgInfo").get("companyName").enable();
        this.ohForm.get("orgInfo").get("companyName").updateValueAndValidity();
        this.ohForm.get("orgInfo").get("companyID").updateValueAndValidity();

         this.showErrorMessages(err);

      });
    } 
  }
  onMobileCodeChange() {
    this.ohForm.get("contactInfo").get("mobileNumber").reset();
    let code = this.ohForm.get("contactInfo").get("mobileCode").value;
    
  }
  otpParams = {
    "IdType": "",
    "Id": "",
    "MobileNo": ""
  };
  startOTPverification() {
    this.ohForm.get("orgInfo").get("otpVerified").reset();
    let consortiumObj = this.ohForm.getRawValue();// oldMobileNumber
    this.otpParams = {
      "IdType": consortiumObj.orgInfo.companyID ? "ZS0005" : "ZS0007",
      "Id": (!consortiumObj.orgInfo.companyID) ? consortiumObj.orgInfo.contractNumber || "" : consortiumObj.orgInfo.companyID || "",
      "MobileNo": "00" + consortiumObj.contactInfo.mobileCode + consortiumObj.contactInfo.mobileNumber,
    }

    if (consortiumObj.contactInfo.oldMobileNumber == this.otpParams.MobileNo) {
      this.onOTPSuccess({});
    } else {
      setTimeout(() => {
        this.hideOnOtpVerification = true;
      });
    }
  }

  onOTPSuccess(response) {
    this.notifierService.hideAll();
    this.ohForm.get("orgInfo").get("otpVerified").setValue(true);
    this.ohForm.get("contactInfo").patchValue({ "oldMobileNumber": "00" + this.ohForm.getRawValue().contactInfo.mobileCode + this.ohForm.getRawValue().contactInfo.mobileNumber });
    this.hideOnOtpVerification = false;
    this.mainStepper.selected.completed = true;
    this.mainStepper.next();
  }
  onInvalidOTP(response) {
    this.ohForm.get("orgInfo").get("otpVerified").reset();
  }
  onOTPError(error) {
    this.ohForm.get("orgInfo").get("otpVerified").reset();
  }

  getOhForm() {
    let ohForm = this._formBuilder.group({
      orgInfo: this._formBuilder.group({
        tinNumber: ['', [Validators.minLength(10), Validators.pattern("^[3][0-9]*$")]],
        companyID: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]],
        companyName: ['', [Validators.required, CustomValidators.containsOnlyNumbers(), CustomValidators.specialCharctersValidator()]],
        contractNumber: [''],
        reportingBranch: [''],
        otpVerified: ['', Validators.required]
      }),
      contactInfo: this._formBuilder.group({
        mobileNumber: ['', [Validators.required, Validators.maxLength(10), CustomValidators.startsWithZeroValidator()]], //, startsWithValidator("5")
        oldMobileNumber: [''], //, startsWithValidator("5")
        mobileCode: ['966', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email, CustomValidators.EmailValidator('email')]]
      }),
      branchDetails: this._formBuilder.array([]),
      shareHolderDetails: this._formBuilder.array([]),
      financialDetails: this._formBuilder.group({
        accounting: ['A'],
        calendarType: ['H'],
        hijriSelected: [true],
        gregorianSelected: [false],
        tinNumber: [null],
        tanNumber: [null],
        capitalRegistrationDate: [null, CustomValidators.futureDateValidator()],
        capitalAmount: [null],
        endOfFinancialDay: [null, Validators.required],
        endOfFinancialMonth: [null, Validators.required],
        commencementDate: [{ value: '', disabled: true }],
        taxableDate: [{ value: '', disabled: true }],
        taxableDateTime: ['']
      }),
      attachmentsList: this._formBuilder.array([])
    });
    return ohForm;
  }

  onBranchSaveSuccess(response) {
    this.registrationObj = response.apiResponse;
    this.BranchesList = response.branchesList;
    this.registrationObj["Commdt"] = "\/Date(" + response.commencementDate + ")\/";
    this.commencementDate = "\/Date(" + response.commencementDate + ")\/";
    this.businessCommencementDate = +response.commencementDate;
    this.showContinue = true;
  }

  onBranchSaveEror(error) {
    this.step2Completed = false;
    if (this.BranchesList.length == 0) {
      this.showContinue = false;
    } else {
      this.showContinue = true;
    }
  }


  onShareholderSaveSuccess(response) {
    this.registrationObj = response.apiResponse;
    this.shareHoldersList = response.shareHoldersList;

    if (this.shareHoldersList.length == 0) {
      this.showContinue = false;
      this.showFinancialDetails = false;
    } else {
      this.showContinue = true;
      let totalCP = 0;
      let totalPP = 0;
      this.shareHoldersList.forEach((sholder) => {
        totalCP = totalCP + (+sholder.shareHolderDetails.shareCapital || 0);
        totalPP = totalPP + (+sholder.shareHolderDetails.shareProfit || 0);
      })
      if (totalCP <= 100 && totalPP <= 100) {
        this.showFinancialDetails = true;
      }
      else if (totalCP > 100 || totalPP > 100) {
        this.showFinancialDetails = false;
      }
    }
  }

  onShareholderSaveEror(response: any) {
    
    this.step2Completed = false;
    if (response.errorType == 'validation_error') {
      this.showFinancialDetails = false;
    }
  }

  markAllControlsAsPristine(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsPristine({ onlySelf: true });
        control.markAsUntouched();
        control.updateValueAndValidity();
        control.setErrors(null);
      } else if (control instanceof FormGroup) {        //{5}
        this.markAllControlsAsPristine(control);            //{6}
      }
    });
  }

  disableAllFormControls(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {
        control.disable();         //{4}
        control.markAsPristine();
        control.markAsUntouched();
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {        //{5}
        this.markAllControlsAsPristine(control);            //{6}
      }
    });
  }

  onSubmitStep1() {
    if (!this.ohForm.get("contactInfo").valid || !this.ohForm.get('orgInfo').get('companyName').value) {
      return true;
    }
    let consortiumObj = this.ohForm.getRawValue();
    this.registrationObj["Id"] = consortiumObj.orgInfo.companyID;
    this.registrationObj["IdType"] = "ZS0005";
    this.registrationObj["Augrp"] = "111";
    this.registrationObj["Regtype"] = "1";
    this.registrationObj["Operationx"] = "00";
    this.registrationObj["StepNumberx"] = "01";
    this.registrationObj["Taxtpdetermination"] = "3";
    this.registrationObj["Mobno"] = "00" + consortiumObj.contactInfo.mobileCode + consortiumObj.contactInfo.mobileNumber;
    this.registrationObj["Atype"] = "2";
    this.registrationObj["PortalUsrx"] = consortiumObj.contactInfo.email;
    this.registrationObj["NameOrg1"] = consortiumObj.orgInfo.companyName;
    this.registrationObj["Gpartx"] = consortiumObj.orgInfo.tinNumber;
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

    this.saveConsortium(this.registrationObj, "step1");
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
    regObj["AttDetSet"] = []; // this.removeResults(this.requestObj1["AttDetSet"]);
    regObj["Nreg_MSGSet"] = [];
    regObj["Nreg_FormEdit"] = {};
    delete regObj["__metadata"];
    return this.signupService.postNewRegSet(regObj);
  }

  validateFinancialDetails() {

    this.FinancialDetailsComponent.submit();
    let financialDetailsObj = this.ohForm.getRawValue().financialDetails;
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

  showContinue: boolean = true;
  showShareholdersDetails: boolean = false;
  showFinancialDetails: boolean = false;
  showBranchDetails: boolean = false;

  validateStep2() {
    this.step2Validated = false;
    this.step2Completed = false;
    this.ResidentiaryDetailsComponent.submit();
    if(this.ResidentiaryDetailsComponent.resDetailsForm.invalid){
      return true;
    } else {
      this.showBranchDetails = true; 
    }

    if (this.BranchesList.length > 0) {
      this.showShareholdersDetails = true;
    }
    if (this.shareHoldersList.length == 0) {
      this.showContinue = false;
      return true;
    }
    let subscriber = this.showFinancialDetails ? of({}) : this.validateShareholderDetails();
    subscriber.subscribe((response) => {
      let financialDetailsObj = this.ohForm.getRawValue().financialDetails;
      if (!this.showFinancialDetails) {
        this.showFinancialDetails = true;
        return true;
      } else {
    this.FinancialDetailsComponent.submit();
    this.ResidentiaryDetailsComponent.submit();
  }
      if (!financialDetailsObj.endOfFinancialDay || !financialDetailsObj.endOfFinancialMonth || this.ResidentiaryDetailsComponent.resDetailsForm.invalid) {
      this.step2Validated = false;
      return true;
    }
    this.step2Validated = true;
      this.validateFinancialDetails().subscribe((response1) => {
        this.step2Validated = true;
        this.step2Completed = true;
        this.onSubmitStep2();
      }, (err) => {
        this.showErrorMessages(err);
      })
    }, (err) => {
      this.showErrorMessages(err);
    });

  }

  onSubmitStep2() {
    
    let financialDetailsObj = this.ohForm.getRawValue().financialDetails;

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
    this.registrationObj["AttDetSet"] = []; // this.removeResults(this.requestObj1["AttDetSet"]);
    this.registrationObj["Nreg_MSGSet"] = [];
    this.registrationObj["Nreg_FormEdit"] = {};
    delete this.registrationObj["__metadata"];

    this.saveConsortium(this.registrationObj, 'step2');
  }

  saveConsortium(registrationObj, action = '', dataObj = {}) {
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
      this.showErrorMessages(err);
    });
  }
  onFinancialInfoChange(financialDetails) {
    this.ohForm.get("financialDetails").patchValue(financialDetails);
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

    this.saveConsortium(this.registrationObj, 'submit');

  }

  showErrorMessages(err) {
    this.errorMsgsList = [];
    let temp = err.error.error.innererror.errordetails.filter((error) => error.code != "/IWBEP/CX_MGW_BUSI_EXCEPTION");        // let errosgrp = _.groupBy(temp, 'code');
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
  }

  closeModal(id) {
    jQuery("#" + id).modal('hide');
    setTimeout(() => {
      if (jQuery('.modal:visible').length) {
        jQuery('body').addClass('modal-open');
      }
    }, 500);
  }
  onMainStepChange(event) {
    if (event.selectedIndex == 0) {      
      this.ohForm.get("orgInfo").get("otpVerified").setValue('');
      this.ohForm.get("orgInfo").get("otpVerified").setValidators(Validators.required);
      this.ohForm.get("orgInfo").get("otpVerified").updateValueAndValidity();
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

  onResDetailsChange(resDetails) {
    this.registrationObj = {...this.registrationObj, ...resDetails};
  }
}

