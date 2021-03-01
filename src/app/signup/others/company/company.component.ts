import { Component, OnInit, DoCheck, HostListener, ViewEncapsulation, ViewChild } from '@angular/core';
import { interval, of, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import { DateAdapter } from '@angular/material/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from "src/app/app.service";
import { SignupService } from "src/app/services/signup.service";
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
import { companyConstants } from './company.constants';
import { ActivitySet } from 'src/app/dto/establishment/activity-set';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';
import { FinancialDetailsComponent } from '../../signup-components/financial-details/financial-details.component';
declare var jQuery: any;
import * as _ from 'underscore';
import { DatepickerUtilitiesService } from '../../../shared/services/datepicker-utilities.service';
import { ResidentiaryDetailsComponent } from '../../signup-components/residentiary-details/residentiary-details.component';
import { CustomValidators } from 'src/app/shared/custom-validators';



@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./company.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class CompanyComponent implements OnInit {


  public BranchesList: any = [];
  @ViewChild(FinancialDetailsComponent)
  private FinancialDetailsComponent: FinancialDetailsComponent;
  @ViewChild(ResidentiaryDetailsComponent)
  private ResidentiaryDetailsComponent: ResidentiaryDetailsComponent;
  businessCommencementDate: any = null;
  companyForm: FormGroup;
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
  public shareHoldersList: any = [];
  public shIdTypesList: any = [];
  public shareHolderTypesList = [];

  /*****************************************************************************/

  /*****************Financial Details Properties*******************************/

  //@ViewChild(FinancialDetailsComponent)
  //private FinancialDetailsComponent: FinancialDetailsComponent;
  public financialDdays: any = [];
  public financialMonths: any = [];

  /*****************************************************************************/

  /**************************General Properties*******************************/


  /*****************************************************************************/

  // companyForm: FormGroup;
  // lang: any = {};
  // direction: string = "ltr";
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
    console.log("soze", this.innerWidth);
  }
  // hideOnOtpVerification: boolean = false;


  // @ViewChild(MatHorizontalStepper) mainStepper: MatHorizontalStepper;




  // public phoneCodes: any = [];
  // compnayDetails: any = {};


  // public mobileNumberMask = "0{15}";
  // public contractNumberMask = "A{20}";
  // public companyNameMask = "A{80}";
  //public licenseNumberMask = "A{15}";
  // public selectedLanguage = "en";

  // errorMsgsList: any = [];
  // calendarType: string = "Gregorian";
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
      this.lang = companyConstants.langz.arb.consortium;
      this.direction = companyConstants.langz.arb.dir;
      this.selectedLanguage = "ar";
    } else {
      this.lang = companyConstants.langz.eng.consortium;
      this.direction = companyConstants.langz.eng.dir;
    }
    this.mobileNumberMask = "0{15}";
    this.contractNumberMask = "A{20}";
    this.companyNameMask = "A{80}";
    this.companyForm = this.getcompanyForm();
    this.getPhoneCodes();
    this.getBranchesList();
    this.getRegistrationSet();
    this.businessCommencementDate = null;// new Date("2006,01,01").getTime();
    moment.locale('en-US');
    console.log(this.businessCommencementDate);
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

    this.companyForm.get("orgInfo").get("companyID").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
    this.companyForm.get("orgInfo").get("companyID").updateValueAndValidity();
    //this.companyForm.get("orgInfo").get("tinNumber").enable();
    //this.companyForm.get("orgInfo").patchValue({ "tinNumber": "", "reportingBranch": this.compnayDetails.Source });
    if (!this.companyForm.get("orgInfo").get("companyID").value) {
      this.companyForm.get("orgInfo").get("companyID").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
      this.companyForm.get("orgInfo").get("companyName").enable();
      this.companyForm.get("orgInfo").get("companyName").updateValueAndValidity();
      this.compnayDetails = {};
      this.companyForm.get("orgInfo").patchValue({ "tinNumber": "", "reportingBranch": "", "companyName": "" });
    } else if (this.companyForm.get("orgInfo").get("companyID").value && this.companyForm.get("orgInfo").get("companyID").valid) {
      let companyID = this.companyForm.value.orgInfo.companyID;
      this.signupService.getCompanyDetails(companyID).subscribe((response) => {
        console.log("compnay details", response);
        if(response["d"]["Bpkind"] != '13' && response["d"]["Bpkind"] != '14' && response["d"]["Bpkind"] != '15' && response["d"]["Bpkind"] != ''){
          this.companyForm.get("orgInfo").get("companyID").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$"), companyIDValidator()]);
          this.companyForm.get("orgInfo").get("companyID").updateValueAndValidity();
          this.notifierService.notify(
            "error",
            this.lang.err.companyIDErr
          );
          return true;
        }
        this.compnayDetails = response["d"] || {};
        (this.compnayDetails.Source || "111")
        this.companyForm.get("orgInfo").patchValue({ "tinNumber": (this.compnayDetails.Tin || ''), "reportingBranch": "", "companyName": this.compnayDetails.FullName || "" });
        // if (this.compnayDetails.Tin) {
        //   this.companyForm.get("orgInfo").get("tinNumber").disable();
        // }

        if (this.compnayDetails.FullName) {
          this.companyForm.get("orgInfo").get("companyName").disable();
        } else {
          this.companyForm.get("orgInfo").get("companyName").enable();
        }
        this.companyForm.get("orgInfo").get("companyName").updateValueAndValidity();
      }, (err) => {
        console.log("Company ID err", err);
        //const ctrl = this.companyForm.get("orgInfo");
        this.companyForm.get("orgInfo").get("companyID").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$"), companyIDValidator()]);
        this.companyForm.get("orgInfo").get("companyName").enable();
        this.companyForm.get("orgInfo").get("companyName").updateValueAndValidity();
        this.companyForm.get("orgInfo").get("companyID").updateValueAndValidity();

        this.showErrorMessages(err);

      });
    } else {
      console.log("compnayID Invalid");
    }
  }
  onMobileCodeChange() {
    this.companyForm.get("contactInfo").get("mobileNumber").reset();
    let code = this.companyForm.get("contactInfo").get("mobileCode").value;
    console.log("onMobileCodeChange", code);
  }
  otpParams = {
    "IdType": "",
    "Id": "",
    "MobileNo": ""
  };
  startOTPverification() {
    this.companyForm.get("orgInfo").get("otpVerified").reset();
    let consortiumObj = this.companyForm.getRawValue();// oldMobileNumber
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
    this.companyForm.get("orgInfo").get("otpVerified").setValue(true);
    this.companyForm.get("contactInfo").patchValue({ "oldMobileNumber": "00" + this.companyForm.getRawValue().contactInfo.mobileCode + this.companyForm.getRawValue().contactInfo.mobileNumber });
    this.hideOnOtpVerification = false;
    this.mainStepper.selected.completed = true;

    this.mainStepper.next();
  }
  onInvalidOTP(response) {
    this.companyForm.get("orgInfo").get("otpVerified").reset();
  }
  onOTPError(error) {
    this.companyForm.get("orgInfo").get("otpVerified").reset();
  }
  onSubmitStep1() {
    console.log("onSubmitStep1");
    console.log(this.companyForm);
    if (!this.companyForm.get("contactInfo").valid || !this.companyForm.get('orgInfo').get('companyName').value) {
      return true;
    }
    let consortiumObj = this.companyForm.getRawValue();
    this.registrationObj["Id"] = consortiumObj.orgInfo.companyID;
    this.registrationObj["IdType"] = "ZS0005";
    // this.registrationObj["Augrp"] = "111";
    this.registrationObj["Regtype"] = "1";
    this.registrationObj["Operationx"] = "00";
    this.registrationObj["StepNumberx"] = "01";
    this.registrationObj["Taxtpdetermination"] = "1";
    this.registrationObj["Mobno"] = "00" + consortiumObj.contactInfo.mobileCode + consortiumObj.contactInfo.mobileNumber;
    this.registrationObj["Atype"] = "2";
    this.registrationObj["PortalUsrx"] = consortiumObj.contactInfo.email;
    this.registrationObj["NameOrg1"] = consortiumObj.orgInfo.companyName;
    this.registrationObj["Gpartx"] = consortiumObj.orgInfo.tinNumber;
    this.registrationObj["Commdt"] = (this.businessCommencementDate) ? "\/Date(" + this.businessCommencementDate + ")\/" : null;
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
    let financialDetailsObj = this.companyForm.getRawValue().financialDetails;

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
    regObj['Capamt'] = '0.00'; //(financialDetailsObj.capitalAmount) ? parseFloat(financialDetailsObj.capitalAmount).toFixed(2).toString() : "0.00";
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

    if (this.ResidentiaryDetailsComponent.resDetailsForm.invalid) {
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
    //let subscriber = this.showFinancialDetails ? of({}) : this.validateShareholderDetails();
    // let subscriber = this.showFinancialDetails ? of({}) : this.validateShareholderDetails();
    this.validateShareholderDetails().subscribe((response) => {
      let financialDetailsObj = this.companyForm.getRawValue().financialDetails;
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
    console.log("onSubmitStep2");
    let financialDetailsObj = this.companyForm.getRawValue().financialDetails;

    this.registrationObj.Operationx = "05";
    this.registrationObj.StepNumberx = "04";

    this.registrationObj["Accmethod"] = financialDetailsObj.accounting;
    this.registrationObj["Caltp"] = financialDetailsObj.calendarType;
    this.registrationObj["Fdcalender"] = financialDetailsObj.calendarType == "H" ? "2" : "1";
    this.registrationObj["Fdenddt"] = "\/Date(" + financialDetailsObj.taxableDateTime + ")\/";
    this.registrationObj["Fdday"] = financialDetailsObj.endOfFinancialDay || "";
    this.registrationObj["Fdmonth"] = financialDetailsObj.endOfFinancialMonth || "";
    this.registrationObj['Capamt'] = '0.00'; //(financialDetailsObj.capitalAmount) ? parseFloat(financialDetailsObj.capitalAmount).toFixed(2).toString() : "0.00";
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
        // this.onFinancialDetailsChange();
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
    console.log("onFinancialInfoChange", financialDetails);
    this.companyForm.get("financialDetails").patchValue(financialDetails);
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
      this.companyForm.get("orgInfo").get("otpVerified").setValue('');
      this.companyForm.get("orgInfo").get("otpVerified").setValidators(Validators.required);
      this.companyForm.get("orgInfo").get("otpVerified").updateValueAndValidity();
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
  getcompanyForm() {
    let companyForm = this._formBuilder.group({
      orgInfo: this._formBuilder.group({
        tinNumber: ['', [Validators.minLength(10), Validators.pattern("^[3][0-9]*$")]],
        companyID: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]],
        companyName: ['', [Validators.required, CustomValidators.containsOnlyNumbers(), CustomValidators.specialCharctersValidator()]],
        contractNumber: [''],
        reportingBranch: [''],
        otpVerified: ['', Validators.required]
      }),
      contactInfo: this._formBuilder.group({
        mobileNumber: ['', [Validators.required, Validators.maxLength(10), startsWithZeroValidator()]], //, startsWithValidator("5")
        oldMobileNumber: [''], //, startsWithValidator("5")
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
        gregorianSelected: [false],
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
    return companyForm;
  }

  onBranchSaveSuccess(response) {
    console.log("onBranchSaveSuccess", response);
    this.registrationObj = response.apiResponse;
    this.BranchesList = response.branchesList;
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

  onResDetailsChange(resDetails) {
    console.log("onResDetailsChange", resDetails);
    this.registrationObj = { ...this.registrationObj, ...resDetails };
  }

}
/*************************************** CODE ENDS******************************************************** */


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

    // && emailControl.value
    if (confirmEmailControl.valid && emailControl.value !== confirmEmailControl.value) {
      return {
        notMatch: true
      };
    }
    return null;
  };
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
export function companyIDValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    console.log("companyIDValidator");
    return { 'invalidID': { value: control.value } };
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
    // console.log("futureDateValidator",calendarType, date.year + '/' + date.month + '/' + date.day, date, timeStamp, new Date().getTime() < timeStamp);
    let futureDate = new Date().getTime() < timeStamp;
    console.log(futureDate);
    if (futureDate) {
      control.markAsTouched();
    }
    return futureDate ? { 'futureDate': true } : null;
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
export function startsWithZeroValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    // var regexp = /^[1-9]{1}[0-9]+/;
    var regexp = /^[1-9][0-9]*$/
    let startsWithZero = false;
    startsWithZero = !regexp.test(control.value);
    return startsWithZero ? { 'startsWithZero': { value: control.value } } : null
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

