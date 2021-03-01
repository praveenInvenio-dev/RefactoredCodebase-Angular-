import { Component, OnInit, HostListener, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import { DateAdapter } from '@angular/material/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AppService } from "src/app/app.service";
import { SignupService } from "src/app/services/signup.service";
import { NotifierService } from "angular-notifier";
import { Router } from "@angular/router";
import * as moment from 'moment-hijri';
import { MatHorizontalStepper, MatVerticalStepper } from '@angular/material/stepper';
import { consortiumConstants } from './consortium.constants';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';
import { FinancialDetailsComponent } from '../../signup-components/financial-details/financial-details.component';
declare var jQuery: any;
import * as _ from 'underscore';
import { DatepickerUtilitiesService } from '../../../shared/services/datepicker-utilities.service';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { of } from 'rxjs/observable/of';


@Component({
  selector: 'app-consortium',
  templateUrl: './consortium.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./consortium.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class ConsortiumComponent implements OnInit {


  public BranchesList: any = [];
  @ViewChild(FinancialDetailsComponent)
  private FinancialDetailsComponent: FinancialDetailsComponent;
  businessCommencementDate: any = null;
  consortiumForm: FormGroup;
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


  /*****************branch details properties*******************************/

  @ViewChild('brDisplayTable', { read: MatSort, static: false }) brSort: MatSort;
  @ViewChild('branchDetailsStepper') branchDetailsStepper: MatVerticalStepper;
  @ViewChild('branchFormDirective') branchFormDirective;
  branchDisplayColumns = ["branchName", "licenseNumber", "branchCity", "branchType", "update", "delete"];
  branchListdataSource: MatTableDataSource<any>;
  branchDetailsForm: FormGroup;
  deleteBranchObj: any = {};
  public issueByList: any = [];
  public idTypesList: any = [];
  public mainGroupActivityList: any = [];
  public subGroupActivityList: any = [];
  public mainActivityList: any = [];

  /*************************************************************************/

  /*****************Shareholder Details Properties*******************************/

  @ViewChild('shDisplayTable', { read: MatSort, static: false }) shSort: MatSort;
  @ViewChild('shareholderStepper') shareholderStepper: MatVerticalStepper;
  @ViewChild('sholderFormDirective') sholderFormDirective;
  branchDisplayColumns2 = ["sholderName", "idType", "idNumber", "shareCapital", "shareProfit", 'update', 'delete'];
  sholdersListdataSource: MatTableDataSource<any>;
  shareHolderDetailsForm: FormGroup;
  sharePercentageTypes: any = [];
  commencementDate: any = null;
  public shareHoldersList: any = [];
  public shIdTypesList: any = [];
  public shareHolderTypesList = [];

  /*****************************************************************************/

  /*****************Financial Details Properties*******************************/

  //@ViewChild(FinancialDetailsComponent)
  //private FinancialDetailsComponent: FinancialDetailsComponent;
  public financialDdays: any = [];
  public financialMonths: any = [];
  //businessCommencementDate: any = null;

  /*****************************************************************************/

  /**************************General Properties*******************************/


  /*****************************************************************************/

  innerWidth: number;
  headerComponent = CalendarComponent;
  panelOpenState: boolean = false;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log("soze", this.innerWidth);
  }

  public countiesList: any = [];
  public statesList: any = [];
  public citiesList: any = [];

  constructor(private _dateAdapter: DateAdapter<JDNConvertibleCalendar>, private _formBuilder: FormBuilder, private appSrv: AppService, private signupService: SignupService, public notifierService: NotifierService, private router: Router, private dpuService: DatepickerUtilitiesService) { }

  ngOnInit(): void {

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      this.calendarType = this._dateAdapter.activeCalendar;
      console.log("calendarType", this.calendarType);
    }
    if (localStorage.getItem("lang") === "ar") {
      this.lang = consortiumConstants.langz.arb.consortium;
      this.direction = consortiumConstants.langz.arb.dir;
      this.selectedLanguage = "ar";
    } else {
      this.lang = consortiumConstants.langz.eng.consortium;
      this.direction = consortiumConstants.langz.eng.dir;
    }
    this.mobileNumberMask = "0{15}";
    this.contractNumberMask = "A{20}";
    this.companyNameMask = "A{80}";
    this.consortiumForm = this.getConsortiumForm();
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
      console.log("modal hidden attachmentsModal")
      jQuery('body').addClass('modal-open');
    });

    this.dpuService.datepickerEvents.subscribe((calendarType) => {
      console.log("calendarType Cahne Evevnt");
      this.calendarType = calendarType;
      //get all datepcikers and update date
      let fields = ["shareCapitalStartDate", "shareProfitStartDate", "startDate", "dateOfBirth", "validFrom"]
      // this.updateCalendarType(this.shareHolderDetailsForm, fields, calendarType);
      // this.updateCalendarType(this.branchDetailsForm, fields, calendarType);
    });

  }

  getBranchesList() {
    this.signupService.getBranches().subscribe((res: any) => {
      console.log("branches", res);
      this.reportingBranchesList = res.d.results || [];;
    });
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


  getRegistrationSet() {
    this.signupService.getNewRegSet({ tin: "", email: "", id: "", mobile: "", otp: "", }).subscribe((response: any) => {
      console.log("getRegistrationSet", response);
      this.registrationObj = response["d"] || {};
    })
  }

  onCompanyIDChange() {

    this.consortiumForm.get("orgInfo").get("companyID").setValidators([Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
    this.consortiumForm.get("orgInfo").get("companyID").updateValueAndValidity();
    //this.consortiumForm.get("orgInfo").get("tinNumber").enable();
    //this.consortiumForm.get("orgInfo").patchValue({ "tinNumber": "", "reportingBranch": this.compnayDetails.Source });
    if (!this.consortiumForm.get("orgInfo").get("companyID").value) {
      this.consortiumForm.get("orgInfo").get("companyID").setValidators([Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
      this.consortiumForm.get("orgInfo").get("companyName").enable();
      this.consortiumForm.get("orgInfo").get("companyName").updateValueAndValidity();
      this.compnayDetails = {};
      this.consortiumForm.get("orgInfo").patchValue({ "tinNumber": "", "reportingBranch": "111", "companyName": "" });
    } else if (this.consortiumForm.get("orgInfo").get("companyID").value && this.consortiumForm.get("orgInfo").get("companyID").valid) {
      let companyID = this.consortiumForm.value.orgInfo.companyID;
      this.signupService.getCompanyDetails(companyID).subscribe((response) => {
        console.log("compnay details", response);
        this.compnayDetails = response["d"] || {};
        (this.compnayDetails.Source || "111")
        this.consortiumForm.get("orgInfo").patchValue({ "tinNumber": (this.compnayDetails.Tin || ''), "reportingBranch": "111", "companyName": this.compnayDetails.FullName || "" });
        // if (this.compnayDetails.Tin) {
        //   this.consortiumForm.get("orgInfo").get("tinNumber").disable();
        // }

        if (this.compnayDetails.FullName) {
          this.consortiumForm.get("orgInfo").get("companyName").disable();
        } else {
          this.consortiumForm.get("orgInfo").get("companyName").enable();
        }
        this.consortiumForm.get("orgInfo").get("companyName").updateValueAndValidity();
      }, (err) => {
        console.log("Company ID err", err);
        //const ctrl = this.consortiumForm.get("orgInfo");
        this.consortiumForm.get("orgInfo").get("companyID").setValidators([Validators.minLength(10), Validators.pattern("^[7][0-9]*$"), CustomValidators.companyIDValidator()]);
        this.consortiumForm.get("orgInfo").get("companyName").enable();
        this.consortiumForm.get("orgInfo").get("companyName").updateValueAndValidity();
        this.consortiumForm.get("orgInfo").get("companyID").updateValueAndValidity();

        this.showErrorMessages(err);

      });
    } else {
      console.log("compnayID Invalid");
    }
  }
  onMobileCodeChange() {
    this.consortiumForm.get("contactInfo").get("mobileNumber").reset();
    let code = this.consortiumForm.get("contactInfo").get("mobileCode").value;
    console.log("onMobileCodeChange", code);
  }
  otpParams = {
    "IdType": "",
    "Id": "",
    "MobileNo": ""
  };
  startOTPverification() {
    this.consortiumForm.get("orgInfo").get("otpVerified").reset();
    let consortiumObj = this.consortiumForm.getRawValue();// oldMobileNumber
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
    this.consortiumForm.get("orgInfo").get("otpVerified").setValue(true);
    this.consortiumForm.get("contactInfo").patchValue({ "oldMobileNumber": "00" + this.consortiumForm.getRawValue().contactInfo.mobileCode + this.consortiumForm.getRawValue().contactInfo.mobileNumber });
    this.hideOnOtpVerification = false;
    this.mainStepper.selected.completed = true;

    this.mainStepper.next();
  }
  onInvalidOTP(response) {
    this.consortiumForm.get("orgInfo").get("otpVerified").reset();
  }
  onOTPError(error) {
    this.consortiumForm.get("orgInfo").get("otpVerified").reset();
  }
  onSubmitStep1() {
    console.log("onSubmitStep1");
    console.log(this.consortiumForm.value);
    if (!this.consortiumForm.get("contactInfo").valid || !this.consortiumForm.get('orgInfo').get('companyName').value || !this.consortiumForm.get('orgInfo').get('contractNumber').valid) {
      return true;
    }
    let consortiumObj = this.consortiumForm.getRawValue();
    this.registrationObj["Id"] = consortiumObj.orgInfo.companyID;
    this.registrationObj["IdType"] = "ZS0005";
    this.registrationObj["Augrp"] = "111";
    this.registrationObj["Regtype"] = "1";
    this.registrationObj["Operationx"] = "00";
    this.registrationObj["StepNumberx"] = "01";
    this.registrationObj["Taxtpdetermination"] = "5";
    this.registrationObj["Mobno"] = "00" + consortiumObj.contactInfo.mobileCode + consortiumObj.contactInfo.mobileNumber;
    this.registrationObj["Atype"] = "2";
    this.registrationObj["PortalUsrx"] = consortiumObj.contactInfo.email;
    this.registrationObj["NameOrg1"] = consortiumObj.orgInfo.companyName;
    this.registrationObj["Gpartx"] = consortiumObj.orgInfo.tinNumber;
    //this.registrationObj["AContNo"] = consortiumObj.orgInfo.contractNumber;
    this.registrationObj["Acontnox"] = consortiumObj.orgInfo.contractNumber;

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


  validateBranchDetails() {
    let regObj: any = {};

    regObj = Object.assign({}, this.registrationObj);

    regObj.Chkfg = "X";
    regObj.Operationx = "";
    regObj.StepNumberx = "05";
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
    let financialDetailsObj = this.consortiumForm.getRawValue().financialDetails;
    // if (!financialDetailsObj.endOfFinancialDay || !financialDetailsObj.endOfFinancialMonth) {
    //   return true;
    // }

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
    regObj['Capamt'] = (financialDetailsObj.capitalAmount) ? parseFloat(financialDetailsObj.capitalAmount).toFixed(2).toString() : "0.00";
    regObj['Capregdt'] = null;
    return this.signupService.postNewRegSet(regObj);
  }

  showContinue: boolean = false;
  showShareholdersDetails: boolean = false;
  showFinancialDetails: boolean = false;
  validateStep2() {
    this.step2Validated = false;
    this.step2Completed = false;

    if (this.BranchesList.length > 0) {
      this.showShareholdersDetails = true;
    }
    if (this.shareHoldersList.length == 0) {
      this.showContinue = false;
      return true;
    }
    // this.validateBranchDetails().subscribe(() => {
    let subscriber = this.showFinancialDetails ? of({}) : this.validateShareholderDetails();
    subscriber.subscribe((response) => {
      let financialDetailsObj = this.consortiumForm.getRawValue().financialDetails;
      if (!this.showFinancialDetails) {
        this.showFinancialDetails = true;
        return true;
      } else {
        this.FinancialDetailsComponent.submit();
      }
      // this.BranchesList.length == 0 || this.shareHoldersList.length == 0 ||
      if (!financialDetailsObj.endOfFinancialDay || !financialDetailsObj.endOfFinancialMonth) {
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
    console.log("onSubmitStep2");
    let financialDetailsObj = this.consortiumForm.getRawValue().financialDetails;

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
        console.log("step1");
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
      // this.branchDetailsStepper.next();
      this.step2Completed = false;
      this.showErrorMessages(err);
    });
  }
  onFinancialInfoChange(financialDetails) {
    console.log("onFinancialInfoChange", financialDetails);
    this.consortiumForm.get("financialDetails").patchValue(financialDetails);
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
    console.log("errors", temp);
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
    console.log("onMainStepChange", event);
    if (event.selectedIndex == 0) {
      this.consortiumForm.get("orgInfo").get("otpVerified").setValue('');
      this.consortiumForm.get("orgInfo").get("otpVerified").setValidators(Validators.required);
      this.consortiumForm.get("orgInfo").get("otpVerified").updateValueAndValidity();
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
  getConsortiumForm() {
    let consortiumForm = this._formBuilder.group({
      orgInfo: this._formBuilder.group({
        tinNumber: ['', [Validators.minLength(10), Validators.pattern("^[3][0-9]*$")]],
        companyID: ['', [Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]],
        companyName: ['', [Validators.required, CustomValidators.containsOnlyNumbers(), CustomValidators.specialCharctersValidator()]],
        contractNumber: ['', Validators.required],
        reportingBranch: ['111'],
        otpVerified: ['', Validators.required]
      }),
      contactInfo: this._formBuilder.group({
        mobileNumber: ['', [Validators.required, Validators.maxLength(10), CustomValidators.startsWithZeroValidator()]], //, startsWithValidator("5")
        oldMobileNumber: [''], //, startsWithValidator("5")
        mobileCode: ['966', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email, CustomValidators.emailValidator('email')]]
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
    return consortiumForm;
  }

  onBranchSaveSuccess(response) {
    console.log("onBranchSaveSuccess", response);
    this.registrationObj = response.apiResponse;
    this.BranchesList = response.branchesList;
    this.registrationObj["Commdt"] = "\/Date(" + response.commencementDate + ")\/";
    this.commencementDate = "\/Date(" + response.commencementDate + ")\/";
    this.businessCommencementDate = +response.commencementDate;
    this.showContinue = true;
  }

  onBranchSaveEror(error) {
    console.log("onBranchSaveEror", error);
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
    console.log("onShareholderSaveEror", response);
    this.step2Completed = false;
    if (response.errorType == 'validation_error') {
      this.showFinancialDetails = false;
      //this.showContinue = false;
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

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

}
