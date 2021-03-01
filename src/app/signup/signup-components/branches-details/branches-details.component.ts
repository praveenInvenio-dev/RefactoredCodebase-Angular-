import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatVerticalStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { AppService } from 'src/app/app.service';
import { SignupService } from 'src/app/services/signup.service';
import { DatepickerUtilitiesService } from 'src/app/shared/services/datepicker-utilities.service';
import { CustomValidators } from '../../../shared/custom-validators';
import * as moment from 'moment-hijri';

declare var jQuery: any;
import * as _ from 'underscore';
import { branchConstants } from './branches-details.constants';
import { OutletSet } from 'src/app/dto/establishment/outlet-set';
import { ActivitySet } from 'src/app/dto/establishment/activity-set';
import { AddressSet } from 'src/app/dto/establishment/address-set';
import { CpersonSet } from 'src/app/dto/establishment/cperson-set';
import { ContactSet } from 'src/app/dto/establishment/contact-set';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import { SignupAttachmentsComponent } from '../signup-attachments/signup-attachments.component';
import { inputs } from '@syncfusion/ej2-angular-calendars/src/calendar/calendar.component';
import { SignupComponentsService } from '../signup-components.service';

@Component({
  selector: 'branches-details',
  templateUrl: './branches-details.component.html',
  styleUrls: ['./branches-details.component.css']
})
export class BranchesDetailsComponent implements OnInit {
  @Input() mainStepperControl: any;
  @Input() Taxtpdetermination: string = '0';
  @Input() contractNumber: number = 0;
  showContractNumber: boolean = false;
  registrationObj: any = null;
  ATYPE: String = '';
  memoFileNamesList: any = [];
  crFileNamesList: any = [];
  transFileNamesList: any = [];
  licenseFileNamesList: any = [];
  contractFileNamesList: any = [];
  copyGMIdFileNamesList: any = [];
  @Input() set regSet(registrationObj: any) {
    this.registrationObj = registrationObj;
  }
  lang: any = {};
  direction: string = "ltr";
  BranchesList: any = [];
  branchDetailsForm: FormGroup;
  branchListdataSource: MatTableDataSource<any>;
  @ViewChild('brDisplayTable', { read: MatSort, static: false }) brSort: MatSort;
  @ViewChild('branchDetailsStepper') branchDetailsStepper: MatVerticalStepper;
  @ViewChild('branchFormDirective') branchFormDirective;
  branchDisplayColumns = ["branchName", "licenseNumber", "branchCity", "branchType", "update", "delete"];
  crAddressesList: any[] = [];
  calendarType: string = "Gregorian";
  showCRAdressesList: boolean = false;
  selectedLanguage: string = "en";
  showAttachments: boolean = false;
  hideAddLicensesOption: boolean = false;
  errorMsgsList: any = [];
  businessCommencementDate: number = 0;
  step2Completed: boolean;
  public mobileNumberMask = "0{15}";
  public contractNumberMask = "A{20}";
  public companyNameMask = "A{80}";
  public cpIdNumberMask = "0*";
  headerComponent = CalendarComponent;
  panelOpenState: boolean = false;

  @Output() onBranchSaveSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBranchSaveEror: EventEmitter<any> = new EventEmitter<any>();

  public countiesList: any = [];
  public statesList: any = [];
  public citiesList: any = [];
  public mainGroupActivityList: any = [];
  public subGroupActivityList: any = [];
  public mainActivityList: any = [];
  public phoneCodes: any = [];
  public issueByList: any = [];
  public idTypesList: any = [];

  deleteBranchObj: any = {};
  MCI_CR_NUMBERS_LIST: any = [];
  @Input() set mciCRNumbersList(mciCRNumbersList: any) {
    this.MCI_CR_NUMBERS_LIST = mciCRNumbersList || [];
    //console.log("set mciCRNumbersList", this.MCI_CR_NUMBERS_LIST);
    let MCI_CR_BRANCHES_LIST = this.prepareMCIBranchesList(mciCRNumbersList);
    let brList = [];
    brList = this.BranchesList.filter((branch: any) => {
      return !branch.isMCIData;
    }) || [];
    this.BranchesList = MCI_CR_BRANCHES_LIST.concat(brList);
    this.updateBranchListDataSource(this.BranchesList);
  }

  @Input() set Atype(Atype: String) {
    this.ATYPE = Atype || '2';
  }
  constructor(private _dateAdapter: DateAdapter<JDNConvertibleCalendar>, private _formBuilder: FormBuilder, private appSrv: AppService, private signupService: SignupService, public notifierService: NotifierService, private router: Router, private dpuService: DatepickerUtilitiesService, private signupComponentsService: SignupComponentsService) { }

  ngOnInit(): void {
    if (this.Taxtpdetermination == '5') {
      this.showContractNumber = true;
      //console.log("contractNumber", this.contractNumber);
    }

    if (localStorage.getItem("lang") === "ar") {
      this.lang = branchConstants.langz.arb.branch;
      this.direction = branchConstants.langz.arb.dir;
      this.selectedLanguage = "ar";
    } else {
      this.lang = branchConstants.langz.eng.branch;
      this.direction = branchConstants.langz.eng.dir;
    }
    moment.locale('en-US');
    this.branchDetailsForm = this.getBranchDetailsForm();

    this.mobileNumberMask = "0{15}";
    this.contractNumberMask = "A{20}";
    //this.licenseNumberMask = "A{15}";
    this.companyNameMask = "A{80}";

    this.getAddressLookups();
    this.getGroupActivityLookup();
    this.getPhoneCodes();
    this.getIssueByList(this.selectedLanguage);
    this.getIdTypesList(this.selectedLanguage);
    this.businessCommencementDate = 0;//new Date().getTime();
    moment.locale('en-US');

    this.dpuService.datepickerEvents.subscribe((calendarType) => {
      //console.log("Branch Catach Evevnt");
      this.calendarType = calendarType;
      //get all datepcikers and update date
      let fields = ["startDate", "dateOfBirth", "validFrom"];
      this.signupComponentsService.updateCalendarType(this.branchDetailsForm, fields, calendarType);
    });

  }





  onBranchStepChange(event) {
    //console.log("onBranchStepChange", event);
    event.selectedStep.interacted = false;
    //previouslySelectedIndex
    //previouslySelectedStep
    //selectedIndex
    //selectedStep
  }
  searchBranchList(searchString) {
    this.branchListdataSource.filter = searchString.trim().toLocaleLowerCase();
  }

  confirmDeleteBranch(branch) {
    this.deleteBranchObj = branch;
    jQuery("#deleteOutletModal").modal("show");
  }
  deleteBranch(branchObj) {
    //console.log("deleteBranch", branchObj);
    if (branchObj.branchDetails.branchNo == "00000") {
      this.notifierService.notify('error', "Main Outlet cannot be deleted");
      return true;
    }
    let delOutletbj = {
      fbNum: this.registrationObj["Fbnumx"],
      actnm: branchObj.branchDetails.branchNo,
      email: this.registrationObj["PortalUsrx"]
    }
    this.signupService.deleteOutlet(delOutletbj).subscribe((response: any) => {
      this.updateBranchList('delete_branch', branchObj);
      jQuery("#deleteOutletModal").modal("hide");
    }, (error) => {
      jQuery("#deleteOutletModal").modal("hide");
      this.notifierService.notify(
        "error",
        error.error.error.innererror.errordetails[0].message
      );
    });
  }

  onIssueCountryChange(identificationForm) {
    if (identificationForm.value.issueCountry == 'SA') {
      identificationForm.patchValue({ "issuedBy": 90702 });
    } else {
      identificationForm.patchValue({ "issuedBy": 90718 });
    }
  }

  getAddressLookups() {
    this.appSrv.getCountry().subscribe((res) => {
      this.countiesList = res["d"]["country_dropdownSet"]["results"];
      this.statesList = res["d"]["State_dropdownSet"]["results"];
      this.citiesList = res["d"]["city_dropdownSet"]["results"];
      this.citiesList.shift();
      // this.citiesList.forEach((ele) => {
      //   ele.CityName = ele.CityName.toUpperCase();
      // });
      //console.log("this.citiesList", this.citiesList);
    });
  }

  getGroupActivityLookup() {
    this.signupService.getGroupActivity().subscribe((res) => {
      //console.log("Group Activity :: ", res);
      this.mainGroupActivityList = res["d"]["act_groupSet"]["results"];
      this.subGroupActivityList = res["d"]["act_subgroupSet"]["results"];
      this.mainActivityList = res["d"]["activitySet"]["results"];
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

  getIssueByList(lang) {
    this.issueByList = this.signupService.getIssueByList(lang);
  }

  getIdTypesList(lang) {
    this.idTypesList = this.signupService.getIdTypesList(lang);
  }

  validateCRNumber(identification: any) {
    let identificationType = identification.value.identificationType;
    let crNumber = identification.value.licenseNumber;
    //console.log(identificationType, crNumber);
    if (identification.get("licenseNumber").valid) {
      if (identificationType == 1) {
        identification.get("issuedCity").disable();
        identification.get("issuedCity").setValidators(null);
        this.setBranchAddress(null);
        this.signupService.validateCR(crNumber).subscribe((response: any) => {
          //console.log("response", response);
          if (response["d"].NotFound == "X") {
            this.notifierService.notify("error", this.lang.err.invalidCR);
            identification.patchValue({ "issueCountry": 'SA' });
            identification.patchValue({ "issuedCity": "", "validFrom": null });
          } else {
            this.getCRAddressesList("BUP002", crNumber);
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
          //console.log("errors", temp);
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
      this.setBranchAddress(null);
      this.branchDetailsStepper.selected.completed = false;
    }
  }

  //saudi Post
  saveBranch() {
    //console.log("saveBranch");

    let branchObj = Object.assign({}, this.branchDetailsForm.getRawValue());
    //console.log(branchObj);
    //console.log(this.branchDetailsForm);
    //this.branchDetailsStepper.next();

    //let isIdentificationsListValid = this.getIdentificationsValidation();
    ////console.log(!this.branchDetailsForm.get("branchDetails").valid, !this.branchDetailsForm.get("addressDetails").valid, !this.branchDetailsForm.get("contactPersonDetails").valid, !isIdentificationsListValid)
    // let contactFormValid =  branchObj.branchDetails.branchNo == "00000" ? ! this.branchDetailsForm.get("contactPersonDetails").valid : false;
    //!this.branchDetailsForm.get("contactPersonDetails").valid;

    // if (!this.branchDetailsForm.get("branchDetails").valid || !this.branchDetailsForm.get("addressDetails").valid || contactFormValid || !isIdentificationsListValid) {
    //   return true;
    // }


    let selectedCity = [];
    selectedCity = this.citiesList.filter((city) => {    
      return (city.CityCode == branchObj.addressDetails.city)
    });
    //console.log("selectedCity", selectedCity);
    /////////////////This is just to display the city name in Branch Lst Table 
    if (selectedCity.length > 0) {

      branchObj.addressDetails.cityCode = selectedCity[0].CityCode;
      branchObj.addressDetails.cityName = selectedCity[0].CityName;

      // this.branchDetailsForm.get("addressDetails").patchValue({
      //   cityCode: selectedCity[0].CityCode,
      //   cityName: selectedCity[0].CityName
      // });
    } else {
      // this.branchDetailsForm.get("addressDetails").patchValue({
      //   cityCode: "",
      //   cityName: ""
      // });
      branchObj.addressDetails.cityCode = "";
      branchObj.addressDetails.cityName = "";
    }
    ////////////////////////////////////////////////////

    //branchObj = Object.assign({}, this.branchDetailsForm.getRawValue());

    let Nreg_OutletSet = this.transformBranchDetails(branchObj);


    let idList = [];
    idList = branchObj.activityDetails.identificationsList.filter((identification) => {
      if (identification.identificationType == 1 && branchObj.activityDetails.crTypeSelected) {
        return true;
      }
      if (identification.identificationType == 2 && branchObj.activityDetails.licenseTypeSelected) {
        return true;
      }
      if (identification.identificationType == 3 && branchObj.activityDetails.contractTypeSelected) {
        return true;
      }
    });
    let Nreg_ActivitySet = this.transformIdentificationsList(idList);

    branchObj.addressDetails.branchNo = branchObj.branchDetails.branchNo;
    let Nreg_AddressSet = this.transformAddressDetails(branchObj.addressDetails);
    let Nreg_CpersonSet = [];
    let Nreg_ContactSet = [];
    let Nreg_IdSet = [];



    if (branchObj.branchDetails.branchNo == "00000") {
      branchObj.contactPersonDetails.branchNo = branchObj.branchDetails.branchNo;
      Nreg_CpersonSet = this.transformContactPersonDetails(branchObj.contactPersonDetails);
      Nreg_ContactSet = this.transformContactDetails(branchObj.contactPersonDetails);
      Nreg_IdSet = this.transformIdDetails(branchObj.contactPersonDetails);


    }
    this.registrationObj.Operationx = "05";
    this.registrationObj.StepNumberx = "03";
    this.registrationObj.Nreg_OutletSet = Nreg_OutletSet;
    this.registrationObj.Nreg_ActivitySet = Nreg_ActivitySet;
    this.registrationObj.Nreg_AddressSet = Nreg_AddressSet;
    this.registrationObj.Nreg_CpersonSet = Nreg_CpersonSet;
    this.registrationObj.Nreg_ContactSet = Nreg_ContactSet;
    this.registrationObj.Nreg_IdSet = Nreg_IdSet;
    this.registrationObj.Nreg_ShareholderSet = [];

    this.registrationObj["Nreg_BtnSet"] = [];
    this.registrationObj["off_notesSet"] = [];
    this.registrationObj["Nreg_ShareholderSet"] = [];
    this.registrationObj["AttDetSet"] = []; // this.removeResults(this.requestObj1["AttDetSet"]);
    this.registrationObj["Nreg_MSGSet"] = [];
    this.registrationObj["Nreg_FormEdit"] = {};
    delete this.registrationObj["__metadata"];
    //console.log(this.registrationObj);

    this.saveConsortium(this.registrationObj, branchObj.action, branchObj);
  }
  getCommencementDate() {
    let commDateTickFormat: any = null;
    let a = [];
    let minDate = new Date("2006,01,01").getTime();

    this.BranchesList.forEach((branchObj) => {
      branchObj.activityDetails.identificationsList.filter((identification) => {
        if (identification.validFrom) {
          let tmpdate = this.dpuService.getAPIFormatDate(identification.validFrom);
          let validFromTimeStamp = +tmpdate.replace(/\D/g, '');
          a.push(validFromTimeStamp);
        }
      });
    });

    a.sort(function (a, b) { return a - b });
    if (a[0] < minDate) {
      commDateTickFormat = minDate;

    } else {
      commDateTickFormat = a[0] || minDate;
    }
    //console.log("a", a, commDateTickFormat);
    this.registrationObj["Commdt"] = "\/Date(" + commDateTickFormat + ")\/";
    this.businessCommencementDate = +commDateTickFormat;
    return commDateTickFormat;
  }
  saveConsortium(registrationObj, action = '', dataObj: any = {}) {
    if (this.branchDetailsStepper.selectedIndex == 3 && this.branchDetailsForm.get('contactPersonDetails').invalid) { return true; }
    this.signupService.postNewRegSet(registrationObj).subscribe((response: any) => {
      this.registrationObj = response["d"];
      jQuery("#addBranchDetailsModal").modal("hide");

      if (dataObj.isMCIData) {
        dataObj.isMCIDataSaved = true;
      }

      if (action == "add_branch" || action == "update_branch" || action == 'delete_branch') {
        this.branchDetailsStepper.next();
        this.updateBranchList(action, dataObj);
        //this.onFinancialDetailsChange();
        this.getCommencementDate();
        let brSaveResponse = {
          branchesList: this.BranchesList,
          apiResponse: this.registrationObj,
          commencementDate: this.businessCommencementDate
        }
        this.onBranchSaveSuccess.emit(brSaveResponse);
      }

    }, (err) => {

      this.onBranchSaveEror.emit(err);

      this.branchDetailsStepper.next();
      this.errorMsgsList = [];
      let temp = err.error.error.innererror.errordetails.filter((error) => error.code != "/IWBEP/CX_MGW_BUSI_EXCEPTION");
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
      //console.log("errors", temp);
      this.errorMsgsList = temp || [];
      if (this.errorMsgsList.length > 1) {
        jQuery("#brErrorMsgsModal").modal('show');
      } else {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    });
  }
  getCRAddressesList(idType, crNumber) {
    this.crAddressesList = [];
    this.signupService.getAddress(idType, crNumber).subscribe((response: any) => {
      //console.log("getAddress", response)
      this.crAddressesList = response["d"]["results"] || [];
      if (this.crAddressesList.length == 1) {
        this.showCRAdressesList = true;
        //this.setBranchAddress(this.crAddressesList[0]);
      } else if (this.crAddressesList.length > 1) {
        this.showCRAdressesList = true;
      }
    }, (error) => {
      this.crAddressesList = [];
    });
  }
  onActivitiesChange(identificationForm, activityType) {
    if (activityType == 'mainGroupActivity') {
      //clear sub group and main activity
      identificationForm.patchValue({ "subGroupActivity": "", "mainActivity": "" });
      identificationForm.get("subGroupActivity").reset();
      identificationForm.get("mainActivity").reset();

    } else if (activityType == 'subGroupActivity') {
      //set main group activity and clear main activity
      let mga = identificationForm.value.subGroupActivity.substring(0, 2);
      identificationForm.patchValue({ "mainGroupActivity": mga });
      identificationForm.get("mainActivity").reset();
    } else if (activityType == 'mainActivity') {
      //set main group activity and sub group activity
      let mga = identificationForm.value.mainActivity.substring(0, 2);
      let sga = identificationForm.value.mainActivity.substring(0, 4);
      identificationForm.patchValue({ "mainGroupActivity": mga, "subGroupActivity": sga });
    }
  }
  transformBranchDetails(branchDetailsForm) {
    let BranchList = [];
    var branchObj = new OutletSet();
    branchObj.Actcat = branchDetailsForm.branchDetails.branchNo == "00000" ? "M" : "S";
    branchObj.Actnm = branchDetailsForm.branchDetails.branchName || "";
    branchObj.Actno = branchDetailsForm.branchDetails.branchNo || "";
    // branchObj.Caltp = "H";
    branchObj.Cmatt = branchDetailsForm.branchDetails.branchNo == "00000" ? "X" : "";
    BranchList.push(branchObj);
    return BranchList;
  }
  transformIdentificationsList(identificationsList) {
    let Nreg_ActivitySet = [];
    Nreg_ActivitySet.push({
      ValidDateFrom: null,
      ValidDateTo: null,
      ValidDateType: "X"
    });
    identificationsList.forEach((idenification) => {
      let actvtset = new ActivitySet();
      actvtset.ActMgrp = idenification.mainGroupActivity || "";
      actvtset.ActSgrp = idenification.subGroupActivity || "";
      actvtset.Actcat = idenification.isMainActivity ? "M" : "S";
      actvtset.Activity = idenification.mainActivity || "";
      actvtset.Actno = this.branchDetailsForm.value.branchDetails.branchNo || "";
      actvtset.Crattfg = this.branchDetailsForm.value.branchDetails.branchNo == "00000" ? 'X' : '';
      actvtset.CityCode = idenification.issuedCity || "";
      actvtset.Country = idenification.issueCountry || "";

      let selectedCity = [];
      selectedCity = this.citiesList.filter((city) => {
        return (city.CityCode == idenification.issuedCity)
      });
      if (selectedCity.length > 0) {
        actvtset.City = selectedCity[0].CityName
      } else {
        actvtset.City = "";
      }

      // actvtset.City = this.citiesList.filter((city) => {
      //   return (city.CityCode == idenification.issuedCity)
      // })[0].CityName;
      actvtset.Idnumber = idenification.licenseNumber || "";
      actvtset.Institute = idenification.issuedBy ? idenification.issuedBy.toString() : "";
      actvtset.Type = +idenification.identificationType == 1 ? "BUP002" : +idenification.identificationType == 2 ? "ZS0004" : "ZS0007";
      // licensetype "ZS0004"; 
      // contract type "ZS0007";
      // cr type "BUP002" 
      actvtset.DataVersion = "00000";
      actvtset.Srno = 0;
      actvtset.ValidDateFrom = idenification.validFrom ? this.dpuService.getAPIFormatDate(idenification.validFrom) : null;
      actvtset.ValidDateTo = "/Date(253402214400000)/";
      Nreg_ActivitySet.push(actvtset);
    });
    return Nreg_ActivitySet;
  }
  transformAddressDetails(addressDetails, source = 'Outlet') {
    let addressList = [];
    //Default
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
    addressObj.Begda = this.dpuService.getAPIFormatDate(new Date());
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
    addressObj.Srcidentify = "O" + addressDetails.branchNo;
    addressObj.Street = addressDetails.streetName || "";

    addressList.push(addressObj);

    //Address1
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
    addressObj1.Begda = this.dpuService.getAPIFormatDate(new Date());
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


    // addressObj1.City1 = this.citiesList.filter((city) => {
    //   return (city.CityCode == addressDetails.city)
    // })[0].CityName;
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
    addressObj1.Srcidentify = "O" + addressDetails.branchNo;
    addressObj1.Street = addressDetails.streetName || "";

    addressList.push(addressObj1);
    return addressList;
  }
  shareHoldersList: any = [];
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
  transformContactPersonDetails(contactPersonDetails, source = 'Outlet') {
    //console.log("transformContactPersonDetails", contactPersonDetails);
    let contactPersonList = [];
    let contactPersonObj = new CpersonSet();

    delete contactPersonObj.Cpoldfg;
    delete contactPersonObj.DataVersion;
    delete contactPersonObj.FormGuid;
    delete contactPersonObj.LineNo;
    delete contactPersonObj.Mandt;
    delete contactPersonObj.RankingOrder;
    delete contactPersonObj.DataVersion;
    contactPersonObj.Srcidentify = "C" + contactPersonDetails.branchNo; // Derive it dynamically based on Outlet length
    contactPersonObj.Outletnm = "O" + contactPersonDetails.branchNo;
    contactPersonObj.Contacttp = "BUR001";
    contactPersonObj.Dobdt = (contactPersonDetails.dateOfBirth) ? this.dpuService.getAPIFormatDate(
      contactPersonDetails.dateOfBirth
    ) : null;
    contactPersonObj.Startdt = contactPersonDetails.startDate ? this.dpuService.getAPIFormatDate(contactPersonDetails.startDate) : null;
    contactPersonObj.Enddt = "/Date(253402214400000)/";
    contactPersonObj.Familynm = contactPersonDetails.lastName || "";;
    contactPersonObj.Lastnm = contactPersonDetails.lastName || "";
    contactPersonObj.Firstnm = contactPersonDetails.firstName || "";
    contactPersonObj.Gmatt = contactPersonDetails.copyOfGMID ? true : false;
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

    mobilecontactObj.Begda = this.dpuService.getAPIFormatDate(new Date());


    // mobileCode: "966"
    // mobileNumber: "5645634563"
    // if(){      
    // }

    mobilecontactObj.Endda = "/Date(253402214400000)/";
    mobilecontactObj.Srcidentify = "O" + contactPersonDetails.branchNo;
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
    // let idObj = new IdSet();
    let idObj: any = {};
    idObj.Type = contactPersonDetails.idType || "";
    idObj.Idnumber = contactPersonDetails.idNumber || "";
    idObj.Gpart = contactPersonDetails.tinNumber || "";
    idObj.Srcidentify = "C" + contactPersonDetails.branchNo;
    idObj.Country = contactPersonDetails.issueCountry || "";
    if (this.registrationObj.Atype === '1') {
      idObj.Type = this.registrationObj.IdType || "";
      idObj.Idnumber = this.registrationObj.Id || "";
    }
    IdList.push(idObj);
    return IdList;
  }

  public tinDetails: any = {};
  getTINDetails() {
    this.tinDetails = {};
    this.resetContactPersonForm(false, true, false);
    if (this.branchDetailsForm.get("contactPersonDetails").get("tinNumber").valid && this.branchDetailsForm.get("contactPersonDetails").get("tinNumber").value) {
      let tinNumber = this.branchDetailsForm.value.contactPersonDetails.tinNumber;
      this.signupService.getTINDetails(tinNumber).subscribe((response) => {
        //console.log("tinNumber details", response);
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
        //console.log(dob, issueDt, this.tinDetails.Birthdt);

        const control = this.branchDetailsForm.get("contactPersonDetails");
        control.patchValue({
          "idType": this.tinDetails.Idtype,
          "idNumber": this.tinDetails.Idnum,
          "issueCountry": this.tinDetails.Idtype == 'FS0002' ? this.tinDetails.IdIssueingCountry : this.tinDetails.Country,
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
      //console.log("tinNumber Invalid");
      this.resetContactPersonForm(false, true, false);
      this.updateContactPersonFormValidators();
    }
  }
  resetContactPersonForm(clearAll = false, exceptTIN = false, exceptIdType = false, exceptidNumber = false, exceptDOB = false) {
    const contactPersonDetailsForm = <FormGroup>this.branchDetailsForm.get("contactPersonDetails");
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
      confirmEmail: '',
      copyOfGMID: data.copyOfGMID
    });
  }
  onIdTypeChange() {
    //console.log("onIdTypeChange");

    this.resetContactPersonForm(false, false, true);
    this.updateContactPersonFormValidators();
    this.getContactPersonDetailsByIdType();
  }
  onBCPIdNumberChange(source = '') {
    //console.log("onBCPIdNumberChange");
    if (this.branchDetailsForm.value.contactPersonDetails.idType == 'ZS0001' || this.branchDetailsForm.value.contactPersonDetails.idType == 'ZS0002') {
      let exceptDOB = (source == 'dob') ? true : false;
      //const contactPersonDetailsForm = <FormGroup>this.branchDetailsForm.get("contactPersonDetails");
      this.resetContactPersonForm(false, false, true, true, exceptDOB);
      //this.updateContactPersonFormValidators();
      this.getContactPersonDetailsByIdType();
    }
  }
  onBCPMobileCodeChange() {
    this.branchDetailsForm.get("contactPersonDetails").get("mobileNumber").reset();
    let code = this.branchDetailsForm.get("contactPersonDetails").get("mobileCode").value;
    //console.log("onBCPMobileCodeChange", code);
    // let validators = [];
    if (code != "966") {
      // let maxlength = 14 - (2 + (code.length));
      // Validators.maxLength(maxlength),
      this.branchDetailsForm.get("contactPersonDetails").get("mobileNumber").setValidators([Validators.required, Validators.minLength(9), CustomValidators.startsWithValidator("5")]);

      this.branchDetailsForm.get("contactPersonDetails").get("mobileNumber").setErrors({ "startsWith": { value: true } })
    }
  }

  onBCPMobileNumberChange() {
    let code = this.branchDetailsForm.get("contactPersonDetails").get("mobileCode").value;
    //console.log("onBCPMobileNumberChange", code);
    if (code != "966") {
      this.branchDetailsForm.get("contactPersonDetails").get("mobileNumber").setErrors({ "startsWith": { value: true } })
    }
  }
  getContactPersonDetailsByIdType() {
    const contactPersonDetailsForm = <FormGroup>this.branchDetailsForm.get("contactPersonDetails");
    let contactPersonDetails = this.branchDetailsForm.get('contactPersonDetails').value;

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
        //console.log("tinNumber details", response);
        this.tinDetails = response["d"] || {};
        const control = this.branchDetailsForm.get("contactPersonDetails");

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

  setBranchAddress(addressObj: any = null) {
    //console.log("setBranchAddress", addressObj);

    if (addressObj) {
      let cityObj = this.citiesList.filter(city => city.CityName == addressObj.CityName);
      let province = "";
      let city = "";
      if (cityObj.length > 0) {
        province = cityObj[0].Region;
        city = cityObj[0].CityCode;
      }
      this.branchDetailsForm.get("addressDetails").patchValue({
        "country": 'SA',
        "province": province || "",
        "city": city || "",
        "district": addressObj.DistrictName ? addressObj.DistrictName.substr(0, 10) : "",
        "streetName": addressObj.StreetName || "",
        "buildingNumber": addressObj.BuildingNo || "",
        "zipCode": addressObj.Zipcode || "",
        "additionalNumber": addressObj.AdditionalNo || "",
        "unitNumber": addressObj.UnitNo || ""
      });
      this.showCRAdressesList = false;
      // this.branchDetailsForm.get("addressDetails").disable();
      // this.branchDetailsForm.get("addressDetails").setValidators(null);
    } else {
      this.branchDetailsForm.get("addressDetails").reset();
      this.markAllControlsAsPristine(<FormGroup>this.branchDetailsForm.get("addressDetails"));
    }
  }
  markAllControlsAsPristine(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsPristine({ onlySelf: true });
        control.markAsUntouched();
        control.updateValueAndValidity();
        // control.setErrors(null);
      } else if (control instanceof FormGroup) {        //{5}
        this.markAllControlsAsPristine(control);            //{6}
      }
    });
  }


  // validateIdentificationsListOld() {
  //   let isIdentificationsListValid = this.getIdentificationsValidation();
  //   if (isIdentificationsListValid) {
  //     this.branchDetailsForm.patchValue({ "stepCompleted": true });
  //     //console.log("All forms valid", this.branchDetailsForm.value.stepCompleted);
  //     this.branchDetailsStepper.selected.completed = true;
  //     this.branchDetailsStepper.next();
  //   } else {
  //     //console.log("invalid");
  //     this.branchDetailsForm.patchValue({ "stepCompleted": false });
  //   }
  // }


  validateIdentificationsList() {
    this.branchDetailsForm.patchValue({ "stepCompleted": false });
    let isIdentificationsListValid = this.getIdentificationsValidation();
    if (isIdentificationsListValid) {
      this.branchDetailsForm.patchValue({ "stepCompleted": true });
    } else {
      // //console.log("invalid");
      this.branchDetailsForm.patchValue({ "stepCompleted": false });
    }
  }

  getIdentificationsValidation() {

    let crTypeSelected = this.branchDetailsForm.get("activityDetails").value.crTypeSelected;
    let licenseTypeSelected = this.branchDetailsForm.get("activityDetails").value.licenseTypeSelected;
    let contractTypeSelected = this.branchDetailsForm.get("activityDetails").value.contractTypeSelected;

    let idsSelected: any = [];
    if (crTypeSelected) {
      idsSelected.push(1);
    }
    if (licenseTypeSelected) {
      idsSelected.push(2);
    }
    if (contractTypeSelected) {
      idsSelected.push(3);
    }

    const control = <FormArray>this.branchDetailsForm.get("activityDetails").get("identificationsList");
    let isIdentificationsListValid: boolean = true;
    let isMainActivitySelected: boolean = false;
    control.value.forEach((idTypeObj, index) => {

      //control.at(index).get("isMainActivity").markAsTouched();
      //console.log("rrrr", (control.at(index) as FormGroup).getRawValue().identificationType, control.at(index).valid);
      if (idsSelected.indexOf(+((control.at(index) as FormGroup).getRawValue().identificationType)) != -1) {

        if (idTypeObj.isMainActivity) {
          isMainActivitySelected = true;
        }

        if (!control.at(index).valid) {
          isIdentificationsListValid = false;
        }

      }
    });
    //console.log("getIdentificationsValidation", idsSelected, isIdentificationsListValid, isMainActivitySelected);
    return isIdentificationsListValid && isMainActivitySelected;
  }

  markMainActivityAsTouched() {
    const control = <FormArray>this.branchDetailsForm.get("activityDetails").get("identificationsList");
    control.value.forEach((idTypeObj, index) => {
      control.at(index).get("isMainActivity").markAsTouched();
    });
    this.validateIdentificationsList();
  }

  editMCIBranch(branchObj) {

    this.editBranch(branchObj);
    //console.log("editMCIBranch", branchObj);

    const branchDetailsForm = <FormGroup>this.branchDetailsForm.get("branchDetails");
    const activityDetailsFrom = <FormGroup>this.branchDetailsForm.get("activityDetails");
    const crNumbersList = <FormArray>this.branchDetailsForm.get("activityDetails").get("identificationsList");
    const addressDetailsForm = <FormGroup>this.branchDetailsForm.get("addressDetails");

    let licenseNumber = "";
    branchDetailsForm.get("branchName").disable();
    branchDetailsForm.get("branchName").clearValidators();
    branchDetailsForm.get("branchName").updateValueAndValidity();

    crNumbersList.value.forEach((idObj, index) => {

      if (idObj.identificationType == 1) {

        licenseNumber = crNumbersList.at(index).get("licenseNumber").value;
        let crNmuberDetails = (crNumbersList.at(index) as FormGroup).getRawValue();
        //console.log("crNmuberDetails", crNmuberDetails);


        crNumbersList.at(index).get("issueCountry").disable();
        crNumbersList.at(index).get("issuedBy").disable();
        crNumbersList.at(index).get("issuedCity").disable();
        crNumbersList.at(index).get("licenseNumber").disable();
        crNumbersList.at(index).get("validFrom").disable();

        crNumbersList.at(index).get("issueCountry").clearValidators();
        crNumbersList.at(index).get("issuedBy").clearValidators();
        crNumbersList.at(index).get("issuedCity").clearValidators();
        crNumbersList.at(index).get("licenseNumber").clearValidators();
        crNumbersList.at(index).get("validFrom").clearValidators();


        crNumbersList.at(index).get("issueCountry").updateValueAndValidity();
        crNumbersList.at(index).get("issuedBy").updateValueAndValidity();
        crNumbersList.at(index).get("issuedCity").updateValueAndValidity();
        crNumbersList.at(index).get("licenseNumber").updateValueAndValidity();
        crNumbersList.at(index).get("validFrom").updateValueAndValidity();


        if (branchObj.isAllMCIDataReceived) {

          crNumbersList.at(index).get("mainGroupActivity").disable();
          crNumbersList.at(index).get("subGroupActivity").disable();
          crNumbersList.at(index).get("mainActivity").disable();
          //crNumbersList.at(index).get("mainActivity").disable();

          crNumbersList.at(index).get("mainGroupActivity").clearValidators();
          crNumbersList.at(index).get("subGroupActivity").clearValidators();
          crNumbersList.at(index).get("mainActivity").clearValidators();
          crNumbersList.at(index).get("copyOfCommercialNumberFile").clearValidators();

          crNumbersList.at(index).get("mainGroupActivity").updateValueAndValidity();
          crNumbersList.at(index).get("subGroupActivity").updateValueAndValidity();
          crNumbersList.at(index).get("mainActivity").updateValueAndValidity();
          crNumbersList.at(index).get("copyOfCommercialNumberFile").updateValueAndValidity();

        }

      }

    });

    if (activityDetailsFrom.getRawValue().crTypeSelected && !addressDetailsForm.valid) {
      this.getCRAddressesList("BUP002", licenseNumber);
    }

  }

  editBranch(branchObj) {
    //console.log("editBranch", branchObj);
    this.branchFormDirective.resetForm();
    this.branchDetailsStepper.reset();
    this.branchDetailsForm = this.getBranchDetailsForm();
    jQuery("#addBranchDetailsModal").modal("show");
    branchObj.action = "update_branch";
    this.branchDetailsForm.patchValue(branchObj);

    const control = <FormArray>this.branchDetailsForm.get("activityDetails").get("identificationsList");
    branchObj.activityDetails.identificationsList.forEach((idObj) => {
      let identificationForm = this.getIdentificationForm();
      if (idObj.identificationType == 1) {
        identificationForm.get("copyOfContractFile").setValidators(null);
        identificationForm.get("copyOfLicenseFile").setValidators(null);
      } else if (idObj.identificationType == 2) {
        identificationForm.get("copyOfCommercialNumberFile").setValidators(null);
        // identificationForm.get("transferCopyOfCRFile").setValidators(null);
        identificationForm.get("copyOfContractFile").setValidators(null);
      } else if (idObj.identificationType == 3) {
        identificationForm.get("copyOfLicenseFile").setValidators(null);
        identificationForm.get("copyOfCommercialNumberFile").setValidators(null);
        // identificationForm.get("transferCopyOfCRFile").setValidators(null);
      }
      if (this.branchDetailsForm.get("branchDetails").get("branchNo").value != "00000" || this.ATYPE == '1') {
        this.branchDetailsForm.get("contactPersonDetails").clearValidators();
        this.branchDetailsForm.get("contactPersonDetails").setErrors(null);
        let ctrl = <FormGroup>this.branchDetailsForm.get("branchDetails");
        ctrl.get("companyMemorondum").clearValidators();
        ctrl.get("companyMemorondum").setErrors(null);
      }
      this.branchDetailsForm.updateValueAndValidity()
      this.branchDetailsForm.markAsPristine();
      identificationForm.updateValueAndValidity();
      identificationForm.reset();
      identificationForm.patchValue(idObj);
      control.push(identificationForm);
    });
    this.updateContactPersonFormValidators();


    const actDetailsCtrl = this.branchDetailsForm.get("activityDetails");

    actDetailsCtrl.valueChanges.subscribe((formValue) => {
      this.validateIdentificationsList();
    });
  }


  updateContactPersonFormValidators() {
    let contactPersonDetails = this.branchDetailsForm.get("contactPersonDetails").value;
    const contactPersonDetailsForm = <FormGroup>this.branchDetailsForm.get("contactPersonDetails");
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
  updateBranchList(action, branchObj) {
    //console.log("updateBranchList", action, branchObj);
    if (action == 'add_branch') {
      this.BranchesList.push(branchObj);
    } else if (action == 'update_branch') {
      var brIndex = this.BranchesList.findIndex(branch => branch.branchDetails.branchNo == branchObj.branchDetails.branchNo);
      this.BranchesList[brIndex] = branchObj;
    } else if (action == 'delete_branch') {
      var brIndex = this.BranchesList.findIndex(branch => branch.branchDetails.branchNo == branchObj.branchDetails.branchNo);
      this.BranchesList.splice(brIndex, 1);
    }
    //this.branchListdataSource = new MatTableDataSource(<any>this.BranchesList);
    this.updateBranchListDataSource(this.BranchesList);
    this.branchDetailsForm.reset();
    jQuery("#addShareholderDetailsModal").modal("hide");
  }

  updateBranchListDataSource(BranchesList: any = []) {
    //console.log("updateBranchListDataSource", BranchesList);
    let branchListdataSource = [];

    BranchesList.forEach((branch) => {
      let branchObj = { "branchName": "", "licenseNumber": "", "branchCity": "", "branchType": "", "branchFormData": null, "isMCIData": false, "isMCIDataSaved": false, "isAllMCIDataReceived": false };
      branchObj.branchName = branch.branchDetails.branchName;
      let mainLicense = [];
      mainLicense = branch.activityDetails.identificationsList.filter((activity) => {
        return activity.isMainActivity
      }) || [];
      branchObj.licenseNumber = mainLicense.length > 0 ? mainLicense[0].licenseNumber : "";
      branchObj.branchCity = branch.addressDetails.cityName;//mainLicense[0].issuedCity;
      branchObj.branchType = branch.branchDetails.branchNo == '00000' ? this.lang.mainBrString : this.lang.subBrString;
      branchObj.branchFormData = branch;
      branchObj.isMCIData = branch.isMCIData || false;
      branchObj.isMCIDataSaved = branch.isMCIDataSaved || false;
      branchObj.isAllMCIDataReceived = branch.isMCIDataSaved || false;
      //console.log("branchObj", branchObj);
      branchListdataSource.push(branchObj);
      branchObj = null;
    });
    setTimeout(() => {
      this.branchListdataSource = new MatTableDataSource(<any>branchListdataSource);
      this.branchListdataSource.sort = this.brSort;
    }, 10);

  }

  ngAfterViewInit() {
    this.branchListdataSource = new MatTableDataSource(<any>[]);
    this.branchListdataSource.sort = this.brSort;
  }
  onIdentificationTypeSelect() {
    let crTypeSelected = this.branchDetailsForm.get("activityDetails").value.crTypeSelected;
    let licenseTypeSelected = this.branchDetailsForm.get("activityDetails").value.licenseTypeSelected;
    let contractTypeSelected = this.branchDetailsForm.get("activityDetails").value.contractTypeSelected;

    let cnTypeCount = this.getIdTypeCount(1);
    let licenseTypeCount = this.getIdTypeCount(2);
    let contractTypeCount = this.getIdTypeCount(3);

    let addedIdForm: any = null;
    if ((crTypeSelected && cnTypeCount == 0)) {
      addedIdForm = this.addNewIdentificationType(1);
    } else if ((licenseTypeSelected && licenseTypeCount == 0)) {
      addedIdForm = this.addNewIdentificationType(2);
    } else if ((contractTypeSelected && contractTypeCount == 0)) {
      addedIdForm = this.addNewIdentificationType(3);
    }
    if (licenseTypeCount >= 4) {
      this.hideAddLicensesOption = true;
    } else {
      this.hideAddLicensesOption = false;
    }
    return addedIdForm;
  }

  addNewIdentificationType(idType: number = 0) {
    const control = <FormArray>this.branchDetailsForm.get("activityDetails").get("identificationsList");
    // let crTypeSelected = this.branchDetailsForm.get("activityDetails").value.crTypeSelected;
    // let licenseTypeSelected = this.branchDetailsForm.get("activityDetails").value.licenseTypeSelected;
    // let contractTypeSelected = this.branchDetailsForm.get("activityDetails").value.contractTypeSelected;


    let cnTypeCount = this.getIdTypeCount(1);
    let licenseTypeCount = this.getIdTypeCount(2);
    let contractTypeCount = this.getIdTypeCount(3);


    let licenseNumberMask = "A{20}";
    let idTypeCount = 0;
    let isMainActivitySelected: boolean = false;
    idTypeCount = control.value.filter((idTypeObj) => {
      if (idTypeObj.isMainActivity) {
        isMainActivitySelected = true;
      }

      return +idTypeObj.identificationType == +idType;
    }).length;

    //console.log("isMainActivitySelected", isMainActivitySelected);
    let identificationForm = this.getIdentificationForm();

    //  licenseNumber
    let insertIndex = 0;
    if (+idType == 1) {
      identificationForm.get("licenseNumber").setValidators([Validators.required, Validators.minLength(10)]);
      identificationForm.get("copyOfContractFile").setValidators(null);
      identificationForm.get("copyOfLicenseFile").setValidators(null);
      identificationForm.get("issuedBy").disable();
      identificationForm.get("issuedBy").setValidators(null);
      identificationForm.get("validFrom").disable();
      identificationForm.get("validFrom").setValidators(null);
      // identificationForm.get("issueCountry").disable();
      identificationForm.get("issueCountry").setValidators(null);


      //      identificationForm.get("identificationForm").setValidators
      licenseNumberMask = "0000000000";
      insertIndex = 0;
    } else if (+idType == 2) {
      identificationForm.get("copyOfCommercialNumberFile").setValidators(null);
      // identificationForm.get("transferCopyOfCRFile").setValidators(null);
      identificationForm.get("copyOfContractFile").setValidators(null);
      licenseNumberMask = "A{30}";
      insertIndex = 0;

      if (cnTypeCount > 0) {
        insertIndex = 1;
      }

      insertIndex = insertIndex + (+idTypeCount);

    } else if (+idType == 3) {
      identificationForm.get("copyOfLicenseFile").setValidators(null);
      identificationForm.get("copyOfCommercialNumberFile").setValidators(null);
      licenseNumberMask = "A{20}";
      insertIndex = control.value.length;
    }
    identificationForm.updateValueAndValidity();
    identificationForm.reset();
    identificationForm.patchValue({
      "identificationType": idType,
      "serialNo": idTypeCount + 1,
      "issueCountry": "SA",
      "issuedBy": (+idType == 1) ? 90702 : '',
      "licenseNumberMask": licenseNumberMask,
      "isMainActivity": isMainActivitySelected ? false : '',
      "validFrom": null, //(+idType == 1) ? this.dpuService.getConvertedDate(new Date(), this.calendarType) :null
      "uniqueID": (+idType == 1) ? "CR" + (idTypeCount + 1) : (+idType == 2) ? "LN" + (idTypeCount + 1) : "CN" + (idTypeCount + 1)
    });



    // this.markAllControlsAsPristine(identificationForm);
    control.insert(insertIndex, identificationForm);
    // control.value.forEach((element, i) => {
    //   this.markAllControlsAsPristine(<FormGroup>control.at(i));
    // });
    // this.markAllControlsAsPristine(<FormGroup>this.branchDetailsForm.get('activityDetails'));
    licenseTypeCount = this.getIdTypeCount(2);

    if (licenseTypeCount >= 4) {
      this.hideAddLicensesOption = true;
    } else {
      this.hideAddLicensesOption = false;
    }
    return identificationForm;
  }

  getIdTypeCount(idType) {
    const control = <FormArray>this.branchDetailsForm.get("activityDetails").get("identificationsList");
    if (!idType) {
      return control.value.length || 0;
    }

    let count = control.value.filter((idTypeObj) => {
      if (+idTypeObj.identificationType == +idType) {
        return true;
      }
    }).length;
    return count || 0;
  }
  addNewBranch() {

    this.branchFormDirective.resetForm();
    this.branchDetailsStepper.reset();
    jQuery("#addBranchDetailsModal").modal("show");
    this.branchDetailsForm = this.getBranchDetailsForm();
    //this.branchDetailsForm.reset();
    this.branchDetailsForm.patchValue({ "action": "add_branch" });
    this.branchDetailsForm.get("branchDetails").patchValue({ "branchNo": this.generateOutletNumber() });

    if (this.branchDetailsForm.get("branchDetails").get("branchNo").value != "00000" || this.ATYPE == '1') {
      this.branchDetailsForm.get("contactPersonDetails").clearValidators();
      this.branchDetailsForm.get("contactPersonDetails").setErrors(null);
      let ctrl = <FormGroup>this.branchDetailsForm.get("branchDetails");
      ctrl.get("companyMemorondum").clearValidators();
      ctrl.get("companyMemorondum").setErrors(null);
    } else {
      this.branchDetailsForm.get("contactPersonDetails").patchValue({
        "startDate": this.dpuService.getConvertedDate(new Date(), this.calendarType),
        "dateOfBirth": null
      });
      if (this.contractNumber) {
        this.branchDetailsForm.get("activityDetails").patchValue({ "contractTypeSelected": true });;
        let addedIdForm = this.onIdentificationTypeSelect();
        addedIdForm.patchValue({ "licenseNumber": this.contractNumber });
      }
      this.updateContactPersonFormValidators();
    }
    this.branchDetailsForm.updateValueAndValidity()
    this.branchDetailsForm.markAsPristine();
    this.crAddressesList = [];
    this.showCRAdressesList = false;
    this.mainStepperControl.selected.completed = false;
    this.mainStepperControl.selected.interacted = false;

    const actDetailsCtrl = this.branchDetailsForm.get("activityDetails");

    actDetailsCtrl.valueChanges.subscribe((formValue) => {
      this.validateIdentificationsList();
    });

  }
  deleteIdentificationType(index) {
    //console.log("deleteIdentificationType index", index);
    const control = <FormArray>this.branchDetailsForm.get("activityDetails").get("identificationsList");
    control.removeAt(index);

    //updating licenses serialno and add button visibiltiy
    let licenseTypeCount = control.value.filter((idTypeObj) => {
      return +idTypeObj.identificationType == 2;
    }).length;
    if (licenseTypeCount < 4) {
      this.hideAddLicensesOption = false;
      this.branchDetailsForm.get("activityDetails").get("licenseTypeSelected").setValue(licenseTypeCount ? true : false);
    }
    let counter = 0;
    control.value.forEach((idTypeObject, idTypeIndex) => {
      if (+idTypeObject.identificationType == 2) {
        counter += 1;
        control.at(idTypeIndex).patchValue({ "serialNo": counter });
      }
    });

  }
  onMainActivitySelect(selectedIndex) {
    const control = <FormArray>this.branchDetailsForm.get("activityDetails").get("identificationsList");
    if (control.at(selectedIndex).value.isMainActivity) {
      control.value.forEach((idtype, index) => {
        control.at(index).patchValue({ "isMainActivity": false });
      });
      control.at(selectedIndex).patchValue({ "isMainActivity": true });
    } else {
      control.at(selectedIndex).patchValue({ "isMainActivity": '' });
    }
  }
  getBranchDetailsForm() {
    let branchDetailsForm = this._formBuilder.group({
      action: [''],
      branchDetails: this._formBuilder.group({
        branchNo: [''],//actno
        branchName: ['', Validators.required],
        companyMemorondum: ['', Validators.required]
      }),
      activityDetails: this._formBuilder.group({
        identificationType: [''],
        crTypeSelected: [''],
        licenseTypeSelected: [''],
        contractTypeSelected: [''],
        // commercialNumbersList:this.fb.array([]),
        // licensesList:this.fb.array([]),
        // contractsList:this.fb.array([]),
        identificationsList: this._formBuilder.array([])
      }),
      addressDetails: this._formBuilder.group({
        country: ['', Validators.required],
        province: ['', Validators.required],
        city: ['', Validators.required],
        cityCode: [''],
        cityName: [''],
        district: ['', [Validators.required, Validators.maxLength(10)]],

        // streetName: ['', Validators.required],
        // buildingNumber: ['', Validators.required],
        // zipCode: ['', Validators.required],
        // additionalNumber: ['', Validators.required],
        // unitNumber: ['', Validators.required]

        streetName: ['', [Validators.required, Validators.maxLength(60)]],
        buildingNumber: ['', [Validators.required, Validators.maxLength(10)]],
        zipCode: ['', [Validators.maxLength(6), Validators.required]],
        additionalNumber: ['', [Validators.required, Validators.maxLength(10)]],
        unitNumber: ['', [Validators.required, Validators.maxLength(10)]]
      }),
      contactPersonDetails: this._formBuilder.group({
        // Validators.pattern("^[3][0-9]*$")
        tinNumber: ['', [Validators.minLength(10)]],
        idType: ['ZS0001', Validators.required],
        idNumber: ['', Validators.required],
        issueCountry: [''],
        dateOfBirth: ['', [Validators.required, CustomValidators.futureDateValidator()]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        startDate: ['', [Validators.required, CustomValidators.futureDateValidator()]],
        mobileCode: ['966', Validators.required],
        mobileNumber: ['', [Validators.minLength(9), Validators.required, CustomValidators.startsWithValidator("5")]],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email, CustomValidators.emailValidator('email')]],
        copyOfGMID: ['', Validators.required]
      }),
      stepCompleted: [false],
      isMCIData: [false],
      isMCIDataSaved: [false],
      isAllMCIDataReceived: [false]
    });
    // branchDetailsForm.reset(branchDetailsForm.value);
    // branchDetailsForm.markAsPristine();
    // branchDetailsForm.markAsUntouched();
    return branchDetailsForm;
  }

  getIdentificationForm() {
    let identificationForm = this._formBuilder.group({
      serialNo: [''],
      identificationType: ['', Validators.required],
      issueCountry: ['', Validators.required],
      issuedBy: ['', Validators.required],
      issuedCity: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      validFrom: ['', [Validators.required, CustomValidators.futureDateValidator()]],
      copyOfLicenseFile: ['', Validators.required],
      copyOfContractFile: ['', Validators.required],
      copyOfCommercialNumberFile: ['', Validators.required],
      transferCopyOfCRFile: [''],
      mainGroupActivity: ['', Validators.required],
      subGroupActivity: ['', Validators.required],
      mainActivity: ['', Validators.required],
      isMainActivity: ['', Validators.required],
      licenseNumberMask: [''],
      uniqueID: ['']
    });
    return identificationForm;
  }
  generateOutletNumber() {
    var l = this.BranchesList.length;
    if (l <= 9) {
      l = "0000" + l;
      return l;
    }
    if (l > 9 && l <= 99) {
      l = "000" + l;
      return l;
    }

  }


  //////////////////// Attachments Code Starts Here///////////////////////////////////////////////////

  @ViewChild(SignupAttachmentsComponent)
  private SignupAttachmentsComponent: SignupAttachmentsComponent;
  public brModalScrollPos: number = 0;
  public shModalScrollPos: number = 0;
  public attachmentsList: FormArray = this._formBuilder.array([]);
  public selectedAttachmentObj = {
    ReturnIdx: null,
    fileObject: null,
    Dotyp: null,
    action: null,
    idNumber: null,
    formControlObj: null,
    displayLabel: null,
    atttchedFilesCount: 0,
    OutletRef: null,
    FileExtn: null,
    uniqueDocTypeRef: null
  };
  getUniqueDocTypeRef(source = '', Dotyp, idType, idNumber: any = '') {

    //BR-000-RG01-CR1-123456
    //BR-000-RG02-LN1-123456
    //BR-000-RG02-LN2-123456
    //BR-000-RG08-CN1-123456
    //SH-001-RG09-ID1-1123456

    let uniqueDocTypeRef = "";
    if (source == 'BR') {
      uniqueDocTypeRef = source + "-" + this.branchDetailsForm.get("branchDetails").value.branchNo;
    }
    uniqueDocTypeRef = uniqueDocTypeRef + "-" + Dotyp + "-" + idType;
    if (idNumber) {
      uniqueDocTypeRef = uniqueDocTypeRef + "-" + idNumber;
    }

    //console.log("uniqueDocTypeRef", uniqueDocTypeRef);

    return uniqueDocTypeRef || "";

  }

  onClickFileControl(Dotyp, action = '', idNumber = '', control: any = null, displayLabel = '', idType = '') {
    this.brModalScrollPos = jQuery('#addBranchDetailsModal').scrollTop();
    jQuery('#addBranchDetailsModal').scrollTop(0);
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

    this.SignupAttachmentsComponent.setAttachmentObject(attachmentObj);
    this.showAttachments = true;

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

  onFileUploadSuccess(response) {
    //console.log("onFileUploadSuccess", response);
    for (var filename in response.value) {
      if (response.value[filename]["Dotyp"] === 'RG23') {
        if (!this.memoFileNamesList.includes(response.value[filename]["Filename"]))
          this.memoFileNamesList.push(response.value[filename]["Filename"]);
      } else if (response.value[filename]["Dotyp"] === 'RG01') {
        if (!this.crFileNamesList.includes(response.value[filename]["Filename"]))
          this.crFileNamesList.push(response.value[filename]["Filename"]);
      } else if (response.value[filename]["Dotyp"] === 'RG12') {
        if (!this.transFileNamesList.includes(response.value[filename]["Filename"]))
          this.transFileNamesList.push(response.value[filename]["Filename"]);
      } else if (response.value[filename]["Dotyp"] === 'RG02') {
        if (!this.licenseFileNamesList.includes(response.value[filename]["Filename"]))
          this.licenseFileNamesList.push(response.value[filename]["Filename"]);
      } else if (response.value[filename]["Dotyp"] === 'RG08') {
        if (!this.contractFileNamesList.includes(response.value[filename]["Filename"]))
          this.contractFileNamesList.push(response.value[filename]["Filename"]);
      } else if (response.value[filename]["Dotyp"] === 'RG11') {
        if (!this.copyGMIdFileNamesList.includes(response.value[filename]["Filename"]))
          this.copyGMIdFileNamesList.push(response.value[filename]["Filename"]);
      }
    }
  }
  onAttachmentsClose(response) {
    //console.log("onAttachmentsClose", response);
    this.showAttachments = false;
    setTimeout(() => {
      jQuery('#addBranchDetailsModal').scrollTop(this.brModalScrollPos);
    }, 10);
  }

  /***************************************************************************************** */

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
  prepareMCIBranchesList(MCI_CR_NUMBERS_LIST: any = []) {
    let MCI_CR_BRANCHES_LIST = [];

    MCI_CR_NUMBERS_LIST.forEach((crDetails) => {
      this.branchDetailsForm = this.getBranchDetailsForm();
      this.branchDetailsForm.patchValue({

        "isMCIData": true,
        "isMCIDataSaved": false,
        "isAllMCIDataReceived": crDetails.isAllMCIDataReceived,
        "branchDetails": {
          "branchNo": crDetails.Actno,
          "branchName": crDetails.Actnm,
        },
        "addressDetails": {
          "cityName": crDetails.City
        },
        "activityDetails": {
          "crTypeSelected": true
        }
      });
      const addedIdForm = this.onIdentificationTypeSelect();


      addedIdForm.get("issueCountry").enable();
      addedIdForm.get("issuedBy").enable();
      addedIdForm.get("issuedCity").enable();
      addedIdForm.get("licenseNumber").enable();
      addedIdForm.get("validFrom").enable();
      addedIdForm.get("mainGroupActivity").enable();
      addedIdForm.get("subGroupActivity").enable();
      addedIdForm.get("mainActivity").enable();

      addedIdForm.patchValue({
        "isMainActivity": true,
        "mainGroupActivity": crDetails.ActMgrp || "",
        "subGroupActivity": crDetails.ActSgrp || "",
        "mainActivity": crDetails.Activity || "",
        "licenseNumber": crDetails.Idnumber || "",
        "issueCountry": crDetails.Country || "SA",
        "issuedCity": crDetails.CityCode || "",
        "issuedBy": +crDetails.Institute || "",
        "validFrom": this.dpuService.getCalendarFormatDateFromAPIDate(crDetails.ValidDateFrom, "Islamic")

      });
      //console.log("branchDetailsForm", this.branchDetailsForm.value);
      //this.branchDetailsForm.get("branchDetails").get("branchName").patchValue(response["d"]["Crname"]);
      // identification.patchValue({ "issueCountry": 'SA' })

      // identification.patchValue({ "issuedCity": response["d"]["CityAry"] });
      // if (response["d"]["Issuedt"]) {
      //   let issueDt = +response["d"]["Issuedt"].substring(
      //     6,
      //     response["d"]["Issuedt"].length - 2
      //   );
      //   identification.patchValue({ "validFrom": this.dpuService.getCalendarFormatDateFromAPIDate(response["d"]["Issuedt"], this.calendarType) })
      // }

      MCI_CR_BRANCHES_LIST.push(this.branchDetailsForm.value);
      this.dpuService.datepickerChanged("Islamic");
    });


    return MCI_CR_BRANCHES_LIST;
  }



}
