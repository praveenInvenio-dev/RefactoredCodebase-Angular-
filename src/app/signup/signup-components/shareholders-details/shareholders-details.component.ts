import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatVerticalStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import * as moment from 'moment-hijri';
import { AppService } from 'src/app/app.service';
import { ContactSet } from 'src/app/dto/establishment/contact-set';
import { SignupService } from 'src/app/services/signup.service';
import { DatepickerUtilitiesService } from 'src/app/shared/services/datepicker-utilities.service';
import * as _ from 'underscore';
import { sholderConstants } from './shareholders-details.constants';
import { CustomValidators } from '../../../shared/custom-validators';
import { Shareholder } from 'src/app/dto/shareholder';
import { CpersonSet } from 'src/app/dto/establishment/cperson-set';
import { AddressSet } from 'src/app/dto/establishment/address-set';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import { SignupComponentsService } from '../signup-components.service';
import { SignupAttachmentsComponent } from '../signup-attachments/signup-attachments.component';

declare var jQuery: any;

@Component({
  selector: 'shareholders-details',
  templateUrl: './shareholders-details.component.html',
  styleUrls: ['./shareholders-details.component.css']
})
export class ShareholdersDetailsComponent implements OnInit {
  @Input() mainStepperControl: any;
  registrationObj: any = null;
  consortiumForm: any;
  companyNameMask: string;
  contractNumberMask: string;
  mobileNumberMask: string;
  businessCommencementDate: number = 0;
  BranchesList: any;
  public countiesList: any = [];
  public statesList: any = [];
  public citiesList: any = [];
  phoneCodes: any;
  issueByList: { key: number; text: string; }[];
  shModalScrollPos: any;
  @Input() set regSet(registrationObj: any) {
    this.registrationObj = registrationObj;
  }
  @Input() set commDate(commencementDate: number) {
    console.log("commDate updated", commencementDate);
    this.businessCommencementDate = commencementDate;
  }
  @Input() Taxtpdetermination: string;
  /*****************Shareholder Details Properties*******************************/

  @ViewChild('shDisplayTable', { read: MatSort, static: false }) shSort: MatSort;
  @ViewChild('shareholderStepper') shareholderStepper: MatVerticalStepper;
  @ViewChild('sholderFormDirective') sholderFormDirective;
  @ViewChild(SignupAttachmentsComponent)
  private SignupAttachmentsComponent: SignupAttachmentsComponent;

  branchDisplayColumns2 = ["sholderName", "idType", "idNumber", "shareCapital", "shareProfit", 'update', 'delete'];
  sholdersListdataSource: MatTableDataSource<any>;
  shareHolderDetailsForm: FormGroup;
  sharePercentageTypes: any = [];
  public shareHoldersList: any = [];
  public shIdTypesList: any = [];
  public shareHolderTypesList = [];
  lang: any = {};
  direction: string = "ltr";
  selectedLanguage = "en";
  /*****************************************************************************/
  headerComponent = CalendarComponent;
  errorMsgsList: any = [];
  calendarType: string = "Gregorian";

  @Output() onShareholderSaveSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onShareholderSaveEror: EventEmitter<any> = new EventEmitter<any>();
  attachmentsList: FormArray;
  constructor(private _dateAdapter: DateAdapter<JDNConvertibleCalendar>, private _formBuilder: FormBuilder, private appSrv: AppService, private signupService: SignupService, public notifierService: NotifierService, private router: Router, private dpuService: DatepickerUtilitiesService, private signupComponentsService: SignupComponentsService) { }

  ngOnInit(): void {

    if (localStorage.getItem("lang") === "ar") {
      this.lang = sholderConstants.langz.arb.shareholder;
      this.direction = sholderConstants.langz.arb.dir;
      this.selectedLanguage = "ar";
    } else {
      this.lang = sholderConstants.langz.eng.shareholder;
      this.direction = sholderConstants.langz.eng.dir;
    }
    moment.locale('en-US');
    this.sharePercentageTypes = this.lang.sharePercentageTypes;
    this.mobileNumberMask = "0{15}";
    this.contractNumberMask = "A{20}";
    //this.licenseNumberMask = "A{15}";
    this.companyNameMask = "A{80}";
    this.consortiumForm = this.getConsortiumForm();
    this.shareHolderDetailsForm = this.getShareHolderDetailsForm();


    this.dpuService.datepickerEvents.subscribe((calendarType) => {
      console.log("Branch Catach Evevnt");
      this.calendarType = calendarType;
      //get all datepcikers and update date
      let fields = ["shareCapitalStartDate", "shareProfitStartDate", "startDate", "dateOfBirth"];
      this.signupComponentsService.updateCalendarType(this.shareHolderDetailsForm, fields, calendarType);
    });

    this.getAddressLookups();
    this.getPhoneCodes();
    this.getIssueByList(this.selectedLanguage);
    this.getShIdeTypesList(this.selectedLanguage);
    this.getShareHolderTypesList(this.selectedLanguage);


    jQuery("#shErrorMsgsModal").on('hidden.bs.modal', function (e) {
      console.log("modal hidden errorMsgsModal")

      if (jQuery('.modal:visible').length) {
        jQuery('body').addClass('modal-open');
      }
    });

    jQuery("#tinInYourCountryInfoModal").on('hidden.bs.modal', function (e) {
      console.log("modal hidden tinInYourCountryInfoModal")
      jQuery('body').addClass('modal-open');
    });
    this.attachmentsList = this._formBuilder.array([]);
    if (this.Taxtpdetermination == '1' || this.Taxtpdetermination == '2' || this.Taxtpdetermination == '3') {
      this.shareHolderDetailsForm.get('shareHolderPercentageDetails.tinNumber').setErrors(null);
      this.shareHolderDetailsForm.get('shareHolderPercentageDetails.tinNumber').clearValidators();
      this.shareHolderDetailsForm.get('shareHolderPercentageDetails.tinNumber').updateValueAndValidity();
    }
  }
  ngAfterViewInit() {
    this.sholdersListdataSource = new MatTableDataSource(<any>[]);
    this.sholdersListdataSource.sort = this.shSort;
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
      console.log("this.citiesList", this.citiesList);
    });
  }

  // getGroupActivityLookup() {
  //   this.signupService.getGroupActivity().subscribe((res) => {
  //     console.log("Group Activity :: ", res);
  //     this.mainGroupActivityList = res["d"]["act_groupSet"]["results"];
  //     this.subGroupActivityList = res["d"]["act_subgroupSet"]["results"];
  //     this.mainActivityList = res["d"]["activitySet"]["results"];
  //   });
  // }


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

  // getBranchesList() {
  //   this.signupService.getBranches().subscribe((res: any) => {
  //     console.log("branches", res);
  //     this.reportingBranchesList = res.d.results || [];;
  //   });
  // }

  getIssueByList(lang) {
    this.issueByList = this.signupService.getIssueByList(lang);
  }



  getConsortiumForm() {
    let consortiumForm = this._formBuilder.group({
      orgInfo: this._formBuilder.group({
        tinNumber: ['', [Validators.minLength(10)]],
        companyID: ['', [Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]],
        companyName: ['', [Validators.required, CustomValidators.containsOnlyNumbers(), CustomValidators.specialCharctersValidator()]],
        contractNumber: ['', Validators.required],
        reportingBranch: ['111'],
        otpVerified: ['', Validators.required]
      }),
      contactInfo: this._formBuilder.group({
        mobileNumber: ['', [Validators.required, Validators.maxLength(14), CustomValidators.startsWithZeroValidator()]], //, startsWithValidator("5")
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

  //////////////////// Attachments Code Starts Here///////////////////////////////////////////////////

  getUniqueDocTypeRef(source = '', Dotyp, idType, idNumber: any = '') {

    //BR-000-RG01-CR1-123456
    //BR-000-RG02-LN1-123456
    //BR-000-RG02-LN2-123456
    //BR-000-RG08-CN1-123456
    //SH-001-RG09-ID1-1123456

    let uniqueDocTypeRef = "";
    if (source == 'SH') {
      uniqueDocTypeRef = source + "-" + this.shareHolderDetailsForm.get("shareHolderDetails").value.shNo;
    }
    uniqueDocTypeRef = uniqueDocTypeRef + "-" + Dotyp + "-" + idType;
    if (idNumber) {
      uniqueDocTypeRef = uniqueDocTypeRef + "-" + idNumber;
    }

    console.log("uniqueDocTypeRef", uniqueDocTypeRef);

    return uniqueDocTypeRef || "";

  }
  public showAttachments: boolean = false;
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
      OutletRef: this.getOutletRefForFileUpload(action, idNumber),
      FileExtn: null,
      uniqueDocTypeRef: uniqueDocTypeRef,
    };
    this.showAttachments = true;
    this.SignupAttachmentsComponent.setAttachmentObject(attachmentObj);
    this.SignupAttachmentsComponent.show();

    //  jQuery("#attachmentsModal").modal('show');
  }
  getOutletRefForFileUpload(source, idNumber = '') {
    //'001-7000013420'
    let OutletRef = "";
    if (source == "SH") {
      OutletRef = this.shareHolderDetailsForm.get("shareHolderDetails").value.shNo + "-" + (this.shareHolderDetailsForm.get("shareHolderPercentageDetails").value.idNumber || "");
    }
    return OutletRef;
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
  ///////////////////////////////////////////////////////////////////////////////////////////////  


  getShIdeTypesList(lang) {
    this.shIdTypesList = this.signupService.getShIdeTypesList(lang);
  }

  getShareHolderTypesList(lang) {
    if (this.Taxtpdetermination == '1' || this.Taxtpdetermination == '2' || this.Taxtpdetermination == '3') {
      this.shareHolderTypesList = this.signupService.getShareHolderTypesListForCompany(lang);
    } else {
      this.shareHolderTypesList = this.signupService.getShareHolderTypesList(lang);
    }
  }

  getIdTypeName(idType) {
    let obj = this.shIdTypesList.filter((shIdTypeObj) => {
      return shIdTypeObj.Key == idType;
    });
    return (obj.length > 0) ? obj[0].Text : "";
  }

  searchShareholdersList(searchString) {

    this.sholdersListdataSource.filter = searchString.trim().toLocaleLowerCase();

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
    //this.sholdersListdataSource = new MatTableDataSource(<any>this.shareHoldersList);
    this.updateShareholdersListDataSource(this.shareHoldersList);
  }
  updateShareholdersListDataSource(shareHoldersList: any = []) {
    let sholdersListdataSource = [];

    shareHoldersList.forEach((sholder) => {
      let sholderObj = { "sholderName": "", "idType": "", "idNumber": "", "shareCapital": "", "shareProfit": "", "sholderFormData": null };
      sholderObj.sholderName = sholder.shareHolderPercentageDetails.companyName ? sholder.shareHolderPercentageDetails.companyName :
        (sholder.shareHolderPercentageDetails.firstName || '') + ' ' + (sholder.shareHolderPercentageDetails.lastName || '')
      let mainLicense = [];
      sholderObj.idType = this.getIdTypeName(sholder.shareHolderPercentageDetails.idType) || "";
      sholderObj.idNumber = sholder.shareHolderPercentageDetails.idNumber || "";
      sholderObj.shareCapital = sholder.shareHolderDetails.shareCapital || "";
      sholderObj.shareProfit = sholder.shareHolderDetails.shareProfit || "";
      sholderObj.sholderFormData = sholder;
      sholdersListdataSource.push(sholderObj);
      sholderObj = null;
    });
    this.sholdersListdataSource = new MatTableDataSource(<any>sholdersListdataSource);
    this.sholdersListdataSource.sort = this.shSort;
  }
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
        shareCapital: ['', [Validators.required, CustomValidators.percentageValidator()]],
        shareCapitalStartDate: ['', [Validators.required, CustomValidators.futureDateValidator()]],
        shareProfit: ['', [Validators.required, CustomValidators.percentageValidator()]],
        shareProfitStartDate: ['', [Validators.required, CustomValidators.futureDateValidator()]]
      }),
      shareHolderPercentageDetails: this._formBuilder.group({
        shareHolderType: [this.getShareholderType(), Validators.required],
        tinNumber: ['', Validators.required],
        idType: ['ZS0001', Validators.required],
        idNumber: ['', Validators.required],
        issueCountry: ['', Validators.required],
        companyName: ['', Validators.required],
        startDate: ['', [Validators.required, CustomValidators.futureDateValidator()]],
        typeOfSharePercentage: ['', Validators.required],
        saudiGccShare: ['', [Validators.required, CustomValidators.percentageValidator()]],
        foreignShare: ['', [Validators.required, CustomValidators.percentageValidator()]],
        dateOfBirth: ['', [Validators.required, CustomValidators.futureDateValidator()]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        mobileCode: ['966'],
        mobileNumber: [''],
        email: [''],
        Shrbvalue: [''],
        Shleapplicable: [''],
        copyOfFile: ['', Validators.required]
      }),
      addressDetails: this._formBuilder.group({
        // country: ['', Validators.required],
        // province: ['', Validators.required],
        // city: ['', Validators.required],
        // district: ['', Validators.required],
        // streetName: ['', Validators.required],
        // buildingNumber: ['', Validators.required],
        // zipCode: ['', Validators.required],
        // additionalNumber: ['', Validators.required],
        // unitNumber: ['', Validators.required]
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
        mobileNumber: ['', [Validators.minLength(14), Validators.required]],
        email: ['', Validators.required]
      })
    });
    // shareHolderDetailsForm.reset(shareHolderDetailsForm.value);
    // shareHolderDetailsForm.markAsPristine();
    // shareHolderDetailsForm.markAsUntouched();
    return shareHolderDetailsForm;
  }
  getFileLabel() {
    const idTypeValue = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("idType").value;
    // console.log("idType", idTypeValue)
    let selectedIdType = this.shIdTypesList.filter((idType) => {
      //console.log(idTypeValue, idType);
      if (idType.Key == idTypeValue) {
        return true;
      }
    });
    //console.log("selectedIdType", selectedIdType);
    if (selectedIdType.length > 0) {
      if (idTypeValue == 'ZS0001') {
        return this.lang.err.copyOfNationalID;
      } else if (idTypeValue == 'ZS0002') {
        return this.lang.err.copyOfIquamaID;
      } else if (idTypeValue == 'ZS0003') {
        return this.lang.err.copyOfGCCID;
      } else if (idTypeValue == 'ZS0005') {
        return this.lang.err.copyOfCompanyID;
      } else if (idTypeValue == 'FS0002') {
        return this.lang.err.copyOfPassport;
      } else {
        return this.lang.err.copyOfText + selectedIdType[0].Text;
      }
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

    shareHolder.Shcapstartdt = this.dpuService.getAPIFormatDate(
      shareholderObj.shareHolderDetails.shareCapitalStartDate
    );
    shareHolder.Shcapenddt = "/Date(253402251010000)/";
    shareHolder.Shprof = shareholderObj.shareHolderDetails.shareProfit || "0";
    shareHolder.Shprofstartdt = this.dpuService.getAPIFormatDate(
      shareholderObj.shareHolderDetails.shareProfitStartDate
    );
    shareHolder.Shprofenddt = "/Date(253402251010000)/";
    shareHolder.Shgccattfg = false;

    let idType = shareholderObj.shareHolderPercentageDetails.idType;
    if (idType == 'ZS0001' || idType == 'ZS0002' || idType == 'ZS0003' || idType == 'FS0002') {
      //if (this.Taxtpdetermination == '1' || this.Taxtpdetermination == '2' || this.Taxtpdetermination == '3' || this.Taxtpdetermination == '5') {
      shareHolder.Shnm1 = shareholderObj.shareHolderPercentageDetails.firstName || "";
      shareHolder.Shnm2 = shareholderObj.shareHolderPercentageDetails.lastName || "";
      shareHolder.Shbirthdt = this.dpuService.getAPIFormatDate(
        shareholderObj.shareHolderPercentageDetails.dateOfBirth
      );
    } else {
      shareHolder.Shnm1 = shareholderObj.shareHolderPercentageDetails.companyName || "";
    }

    // shareHolder.Shnm1 = shareholderObj.shareHolderPercentageDetails.companyName || "";
    shareHolder.Shno = shareholderObj.shareHolderDetails.shNo || "";
    shareHolder.Shreltp = this.Taxtpdetermination == '5' ? "ZMC001" : 'BURC01';
    shareHolder.Shstartdt =  shareholderObj.shareHolderPercentageDetails.startDate ? this.dpuService.getAPIFormatDate(shareholderObj.shareHolderPercentageDetails.startDate) : null;
      
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
      console.log(Shrbvalue, Shleapplicable);
    }
    shareHolder.Shletype = shareholderObj.shareHolderPercentageDetails.typeOfSharePercentage || "";
    shareHolder.Shsagccshare = shareholderObj.shareHolderPercentageDetails.saudiGccShare || "0";
    shareHolder.Shforeignshare = shareholderObj.shareHolderPercentageDetails.foreignShare || "0";
    shareHolder.Shrbvalue = Shrbvalue || "";
    shareHolder.Shleapplicable = Shleapplicable || "";

    Nreg_ShareholderSet.push(shareHolder);
    return Nreg_ShareholderSet;
  }

  resetShareholderPercentageDetailsForm(source = '') {
    const shareHolderPercentageDetailsForm = <FormGroup>this.shareHolderDetailsForm.get("shareHolderPercentageDetails");
    let data = shareHolderPercentageDetailsForm.value;
    let commdate = new Date(this.businessCommencementDate);
    shareHolderPercentageDetailsForm.patchValue({
      shareHolderType: data.shareHolderType ? data.shareHolderType : this.getShareholderType(),
      issueCountry: data.idType == 'FS0002' ? data.issueCountry : null,
      startDate: this.dpuService.getConvertedDate(commdate, this.calendarType),
      // typeOfSharePercentage: '',
      // saudiGccShare: '',
      // foreignShare: '',
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
    //dateOfBirth: source == 'dob' ? data.dateOfBirth : null,
    if (source != 'dob') {
      shareHolderPercentageDetailsForm.get("dateOfBirth").reset();
    }

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
    if (tinControl.invalid || !tinControl.value) {
      return true;
    }

    this.getTaxPayerDetails();
  }
  public shTinDetails: any = {};
  getTaxPayerDetails() {
    this.shTinDetails = {};
    let sholderForm = this.shareHolderDetailsForm.get("shareHolderPercentageDetails");
    let shareHolderDetails = this.shareHolderDetailsForm.value.shareHolderPercentageDetails;
    let cpdob = "";
    if (shareHolderDetails.dateOfBirth) {
      let d = shareHolderDetails.dateOfBirth["calendarStart"];
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

    if (sholderForm.get("tinNumber").valid && sholderForm.get("tinNumber").value) {
      shareHolderDetails.idType = "";
      shareHolderDetails.idNumber = "";
      shareHolderDetails.issueCountry = "";
    } else if (sholderForm.get("idType").value == 'ZS0001' || sholderForm.get("idType").value == 'ZS0002') {
      //national id iqama id
      if (!sholderForm.get("dateOfBirth").value || !sholderForm.get("dateOfBirth").valid) {
        return true;
      }
    } else if (sholderForm.get("idType").value == 'ZS0003' || sholderForm.get("idType").value == 'FS0002' || sholderForm.get("idType").value == 'ZS0011' || sholderForm.get("idType").value == 'ZS0012') {
      //gcc - passport - tin in your country-  gcc company id 
      // 
      return true;
    } else if (sholderForm.get("idType").value == 'ZS0005') {
      //company id
      if (!sholderForm.get("idNumber").value) {
        return true;
      }
    }

    this.signupService.getTaxPayerDetails(shareHolderDetails.tinNumber || '',
      shareHolderDetails.idType || '',
      shareHolderDetails.idNumber || '',
      shareHolderDetails.issueCountry || '',
      '',
      cpdob || '').subscribe((response: any) => {
        console.log("tinNumber details", response);
        this.shTinDetails = response["d"] || {};
        // if (this.shTinDetails.Bpkind == '06A' || this.shTinDetails.Bpkind == '00' || true) {

        let dob = null;
        if (this.shTinDetails.Birthdt) {
          let issueDt = +this.shTinDetails.Birthdt.substring(
            6,
            this.shTinDetails.Birthdt.length - 2
          );
          dob = this.dpuService.getCalendarFormatDateFromAPIDate(this.shTinDetails.Birthdt, this.calendarType)
        }

        const control = this.shareHolderDetailsForm.get("shareHolderPercentageDetails");
        control.patchValue({
          "tinNumber": this.shTinDetails.Tin,
          "idType": this.shTinDetails.Idtype,
          "idNumber": this.shTinDetails.Idnum,
          "issueCountry": this.shTinDetails.Idtype == 'FS0002' ? this.shTinDetails.IdIssueingCountry : this.shTinDetails.Country,
          "dateOfBirth": dob,
          "companyName": this.shTinDetails.FullName,
          "firstName": this.shTinDetails.Name1,
          "lastName": this.shTinDetails.Name2,
          "mobileNumber": this.shTinDetails.Mobile,
          "email": this.shTinDetails.Email,
          "saudiGccShare": "0.0000",
          "foreignShare": "0.0000",
          // "Shrbvalue": Shrbvalue,
          // "Shleapplicable": Shleapplicable
        });

        this.shTinDetails.Name1 ? control.get("firstName").disable() : "";
        this.shTinDetails.Name2 ? control.get("lastName").disable() : "";

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


        //this.updateSaudiAndForeignShare();

        if (this.shTinDetails.Idtype == 'ZS0011') {
          jQuery("#tinInYourCountryInfoModal").modal("show");
        }

        this.getTypeOfSharePercentageDetails(this.shTinDetails.Bpkind, this.shTinDetails.Idtype);

      }, (error) => {
        // this.updateSaudiAndForeignShare();

        this.getTypeOfSharePercentageDetails(this.shTinDetails.Bpkind || "", shareHolderDetails.idType);
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
          jQuery("#shErrorMsgsModal").modal('show');
        } else {
          this.notifierService.notify(
            "error",
            error.error.error.innererror.errordetails[0].message
          );
        }



        // let errorsList = error.error.error.innererror.errordetails || [];
        // errorsList.forEach((errorObj) => {
        //   //code: "/IWBEP/CX_MGW_BUSI_EXCEPTION"
        //   if (errorObj.code != "/IWBEP/CX_MGW_BUSI_EXCEPTION") {
        //     this.notifierService.notify(
        //       "error",
        //       errorObj.message
        //     );
        //   }
        // });


      });
  }

  onShareholderIdTypeChange() {
    console.log("onShareholderIdTypeChange");
    const tinControl = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("tinNumber");
    const idTypeControl = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("idType");
    const idNumberControl = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("idNumber");
    if (idTypeControl.value == 'ZS0011') {
      jQuery("#tinInYourCountryInfoModal").modal("show");
    }
    tinControl.reset();
    idNumberControl.reset();
    this.resetShareholderPercentageDetailsForm();
    // this.updateSaudiAndForeignShare();
    this.updateShareholderPercentageDetailsValidators();
    this.getTypeOfSharePercentageDetails("", idTypeControl.value);
    if (idTypeControl.invalid) {
      return true;
    }
    this.getTaxPayerDetails();
  }
  onShareholderIdNumberChange(source = '') {
    console.log("onShareholderIdNumberChange");
    const tinControl = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("tinNumber");
    const idNumberControl = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").get("idNumber");
    this.resetShareholderPercentageDetailsForm(source);
    //this.updateSaudiAndForeignShare();
    this.updateShareholderPercentageDetailsValidators();

    tinControl.reset();

    if (idNumberControl.invalid) {
      console.log("invalid idnumberrrrr")
      return true;
    }
    console.log("validdd idnumberrrrr");
    this.getTaxPayerDetails();
  }
  typeOfSharePercentageData: any = {};
  getTypeOfSharePercentageDetails(Bpkind: string = "", Idtype: string = "") {
    let Shrbvalue = "";
    let Shleapplicable = "";
    let saudiGccShare = "";
    let foreignShare = "";
    let typeOfSharePercentage = "";
    const shareHolderPercentageDetailsForm = this.shareHolderDetailsForm.get("shareHolderPercentageDetails");
    shareHolderPercentageDetailsForm.patchValue({
      saudiGccShare: saudiGccShare,
      foreignShare: foreignShare,
      Shrbvalue: Shrbvalue,
      Shleapplicable: Shleapplicable,
      typeOfSharePercentage: typeOfSharePercentage
    });

    if (Idtype == 'ZS0001'
      || Idtype == 'ZS0002'
      || Idtype == 'ZS0003'
      || Idtype == 'FS0002') {
      this.updateShareholderPercentageDetailsValidators();
      return true;
    }
    this.typeOfSharePercentageData = {};
    this.signupService.getTypeOfSharePercentageDetails(Bpkind, Idtype).subscribe((response) => {

      this.typeOfSharePercentageData = response["d"] || {};
      shareHolderPercentageDetailsForm.patchValue({
        "typeOfSharePercentage": this.typeOfSharePercentageData.ShType || "",
        "Shleapplicable": this.typeOfSharePercentageData.ShareApplic || ""
      });

      Shleapplicable = this.typeOfSharePercentageData.ShareApplic || "";
      typeOfSharePercentage = this.typeOfSharePercentageData.ShType || "";

      if (typeOfSharePercentage == "RS") {
        Shrbvalue = "01";
        // Shleapplicable = "S";
      } else if (typeOfSharePercentage == "RF") {
        Shrbvalue = "02";
        // Shleapplicable = "F";
      } else if (typeOfSharePercentage == "RM") {
        Shrbvalue = "03";
        // Shleapplicable = "M";
      } else if (typeOfSharePercentage == "RG") {
        Shrbvalue = "04";
        // Shleapplicable = "M";
      } else if (typeOfSharePercentage == "RO") {
        Shrbvalue = "05";
        // Shleapplicable = "M";
      } else {
        Shrbvalue = "";
        Shleapplicable = "";
      }

      if (Shleapplicable == 'S') {
        //put saudi share = 100 and Foreign share = 0 and disable the fields
        saudiGccShare = "100.0000";
        foreignShare = "0.0000";
      } else if (Shleapplicable == 'F') {
        //put saudi share = 0 and Foreign share = 100 and disable the fields
        saudiGccShare = "0.0000";
        foreignShare = "100.0000";
      } else if (Shleapplicable == 'M') {
        //enable the saudi share and Foreign share.
        saudiGccShare = "";
        foreignShare = "";
      }

      console.log(Shrbvalue, Shleapplicable, saudiGccShare, foreignShare);
      shareHolderPercentageDetailsForm.patchValue({
        saudiGccShare: saudiGccShare,
        foreignShare: foreignShare,
        Shrbvalue: Shrbvalue,
        Shleapplicable: Shleapplicable,
        typeOfSharePercentage: typeOfSharePercentage
      });
      this.updateShareholderPercentageDetailsValidators();
    }, (error) => {
      this.updateShareholderPercentageDetailsValidators();
    });
  }

  updateSaudiAndForeignShare(saudiGccShare = "", foreignShare = "", typeOfSharePercentage = "") {

    const shareHolderPercentageDetailsForm = this.shareHolderDetailsForm.get("shareHolderPercentageDetails");
    let idType = shareHolderPercentageDetailsForm.get("idType").value;

    //tin in your country
    if (idType == "ZS0011") {
      shareHolderPercentageDetailsForm.patchValue({
        saudiGccShare: "0.0000",
        foreignShare: "100.0000",
        typeOfSharePercentage: "RO"
      });
    } else if (idType == "ZS0012") {
      //gcc compnay id
      shareHolderPercentageDetailsForm.patchValue({
        saudiGccShare: saudiGccShare || "",
        foreignShare: foreignShare || "",
        typeOfSharePercentage: "RG"
      });
    } else if (idType == "ZS0005") {
      //company ID
      shareHolderPercentageDetailsForm.patchValue({
        saudiGccShare: saudiGccShare || "",
        foreignShare: foreignShare || "",
        typeOfSharePercentage: typeOfSharePercentage || ""
      });
    }

    this.updateTypeOfsharePercentageDetails();
    this.updateShareholderPercentageDetailsValidators();
    // this.shareHolderDetailsForm.updateValueAndValidity();
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
      console.log(Shrbvalue, Shleapplicable);
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


    console.log(this.shareHolderDetailsForm.get("shareHolderPercentageDetails").value);
  }
  public cpIdNumberMask = "0*";
  updateShareholderPercentageDetailsValidators() {
    let shareHolderPercentageDetails = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").value;
    const shareHolderPercentageDetailsForm = <FormGroup>this.shareHolderDetailsForm.get("shareHolderPercentageDetails");
    //default validators setting
    // shareHolderPercentageDetailsForm.enable();

    // shareHolderPercentageDetailsForm.get("saudiGccShare").enable();
    // shareHolderPercentageDetailsForm.get("foreignShare").enable();
    // shareHolderPercentageDetailsForm.get("typeOfSharePercentage").enable();

    shareHolderPercentageDetailsForm.get("firstName").enable();
    shareHolderPercentageDetailsForm.get("lastName").enable();
    shareHolderPercentageDetailsForm.get("mobileNumber").enable();
    shareHolderPercentageDetailsForm.get("email").enable();
    shareHolderPercentageDetailsForm.get("dateOfBirth").enable();
    shareHolderPercentageDetailsForm.get("issueCountry").enable();
    shareHolderPercentageDetailsForm.get("companyName").enable();



    (this.Taxtpdetermination == '1' || this.Taxtpdetermination == '2' || this.Taxtpdetermination == '3') ? shareHolderPercentageDetailsForm.get("tinNumber").setValidators([Validators.minLength(10)]) :
      shareHolderPercentageDetailsForm.get("tinNumber").setValidators([Validators.required, Validators.minLength(10)]);

    shareHolderPercentageDetailsForm.get("idType").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("idNumber").setValidators(Validators.required);
    //    shareHolderPercentageDetailsForm.get("issueCountry").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("issueCountry").clearValidators();
    shareHolderPercentageDetailsForm.get("companyName").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("dateOfBirth").setValidators([Validators.required, CustomValidators.futureDateValidator()]);
    shareHolderPercentageDetailsForm.get("firstName").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("lastName").setValidators(Validators.required);
    shareHolderPercentageDetailsForm.get("startDate").setValidators([Validators.required, CustomValidators.futureDateValidator()]);
    //shareHolderPercentageDetailsForm.get("mobileNumber").setValidators(Validators.required);
    //shareHolderPercentageDetailsForm.get("email").setValidators([Validators.required, Validators.email]);
    shareHolderPercentageDetailsForm.get("copyOfFile").setValidators(Validators.required);



    const commcontrol = this.shareHolderDetailsForm.get("communicationDetails");
    commcontrol.get("mobileNumber").setValidators([Validators.minLength(14), Validators.required]);
    commcontrol.get("email").setValidators([Validators.required, Validators.email]);
    commcontrol.enable();

    if (shareHolderPercentageDetailsForm.get("tinNumber").value && shareHolderPercentageDetailsForm.get("tinNumber").valid) {
      console.log("TIN valid")
      //if TIN number valid, the below controls should be  auto populated and disabled irrespective of data or no data from tin details
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

    }

    if (shareHolderPercentageDetails.idType == 'ZS0001') {
      console.log("NATIONAL ID");
      //NATIONAL ID
      this.cpIdNumberMask = "0000000000";
      shareHolderPercentageDetailsForm.get("idNumber").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[1][0-9]*$")]);
      shareHolderPercentageDetailsForm.get("companyName").clearValidators();

      shareHolderPercentageDetailsForm.get("firstName").disable();
      shareHolderPercentageDetailsForm.get("lastName").disable();
      shareHolderPercentageDetailsForm.get("firstName").clearValidators();
      shareHolderPercentageDetailsForm.get("lastName").clearValidators();

    } else if (shareHolderPercentageDetails.idType == 'ZS0002') {
      console.log("Iqama ID");
      //Iqama ID ID
      this.cpIdNumberMask = "0000000000";
      shareHolderPercentageDetailsForm.get("idNumber").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[2][0-9]*$")]);
      shareHolderPercentageDetailsForm.get("companyName").clearValidators();

      shareHolderPercentageDetailsForm.get("firstName").disable();
      shareHolderPercentageDetailsForm.get("lastName").disable();
      shareHolderPercentageDetailsForm.get("firstName").clearValidators();
      shareHolderPercentageDetailsForm.get("lastName").clearValidators();
    } else if (shareHolderPercentageDetails.idType == 'ZS0003') {
      console.log("GCC ID");
      //GCC ID ID
      this.cpIdNumberMask = "0{15}";
      shareHolderPercentageDetailsForm.get("idNumber").setValidators([Validators.required, Validators.minLength(7), Validators.maxLength(15), Validators.pattern("^[0-9]*$")]);
      shareHolderPercentageDetailsForm.get("companyName").clearValidators();

    }
    else if (shareHolderPercentageDetails.idType == 'FS0002') {
      console.log("Passport ID");
      //Passport ID
      this.cpIdNumberMask = "A{20}";
      shareHolderPercentageDetailsForm.get("idNumber").setValidators([Validators.required, Validators.maxLength(20)]);
      shareHolderPercentageDetailsForm.get("companyName").clearValidators();
      shareHolderPercentageDetailsForm.get("issueCountry").setValidators(Validators.required);
    } else if (shareHolderPercentageDetails.idType == 'ZS0005') {
      //company ID
      this.cpIdNumberMask = "0000000000";
      shareHolderPercentageDetailsForm.get("idNumber").setValidators([Validators.required, Validators.minLength(10), Validators.pattern("^[7][0-9]*$")]);
      shareHolderPercentageDetailsForm.get("firstName").disable();
      shareHolderPercentageDetailsForm.get("lastName").disable();
      shareHolderPercentageDetailsForm.get("dateOfBirth").disable();
      shareHolderPercentageDetailsForm.get("firstName").clearValidators();
      shareHolderPercentageDetailsForm.get("lastName").clearValidators();
      shareHolderPercentageDetailsForm.get("dateOfBirth").clearValidators();
    }
    else if (shareHolderPercentageDetails.idType == 'ZS0012') {
      //gcc company ID
      this.cpIdNumberMask = "0{10}";
      shareHolderPercentageDetailsForm.get("idNumber").setValidators([Validators.required]);
      shareHolderPercentageDetailsForm.get("firstName").disable();
      shareHolderPercentageDetailsForm.get("lastName").disable();
      shareHolderPercentageDetailsForm.get("dateOfBirth").disable();
      shareHolderPercentageDetailsForm.get("firstName").clearValidators();
      shareHolderPercentageDetailsForm.get("lastName").clearValidators();
      shareHolderPercentageDetailsForm.get("dateOfBirth").clearValidators();
      // shareHolderPercentageDetailsForm.get("typeOfSharePercentage").disable();
    } else if (shareHolderPercentageDetails.idType == 'ZS0011') {
      //tin in your country
      this.cpIdNumberMask = "0{15}";
      shareHolderPercentageDetailsForm.get("idNumber").setValidators([Validators.required]);
      shareHolderPercentageDetailsForm.get("firstName").disable();
      shareHolderPercentageDetailsForm.get("lastName").disable();
      shareHolderPercentageDetailsForm.get("dateOfBirth").disable();
      shareHolderPercentageDetailsForm.get("firstName").clearValidators();
      shareHolderPercentageDetailsForm.get("lastName").clearValidators();
      shareHolderPercentageDetailsForm.get("dateOfBirth").clearValidators();
    }

    if (shareHolderPercentageDetails.idType == 'ZS0001' || shareHolderPercentageDetails.idType == 'ZS0002' || shareHolderPercentageDetails.idType == 'ZS0003' || shareHolderPercentageDetails.idType == 'FS0002') {

      shareHolderPercentageDetailsForm.get("saudiGccShare").clearValidators();
      shareHolderPercentageDetailsForm.get("foreignShare").clearValidators();
      shareHolderPercentageDetailsForm.get("typeOfSharePercentage").clearValidators();
      shareHolderPercentageDetailsForm.get("saudiGccShare").enable();
      shareHolderPercentageDetailsForm.get("foreignShare").enable();
      shareHolderPercentageDetailsForm.get("typeOfSharePercentage").enable();


      // shareHolderPercentageDetailsForm.patchValue({
      //   saudiGccShare: "0.0000",
      //   foreignShare: "0.0000",
      //   typeOfSharePercentage: "",
      //   Shrbvalue: "",
      //   Shleapplicable: ""
      // });

    } else {

      shareHolderPercentageDetailsForm.get("saudiGccShare").setValidators([Validators.required, CustomValidators.percentageValidator()]);
      shareHolderPercentageDetailsForm.get("foreignShare").setValidators([Validators.required, CustomValidators.percentageValidator()]);
      shareHolderPercentageDetailsForm.get("typeOfSharePercentage").setValidators(Validators.required);

      if (shareHolderPercentageDetails.Shleapplicable == 'S') {
        //put saudi share = 100 and Foreign share = 0 and disable the fields
        shareHolderPercentageDetailsForm.get("saudiGccShare").disable();
        shareHolderPercentageDetailsForm.get("foreignShare").disable();
      } else if (shareHolderPercentageDetails.Shleapplicable == 'F') {
        //put saudi share = 0 and Foreign share = 100 and disable the fields
        shareHolderPercentageDetailsForm.get("saudiGccShare").disable();
        shareHolderPercentageDetailsForm.get("foreignShare").disable();
      } else if (shareHolderPercentageDetails.Shleapplicable == 'M') {
        //enable the saudi share and Foreign share.
        shareHolderPercentageDetailsForm.get("saudiGccShare").enable();
        shareHolderPercentageDetailsForm.get("foreignShare").enable();
      }
    }

    shareHolderPercentageDetailsForm.get("saudiGccShare").updateValueAndValidity();
    shareHolderPercentageDetailsForm.get("foreignShare").updateValueAndValidity();
    shareHolderPercentageDetailsForm.get("typeOfSharePercentage").updateValueAndValidity();
    shareHolderPercentageDetailsForm.get("idNumber").updateValueAndValidity();
    shareHolderPercentageDetailsForm.get("companyName").updateValueAndValidity();
    shareHolderPercentageDetailsForm.updateValueAndValidity();
    this.shareHolderDetailsForm.updateValueAndValidity();


  }

  hideSharedolderFields() {
    let shareHolderPercentageDetails = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").value;
    if (shareHolderPercentageDetails.idType == 'ZS0005' || shareHolderPercentageDetails.idType == 'ZS0012' || shareHolderPercentageDetails.idType == 'ZS0011') {
      //iqmaa id
      return true;
    } else {
      return false;
    }

  }

  hideCompanyName() {
    let shareHolderPercentageDetails = this.shareHolderDetailsForm.get("shareHolderPercentageDetails").value;
    if (shareHolderPercentageDetails.idType == 'ZS0001' || shareHolderPercentageDetails.idType == 'ZS0002' || shareHolderPercentageDetails.idType == 'ZS0003' || shareHolderPercentageDetails.idType == 'FS0002') {
      //iqmaa id
      return true;
    } else {
      return false;
    }

  }

  addNewShareholder() {

    jQuery("#addShareholderDetailsModal").modal("show");
    this.sholderFormDirective.resetForm();
    this.shareHolderDetailsForm = this.getShareHolderDetailsForm();
    this.shareholderStepper.reset();
    this.shareHolderDetailsForm.patchValue({ "action": "add_sholder" });
    let commdate = new Date(this.businessCommencementDate);
    this.shareHolderDetailsForm.get("shareHolderDetails").patchValue({
      "shNo": this.generateShareholderNumber(),
      "shareCapitalStartDate": this.dpuService.getConvertedDate(commdate, this.calendarType),
      "shareProfitStartDate": this.dpuService.getConvertedDate(commdate, this.calendarType),
    });
    let shareHolderPercentageDetailsForm = this.shareHolderDetailsForm.get("shareHolderPercentageDetails");

    shareHolderPercentageDetailsForm.patchValue({
      saudiGccShare: "100.0000",
      foreignShare: "100.0000",
      startDate: this.dpuService.getConvertedDate(commdate, this.calendarType),
    });

    if (this.Taxtpdetermination == '1' || this.Taxtpdetermination == '2' || this.Taxtpdetermination == '3') {
      this.shareHolderDetailsForm.get('shareHolderPercentageDetails.tinNumber').setErrors(null);
      this.shareHolderDetailsForm.get('shareHolderPercentageDetails.tinNumber').clearValidators();
      this.shareHolderDetailsForm.get('shareHolderPercentageDetails.tinNumber').updateValueAndValidity();
    }

    this.shareHolderDetailsForm.markAsPristine();
    this.mainStepperControl.selected.completed = false;
    this.mainStepperControl.selected.interacted = false;
    this.resetShareholderPercentageDetailsForm();
    this.updateShareholderPercentageDetailsValidators();
  }

  editShareholder(shareHolderObj) {
    console.log("editShareholder", shareHolderObj);
    this.sholderFormDirective.resetForm();
    this.shareHolderDetailsForm = this.getShareHolderDetailsForm();
    this.shareholderStepper.reset();
    shareHolderObj.shareHolderPercentageDetails.copyOfCommercialNumberFile = '';
    shareHolderObj.shareHolderPercentageDetails.copyOfIquamaFile = '';
    shareHolderObj.shareHolderPercentageDetails.copyOfPassportFile = '';
    // shareHolderObj.shareHolderPercentageDetails.copyOfFile = '';
    shareHolderObj.action = 'update_sholder';
    this.resetShareholderPercentageDetailsForm();
    this.shareHolderDetailsForm.patchValue(shareHolderObj);

    if (this.Taxtpdetermination == '1' || this.Taxtpdetermination == '2' || this.Taxtpdetermination == '3') {
      this.shareHolderDetailsForm.get('shareHolderPercentageDetails.tinNumber').setErrors(null);
      this.shareHolderDetailsForm.get('shareHolderPercentageDetails.tinNumber').clearValidators();
      this.shareHolderDetailsForm.get('shareHolderPercentageDetails.tinNumber').updateValueAndValidity();
    }
    this.updateShareholderPercentageDetailsValidators();

    //this.updateSaudiAndForeignShare(shareHolderObj.shareHolderPercentageDetails.saudiGccShare, shareHolderObj.shareHolderPercentageDetails.foreignShare, shareHolderObj.shareHolderPercentageDetails.typeOfSharePercentage);
    jQuery("#addShareholderDetailsModal").modal("show");

  }
  deleteShareHolderObj: any = {};
  confirmDeleteShareholder(shareHolderObj) {
    this.deleteShareHolderObj = shareHolderObj;
    jQuery("#confirmDeleteShareholderModal").modal("show");
  }
  deleteShareholder(shareHolderObj) {
    console.log("deleteShareholder", shareHolderObj);

    let delShareHolderObj = {
      fbNum: this.registrationObj["ReturnIdx"],
      shNo: shareHolderObj.shareHolderDetails.shNo,
      email: this.registrationObj["PortalUsrx"]
    }
    this.signupService.deleteShareholder(delShareHolderObj).subscribe((response: any) => {
      this.deleteShareHolderObj = {};
      jQuery("#confirmDeleteShareholderModal").modal("hide");
      this.updateShareholdersList('delete_sholder', shareHolderObj);
      this.calcluateSharePercentages();
      let responseObj = {
        apiResponse: response["d"],
        shareHoldersList: this.shareHoldersList
      }
      this.onShareholderSaveSuccess.emit(responseObj);
    }, (error) => {
      this.deleteShareHolderObj = {};
      jQuery("#confirmDeleteShareholderModal").modal("hide");

      this.notifierService.notify(
        "error",
        error.error.error.innererror.errordetails[0].message
      );
    });
  }
  getUpdatedRegSet() {
    //this.registrationObj.Fbnumx = this.registrationObj.FbnumAngx;
    let regObj: any = {};
    regObj = Object.assign({}, this.registrationObj);
    regObj.Fbnumx = this.registrationObj.FbnumAngx;
    this.signupService.getUpdatedRegSet(regObj).subscribe((response: any) => {
      console.log("getUpdatedRegSet", response);
      this.registrationObj.Sapartnershare = response["d"].Sapartnershare || {};
      this.registrationObj.Saprofitshare = response["d"].Saprofitshare || {};

      this.registrationObj.Forpartnershare = response["d"].Forpartnershare || {};
      this.registrationObj.Forprofitshare = response["d"].Forprofitshare || {};

      let responseObj = {
        apiResponse: this.registrationObj,
        shareHoldersList: this.shareHoldersList
      }
      this.onShareholderSaveSuccess.emit(responseObj);

    });
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
    regObj["AttDetSet"] = []; // this.removeResults(this.requestObj1["AttDetSet"]);
    regObj["Nreg_MSGSet"] = [];
    regObj["Nreg_FormEdit"] = {};
    delete regObj["__metadata"];
    this.signupService.postNewRegSet(regObj).subscribe((response: any) => {
      this.getUpdatedRegSet();
    }, (err) => {
      // let responseObj = {
      //   apiResponse: err,
      //   shareHoldersList: this.shareHoldersList,
      //   errorType: 'validation_error'
      // }
      // this.onShareholderSaveEror.emit(responseObj);
      this.getUpdatedRegSet();
    });
  }
  saveShareholder() {
    console.log("saveShareholder");
    console.log(this.shareHolderDetailsForm);


    if (!this.shareHolderDetailsForm.get('shareHolderPercentageDetails').valid) {
      this.shareHolderDetailsForm.get('shareHolderPercentageDetails').get("typeOfSharePercentage").markAsTouched();
      return true;
    }


    //this.shareholderStepper.selected.completed = true;
    this.shareholderStepper.next();

    // if (this.shareHolderDetailsForm.invalid) {
    //   return true;
    // }


    let shareholderObj = this.shareHolderDetailsForm.getRawValue();

    shareholderObj.addressDetails.tinNumber = shareholderObj.shareHolderPercentageDetails.tinNumber || "";;
    shareholderObj.communicationDetails.tinNumber = shareholderObj.shareHolderPercentageDetails.tinNumber || "";
    shareholderObj.addressDetails.shNo = shareholderObj.shareHolderDetails.shNo;
    shareholderObj.shareHolderPercentageDetails.shNo = shareholderObj.shareHolderDetails.shNo;
    shareholderObj.communicationDetails.shNo = shareholderObj.shareHolderDetails.shNo;

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
    this.registrationObj["Commdt"] = (this.businessCommencementDate) ? "\/Date(" + this.businessCommencementDate + ")\/" : null;
    this.registrationObj.Nreg_OutletSet = [];
    this.registrationObj.Nreg_ActivitySet = [];

    this.registrationObj["Nreg_BtnSet"] = [];
    this.registrationObj["off_notesSet"] = [];
    this.registrationObj["AttDetSet"] = []; // this.removeResults(this.requestObj1["AttDetSet"]);
    this.registrationObj["Nreg_MSGSet"] = [];
    this.registrationObj["Nreg_FormEdit"] = {};
    delete this.registrationObj["__metadata"];
    console.log(this.registrationObj);

    this.saveConsortium(this.registrationObj, shareholderObj.action, shareholderObj);


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


  saveConsortium(registrationObj, action = '', dataObj: any = {}) {
    this.signupService.postNewRegSet(registrationObj).subscribe((response: any) => {
      this.registrationObj = response["d"];
      this.shTinDetails = {};
      this.updateShareholdersList(action, dataObj);
      this.calcluateSharePercentages();

      jQuery("#addShareholderDetailsModal").modal("hide");
      let responseObj = {
        apiResponse: response["d"],
        shareHoldersList: this.shareHoldersList
      }
      this.onShareholderSaveSuccess.emit(responseObj);

      // this.validateShareholderDetails().subscribe((validateResponse) => {


      // }, (err) => {

      //   if (dataObj.shareHolderDetails.shNo == "001") {
      //     jQuery("#addShareholderDetailsModal").modal("hide");
      //     let responseObj = {
      //       apiResponse: response["d"],
      //       shareHoldersList: this.shareHoldersList
      //     }
      //     this.onShareholderSaveSuccess.emit(responseObj);
      //   } else {
      //     this.showErrorMessages(err);
      //     let responseObj = {
      //       apiResponse: err,
      //       shareHoldersList: this.shareHoldersList,
      //       errorType: 'validation_error'
      //     }
      //     this.onShareholderSaveEror.emit(responseObj);
      //   }
      // });

    }, (err) => {
      this.showErrorMessages(err);
      let responseObj = {
        apiResponse: err,
        shareHoldersList: this.shareHoldersList,
        errorType: 'api_error'
      }
      this.onShareholderSaveEror.emit(responseObj);
    });
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
    addressObj.Srcidentify = 'S' + addressDetails.shNo;
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
    addressObj1.Srcidentify = ('S' + addressDetails.shNo);
    addressObj1.Street = addressDetails.streetName || "";

    addressList.push(addressObj1);
    return [];
  }
  transformContactPersonDetails(contactPersonDetails, source = 'Outlet') {
    console.log("transformContactPersonDetails", contactPersonDetails);
    let contactPersonList = [];
    let contactPersonObj = new CpersonSet();

    delete contactPersonObj.Cpoldfg;
    delete contactPersonObj.DataVersion;
    delete contactPersonObj.FormGuid;
    delete contactPersonObj.LineNo;
    delete contactPersonObj.Mandt;
    delete contactPersonObj.RankingOrder;
    delete contactPersonObj.DataVersion;
    contactPersonObj.Srcidentify = ('S' + contactPersonDetails.shNo); // Derive it dynamically based on Outlet length
    contactPersonObj.Outletnm = "";// (source == 'Outlet') ? ("O" + this.generateOutletNumber()) : ('S' + this.generateShareholderNumber()); // Derive it dynamically based on Outlet length
    contactPersonObj.Contacttp = "BUR001";
    contactPersonObj.Dobdt = (contactPersonDetails.dateOfBirth) ? this.dpuService.getAPIFormatDate(
      contactPersonDetails.dateOfBirth
    ) : null;
    contactPersonObj.Startdt = contactPersonDetails.startDate ? this.dpuService.getAPIFormatDate(contactPersonDetails.startDate) : null;
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

    mobilecontactObj.Begda = this.dpuService.getAPIFormatDate(new Date());


    // mobileCode: "966"
    // mobileNumber: "5645634563"
    // if(){      
    // }

    mobilecontactObj.Endda = "/Date(253402214400000)/";
    mobilecontactObj.Srcidentify = ('S' + contactPersonDetails.shNo);
    mobilecontactObj.SmtpAddr = "";
    mobilecontactObj.TelNumber = contactPersonDetails.mobileNumber;
    mobilecontactObj.R3User = "X";
    mobilecontactObj.Gpart = contactPersonDetails.tinNumber || "";
    contactList.push(mobilecontactObj);


    let mobilecontactObj2 = Object.assign({}, mobilecontactObj);
    mobilecontactObj2.R3User = "";
    mobilecontactObj2.TelNumber = "";
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
    idObj.Srcidentify = ('S' + contactPersonDetails.shNo);
    idObj.Country = contactPersonDetails.issueCountry || "";
    IdList.push(idObj);
    return IdList;
  }

  shcapmaxlength: number = 8;
  shpfmaxlength: number = 8;
  sgccsmaxlength: number = 8;
  fsmaxlength: number = 8;
  restricTo100($event, ctrl, action) {

    // var regexp = new RegExp('^[0-9]+(\.[0-9][0-9]?[0-9]?[0-9]?)??$');
    // if (!regexp.test(ctrl.value)) {
    //   console.log("regexp false", $event.target.value);
    //   $event.preventDefault();
    // } else {
    //   console.log("regexp true");
    // }

    let maxlength = 8;
    if (isNaN($event.target.value)) {
      $event.target.value = "";
      ctrl.reset();
      $event.preventDefault();
    }
    else if ($event.target.value && Number($event.target.value) > 100) {
      $event.target.value = "100";
      ctrl.patchValue("100");
      $event.preventDefault();
    } else {
      if (Number($event.target.value) < 100) {
        maxlength = 7;
      }
      // ctrl.patchValue(Number(ctrl.value).toFixed(4));
      // $event.preventDefault();

    }
    console.log("ctrl.value", ctrl.value);
    console.log("restricTo100", $event);
    if (action == 1) {
      this.shcapmaxlength = maxlength;

    } else if (action == 2) {
      this.shpfmaxlength = maxlength;
    } else if (action == 3) {
      this.sgccsmaxlength = maxlength;
    } else if (action == 4) {
      this.fsmaxlength = maxlength;
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
  generateOutletNumber() {
    var l = this.shareHoldersList.length;
    if (l <= 9) {
      l = "00" + l;
      return l;
    }
    if (l > 9 && l <= 99) {
      l = "0" + l;
      return l;
    }

  }

  getShareholderType() {
    if (this.Taxtpdetermination == '1') {
      return 'SH02';
    } else if (this.Taxtpdetermination == '2' || this.Taxtpdetermination == '3') {
      return 'SH01';
    } else if (this.Taxtpdetermination == '5') {
      return 'MC01';
    }

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
      jQuery("#shErrorMsgsModal").modal('show');
    } else {
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
    }
  }

}
