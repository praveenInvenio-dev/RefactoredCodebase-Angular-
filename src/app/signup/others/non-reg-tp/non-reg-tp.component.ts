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
import { CustomValidators } from 'src/app/shared/custom-validators';
import { SignupAttachmentsComponent } from '../../signup-components/signup-attachments/signup-attachments.component';
import { nonRegTPConstants } from './non-reg-tp.constants';
import { constants } from 'src/app/constants/constants.model';
declare var $: any;

@Component({
  selector: 'app-non-reg-tp',
  templateUrl: './non-reg-tp.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./non-reg-tp.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class NonRegTPComponent implements OnInit {

  licenseNumberMask = "0000000000";


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
  public passportNumMask="A{20}";

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
  CurrentDate = new Date();
  lang1: any = {}; 
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log("soze", this.innerWidth);
  }
  
  public countiesList: any = [];
  public nationList: any = [{"id":"1","value":"Bahrain"},{"id":"KW","value":"Kuwait"},
  {"id":"1","value":"Oman"}
  ,{"id":"1","value":"Qatar"},{"id":"1","value":"United Arab Emirates"}];
  public statesList: any = [];
  public citiesList: any = [];
  public tinDetails: any = {};

  @ViewChild(SignupAttachmentsComponent)
  public signupAttachmentsComponent: SignupAttachmentsComponent;
  showAttachments: boolean = false;
  public attachmentsList: FormArray = this._formBuilder.array([]);

  constructor(private _dateAdapter: DateAdapter<JDNConvertibleCalendar>, private _formBuilder: FormBuilder, private appSrv: AppService, private signupService: SignupService, public notifierService: NotifierService, private dpuService: DatepickerUtilitiesService) { }

  ngOnInit(): void {

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      this.calendarType = this._dateAdapter.activeCalendar;
      console.log("calendarType", this.calendarType);
    }
    if (localStorage.getItem("lang") === "ar") {
      this.lang = nonRegTPConstants.langz.arb.consortium;
      this.lang1 = constants.langz.arb.acknowledgment;
      this.direction = nonRegTPConstants.langz.arb.dir;
      this.selectedLanguage = "ar";
    } else {
      this.lang = nonRegTPConstants.langz.eng.consortium;
      this.lang1 = constants.langz.eng.acknowledgment;
      this.direction = nonRegTPConstants.langz.eng.dir;
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
      console.log("modal hidden attachmentsModal")
      jQuery('body').addClass('modal-open');
    });


    this.dpuService.datepickerEvents.subscribe((calendarType) => {
      console.log("calendarType Cahne Evevnt");
      this.calendarType = calendarType;      
    });

    this.getAddressLookups();
    
  }

  validateCRNumber(identification: any | {}) {
    let identificationType = identification.value.identificationType;
    let crNumber = identification.value.licenseNumber;
    console.log(identificationType, crNumber);
    if (identification.get("licenseNumber").valid) {
      if (identificationType == 1) {
        identification.get("issuedCity").disable();
        identification.get("issuedCity").setValidators(null);
         this.signupService.validateCR(crNumber).subscribe((response: any) => {
          console.log("response", response);
          if (response["d"].NotFound == "X") {
            this.notifierService.notify("error", this.lang.err.invalidCR);
            identification.patchValue({ "issueCountry": 'SA' });
            identification.patchValue({ "issuedCity": "", "validFrom": "" });
          } else {
             this.branchDetailsForm.get("branchDetails").get("branchName").patchValue(response["d"]["Crname"]);
            identification.patchValue({ "issueCountry": 'SA' })
            this.citiesList.push({ "Country": "SA", "CityCode": response["d"]["CityAry"], "CityName": response["d"]["CityAry"] });
            identification.patchValue({ "issuedCity": response["d"]["CityAry"] });
            if (response["d"]["Issuedt"]) {
              let issueDt = +response["d"]["Issuedt"].substring(
                6,
                response["d"]["Issuedt"].length - 2
              );
              identification.patchValue({ "validFrom": this.dpuService.getCalendarFormatDateFromAPIDate(response["d"]["Issuedt"], this.calendarType) })
            }
          }

        }, (error) => {
          this.errorMsgsList = [];
          let temp = error.error.error.innererror.errordetails.filter((error) => error.code != "/IWBEP/CX_MGW_BUSI_EXCEPTION");
          // let errosgrp = _.groupBy(temp, 'code');
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
            jQuery("#brErrorMsgsModal").modal('show');
          } else {
            this.notifierService.notify(
              "error",
              error.error.error.innererror.errordetails[0].message
            );
          }

         

        });
      }
    } else if (!identification.get("licenseNumber").value) {
      //1010628258    
      identification.get("issuedCity").enable();
      identification.get("issuedCity").setValidators(Validators.required);
      identification.patchValue({ "issuedCity": "", "validFrom": null });
      identification.get("issuedCity").reset();
       this.branchDetailsStepper.selected.completed = false;
    }
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

    console.log("uniqueDocTypeRef", uniqueDocTypeRef);

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
    console.log("onFileUploadSuccess", response);
  }
  onAttachmentsClose(response) {
    $("#addPassportDetailsModal").modal("hide");
    console.log("onAttachmentsClose", response);
    this.showAttachments = false;
    setTimeout(() => {
      jQuery('#addPassportDetailsModal').scrollTop(this.brModalScrollPos);
    }, 10);
  }
  getAddressLookups() {
    this.signupService.getNationality1().subscribe((res) => {
      this.countiesList = res["d"]["results"];
      // this.statesList = res["d"]["State_dropdownSet"]["results"];
      // this.citiesList = res["d"]["city_dropdownSet"]["results"];
      // this.citiesList.shift();
      // this.citiesList.forEach((ele) => {
      //   ele.CityName = ele.CityName.toUpperCase();
      // });
      console.log("this.citiesList", this.citiesList);
    });
  }
  onIdTypeChange() {
    console.log("onIdTypeChange");

    this.resetContactPersonForm(false, true);
    this.updateContactPersonFormValidators();
    this.getContactPersonDetailsByIdType();
  }

  onBCPIdNumberChange(source = '') {
    console.log("onBCPIdNumberChange");
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
        if(contactPersonDetails.idType != "ZS0003"){         
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
        this.signupService.getETTaxPayerDetails('', contactPersonDetails.idType, contactPersonDetails.idNumber, '', '', cpdob).subscribe((response: any) => {
        console.log("tinNumber details", response);
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
          // "lastName": this.tinDetails.Name2,
          "mobileNumber": this.tinDetails.Mobile,
          "email": this.tinDetails.Email,
          "tinNumber":this.tinDetails.Tin
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
    // contactPersonDetailsForm.get("lastName").setValidators(Validators.required);
    contactPersonDetailsForm.get("mobileCode").setValidators(Validators.required);
    contactPersonDetailsForm.get("mobileNumber").setValidators([Validators.required, Validators.minLength(9), CustomValidators.startsWithValidator("5")]);
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
      // lastName: '',
      mobileNumber: '',
      mobileCode: '966',
      email: '',
      confirmEmail: ''
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
    this.signupService.getRequestSet({ tin: "", email: "", id: "", mobile: "", otp: "", }).subscribe((response: any) => {
      console.log("getRegistrationSet", response);
      this.registrationObj = response["d"] || {};
    })
  }

 
  onMobileCodeChange() {
    this.companyForm.get("orgInfo").get("mobileNumber").reset();
    let code = this.companyForm.get("orgInfo").get("mobileCode").value;
    console.log("onMobileCodeChange", code);
  }
  otpParams = {
    "IdType": "",
    "Id": "",
    "MobileNo": ""
  };
  startOTPverification() {
    this.companyForm.get("orgInfo").get("otpVerified").reset();
    let consortiumObj = this.companyForm.getRawValue();
    this.otpParams = {
      "IdType": consortiumObj.orgInfo.idType,
      "Id":  consortiumObj.orgInfo.idNumber || "",
      "MobileNo": "00" + consortiumObj.orgInfo.mobileCode + consortiumObj.orgInfo.mobileNumber,
    }

    if (consortiumObj.orgInfo.oldMobileNumber == this.otpParams.MobileNo) {
      this.onOTPSuccess({});
    } else {
      setTimeout(() => {
        this.hideOnOtpVerification = true;
      });
    }
  }


  onOTPSuccess(response) {
    this.companyForm.get("orgInfo").get("otpVerified").setValue(true);
    this.companyForm.get("orgInfo").patchValue({ "oldMobileNumber": "00" + this.companyForm.getRawValue().orgInfo.mobileCode + this.companyForm.getRawValue().orgInfo.mobileNumber });
    this.hideOnOtpVerification = false;
    this.onStep1Submit();    
  }
 
  onInvalidOTP(response) {
    this.companyForm.get("orgInfo").get("otpVerified").reset();
  }
  onOTPError(error) {
    this.companyForm.get("orgInfo").get("otpVerified").reset();
  }
  isEmpty(item){
    if(item === null || item === undefined || item ==="") {
        return true;
      }   
    return false; 
  }
  onStep1Submit() {
    let consortiumObj = this.companyForm.getRawValue();    

    this.registrationObj["Decfg"] = "1";
    // this.registrationObj["ReNumberCountry"] = consortiumObj.orgInfo.country;
    this.registrationObj["ReNumberCountry"] = "SA";

    this.registrationObj["Orgnm"] = consortiumObj.orgInfo.nameBCE;
    this.registrationObj["Langz"]="EN";
    this.registrationObj["Operationz"] = "01";
    this.registrationObj["StepNumberz"] = "3";
    this.registrationObj["Idnumber"] = consortiumObj.orgInfo.gccId;
    this.registrationObj["House"] = consortiumObj.orgInfo.buildingNumber;
    this.registrationObj["Street"] = consortiumObj.orgInfo.streetName;
    this.registrationObj["PoBox"] = consortiumObj.orgInfo.additionalNumber;
    this.registrationObj["City1"] = consortiumObj.orgInfo.city1;
    this.registrationObj["Country"] = consortiumObj.orgInfo.country;
    this.registrationObj["PostCode1"] = consortiumObj.orgInfo.zipCode;
    this.registrationObj["TelNumber"] = consortiumObj.orgInfo.phoneNumber;
    this.registrationObj["Website"] = consortiumObj.orgInfo.website;
    this.registrationObj["CommRegFg"] ="1";
    this.registrationObj["CrNo"] = consortiumObj.orgInfo.cr;
    this.registrationObj["RepPos"] = consortiumObj.orgInfo.designation;
    this.registrationObj["Firstnm"] = consortiumObj.orgInfo.firstName;
    this.registrationObj["Tpnationality"] = consortiumObj.orgInfo.country1;

    this.registrationObj["ReType"] = consortiumObj.orgInfo.idType;
    this.registrationObj["ReIdnumber"] = consortiumObj.orgInfo.idNumber;
    this.registrationObj["ReNumber"] = "00" + consortiumObj.orgInfo.mobileCode + consortiumObj.orgInfo.mobileNumber;
    this.registrationObj["SmtpAddr"] = consortiumObj.orgInfo.email;  
    
    const noteObj = { 
      Notenoz: "001",
      Refnamez: "",
      XInvoicez: "",
      XObsoletez: "",
      Rcodez: "ETRF_TP03",
      Erfusrz: "",
      Erfdtz: this.CurrentDate.toISOString().slice(0, 19),
      Erftmz: null,
      AttByz: "TP",
      ByPusrz: "",  
      ByGpartz: "",
      DataVersionz: "",
      Namez: "",
      Noteno: "001",
      Lineno: 0,
      ElemNo: 0,
      Tdformat: "",
      Tdline: "",
      Sect: "",
      Strtime: this.CurrentDate.toISOString().slice(11, 19),
      Strline: "Forming business",
    };
    this.registrationObj["NotesSet"]["results"].push(noteObj);
    delete this.registrationObj["__metadata"];

    this.saveConsortium(this.registrationObj, "step2");  
  }
  onSubmit() {
    console.log("onSubmit");
    console.log(this.companyForm.value);
    this.companyForm.get("orgInfo").get("otpVerified").setErrors(null);

    if (!this.companyForm.get("orgInfo").valid ) {
      return;
    }
    this.startOTPverification();

  }
  saveConsortium(registrationObj, action = '', dataObj = {}) {
    
      this.signupService.postRequestSet(registrationObj).subscribe((response: any) => {
        this.registrationObj = response["d"];    
      
        if (action == "step2") {
          this.notifierService.hideAll();
          
          this.mainStepper.selected.completed = true;

          this.mainStepper.next();
          // this.startOTPverification();          
        } else if (action == "submit") {
          this.applicationNo = response["d"]["Fbnumz"];
          this.companyName = response["d"]["Firstnm"];
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
      });
    
  } 
  onFinancialInfoChange(financialDetails) {
    console.log("onFinancialInfoChange", financialDetails);
    this.companyForm.get("financialDetails").patchValue(financialDetails);
  }
  submitConsortiumRegistration(password) {
    // this.registrationObj['Ngotp'] = "1";
    // this.registrationObj['Chkfg'] = "";
    // this.registrationObj['Decfg'] = "X";
    // this.registrationObj["PasswordAng"] = password;
    // this.registrationObj["Operationx"] = "01";
    // this.registrationObj['StepNumberx'] = '00';

    // this.registrationObj.Nreg_ShareholderSet = [];
    // this.registrationObj.Nreg_AddressSet = [];
    // this.registrationObj.Nreg_CpersonSet = [];
    // this.registrationObj.Nreg_ContactSet = [];
    // this.registrationObj.Nreg_IdSet = [];
    // this.registrationObj["Nreg_BtnSet"] = [];
    // this.registrationObj["off_notesSet"] = [];
    // this.registrationObj["Nreg_ShareholderSet"] = [];
    // this.registrationObj["AttDetSet"] = [];
    // this.registrationObj["Nreg_MSGSet"] = [];
    // this.registrationObj["Nreg_FormEdit"] = {};
    let consortiumObj = this.companyForm.getRawValue();    

    this.registrationObj["Password"] = password;
    this.registrationObj["Confpwd"] = password;
    this.registrationObj["Operationz"] = "07";
    this.registrationObj["StepNumberz"] = "03";
    this.registrationObj["NotesSet"]["results"][0]["Noteno"]="001";
    this.registrationObj["NotesSet"]["results"][0]["Lineno"]=1;

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
        nameBCE: ['', [Validators.required,Validators.maxLength(120)]], 
        gccId: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(15)]], 
        cr: ['', [Validators.required]],
        copyOfCommercialNumberFile: ['', [Validators.required]],
        description: ['', [Validators.required]],

        country: ['', Validators.required],
        city: ['', Validators.required],
        // province: ['', Validators.required],
        cityCode: [''],
        cityName: [''],        
        streetName: ['', [Validators.required]],
        buildingNumber: ['', [Validators.required]],
        zipCode: ['', [ Validators.required]],
        additionalNumber: ['', [Validators.required]],
        // unitNumber: ['', [Validators.required]],
        mobileCode: ['966', [Validators.required]],
        mobileNumber: ['', [Validators.minLength(9), Validators.required, CustomValidators.startsWithValidator("5")]],
        website: ["",Validators.compose([Validators.required,Validators.pattern(
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
        ),]),],


        designation: ['', [Validators.required]],
        idType: ['', [Validators.required]],
        idNumber: ['', [Validators.required]],
        dateOfBirth:[null,[Validators.required, CustomValidators.futureDateValidator()]],
        firstName: ['', [Validators.required]],
        country1: ['', Validators.required],
        // mobileCode1: ['966', [Validators.required]],
        phoneNumber: ['', [ Validators.required ]],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email, CustomValidators.emailValidator('email')]],
        copyOfGMID: ['', [Validators.required]],
     
        otpVerified: ['', [Validators.required]], 
         
      }),
      branchDetails: this._formBuilder.array([]),
      shareHolderDetails: this._formBuilder.array([]),
      financialDetails: this._formBuilder.group({
        accounting: ['A'],
        calendarType: ['H'],
        hijriSelected: [true],
        gregorianSelected: [false],
        // tinNumber: [null],
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
    this.registrationObj["Commdt"] = "\/Date(" + response.commencementDate + ")\/";
    this.commencementDate = "\/Date(" + response.commencementDate + ")\/";
    this.businessCommencementDate = +response.commencementDate;
  }

  onBranchSaveEror(error) {
    console.log("onBranchSaveEror", error);
    this.step2Completed = false;
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
    this.registrationObj = {...this.registrationObj, ...resDetails};
  }
  goBack() {
    if(this.mainStepper && this.mainStepper.selectedIndex !== 0 && !this.showAcknowledgement){
      this.mainStepper.previous();
    }
    else{
      if(this.mainStepper && this.mainStepper.selectedIndex === 0 && this.hideOnOtpVerification){
          this.hideOnOtpVerification=false;
       }else
          window.history.back();
    }
  }
  
  restrictAlphabetss(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57) || x == 45) return true;
    else return false;
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