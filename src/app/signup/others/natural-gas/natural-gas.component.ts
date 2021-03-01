import { Component, OnInit, DoCheck, HostListener, ViewEncapsulation, ViewChild } from '@angular/core';
import { interval,of, Subscription } from 'rxjs';
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
import { Router } from "@angular/router";
import * as moment from 'moment-hijri';
import { MatHorizontalStepper, MatVerticalStepper } from '@angular/material/stepper';
import { naturalGasConstants } from './natural-gas.constants';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';
import { FinancialDetailsComponent } from '../../signup-components/financial-details/financial-details.component';
import { ResidentiaryDetailsComponent } from '../../signup-components/residentiary-details/residentiary-details.component';
declare var jQuery: any;
import * as _ from 'lodash';
import { DatepickerUtilitiesService } from 'src/app/shared/services/datepicker-utilities.service';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
  selector: 'app-natural-gas',
  templateUrl: './natural-gas.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./natural-gas.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class NaturalGasComponent implements OnInit {
  
  
  naturalGasForm: FormGroup;
  lang;
  direction;
  innerWidth: number;
  headerComponent = CalendarComponent;
  applicationNo: any;
  companyName: any;
  applicationSubmissionDate = new Date().toDateString();
  maxDate = moment([2020 + 1, 11, 31]);//new Date(new Date().setFullYear(2021));
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  hideOnOtpVerification: boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatHorizontalStepper) mainStepper: MatHorizontalStepper;
  @ViewChild(MatVerticalStepper) branchDetailsStepper: MatVerticalStepper;
  @ViewChild(MatVerticalStepper) shareholderStepper: MatVerticalStepper;

  @ViewChild(FinancialDetailsComponent)
  private FinancialDetailsComponent: FinancialDetailsComponent;
  @ViewChild(ResidentiaryDetailsComponent)
  private ResidentiaryDetailsComponent: ResidentiaryDetailsComponent;
  public phoneCodes: any = [];
  compnayDetails: any = {};
  sharePercentageTypes: any = [];
  commencementDate: any = null;
  public mobileNumberMask = "0{15}";
  public contractNumberMask = "A{20}";
  public companyNameMask = "A{80}";
  //public licenseNumberMask = "A{15}";
  public selectedLanguage = "en";
  errorMsgsList: any = [];
  calendarType: string = "Gregorian";
  public financialDdays: any = [];
  public financialMonths: any = [];
  businessCommencementDate: any = null;
  constructor(private _dateAdapter: DateAdapter<JDNConvertibleCalendar>, private _formBuilder: FormBuilder, private appSrv: AppService, private signupService: SignupService, public commonValid: CommonValidation, public notifierService: NotifierService, private router: Router,private dpuService: DatepickerUtilitiesService) { }

  ngOnInit(): void {
    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      this.calendarType = this._dateAdapter.activeCalendar;
    }
    if (localStorage.getItem("lang") === "ar") {
      this.lang = naturalGasConstants.langz.arb.consortium;
      this.direction = naturalGasConstants.langz.arb.dir;
      this.selectedLanguage = "ar";
    } else {
      this.lang = naturalGasConstants.langz.eng.consortium;
      this.direction = naturalGasConstants.langz.eng.dir;
    }

    this.mobileNumberMask = "0{15}";
    this.contractNumberMask = "A{20}";
    //this.licenseNumberMask = "A{15}";
    this.companyNameMask = "A{80}";
    this.naturalGasForm = this.getNaturalGasForm();
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
  public countiesList: any = [];
  public statesList: any = [];
  public citiesList: any = [];

 
  getPhoneCodes() {
    this.appSrv.getPhoneCode().subscribe((res) => {
      this.phoneCodes = res["d"]["results"];
      this.phoneCodes.forEach((item) => {
        item["maxLength"] = 13 - item.Telefto.length;
      });
    });
  }
  public branchesList: any = [];
  getBranchesList() {
    this.signupService.getBranches().subscribe((res: any) => {
      this.branchesList = res.d.results || [];;
    });
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
      //this.showContinue = false;
    }
  }

  onFinancialInfoChange(financialDetails) {
    this.naturalGasForm.get("financialDetails").patchValue(financialDetails);
  }

  public cpIdNumberMask = "0*";


  //////////////////// Attachments Code Starts Here///////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////OTP CODE STARTS/////////////////////////////////////
  otpParams = {
    "IdType": "",
    "Id": "",
    "MobileNo": ""
  };
  startOTPverification() {
    this.naturalGasForm.get("orgInfo").get("otpVerified").reset();
    let consortiumObj = this.naturalGasForm.getRawValue();// oldMobileNumber
    this.otpParams = {
      "IdType": this.naturalGasForm.getRawValue().orgInfo.companyID ? "ZS0005" : "ZS0007",
      "Id": (!this.naturalGasForm.getRawValue().orgInfo.companyID) ? this.naturalGasForm.getRawValue().orgInfo.contractNumber || "" : this.naturalGasForm.getRawValue().orgInfo.companyID || "",
      "MobileNo": "00" + this.naturalGasForm.getRawValue().contactInfo.mobileCode + this.naturalGasForm.getRawValue().contactInfo.mobileNumber,
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
    this.naturalGasForm.get("orgInfo").get("otpVerified").setValue(true);
    this.naturalGasForm.get("contactInfo").patchValue({ "oldMobileNumber": "00" + this.naturalGasForm.getRawValue().contactInfo.mobileCode + this.naturalGasForm.getRawValue().contactInfo.mobileNumber });
    this.hideOnOtpVerification = false;
    this.mainStepper.selected.completed = true;
    this.mainStepper.next();
  }
  onInvalidOTP(response) {
    this.naturalGasForm.get("orgInfo").get("otpVerified").reset();
  }
  onOTPError(error) {
    this.naturalGasForm.get("orgInfo").get("otpVerified").reset();
  }
  


  onSubmitStep1() {
    if (!this.naturalGasForm.get("contactInfo").valid || !this.naturalGasForm.get('orgInfo').get('companyName').value) {
      return true;
    }
    let consortiumObj = this.naturalGasForm.getRawValue();
    this.registrationObj["Id"] = consortiumObj.orgInfo.companyID;
    this.registrationObj["IdType"] = "ZS0005";
    this.registrationObj["Augrp"] = "111";
    this.registrationObj["Regtype"] = "1";
    this.registrationObj["Operationx"] = "00";
    this.registrationObj["Taxtpdetermination"] = "2";
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


  step2Validated: boolean = false;
  step2Completed: boolean = false;
  step3Completed: boolean = false;


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
    let financialDetailsObj = this.naturalGasForm.getRawValue().financialDetails;
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
    regObj["AttDetSet"] = []; // this.removeResults(this.requestObj1["AttDetSet"]);
    regObj["Nreg_MSGSet"] = [];
    regObj["Nreg_FormEdit"] = {};
    delete regObj["__metadata"];

    regObj["Accmethod"] = financialDetailsObj.accounting;
    regObj["Caltp"] = financialDetailsObj.calendarType;
    regObj["Fdcalender"] = financialDetailsObj.calendarType == "H" ? "2" : "1";
    regObj["Fdenddt"] = "\/Date(" + financialDetailsObj.taxableDateTime + ")\/";
    regObj["Fdday"] = financialDetailsObj.endOfFinancialDay || "";
    regObj["Fdmonth"] = financialDetailsObj.endOfFinancialMonth || "";
    //regObj['Capamt'] = (financialDetailsObj.capitalAmount) ? parseFloat(financialDetailsObj.capitalAmount).toFixed(2).toString() : "0.00";
    regObj['Capamt'] ="0.00";
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
   // let subscriber = this.showFinancialDetails ? of({}) : this.validateShareholderDetails();
   // subscriber.subscribe((response) => {
    this.validateShareholderDetails().subscribe((response) => {
      let financialDetailsObj = this.naturalGasForm.getRawValue().financialDetails;
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
    let financialDetailsObj = this.naturalGasForm.getRawValue().financialDetails;
    this.registrationObj.Operationx = "05";
    this.registrationObj.StepNumberx = "04";

    this.registrationObj["Accmethod"] = financialDetailsObj.accounting;
    this.registrationObj["Caltp"] = financialDetailsObj.calendarType;
    this.registrationObj["Fdcalender"] = financialDetailsObj.calendarType == "H" ? "2" : "1";
    this.registrationObj["Fdenddt"] = "\/Date(" + financialDetailsObj.taxableDateTime + ")\/";
    this.registrationObj["Fdday"] = financialDetailsObj.endOfFinancialDay || "";
    this.registrationObj["Fdmonth"] = financialDetailsObj.endOfFinancialMonth || "";
    //this.registrationObj['Capamt'] = (financialDetailsObj.capitalAmount) ? parseFloat(financialDetailsObj.capitalAmount).toFixed(2).toString() : "0.00";
    this.registrationObj['Capamt'] ="0.00";
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
  public showAcknowledgement: boolean = false;
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
  public BranchesList: any = [];

  public shareHoldersList: any = [];

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
      this.naturalGasForm.get("orgInfo").get("otpVerified").setValue('');
      this.naturalGasForm.get("orgInfo").get("otpVerified").setValidators(Validators.required);
      this.naturalGasForm.get("orgInfo").get("otpVerified").updateValueAndValidity();
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

  /* ******************************* Finanicial Details Starts ************************************** */



 

  /* ******************************* Finanicial Details Ends ************************************** */
  public registrationObj: any = {};
  getRegistrationSet() {
    this.signupService.getNewRegSet({ tin: "", email: "", id: "", mobile: "", otp: "", }).subscribe((response: any) => {
      this.registrationObj = response["d"] || {};
      this.registrationObj['Taxtpdetermination'] = '2';
    })
  }

  onCompanyIDChange() {
    this.naturalGasForm.get("orgInfo").get("companyID").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
    this.naturalGasForm.get("orgInfo").get("companyID").updateValueAndValidity();
    if (!this.naturalGasForm.get("orgInfo").get("companyID").value) {
      this.naturalGasForm.get("orgInfo").get("companyID").setValidators([Validators.required,Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
      this.naturalGasForm.get("orgInfo").get("companyName").enable();
      this.naturalGasForm.get("orgInfo").get("companyName").updateValueAndValidity();
      this.compnayDetails = {};
      this.naturalGasForm.get("orgInfo").patchValue({ "tinNumber": "", "reportingBranch": "111", "companyName": "" });
    } else if (this.naturalGasForm.get("orgInfo").get("companyID").value && this.naturalGasForm.get("orgInfo").get("companyID").valid) {
      let companyID = this.naturalGasForm.value.orgInfo.companyID;
      this.signupService.getCompanyDetails(companyID).subscribe((response) => {
        if(response["d"]["Bpkind"] != '01' && response["d"]["Bpkind"] != ''){
          this.naturalGasForm.get("orgInfo").get("companyID").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$"), CustomValidators.companyIDValidator()]);
          this.naturalGasForm.get("orgInfo").get("companyID").updateValueAndValidity();
          this.notifierService.notify(
            "error",
            this.lang.err.companyIdErr
          );
          return true;
        }
        this.compnayDetails = response["d"] || {};
        (this.compnayDetails.Source || "111")
        this.naturalGasForm.get("orgInfo").patchValue({ "tinNumber": (this.compnayDetails.Tin || ''), "reportingBranch": "111", "companyName": this.compnayDetails.FullName || "" });
        if (this.compnayDetails.FullName) {
          this.naturalGasForm.get("orgInfo").get("companyName").disable();
        } else {
          this.naturalGasForm.get("orgInfo").get("companyName").enable();
        }
        this.naturalGasForm.get("orgInfo").get("companyName").updateValueAndValidity();
      }, (err) => {
        this.naturalGasForm.get("orgInfo").get("companyID").setValidators([Validators.required,Validators.minLength(10), Validators.pattern("^[7][0-9]*$"), CustomValidators.companyIDValidator()]);
        this.naturalGasForm.get("orgInfo").get("companyName").enable();
        this.naturalGasForm.get("orgInfo").get("companyName").updateValueAndValidity();
        this.naturalGasForm.get("orgInfo").get("companyID").updateValueAndValidity();

        this.showErrorMessages(err);

      });
    }
  }
  onMobileCodeChange() {
    this.naturalGasForm.get("contactInfo").get("mobileNumber").reset();
    let code = this.naturalGasForm.get("contactInfo").get("mobileCode").value;
  }

  getNaturalGasForm() {
    let naturalGasForm = this._formBuilder.group({
      orgInfo: this._formBuilder.group({
        tinNumber: ['', [Validators.minLength(10), Validators.pattern("^[3][0-9]*$")]],
        companyID: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]],
        companyName: ['', [Validators.required, CustomValidators.containsOnlyNumbers(), CustomValidators.specialCharctersValidator()]],
        contractNumber: [''],
        reportingBranch: ['111'],
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
        // Validators.pattern("^[3][0-9]*$")
        //Validators.minLength(10), 
        //[Validators.maxLength(15)]
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
    return naturalGasForm;
  }

  markAllControlsAsPristine(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsPristine({ onlySelf: true });
        control.markAsUntouched();
        control.updateValueAndValidity();
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

  onResDetailsChange(resDetails) {
    resDetails.Augrp = '111';
    this.registrationObj = {...this.registrationObj, ...resDetails};
  }
}






