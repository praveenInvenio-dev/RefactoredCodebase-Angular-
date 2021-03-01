import { Component, OnInit, HostListener, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import { DateAdapter } from '@angular/material/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AppService } from "src/app/app.service";
import { SignupService } from "src/app/services/signup.service";
import { NotifierService } from "angular-notifier";
import * as moment from 'moment-hijri';
import { MatHorizontalStepper, MatVerticalStepper } from '@angular/material/stepper';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';
import { FinancialDetailsComponent } from '../../signup-components/financial-details/financial-details.component';
declare var jQuery: any;
import * as _ from 'underscore';
import { DatepickerUtilitiesService } from '../../../shared/services/datepicker-utilities.service';
import { ResidentiaryDetailsComponent } from '../../signup-components/residentiary-details/residentiary-details.component';
import { estabConstants } from './estab.constants';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { SignupAttachmentsComponent } from '../../signup-components/signup-attachments/signup-attachments.component';
import { CommonValidation } from 'src/app/constants/commonValidations';
declare var $: any;


@Component({
  selector: 'app-estab',
  templateUrl: './estab.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./estab.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class EstabComponent implements OnInit {


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
  applicationSubmissionDate = new Date().toDateString();
  hideOnOtpVerification: boolean = false;
  @ViewChild(MatHorizontalStepper) mainStepper: MatHorizontalStepper;
  public phoneCodes: any = [];
  compnayDetails: any = {};
  public mobileNumberMask = "0{15}";
  public contractNumberMask = "A{20}";
  public companyNameMask = "A{80}";
  public selectedLanguage = "en";

  errorMsgsList: any = [];
  calendarType: string = "Gregorian";
  public reportingBranchesList: any = [];

  step2Validated: boolean = false;
  step2Completed: boolean = false;
  step3Completed: boolean = false;
  public showAcknowledgement: boolean = false;
  public registrationObj: any = {};

  public cpIdNumberMask = "0*";
  public passportNumMask = "A{20}";

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

  // @ViewChild('shDisplayTable', { read: MatSort, static: false }) shSort: MatSort;
  // @ViewChild('shareholderStepper') shareholderStepper: MatVerticalStepper;
  // @ViewChild('sholderFormDirective') sholderFormDirective;
  branchDisplayColumns2 = ["sholderName", "idType", "idNumber", "shareCapital", "shareProfit", 'update', 'delete'];
  sholdersListdataSource: MatTableDataSource<any>;
  shareHolderDetailsForm: FormGroup;
  sharePercentageTypes: any = [];
  commencementDate: any = null;
  // public shareHoldersList: any = [];
  public shIdTypesList: any = [];
  public shareHolderTypesList = [];

  /*****************************************************************************/

  /*****************Financial Details Properties*******************************/

  public financialDdays: any = [];
  public financialMonths: any = [];

  /*****************************************************************************/

  /**************************General Properties*******************************/


  /*****************************************************************************/
  public brModalScrollPos: number = 0;

  innerWidth: number;
  headerComponent = CalendarComponent;
  panelOpenState: boolean = false;

  maxDate = moment([2020 + 1, 11, 31]);//new Date(new Date().setFullYear(2021));
  dtValidationFLag: boolean = false;
  dtIssueddobValidationFLag: boolean = false;
  passportFileName: any;
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    //console.log("soze", this.innerWidth);
  }

  public countiesList: any = [];
  public statesList: any = [];
  public citiesList: any = [];
  public tinDetails: any = {};

  @ViewChild(SignupAttachmentsComponent)
  public signupAttachmentsComponent: SignupAttachmentsComponent;
  showAttachments: boolean = false;
  public attachmentsList: FormArray = this._formBuilder.array([]);

  constructor(private _dateAdapter: DateAdapter<JDNConvertibleCalendar>, private _formBuilder: FormBuilder, private appSrv: AppService, private signupService: SignupService, public notifierService: NotifierService, private dpuService: DatepickerUtilitiesService, public commonVaidation: CommonValidation) { }

  ngOnInit(): void {

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      this.calendarType = this._dateAdapter.activeCalendar;
      //console.log("calendarType", this.calendarType);
    }
    if (localStorage.getItem("lang") === "ar") {
      this.lang = estabConstants.langz.arb.consortium;
      this.direction = estabConstants.langz.arb.dir;
      this.selectedLanguage = "ar";
    } else {
      this.lang = estabConstants.langz.eng.consortium;
      this.direction = estabConstants.langz.eng.dir;
    }
    this.mobileNumberMask = "0{15}";
    this.contractNumberMask = "A{20}";
    this.companyNameMask = "A{80}";
    this.companyForm = this.getcompanyForm();
    this.getPhoneCodes();
    this.getBranchesList();
    this.getRegistrationSet();
    this.commencementDate = new Date().getTime();
    this.businessCommencementDate = new Date().getTime();
    moment.locale('en-US');


    this.financialDdays = this.lang.days;
    this.financialMonths = this.lang.months;
    this.sharePercentageTypes = this.lang.sharePercentageTypes;


    jQuery("#attachmentsModal").on('hidden.bs.modal', function () {
      //console.log("modal hidden attachmentsModal")
      jQuery('body').addClass('modal-open');
    });


    this.dpuService.datepickerEvents.subscribe((calendarType) => {
      //console.log("calendarType Cahne Evevnt");
      this.calendarType = calendarType;
    });

    this.getAddressLookups();

  }

  getOutletRefForFileUpload(source, idNumber = '') {
    //'001-7000013420'
    let OutletRef = "";
    if (source == "BR") {
      let num = idNumber ? "-" + idNumber : "";
      OutletRef = this.branchDetailsForm.get("branchDetails").value.branchNo + num;
    }
    return OutletRef;
  }


  getUniqueDocTypeRef(source = '', Dotyp, idType, idNumber: any = '') {

    //BR-000-RG01-CR1-123456
    //BR-000-RG02-LN1-123456
    //BR-000-RG02-LN2-123456
    //BR-000-RG08-CN1-123456
    //SH-001-RG09-ID1-1123456

    let uniqueDocTypeRef = "";
    if (source == 'BR') {
      uniqueDocTypeRef = source + "-" + this.companyForm.get("orgInfo").value.branchNo;
    }
    uniqueDocTypeRef = uniqueDocTypeRef + "-" + Dotyp + "-" + idType;
    if (idNumber) {
      uniqueDocTypeRef = uniqueDocTypeRef + "-" + idNumber;
    }

    //console.log("uniqueDocTypeRef", uniqueDocTypeRef);

    return uniqueDocTypeRef || "";

  }
  onClickFileControl(Dotyp, action = '', idNumber = '', control: any = null, displayLabel = '', idType = '') {
    // this.brModalScrollPos = jQuery('#addPassportDetailsModal').scrollTop();
    // jQuery('#addPassportDetailsModal').scrollTop(0);
    $("#addPassportDetailsModal").modal("show");
    let uniqueDocTypeRef = this.getUniqueDocTypeRef(action, Dotyp, idType, idNumber);
    let attachmentObj = {
      ReturnIdx: this.registrationObj.ReturnIdx,
      fileObject: null,
      Dotyp: Dotyp,
      formControl: control,
      displayLabel: displayLabel,
      OutletRef: this.getOutletRefForFileUpload(action, idNumber),
      FileExtn: null,
      uniqueDocTypeRef: uniqueDocTypeRef,
    };

    this.signupAttachmentsComponent.setAttachmentObject(attachmentObj);
    this.signupAttachmentsComponent.show();
    this.showAttachments = true;

  }

  onFileUploadSuccess(response) {
    if (response?.value[0]?.Dotyp) {
      this.passportFileName = response?.value[0]?.Filename;
    }
    //console.log("onFileUploadSuccess", response);
  }
  onAttachmentsClose(response) {
    $("#addPassportDetailsModal").modal("hide");
    //console.log("onAttachmentsClose", response);
    this.showAttachments = false;
    setTimeout(() => {
      jQuery('#addPassportDetailsModal').scrollTop(this.brModalScrollPos);
    }, 10);
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
      //console.log("this.citiesList", this.citiesList);
    });
  }
  onIdTypeChange() {
    //console.log("onIdTypeChange");
    this.MCI_OTP_VERIFICATION_COMPLETED = false;
    let consortiumObj = this.companyForm.getRawValue();
    if (consortiumObj.orgInfo.idType === 'ZS0001' || consortiumObj.orgInfo.idType === 'ZS0002') {
      this.otpParams.OtpType = "003";
    } else {
      this.otpParams.OtpType = "002";
    }
    this.resetContactPersonForm(false, true);
    this.updateContactPersonFormValidators();
    this.getContactPersonDetailsByIdType();
  }

  onBCPIdNumberChange(source = '') {
    //console.log("onBCPIdNumberChange");
    let exceptDOB = (source == 'dob') ? true : false;
    this.resetContactPersonForm(false, true, true, exceptDOB);
    this.getContactPersonDetailsByIdType();
  }
  getContactPersonDetailsByIdType() {
    const contactPersonDetailsForm = <FormGroup>this.companyForm.get("orgInfo");
    let contactPersonDetails = this.companyForm.get('orgInfo').value;

    if (contactPersonDetailsForm.get("idNumber").valid
      && contactPersonDetails.idType && contactPersonDetails.idNumber
      && contactPersonDetails.dateOfBirth && contactPersonDetailsForm.get("dateOfBirth").valid) {
      let cpdob = "";
      if (contactPersonDetails.idType != "ZS0003") {
        let d = contactPersonDetails.dateOfBirth["calendarStart"];
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
      }
      this.signupService.getTaxPayerDetails('', contactPersonDetails.idType, contactPersonDetails.idNumber, '', '', cpdob).subscribe((response: any) => {
        //console.log("tinNumber details", response);
        this.tinDetails = response["d"] || {};
        const control = this.companyForm.get("orgInfo");

        let dob = null;
        let issueDt = null;
        if (this.tinDetails.Birthdt) {
          issueDt = +this.tinDetails.Birthdt.substring(
            6,
            this.tinDetails.Birthdt.length - 2
          );
          dob = this.dpuService.getCalendarFormatDateFromAPIDate(this.tinDetails.Birthdt, this.calendarType);
        }
        // this.registrationObj.
        control.patchValue({
          // "tinNumber": this.tinDetails.Tin,
          "idType": this.tinDetails.Idtype,
          "idNumber": this.tinDetails.Idnum,
          "issueCountry": this.tinDetails.Country,
          "dateOfBirth": dob ? dob : contactPersonDetails.dateOfBirth ? contactPersonDetails.dateOfBirth : null,
          "firstName": this.tinDetails.Name1,
          "lastName": this.tinDetails.Name2,
          "mobileNumber": this.tinDetails.Mobile,
          "email": this.tinDetails.Email,
          "tinNumber": this.tinDetails.Tin
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
  updateContactPersonFormValidators() {
    let contactPersonDetails = this.companyForm.get("orgInfo").value;
    const contactPersonDetailsForm = <FormGroup>this.companyForm.get("orgInfo");


    //default validators setting

    contactPersonDetailsForm.get("idType").setValidators(Validators.required);
    contactPersonDetailsForm.get("idNumber").setValidators(Validators.required);
    contactPersonDetailsForm.get("dateOfBirth").setValidators([Validators.required, CustomValidators.futureDateValidator()]);
    contactPersonDetailsForm.get("firstName").setValidators(Validators.required);
    contactPersonDetailsForm.get("lastName").setValidators(Validators.required);
    contactPersonDetailsForm.get("mobileCode").setValidators(Validators.required);
    contactPersonDetailsForm.get("mobileNumber").setValidators([Validators.required, Validators.minLength(9), startsWithZeroValidator(), CustomValidators.startsWithValidator("5")]);
    contactPersonDetailsForm.get("email").setValidators([Validators.required, Validators.email]);
    contactPersonDetailsForm.get("confirmEmail").setValidators([Validators.required, Validators.email, CustomValidators.emailValidator('email')]);
    // contactPersonDetailsForm.get("copyOfGMID").setValidators(Validators.required);

    contactPersonDetailsForm.enable();

    // if (contactPersonDetailsForm.get("tinNumber").value && contactPersonDetailsForm.get("tinNumber").valid) {

    //   //if TIN number valid, the below controls should be  auto populated and disabled irrespective of data or no data from tin details
    //   contactPersonDetailsForm.get("firstName").disable();
    //   contactPersonDetailsForm.get("lastName").disable();
    //   contactPersonDetailsForm.get("mobileNumber").disable();
    //   contactPersonDetailsForm.get("mobileCode").disable();
    //   contactPersonDetailsForm.get("email").disable();
    //   // contactPersonDetailsForm.get("confirmEmail").disable();
    //   contactPersonDetailsForm.get("dateOfBirth").disable();
    //   // contactPersonDetailsForm.get("idType").disable();
    //   // contactPersonDetailsForm.get("idNumber").disable();
    //   contactPersonDetailsForm.get("issueCountry").disable();

    //   contactPersonDetailsForm.get("firstName").clearValidators();
    //   contactPersonDetailsForm.get("lastName").clearValidators();
    //   contactPersonDetailsForm.get("mobileNumber").clearValidators();
    //   contactPersonDetailsForm.get("mobileCode").clearValidators();
    //   contactPersonDetailsForm.get("email").clearValidators();
    //   if (!contactPersonDetailsForm.get("email").value) {
    //     //contactPersonDetailsForm.get("confirmEmail").clearValidators();
    //     contactPersonDetailsForm.get("confirmEmail").setValidators([Validators.email, CustomValidators.emailValidator('email')]);
    //   }
    //   // contactPersonDetailsForm.get("confirmEmail").clearValidators();
    //   contactPersonDetailsForm.get("dateOfBirth").clearValidators();
    //   contactPersonDetailsForm.get("idType").clearValidators();
    //   contactPersonDetailsForm.get("idNumber").clearValidators();
    //   contactPersonDetailsForm.get("issueCountry").clearValidators();


    // } else 
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
  resetContactPersonForm(clearAll = false, exceptIdType = false, exceptidNumber = false, exceptDOB = false) {
    const contactPersonDetailsForm = <FormGroup>this.companyForm.get("orgInfo");
    let data = contactPersonDetailsForm.value;
    // contactPersonDetailsForm.reset();
    contactPersonDetailsForm.patchValue({
      // tinNumber: ['', [Validators.minLength(10), Validators.pattern("^[3][0-9]*$")]],
      idType: (clearAll) ? 'ZS0001' : (exceptIdType) ? data.idType : 'ZS0001',
      idNumber: (clearAll) ? '' : (exceptidNumber) ? data.idNumber : '',
      dateOfBirth: (clearAll) ? '' : (exceptDOB) ? contactPersonDetailsForm.controls.dateOfBirth.value : null,
      firstName: '',
      lastName: '',
      mobileNumber: '',
      mobileCode: '966',
      email: '',
      confirmEmail: ''
    });
  }
  getBranchesList() {
    this.signupService.getBranches().subscribe((res: any) => {
      //console.log("branches", res);
      this.reportingBranchesList = res.d.results || [];;
    });
  }

  getPhoneCodes() {
    this.appSrv.getPhoneCode().subscribe((res) => {
      //console.log(res);
      this.phoneCodes = res["d"]["results"];
      this.phoneCodes.forEach((item) => {
        item["maxLength"] = 13 - item.Telefto.length;
      });
      //console.log("countru", this.phoneCodes);
    });
  }


  getRegistrationSet() {
    this.signupService.getNewRegSet({ tin: "", email: "", id: "", mobile: "", otp: "", }).subscribe((response: any) => {
      //console.log("getRegistrationSet", response);
      this.registrationObj = response["d"] || {};
    })
  }


  onMobileCodeChange() {
    this.companyForm.get("orgInfo").get("mobileNumber").reset();
    let code = this.companyForm.get("orgInfo").get("mobileCode").value;
    //console.log("onMobileCodeChange", code);
  }
  otpParams = {
    "IdType": "",
    "Id": "",
    "MobileNo": "",
    "OtpType": "003"
  };
  startOTPverification(OtpType: string = "") {

    this.companyForm.get("orgInfo").get("otpVerified").reset();
    let consortiumObj = this.companyForm.getRawValue();

    this.otpParams.IdType = consortiumObj.orgInfo.idType;
    this.otpParams.Id = consortiumObj.orgInfo.idNumber || "";
    this.otpParams.MobileNo = this.MCI_OTP_VERIFICATION_COMPLETED ? consortiumObj.orgInfo.mobileNumber : (this.otpParams.OtpType == "002") ? "00" + consortiumObj.orgInfo.mobileCode + consortiumObj.orgInfo.mobileNumber : "";

    // this.otpParams = {
    //   "IdType": consortiumObj.orgInfo.idType,
    //   "Id": consortiumObj.orgInfo.idNumber || "",
    //   "MobileNo": "00" + consortiumObj.orgInfo.mobileCode + consortiumObj.orgInfo.mobileNumber,
    //   "OtpType": consortiumObj.orgInfo.idType == "ZS0003" ? "002" : "003"
    // }


    setTimeout(() => {
      this.hideOnOtpVerification = true;
    });




    // if (consortiumObj.orgInfo.oldMobileNumber == this.otpParams.MobileNo) {
    //   this.onOTPSuccess({});
    // } else {
    //   setTimeout(() => {
    //     this.hideOnOtpVerification = true;
    //   });
    // }



  }
  MCI_CR_NUMBERS_LIST: any = []
  MCI_RESIDENTIARY_DETAILS: any = null;

  //   {
  //   "Augrp": ""
  // };


  MCI_FINANCIAL_DETAILS: any = null;

  // {
  //   "Fdday": "",
  //     "Fdmonth": "",
  //       "Caltp": ""
  // };


  getUpdatedRegSet() {
    let regObj: any = {};
    regObj = Object.assign({}, this.registrationObj);
    this.signupService.getUpdatedRegSet(regObj).subscribe((response: any) => {
      //console.log("getUpdatedRegSet", response);

      let crNumbersList = response["d"]["Nreg_ActivitySet"]["results"] || [];
      let outletsList = response["d"]["Nreg_OutletSet"]["results"] || [];

      crNumbersList.forEach((crnumber) => {
        let tempoutlet = outletsList.filter((outlet) => {
          return outlet.Actno == crnumber.Actno;
        });
        if (tempoutlet.length > 0) {
          crnumber.Actnm = tempoutlet[0].Actnm;
        }

        //console.log(crnumber.Actnm, crnumber.Actno, crnumber.City, crnumber.ActMgrp, crnumber.ActSgrp, crnumber.Activity, crnumber.Idnumber, crnumber.Country, crnumber.CityCode, crnumber.Institute, crnumber.ValidDateFrom);


        if (
          crnumber.Actnm &&
          crnumber.Actno &&
          crnumber.City &&
          crnumber.ActMgrp &&
          crnumber.ActSgrp &&
          crnumber.Activity &&
          crnumber.Idnumber &&
          crnumber.Country &&
          crnumber.CityCode &&
          crnumber.Institute &&
          crnumber.ValidDateFrom
        ) {
          crnumber.isAllMCIDataReceived = true;
        } else {
          crnumber.isAllMCIDataReceived = true;
        }

      });

      this.MCI_CR_NUMBERS_LIST = crNumbersList || [];
      this.MCI_RESIDENTIARY_DETAILS = {
        "Augrp": response["d"]["Augrp"]
      };


      this.MCI_FINANCIAL_DETAILS = {
        "Fdday": response["d"]["Fdday"],
        "Fdmonth": response["d"]["Fdmonth"],
        "Caltp": response["d"]["Caltp"]
      };


      this.hideOnOtpVerification = false;
      this.mainStepper.selected.completed = true;
      this.mainStepper.next();
    }, (error) => {
      this.hideOnOtpVerification = false;
      this.mainStepper.selected.completed = true;
      this.mainStepper.next();
    });
  }
  onOTPSuccess(response) {
    //console.log("OTP Success ", response);
    this.notifierService.hideAll();

    if (response["d"]["OtpType"] == "003") {

      if (response["d"]["Crmobno"]) {
        this.MCI_OTP_VERIFICATION_COMPLETED = true;
        this.companyForm.get("orgInfo").patchValue({
          "mobileNumber": "00" + response["d"]["Crmobno"],
          "email": response["d"]["Cremailid"],
          "confirmEmail": response["d"]["Cremailid"]
        });

        this.companyForm.get("orgInfo").get("mobileCode").disable();
        this.companyForm.get("orgInfo").get("mobileNumber").disable();
        this.companyForm.get("orgInfo").get("email").disable();
        this.companyForm.get("orgInfo").get("confirmEmail").disable();
        //this.otpParams.OtpType = "002";

      } else {
        //console.log("No Mobile Email Details...!");
        //tell him to update contact info and come back for registration
      }
      this.hideOnOtpVerification = false;
    } else {

      this.companyForm.get("orgInfo").patchValue({
        "otpVerified": true,
        "oldMobileNumber": "00" + this.companyForm.getRawValue().orgInfo.mobileCode + this.companyForm.getRawValue().orgInfo.mobileNumber
      });
      this.saveCompanyDetails();
    }

  }
  onInvalidOTP(response) {
    this.companyForm.get("orgInfo").get("otpVerified").reset();
  }
  onOTPError(response) {
    this.companyForm.get("orgInfo").get("otpVerified").reset();
    if (response["d"]["OtpType"] == "003") {
      if (!response["d"]["Crmobno"]) {
        //console.log("No Mobile Details");
        this.hideOnOtpVerification = false;
        this.MCI_OTP_VERIFICATION_COMPLETED = false;
        jQuery("#noCommunicationDetailsModal").modal("show");
      }
    }
  }
  isEmpty(item) {
    if (item === null || item === undefined || item === "") {
      return true;
    }
    return false;
  }
  MCI_OTP_VERIFICATION_COMPLETED: boolean = false;
  onSubmitStep1() {
    //console.log("onSubmitStep1");
    //console.log(this.companyForm.value);
    let consortiumObj = this.companyForm.getRawValue();

    this.companyForm.get("orgInfo").get("otpVerified").setErrors(null);
    this.companyForm.get("orgInfo").get("tinNumber").setErrors(null);

    if (!this.isEmpty(consortiumObj.orgInfo.idType) && consortiumObj.orgInfo.idType === 'ZS0001') {
      this.companyForm.get("orgInfo").get("passportNo").setErrors(null);
      this.companyForm.get("orgInfo").get("issueCountry").setErrors(null);
      this.companyForm.get("orgInfo").get("validFrom").setErrors(null);
      this.companyForm.get("orgInfo").get("validTo").setErrors(null);
      this.companyForm.get("orgInfo").get("copyOfGMID").setErrors(null);
    } else {
      this.companyForm.get("orgInfo").get("passportNo").setValidators(Validators.required);
      this.companyForm.get("orgInfo").get("issueCountry").setValidators(Validators.required);
      this.companyForm.get("orgInfo").get("copyOfGMID").setValidators(Validators.required);
      this.companyForm.get("orgInfo").get("validFrom").setValidators([Validators.required, CustomValidators.futureDateValidator()]);
      this.companyForm.get("orgInfo").get("validTo").setValidators([Validators.required]);
    }


    if (!consortiumObj.orgInfo.idType || consortiumObj.orgInfo.idType === 'ZS0001' || consortiumObj.orgInfo.idType === 'ZS0002') {
      //National ID, IQAMA ID
      this.otpParams.OtpType = "003";
    } else {
      this.otpParams.OtpType = "002";
    }

    if (this.otpParams.OtpType == "003") {

      this.companyForm.get("orgInfo").get("mobileCode").clearValidators();
      this.companyForm.get("orgInfo").get("mobileNumber").clearValidators();
      this.companyForm.get("orgInfo").get("email").clearValidators();
      this.companyForm.get("orgInfo").get("confirmEmail").clearValidators();

    } else {

      this.companyForm.get("orgInfo").get("mobileCode").setValidators([Validators.required]);
      this.companyForm.get("orgInfo").get("mobileNumber").setValidators([Validators.minLength(9), Validators.maxLength(10), startsWithZeroValidator(), Validators.required, CustomValidators.startsWithValidator("5")]);
      this.companyForm.get("orgInfo").get("email").setValidators([Validators.required, Validators.email]);
      this.companyForm.get("orgInfo").get("confirmEmail").setValidators([Validators.required, Validators.email, CustomValidators.emailValidator('email')]);

    }

    this.companyForm.get("orgInfo").get("mobileCode").updateValueAndValidity();
    this.companyForm.get("orgInfo").get("mobileNumber").updateValueAndValidity();
    this.companyForm.get("orgInfo").get("email").updateValueAndValidity();
    this.companyForm.get("orgInfo").get("confirmEmail").updateValueAndValidity();

    if (!this.companyForm.get("orgInfo").valid) {
      return true;
    }


    if (this.MCI_OTP_VERIFICATION_COMPLETED) {
      this.saveCompanyDetails();
    } else {
      this.startOTPverification();
    }

  }

  saveCompanyDetails() {
    let consortiumObj = this.companyForm.getRawValue();
    this.registrationObj["Id"] = consortiumObj.orgInfo.idNumber;
    this.registrationObj["IdType"] = consortiumObj.orgInfo.idType;
    this.registrationObj["Birthdt"] = this.dpuService.getAPIFormatDate(consortiumObj.orgInfo.dateOfBirth);
    this.registrationObj["NameFirst"] = consortiumObj.orgInfo.firstName;
    this.registrationObj["NameLast"] = consortiumObj.orgInfo.lastName;
    this.registrationObj["Regtype"] = "1";
    this.registrationObj["Operationx"] = "00";
    this.registrationObj["StepNumberx"] = "01";
    this.registrationObj["Taxtpdetermination"] = "1";
    this.registrationObj["Mobno"] = "00" + consortiumObj.orgInfo.mobileCode + consortiumObj.orgInfo.mobileNumber;
    this.registrationObj["Atype"] = "1";
    // this.registrationObj["Augrp"] = "102";
    this.registrationObj["PortalUsrx"] = consortiumObj.orgInfo.email;
    this.registrationObj["Tpnationality"] = consortiumObj.orgInfo.idType === 'ZS0001' ? "SAUDI" : consortiumObj.orgInfo.idType === 'ZS0002' ? "FOREIGN" : "GCC";;

    // this.registrationObj["NameOrg1"] = consortiumObj.orgInfo.companyName;
    this.registrationObj["Gpartx"] = consortiumObj.orgInfo.tinNumber;
    this.registrationObj.Nreg_OutletSet = [];
    this.registrationObj.Nreg_ActivitySet = [];
    this.registrationObj.Nreg_ShareholderSet = [];
    this.registrationObj.Nreg_AddressSet = [];
    this.registrationObj.Nreg_CpersonSet = [];
    this.registrationObj.Nreg_ContactSet = [];
    this.registrationObj.Nreg_IdSet = [];

    let IdList = [];
    IdList.push(this.transformIDDDetails(consortiumObj.orgInfo));
    if (consortiumObj.orgInfo.idType === 'ZS0002' || consortiumObj.orgInfo.idType === 'ZS0003') {
      IdList.push(this.transformPassportDetails(consortiumObj.orgInfo));
      this.registrationObj.Passatt = "X";
      this.registrationObj.Nreg_IdSet = IdList;
    }

    this.registrationObj["Nreg_BtnSet"] = [];
    this.registrationObj["off_notesSet"] = [];
    this.registrationObj["AttDetSet"] = [];
    this.registrationObj["Nreg_MSGSet"] = [];
    this.registrationObj["Nreg_FormEdit"] = {};
    delete this.registrationObj["__metadata"];
    this.saveConsortium(this.registrationObj, "step1");
  }

  transformPassportDetails(idDetails) {
    let IdList = [];
    let idObj: any = {};
    idObj.Type = "FS0002";
    idObj.Idnumber = idDetails.passportNo || "";
    idObj.Gpart = "";
    idObj.Srcidentify = "00000";
    idObj.Country = idDetails.issueCountry || "";
    idObj.ValidDateFrom = this.dpuService.getAPIFormatDate(idDetails.validFrom);
    idObj.ValidDateTo = this.dpuService.getAPIFormatDate(idDetails.validTo);
    //IdList.push(idObj);
    return idObj;
  }

  transformIDDDetails(idDetails) {
    let IdList = [];
    let idObj: any = {};
    idObj.Type = idDetails.idType;
    idObj.Idnumber = idDetails.idNumber || "";
    idObj.Gpart = "";
    idObj.Srcidentify = "00000";

    // idObj.Country = idDetails.issueCountry || "";
    // idObj.ValidDateFrom = this.dpuService.getAPIFormatDate(idDetails.validFrom);
    // idObj.ValidDateTo = this.dpuService.getAPIFormatDate(idDetails.validTo);
    //IdList.push(idObj);

    return idObj;
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
  showFinancialDetails: boolean = false;
  showBranchDetails: boolean = false;

  validateStep2() {
    this.step2Validated = false;
    this.step2Completed = false;

    this.ResidentiaryDetailsComponent.submit();

    if (!this.ResidentiaryDetailsComponent.resDetailsForm.valid) {
      return true;
    } else {
      this.showBranchDetails = true;
      if (this.BranchesList.length == 0) {
        this.showContinue = false;
      }
    }

    if (this.BranchesList.length > 0) {
      if (!this.showFinancialDetails) {
        this.showFinancialDetails = true;
        return true;
      }
    } else {
      return true;
    }

    this.FinancialDetailsComponent.submit();
    let financialDetailsObj = this.companyForm.getRawValue().financialDetails;

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
    });



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
    //console.log("errors", temp);
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

  onSubmitStep2() {
    //console.log("onSubmitStep2");
    let financialDetailsObj = this.companyForm.getRawValue().financialDetails;

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

    this.saveConsortium(this.registrationObj, 'step2');
  }
  isAutoApproval: boolean = false;
  saveConsortium(registrationObj, action = '', dataObj = {}) {
    this.signupService.postNewRegSet(registrationObj).subscribe((response: any) => {
      this.registrationObj = response["d"];
      if (action == "step1") {
        //console.log("step1");
        if (this.MCI_OTP_VERIFICATION_COMPLETED) {
          this.getUpdatedRegSet();
        } else {
          this.MCI_CR_NUMBERS_LIST = [];
          this.hideOnOtpVerification = false;
          this.mainStepper.selected.completed = true;
          this.mainStepper.next();
        }
      }
      if (action == "step2") {
        this.step2Validated = true;
        this.step2Completed = true;
        this.mainStepper.selected.completed = true;
        this.mainStepper.next();
      } else if (action == "submit") {
        this.applicationNo = response["d"]["FbnumAngx"];
        this.companyName = response["d"]["NameFirst"] + " " + response["d"]["NameLast"];
        this.isAutoApproval = (response["d"]["Autoappfg"] || "").toLowerCase() == "y" ? true : false;
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
      //console.log("errors", temp);
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
  onFinancialInfoChange(financialDetails) {
    ////console.log("onFinancialInfoChange", financialDetails);
    this.companyForm.get("financialDetails").patchValue(financialDetails);
  }
  submitConsortiumRegistration(password) {
    this.registrationObj['Ngotp'] = "1";
    this.registrationObj['Chkfg'] = "X";
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

  closeModal(id) {
    jQuery("#" + id).modal('hide');
    setTimeout(() => {
      if (jQuery('.modal:visible').length) {
        jQuery('body').addClass('modal-open');
      }
    }, 500);
  }

  gotoLogin(id) {
    jQuery("#" + id).modal('hide');
  }

  onMainStepChange(event) {
    //console.log("onMainStepChange", event);
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
    event.selectedStep.interacted = false;
  }
  getcompanyForm() {
    let companyForm = this._formBuilder.group({
      orgInfo: this._formBuilder.group({
        tinNumber: ['', [Validators.minLength(10), Validators.pattern("^[3][0-9]*$")]],
        idType: ['', [Validators.required]],
        idNumber: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        dateOfBirth: [null, [Validators.required, CustomValidators.futureDateValidator()]],
        otpVerified: ['', [Validators.required]],
        mobileCode: ['966', [Validators.required]],
        mobileNumber: ['', [Validators.minLength(9), Validators.maxLength(10), startsWithZeroValidator(), Validators.required, CustomValidators.startsWithValidator("5")]],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email, CustomValidators.emailValidator('email')]],
        copyOfGMID: ['', [Validators.required]],
        passportNo: ['', [Validators.required]],
        issueCountry: ['', [Validators.required]],
        validFrom: [null, [Validators.required, CustomValidators.futureDateValidator()]],
        validTo: [null, [Validators.required]],
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

    let mciBranches = response.branchesList.filter((branch) => {
      return branch.isMCIData;
    });

    if (mciBranches.length > 0) {
      let allMCIBranchesSaved = mciBranches.filter((branch) => {
        return branch.isMCIDataSaved;
      });
      if (allMCIBranchesSaved.length == mciBranches.length) {
        this.BranchesList = response.branchesList;
        this.showContinue = true;
      } else {
        this.showContinue = false;
      }

    } else {
      this.BranchesList = response.branchesList;
      this.showContinue = true;
    }

    this.registrationObj["Commdt"] = "\/Date(" + response.commencementDate + ")\/";
    this.commencementDate = "\/Date(" + response.commencementDate + ")\/";
    this.businessCommencementDate = +response.commencementDate;
  }

  onBranchSaveEror(error) {
    //console.log("onBranchSaveEror", error);
    this.step2Completed = false;
    if (this.BranchesList.length == 0) {
      this.showContinue = false;
    } else {
      this.showContinue = true;
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
  goBack() {
    if (this.mainStepper && this.mainStepper.selectedIndex !== 0 && !this.showAcknowledgement) {
      this.mainStepper.previous();
    }
    else {
      if (this.mainStepper && this.mainStepper.selectedIndex === 0 && this.hideOnOtpVerification) {
        this.hideOnOtpVerification = false;
      } else
        window.history.back();
    }
  }

  compareDate() {

    let consortiumObj = this.companyForm.getRawValue();
    let validFrmDt = consortiumObj.orgInfo.validFrom;
    let validToDt = consortiumObj.orgInfo.validTo;

    let todayDt = this.commonVaidation.toJulianDate1(new Date());
    // //console.log(stDt);
    if (validToDt['jdnStart'] <= todayDt['jdnStart']) {
      this.dtValidationFLag = true;
    } else if (validFrmDt && validToDt['jdnStart'] < validFrmDt['jdnStart']) {
      this.dtValidationFLag = true;
    } else this.dtValidationFLag = false;
  }
  compareIssueDOBDate() {

    let consortiumObj = this.companyForm.getRawValue();
    let validFrmDt = consortiumObj.orgInfo.validFrom;
    let dob = consortiumObj.orgInfo.dateOfBirth;

    // let stDt = this.commonVaidation.toJulianDate1(new Date(validFrmDt));
    // //console.log(stDt);
    if (validFrmDt['jdnStart'] < dob['jdnStart']) {
      this.dtIssueddobValidationFLag = true;
    } else this.dtIssueddobValidationFLag = false;
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

  restrictAlphabetss(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57) || x == 45) return true;
    else return false;
  }


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
    //console.log("companyIDValidator");
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
    let futureDate = new Date().getTime() < timeStamp;
    //console.log(futureDate);
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