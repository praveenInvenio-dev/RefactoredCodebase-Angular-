import { IdSet } from "./../../dto/establishment/id-set";
import { OutletSet } from "./../../dto/establishment/outlet-set";
import { CpersonSet } from "./../../dto/establishment/cperson-set";
import { ContactSet } from "./../../dto/establishment/contact-set";
import { AddressSet } from "./../../dto/establishment/address-set";
import { ActivitySet } from "./../../dto/establishment/activity-set";
import { VatServiceService } from "./../../services/vat-service.service";
import { SignupService } from "src/app/services/signup.service";
import { AppService } from "src/app/app.service";
import { Component, OnInit, HostListener, ViewChild, ViewEncapsulation } from "@angular/core";
import { constants } from "src/app/constants/constants.model";
import { interval, Subscription } from "rxjs";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { NotifierService } from "angular-notifier";
import { MatVerticalStepper } from "@angular/material/stepper";
import { Router } from "@angular/router";
import { CommonValidation } from "src/app/constants/commonValidations";
import { charityLabels } from "./charity-labels.constants";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { DatePipe, formatDate } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from "moment";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import * as FileSaver from "file-saver";
import { MatAccordion } from "@angular/material/expansion";
declare var $: any;

@Component({
  selector: "app-charity",
  templateUrl: "./charity.component.html",
  styleUrls: ["./charity.component.css"],
  //encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class CharityComponent implements OnInit {
  headerComponent = CalendarComponent;
  optionActive;
  defaultValue: number = 1;
  showIDFields: boolean = false;
  showPassprtSection: boolean = false;
  showOne: boolean = false;
  showTwo: boolean = false;
  counter: number = 60;
  counterSubscription: Subscription;
  idTypes = [];
  panelOpenState: boolean = false;
  radio3;
  firstFormGroup: FormGroup;
  charityForm: FormGroup;
  facilityInfoForm: FormGroup;
  branchDetailsForm: FormGroup;
  activityDetailsForm: FormGroup;
  commercialRegForm: FormGroup;
  licenseForm: FormArray;
  addressDetailsForm: FormGroup;
  contactDetailsForm: FormGroup;
  submitted: boolean;
  submitted1: boolean;
  codes;
  name = "";
  activityType = "";
  ls: boolean = false;
  cr: boolean = false;
  lang;
  direction;
  show: boolean = false;
  innerWidth: number;
  showVerification: boolean = false;
  currentTab: any;
  url = "/signup/others";
  tinErr: boolean;
  tinMsg: any;
  vatErr: any;
  byTin: boolean;
  selectedCC: any;
  maxLength: number;
  step1 = "initial";
  step2 = "inactive";
  step3 = "inactive";
  step4 = "inactive";
  matchErr: boolean;
  mobPattern = "^(009665)[0-9]*$";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
  // alphaNumeric = "^[a-zA-Z\u0600-\u06FF ][a-zA-Z_-\u0600-\u06FF0-9 ]+$";
  alphaNumeric = "^[a-zA-Z\u0600-\u06FF0-9 ]+$";
  alphaNumeric1 = "^[a-zA-Z\s_\u0600-\u06FF- ][a-zA-Z\s_\u0600-\u06FF0-9- ]+$";
  namePattern = "^[a-zA-Z\u0600-\u06FF ][\sa-zA-Z\u0600-\u06FF ]*$";
  // alphaNumeric = "/^[\p{Letter}\d\_\-\s]+$/"
  // alphaNumeric = " /[`!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/"
  bFormSubmitted: boolean;
  acFormSubmitted: boolean;
  addrFormSubmitted: boolean;
  cFormSubmitted: boolean;
  cityList: any;
  branches: any;
  days: any; // = Array(30).join('0').split('0').map((v, i) => (i + 1).toString()); // [...Array(29 + 1).keys()].slice(1)
  months: any; // = Array(12).join('0').split('0').map((v, i) => (i + 1).toString()); //[...Array(12 + 1).keys()].slice(1);
  countryList: any;
  stateList: any;
  caseuid: any;
  indErr: any;
  retryCount = 1;
  resendObj: {};
  resend: boolean;
  enableResendButton: boolean;
  otpRespObj: any;
  requestObj: any;
  requestObj1: any;
  lng: string;
  mainGrpActvty: any;
  subGrpActvty: any;
  mainActvty: any;
  issueByList: any = [];
  ackdate = new Date().toDateString();
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  // File upload props - start
  // bDetailfiles: any = [];
  myFiles: any = {
    RG23: [this.createAttachment1('RG23')],
    RG01: [this.createAttachment1('RG01')],
    RG02: [this.createAttachment1('RG02')],
    RG12: [this.createAttachment1('RG12')],
    RG11: [this.createAttachment1('RG11')],
  };
  myFiles1: any = {
    0: [this.createAttachment1('RG02')],
    1: [this.createAttachment1('RG02')],
    2: [this.createAttachment1('RG02')],
    3: [this.createAttachment1('RG02')]
  };
  storeFileDetails1: any = {
    0: [],
    1: [],
    2: [],
    3: []
  };
  storeFileDetails: any = {
    RG23: [],
    RG01: [],
    RG02: [],
    RG12: [],
    RG11: [],
  };
  returnId: any;
  // File upload props - end

  prefillCRCityFlag: boolean;
  showContactDetails: boolean = true;
  editBranchFlag: boolean;
  outnm: any;
  idErr: boolean;
  idMsg: any;
  enddate: any;
  showTin: boolean = false;
  commDateTickFormat: number;
  taxableDate: number;
  dobErr1: boolean;
  dateMsg: any;
  type = "ZVTI";
  type1 = "npo";
  applicationNo: any;
  compName: any;
  ErrWhileSaving: boolean;
  tempReqObj: any;
  showErr: any;
  addrList: any = [];
  backgroundImg: any;
  backgroundImg1: any;
  addressPrefilled: boolean = false;
  selectedCalType: any;
  outletIndex: any;
  fileNames: any[];
  tempFiles: any = [];
  fc: any;
  crorlsNo: any;
  modalTitle: any;
  attchIndex: any = 0;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log("soze", this.innerWidth);
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;

  public displayedColumns = [
    "branchName",
    "crLicense",
    "city",
    "type",
    "update",
    "delete",
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild('crAccordion', { read: MatAccordion, static: false }) crAccordion: MatAccordion;
  @ViewChild('licenseAccordion', { read: MatAccordion, static: false }) licenseAccordion: MatAccordion;
  constructor(
    private formBuilder: FormBuilder,
    public appSrv: AppService,
    private vatSrv: VatServiceService,
    public notifierService: NotifierService,
    private router: Router,
    private signupSrv: SignupService,
    public commonValid: CommonValidation,
    public vatService: VatServiceService,
    private datePipe: DatePipe,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {

    this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(
      "url('assets/images/3@2x.png')"
    );
    this.backgroundImg1 = this.sanitizer.bypassSecurityTrustStyle(
      "url('assets/images/4@2x.png')"
    );

    this.appSrv.data1.subscribe(
      (res) => {
        console.log("test1", res);
        this.selectedCalType = res;
        this.enddate = this.commonValid.dateFormate(
          this.commonValid.toJulianDate1(new Date()),
          res
        );
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );

    if (localStorage.getItem("lang") === "ar") {
      this.lng = "A";
      this.lang = charityLabels.langz.arb.charity;
      this.issueByList = charityLabels.langz.arb.issueByList;
      this.direction = charityLabels.langz.arb.dir;
      this.idTypes = charityLabels.langz.arb.idTypes;
      this.vatErr = constants.langz.arb.vatError;
      this.indErr = constants.langz.arb.individual.indErr;
      this.days = JSON.parse(JSON.stringify(charityLabels.langz.arb.days));
      this.months = charityLabels.langz.arb.months;
    } else {
      this.lng = "E";
      this.lang = charityLabels.langz.eng.charity;
      this.issueByList = charityLabels.langz.eng.issueByList;
      this.direction = charityLabels.langz.eng.dir;
      this.idTypes = charityLabels.langz.eng.idTypes;
      this.vatErr = constants.langz.eng.vatError;
      this.indErr = constants.langz.eng.individual.indErr;
      this.days = JSON.parse(JSON.stringify(charityLabels.langz.eng.days));
      this.months = charityLabels.langz.eng.months;
    }
    this.buildForm();

    this.appSrv.getPhoneCode().subscribe((res) => {
      console.log(res);
      this.codes = res["d"]["results"];
      this.selectedCC = this.codes.find((c) => c.Telefto == 966);
      this.charityForm
        .get("contactForm")
        .get("cc")
        .setValue(this.selectedCC["Telefto"]);
      this.maxLength =
        15 - (this.charityForm.get("contactForm").get("cc").value.length + 2);
      console.log(this.codes);
    });

    this.optionActive = 1;

    this.charityForm.get("companyId").valueChanges.subscribe((q) => {
      if (q == "" || q != this.charityForm.get("companyId").value) {
        this.charityForm.get("tin").patchValue("");
        this.charityForm.get("tin").enable();
        this.charityForm.get("orgName").patchValue("");
        this.charityForm.get("orgName").enable();
        this.showTin = false;
      }
    });

    this.charityForm.get("tin").valueChanges.subscribe((q) => {
      if (q == "") {
        this.tinErr = false;
      }
    });
    this.contactDetailsForm.get("idType").valueChanges.subscribe((q) => {
      if (q == "FS0002") {
        this.contactDetailsForm
          .get("issueCountry")
          .setValidators(Validators.required);
      }
    });

    this.commercialRegForm.get("crNumber").valueChanges.subscribe((q) => {
      if (q == "") {
        this.commercialRegForm.get("issueCity").patchValue("");
        this.commercialRegForm.get("validFrom").patchValue(null);
      }
    });

    this.signupSrv
      .getNewRegSet({ tin: "", email: "", id: "", mobile: "", otp: "", })
      .subscribe((res) => {
        this.requestObj = res["d"];
      });

    this.getCityList();
    this.getGroupActivity();
    console.log(moment.now());
  }

  getCityList() {
    this.appSrv.getCountry().subscribe((res) => {
      this.cityList = res["d"]["city_dropdownSet"]["results"];
      this.countryList = res["d"]["country_dropdownSet"]["results"];
      this.stateList = res["d"]["State_dropdownSet"]["results"];
      this.cityList.shift();
      this.cityList.forEach((ele) => {
        ele.CityName = ele.CityName.toUpperCase();
      });
      console.log("this.city", this.cityList);
    });
  }

  getGroupActivity() {
    this.signupSrv.getGroupActivity().subscribe((res) => {
      console.log("Group Activity :: ", res);
      this.mainGrpActvty = res["d"]["act_groupSet"]["results"];
      this.subGrpActvty = res["d"]["act_subgroupSet"]["results"];
      this.mainActvty = res["d"]["activitySet"]["results"];
    });
  }

  changeActivity(str, val) {
    this.activityType = str;
    if (str == "cr") {
      if (val) {
        this.setCRValidator();
        this.commercialRegForm.get("issueBy").patchValue("90702");
        this.commercialRegForm.get("issueCountry").patchValue("SA");
      } else {
        this.clearCRValidator();
      }
    }
    // this.clearCRValidator();
    // if (str == "ls" && !val) {
    //   this.activityDetailsForm.reset();
    //   this.activityDetailsForm.markAsPristine();
    //   this.activityDetailsForm.markAsUntouched();
    // }
    if (str == 'ls') {
      if (val) {
        this.setLSValidators();
        // this.myFiles1[0].push(this.createAttachment1('RG02'));
      } else {
        this.clearLSValidator(); this.myFiles1[0] = [this.createAttachment1('RG02')];
      }
    }
  }

  setCRValidator() {
    this.commercialRegForm
      .get("issueCountry")
      .setValidators(Validators.required);
    this.commercialRegForm.get("issueCity").setValidators(Validators.required);
    this.commercialRegForm
      .get("crNumber")
      .setValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^[1-9][0-9]*$/),
      ]);
    this.commercialRegForm.get('validFrom').setValidators(Validators.required)
    // this.commercialRegForm.get('copyOfCR').setValidators(Validators.required)
    // this.commercialRegForm.get('transferCopy').setValidators(Validators.required)
    this.commercialRegForm
      .get("mainGrpActivity")
      .setValidators(Validators.required);
    this.commercialRegForm
      .get("subGrpActivity")
      .setValidators(Validators.required);
    this.commercialRegForm
      .get("mainActivity")
      .setValidators(Validators.required);
    this.commercialRegForm.updateValueAndValidity();
  }

  get lcs(): FormArray {
    return this.activityDetailsForm.get("license") as FormArray;
  }

  setLSValidators() {
    for (var i in this.lcs.controls) {
      this.lcs.controls[i]
        .get("issueCountry")
        .setValidators(Validators.required);
      this.lcs.controls[i].get("issueCity").setValidators(Validators.required);
      this.lcs.controls[i].get("issueBy").setValidators(Validators.required);
      this.lcs.controls[i]
        .get("licenseNumber")
        .setValidators([
          Validators.required,
          Validators.pattern(this.alphaNumeric),
        ]);
      this.lcs.controls[i].get('validFrom').setValidators(Validators.required)
      this.lcs.controls[i]
        .get("mainGrpActivity")
        .setValidators(Validators.required);
      this.lcs.controls[i]
        .get("subGrpActivity")
        .setValidators(Validators.required);
      this.lcs.controls[i]
        .get("mainActivity")
        .setValidators(Validators.required);
      this.lcs.controls[i]
        .get("issueCountry").patchValue('SA');
      this.lcs.controls[i].updateValueAndValidity();

    }
  }

  clearCRValidator() {
    this.commercialRegForm.controls.issueCountry.setErrors(null);
    this.commercialRegForm.controls.issueCity.setErrors(null);
    this.commercialRegForm.controls.crNumber.setErrors(null);
    this.commercialRegForm.controls.validFrom.setErrors(null);
    this.commercialRegForm.controls.mainGrpActivity.setErrors(null);
    this.commercialRegForm.controls.subGrpActivity.setErrors(null);
    this.commercialRegForm.controls.mainActivity.setErrors(null);
    // this.commercialRegForm.reset();
    // this.commercialRegForm.clearValidators();
    this.commercialRegForm.markAsUntouched();
    this.commercialRegForm.markAsPristine();
    this.commercialRegForm.updateValueAndValidity();
  }

  clearLSValidator() {
    for (var i in this.lcs.controls) {
      this.lcs.controls[i].get('issueCountry').setErrors(null);
      this.lcs.controls[i].get('issueCity').setErrors(null);
      this.lcs.controls[i].get('licenseNumber').setErrors(null);
      this.lcs.controls[i].get('validFrom').setErrors(null);
      this.lcs.controls[i].get('mainGrpActivity').setErrors(null);
      this.lcs.controls[i].get('subGrpActivity').setErrors(null);
      this.lcs.controls[i].get('mainActivity').setErrors(null);
      this.lcs.controls[i].get('issueBy').setErrors(null);
      // this.commercialRegForm.reset();
      // this.commercialRegForm.clearValidators();
      this.lcs.controls[i].markAsUntouched();
      this.lcs.controls[i].markAsPristine();
      this.lcs.controls[i].updateValueAndValidity();
    }
  }

  createForm() {
    return this.formBuilder.group({
      ma: false,
      issueCountry: [
        "SA",
        this.conditionalValidator(
          () => this.activityType === "ls",
          Validators.required
        ),
      ],
      issueBy: [
        "",
        this.conditionalValidator(
          () => this.activityType === "ls",
          Validators.required
        ),
      ],
      issueCity: [
        "",
        this.conditionalValidator(
          () => this.activityType === "ls",
          Validators.required
        ),
      ],
      licenseNumber: [
        "",
        this.conditionalValidator(
          () => this.activityType === "ls",
          Validators.required
        ),
      ],
      validFrom: [
        null,
        this.conditionalValidator(
          () => this.activityType === "ls",
          Validators.required
        ),
      ],
      copyOfLicense: this.formBuilder.array([this.createAttachment()]),
      mainGrpActivity: [
        "",
        this.conditionalValidator(
          () => this.activityType === "ls",
          Validators.required
        ),
      ],
      subGrpActivity: [
        "",
        this.conditionalValidator(
          () => this.activityType === "ls",
          Validators.required
        ),
      ],
      mainActivity: [
        "",
        this.conditionalValidator(
          () => this.activityType === "ls",
          Validators.required
        ),
      ],
    });
  }

  createCRForm() {
    return this.formBuilder.group({
      ma: false,
      issueCountry: [
        "",
        this.conditionalValidator(
          () => this.activityType === "cr",
          Validators.required
        ),
      ],
      issueBy: [""],
      issueCity: [
        "",
        this.conditionalValidator(
          () => this.activityType === "cr",
          Validators.required
        ),
      ],
      // crNumber: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      crNumber: [
        "",
        [
          ,
          this.conditionalValidator(
            () => this.activityType === "cr",
            Validators.required
          ),
          this.conditionalValidator(
            () => this.activityType === "cr",
            Validators.pattern(/^[1-9][0-9]*$/)
          ),
        ],
      ],
      validFrom: [
        null,
        this.conditionalValidator(
          () => this.activityType === "cr",
          Validators.required
        ),
      ],
      copyOfCR: this.formBuilder.array([this.createAttachment()]),
      transferCopy: this.formBuilder.array([this.createAttachment()]),
      mainGrpActivity: [
        "",
        this.conditionalValidator(
          () => this.activityType === "cr",
          Validators.required
        ),
      ],
      subGrpActivity: [
        "",
        this.conditionalValidator(
          () => this.activityType === "cr",
          Validators.required
        ),
      ],
      mainActivity: [
        "",
        this.conditionalValidator(
          () => this.activityType === "cr",
          Validators.required
        ),
      ],
    });
  }

  createAttachment() {
    return this.formBuilder.group({
      // id: ["", Validators.required],
      id: "",
      name: "",
      url: "",
      flag: false,
      did: "",
    });
  }

  buildForm() {
    this.charityForm = this.formBuilder.group({
      tin: [""],
      companyId: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^[7][0-9]*$"),
        ],
      ],
      orgName: ["", [Validators.required, Validators.pattern(this.alphaNumeric1)]],
      repBranch: [{ value: this.lng == 'E' ? "LTA (Large Taxpayer Administration" : 'إدارة كبار المكلفين', disabled: true }],
      accounting: [null, Validators.required],
      contactForm: this.formBuilder.group(
        {
          cc: [""],
          mobile: [
            "",
            [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)],
          ],
          email: [
            "",
            [Validators.required, Validators.pattern(this.emailPattern)],
          ],
          cnfrmEmail: ["", Validators.required],
        },
        {
          validator: this.mustMatch("email", "cnfrmEmail"),
        }
      ),
    });

    this.facilityInfoForm = this.formBuilder.group({
      accounting: ['A', Validators.required],
      tin: [''],
      tan: [''],
      capRegDt: [null],
      capAmt: ['0.00'],
      calendarType: ['H', Validators.required],
      endDay: [{ value: '', disabled: true }, Validators.required],
      endMonth: ['', Validators.required],
      commencementDate: [{ value: null, disabled: true }],
      taxableDate: [{ value: null, disabled: true }],
    });

    this.branchDetailsForm = this.formBuilder.group({
      branchName: [
        "",
        [Validators.required]
      ], // Validators.pattern(/[`!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/)]],  TBD//
      copy: this.formBuilder.array([this.createAttachment()]),
    });

    this.activityDetailsForm = this.formBuilder.group({
      // license: this.formBuilder.array([this.createForm()]),
      license: this.formBuilder.array([
        this.formBuilder.group({
          ma: false,
          issueCountry: ["SA"],
          issueBy: [""],
          issueCity: [""],
          licenseNumber: [""],
          validFrom: [null],
          copyOfLicense: this.formBuilder.array([this.createAttachment()]),
          mainGrpActivity: [""],
          subGrpActivity: [""],
          mainActivity: [""],
        })
      ]),
    });

    this.commercialRegForm = this.formBuilder.group({
      ma: false,
      issueCountry: [""],
      issueBy: [""],
      issueCity: [""],
      crNumber: [""],
      validFrom: [null],
      copyOfCR: this.formBuilder.array([this.createAttachment()]),
      transferCopy: this.formBuilder.array([this.createAttachment()]),
      mainGrpActivity: [""],
      subGrpActivity: [""],
      mainActivity: [""],
    });

    // this.commercialRegForm = this.createCRForm();

    this.addressDetailsForm = this.formBuilder.group({
      country: ["", Validators.required],
      province: ["", Validators.required],
      city: ["", Validators.required],
      district: ["", [Validators.required, Validators.pattern(this.alphaNumeric)]],
      streetName: [
        "",
        [Validators.required, Validators.pattern(this.alphaNumeric)],
      ],
      blgNo: ["", [Validators.required, Validators.pattern(this.alphaNumeric)]],
      zipCode: ["", [Validators.required, Validators.pattern(this.alphaNumeric)]],
      additionalNo: ["", [Validators.required, Validators.pattern(this.alphaNumeric)]],
      unitNo: ["", [Validators.required, Validators.pattern(this.alphaNumeric)]],
    });

    this.contactDetailsForm = this.formBuilder.group(
      {
        tin: [""],
        idType: ["ZS0001", Validators.required],
        issueCountry: [""],
        idNumber: ["", Validators.required],
        dtofBirth: [null, Validators.required],
        fname: ["", Validators.required],
        lname: ["", Validators.required],
        strtDt: [this.enddate, Validators.required],
        mobNo: ["", [Validators.required, Validators.pattern(this.mobPattern)]],
        copyGMID: this.formBuilder.array([this.createAttachment()]),
        email: [
          "",
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        cnfrmEmail: ["", Validators.required],
      },
      {
        validator: this.mustMatch("email", "cnfrmEmail"),
      }
    );
  }

  backClick(id) {
    // if (id === 2) {
    if (id < this.currentTab && !this.show) {
      if (id == 1 && this.requestObj["Nreg_OutletSet"]["results"].length > 0) return;
      this.optionActive = id;
      this.currentTab = id;
      this.defaultValue = id;
    }
    if (id = 1) this.showTwo = false;
    // }
  }

  get f() {
    return this.charityForm.controls;
  }

  get f1() {
    return this.facilityInfoForm.controls;
  }

  get b() {
    return this.branchDetailsForm.controls;
  }

  get addr() {
    return this.addressDetailsForm.controls;
  }

  get act() {
    return this.activityDetailsForm.controls;
  }

  get comReg() {
    return this.commercialRegForm.controls;
  }

  get c() {
    return this.contactDetailsForm.controls;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.charityForm.controls[controlName].hasError(errorName);
  };

  onSubmit() {
    this.submitted = true;
    console.log(this.charityForm.value);
    // stop here if form is invalid
    if (this.charityForm.invalid) {
      return;
    }
    let obj = {};
    obj["IdType"] = "ZS0005";
    obj["Id"] = this.charityForm.getRawValue().companyId;
    obj["OtpType"] = "002";
    obj["BuDob"] = null;
    obj["CommMobNo"] = "";
    obj["CommMobileOtp"] = "";
    obj["MobileNo"] = "00" +
      this.charityForm.getRawValue().contactForm.cc +
      this.charityForm.getRawValue().contactForm.mobile;
    obj["MobileOtp"] = "";
    obj["OtpVer"] = "";
    this.resendObj = obj;
    // request obj to send to validate Company ID & Tin
    this.requestObj["Id"] = this.charityForm.getRawValue().companyId;
    // this.requestObj["Branchx"] = this.charityForm.getRawValue().repBranch;
    this.requestObj["IdType"] = "ZS0005";
    this.requestObj["Operationx"] = "00";
    this.requestObj["Mobno"] = "00" + this.charityForm.getRawValue().contactForm.cc + this.charityForm.getRawValue().contactForm.mobile;
    this.requestObj["Atype"] = "2";
    this.requestObj["Ngotp"] = "1";
    this.requestObj["PortalUsrx"] = this.charityForm.getRawValue().contactForm.email;
    this.requestObj["NameOrg1"] = this.charityForm.getRawValue().orgName;
    this.requestObj["Gpartx"] = this.charityForm.getRawValue().tin;

    this.signupSrv.postNewRegSet(this.requestObj).subscribe(response => {
      this.appSrv.getOTP(obj).subscribe((res) => {
        console.log(res);
        this.showVerification = true;
        this.caseuid = res["d"]["CaseGuid"];
        if (obj["CommMobileOtp"] === "") {
          // this.counterSubscription = interval(1000).subscribe((count) => {
          //   console.log((this.counter = this.counter - 1));
          // });
          this.notifierService.notify("success", this.indErr.e19);
        } else {
          // this.appSrv.updatedDataSelection6("1");
          this.notifierService.notify("error", this.indErr.e20);
        }
        let temp = this.charityForm.getRawValue().accounting;
        if (temp === '315A') temp = "1";
        if (temp === '315B') temp = "2";
        if (temp === '315C') temp = "3";
        this.requestObj["Ngotp"] = temp;
        this.requestObj = JSON.parse(JSON.stringify(response["d"]));
        this.requestObj["Gpartx"] = this.charityForm.getRawValue().tin;
        this.requestObj["Langx"] = this.lng;
        this.requestObj["UserTypx"] = "TP";
        this.requestObj[
          "Bpkind"
        ] = this.charityForm.getRawValue().accounting;
        this.returnId = response["d"]["ReturnIdx"];
        this.requestObj["Accmethod"] = 'A';
        this.requestObj["Caltp"] = 'H';
        this.requestObj["Fdcalender"] = '2';
        // this.returnId = "005056B1365C1EDB88E8ABC25762AF19";
        this.dataSource = new MatTableDataSource(<any>[]);
      }, err => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      });
    }, err => {
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
    })
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        this.matchErr = false;
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
        this.matchErr = true;
      }
    };
  }

  onSubmit1() {
    this.submitted1 = true;
    console.log(this.facilityInfoForm.value);
    if (this.facilityInfoForm.invalid || this.requestObj["Nreg_OutletSet"]["results"].length == 0) {
      return;
    }

    this.requestObj['Capamt'] = parseFloat(this.facilityInfoForm.get('capAmt').value).toFixed(2).toString();
    let d = this.facilityInfoForm.get('capRegDt').value !== null ? this.commonValid.changeDate1(this.facilityInfoForm.get('capRegDt').value) : null
    this.requestObj['Capregdt'] = d;

    this.requestObj1 = JSON.parse(JSON.stringify(this.requestObj));

    this.requestObj1["Operationx"] = "05";
    this.requestObj1['StepNumberx'] = '04';
    this.requestObj1['Chkfg'] = 'X';
    this.requestObj1['Augrp'] = '111';
    this.requestObj1["Nreg_CpersonSet"] = this.removeResults(this.requestObj1["Nreg_CpersonSet"]);
    this.requestObj1["Nreg_IdSet"] = this.removeResults(this.requestObj1["Nreg_IdSet"]);
    this.requestObj1["Nreg_OutletSet"] = this.removeResults(this.requestObj1["Nreg_OutletSet"]);
    this.requestObj1["Nreg_ActivitySet"] = this.removeResults(this.requestObj1["Nreg_ActivitySet"]);
    this.requestObj1["Nreg_AddressSet"] = this.removeResults(this.requestObj1["Nreg_AddressSet"]);
    this.requestObj1["Nreg_ContactSet"] = this.removeResults(this.requestObj1["Nreg_ContactSet"]);
    this.requestObj1["Nreg_BtnSet"] = [];
    this.requestObj1["off_notesSet"] = [];
    this.requestObj1["Nreg_ShareholderSet"] = [];
    this.requestObj1["Nreg_IdSet"] = [];
    this.requestObj1["AttDetSet"] = []; // this.removeResults(this.requestObj1["AttDetSet"]);
    this.requestObj1["Nreg_MSGSet"] = [];
    if (this.facilityInfoForm.get('tin').value !== '') this.requestObj1["Nreg_IdSet"].push(this.mapTinTan("ZS0010", this.facilityInfoForm.get('tin').value));
    if (this.facilityInfoForm.get('tan').value !== '') this.requestObj1["Nreg_IdSet"].push(this.mapTinTan("ZS0011", this.facilityInfoForm.get('tan').value));
    this.requestObj1["Nreg_FormEdit"] = {};
    this.requestObj1["Nreg_IdSet"].push(this.pushCompanyID());
    this.requestObj1['Capregdt'] = null;

    console.log("FInal Req Obj1 for Saving:: ", this.requestObj1);
    this.signupSrv.postNewRegSet(this.requestObj1).subscribe(response => {
      console.log(response);
      this.NextStep(3);
    }, err => {
      this.ErrWhileSaving = true;
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
    })


  }

  onReset() {
    this.submitted = false;
    this.charityForm.reset();
  }

  NextStep(id) {
    this.optionActive = id;
    this.currentTab = id;
    if (this.optionActive === 2) {
      this.showOne = true;
    }
    if (this.optionActive === 3) {
      this.showTwo = true;
    }

    this.defaultCss(id);
  }

  defaultCss(id) {
    this.defaultValue += id;
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  onChange(val) {
    // console.log(val);
    // if(val != this.contactDetailsForm.get('idType').value){
    this.contactDetailsForm.patchValue({
      tin: '',
      dtofBirth: null,
      email: '',
      fname: '',
      lname: '',
      mobNo: '',
      idNumber: '',
    });
    this.contactDetailsForm.enable();
    this.tinErr = false;
    // }
  }

  validateOTP(otp) {
    console.log(otp);
    let obj = {};

    obj["IdType"] = "ZS0005";
    obj["Id"] = this.charityForm.getRawValue().companyId;
    obj["OtpType"] = "002";
    obj["BuDob"] = null;
    obj["CommMobNo"] = "";
    obj["CommMobileOtp"] = otp;
    obj["MobileNo"] = "00" +
      this.charityForm.getRawValue().contactForm.cc +
      this.charityForm.getRawValue().contactForm.mobile;
    obj["MobileOtp"] = "";
    obj["OtpVer"] = "1";
    if (otp != "") obj["Zsubmit"] = "X";
    obj["CaseGuid"] = this.caseuid;
    this.appSrv.getOTP(obj).subscribe((res) => {
      console.log(res);
      if (res["d"]["Zvalidate"]) {
        console.log("Req Obj :: ", this.requestObj);
        this.showVerification = false;
        this.NextStep(2);
      } else {
        if (obj["MobileOtp"] === undefined) {
          this.counterSubscription = interval(1000).subscribe((count) => {
            console.log((this.counter = this.counter - 1));
          });
          this.notifierService.notify("success", this.indErr.e19);
        } else {
          this.appSrv.updatedDataSelection6("1");
          this.notifierService.notify("error", this.indErr.e20);
        }
      }
    },
      (err) => {
        this.appSrv.updatedDataSelection6("1");
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      });
  }

  resendOTP() {
    if (this.retryCount < 5) {
      console.log("Resend OTP req :: ", this.resendObj);
      this.resend = false;
      this.retryCount = this.retryCount + 1;
      this.appSrv.getOTP(this.resendObj).subscribe(
        (res) => {
          console.log("Resend OTP Res :: ", res);
          this.caseuid = res["d"]["CaseGuid"];
          this.enableResendButton = false;
          // this.otpRespObj = res["d"];
          this.resend = true;
          this.notifierService.notify("success", this.indErr.e19);
        },
        (err) => {
          this.appSrv.updatedDataSelection6("1");
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
    } else {
      // TO BE DONE -> SHOW MSG TO USER STATING THAT RETRY ATTEMPTS EXCEEDED - REDIRECT HIM TO SCREEN 1
      this.notifierService.notify("error", this.lang.errMsgs.mxLmt);
      this.router.navigate(["main/dashboard"]);
    }
  }

  submit(val) {

    console.log(val);
    console.log("FInal Req Obj :: ", this.requestObj);
    this.requestObj1 = JSON.parse(JSON.stringify(this.requestObj));
    // this.requestObj1["__metadata"] = [];
    // this.requestObj1["Nreg_CpersonSet"]["results"][0]["__metadata"] = [];
    this.requestObj1['Augrp'] = '111';
    this.requestObj1['Atype'] = '2';
    this.requestObj1['Ngotp'] = '1';
    this.requestObj1['Chkfg'] = '';
    this.requestObj1['Decfg'] = 'X';
    this.requestObj1['Regtype'] = '1';
    this.requestObj1["PasswordAng"] = val;
    this.requestObj1["Operationx"] = "01";
    this.requestObj1['StepNumberx'] = '00';
    this.requestObj1["Nreg_CpersonSet"] = this.removeResults(this.requestObj1["Nreg_CpersonSet"]);
    this.requestObj1["Nreg_IdSet"] = this.removeResults(this.requestObj1["Nreg_IdSet"]);
    this.requestObj1["Nreg_OutletSet"] = this.removeResults(this.requestObj1["Nreg_OutletSet"]);
    this.requestObj1["Nreg_ActivitySet"] = this.removeResults(this.requestObj1["Nreg_ActivitySet"]);
    this.requestObj1["Nreg_AddressSet"] = this.removeResults(this.requestObj1["Nreg_AddressSet"]);
    this.requestObj1["Nreg_ContactSet"] = this.removeResults(this.requestObj1["Nreg_ContactSet"]);
    this.requestObj1["Nreg_BtnSet"] = this.removeResults(this.requestObj1["Nreg_BtnSet"]);
    this.requestObj1["off_notesSet"] = this.removeResults(this.requestObj1["off_notesSet"]);
    this.requestObj1["Nreg_ShareholderSet"] = this.removeResults(this.requestObj1["Nreg_ShareholderSet"]);
    this.requestObj1["AttDetSet"] = this.removeResults(this.requestObj1["AttDetSet"]);
    this.requestObj1["Nreg_MSGSet"] = this.removeResults(this.requestObj1["Nreg_MSGSet"]);

    this.requestObj1["AttDetSet"] = [];

    this.requestObj1["Nreg_FormEdit"] = {};
    this.requestObj1["Taxtpdetermination"] = "4";
    this.requestObj1['Capregdt'] = null;
    let temp = this.charityForm.getRawValue().accounting;
    if (temp === '315A') temp = "1";
    if (temp === '315B') temp = "2";
    if (temp === '315C') temp = "3";
    this.requestObj1["Ngotp"] = temp;
    console.log("FInal Req Obj1 :: ", this.requestObj1);
    this.signupSrv.postNewRegSet(this.requestObj1).subscribe(response => {
      console.log(response);
      this.applicationNo = response["d"]["FbnumAngx"];
      this.compName = response["d"]["NameOrg1"];
      this.show = true;
    }, err => {
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
    })
  }

  removeResults(obj) {
    let a = [];
    obj["results"].filter(i => a.push(i));
    obj = [];
    obj = a;
    return obj;
  }

  tinValidation(value, flag) {
    if (value != "") {
      let first = value.substr(0, 1);
      if (first !== "3") {
        this.tinErr = true;
        this.tinMsg = this.vatErr.e12;
      } else {
        if (value.length === 10) {
          this.tinErr = false;
          if (flag) {
            this.getUserByTin(value);
          }
        } else {
          this.tinErr = true;
          this.tinMsg = this.vatErr.e13;
        }
      }
      console.log("tin");
    } else {
      this.tinErr = false;
    }
  }

  getUserByCompID(val) {
    if (this.f.companyId.valid) {
      this.byTin = true;
      let obj = {
        type: "ZS0005",
        idNumber: val,
      };
      this.vatSrv.getUserValidation(obj, "").subscribe(
        (res) => {
          console.log(res);
          if (
            res["d"]["Bpkind"] == 7 ||
            res["d"]["Bpkind"] == "" ||
            res["d"]["Bpkind"].includes("315")
            // true
          ) {
            if (res["d"]["Name1"] !== "" || res["d"]["Name2"] !== "") {
              this.charityForm
                .get("orgName")
                .patchValue(res["d"]["Name1"] + " " + res["d"]["Name2"]);
              this.charityForm.get("orgName").disable();
            }
            if (res["d"]["Tin"] !== "") {
              this.showTin = true;
              this.charityForm.get("tin").patchValue(res["d"]["Tin"]);
            }
          } else {
            this.notifierService.notify(
              "error",
              this.lang.errMsgs.companyTypeErr
            );
            this.charityForm.get("companyId").patchValue("");
          }
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
    }
  }

  complete() {
    // $("#address").modal("show");
    console.log("Branch Details Form :: ", this.branchDetailsForm);
    console.log("Activity Details Form :: ", this.activityDetailsForm);
    console.log("Comm Reg Form :: ", this.commercialRegForm);
    console.log("Address Details Form :: ", this.addressDetailsForm);
    console.log("Contact Details Form :: ", this.contactDetailsForm);
    //this.panelOpenState = true;

    if (this.crAccordion) {
      this.crAccordion.openAll();
    }
    if (this.licenseAccordion) {
      this.licenseAccordion.openAll();
    }


    if (this.stepper.selectedIndex == 0) {
      this.bFormSubmitted = true;
      if (this.branchDetailsForm.invalid) return;

      if (this.showContactDetails && !this.checkAttValidity('RG23')) {
        return
      }
      this.stepper.selected.completed = true;
      this.stepper.next(); return;
    }
    if (this.stepper.selectedIndex == 1) {
      if (!this.ls && !this.cr) {
        this.showErr = true;
        return;
      } this.showErr = false;
      this.acFormSubmitted = true;
      if (this.ls) {
        if (!this.checkMASelected() || this.activityDetailsForm.invalid || !this.checkAttValidity('RG02')) return;
        this.stepper.selected.completed = true;
      }
      if (this.cr) {
        if (!this.checkMASelected() || this.commercialRegForm.invalid || !this.checkAttValidity('RG01')) return;
        this.stepper.selected.completed = true;
      }
      if (!this.addressPrefilled && this.addressDetailsForm.invalid && this.addrList.length > 1) {
        $("#address").modal("show");
      }
      this.stepper.next(); return;
    }


    if (this.stepper.selectedIndex == 2) {
      this.addrFormSubmitted = true;
      if (this.addressDetailsForm.invalid) return;
      this.stepper.selected.completed = true;
      this.stepper.next();
      if (this.requestObj["Nreg_OutletSet"]["results"].length == 0 || this.outnm == "000") return
    }
    if (this.requestObj["Nreg_OutletSet"]["results"].length == 0 || this.outnm === "000") {
      if (this.stepper.selectedIndex == 3) {
        this.cFormSubmitted = true;
        if (this.contactDetailsForm.invalid || !this.checkAttValidity('RG11')) return;
      }
      this.stepper.selected.completed = true;
      this.stepper.next();
    }



    if (!this.editBranchFlag && this.checkMASelected() &&
      this.branchDetailsForm.valid &&
      this.addressDetailsForm.valid &&
      this.activityDetailsForm.valid &&
      this.commercialRegForm.valid &&
      (this.contactDetailsForm.valid ||
        this.requestObj["Nreg_OutletSet"]["results"].length > 0)
    ) {
      this.tempReqObj = JSON.parse(JSON.stringify(this.requestObj));
      if (this.cr) {
        // console.log(this.mapCRActivitySet());
        this.requestObj["Nreg_ActivitySet"]["results"].push(
          this.mapCRActivitySet()
        );
      }
      if (this.ls) {
        console.log(this.mapLSActivitySet());
        this.mapLSActivitySet().forEach((i) => {
          this.requestObj["Nreg_ActivitySet"]["results"].push(i);
        });
      }
      console.log(this.mapAddressSet());
      this.mapAddressSet().forEach((i) =>
        this.requestObj["Nreg_AddressSet"]["results"].push(i)
      );

      // Should be mapped only once for main outlet TBD
      if (this.requestObj["Nreg_OutletSet"]["results"].length == 0) {
        this.mapCPersonSet(this.requestObj["Nreg_CpersonSet"]["results"][0]);
        this.mapContactSet().forEach((i) =>
          this.requestObj["Nreg_ContactSet"]["results"].push(i)
        );
        this.requestObj["Nreg_IdSet"]["results"].push(this.mapIdSet());
      }

      let obj = this.mapOutletSet();
      console.log(obj);
      this.requestObj["Nreg_OutletSet"]["results"].push(obj);

      console.log("Activity Entered :: ", this.requestObj);
      this.getBusinessCommencementDate();
      this.saveOutletInfo();

    } else {
      //TBD
      if (this.editBranchFlag) {
        this.tempReqObj = JSON.parse(JSON.stringify(this.requestObj));
        this.updateActivitySet();
        this.updateAddressSet();

        if (this.outnm == '000') {
          this.updateCpersonSet();
          this.updateContactSet();
          this.updateIDSet();
        }

        this.updateOutletSet();
        // this.fillBranchDetailsTable();
        // this.close();
        this.getBusinessCommencementDate();
        this.saveOutletInfo();
        console.log("After Update :: ", this.requestObj)
      }
    }

  }

  close() {
    // this.stepper.reset();
    $("#addModal").modal("hide");
    this.resetForms();
    // this.requestObj = JSON.parse(JSON.stringify(this.tempReqObj));
    this.showContactDetails = this.requestObj["Nreg_OutletSet"]["results"].length == 0 ? true : false;
  }

  addLicense() {
    let control = <FormArray>this.activityDetailsForm.controls.license;
    if (control.length < 4) {
      this.activityType = 'ls';
      control.push(this.createForm());
      if (this.myFiles1[control.length - 1].length == 0) this.myFiles1[control.length - 1].push(this.createAttachment1('RG02'));
      this.attchIndex = control.length - 1;
    }
    console.log(control.length);
  }

  deleteAttachment(i) {
    let control = <FormArray>this.activityDetailsForm.controls.license;
    control.removeAt(i);
    this.myFiles1[i] = [this.createAttachment1('RG02')];
  }

  mapActivity(item, i, c: FormGroup) {
    console.log(c);
    if (
      c.controls[i].get("subGrpActivity").value == "" &&
      c.controls[i].get("mainGrpActivity").value == ""
    ) {
      c.controls[i]
        .get("subGrpActivity")
        .patchValue(item["IndSector"].substring(0, 4));
      c.controls[i]
        .get("mainGrpActivity")
        .patchValue(item["IndSector"].substring(0, 2));
    }
    // this.activityDetailsForm.controls.license[j]
  }

  // File upload - START

  // File upload - END
  conditionalValidator(
    condition: () => boolean,
    validator: ValidatorFn
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!condition()) {
        return null;
      }
      return validator(control);
    };
  }

  mapOutletSet() {
    var obj = new OutletSet();

    // if(this.requestObj[])
    if (this.requestObj["Nreg_OutletSet"]["results"].length > 0) {
      obj.Actcat = "S";
    } else {
      obj.Actcat = "M";
    }
    obj.Actnm = this.branchDetailsForm.value.branchName;
    obj.Actno = this.outletLength();
    obj.Caltp = "H";
    obj.Cmatt = this.requestObj["Nreg_OutletSet"]["results"].length > 0 ? "" : "X";
    obj.DataVersion = "00000";

    return obj;
  }

  mapLSActivitySet() {
    let a = [];
    this.act.license.value.forEach((i, k) => {
      var obj = new ActivitySet();
      obj.ActMgrp = i.mainGrpActivity;
      obj.ActSgrp = i.subGrpActivity;
      obj.Actcat = i.ma ? "M" : "S";
      obj.Activity = i.mainActivity;
      obj.Actno = this.editBranchFlag ? this.outnm : this.outletLength();
      obj.CityCode = i.issueCity;
      obj.Country = i.issueCountry;
      obj.City = this.cityList.filter(
        (j) => j.Country === obj.Country && j.CityCode === obj.CityCode
      )[0].CityName;
      obj.DataVersion = "00000";
      obj.Idnumber = i.licenseNumber;
      obj.Institute = i.issueBy;
      obj.Type = "ZS0004";
      obj.ValidDateFrom = this.commonValid.changeDate1(
        i.validFrom
      );
      obj.Srno = 0;
      obj.ValidDateTo = "/Date(253402214400000)/";

      a.push(obj);
    });
    return a;
  }

  mapCRActivitySet() {
    var obj = new ActivitySet();
    obj.ActMgrp = this.comReg["mainGrpActivity"].value;
    obj.ActSgrp = this.comReg["subGrpActivity"].value;
    obj.Actcat = this.comReg["ma"].value ? "M" : "S";
    obj.Activity = this.comReg["mainActivity"].value;
    if (this.editBranchFlag) {
      obj.Actno = this.outnm;
      obj.Crattfg = this.outnm == '000' ? "X" : '';
    } else {
      obj.Actno = this.outletLength();
      obj.Crattfg = this.outletLength() ? "X" : '';
    }
    obj.CityCode = this.commonValid.isNumber(this.comReg["issueCity"].value)
      ? this.comReg["issueCity"].value
      : "";
    obj.Country = this.commercialRegForm.getRawValue().issueCountry;
    obj.City = this.commonValid.isNumber(this.comReg["issueCity"].value)
      ? this.cityList.filter(
        (i) => i.Country === obj.Country && i.CityCode === obj.CityCode
      )[0].CityName
      : this.comReg["issueCity"].value;

    obj.Idnumber = this.comReg["crNumber"].value;
    obj.Institute = this.comReg["issueBy"].value;
    obj.Type = "BUP002";
    obj.ValidDateFrom = this.commonValid.changeDate1(
      this.comReg["validFrom"].value
    );
    obj.ValidDateTo = "/Date(253402214400000)/";
    console.log(obj);

    return obj;
  }

  mapAddressSet() {
    var obj = new AddressSet();
    let a = [];
    obj.AddrType = "XXDEFAULT";
    // obj.AddrType = "0001"; // TO BE CHECKED once again
    obj.Begda = this.commonValid.changeDate1(
      this.commonValid.toJulianDate1(new Date())
    );
    obj.Building = this.addressDetailsForm.value.blgNo;
    obj.Country = this.addressDetailsForm.value.country;
    obj.CityCode = this.addressDetailsForm.value.city;
    obj.City1 = this.cityList.filter(
      (i) => i.Country === obj.Country && i.CityCode === obj.CityCode
    )[0].CityName;
    obj.City2 = this.addressDetailsForm.value.district;
    obj.Sameasphy = "X";
    obj.Endda = "/Date(253402214400000)/";
    obj.Floor = this.addressDetailsForm.value.unitNo;
    obj.HouseNum2 = this.addressDetailsForm.value.additionalNo;
    obj.PostCode1 = this.addressDetailsForm.value.zipCode;
    obj.Region = this.addressDetailsForm.value.province;
    obj.Srcidentify = "O" + this.outletLength();
    obj.Street = this.addressDetailsForm.value.streetName;

    a.push(obj);

    let deepClone = JSON.parse(JSON.stringify(obj));
    deepClone.AddrType = "0001";
    a.push(deepClone);
    return a;
  }

  mapContactSet() {
    //WIP
    let a = [];
    var obj = new ContactSet();
    obj.Begda = this.commonValid.changeDate1(
      this.commonValid.toJulianDate1(new Date())
    );
    obj.Endda = "/Date(253402214400000)/";
    obj.Srcidentify = "C000";
    obj.Consnumber = "000";
    obj.Gpart = this.contactDetailsForm.getRawValue().tin;

    a.push(obj);
    let deepClone = JSON.parse(JSON.stringify(obj));
    deepClone.SmtpAddr = this.contactDetailsForm.getRawValue().email;
    deepClone.TelNumber = this.contactDetailsForm.getRawValue().mobNo;
    deepClone.R3User = "X";

    a.push(deepClone);
    return a;
  }

  mapCPersonSet(obj: CpersonSet) {
    //WIP

    // obj = new CpersonSet();
    obj.Srcidentify = "C" + this.outletLength(); // Derive it dynamically based on Outlet length
    obj.Outletnm = this.outletLength(); // Derive it dynamically based on Outlet length
    obj.Contacttp = "BUR001";
    obj.Cpoldfg = false;
    obj.Dobdt = this.commonValid.changeDate1(
      this.contactDetailsForm.getRawValue().dtofBirth
    );
    obj.Startdt = this.commonValid.changeDate1(this.contactDetailsForm.getRawValue().strtDt);
    obj.Enddt = "/Date(253402214400000)/";
    obj.Familynm = this.contactDetailsForm.getRawValue().lname;
    obj.Lastnm = this.contactDetailsForm.getRawValue().lname;
    obj.Firstnm = this.contactDetailsForm.getRawValue().fname;
    obj.Gmatt = true;
    obj.Gpart = this.contactDetailsForm.getRawValue().tin;

    console.log(obj);
  }

  mapIdSet() {
    var obj = new IdSet();
    obj.Type = this.contactDetailsForm.getRawValue().idType;
    obj.Idnumber = this.contactDetailsForm.getRawValue().idNumber;
    obj.Srcidentify = "C000"; // Derive dynamically based on Outlet length
    obj.Country = this.contactDetailsForm.getRawValue().issueCountry != null ? this.contactDetailsForm.getRawValue().issueCountry : '';
    return obj;
  }

  validateCR(val) {
    if (val && val.length == 10) {
      console.log(val);
      this.signupSrv.validateCR(val).subscribe((res) => {
        if (res["d"]["Excption"] == "X") {
          // this.notifierService.notify('Error', 'Invalid CR');
          // this.commercialRegForm.get('crNumber').patchValue('');
          return;
        }
        if (res["d"]["NotFound"] == "X") {
          this.notifierService.notify("error", this.lang.errMsgs.invldCR);
          this.commercialRegForm.get("crNumber").patchValue("");
          this.commercialRegForm.get('validFrom').patchValue(null);
          return;
        }
        this.prefillCRCityFlag = false;
        if (res["d"]["Issuedt"] != "") {
          let issueDt = +res["d"]["Issuedt"].substring(
            6,
            res["d"]["Issuedt"].length - 2
          );
          this.commercialRegForm
            .get("validFrom")
            .patchValue(this.commonValid.toJulianDate1(new Date(issueDt))); // TO BE DONE
        }
        if (this.selectedCalType != 'Gregorian') { // TO Change Date Based on Cal Type --- TBD
          this.commercialRegForm.get('validFrom').patchValue(this.commonValid.dateFormate(this.commercialRegForm.value.validFrom, 'Islamic'));
          this.getdateErr(this.commercialRegForm.value.validFrom)
        }
        this.commercialRegForm.get("validFrom").disable();
        if (res["d"]["CityAry"] != "") {
          this.commercialRegForm
            .get("issueCity")
            .patchValue(res["d"]["CityAry"]);
          this.commercialRegForm.get("issueCity").disable();
          this.commercialRegForm.get("issueCountry").disable();
          this.prefillCRCityFlag = true;
        }
        if (res["d"]["Crname"] !== "") {
          this.branchDetailsForm
            .get("branchName")
            .patchValue(res["d"]["Crname"]);
          this.branchDetailsForm.get("branchName").setErrors(null);
        }
        this.getAddress("BUP002", val);
      });
    }
  }

  getUserByTin(value) {
    this.byTin = true;
    this.idErr = false;
    this.vatService.getUserByTin(value).subscribe(
      (res) => {
        if (res["d"]["Idtype"] !== 'ZS0001' && res["d"]["Idtype"] !== 'ZS0002' && res["d"]["Idtype"] !== 'ZS0003'
          && res["d"]["Idtype"] !== 'FS0002') {
          this.tinErr = true;
          this.tinMsg = this.lang.errMsgs.companyTinErr;
          return;
        }
        this.tinErr = false;
        // this.idErr = false;
        if (res["d"]["Name1"] !== "") {
          this.contactDetailsForm.controls["fname"].patchValue(
            res["d"]["Name1"]
          );
          this.contactDetailsForm.controls["fname"].disable();
        }
        if (res["d"]["Name2"] !== "") {
          this.contactDetailsForm.controls["lname"].patchValue(
            res["d"]["Name2"]
          );
          this.contactDetailsForm.controls["lname"].disable();
        }
        if (res["d"]["Country"] !== "") {
          this.contactDetailsForm.controls["issueCountry"].patchValue(
            res["d"]["Country"]
          );
          this.contactDetailsForm.controls["issueCountry"].disable();
        }
        if (res["d"]["Mobile"] !== "") {
          this.contactDetailsForm.controls["mobNo"].patchValue(
            res["d"]["Mobile"]
          );
          this.contactDetailsForm.controls["mobNo"].disable();
        }
        if (res["d"]["Email"] !== "") {
          this.contactDetailsForm.controls["email"].patchValue(
            res["d"]["Email"]
          );
          this.contactDetailsForm.controls["email"].disable();
        } else {
          this.contactDetailsForm.controls["email"].disable();
          this.contactDetailsForm.controls["cnfrmEmail"].disable();
        }

        this.contactDetailsForm.controls["idNumber"].patchValue(
          res["d"]["Idnum"]
        );
        this.contactDetailsForm.controls["idType"].setValue(res["d"]["Idtype"]);
        if (res["d"]["Birthdt"] !== "" && res["d"]["Birthdt"] !== null) {
          let issueDt = +res["d"]["Birthdt"].substring(
            6,
            res["d"]["Birthdt"].length - 2
          );
          this.contactDetailsForm.controls["dtofBirth"].patchValue(
            this.commonValid.toJulianDate1(new Date(issueDt))
          );
          if (this.selectedCalType != 'Gregorian') { // TO Change Date Based on Cal Type --- TBD
            this.contactDetailsForm.get('dtofBirth').patchValue(this.commonValid.dateFormate(this.contactDetailsForm.value.dtofBirth, 'Islamic'));
            this.getdateErr(this.contactDetailsForm.value.dtofBirth)
          }
          this.contactDetailsForm.get('dtofBirth').disable();
        }
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  checkMA(i, actType) {
    let a = [];
    if (actType == 'cr') {
      this.commercialRegForm.get('ma').patchValue(true);
      for (var k in this.lcs.controls) {
        this.lcs.controls[k].get("ma").patchValue(false);
      }
    }

    if (actType == 'ls') {
      this.commercialRegForm.get('ma').patchValue(false);
      for (var k in this.lcs.controls) {
        this.lcs.controls[k].get("ma").patchValue(false);
      }
      this.lcs.controls[i].get("ma").patchValue(true);
    }
  }

  checkMASelected() {
    let flag;
    for (var i in this.act.license['controls']) {
      if (this.act.license['controls'][i].value.ma) {
        flag = true;
        return flag;
      } else {
        flag = false;
      }
    }
    if (!flag && this.commercialRegForm.get('ma').value) {
      flag = true;
    }
    return flag;
  }

  openModal() {
    this.commercialRegForm.get("issueBy").patchValue("90702");
    this.commercialRegForm.get("issueCountry").patchValue("SA");
    this.cr = false;
    this.ls = false;
    this.editBranchFlag = false;
    this.clearLSValidator();
    this.clearCRValidator();
    this.stepper.reset();
    this.outnm = this.outletLength()
    $("#addModal").modal("show");
  }

  outletLength() {
    let l;
    if (this.requestObj["Nreg_OutletSet"]["results"].length == 0) {
      l = this.requestObj["Nreg_OutletSet"]["results"].length;
    } else {
      this.requestObj["Nreg_OutletSet"]["results"].sort(function (a, b) { return b.Actno - a.Actno });
      l = +this.requestObj["Nreg_OutletSet"]["results"][0].Actno + 1;
    }

    if (l <= 9) {
      l = "00" + l;
      return l;
    }
    if (l > 9 && l <= 99) {
      l = "0" + l;
      return l;
    }

  }

  checkAttValidity(docType?, k?) {
    let j;
    if (i) {
      j = k;
    } else j = this.attchIndex;
    if (!docType) {
      for (var i in this.myFiles) {
        if (i !== "RG12") {
          if (!this.myFiles[i][0].Flag) {
            return false;
          }
        }
      }
    }
    if (docType !== 'RG12') {
      if (docType == 'RG02') {
        if (!this.myFiles1[j][0].Flag) {
          return false;
        } else { return true; }
      }
      if (docType !== 'RG02' && !this.myFiles[docType][0].Flag) {
        return false;
      } else { return true; }
    } else { return true; }

  }

  fillBranchDetailsTable() { // Need to check
    let records = this.requestObj["Nreg_ActivitySet"]["results"].filter(
      (i) => (i.Actcat == "M")
    );
    let a = [];
    for (var i in records) {
      let obj = {
        outnm: records[i].Actno,
        city: records[i].City,
        name: this.getOutletName(records[i].Actno),
        crLicense: records[i].Idnumber,
        type: records[i].Actno == "000" ? "MAIN" : "SUB",
      };
      if (this.lng == 'A') {
        obj.type = records[i].Actno == "000" ? "أساسي" : "فرعي";
      }
      a.push(obj);
    }
    let c = a.filter(i => i.outnm == '000')[0];
    a = a.filter(i => i.outnm != '000')
    a.unshift(c);
    this.dataSource = new MatTableDataSource(<any>a);
  }

  getOutletName(Actno) {
    return this.requestObj["Nreg_OutletSet"]["results"].filter(
      (i) => i.Actno == Actno
    )[0].Actnm;
  }

  resetForms() {
    this.branchDetailsForm.reset();
    this.activityDetailsForm.reset();
    this.commercialRegForm.reset();
    this.addressDetailsForm.reset();
    this.contactDetailsForm.reset();
    this.clearLSValidator();
    this.clearCRValidator();
    this.bFormSubmitted = false;
    this.cFormSubmitted = false;
    this.addrFormSubmitted = false;
    this.acFormSubmitted = false;
    this.prefillCRCityFlag = false;
    this.lcs.controls.splice(1, this.lcs.controls.length);
    this.cr = false;
    this.ls = false;
    this.commercialRegForm.get('issueCity').enable();
    this.commercialRegForm.get('issueCountry').enable();
    this.addressPrefilled = false;
    // this.storeFileDetails = this.myFiles;
    for (var i in this.myFiles) {
      // this.myFiles[i].filter( j => this.storeFileDetails[i].push(j));
      // this.storeFileDetails[i].push(this.myFiles[i]);
      if (i == 'RG02') {
        for (var k in this.myFiles1) {
          this.myFiles1[k] = [];
          this.myFiles1[k] = [this.createAttachment1(i)]
        }
      } else {
        this.myFiles[i] = [];
        this.myFiles[i] = [this.createAttachment1(i)];
      }
    }
  }

  deleteRow(i) {
    console.log(i);
    // if (this.dataSource.data[i].type == 'MAIN' || this.dataSource.data[i].type == 'فرعي') {
    //   this.notifierService.notify('error', "Main Outlet cannot be deleted");
    //   return
    // }
    let outnm = this.dataSource.data[i].outnm;
    let obj = {
      fbNum: this.requestObj["Fbnumx"],
      actnm: outnm,
      email: this.requestObj["PortalUsrx"],
    }
    this.signupSrv.deleteOutlet(obj).subscribe(res => {
      console.log(res);
      if (i > -1) {
        this.dataSource.data.splice(i, 1);
        this.dataSource.data = this.dataSource.data;
        // this.requestObj["Nreg_OutletSet"]["results"].splice(this.requestObj["Nreg_OutletSet"]["results"].findIndex(i => i.Actno = outnm), 1);
        this.requestObj["Nreg_OutletSet"]["results"] = this.requestObj["Nreg_OutletSet"]["results"].filter(i => i.Actno != outnm)
        for (var j in this.requestObj["Nreg_ActivitySet"]["results"]) {
          if (this.requestObj["Nreg_ActivitySet"]["results"][j].Actno == outnm) {
            this.requestObj["Nreg_ActivitySet"]["results"].splice(j, 1);
          }
        }
        // this.requestObj["Nreg_ActivitySet"]["results"].splice(this.requestObj["Nreg_OutletSet"]["results"].findIndex( i => i.Actno = outnm), 1);
        for (var k in this.requestObj["Nreg_AddressSet"]["results"]) {
          if (this.requestObj["Nreg_AddressSet"]["results"][k].Srcidentify == "O" + outnm) {
            this.requestObj["Nreg_AddressSet"]["results"].splice(k, 1);
          }
        }

      }
      console.log('Req Obj. After Delete :: ', this.requestObj);
    })

  }

  editBranch(i) {
    this.editBranchFlag = true;
    this.outnm = this.dataSource.data[i].outnm;
    this.showContactDetails = false;
    if (this.outnm == '000') {
      this.showContactDetails = true;
    }
    this.fetchBranchDetails(this.outnm);
    this.fetchActivityDetails(this.outnm);
    this.fetchAddressSet(this.outnm);
    this.fetchContactSet(this.outnm);
    this.fetchCpersonSet(this.outnm);
    this.fetchIDSet(this.outnm);
    this.fetchFiles(this.outnm);
    this.stepper.selectedIndex = 0;
    $("#addModal").modal("show");
  }

  fetchBranchDetails(outnm) {
    this.requestObj["Nreg_OutletSet"]["results"].filter(i => {
      if (i.Actno == outnm) {
        this.branchDetailsForm.get('branchName').patchValue(i.Actnm);
      }
    })
  }

  fetchActivityDetails(outnm) {
    this.requestObj["Nreg_ActivitySet"]["results"].filter(i => {
      if (i.Type == "BUP002" && i.Actno == outnm) {
        this.fetchCRActivity(i);
      }
    });
    let a = this.requestObj["Nreg_ActivitySet"]["results"].filter(i => i.Type == 'ZS0004' && i.Actno == outnm);
    if (a.length > 0) this.fetchLSActivity(a);
  }

  fetchAddressSet(outnm) {
    this.requestObj["Nreg_AddressSet"]["results"].filter(i => {
      if (i.Srcidentify.substr(1) == outnm && i.AddrType == "0001") {
        this.addressDetailsForm.patchValue({
          blgNo: i.Building,
          country: i.Country,
          city: i.CityCode,
          district: i.City2,
          unitNo: i.Floor,
          additionalNo: i.HouseNum2,
          zipCode: i.PostCode1,
          province: i.Region,
          streetName: i.Street,
        });
      }
    });
  }

  fetchCRActivity(i) {
    //TBD Prefill ACTIVIT DATA
    console.log(i);
    if (i.CityCode == '') {
      this.prefillCRCityFlag = true;
    }
    this.cr = true;
    this.commercialRegForm.get('validFrom').patchValue(
      this.commonValid.toJulianDate1(new Date(+i.ValidDateFrom.substring(6, i.ValidDateFrom.length - 2))));
    if (this.selectedCalType != 'Gregorian') { // TO Change Date Based on Cal Type --- TBD
      this.commercialRegForm.get('validFrom').patchValue(this.commonValid.dateFormate(this.commercialRegForm.value.validFrom, 'Islamic'));
      this.getdateErr(this.commercialRegForm.value.validFrom)
    }
    this.commercialRegForm.patchValue({
      crNumber: i.Idnumber,
      issueBy: i.Institute,
      issueCity: i.CityCode == '' ? i.City : i.CityCode,
      issueCountry: i.Country,
      ma: i.Actcat == 'M' ? true : false,
      mainActivity: i.Activity,
      mainGrpActivity: i.ActMgrp,
      subGrpActivity: i.ActSgrp,
      // validFrom: d,
      // copyOfCR: '',
      // transferCopy: '',
    });
  }

  fetchLSActivity(item) {
    //TBD Prefill ACTIVIT DATA
    this.ls = true;
    console.log(item);
    let length = item.length;
    let control = <FormArray>this.activityDetailsForm.controls.license;
    for (var k = 1; k < item.length; k++) {
      control.push(this.createForm());
    }

    for (var j in this.lcs.controls) {
      this.lcs.controls[j].get('validFrom').patchValue(
        this.commonValid.toJulianDate1(new Date(+item[j].ValidDateFrom.substring(6, item[j].ValidDateFrom.length - 2))));
      if (this.selectedCalType != 'Gregorian') { // TO Change Date Based on Cal Type --- TBD
        this.lcs.controls[j].get('validFrom').patchValue(this.commonValid.dateFormate(this.lcs.controls[j].value.validFrom, 'Islamic'));
        this.getdateErr(this.lcs.controls[j].value.validFrom)
      }
      this.lcs.controls[j].patchValue({
        licenseNumber: item[j].Idnumber,
        issueBy: item[j].Institute,
        issueCity: item[j].CityCode == '' ? item[j].City : item[j].CityCode,
        issueCountry: item[j].Country,
        ma: item[j].Actcat == 'M' ? true : false,
        mainActivity: item[j].Activity,
        mainGrpActivity: item[j].ActMgrp,
        subGrpActivity: item[j].ActSgrp,
        // validFrom: this.commonValid.toJulianDate1(new Date(+item[j].ValidDateFrom.substring(6, item[j].ValidDateFrom.length-2))),
      });
    }
  }

  fetchContactSet(outnm) {
    this.requestObj["Nreg_ContactSet"]["results"].filter(i => {
      if (i.Srcidentify.substr(1) == outnm && i.R3User == "X") {
        //TBD Prefill Contact DATA
        this.contactDetailsForm.patchValue({
          cnfrmEmail: i.SmtpAddr,
          // copyGMID: [{…}],
          email: i.SmtpAddr,
          // idNumber: null,
          // idType: null,
          // issueCountry: null,
          mobNo: i.TelNumber,
        });
      }
    });
  }

  fetchCpersonSet(outnm) {
    let obj = this.requestObj["Nreg_CpersonSet"]["results"][0]
    // TO BE FETCHED FROM ABOVE OBJECT
    this.contactDetailsForm.get('dtofBirth').patchValue(this.commonValid.toJulianDate1(new Date(+obj.Dobdt.substring(6, obj.Dobdt.length - 2))));
    this.contactDetailsForm.get('strtDt').patchValue(this.commonValid.toJulianDate1(new Date(+obj.Startdt.substring(6, obj.Startdt.length - 2))));
    if (this.selectedCalType != 'Gregorian') { // TO Change Date Based on Cal Type --- TBD
      this.contactDetailsForm.get('dtofBirth').patchValue(this.commonValid.dateFormate(this.contactDetailsForm.value.dtofBirth, 'Islamic'));
      this.getdateErr(this.contactDetailsForm.value.dtofBirth);
      this.contactDetailsForm.get('strtDt').patchValue(this.commonValid.dateFormate(this.contactDetailsForm.value.strtDt, 'Islamic'));
      this.getdateErr(this.contactDetailsForm.value.strtDt);
    }
    this.contactDetailsForm.patchValue({
      // cnfrmEmail: null,
      // copyGMID: [{…}],
      // dtofBirth: this.commonValid.toJulianDate1(new Date(+obj.Dobdt.substring(6, obj.Dobdt.length-2))),
      // email: null,
      fname: obj.Firstnm,
      // idNumber: null,
      // idType: null,
      // issueCountry: null,
      lname: obj.Lastnm,
      // mobNo: null,
      // strtDt: this.commonValid.toJulianDate1(new Date(+obj.Startdt.substring(6, obj.Startdt.length-2))),
      tin: obj.Gpart,
    });
  }

  fetchIDSet(outnm) {
    this.requestObj["Nreg_IdSet"]["results"].filter(i => {
      if (i.Srcidentify == 'C' + outnm) {
        // TO PREFILL ID NUMBER & TYPE
        this.contactDetailsForm.patchValue({
          idNumber: i.Idnumber,
          idType: i.Type,
          issueCountry: i.Country,
        });
      }
    })
  }

  updateActivitySet() {
    this.requestObj["Nreg_ActivitySet"]["results"] = this.requestObj["Nreg_ActivitySet"]["results"].filter(i => i.Actno != this.outnm);
    if (this.cr) {
      let obj = this.mapCRActivitySet();
      this.requestObj["Nreg_ActivitySet"]["results"].push(obj);
    }

    if (this.ls) {
      this.mapLSActivitySet().forEach((i) => {
        this.requestObj["Nreg_ActivitySet"]["results"].push(i);
      });
    }

  }

  updateOutletSet() {
    // this.requestObj["Nreg_OutletSet"]["results"].splice(this.requestObj["Nreg_OutletSet"]["results"].findIndex( i => i.Actno = this.outnm), 1);
    this.requestObj["Nreg_OutletSet"]["results"] = this.requestObj["Nreg_OutletSet"]["results"].filter(i => i.Actno != this.outnm);
    var obj = new OutletSet();
    if (this.outnm != '000') {
      obj.Actcat = "S";
    } else {
      obj.Actcat = "M";
    }
    obj.Actnm = this.branchDetailsForm.value.branchName;
    obj.Actno = this.outnm;
    obj.Caltp = "H";
    obj.Cmatt = this.outnm == '000' ? "X" : '';
    obj.DataVersion = "00000";

    this.requestObj["Nreg_OutletSet"]["results"].push(obj);

  }

  updateAddressSet() {
    this.requestObj["Nreg_AddressSet"]["results"] = this.requestObj["Nreg_AddressSet"]["results"].filter(i => i.Srcidentify.substr(1) != this.outnm);

    var obj = new AddressSet();
    obj.AddrType = "XXDEFAULT";
    // obj.AddrType = "0001"; // TO BE CHECKED once again
    obj.Begda = this.commonValid.changeDate1(
      this.commonValid.toJulianDate1(new Date())
    );
    obj.Building = this.addressDetailsForm.value.blgNo;
    obj.Country = this.addressDetailsForm.value.country;
    obj.CityCode = this.addressDetailsForm.value.city;
    obj.City1 = this.cityList.filter(
      (i) => i.Country === obj.Country && i.CityCode === obj.CityCode
    )[0].CityName;
    obj.City2 = this.addressDetailsForm.value.district;
    obj.Sameasphy = "X";
    obj.Endda = "/Date(253402214400000)/";
    obj.Floor = this.addressDetailsForm.value.unitNo;
    obj.HouseNum2 = this.addressDetailsForm.value.additionalNo;
    obj.PostCode1 = this.addressDetailsForm.value.zipCode;
    obj.Region = this.addressDetailsForm.value.province;
    obj.Srcidentify = "O" + this.outnm;
    obj.Street = this.addressDetailsForm.value.streetName;

    this.requestObj["Nreg_AddressSet"]["results"].push(obj);

    let deepClone = JSON.parse(JSON.stringify(obj));
    deepClone.AddrType = "0001";
    this.requestObj["Nreg_AddressSet"]["results"].push(deepClone);

    console.log("Updated Adressset :: ", this.requestObj["Nreg_AddressSet"]["results"]);
  }

  updateContactSet() {
    this.requestObj["Nreg_ContactSet"]["results"] = this.requestObj["Nreg_ContactSet"]["results"].filter(i => i.Srcidentify.substr(1) != this.outnm);

    let a = this.mapContactSet();
    a.forEach(i => this.requestObj["Nreg_ContactSet"]["results"].push(i));

  }

  updateIDSet() {
    this.requestObj["Nreg_IdSet"]["results"].splice(this.requestObj["Nreg_IdSet"]["results"].findIndex(i => i.Srcidentify.substr(1) == this.outnm), 1);
    var obj = new IdSet();
    obj.Type = this.contactDetailsForm.getRawValue().idType;
    obj.Idnumber = this.contactDetailsForm.getRawValue().idNumber;
    obj.Srcidentify = "C000"; // Derive dynamically based on Outlet length
    obj.Country = this.contactDetailsForm.getRawValue().issueCountry != null ? this.contactDetailsForm.getRawValue().issueCountry : "";
    this.requestObj["Nreg_IdSet"]["results"].push(obj);
  }

  updateCpersonSet() {
    this.requestObj["Nreg_CpersonSet"]["results"].pop();
    let obj = new CpersonSet();
    obj.Srcidentify = "C" + this.outnm; // Derive it dynamically based on Outlet length
    obj.Outletnm = this.outnm; // Derive it dynamically based on Outlet length
    obj.Contacttp = "BUR001";
    obj.Cpoldfg = false;
    obj.Dobdt = this.commonValid.changeDate1(
      this.contactDetailsForm.getRawValue().dtofBirth
    );
    obj.Startdt = this.commonValid.changeDate1(
      this.contactDetailsForm.getRawValue().strtDt
    );
    obj.Enddt = "/Date(253402214400000)/";
    obj.Familynm = this.contactDetailsForm.getRawValue().lname;
    obj.Lastnm = this.contactDetailsForm.getRawValue().lname;
    obj.Firstnm = this.contactDetailsForm.getRawValue().fname;
    obj.Gmatt = true;
    obj.Gpart = this.contactDetailsForm.getRawValue().tin;
    this.requestObj["Nreg_CpersonSet"]["results"].push(obj);

    console.log(obj);
  }

  IDtypeValidation(type, val, dt = '') {
    if (val == "") {
      this.contactDetailsForm.controls["dtofBirth"].patchValue(null);
      return;
    }
    if (type == "FS0002") {

    }
    if (type === "ZS0003") {
      if (this.commonValid.isNumber(val)) {
        if (
          val.length < 7 ||
          val.length > 15
        ) {
          this.idErr = true;
          this.idMsg = this.vatErr.e19;
        } else {
          this.idErr = false;
          this.getUserValidation(type, val, '');
        }
      } else {
        this.idErr = true;
        this.idMsg = this.vatErr.e20;
      }
    } else {
      let obj = {
        flag: false,
        msg: "",
      };
      obj = this.commonValid.IDtypeValidation(type, val);
      this.idErr = obj.flag;
      this.idMsg = obj.msg;
      this.getUserValidation(type, val, dt);
    }
  }

  getBusinessCommencementDate() {
    let a = [];
    let minDate = new Date("2006-01-01").getTime();
    this.requestObj["Nreg_ActivitySet"]["results"].forEach(i => a.push(new Date(+i.ValidDateFrom.substring(6, i.ValidDateFrom.length - 2)).getTime()));
    // a.push(minDate);
    if (a.length == 0) {
      this.facilityInfoForm.get('commencementDate').patchValue(null);
      return;
    }
    a.sort(function (a, b) { return a - b });
    if (a[0] < minDate) {
      this.commDateTickFormat = minDate;
      this.facilityInfoForm.get('commencementDate').patchValue(this.commonValid.toJulianDate1(new Date(minDate)));
    } else {
      this.commDateTickFormat = a[0];
      this.facilityInfoForm.get('commencementDate').patchValue(this.commonValid.toJulianDate1(new Date(a[0])));
    }
    this.formatCommencencementDate();
    this.requestObj["Commdt"] = "\/Date(" + this.commDateTickFormat + ")\/";
  }

  getAccountMethod(val) {
    if (val == 'E') {
      this.changeCalenderType(this.facilityInfoForm.get('calendarType').value);
      this.facilityInfoForm.get('endDay').disable();
      this.facilityInfoForm.get('endMonth').disable();
    }
    if (val == 'A') {
      this.facilityInfoForm.patchValue({
        endDay: '',
        endMonth: '',
        taxableDate: '',
      })
      // this.facilityInfoForm.get('endDay').enable();
      this.facilityInfoForm.get('endMonth').enable();
    }
    this.requestObj["Accmethod"] = val;
  }

  monthSelected(m) {
    console.log(m);
    if (this.lng == 'E') {
      this.days = JSON.parse(JSON.stringify(charityLabels.langz.eng.days));
    } if (this.lng == 'A') {
      this.days = JSON.parse(JSON.stringify(charityLabels.langz.arb.days));
    }
    this.facilityInfoForm.get('endDay').enable();
    this.facilityInfoForm.patchValue({
      endDay: '',
      taxableDate: ''
    })
    let obj = {
      ACaltype: this.facilityInfoForm.get('calendarType').value,
      AMonth: m,
      ADateComm: "\/Date(" + this.commDateTickFormat + ")\/"
    }
    this.signupSrv.getFiscalDate(obj).subscribe(res => {
      console.log(res);
      this.removeDays(res["d"]["EIslmedate"]);
    });
    console.log(obj);
    this.requestObj["Fdmonth"] = m;
  }

  daySelected(d) {
    console.log(d);
    let tdate;
    let obj = {
      ACaltype: this.facilityInfoForm.get('calendarType').value,
      ADateComm: "\/Date(" + this.commDateTickFormat + ")\/",
      AMonth: this.facilityInfoForm.getRawValue().endMonth,
      EIslmedate: d == 'LD' ? '32' : d,
    }
    this.signupSrv.getFiscalDate(obj).subscribe(res => {
      console.log(res);
      if (res["d"]["ACaltype"] == 'G') {
        tdate = res["d"]["EIsldate"].substr(6, 2) + '-' + res["d"]["EIsldate"].substr(4, 2) + '-' + res["d"]["EIsldate"].substr(0, 4);
        let tdate1 = res["d"]["EIsldate"].substr(0, 4) + '-' + res["d"]["EIsldate"].substr(4, 2) + '-' + res["d"]["EIsldate"].substr(6, 2);
        this.taxableDate = new Date(tdate1).getTime();
      }
      if (res["d"]["ACaltype"] == 'H') {
        tdate = res["d"]["ACommDate"].substr(6, 2) + '-' + res["d"]["ACommDate"].substr(4, 2) + '-' + res["d"]["ACommDate"].substr(0, 4);
        let tdate1 = res["d"]["EIsldate"].substr(0, 4) + '-' + res["d"]["EIsldate"].substr(4, 2) + '-' + res["d"]["EIsldate"].substr(6, 2);
        this.taxableDate = new Date(tdate1).getTime();
      }
      this.facilityInfoForm.get('taxableDate').patchValue(tdate);
      this.requestObj["Fdday"] = d;
      this.requestObj["Fdenddt"] = "\/Date(" + this.taxableDate + ")\/";
    });
    // this.requestObj["Fdday"] = d;
    // this.requestObj["Fdenddt"] = "\/Date(" + this.taxableDate + ")\/";

    console.log(obj);
  }

  changeCalenderType(c) {
    console.log(c);
    this.facilityInfoForm.get('calendarType').patchValue(c);
    if (!this.commDateTickFormat) return;
    this.formatCommencencementDate();
    if (c == 'G') {
      if (this.facilityInfoForm.get('accounting').value == 'E') {
        let obj1 = this.calculateFiscalDayMonth(this.commDateTickFormat);
        let obj = {
          ACaltype: c,
          ADateComm: "\/Date(" + this.commDateTickFormat + ")\/",
          AMonth: obj1.month,
          EIslmedate: obj1.day == 'LD' ? '32' : obj1.day,
        }
        this.signupSrv.getFiscalDate(obj).subscribe(res => {
          console.log(res);
          this.facilityInfoForm.patchValue({
            endDay: 'LD',
            endMonth: res["d"]["AMonth"],
          });
          this.facilityInfoForm.get('endDay').disable();
          this.facilityInfoForm.get('endMonth').disable();
          let tdate = res["d"]["EIsldate"].substr(6, 2) + '-' + res["d"]["EIsldate"].substr(4, 2) + '-' + res["d"]["EIsldate"].substr(0, 4);
          let tdate1 = res["d"]["EIsldate"].substr(0, 4) + '-' + res["d"]["EIsldate"].substr(4, 2) + '-' + res["d"]["EIsldate"].substr(6, 2);
          this.facilityInfoForm.get('taxableDate').patchValue(tdate);
          this.taxableDate = new Date(tdate1).getTime();
          this.requestObj["Fdenddt"] = "\/Date(" + this.taxableDate + ")\/";
          this.requestObj["Fdday"] = 'LD';
          this.requestObj["Fdmonth"] = res["d"]["AMonth"];
        });
      }
      if (this.facilityInfoForm.get('accounting').value == 'A') {
        if (this.facilityInfoForm.get('endDay').value != '') {
          this.daySelected(this.facilityInfoForm.get('endDay').value);
        }
      }
      this.requestObj["Fdcalender"] = '1';
    }
    if (c == 'H') {
      if (this.facilityInfoForm.get('accounting').value == 'E') {
        let obj1 = this.calculateFiscalDayMonth(this.commDateTickFormat);
        let obj = {
          ACaltype: c,
          ADateComm: "\/Date(" + this.commDateTickFormat + ")\/",
          AMonth: obj1.month,
          EIslmedate: obj1.day == 'LD' ? '32' : obj1.day,
        }
        this.signupSrv.getFiscalDate(obj).subscribe(res => {
          console.log(res);
          this.facilityInfoForm.patchValue({
            endDay: 'LD',
            endMonth: res["d"]["AMonth"],
          });
          this.facilityInfoForm.get('endDay').disable();
          this.facilityInfoForm.get('endMonth').disable();
          let tdate = res["d"]["ACommDate"].substr(6, 2) + '-' + res["d"]["ACommDate"].substr(4, 2) + '-' + res["d"]["ACommDate"].substr(0, 4);
          let tdate1 = res["d"]["EIsldate"].substr(0, 4) + '-' + res["d"]["EIsldate"].substr(4, 2) + '-' + res["d"]["EIsldate"].substr(6, 2);
          this.facilityInfoForm.get('taxableDate').patchValue(tdate);
          this.taxableDate = new Date(tdate1).getTime();
          // this.requestObj["Fdenddt"] = "\/Date(" + this.taxableDate + ")\/";
          this.requestObj["Fdenddt"] = "\/Date(" + this.taxableDate + ")\/";
          this.requestObj["Fdday"] = 'LD';
          this.requestObj["Fdmonth"] = res["d"]["AMonth"];
        });
      }
      if (this.facilityInfoForm.get('accounting').value == 'A') {
        if (this.facilityInfoForm.get('endDay').value != '') {
          this.daySelected(this.facilityInfoForm.get('endDay').value);
        }
      }
      this.requestObj["Fdcalender"] = '2';
    }

  }

  calculateFiscalDayMonth(val) {
    // val = 1136073600000;
    let date = new Date(val).toJSON();
    let mm = date.substr(5, 2);
    let dd = date.substr(8, 2);
    let obj = {
      day: '',
      month: ''
    }

    if (dd != '01') {
      if (this.facilityInfoForm.get('calendarType').value == 'G') {
        if (dd === '29' && mm == '02') { dd = (+dd - 2).toString(); }
        else { dd = (+dd - 1).toString(); }
      } else {
        dd = (+dd - 1).toString();
      }
      if (+dd < 10) { dd = '0' + dd; return { day: dd, month: mm }; }
      else { dd = '' + dd; return { day: dd, month: mm }; }
    }
    else if (dd == '01' && mm == '01') { return { day: 'LD', month: '12' }; }
    else {
      mm = (+mm - 1).toString();
      if (+mm < 10) {
        mm = '0' + mm; return { day: 'LD', month: mm };
      }
    }
  }

  removeDays(val) {
    if (val == '28' || val == '29') {
      // Remove days 29 and 30
      this.days.splice(this.days.findIndex(i => i.key == '29'), 1);
      this.days.splice(this.days.findIndex(i => i.key == '30'), 1);
    }
    else if (val == '30') {
      this.days.splice(this.days.findIndex(i => i.key == '30'), 1);
    }
    else if (val == '31') {
      // don’t remove anything
    }
  }

  formatCommencencementDate() {
    if (this.facilityInfoForm.get('calendarType').value == 'H') {
      let d = new Date(this.commDateTickFormat).toLocaleDateString("ar-u-ca-islamic", { year: 'numeric', month: '2-digit', day: '2-digit' });
      let a = d.split('');
      // let day = d.match(/\d+/)[0].length == 1 ? '0'+d.match(/\d+/)[0] : d.match(/\d+/)[0];
      // let month = d.match(/\d+/)[0].length == 1 ? d.substr(3,2) : d.substr(4,2);
      // month = month.includes('/') && month.indexOf('/') == 0 ? month.replace('/', '0') : month;
      // month = month.length == 1 ? '0'+ month : month;
      // let y = d.match(/\d/g).join('')

      let day = a[0] + a[1];
      let month = a[4] + a[5];
      let year = a[8] + a[9] + a[10] + a[11];
      this.facilityInfoForm.get('commencementDate').patchValue(day + '-' + month + '-' + year);
    }
    if (this.facilityInfoForm.get('calendarType').value == 'G') {
      let d = this.transformDate(this.commDateTickFormat);
      let day = d.substr(0, 2);
      let month = d.substr(3, 2);
      let year = d.substr(6, 4);
      this.facilityInfoForm.get('commencementDate').patchValue(day + '-' + month + '-' + year);
    }
  }

  getdateErr(d) {
    if (!d) {
      return;
    }
    let dateObj = new Date();
    console.log(dateObj.toLocaleDateString("ar-EG"));
    dateObj.setDate(dateObj.getDate() - 1);
    if (
      new Date(
        d["calendarStart"].year +
        "-" +
        d["calendarStart"].month +
        "-" +
        d["calendarStart"].day
      ) > dateObj
    ) {
      this.dobErr1 = true;
      this.dateMsg = this.indErr.e21;
    } else {
      this.dobErr1 = false;
      this.dateMsg = "";
    }
  }

  getUserValidation(type, id, dt) {
    if(!type || !id || !dt) { return; }
    let currentdate = '';
    let obj3 = {
      type: type,
      idNumber: id,
    };
    if (dt != '' && dt != undefined && dt != null) {
      let d = dt["calendarStart"];
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
      currentdate = d.year + "" + mnth + "" + day;
    }

    console.log("date", currentdate);
    this.vatService.getUserValidation(obj3, currentdate).subscribe(
      (res) => {
        this.fillContactDetailsForm(res);
      },
      (err) => {
        console.log(err.error);
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  fillContactDetailsForm(res) {
    if (res["d"]["Name1"] !== "") {
      this.contactDetailsForm.controls["fname"].patchValue(
        res["d"]["Name1"]
      );
      this.contactDetailsForm.controls["fname"].disable();
    }
    if (res["d"]["Name2"] !== "") {
      this.contactDetailsForm.controls["lname"].patchValue(
        res["d"]["Name2"]
      );
      this.contactDetailsForm.controls["lname"].disable();
    }
    if (res["d"]["Country"] !== "") {
      this.contactDetailsForm.controls["issueCountry"].patchValue(
        res["d"]["Country"]
      );
      this.contactDetailsForm.controls["issueCountry"].disable();
    }
    if (res["d"]["Mobile"] !== "") {
      this.contactDetailsForm.controls["mobNo"].patchValue(
        res["d"]["Mobile"]
      );
      this.contactDetailsForm.controls["mobNo"].disable();
    }
    if (res["d"]["Email"] !== "") {
      this.contactDetailsForm.controls["email"].patchValue(
        res["d"]["Email"]
      );
      this.contactDetailsForm.controls["email"].disable();
    }

    this.contactDetailsForm.controls["idNumber"].patchValue(
      res["d"]["Idnum"]
    );
    this.contactDetailsForm.controls["idType"].setValue(res["d"]["Idtype"]);
    if (res["d"]["Birthdt"] !== "" && res["d"]["Birthdt"] !== null) {
      let issueDt = +res["d"]["Birthdt"].substring(
        6,
        res["d"]["Birthdt"].length - 2
      );
      this.contactDetailsForm.controls["dtofBirth"].patchValue(
        this.commonValid.toJulianDate1(new Date(issueDt))
      );
      if (this.selectedCalType != 'Gregorian') { // TO Change Date Based on Cal Type --- TBD
        this.contactDetailsForm.get('dtofBirth').patchValue(this.commonValid.dateFormate(this.contactDetailsForm.value.dtofBirth, 'Islamic'));
        this.getdateErr(this.contactDetailsForm.value.dtofBirth)
      }
      this.contactDetailsForm.get('dtofBirth').disable();
    }
    if (res["d"]["Tin"] != '') {
      this.contactDetailsForm.controls["tin"].patchValue(res["d"]["Tin"]);
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

  // restrictAlphabets(e) {
  //   var x = e.which || e.keycode;
  //   var key = x.keyCode || x.which;
  //   key = String.fromCharCode(key);
  //   var regex = /^[:digit:]/
  //   if (x >= 48 && x <= 57 || regex.test(key)) return true;
  //   else return false;
  // }


  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if (x >= 48 && x <= 57) return true;
    else return false;
  }

  saveOutletInfo() {
    this.requestObj1 = JSON.parse(JSON.stringify(this.requestObj));

    this.requestObj1["Operationx"] = "05";
    this.requestObj1['StepNumberx'] = '03';
    this.requestObj1["Nreg_CpersonSet"] = this.removeResults(this.requestObj1["Nreg_CpersonSet"]);
    this.requestObj1["Nreg_IdSet"] = this.removeResults(this.requestObj1["Nreg_IdSet"]);
    this.requestObj1["Nreg_OutletSet"] = this.removeResults(this.requestObj1["Nreg_OutletSet"]);
    this.requestObj1["Nreg_ActivitySet"] = this.removeResults(this.requestObj1["Nreg_ActivitySet"]);
    this.requestObj1["Nreg_AddressSet"] = this.removeResults(this.requestObj1["Nreg_AddressSet"]);
    this.requestObj1["Nreg_ContactSet"] = this.removeResults(this.requestObj1["Nreg_ContactSet"]);
    this.requestObj1["Nreg_BtnSet"] = [];
    this.requestObj1["off_notesSet"] = [];
    this.requestObj1["Nreg_ShareholderSet"] = [];
    this.requestObj1["AttDetSet"] = []; // this.removeResults(this.requestObj1["AttDetSet"]);
    this.requestObj1["Nreg_MSGSet"] = [];

    // this.requestObj1["Nreg_IdSet"].push(this.pushCompanyID());
    this.requestObj1["Nreg_FormEdit"] = {};
    this.removeOtherActivities();
    console.log("FInal Req Obj1 :: ", this.requestObj1);
    this.signupSrv.postNewRegSet(this.requestObj1).subscribe(response => {
      console.log(response);
      this.requestObj["FbnumAngx"] = response["d"]["FbnumAngx"];
      this.ErrWhileSaving = false;
      this.fillBranchDetailsTable();
      // this.getBusinessCommencementDate();
      this.close();
    }, err => {
      this.ErrWhileSaving = true;
      this.requestObj = JSON.parse(JSON.stringify(this.tempReqObj));
      this.getBusinessCommencementDate();
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
    })
  }

  fetchFiles(outnm) {
    if (outnm == "000") {
      this.myFiles['RG23'] = this.storeFileDetails['RG23'];
      this.myFiles['RG11'] = this.storeFileDetails['RG11'];
      if (this.myFiles['RG23'].length == 0) this.myFiles['RG23'].push(this.createAttachment1('RG23'));
      if (this.myFiles['RG11'].length == 0) this.myFiles['RG11'].push(this.createAttachment1('RG11'));
      if (this.myFiles['RG23'].length > 0) {
        if (this.myFiles['RG23'].filter(i => i.Flag == false).length == 0) this.myFiles['RG23'].push(this.createAttachment1('RG23'));
      }
      if (this.myFiles['RG11'].length > 0) {
        if (this.myFiles['RG11'].filter(i => i.Flag == false).length == 0) this.myFiles['RG11'].push(this.createAttachment1('RG11'));
      }
    }
    this.checkStoredFiles();
    this.myFiles['RG01'] = this.storeFileDetails["RG01"].length > 0 ?
      this.storeFileDetails["RG01"].filter(i => i.OutletRef.substring(0, 3) == outnm) : [this.createAttachment1('RG01')];
    // this.myFiles['RG02'] = this.storeFileDetails["RG02"].filter( i => i.OutletRef.substring(0,3) == outnm);
    if (this.myFiles['RG01'].length == 0) this.myFiles['RG01'].push(this.createAttachment1('RG01'))
    if (this.myFiles['RG01'].length > 0) {
      if (this.myFiles['RG01'].filter(i => i.Flag == false).length == 0) this.myFiles['RG01'].push(this.createAttachment1('RG01'));
    }

    this.myFiles['RG12'] = this.storeFileDetails["RG12"].length > 0 ?
      this.storeFileDetails["RG12"].filter(i => i.OutletRef.substring(0, 3) == outnm) : [this.createAttachment1('RG12')];
    if (this.myFiles['RG12'].length == 0) this.myFiles['RG12'].push(this.createAttachment1('RG12'))
    if (this.myFiles['RG12'].length > 0) {
      if (this.myFiles['RG12'].filter(i => i.Flag == false).length == 0) this.myFiles['RG12'].push(this.createAttachment1('RG12'));
    }

    for (var i in this.myFiles1) {
      this.myFiles1[i] = this.storeFileDetails1[i].length > 0 ?
        this.storeFileDetails1[i].filter(i => i.OutletRef.substring(0, 3) == outnm) : [this.createAttachment1('RG02')];
      if (this.myFiles1[i].length == 0) this.myFiles1[i].push(this.createAttachment1('RG02'))
      if (this.myFiles1[i].length > 0) {
        if (this.myFiles1[i].filter(i => i.Flag == false).length == 0) this.myFiles1[i].push(this.createAttachment1('RG02'));
      }
    }
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  getAddress(type, id) {
    this.signupSrv.getAddress(type, id).subscribe(
      (res) => {
        console.log("Address", res);
        //this.individualDto = res["d"]["results"][0];
        if (res["d"]["results"].length === 1) {

          res["d"]["results"].forEach((element) => {
            element["flag"] = true;
          });
          this.addrList = res["d"]["results"];
          this.pushData();
        } else {
          res["d"]["results"].forEach((element) => {
            element["flag"] = false;
            // this.individualDto1.push(element);
          });
          this.addrList = res["d"]["results"];
        }
      },
      (err) => {

        // this.notifierService.notify(
        //   "error",
        //   err.error.error.innererror.errordetails[0].message
        // );
      }
    );
  }

  open() {
    $("#address").modal("show");
  }

  mapTinTan(type, val) {
    var obj = new IdSet();
    obj.Type = type;
    obj.Idnumber = val;
    obj.Srcidentify = "C000"; // Derive dynamically based on Outlet length
    return obj;
  }

  pushData() {
    console.log("Addr List", this.addrList);
    this.addrList.filter(i => {
      if (i.flag) {
        this.addressDetailsForm.patchValue({
          country: 'SA',
          province: i.CityName !== '' ? this.cityList.filter(k => k.CityName == i.CityName)[0].Region : '',
          city: i.CityName !== '' ? this.cityList.filter(k => k.CityName == i.CityName)[0].CityCode : '',
          district: i.DistrictName.substring(0, 10),
          streetName: i.StreetName,
          blgNo: i.BuildingNo,
          zipCode: i.Zipcode,
          additionalNo: i.AdditionalNo,
          unitNo: i.UnitNo,
        });
      }
    });
    this.addressPrefilled = true;
    $("#address").modal("hide");
  }

  addrSelection(i) {
    this.addrList.filter(k => k.flag = false)
    this.addrList[i].flag = true;
  }

  stepControl2() {
    if (!this.ls && !this.cr) {
      return false;
    }
    if (this.ls) {
      if (!this.checkMASelected() || this.activityDetailsForm.invalid || !this.checkAttValidity('RG02')) {
        return false;
      }
    }
    if (this.cr) {
      if (!this.checkMASelected() || this.commercialRegForm.invalid || !this.checkAttValidity('RG01')) {
        return false;
      }
      // this.stepper.selected.completed = true;
      // if (!this.addressPrefilled && this.addressDetailsForm.invalid && this.addrList.length > 1) {
      //   $("#address").modal("show");
      // }
    }
    return true;
  }

  onChangeCC(cc, val) {
    console.log(val);
    this.maxLength = 15 - (cc["Telefto"].length + 2);
    if (val.value.length < this.maxLength) {
    } else val.setValue("");
    // this.name = val;
  }

  removeOtherActivities() {
    this.requestObj1["Nreg_AddressSet"] = this.requestObj1["Nreg_AddressSet"].filter(i => i.Srcidentify.substring(1, 4) == this.outnm);
    this.requestObj1["Nreg_OutletSet"] = this.requestObj1["Nreg_OutletSet"].filter(i => i.Actno == this.outnm);
    this.requestObj1["Nreg_ActivitySet"] = this.requestObj1["Nreg_ActivitySet"].filter(i => i.Actno == this.outnm);
  }

  pushCompanyID() {
    let obj = new IdSet();
    obj.Idnumber = this.charityForm.get('companyId').value;
    obj.Srcidentify = "000";
    obj.Type = "ZS0005";
    obj.ValidDateFrom = null;
    obj.ValidDateTo = null;

    return obj;
  }

  autoFillActivities(item, form) {
    console.log(item);
    console.log(form);
    form.subGrpActivity.patchValue(item.IndSector.substr(0, 4));
    form.mainGrpActivity.patchValue(item.IndSector.substr(0, 2));
  }

  stepControl1() {
    if (this.branchDetailsForm.invalid) return false;

    if (!this.checkAttValidity('RG23') && this.showContactDetails) {
      return false
    }

    return true;
  }

  deleteOutletPopup(index) {
    this.outnm = this.dataSource.data[index].outnm;
    $("#deleteOutlet").modal("show");
    this.outletIndex = index;
  }

  checkValidTin() {
    this.contactDetailsForm.patchValue({
      idType: "",
      issueCountry: "",
      idNumber: "",
      dtofBirth: null,
      fname: "",
      lname: "",
      strtDt: this.enddate,
      mobNo: "",
      email: "",
      cnfrmEmail: ""
    });
    this.contactDetailsForm.enable();
  }

  getFileDetails1(e, docType, fc) {
    let temp;
    if (!e.target) {
      temp = e;
    } else temp = e.target.files;
    const parseExt = temp[0]['name'].split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();

    if (fileExt !== 'doc' && fileExt !== 'docx' && fileExt !== 'jpeg' && fileExt !== 'jpg' && fileExt !== 'pdf' && fileExt !== 'xls' && fileExt !== 'xlsx') {
      this.notifierService.notify('error', this.lang.errMsgs.fileType);
      return;
    }
    //console.log (e.target.files);
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].size > 0 && temp[i].size < 10485760) {
        temp[i]['docType'] = docType;
        docType == 'RG02' ? this.myFiles1[this.attchIndex].pop() : this.myFiles[docType].pop();
        docType == 'RG02' ? this.myFiles1[this.attchIndex].push(temp[i]) : this.myFiles[docType].push(temp[i]);
      } else {
        this.notifierService.notify("error", this.lang.errMsgs.fileError);
        return;
      }
    }

    this.uploadFiles1(temp[0], docType, fc);
    // console.log(this.myFiles);
    this.fileNames = [];
    for (var i = 0; i < this.myFiles[docType].length; i++) {
      let n = this.myFiles[docType][i]["name"];
      this.fileNames.push(n);
    }
    let control = <FormArray>fc;
    // console.log(control.controls[id]["controls"]);
  }

  uploadFile1(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      // console.log(element);
      let obj = {
        name: element.name,
        size: (element.size / 1024 / 1024).toFixed(2),
      };
      let extn = obj["name"].substr(obj["name"].indexOf(".") + 1);
      // if (parseInt(obj.size) <= 5) {
      //   this.files[i] = obj;
      // }
    }
  }

  uploadFiles1(file, docType, fc) {
    let control = <FormArray>fc;
    const frmData = new FormData();
    let filename;
    // for (var i = 0; i < this.myFiles.length; i++) {
    filename = file["name"];
    frmData.append("fileUpload", file);
    // }
    const parseExt = filename.split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();

    if (fileExt !== 'doc' && fileExt !== 'docx' && fileExt !== 'jpeg' && fileExt !== 'jpg' && fileExt !== 'pdf' && fileExt !== 'xls' && fileExt !== 'xlsx') {
      this.notifierService.notify('error', this.lang.errMsgs.fileType);
      return;
    }
    if (file.size == 0) {
      this.notifierService.notify("error", this.lang.errMsgs.minFileSizeError);
      return;
    }
    if (file.size > 10485760) {
      this.notifierService.notify("error", this.lang.errMsgs.fileError);
      return;
    }
    // console.log("res", filename, this.myFiles);
    this.signupSrv
      .attachmentSubmit
      (
        this.returnId,
        docType,
        filename,
        file,
        this.crorlsNo
      )
      .subscribe(
        (res) => {
          // console.log("upload", res);
          control.controls[0]["controls"].name.setValue(filename);
          control.controls[0]["controls"].flag.setValue(true);
          control.controls[0]["controls"].url.setValue(res["d"]["DocUrl"]);
          control.controls[0]["controls"].did.setValue(res["d"]["Doguid"]);
          control.controls[0].value.id
          // this.notifierService.notify(
          //   "success",
          //   this.lang.successMsg
          // );
          res['d']['Dotyp'] = docType;
          res['d']['Flag'] = true;
          if (res["d"]["OutletRef"] == '' && this.crorlsNo != '') {
            res["d"]["OutletRef"] = this.crorlsNo;
          }
          let l = docType == 'RG02' ? this.myFiles1[this.attchIndex].length - 1 : this.myFiles[docType].length - 1;
          let c = {
            ...res['d'],
            lastModified: docType == 'RG02' ? this.myFiles1[this.attchIndex][l].lastModified : this.myFiles[docType][l].lastModified,
            lastModifiedDate: docType == 'RG02' ? this.myFiles1[this.attchIndex][l].lastModifiedDate : this.myFiles[docType][l].lastModifiedDate,
            size: docType == 'RG02' ? this.myFiles1[this.attchIndex][l].size : this.myFiles[docType][l].size,
            did: res["d"]["Doguid"],
            docUrl: res["d"]["DocUrl"],
            // OutletRef: this.crorlsNo,
          }
          if (docType == 'RG01' || docType == 'RG02' || docType == 'RG12') {
            c['OutletRef'] = this.crorlsNo
          }
          if (docType == 'RG02') {
            this.storeFileDetails1[this.attchIndex].push(c);
            this.myFiles1[this.attchIndex].pop();
            this.myFiles1[this.attchIndex].push(c);
            if (this.myFiles1[this.attchIndex].length <= 5) {
              this.myFiles1[this.attchIndex].push(this.createAttachment1(docType));
              this.tempFiles = this.myFiles1[this.attchIndex];
              // control.push(this.createAttachment());
            }
          } else {
            this.storeFileDetails[docType].push(c);
            this.myFiles[docType].pop();
            this.myFiles[docType].push(c);
            if (this.myFiles[docType].length <= 5) {
              this.myFiles[docType].push(this.createAttachment1(docType));
              // control.push(this.createAttachment());
            }
            this.tempFiles = this.myFiles[docType];
          }
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
          // this.disableContinue = true;
        }
      );
  }

  createAttachment1(docType) {
    return {
      Dotyp: docType,
      Flag: false,
    };
  }

  openAttachModal(docType, fc, crorlsNo?, index?) {
    if (docType == 'RG02') {
      this.tempFiles = this.myFiles1[index];
      if (this.editBranchFlag) {
        this.tempFiles = this.myFiles1[index].length == 0 ? [this.createAttachment1(docType)] :
          this.myFiles1[index].filter(i => i.Flag ? i.OutletRef.substring(0, 3) == this.outnm : '');
        if (this.tempFiles.length == 0) this.tempFiles.push(this.createAttachment1(docType));
        if (this.tempFiles.length > 0 && this.tempFiles.length < 5) {
          if (this.tempFiles.filter(i => i.Flag == false).length == 0) {
            this.tempFiles.push(this.createAttachment1(docType));
          }
        }
      }
      this.attchIndex = index;
    } else {
      this.tempFiles = this.myFiles[docType];
      if (this.editBranchFlag) {
        if (docType == 'RG23' || docType == 'RG11') { this.tempFiles = this.myFiles[docType].length == 0 ? [this.createAttachment1(docType)] : this.myFiles[docType]; }
        if (docType == 'RG01' || docType == 'RG12') {
          this.tempFiles = this.myFiles[docType].length == 0 ? [this.createAttachment1(docType)] : this.myFiles[docType];
        }
        // if(this.tempFiles.length == 0) this.tempFiles.push(this.createAttachment1(docType));
        // if(this.tempFiles.length > 0 && this.tempFiles.length < 5) {
        //   if(this.tempFiles.filter( i => i.Flag == false).length == 0){
        //     this.tempFiles.push(this.createAttachment1(docType));
        //   }
        // }
      }
    }


    this.modalTitle = this.getTitle(docType);
    this.fc = fc;
    (crorlsNo != '' && crorlsNo != undefined) ? this.crorlsNo = this.outnm + "-" + crorlsNo : this.crorlsNo = '';
    $("#attch").modal("show");
  }

  getTitle(docType) {
    switch (docType) {
      case 'RG23': {
        return this.lang.c11.in2;
      }
      case 'RG01': {
        return this.lang.c12.in12;
      }
      case 'RG12': {
        return this.lang.c12.in10;
      }
      case 'RG02': {
        return this.lang.c12.in6;
      }
      case 'RG11': {
        return this.lang.c14.in11;
      }
    }
  }

  deleteAttachmentFromSer(val1, val2, i?) {
    this.vatService.deleteAttachment(val1, val2).subscribe((res) => {
      // console.log("delere", res);
      if (val1 == 'RG02') {
        this.myFiles1[i] = this.myFiles1[i].filter(k => k.did != val2);
        // this.tempFiles = this.myFiles1[i];
        if (this.tempFiles.filter(j => j.did == val2).length > 0) {
          this.tempFiles = this.tempFiles.filter(k => k.did != val2);
        }
        if (this.storeFileDetails1[i].filter(k => k.did == val2).length > 0) {
          this.storeFileDetails1[i] = this.storeFileDetails1[i].filter(k => k.did != val2);
        }
      } else {
        this.myFiles[val1] = this.myFiles[val1].filter(j => j.did != val2);
        // this.tempFiles = this.myFiles1[val1];
        if (this.tempFiles.filter(j => j.did == val2).length > 0) {
          this.tempFiles = this.tempFiles.filter(k => k.did != val2);
        }
        if (this.storeFileDetails[val1].filter(k => k.did == val2).length > 0) {
          this.storeFileDetails[val1] = this.storeFileDetails[val1].filter(k => k.did != val2);
        }
      }
    });
  }

  checkStoredFiles() {
    for (var i in this.storeFileDetails) {
      if (this.storeFileDetails[i].length > 0) this.storeFileDetails[i] = this.storeFileDetails[i].filter(i => i.Flag != false);
    }
    for (var i in this.storeFileDetails1) {
      if (this.storeFileDetails1[i].length > 0) this.storeFileDetails1[i] = this.storeFileDetails1[i].filter(i => i.Flag != false);
    }
  }
  downloadAttachment(attObj) {
    return;
    console.log("attObj", attObj);
    this.signupSrv.downloadAttachment(attObj.docUrl).subscribe(
      (res: any) => {
        console.log("res", res);
        FileSaver.saveAs(res, attObj.Filename);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }


}
