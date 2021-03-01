import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { WarehouseService } from '../warehouse.service';
import { renewalwarehouseconstants } from "src/app/main/excise-services/warehouse/reneual-warehouse/renewal-warehouseconstants.model";
import { NotifierService } from "angular-notifier";
import * as FileSaver from 'file-saver';
import { CommonValidation } from 'src/app/constants/commonValidations';
import { AppService } from "src/app/app.service";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { FlexAlignStyleBuilder } from '@angular/flex-layout';
declare var $;
declare var jQuery: any;
@Component({
  selector: 'app-reneual-warehouse',
  templateUrl: './reneual-warehouse.component.html',
  styleUrls: ['./reneual-warehouse.component.css']
})
export class ReneualWarehouseComponent implements OnInit, AfterViewInit {
  Step: any = 1;
  GPartz: any;
  Direction: string;
  Language: string;
  CurrentDate = new Date();
  iswhOwnership: boolean = false;
  isCompany: boolean = false;
  isIndividual: boolean = false;
  OwnerTypeName: any;
  isOwnerType: any;
  OwnerIdTypeName: any;
  CountrySet: any;
  OwnerNationalityName: any;
  OwnershipAttachFiles: any[] = [];
  DimensionAttachFiles: any[] = [];
  OtherReasonValue: any[] = [];
  TypeandProductFlag = false;
  WareHouseDimensionsFlag = false;
  WareHouseIdentificationFlag = false;
  WareHouseManagerInfoFlag = false;
  WareHouseOwnerShipFlag = false;
  BankGuranteeInfoFlag = false;
  summaryagree: any = false;
  isWHManagerInfo: boolean = false;
  isWHOwnershipInfo: boolean = false;
  isWHDeclarationInfo: boolean = false;
  idTypeflag: any = "0";

  @ViewChild('confirm', { static: false }) confirm: ElementRef;
  @ViewChild('proceed', { static: false }) proceed: ElementRef;
  @ViewChild('instructions', { static: false }) instructions: ElementRef;
  @ViewChild('errors', { static: false }) errors: ElementRef;
  InstructionFormGroup: FormGroup = new FormGroup({});
  WarehouseInformation: FormGroup = new FormGroup({});
  WarehouseOwnerShip: FormGroup = new FormGroup({});
  IdTypeOwnerShipFormgroup: FormGroup;
  WarehouseIsIndividualOwnerShip: FormGroup = new FormGroup({});
  WarehouseIsCompanyOwnerShip: FormGroup = new FormGroup({});
  WarehouseDimensions: FormGroup = new FormGroup({});
  TypeProductForm: FormGroup = new FormGroup({});
  WarehouseManagerInformation: FormGroup = new FormGroup({});
  BankGuaranteeInformation: FormGroup = new FormGroup({});
  WarehouseInformationFormGroup: FormGroup = new FormGroup({});
  DeclarationFormGroup: FormGroup = new FormGroup({});
  WarehouseIdentication: FormGroup = new FormGroup({});
  WarehouseManagerInfoFormControls1: FormGroup = new FormGroup({});
  WarehouseManagerInfoFormControls2: FormGroup = new FormGroup({});
  DeclarationFormControls: FormGroup = new FormGroup({});
  WarehouseInfoModel = new WarehouseInfoModel();
  WarehouseData = new WarehouseDetailsModel();
  WarehouseIdentificationModel = new WarehouseIdentificationModel();
  WarehouseOwnerShipModel = new WarehouseOwnerShipModel();
  WarehouseDimensionsModel = new WarehouseDimensionsModel();
  WarehouseManagerInfoModel = new WarehouseManagerInfoModel();
  DeclarationInfoModel = new DeclarationInfoModel();
  BankInfoModel = new BankInfoModel();
  WareHouseDetails: any;
  isCard: string = 'No';
  isCard1: string = 'No';
  isCardTP: string = '0';
  isCardWD: string = '0';
  isCardWI: string = '0';
  isCardWM: string = '0';
  isCardWO: string = '0';
  isCardBG: string = '0';
  licenserenewal: string = 'No';
  OwnerTypeList: any;
  UsagePurposeList: any;
  AdditionalName1: any;
  AdditionalName2: any;
  AdditionalName3: any;
  AdditionalName4: any;

  Additional1: boolean = false;
  Additional2: boolean = false;
  Additional3: boolean = false;
  Additional4: boolean = false;

  AdditionalTextarea1: boolean = false;
  AdditionalTextarea2: boolean = false;
  AdditionalTextarea3: boolean = false;
  AdditionalTextarea4: boolean = false;

  isUploaded1: boolean = false;
  isUploaded2: boolean = false;
  isUploaded3: boolean = false;
  isUploaded4: boolean = false;

  UploadFiles1: any[] = [];
  UploadFiles2: any[] = [];
  UploadFiles3: any[] = [];
  UploadFiles4: any[] = [];

  AdditionalNotes1: any;
  AdditionalNotes2: any;
  AdditionalNotes3: any;
  AdditionalNotes4: any;

  AdditionalList: any;
  IdTypeList: any;
  DraftList: any;
  WarehouseList: any;
  // ProductHeader = [
  //   {
  //     "Key": "",
  //     "Text": ""
  //   },
  //   {
  //     "Key": "01",
  //     "Text": "Manufacturing & Storage of the Excise Goods"
  //   },
  //   {
  //     "Key": "02",
  //     "Text": "Storage of the Excise Goods"
  //   }
  // ]
  // LeasedList = [
  //   {
  //     "Key": "",
  //     "Text": ""
  //   }, {
  //     "Key": "1",
  //     "Text": "Yes"
  //   }, {
  //     "Key": "0",
  //     "Text": "No"
  //   }
  // ];
  // wareHsLease = [
  //   {
  //     "Key": "",
  //     "Text": ""
  //   },
  //   {
  //     "Key": "I",
  //     "Text": "Individual"
  //   },
  //   {
  //     "Key": "C",
  //     "Text": "Company"
  //   }
  // ]

  // oIdType1 = [
  //   {
  //     "Key": "",
  //     "Text": ""
  //   },
  //   {
  //     "Key": "ZS0001",
  //     "Text": "National ID"
  //   },
  //   {
  //     "Key": "ZS0002",
  //     "Text": "Iqama ID"
  //   },
  //   {
  //     "Key": "ZS0003",
  //     "Text": "GCC ID"
  //   }
  // ]

  // TaxGoodType = [
  //   {
  //     "Key": "MV",
  //     "Text": "Moved Goods"
  //   }, {
  //     "Key": "ST",
  //     "Text": "Stored Goods"
  //   },
  //   {
  //     "Key": "RL",
  //     "Text": "Goods Released for Consumption"
  //   }
  // ]
  attachmentError: boolean = false;
  errorMessage: any;
  fileSizeError: boolean = false;
  WareHouseDetailsItemSaveData: any;
  WholeData: any;
  WareHouseNoDropdown: any;
  Purpose: any;
  GoodsType: any;
  ValidFromWarehouseIdentity: any;
  StringPattern = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";
  ContactNoPattern = "[5][0-9]{8}";
  // DecimalPointPattern = "/^\d*\.?\d*$/";
  // DecimalPointPattern="[0-9]+(\.[0-9][0-9]?)?";
  Alphanumeric = '^[a-zA-Z0-9][a-zA-Z0-9 ]+$';
  DecimalPointPattern = "^[0-9]+(\.[0-9]{1,57})?$";
  DecimalPointTwoPattern = '^[0-9]{1,5}(?:\[.][0-9]{1,2})?$';
  DecimalNegPosiPointPattern: "^-?[0-9]+(\.[0-9]{1,57})?$";
  NumberPattern = "^[0-9]*$";
  EmailPattern = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
  DimesnionsPattern = "/^-?(0|[1-9]\d*)?$/";
  RegionDistrictList: any;
  CityList: any;
  WhAddressSet: any;
  CountrySetList: any;
  WH_CONTACTPSet: any;
  WH_CONTACT_DTLSet: any;
  TitleSet: any;
  DropGoodsSet: any;
  UnitMSet: any;
  WH_GOODSDTLSet: any;
  RetailSet: any;
  BankRSPValueTotal: any;
  BankGuaranteeValue: any;
  TaxRateSet: any;
  ProductSet: any;
  ProdValidfrom: any;
  WH_EREGGOODSSet: any;
  ReturnId: any;
  whnoflag: boolean = false;
  DeclarationIdTypeName: string;
  ManagerIdTypeName: any;
  ManagerNationalityName: any;
  ManagerTitleName: any;
  OwnerLeasedName: string;
  WarehouseGoodName: any;
  WarehousePurposeName: any;
  warehouseno: any;
  exception: any;
  DistrictName: any;
  CityName: any;
  firstcount: number;
  secondcount: number;
  thirdcount: number;
  fourthcount: number;
  fifthcount: number;
  sixtcount: number;
  sixthcount: number;
  seventhcount: number;
  eighthcount: number;
  resText: any;
  resText1: any;
  Changetype: string = '0';
  lang: any;
  direction: string;
  storageflag: boolean;
  ProductHeader: any;
  LeasedList: any;
  wareHsLease: any;
  oIdType1: any;
  TaxGoodType: any;
  id1: string;
  idErr1: boolean;
  idMsg: any;
  dob1: String = "";
  enddate: any;
  headerComponent = CalendarComponent;
  OwnerShipCountrySetList: any;
  ManagerCountrySetList: any;
  constructor(
    private router: Router,
    private wareHousesService: WarehouseService,
    private ref: ChangeDetectorRef,
    public notifierService: NotifierService,
    private formBuilder: FormBuilder,
    public appSrv: AppService,
    public commonValidation: CommonValidation
  ) {
    this.GPartz = localStorage.getItem('gpart');
    // if (localStorage.getItem("lang") === "ar") {
    //   this.Direction = "rtl";
    //   this.Language = "A";
    // } else {
    //   this.Direction = "ltr";
    //   this.Language = "E";
    // }

    if (localStorage.getItem("lang") === "ar") {
      this.lang = renewalwarehouseconstants.langz.arb.renewalwarehouse;
      this.direction = renewalwarehouseconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
      //moment.locale('ar-Sa');
    } else {
      this.lang = renewalwarehouseconstants.langz.eng.renewalwarehouse;
      this.direction = renewalwarehouseconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
      //moment.locale('en-Us');
    }

  }
  ngOnInit(): void {
    this.appSrv.data1.subscribe((res) => {
      this.enddate = this.commonValidation.dateFormate(
        this.commonValidation.toJulianDate(new Date()),
        res
      );
    });
    this.Dropdownbindtext();
    this.stepsChecking();
    this.TypeProductFormControls();
    this.warehouseIdentificationFormControls();
    this.warehouseOwnerShipFormControls();
    this.warehouseownershipIsCompanyFormControls();
    this.warehouseownershipIndividualFormControls();
    this.warehouseDimensionsFormControls();
    this.warehouseManagerInfo();
    this.IdTypeOwnerShipFormgroup = new FormGroup({
      Idnumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(16)]),
      Dob: new FormControl('', [Validators.required]),
    });
  }
  onSubmitf(testForm) {
    console.log("TF:", testForm.value);
    if (testForm.value.sd !== null && testForm.value.sd !== undefined) {
      testForm.resetForm(testForm.value);
    }
  }
  //To Validate WHManager Idz
  validateIDz() {
    if (this.WarehouseManagerInfoFormControls1.value.idType !== "ZS0003") {
      // this.validateID();
      // if (this.dob1 === undefined || this.dob1 === null) {
      //   //this.idErr1 = false;
      //   this.dobErr = true;
      //   this.dobMsg = this.vatErr.e6;
      // } else {
      //   this.dobErr = false;
      //   this.dobMsg = "";
      //   console.log("test");
      // }
      // if (!this.idErr1 && this.dob1) {
      let d = this.IdTypeOwnerShipFormgroup.value.Dob["calendarStart"];
      console.log("sdsd", this.dob1);
      if (d.day < 10 && d.day.toString().length == 1) {
        d.day = "0" + d.day;
      }
      if (d.month < 10 && d.month.toString().length == 1) {
        d.month = "0" + d.month;
      }
      let currentdate = "" + d.year + d.month + d.day;

      let obj = {
        type: this.WarehouseManagerInfoFormControls1.value.idType,
        idNumber: this.IdTypeOwnerShipFormgroup.value.Idnumber,
      };
      this.wareHousesService.getUserValidation(obj, currentdate).subscribe(
        (res) => {
          // this.tinErr = false;
          // console.log("res", res);
          // this.iddErr = false;
          // this.idnumber = res["d"]["Idnum"];
          // this.WarehouseManagerInfoFormControls1.get("idNumber").disable();
          this.WarehouseManagerInfoFormControls1.patchValue({
            idNumber: res["d"]["Idnum"]
          });
          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: ''
          });
          //this.exciseFormGroup3.controls["Decname"].setValue(res["d"]["Name1"]);

          $("#idValidation").modal("hide");

          //this.vatFormThirdGroup.get("Decname").disable();
          // this.notifierService.notify("success", this.lang.errorMsgs.e14);
        },
        (err) => {
          //this.iddErr = true;
          //this.idErr1 = true;
          //alert(this.idErr1)
          console.log();
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );

          // this.WarehouseManagerInfoFormControls1.get("idNumber").enable();
        }
      );
      // }
    }

  }

  //To Validate WHOwnerIdz 
  validateWHOwnerIdz() {
    if (this.WarehouseIsIndividualOwnerShip.value.idType !== "ZS0003") {
      // if (!this.idErr1 && this.dob1) {
      let d = this.IdTypeOwnerShipFormgroup.value.Dob["calendarStart"];
      if (d.day < 10 && d.day.toString().length == 1) {
        d.day = "0" + d.day;
      }
      if (d.month < 10 && d.month.toString().length == 1) {
        d.month = "0" + d.month;
      }
      let currentdate = "" + d.year + d.month + d.day;

      let obj = {
        type: this.WarehouseIsIndividualOwnerShip.value.idType,
        idNumber: this.IdTypeOwnerShipFormgroup.value.Idnumber,
      };
      this.wareHousesService.getUserValidation(obj, currentdate).subscribe(
        (res) => {
          // this.tinErr = false;
          // console.log("res", res);
          // this.iddErr = false;
          // this.idnumber = res["d"]["Idnum"];
          this.WarehouseIsIndividualOwnerShip.patchValue({
            idNumber: res["d"]["Idnum"]
          });
          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: ''
          });
          //this.exciseFormGroup3.controls["Decname"].setValue(res["d"]["Name1"]);
          //this.WarehouseIsIndividualOwnerShip.get("idNumber").disable();
          $("#idWHOwnerValidation").modal("hide");

          //this.vatFormThirdGroup.get("Decname").disable();
          // this.notifierService.notify("success", this.lang.errorMsgs.e14);
        },
        (err) => {
          //this.iddErr = true;
          //this.idErr1 = true;
          //alert(this.idErr1)
          //console.log();
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );

          // this.WarehouseManagerInfoFormControls1.get("idNumber").enable();
        }
      );
    }
    // }

  }

  //To Validate WHDeclarationIdz
  validateWHDeclarationIdz() {
    if (this.DeclarationFormControls.value.idType !== "ZS0003") {
      //if (!this.idErr1 && this.dob1) {
      let d = this.IdTypeOwnerShipFormgroup.value.Dob["calendarStart"];
      console.log("sdsd", this.dob1);
      if (d.day < 10 && d.day.toString().length == 1) {
        d.day = "0" + d.day;
      }
      if (d.month < 10 && d.month.toString().length == 1) {
        d.month = "0" + d.month;
      }
      let currentdate = "" + d.year + d.month + d.day;

      let obj = {
        type: this.DeclarationFormControls.value.idType,
        idNumber: this.IdTypeOwnerShipFormgroup.value.Idnumber,
      };
      this.wareHousesService.getUserValidation(obj, currentdate).subscribe(
        (res) => {
          // this.tinErr = false;
          // console.log("res", res);
          // this.iddErr = false;
          // this.idnumber = res["d"]["Idnum"];


          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: ''
          });
          //this.exciseFormGroup3.controls["Decname"].setValue(res["d"]["Name1"]);
          //this.DeclarationFormControls.get("idNumber").disable();
          this.DeclarationFormControls.patchValue({
            idNumber: res["d"]["Idnum"]
          });
          $("#idWHDeclarationValidation").modal("hide");

          //this.vatFormThirdGroup.get("Decname").disable();
          // this.notifierService.notify("success", this.lang.errorMsgs.e14);
        },
        (err) => {
          //this.iddErr = true;
          // this.idErr1 = true;
          // alert(this.idErr1)
          // console.log();
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );

          // this.WarehouseManagerInfoFormControls1.get("idNumber").enable();
        }
      );
    }

    //}
  }

  //On close popup 
  clearPopup() {
    this.IdTypeOwnerShipFormgroup.patchValue({
      Idnumber: '',
      Dob: ''
    });
    if (this.isWHManagerInfo) {
      //this.WarehouseManagerInfoFormControls1.get("idNumber").enable();
      this.isWHManagerInfo = false;
    }
    else if (this.isWHDeclarationInfo) {
      //this.DeclarationFormControls.get("idNumber").enable();
      this.isWHDeclarationInfo = false;
    }
    else if (this.isWHOwnershipInfo) {
      //this.WarehouseIsIndividualOwnerShip.get("idNumber").enable();
      this.isWHOwnershipInfo = false;
    }

  }
  ngAfterViewInit() {
    if (this.Step == 1) {
      setTimeout(() => {
        this.confirm.nativeElement.click();
      }, 1000);
    }
    if (this.Step == 2) {
      setTimeout(() => {
        this.instructions.nativeElement.click();
        //this.errors.nativeElement.click();
      }, 1000)
    }
  }
  newrenewalWarehouse() {
    $('#confirm').modal('hide');
    this.Step = 2;
    this.step2();
    $('#instructions').modal('show');
    //this.ngAfterViewInit();
  }
  existingrenewalWarehouse() {
    $('#confirm').modal('hide');
    $('#proceed').modal('show');
    this.getexistingrenewalwarehouseApi();
  }
  chkchange(event) {
    if (event.currentTarget.checked == true) {
      this.summaryagree = true;
    }
    else {
      this.summaryagree = false;
    }
  }
  Back() {
    this.step3();
  }
  Dropdownbindtext() {
    if (this.Language == 'A') {
      this.ProductHeader = [
        {
          "Key": "",
          "Text": ""
        },
        {
          "Key": "01",
          "Text": "انتاج وتخزين السلع الإنتقائية"
        }, {
          "Key": "02",
          "Text": "تخزين السلع الإنتقائية"
        }
      ]
      this.LeasedList = [
        {
          "Key": "",
          "Text": ""
        }, {
          "Key": "1",
          "Text": "نعم"
        }, {
          "Key": "0",
          "Text": "لا"
        }
      ];
      this.wareHsLease = [
        {
          "Key": "I",
          "Text": "فرد"
        }, {
          "Key": "C",
          "Text": "شركة"
        }
      ]

      this.oIdType1 = [
        {
          "Key": "",
          "Text": ""
        },
        {
          "Key": "ZS0001",
          "Text": "هوية وطنية"
        },
        {
          "Key": "ZS0002",
          "Text": "هوية مقيم"
        },
        {
          "Key": "ZS0003",
          "Text": "هوية خليجية"
        }
      ]

      this.TaxGoodType = [
        {
          "Key": "MV",
          "Text": "السلع المنقولة"
        }, {
          "Key": "ST",
          "Text": "السلع المخزنة"
        }, {
          "Key": "RL",
          "Text": "السلع المطروحة للاستهلاك"
        }
      ]
    }
    else {
      this.ProductHeader = [
        {
          "Key": "",
          "Text": ""
        },
        {
          "Key": "01",
          "Text": "Manufacturing & Storage of the Excise Goods"
        },
        {
          "Key": "02",
          "Text": "Storage of the Excise Goods"
        }
      ]
      this.LeasedList = [
        {
          "Key": "",
          "Text": ""
        }, {
          "Key": "1",
          "Text": "Yes"
        }, {
          "Key": "0",
          "Text": "No"
        }
      ];
      this.wareHsLease = [
        {
          "Key": "",
          "Text": ""
        },
        {
          "Key": "I",
          "Text": "Individual"
        },
        {
          "Key": "C",
          "Text": "Company"
        }
      ]
      this.oIdType1 = [
        {
          "Key": "",
          "Text": ""
        },
        {
          "Key": "ZS0001",
          "Text": "National ID"
        },
        {
          "Key": "ZS0002",
          "Text": "Iqama ID"
        },
        {
          "Key": "ZS0003",
          "Text": "GCC ID"
        }
      ]
      this.TaxGoodType = [
        {
          "Key": "MV",
          "Text": "Moved Goods"
        }, {
          "Key": "ST",
          "Text": "Stored Goods"
        },
        {
          "Key": "RL",
          "Text": "Goods Released for Consumption"
        }
      ]
    }
  }
  BackAdditionalInfo() {
    this.warehouseManagerInfo2();
    this.Step = 9;
  }
  TypeProductEdit() {
    this.step4();
    this.TypeProductFormControls();
    let flag;
    if (this.WholeData.ChgWhPrd == "1") {
      flag = true;
    }
    else {
      flag = false;
    }
    if (this.WholeData.ChgWhPrdDt !== undefined && this.WholeData.ChgWhPrdDt !== "" && this.WholeData.ChgWhPrdDt !== null) {
      let pickerValue = this.datePickerValue(this.WholeData.ChgWhPrdDt);
      this.ProdValidfrom = new Date(+pickerValue.split("T00:00:00")).toString();
    } else {
      this.ProdValidfrom = this.CurrentDate.toString();
    }
    this.TypeProductForm.patchValue({
      Purpose: this.WholeData.Purpose,
      Flag: flag,
      GoodsWarehouse: this.WholeData.WH_EREGGOODSSet.results[0].GoodsTyp,
    });
  }
  warehouseIdentificationEdit() {
    //this.step5();
    this.warehouseIdentificationFormControls();
    this.WarehouseIdentication.patchValue({
      warehouseName: this.WholeData.Whfnm,
      validFrom: this.WholeData.ChgWhIdDt,
      BuildingNo: this.WholeData.WH_ADDRESSSet.results[0].BuildingNo,
      StreetName: this.WholeData.WH_ADDRESSSet.results[0].Street,
      RegionDistrict: this.WholeData.WH_ADDRESSSet.results[0].Region,
      PostalCode: this.WholeData.WH_ADDRESSSet.results[0].PostalCd,
      Addrnumber: this.WholeData.WH_ADDRESSSet.results[0].Addrnumber,
      Quarter: this.WholeData.WH_ADDRESSSet.results[0].Quarter,
      City: this.WholeData.WH_ADDRESSSet.results[0].City,
      latitude: this.WholeData.WH_ADDRESSSet.results[0].LatitudeC,
      longitude: this.WholeData.WH_ADDRESSSet.results[0].LongitudeC
    });
  }
  TypeandProdctSetValidators() {
    this.TypeProductForm.get('Purpose').setValidators(Validators.required);
    this.TypeProductForm.get('Purpose').updateValueAndValidity();
    this.TypeProductForm.get('Flag').setValidators(Validators.required);
    this.TypeProductForm.get('Flag').updateValueAndValidity();
  }
  TypeandProdctRemoveValidators() {
    this.TypeProductForm.get('Purpose').clearValidators();
    this.TypeProductForm.get('Purpose').updateValueAndValidity();
    this.TypeProductForm.get('Flag').clearValidators();
    this.TypeProductForm.get('Flag').updateValueAndValidity();
  }
  WarehouseIdentificationSetValidators() {
    this.WarehouseIdentication.get('warehouseName').setValidators([Validators.required, Validators.maxLength(40)]);
    this.WarehouseIdentication.get('warehouseName').updateValueAndValidity();
    this.WarehouseIdentication.get('BuildingNo').setValidators([Validators.required, Validators.maxLength(15), Validators.pattern(this.NumberPattern)]);
    this.WarehouseIdentication.get('BuildingNo').updateValueAndValidity();
    this.WarehouseIdentication.get('StreetName').setValidators([Validators.required, Validators.maxLength(40)]);
    this.WarehouseIdentication.get('StreetName').updateValueAndValidity();
    this.WarehouseIdentication.get('RegionDistrict').setValidators(Validators.required);
    this.WarehouseIdentication.get('RegionDistrict').updateValueAndValidity();
    this.WarehouseIdentication.get('City').setValidators(Validators.required);
    this.WarehouseIdentication.get('City').updateValueAndValidity();
    this.WarehouseIdentication.get('PostalCode').setValidators([Validators.required, Validators.maxLength(5), Validators.pattern(this.NumberPattern)]);
    this.WarehouseIdentication.get('PostalCode').updateValueAndValidity();
    this.WarehouseIdentication.get('City').setValidators(Validators.required);
    this.WarehouseIdentication.get('City').updateValueAndValidity();
    this.WarehouseIdentication.get('Addrnumber').setValidators([Validators.required, Validators.maxLength(10), Validators.pattern(this.NumberPattern)]);
    this.WarehouseIdentication.get('Addrnumber').updateValueAndValidity();
    this.WarehouseIdentication.get('City').setValidators(Validators.required);
    this.WarehouseIdentication.get('City').updateValueAndValidity();
    this.WarehouseIdentication.get('Quarter').setValidators([Validators.required, Validators.maxLength(40)]);
    this.WarehouseIdentication.get('Quarter').updateValueAndValidity();
    this.WarehouseIdentication.get('latitude').setValidators([Validators.required, Validators.maxLength(15), Validators.pattern(this.DecimalPointPattern)]);
    this.WarehouseIdentication.get('latitude').updateValueAndValidity();
    this.WarehouseIdentication.get('longitude').setValidators([Validators.required, Validators.maxLength(15), Validators.pattern(this.DecimalPointPattern)]);
    this.WarehouseIdentication.get('longitude').updateValueAndValidity();
  }
  WarehouseIdentificationRemoveValidators() {
    this.WarehouseIdentication.get('warehouseName').clearValidators();
    this.WarehouseIdentication.get('warehouseName').updateValueAndValidity();
    this.WarehouseIdentication.get('BuildingNo').clearValidators();
    this.WarehouseIdentication.get('BuildingNo').updateValueAndValidity();
    this.WarehouseIdentication.get('StreetName').clearValidators();
    this.WarehouseIdentication.get('StreetName').updateValueAndValidity();
    this.WarehouseIdentication.get('RegionDistrict').clearValidators();
    this.WarehouseIdentication.get('RegionDistrict').updateValueAndValidity();
    this.WarehouseIdentication.get('City').clearValidators();
    this.WarehouseIdentication.get('City').updateValueAndValidity();
    this.WarehouseIdentication.get('PostalCode').clearValidators();
    this.WarehouseIdentication.get('PostalCode').updateValueAndValidity();
    this.WarehouseIdentication.get('City').clearValidators();
    this.WarehouseIdentication.get('City').updateValueAndValidity();
    this.WarehouseIdentication.get('Addrnumber').clearValidators();
    this.WarehouseIdentication.get('Addrnumber').updateValueAndValidity();
    this.WarehouseIdentication.get('City').clearValidators();
    this.WarehouseIdentication.get('City').updateValueAndValidity();
    this.WarehouseIdentication.get('Quarter').clearValidators();
    this.WarehouseIdentication.get('Quarter').updateValueAndValidity();
    this.WarehouseIdentication.get('latitude').clearValidators();
    this.WarehouseIdentication.get('latitude').updateValueAndValidity();
    this.WarehouseIdentication.get('longitude').clearValidators();
    this.WarehouseIdentication.get('longitude').updateValueAndValidity();
  }
  WarehouseDimensionsSetValidators() {
    this.WarehouseDimensions.get('length').setValidators([Validators.required, Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]);
    this.WarehouseDimensions.get('length').updateValueAndValidity();
    this.WarehouseDimensions.get('width').setValidators([Validators.required, Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]);
    this.WarehouseDimensions.get('width').updateValueAndValidity();
    this.WarehouseDimensions.get('height').setValidators([Validators.required, Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]);
    this.WarehouseDimensions.get('height').updateValueAndValidity();
    this.WarehouseDimensions.get('cubicMeters').setValidators([Validators.required, Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]);
    this.WarehouseDimensions.get('cubicMeters').updateValueAndValidity();
    this.WarehouseDimensions.get('squareMeters').setValidators([Validators.required, Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]);
    this.WarehouseDimensions.get('squareMeters').updateValueAndValidity();
  }
  WarehouseDimensionsRemoveValidators() {
    this.WarehouseDimensions.get('length').clearValidators();
    this.WarehouseDimensions.get('length').updateValueAndValidity();
    this.WarehouseDimensions.get('width').clearValidators();
    this.WarehouseDimensions.get('width').updateValueAndValidity();
    this.WarehouseDimensions.get('height').clearValidators();
    this.WarehouseDimensions.get('height').updateValueAndValidity();
    this.WarehouseDimensions.get('cubicMeters').clearValidators();
    this.WarehouseDimensions.get('cubicMeters').updateValueAndValidity();
    this.WarehouseDimensions.get('squareMeters').clearValidators();
    this.WarehouseDimensions.get('squareMeters').updateValueAndValidity();
  }
  WarehouseManagerInfoSetValidators() {
    this.WarehouseManagerInfoFormControls1.get('idType').setValidators(Validators.required);
    this.WarehouseManagerInfoFormControls1.get('idType').updateValueAndValidity();
    this.WarehouseManagerInfoFormControls1.get('idNumber').setValidators([Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(16)]);
    this.WarehouseManagerInfoFormControls1.get('idNumber').updateValueAndValidity();
    // this.WarehouseManagerInfoFormControls1.get('nationalityOfOwner').setValidators([Validators.pattern(this.StringPattern)]); 
    // this.WarehouseManagerInfoFormControls1.get('nationalityOfOwner').updateValueAndValidity();
    this.WarehouseManagerInfoFormControls1.get('dateOfHiring').setValidators(Validators.required);
    this.WarehouseManagerInfoFormControls1.get('dateOfHiring').updateValueAndValidity();
  }
  WarehouseManagerInfoRemoveValidators() {
    this.WarehouseManagerInfoFormControls1.get('idType').clearValidators();
    this.WarehouseManagerInfoFormControls1.get('idType').updateValueAndValidity();
    this.WarehouseManagerInfoFormControls1.get('idNumber').clearValidators();
    this.WarehouseManagerInfoFormControls1.get('idNumber').updateValueAndValidity();
    // this.WarehouseManagerInfoFormControls1.get('nationalityOfOwner').clearValidators(); 
    // this.WarehouseManagerInfoFormControls1.get('nationalityOfOwner').updateValueAndValidity();
    this.WarehouseManagerInfoFormControls1.get('dateOfHiring').clearValidators();
    this.WarehouseManagerInfoFormControls1.get('dateOfHiring').updateValueAndValidity();
  }
  WarehouseownershipSetValidators() {
    this.WarehouseOwnerShip.get('leasedWarehouse').setValidators(Validators.required);
    this.WarehouseOwnerShip.get('leasedWarehouse').updateValueAndValidity();
    this.WarehouseOwnerShip.get('expiryDate').setValidators(Validators.required);
    this.WarehouseOwnerShip.get('expiryDate').updateValueAndValidity();
    this.WarehouseOwnerShip.get('leaseDate').setValidators(Validators.required);
    this.WarehouseOwnerShip.get('leaseDate').updateValueAndValidity();
    this.WarehouseOwnerShip.get('ownerType').setValidators(Validators.required);
    this.WarehouseOwnerShip.get('ownerType').updateValueAndValidity();
    this.WarehouseIsIndividualOwnerShip.get('idType').setValidators(Validators.required);
    this.WarehouseIsIndividualOwnerShip.get('idType').updateValueAndValidity();
    this.WarehouseIsIndividualOwnerShip.get('idNumber').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(this.NumberPattern)]);
    this.WarehouseIsIndividualOwnerShip.get('idNumber').updateValueAndValidity();
    this.WarehouseIsIndividualOwnerShip.get('nationality').setValidators(Validators.required);
    this.WarehouseIsIndividualOwnerShip.get('nationality').updateValueAndValidity();
    this.WarehouseIsIndividualOwnerShip.get('Nameoftheowner').setValidators([Validators.required, Validators.maxLength(40), Validators.pattern(this.StringPattern)]);
    this.WarehouseIsIndividualOwnerShip.get('Nameoftheowner').updateValueAndValidity();
    this.WarehouseIsIndividualOwnerShip.get('phoneNumber').setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(14), Validators.pattern(this.NumberPattern)]);
    this.WarehouseIsIndividualOwnerShip.get('phoneNumber').updateValueAndValidity();
    this.WarehouseIsIndividualOwnerShip.get('emailId').setValidators([Validators.required, Validators.maxLength(40), Validators.pattern(this.EmailPattern)]);
    this.WarehouseIsIndividualOwnerShip.get('emailId').updateValueAndValidity();
    this.WarehouseIsCompanyOwnerShip.get('crNo').setValidators([Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(10), Validators.maxLength(10)]);
    this.WarehouseIsCompanyOwnerShip.get('crNo').updateValueAndValidity();
    this.WarehouseIsCompanyOwnerShip.get('tin').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.NumberPattern)]);
    this.WarehouseIsCompanyOwnerShip.get('tin').updateValueAndValidity();
    this.WarehouseIsCompanyOwnerShip.get('companyName').setValidators([Validators.required, Validators.maxLength(40), Validators.pattern(this.StringPattern)]);
    this.WarehouseIsCompanyOwnerShip.get('companyName').updateValueAndValidity();
    this.WarehouseIsCompanyOwnerShip.get('address').setValidators(Validators.required);
    this.WarehouseIsCompanyOwnerShip.get('address').updateValueAndValidity();
    this.WarehouseIsCompanyOwnerShip.get('phone').setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(14), Validators.pattern(this.NumberPattern)]);
    this.WarehouseIsCompanyOwnerShip.get('phone').updateValueAndValidity();
  }
  WarehouseownershipRemoveValidators() {
    this.WarehouseOwnerShip.get('leasedWarehouse').clearValidators();
    this.WarehouseOwnerShip.get('leasedWarehouse').updateValueAndValidity();
    this.WarehouseOwnerShip.get('expiryDate').clearValidators();
    this.WarehouseOwnerShip.get('expiryDate').updateValueAndValidity();
    this.WarehouseOwnerShip.get('leaseDate').clearValidators();
    this.WarehouseOwnerShip.get('leaseDate').updateValueAndValidity();
    this.WarehouseOwnerShip.get('ownerType').clearValidators();
    this.WarehouseOwnerShip.get('ownerType').updateValueAndValidity();
    this.WarehouseIsIndividualOwnerShip.get('idType').clearValidators();
    this.WarehouseIsIndividualOwnerShip.get('idType').updateValueAndValidity();
    this.WarehouseIsIndividualOwnerShip.get('idNumber').clearValidators();
    this.WarehouseIsIndividualOwnerShip.get('idNumber').updateValueAndValidity();
    this.WarehouseIsIndividualOwnerShip.get('nationality').clearValidators();
    this.WarehouseIsIndividualOwnerShip.get('nationality').updateValueAndValidity();
    this.WarehouseIsIndividualOwnerShip.get('Nameoftheowner').clearValidators();
    this.WarehouseIsIndividualOwnerShip.get('Nameoftheowner').updateValueAndValidity();
    this.WarehouseIsIndividualOwnerShip.get('phoneNumber').clearValidators();
    this.WarehouseIsIndividualOwnerShip.get('phoneNumber').updateValueAndValidity();
    this.WarehouseIsIndividualOwnerShip.get('emailId').clearValidators();
    this.WarehouseIsIndividualOwnerShip.get('emailId').updateValueAndValidity();
    this.WarehouseIsCompanyOwnerShip.get('crNo').clearValidators();
    this.WarehouseIsCompanyOwnerShip.get('crNo').updateValueAndValidity();
    this.WarehouseIsCompanyOwnerShip.get('tin').clearValidators();
    this.WarehouseIsCompanyOwnerShip.get('tin').updateValueAndValidity();
    this.WarehouseIsCompanyOwnerShip.get('companyName').clearValidators();
    this.WarehouseIsCompanyOwnerShip.get('companyName').updateValueAndValidity();
    this.WarehouseIsCompanyOwnerShip.get('address').clearValidators();
    this.WarehouseIsCompanyOwnerShip.get('address').updateValueAndValidity();
    this.WarehouseIsCompanyOwnerShip.get('phone').clearValidators();
    this.WarehouseIsCompanyOwnerShip.get('phone').updateValueAndValidity();
  }
  typecheckchange(value) {
    if (value.currentTarget.checked == true) {
      this.TypeProductForm.patchValue({
        Flag: true
      })
    }
    else {
      this.TypeProductForm.patchValue({
        Flag: ''
      })
    }
  }
  TypesChange(value) {
    let count = 0;

    if (value == 'TP') {
      if (this.isCardTP == '1') {
        this.isCardTP = '0';
        this.WholeData.ChgWhPrd = '0';
        this.TypeandProdctRemoveValidators();
        this.isCardBG = '1';
        this.TypeandProductFlag = true;
      } else {
        this.isCardTP = '1';
        this.WholeData.ChgWhPrd = '1';
        this.TypeandProdctSetValidators();
        this.TypeandProductFlag = false;
      }
    }
    if (value == 'WD') {
      if (this.isCardWD == '1') {
        this.isCardWD = '0';
        this.WholeData.ChgWhDm = '0';
        this.WarehouseDimensionsRemoveValidators()
        this.isCardBG = '1';
      } else {
        this.isCardWD = '1';
        this.WholeData.ChgWhDm = '1'
        this.WarehouseDimensionsSetValidators();
      }
    }
    if (value == 'WI') {
      if (this.isCardWI == '1') {
        this.isCardWI = '0';
        this.WholeData.ChgWhId = '0';
        this.isCardBG = '0';
        this.WarehouseIdentificationRemoveValidators();
      } else {
        this.isCardWI = '1';
        this.WholeData.ChgWhId = '1'
        this.WarehouseIdentificationSetValidators();
      }
    }
    if (value == 'WM') {
      if (this.isCardWM == '1') {
        this.isCardWM = '0';
        this.WholeData.ChgWhMi = '0';
        this.isCardBG = '0';
        this.WarehouseManagerInfoRemoveValidators();
      } else {
        this.isCardWM = '1';
        this.WholeData.ChgWhMi = '1'
        this.WarehouseManagerInfoSetValidators();
      }
    }
    if (value == 'WO') {
      if (this.isCardWO == '1') {
        this.isCardWO = '0';
        this.WholeData.ChgWhOi = '0';
        this.isCardBG = '0';
        this.WarehouseownershipRemoveValidators();
      } else {
        this.isCardWO = '1';
        this.WholeData.ChgWhOi = '1'
        this.WarehouseownershipSetValidators();
      }
    }
    if (value == 'TP' || value == 'WD') {
      if ((this.isCardWD == '0' || this.isCardWD == '') && (this.isCardTP == '0' || this.isCardTP == '')) {
        this.isCardBG = '0';
        this.WholeData.ChgWhBg = '0';
        this.Changetype = '0';
      }
      else {
        this.isCardBG = '1';
        this.WholeData.ChgWhBg = '1'
        this.Changetype = '1';
      }
    }
    else {
      if (((this.isCardWO == '0' || this.isCardWO == '') && (this.isCardWM == '0' || this.isCardWM == '') && (this.isCardWI == '0' || this.isCardWI == ''))) {
        // this.isCardBG = '0';
        // this.WholeData.ChgWhBg = '0';
        this.Changetype = '0';
      }
      else {
        // this.isCardBG = '1';
        //  this.WholeData.ChgWhBg = '1'
        this.Changetype = '1';
      }
    }

    if (value == 'BG') {
      if (this.isCardBG == '1') {
        this.isCardBG = '0';
        this.WholeData.ChgWhBg = '0';
        this.Changetype = '0';
        count += 1;
      } else {
        this.isCardBG = '1';
        this.WholeData.ChgWhBg = '1'
        this.Changetype = '1';

      }
    }
    if (this.isCardBG == '1' || this.isCardWO == '1' || this.isCardWD == '1' || this.isCardTP == '1' || this.isCardWM == '1' || this.isCardWI == '1') {
      this.Changetype = '1';
    }
    if (this.isCardWD == '1' || this.isCardTP == '1') {
      this.isCardBG = '1';
      this.WholeData.ChgWhBg = '1';
    }
  }
  warehouseownershipEdit() {
    //this.step6();
    this.warehouseOwnerShipFormControls();
    this.isCard1 = this.WholeData.Whlsf == 1 ? "Yes" : "No";
    if (this.isCard1 == 'Yes') {
      this.iswhOwnership = true;
    }
    else {
      this.isCompany = false;
      this.isIndividual = false;
      this.iswhOwnership = false;
    }
    let valid;
    let leased;
    let expiry;
    if (this.WholeData.Lsfdt !== undefined && this.WholeData.Lsfdt !== "" && this.WholeData.Lsfdt !== null) {
      leased = this.WholeData.Lsfdt;
    } else {
      leased = this.CurrentDate;
    }
    if (this.WholeData.Lsedt !== undefined && this.WholeData.Lsedt !== "" && this.WholeData.Lsedt !== null) {
      expiry = this.WholeData.Lsedt;
    } else {
      expiry = this.CurrentDate;
    }
    this.WarehouseOwnerShip.patchValue({
      ownerType: this.WholeData.Whlsi,
      leasedWarehouse: this.WholeData.Whlsf == "Yes" ? 1 : 0,
      //validFrom: this.WholeData.ChgWhOiDt,
      leaseDate: leased,
      expiryDate: expiry
    });

    if (this.WholeData.Whlsi == 'C') {
      this.isCompany = true;
      this.isIndividual = false;
      // this.WarehouseIsCompanyOwnerShip.removeControl('leaseDate');
      // this.WarehouseIsCompanyOwnerShip.removeControl('expiryDate');
      this.warehouseownershipIsCompanyFormControls();
      //this.removeOwnershipIsindividualControls();
      this.WarehouseIsCompanyOwnerShip.patchValue({
        crNo: this.WholeData.WoCrNo,
        tin: this.WholeData.WoTin,
        companyName: this.WholeData.Compnm,
        address: this.WholeData.WoAddress,
        phone: this.WholeData.WH_CONTACT_DTLSet.results[1].TelNumber
      });

    } else {
      this.isCompany = false;
      this.isIndividual = true;
      //  this.removeOwnerShipControls();
      // this.WarehouseIsCompanyOwnerShip.removeControl('leaseDate');
      // this.WarehouseIsCompanyOwnerShip.removeControl('expiryDate');
      this.warehouseownershipIndividualFormControls();
      this.WarehouseIsIndividualOwnerShip.patchValue({
        idType: this.WholeData.WH_CONTACTPSet.results[1].Type,
        idNumber: this.WholeData.WH_CONTACTPSet.results[1].Idnumber,
        nationality: this.WholeData.WH_CONTACTPSet.results[1].Nationality,
        Nameoftheowner: this.WholeData.WH_CONTACTPSet.results[1].Firstnm,
        phoneNumber: this.WholeData.WH_CONTACT_DTLSet.results[1].MobNumber,
        emailId: this.WholeData.WH_CONTACT_DTLSet.results[1].SmtpAddr
      });
    }
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (this.WholeData.WH_CONTACTPSet.results[1].Type == this.oIdType1[i].Key) {
        this.OwnerIdTypeName = this.oIdType1[i].Text;
      }
    }
    if (this.isCard1 == 'Yes') {
      this.iswhOwnership = true;
    }
    else {
      this.isCompany = false;
      this.isIndividual = false;
      this.iswhOwnership = false;
    }
    this.WarehouseOwnershipMethod();
  }
  WarehouseOwnershipMethod() {
    this.isCard1 = this.WholeData.Whlsf == 1 ? "Yes" : "No";
    if (this.isCard1 == 'Yes') {
      this.iswhOwnership = true;
    }
    else {
      this.isCompany = false;
      this.isIndividual = false;
      this.iswhOwnership = false;
    }
    let valid;
    let leased;
    let expiry;
    // if (this.WholeData.Lsfdt !== undefined && this.WholeData.Lsfdt !== "" && this.WholeData.Lsfdt !== null) {
    //   leased = this.WholeData.Lsfdt;
    // } else {
    //   leased = this.CurrentDate;
    // }
    // if (this.WholeData.Lsedt !== undefined && this.WholeData.Lsedt !== "" && this.WholeData.Lsedt !== null) {
    //   expiry = this.WholeData.Lsedt;
    // } else {
    //   expiry = this.CurrentDate;
    // }

    moment.locale('en-Us');
    if (this.WholeData.Lsfdt !== undefined && this.WholeData.Lsfdt !== "" && this.WholeData.Lsfdt !== null) {
      if (this.WholeData.Lsfdt.includes('/Date')) {

        leased = moment(new Date(+(((this.WholeData.Lsfdt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
        this.WarehouseManagerInfoModel.DateOfHiring = leased;
        // hiring = new Date(+this.WholeData.Lsfdt.substr(6, 13)).toISOString().slice(0, 19);
        if (this.Language === 'E') {
          leased = this.commonValidation.toJulianDate1(new Date(leased));
        }
        else {
          leased = this.commonValidation.toJulianDate1(new Date(leased));
          leased = (this.commonValidation.dateFormate(leased, "Islamic"))
          //  hiring = this.commonValidation.getArabicFormat(new Date(hiring));
        }
      }
      else {
        leased = this.datePickerValue(this.WholeData.Lsfdt);
      }
    } else {
      leased = this.CurrentDate.toISOString().slice(0, 19);

    }
    if (this.WholeData.Lsedt !== undefined && this.WholeData.Lsedt !== "" && this.WholeData.Lsedt !== null) {
      if (this.WholeData.Lsedt.includes('/Date')) {

        expiry = moment(new Date(+(((this.WholeData.Lsedt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
        this.WarehouseManagerInfoModel.DateOfHiring = expiry;
        // hiring = new Date(+this.WholeData.Lsedt.substr(6, 13)).toISOString().slice(0, 19);
        if (this.Language === 'E') {
          expiry = this.commonValidation.toJulianDate1(new Date(expiry));
        }
        else {
          expiry = this.commonValidation.toJulianDate1(new Date(expiry));
          expiry = (this.commonValidation.dateFormate(expiry, "Islamic"))
          //  hiring = this.commonValidation.getArabicFormat(new Date(hiring));
        }
      }
      else {
        expiry = this.datePickerValue(this.WholeData.Lsedt);
      }
    } else {
      expiry = this.CurrentDate.toISOString().slice(0, 19);

    }
    this.WarehouseOwnerShip.patchValue({
      ownerType: this.WholeData.Whlsi,
      leasedWarehouse: this.WholeData.Whlsf == "Yes" ? 1 : 0,
      //validFrom: this.WholeData.ChgWhOiDt,
      leaseDate: leased,
      expiryDate: expiry
    });

    if (this.WholeData.Whlsi == 'C') {
      this.isCompany = true;
      this.isIndividual = false;
      // this.WarehouseIsCompanyOwnerShip.removeControl('leaseDate');
      // this.WarehouseIsCompanyOwnerShip.removeControl('expiryDate');
      this.warehouseownershipIsCompanyFormControls();
      //this.removeOwnershipIsindividualControls();
      this.WarehouseIsCompanyOwnerShip.patchValue({
        crNo: this.WholeData.WoCrNo,
        tin: this.WholeData.WoTin,
        companyName: this.WholeData.Compnm,
        address: this.WholeData.WoAddress,
        phone: this.WholeData.WH_CONTACT_DTLSet.results[1].TelNumber
      });
      this.ownerIdCRNumber(this.WholeData.WoCrNo);
    } else {
      this.isCompany = false;
      this.isIndividual = true;
      //  this.removeOwnerShipControls();
      // this.WarehouseIsCompanyOwnerShip.removeControl('leaseDate');
      // this.WarehouseIsCompanyOwnerShip.removeControl('expiryDate');
      this.warehouseownershipIndividualFormControls();
      this.WarehouseIsIndividualOwnerShip.patchValue({
        idType: this.WholeData.WH_CONTACTPSet.results[1].Type,
        idNumber: this.WholeData.WH_CONTACTPSet.results[1].Idnumber,
        nationality: this.WholeData.WH_CONTACTPSet.results[1].Nationality,
        Nameoftheowner: this.WholeData.WH_CONTACTPSet.results[1].Firstnm,
        phoneNumber: this.WholeData.WH_CONTACT_DTLSet.results[1].MobNumber,
        emailId: this.WholeData.WH_CONTACT_DTLSet.results[1].SmtpAddr
      });
      //this.ownerIdNumber(this.WholeData.WH_CONTACTPSet.results[1].Idnumber);
    }
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (this.WholeData.WH_CONTACTPSet.results[1].Type == this.oIdType1[i].Key) {
        this.OwnerIdTypeName = this.oIdType1[i].Text;
      }
    }
    if (this.isCard1 == 'Yes') {
      this.iswhOwnership = true;
    }
    else {
      this.isCompany = false;
      this.isIndividual = false;
      this.iswhOwnership = false;
    }
  }
  warehousedimensionsEdit() {
    //this.step7();
    this.WarehousedimensionsData();
    this.warehouseDimensionsData();
  }
  warehousemaninfoEdit() {
    //this.step8();
    console.log(this.WarehouseManagerInfoFormControls1.value.dateOfHiring);
    // this.warehouseManagerInfo1();
    // this.warehouseManagerInfoData();
  }
  bankguaranteeinfoEdit() {
    this.step9();
    // this.warehouseBankInfoFormControls();
    // this.warehouseBankInfo();
  }
  additionalinfoEdit() {
    //this.step10();
    //this.warehouseManagerInfo2();
  }
  declarationinfoEdit() {
    //this.step11();
    this.declarationInfo();
    this.warehouseDeclarationData();
  }
  continueFirstScreen() {
    //const obj1 = this.warehouseInfoData();
    //console.log('wh-info', obj1);
    // this.removeFirstScreenControls();

    if (this.whnoflag == false) {
      this.getWHInformation();
      this.warehouseDetailsList();
      //this.step4();
      this.Step = 4;
    }
    else {
      //this.step3();
      this.Step = 3;
    }

    this.WholeData.RenExt = this.isCard == "Yes" ? '1' : '0';
    if (this.WarehouseInformation.value.RenewalExtent != '' && this.WarehouseInformation.value.RenewalExtent != undefined && this.WarehouseInformation.value.RenewalExtent != null) {
      this.WholeData.RenPeriod = (this.WarehouseInformation.value.RenewalExtent).toString();
    }
    if (this.firstcount != 1) {
      this.TypeProductFormControls();
      this.firstcount = 1;
      if (this.WholeData.Purpose == '') {
        this.TypeProductForm.patchValue({
          Purpose: '02'
        });

      }
      else {
        this.TypeProductForm.patchValue({
          Purpose: this.WholeData.Purpose
        });
      }
      if (this.TypeProductForm.value.Purpose == '02') {
        this.storageflag = true;
      }
      else {
        this.storageflag = false;
      }
    }

  }
  continuesecondScreen() {
    console.log('tobocopro', this.ProductSet);
    //this.warehouseBankInfoFormControls();
    this.WholeData.WH_EREGGOODSSet.results = [];
    for (let i = 0; i < this.ProductSet.length; i++) {
      if (this.ProductSet[i].flag == true) {
        this.WholeData.WH_EREGGOODSSet.results.push({
          DataVersion: "00000",
          Flag: "X"
          , FormGuid: ""
          , GdtyChgFg: ""
          , GdtyDelimitDt: null
          , GdtyDelimitDtC: ""
          , GdtyDelimitFg: ""
          , GoodsTxt: this.ProductSet[i].GoodsTxt
          , GoodsTyp: this.ProductSet[i].GoodsTyp
          , LineNo: 0
          , RankingOrder: "00"
        });
      }
      // else {
      //   this.WholeData.WH_EREGGOODSSet.results.push({
      //     DataVersion: "00000",
      //     Flag: ""
      //     , FormGuid: ""
      //     , GdtyChgFg: ""
      //     , GdtyDelimitDt: null
      //     , GdtyDelimitDtC: ""
      //     , GdtyDelimitFg: ""
      //     , GoodsTxt: this.ProductSet[i].GoodsTxt
      //     , GoodsTyp: this.ProductSet[i].GoodsTyp
      //     , LineNo: 0
      //     , RankingOrder: "00"
      //   });
      // }
    }

    this.whnoflag = false;
    this.Step = 5;
    if (this.secondcount != 1) {
      this.stepsChecking();
      this.secondcount = 1;
    }
    console.log(this.WarehouseInformation.value, this.WarehouseInfoModel);
    //this.step5();
  }
  continuethirdScreen() {
    //this.step6();
    this.Step = 6;
    let data = this.WarehouseIdentication;
    if (this.thirdcount != 1) {
      this.stepsChecking();
      this.thirdcount = 1;
    }

    // this.WarehouseOwnerShip.patchValue({
    //   ownerType: this.WarehouseOwnerShip.value.ownerType,
    //   leasedWarehouse: this.isCard1 == "Yes" ? 1 : 0,
    //   //validFrom: this.WholeData.ChgWhOiDt,
    //   leaseDate: this.CurrentDate,
    //   expiryDate: this.CurrentDate
    // });
  }
  WarehousedimensionsData() {
    this.WarehouseDimensions = new FormGroup({
      //validFrom: new FormControl(this.WholeData.ChgWhDmDt, [Validators.required]),
      length: new FormControl(this.WholeData.WH_ADDRESSSet.results[0].LenSiz, [Validators.required, Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]),
      width: new FormControl(this.WholeData.WH_ADDRESSSet.results[0].WidSiz, [Validators.required, Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]),
      height: new FormControl(this.WholeData.WH_ADDRESSSet.results[0].HeiSiz, [Validators.required, Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]),
      cubicMeters: new FormControl(this.WholeData.WH_ADDRESSSet.results[0].CubicSc, [Validators.required, Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]),
      squareMeters: new FormControl(this.WholeData.WH_ADDRESSSet.results[0].SquarSc, [Validators.required, Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]),
    });
  }
  continuefourthScreen() {
    this.Step = 7;
    if (this.fourthcount != 1) {
      this.stepsChecking();
      this.fourthcount = 1;
    }
    //this.step7();

  }
  continuefifthScreen() {
    this.Step = 8;
    //this.step8();
    if (this.fifthcount != 1) {
      this.stepsChecking();
      this.fifthcount = 1;
    }
  }
  continuesixthScreen() {
    //this.step9();
    console.log(this.WarehouseManagerInfoFormControls1);
    this.Step = 9;
    if (this.sixthcount != 1) {
      this.stepsChecking();
      this.sixthcount = 1;
    }
    if (this.WarehouseManagerInfoFormControls1.value.dateOfHiring.calendarEnd != undefined) {
      this.WarehouseManagerInfoFormControls1.value.dateOfHiring = this.datePickerValue(this.WarehouseManagerInfoFormControls1.value.dateOfHiring);
    }
    console.log('dateofhiring', this.WarehouseManagerInfoFormControls1.value.dateOfHiring);
  }
  continueseventhScreen() {
    //this.step10();
    this.Step = 10;

    if (this.seventhcount != 1) {
      this.stepsChecking();
      this.seventhcount = 1;
    }
    this.WholeData.WH_GOODSDTLSet.results = [];
    const control = this.BankGuaranteeInformation.get("Rows") as FormArray;
    for (let j = 0; j < control.controls.length; j++) {
      this.WholeData.WH_GOODSDTLSet.results.push({
        Gdtyp: control.controls[j].value.energyDrinks,
        Gddtl: control.controls[j].value.movedgoods,
        Bgqt: control.controls[j].value.quantity,
        Bguom: control.controls[j].value.unitofMeasure,
        Bgrsp: control.controls[j].value.totalRspValue
      });
    }
  }
  continueeighththScreen() {
    //this.step11();
    this.Step = 11;
    if (this.eighthcount != 1) {
      this.stepsChecking();
      this.eighthcount = 1;
    }

  }
  continueninththScreen() {
    //this.step12();
    this.Step = 12;
  }

  step1() {
    this.Step = 1;
    this.stepsChecking();
  }
  step2() {
    this.Step = 2;
    this.stepsChecking();
  }
  step3() {
    this.Step = 3;
    this.stepsChecking();
  }
  step4() {
    this.Step = 4;
    this.stepsChecking();
  }
  step5() {
    this.Step = 5;
    this.stepsChecking();
  }
  step6() {
    this.Step = 6;
    this.stepsChecking();
  }
  step7() {
    this.Step = 7;
    this.stepsChecking();
  }
  step8() {
    this.Step = 8;
    this.stepsChecking();
  }
  step9() {
    this.Step = 9;
    this.stepsChecking();
  }
  step10() {
    this.Step = 10;
    this.stepsChecking();
  }
  step11() {
    this.Step = 11;
    this.stepsChecking();
  }
  step12() {
    this.Step = 12;
    this.stepsChecking();
  }
  step13() {
    this.Step = 13;
  }
  warehouseDetailsList() {
    if (this.Language == 'A') {
      this.WarehouseList = {
        "manuGoods": [
          // {
          //   "Key": "",
          //   "Text": ""
          // },
          {
            "Key": "01",
            "Text": "انتاج وتخزين السلع الإنتقائية"
          }, {
            "Key": "02",
            "Text": "تخزين السلع الإنتقائية"
          }
        ],
        "selAboveinfo": [
          {
            "Key": "",
            "Text": ""
          }, {
            "Key": "1",
            "Text": "نعم"
          }, {
            "Key": "0",
            "Text": "لا"
          }
        ],
        "wareHsLease": [
          {
            "Key": "I",
            "Text": "فرد"
          }, {
            "Key": "C",
            "Text": "شركة"
          }
        ],
        "InspReq": [
          {
            "Key": "1",
            "Text": "نعم"
          }, {
            "Key": "0",
            "Text": "لا"
          }
        ],
      }
    }
    else {
      this.WarehouseList = {
        "manuGoods": [
          // {
          //   "Key": "",
          //   "Text": ""
          // },
          {
            "Key": "01",
            "Text": "Manufacturing & Storage of the Excise Goods"
          }, {
            "Key": "02",
            "Text": "Storage of the Excise Goods"
          }
        ],
        "selAboveinfo": [
          {
            "Key": "",
            "Text": ""
          }, {
            "Key": "1",
            "Text": "Yes"
          }, {
            "Key": "0",
            "Text": "No"
          }
        ],
        "wareHsLease": [
          {
            "Key": "I",
            "Text": "Individual"
          }, {
            "Key": "C",
            "Text": "Company"
          }
        ],
        "InspReq": [
          {
            "Key": "1",
            "Text": "Yes"
          }, {
            "Key": "0",
            "Text": "No"
          }
        ]
      }
    }

    this.OwnerTypeList = this.WarehouseList.wareHsLease;
    this.UsagePurposeList = this.WarehouseList.manuGoods;
    //this.LeasedList = this.WarehouseList.selAboveinfo;
    this.AdditionalList = this.WarehouseList.InspReq;
  }
  allDropdownListBindingNames() {
    if (this.WholeData !== undefined && this.TitleSet !== undefined && this.CountrySet !== undefined) {
      for (let b = 0; b < this.UsagePurposeList.length; b++) {
        if (this.WholeData.Purpose == this.UsagePurposeList[b].Key) {
          this.WarehousePurposeName = this.UsagePurposeList[b].Text;
        }
      }

      for (let v = 0; v < this.WholeData.WH_EREGGOODSSet.results.length; v++) {
        if (this.WholeData.WH_EREGGOODSSet.results[v].Flag == "X") {
          this.WarehouseGoodName = this.WholeData.WH_EREGGOODSSet.results[v].GoodsTxt;
        }
      }

      for (let n = 0; n < this.LeasedList.length; n++) {
        if (this.WholeData.Whlsf == this.LeasedList[n].Key) {
          this.OwnerLeasedName = this.LeasedList[n].Text;
        }
      }

      for (let g = 0; g < this.OwnerTypeList.length; g++) {
        if (this.WholeData.Whlsi == this.OwnerTypeList[g].Key) {
          this.OwnerTypeName = this.OwnerTypeList[g].Text;
        }
      }

      for (let f = 0; f < this.TitleSet.length; f++) {
        if (this.WholeData.WH_CONTACTPSet.results[0].Title == this.TitleSet[f].Title) {
          this.ManagerTitleName = this.TitleSet[f].TitleMedi;
        }
      }

      for (let d = 0; d < this.CountrySetList.length; d++) {
        if (this.WholeData.WH_CONTACTPSet.results[1].Nationality == this.CountrySetList[d].Land1) {
          this.OwnerNationalityName = this.CountrySetList[d].Natio50;
        }
        if (this.WholeData.WH_CONTACTPSet.results[0].Nationality == this.CountrySetList[d].Land1) {
          this.ManagerNationalityName = this.CountrySetList[d].Natio50;
        }
      }

      for (let w = 0; w < this.IdTypeList.length; w++) {
        if (this.WholeData.WH_CONTACTPSet.results[1].Type == this.IdTypeList[w].Key) {
          this.OwnerIdTypeName = this.IdTypeList[w].Text;
        }
        if (this.WholeData.WH_CONTACTPSet.results[0].Type == this.IdTypeList[w].Key) {
          this.ManagerIdTypeName = this.IdTypeList[w].Text;
        }
        if (this.WholeData.Type == this.IdTypeList[w].Key) {
          this.DeclarationIdTypeName = this.IdTypeList[w].Text;
        }
      }

      for (let p = 0; p < this.AdditionalList.length; p++) {
        if (this.WholeData.AddQuesSet.results[0].RbFg == this.AdditionalList[p].Key) {
          this.AdditionalName1 = this.AdditionalList[p].Text;
        }
        if (this.WholeData.AddQuesSet.results[1].RbFg == this.AdditionalList[p].Key) {
          this.AdditionalName2 = this.AdditionalList[p].Text;
        }
        if (this.WholeData.AddQuesSet.results[2].RbFg == this.AdditionalList[p].Key) {
          this.AdditionalName3 = this.AdditionalList[p].Text;
        }
        if (this.WholeData.AddQuesSet.results[3].RbFg == this.AdditionalList[p].Key) {
          this.AdditionalName4 = this.AdditionalList[p].Text;
        }
      }
      for (let z = 0; z < this.WholeData.NOTESSet.results.length; z++) {
        if (this.WholeData.NOTESSet.results[z].Rcodez == "EWQ_NOTE01") {
          this.AdditionalNotes1 = this.WholeData.NOTESSet.results[z].Strline;
        }
        if (this.WholeData.NOTESSet.results[z].Rcodez == "EWQ_NOTE02") {
          this.AdditionalNotes2 = this.WholeData.NOTESSet.results[z].Strline;
        }
        if (this.WholeData.NOTESSet.results[z].Rcodez == "EWQ_NOTE03") {
          this.AdditionalNotes3 = this.WholeData.NOTESSet.results[z].Strline;
        }
        if (this.WholeData.NOTESSet.results[z].Rcodez == "EWQ_NOTE04") {
          this.AdditionalNotes4 = this.WholeData.NOTESSet.results[z].Strline;
        }
      }
    }
  }
  warehouseInfoData() {
    const instructionValue = this.InstructionFormGroup.value;
    const warehouseValue = this.WarehouseInformation.value;
    this.WarehouseInfoModel.Agreeflg = instructionValue.agree;
    this.WarehouseInfoModel.SelectWarehouse = warehouseValue.purpose;
    this.WarehouseInfoModel.Fin = this.WareHouseDetails.Fin;
    this.WarehouseInfoModel.Bussiness = this.WareHouseDetails.Bunm;
    this.WarehouseInfoModel.ExpiryDate = warehouseValue.expiryDate
    return this.WarehouseInfoModel;
  }
  getexistingrenewalwarehouseApi() {
    this.wareHousesService.getWHInformation3(this.GPartz, this.Language).subscribe((data) => {
      if (data['d'].ITM_SAVEDSet.results.length > 0) {
        this.WareHouseDetails = data['d'];
        this.WareHouseDetailsItemSaveData = this.WareHouseDetails.ITM_SAVEDSet.results;
        this.WareHouseNoDropdown = [];
        for (let i = 0; i < this.WareHouseDetails.ITM_SAVEDSet.results.length; i++) {
          this.WareHouseNoDropdown.push({ 'Whnox': this.WareHouseDetails.ITM_SAVEDSet.results[i].Whno })
        }
        //this.ReturnId = data["d"].ReturnIdx;
        console.log("existingdata", this.WareHouseDetails);
      }
      else {
        // this.newrenewalWarehouse();
        // $('#proceed').modal('hide');
        // this.getWHInformation();
      }
    },
      (err) => {
        $('#confirm').modal('hide');
        $('#proceed').modal('hide');
        $('#instructions').modal('hide');
        $("#aftsubmit").modal("show");
        this.resText = err.error.error.innererror.errordetails[0].message;
        this.resText1 = err.error.error.innererror.errordetails[1].message;
      }
    );
  }
  getStatusChangeApi(val) {
    this.wareHousesService.getWHInformation5(this.GPartz, this.Language, val).subscribe(data => {
      console.log(data["d"]);
      this.RegionDistrictList = data["d"]["districtSet"]["results"];
      this.CityList = data["d"]["citySet"]["results"];
      this.CountrySetList = data["d"]["COUNTRYSet"]["results"];
      this.OwnerShipCountrySetList = this.CountrySetList;
      this.ManagerCountrySetList = this.CountrySetList;
      this.TitleSet = data["d"]["TITLESet"]["results"];
      this.ProductSet = data["d"]["DropGoodsSet"]["results"];
      this.ProductSet.filter(x => x.Flag = '');
      this.ProductSet.forEach(element => {
        element['flag'] = false;
        element['disabled'] = false;
      });
      this.UnitMSet = data["d"]["UnitMSet"]["results"];
      this.TaxRateSet = data["d"]["GDTAXRATESet"]["results"];
      // for (let i = 0; i < this.UsagePurposeList.length; i++) {
      //   if(this.WholeData.Purpose==this.UsagePurposeList[i].Key)
      //   {
      //     this.Purpose=this.UsagePurposeList[i].Text;
      //   }
      // }
      this.ownerIdType1(this.WarehouseIsIndividualOwnerShip.value.idType);
      this.managerIdType1(this.WarehouseManagerInfoFormControls1.value.idType);
      let purpose = this.UsagePurposeList.filter(x => x.Key == this.WholeData.Purpose);
      this.Purpose = purpose[0].Text;
      this.GoodsType = '';
      let goodstype = this.WH_EREGGOODSSet.filter(x => x.Flag == "X");
      this.ProductSet.forEach(element => {
        element['disabled'] = true;
      });
      for (let i = 0; i < this.WH_EREGGOODSSet.length; i++) {
        for (let j = 0; j < this.ProductSet.length; j++) {
          if (this.ProductSet[j].GoodsTyp == this.WH_EREGGOODSSet[i].GoodsTyp) {
            this.ProductSet[j].disabled = false;
          }
        }
      }
      for (let i = 0; i < goodstype.length; i++) {
        for (let j = 0; j < this.ProductSet.length; j++) {
          if (this.ProductSet[j].GoodsTyp == goodstype[i].GoodsTyp) {
            this.Ereggoodsset(j);
            // if(i< goodstype.length-1)
            // {
            // this.GoodsType += this.ProductSet[j].GoodsTxt + ",";
            // }
            // else{
            //   this.GoodsType += this.ProductSet[j].GoodsTxt;
            // }
            this.ProductSet[j].Flag = 'X';
          }

        }
      }
      this.banktotalchange();
      this.ownerNationality(this.WholeData.WH_CONTACTPSet.results[1].Nationality);
    });
  }
  banktotalchange() {
    //if (this.whnoflag == true) {
    this.warehouseBankInfoFormControls();
    this.warehouseBankInfo();
    // }
  }
  wareHouseChange(val, Fbguid) {
    this.wareHousesService.getWHInformation4(this.GPartz, this.Language, val, Fbguid).subscribe(data => {
      this.WholeData = [];
      this.WholeData = data["d"];
      this.ReturnId = data["d"].ReturnIdz;
      console.log(data["d"]);
      this.warehouseno = val;
      this.WhAddressSet = data["d"]["WH_ADDRESSSet"]["results"];
      this.WH_CONTACTPSet = data["d"]["WH_CONTACTPSet"]["results"];
      this.WH_CONTACT_DTLSet = data["d"]["WH_CONTACT_DTLSet"]["results"];
      this.RetailSet = data["d"]["WH_GOODSDTLSet"]["results"];
      this.WH_EREGGOODSSet = data["d"]["WH_EREGGOODSSet"]["results"];
      this.getStatusChangeApi(this.WholeData.Statusz);
      this.licenserenewal = this.WholeData.RenChg == '1' ? 'Yes' : 'No';
      this.WarehouseInformation.controls['finNo'].setValue(this.WholeData.Fin);
      this.WarehouseInfoModel.Fin = this.WholeData.Fin;
      this.WarehouseInfoModel.Bussiness = this.WholeData.Bunm;
      for (let i = 0; i < this.oIdType1.length; i++) {
        if (this.WholeData.Type == this.oIdType1[i].Key) {
          this.DeclarationIdTypeName = this.oIdType1[i].Text;
        }
      }
      this.WarehouseInformation.patchValue({
        purpose: val,
        RenewalExtent: this.WholeData.RenPeriod
      });
      this.WarehouseInformation.controls['bussinessName'].setValue(this.WholeData.Bunm);
      const expiryDate = this.WholeData.Endda !== null && this.WholeData.Endda !== undefined ? new Date(+this.WholeData.Endda.substr(6, 13)) : this.CurrentDate;
      console.log('exp', expiryDate);
      this.WarehouseInformation.controls['expiryDate'].setValue(expiryDate.toString());
      this.WarehouseInfoModel.ExpiryDate = expiryDate.toString();
      if (this.WholeData.ChgWhPrdDt !== undefined && this.WholeData.ChgWhPrdDt !== "" && this.WholeData.ChgWhPrdDt !== null) {
        if (this.WholeData.ChgWhPrdDt.includes('/Date')) {
          this.ProdValidfrom = new Date(+this.WholeData.ChgWhPrdDt.substr(6, 13)).toISOString().slice(0, 19);
        }
        else {
          let pickerValue = this.datePickerValue(this.WholeData.ChgWhPrdDt);
          this.ProdValidfrom = new Date(+pickerValue.split("T00:00:00")).toString();
        }
      } else {
        this.ProdValidfrom = this.CurrentDate.toString();
      }
      if (this.WholeData.RenExt == 1) {
        this.isCard = 'Yes';
      }
      else {
        this.isCard = 'No'
      }
      if (this.WholeData.ChgWhIdDt !== undefined && this.WholeData.ChgWhIdDt !== "" && this.WholeData.ChgWhIdDt !== null) {
        if (this.WholeData.ChgWhIdDt.includes('/Date')) {
          this.ValidFromWarehouseIdentity = new Date(+this.WholeData.ChgWhIdDt.substr(6, 13)).toISOString().slice(0, 19);
        }
        else {
          let pickerValue = this.datePickerValue(this.WholeData.ChgWhIdDtt);
          this.ValidFromWarehouseIdentity = new Date(+pickerValue.split("T00:00:00")).toString();
        }
      } else {
        this.ValidFromWarehouseIdentity = this.CurrentDate.toString();
      }
      //if (this.whnoflag == true) {
      this.declarationInfo();
      this.warehouseDeclarationData();
      this.warehouseownershipEdit();
      //this.WarehousedimensionsData();
      //this.warehouseDimensionsData();
      this.warehousedimensionsEdit();
      this.warehouseIdentificationEdit();
      this.warehousemaninfoEdit();
      this.warehouseManagerInfo2();
      this.bindingAttachment();
      //this.WarehouseOwnershipMethod();
      for (let i = 0; i < this.oIdType1.length; i++) {
        if (this.WholeData.WH_CONTACTPSet.results[1].Type == this.oIdType1[i].Key) {
          this.OwnerIdTypeName = this.oIdType1[i].Text;
        }
      }
      // }
      this.warehouseManagerInfo1();
      this.warehouseManagerInfoData();
      this.PurposeChange(this.WholeData.Purpose);
      if (this.WholeData.Purpose == '02') {
        this.storageflag = true;
      }
      else {
        this.storageflag = false;
      }
      this.isCard = this.WholeData.RenExt == 1 ? 'Yes' : 'No';
      this.isCardTP = this.WholeData.ChgWhPrd;
      if (this.isCardTP == '1') {
        this.TypeandProdctSetValidators();
        this.isCardTP = '0';
        this.TypesChange('TP');
      }
      else {
        this.TypeandProdctRemoveValidators();
        this.isCardTP = '0';
      }
      this.isCardWD = this.WholeData.ChgWhDm;
      if (this.isCardWD == '1') {
        this.isCardWD = '0';
        this.TypesChange('WD');
        this.WarehouseDimensionsSetValidators();

      }
      else {
        this.WarehouseDimensionsRemoveValidators();
        this.isCardWD = '0';
      }
      this.isCardWI = this.WholeData.ChgWhId;
      if (this.isCardWI == '1') {
        this.isCardWI = '0';
        this.TypesChange('WI');
        this.WarehouseIdentificationSetValidators();
      }
      else {
        this.WarehouseIdentificationRemoveValidators();
        this.isCardWI = '0';
      }
      this.isCardWM = this.WholeData.ChgWhMi;
      if (this.isCardWM == '1') {
        this.isCardWM = '0';
        this.TypesChange('WM');
        this.WarehouseManagerInfoSetValidators();
      }
      else {
        this.WarehouseManagerInfoRemoveValidators();
        this.isCardWM = '0';
      }
      this.isCardWO = this.WholeData.ChgWhOi;
      if (this.isCardWO == '1') {
        this.isCardWO = '0';
        this.TypesChange('WO');
        this.WarehouseownershipSetValidators();
      }
      else {
        this.WarehouseownershipRemoveValidators();
        this.isCardWO = '0';
      }
      this.isCardBG = this.WholeData.ChgWhBg;
      if ((this.isCardWO == '0' || this.isCardWO == '') && (this.isCardWM == '0' || this.isCardWM == '') && (this.isCardWI == '0' || this.isCardWI == '') && (this.isCardWD == '0' || this.isCardWD == '') && (this.isCardTP == '0' || this.isCardTP == '')) {
        this.isCardBG = '0';
        this.WholeData.ChgWhBg = '0';
        this.Changetype = '0';
      }
      else {
        this.isCardBG = '1';
        this.WholeData.ChgWhBg = '1'
        this.Changetype = '1';
      }

    },
      (err) => {
        $("#aftsubmit").modal("show");
        this.resText = err.error.error.innererror.errordetails[0].message;
        this.resText1 = err.error.error.innererror.errordetails[1].message;
      }
    );
  }
  GlobalNumberAllow(event) {
    var rgx = /^\d{0,13}(\.\d{0,2})?$/;
    if (event.keyCode == 8) {
      return true;
    }
    else if (!rgx.test((event.target.value).toString().replace(/,/g, ''))) {
      event.preventDefault();
    }
  }
  Ereggoodsset(val) {

    let selected = this.ProductSet.filter(e => e.flag);
    if (val == 0) {
      if (selected.length > 0) {
        if (+selected[0]["GoodsTyp"] - 1 != val) {
          return
        }
      }
      this.ProductSet[val].flag = !this.ProductSet[val].flag;
      if (this.ProductSet[0].flag) {
        this.ProductSet.filter((e, index) => {
          if (val != index) {
            e.flag = false;
            e.disabled = true;
          }
        });
      } else {
        this.ProductSet.filter(e => { e.flag = false; e.disabled = false; });
      }
    } else if (!this.ProductSet[0].flag) {
      this.ProductSet[val].flag = !this.ProductSet[val].flag;
      if (val == 1 || val == 2 || val == 3) {
        this.ProductSet[0].disabled = true;
        this.ProductSet[0].flag = false;
      }
      if (!this.ProductSet[1].flag && !this.ProductSet[2].flag && !this.ProductSet[3].flag) {
        this.ProductSet[0].disabled = false;
      }
    }
    console.log('goods', this.WH_EREGGOODSSet);
    this.addingproducts();
  }
  Ereggoodsset1(val) {
    // this.ProductSet[val].flag = !this.ProductSet[val].flag;
    let selected = this.ProductSet.filter(e => e.flag);
    if (val == 0) {
      if (selected.length > 0) {
        if (+selected[0]["GoodsTyp"] - 1 != val) {
          return
        }
      }
      this.ProductSet[val].flag = !this.ProductSet[val].flag;
      if (this.ProductSet[0].flag) {
        this.ProductSet.filter((e, index) => {
          if (val != index) {
            e.flag = false;
            e.disabled = true;
          }
        });
      } else {
        this.ProductSet.filter(e => { e.flag = false; e.disabled = false; });
      }
    } else if (!this.ProductSet[0].flag) {
      this.ProductSet[val].flag = !this.ProductSet[val].flag;
      if (val == 1 || val == 2 || val == 3) {
        this.ProductSet[0].disabled = true;
        this.ProductSet[0].flag = false;
      }
      if (!this.ProductSet[1].flag && !this.ProductSet[2].flag && !this.ProductSet[3].flag) {
        this.ProductSet[0].disabled = false;
      }
    }
    this.RetailSet.filter(x => x.Gdtyp == this.ProductSet[val].GoodsTyp);
    if (this.ProductSet[val].flag == false) {
      let control = <FormArray>this.BankGuaranteeInformation.controls['Rows'];
      let control1 = control.value.filter(x => x.energyDrinks != this.ProductSet[val].GoodsTyp);

      this.BankGuaranteeInformation = this.formBuilder.group({
        Rows: this.formBuilder.array([]),
        initialBankGuaranteeValue: this.formBuilder.control('')
      });
      this.BankGuaranteeValue = 0;
      for (let i = 0; i < control1.length; i++) {
        this.formArr().push(this.initRows(control1[i].energyDrinks, control1[i].movedgoods, control1[i].quantity, control1[i].unitofMeasure, control1[i].totalRspValue));
        this.rspTotal(i);
      }
      // let value = this.ProductSet.filter(x => x.flag == true);
      // for (let j = 0; j < this.ProductSet.length; j++) {
      //   if (this.ProductSet[j].flag == false) {
      //     value = value.filter(x => x.Gdtyp != this.ProductSet[j].GoodsTyp);
      //   }
      // }
      // let goodsType;
      // for (let i = 0; i < value.length; i++) {
      //   for (let j = 0; j < this.TaxGoodType.length; j++) {
      //     if (this.TaxGoodType[j].Key == value[i].Gddtl) {
      //       goodsType = value[i].Gddtl;
      //     }
      //   }
      //   this.formArr().push(this.initRows(value[i].Gdtyp, goodsType, value[i].Bgqt, value[i].Bguom, value[i].Bgrsp));
      //   this.rspTotal(i);
      // }
    }
    else {
      // let goodsType;
      // let value = this.RetailSet.filter(x => x.Gdtyp == this.ProductSet[val].GoodsTyp);
      for (let i = 0; i < this.TaxGoodType.length; i++) {
        // for (let j = 0; j < this.TaxGoodType.length; j++) {
        //   if (this.TaxGoodType[j].Key == value[i].Gddtl) {
        //     goodsType = this.RetailSet[i].Gddtl;
        //   }
        // }
        this.formArr().push(this.initRows(this.ProductSet[val].GoodsTyp, this.TaxGoodType[i].Key, '0.00', '', '0.00'));
        this.rspTotal(i);
      }
    }
    for (let i = 0; i < this.WH_EREGGOODSSet.length; i++) {
      for (let j = 0; j < this.ProductSet.length; j++) {
        if (this.ProductSet[j].GoodsTyp == this.WH_EREGGOODSSet[i].GoodsTyp) {
          this.ProductSet[j].disabled = false;
        }
      }
    }
    console.log('goods', this.WH_EREGGOODSSet);
    this.addingproducts();
  }
  addingproducts() {
    this.GoodsType = '';
    let goodstype = this.ProductSet.filter(x => x.flag == true);
    for (let i = 0; i < goodstype.length; i++) {
      if (i < goodstype.length - 1) {
        this.GoodsType += goodstype[i].GoodsTxt + ",";
      }
      else {
        this.GoodsType += goodstype[i].GoodsTxt
      }
    }
  }
  getWHInformation() {
    this.wareHousesService.getWHInformationfresh(this.GPartz, this.Language).subscribe(data => {
      if (data["d"].results.length > 0) {
        console.log('newdata', data["d"]);
        this.WareHouseNoDropdown = data["d"]["results"];
        this.WareHouseDetails = data["d"]["results"][0];
        // this.WarehouseWholeData = data["d"].DRAFT_WHLISTSet.results;
        //  this.WarehouseListData = data["d"].ACT_WHLISTSet.results;
        this.WarehouseInformation.controls['finNo'].setValue(this.WareHouseDetails.Fin);
        this.WarehouseInformation.controls['bussinessName'].setValue(this.WareHouseDetails.Bunm);
        const expiryDate = this.WareHouseDetails.Endda !== null && this.WareHouseDetails.Endda !== undefined ? new Date(+this.WareHouseDetails.Endda.substr(6, 13)) : this.CurrentDate;
        console.log('exp', expiryDate);
        this.WarehouseInformation.controls['expiryDate'].setValue(expiryDate.toString());
        //$('#instructions').modal('show');
        this.warehouseInfoData();
      }
    },
      (err) => {
        $('#confirm').modal('hide');
        $('#proceed').modal('hide');
        $('#instructions').modal("hide");
        $("#aftsubmit").modal("show");
        this.resText = err.error.error.innererror.errordetails[0].message;
        //this.resText1 = err.error.error.innererror.errordetails[1].message;

      }
    );
  }
  whinfo(val) {
    this.isCard = val;
    let RenExt = this.isCard == 'Yes' ? '1' : '0';
    if (RenExt == '1') {
      this.WarehouseInformation.patchValue({
        'RenewalExtent': '1'
      });
    }
    this.WholeData.RenPeriod = RenExt;
  }
  Licenserenewal(val) {
    this.licenserenewal = val;
  }
  warehouseInfoFormControls() {
    this.WarehouseInformation.addControl('purpose', new FormControl('', [Validators.required]));
    this.WarehouseInformation.addControl('RenewalExtent', new FormControl(''));
  }
  termsAndConditionsAccept() {
    this.step2();
    this.whnoflag = false;
    $('#instructions').modal('hide');
  }
  popUpClose() {
    $('#instructions').modal('hide');
    this.router.navigate(['/mains/tax']);
  }
  redirectToBack() {
    this.router.navigate(['/mains/tax']);
  }
  draftRadioSelected(i) {
    $('#proceed').modal('hide');
    let warehouseNo;
    let Fbguid;
    for (let h = 0; h < this.WareHouseDetailsItemSaveData.length; h++) {
      if (i == h) {
        warehouseNo = this.WareHouseDetailsItemSaveData[h].Whno;
        Fbguid = this.WareHouseDetailsItemSaveData[h].Fbguid;
      }
    }
    if (warehouseNo !== undefined) {
      this.whnoflag = true;
      this.warehoueInformationFormControls();
      this.wareHouseChange(warehouseNo, Fbguid);
      this.step2();
    }
  }
  AcknowledgementMethod() {
    let fnumb = '0' + this.WholeData.Fbnumz;
    this.wareHousesService.acknowledgementform(fnumb).subscribe((data: any) => {

      FileSaver.saveAs(data, "acknowledgement.pdf");

    }, (error) => {
      console.log('err-2', error);
    });
  }
  downloadownershipattach(Doguid, Dotyp, filename) {
    this.wareHousesService.downloadAttachments(Doguid, Dotyp).subscribe((data: any) => {

      FileSaver.saveAs(data, filename);

    }, (error) => {
      console.log('err-2', error);
    });
  }
  DownloadFormMethod() {
    let fnumb = '0' + this.WholeData.Fbnumz;
    this.wareHousesService.downloadfilledform(fnumb).subscribe((data: any) => {

      FileSaver.saveAs(data, "DownloadForm.pdf");

    }, (error) => {
      console.log('err-2', error);
    });
  }
  /*ownership start */
  warehouseOwnerShipFormControls() {
    this.WarehouseOwnerShip = new FormGroup({
      leasedWarehouse: new FormControl('', [Validators.required]),
      ownerType: new FormControl('', [Validators.required]),
      //validFrom: new FormControl('', [Validators.required]),
      leaseDate: new FormControl('', [Validators.required]),
      expiryDate: new FormControl('', [Validators.required])
    });
  }

  warehouseownershipIndividualFormControls() {
    this.WarehouseIsIndividualOwnerShip = new FormGroup({
      idType: new FormControl('', [Validators.required]),
      idNumber: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern(this.Alphanumeric)]),
      nationality: new FormControl('', [Validators.required]),
      Nameoftheowner: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.pattern(this.StringPattern)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(14), Validators.pattern(this.NumberPattern)]),
      emailId: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.pattern(this.EmailPattern)])
    });
  }
  warehouseownershipIsCompanyFormControls() {
    this.WarehouseIsCompanyOwnerShip = new FormGroup({
      //ownerType: new FormControl('', [Validators.required]),
      // validFrom: new FormControl('', [Validators.required]),
      // countryCode: new FormControl('', [Validators.required]),
      crNo: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(10), Validators.maxLength(10)]),
      tin: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.NumberPattern)]),
      companyName: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.pattern(this.StringPattern)]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(14), Validators.pattern(this.NumberPattern)])
    });
  }
  ownerTypeChange(val) {
    this.isOwnerType = val;
    for (let i = 0; i < this.wareHsLease.length; i++) {
      if (val == this.wareHsLease[i].Key) {
        this.OwnerTypeName = this.wareHsLease[i].Text;
      }
    }
    // this.removeOwnershipIsindividualControls();
    // this.removeOwnershipIsCompanyControls();
    if (val == 'C') {
      this.isCompany = true;
      this.isIndividual = false;
      //this.WarehouseIsCompanyOwnerShip.removeControl('leaseDate');
      //this.WarehouseIsCompanyOwnerShip.removeControl('expiryDate');
      //this.removeOwnershipIsindividualControls();
      this.warehouseownershipIsCompanyFormControls();
    } else {
      this.isCompany = false;
      this.isIndividual = true;
      //  this.removeOwnerShipControls();
      this.WarehouseIsCompanyOwnerShip.removeControl('leaseDate');
      // this.WarehouseIsCompanyOwnerShip.removeControl('expiryDate');
      // this.warehouseownershipIndividualFormControls();
    }
  }
  ownerNationality(value) {
    for (let i = 0; i < this.CountrySetList.length; i++) {
      if (value == this.CountrySetList[i].Land1) {
        this.OwnerNationalityName = this.CountrySetList[i].Landx50;
      }
    }
  }
  ownerIdType(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.OwnerIdTypeName = this.oIdType1[i].Text;
      }
    }
    if (this.WarehouseIsIndividualOwnerShip.value.idType == "ZS0001") {
      //this.WarehouseIsIndividualOwnerShip.disable();
      //this.WarehouseIsIndividualOwnerShip.get("idType").enable();
      $("#idWHOwnerValidation").modal("show");
      this.OwnerShipCountrySetList = this.CountrySetList;
      this.isWHOwnershipInfo = true;
      this.WarehouseIsIndividualOwnerShip.patchValue({
        nationality: 'SA'
      })
    }
    else if (this.WarehouseIsIndividualOwnerShip.value.idType == "ZS0002") {
      //this.WarehouseIsIndividualOwnerShip.disable();
      //this.WarehouseIsIndividualOwnerShip.get("nationality").enable();
      // this.WarehouseIsIndividualOwnerShip.get("idType").enable();
      $("#idWHOwnerValidation").modal("show");
      this.OwnerShipCountrySetList = this.CountrySetList;
      this.isWHOwnershipInfo = true;
      this.WarehouseIsIndividualOwnerShip.patchValue({
        nationality: ''
      })
    }
    else {
      // this.WarehouseIsIndividualOwnerShip.disable();
      this.WarehouseIsIndividualOwnerShip.enable();
      this.isWHOwnershipInfo = false;
      this.OwnerShipCountrySetList = this.CountrySetList.filter(x => x.GccFlag == 'X');
      this.WarehouseIsIndividualOwnerShip.patchValue({
        nationality: ''
      })
    }
  }
  ownerIdType1(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.OwnerIdTypeName = this.oIdType1[i].Text;
      }
    }
    if (this.WarehouseIsIndividualOwnerShip.value.idType == "ZS0001") {
      //this.WarehouseIsIndividualOwnerShip.disable();
      //this.WarehouseIsIndividualOwnerShip.get("idType").enable();
      //$("#idWHOwnerValidation").modal("show");
      this.OwnerShipCountrySetList = this.CountrySetList;
      this.isWHOwnershipInfo = true;
    }
    else if (this.WarehouseIsIndividualOwnerShip.value.idType == "ZS0002") {
      //this.WarehouseIsIndividualOwnerShip.disable();
      //this.WarehouseIsIndividualOwnerShip.get("nationality").enable();
      // this.WarehouseIsIndividualOwnerShip.get("idType").enable();
      //$("#idWHOwnerValidation").modal("show");
      this.OwnerShipCountrySetList = this.CountrySetList;
      this.isWHOwnershipInfo = true;
    }
    else {
      // this.WarehouseIsIndividualOwnerShip.disable();
      //this.WarehouseIsIndividualOwnerShip.enable();
      this.isWHOwnershipInfo = false;
      this.OwnerShipCountrySetList = this.CountrySetList.filter(x => x.GccFlag == 'X');
    }
  }
  managerIdType1(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.ManagerIdTypeName = this.oIdType1[i].Text;
      }
    }
    // alert(this.WarehouseManagerInfoFormControls1.value.idType);
    // if(this.WarehouseManagerInfoFormControls1.value.idType == "ZS0003") {
    //   // alert('hi');

    // }
    if (this.WarehouseManagerInfoFormControls1.value.idType == "ZS0001") {
      //this.WarehouseManagerInfoFormControls1.get("idNumber").disable();
      //this.WarehouseManagerInfoFormControls1.disable();
      // this.WarehouseManagerInfoFormControls1.get("dateOfHiring").enable();
      // this.WarehouseManagerInfoFormControls1.get("idType").enable();
      // $("#idValidation").modal("show");
      this.ManagerCountrySetList = this.CountrySetList;
      this.isWHManagerInfo = true;
    }
    else if (this.WarehouseManagerInfoFormControls1.value.idType == "ZS0002") {
      //this.WarehouseManagerInfoFormControls1.disable();
      // this.WarehouseManagerInfoFormControls1.get("dateOfHiring").enable();
      // this.WarehouseManagerInfoFormControls1.get("nationalityOfOwner").enable();
      // this.WarehouseManagerInfoFormControls1.get("idType").enable();
      //$("#idValidation").modal("show");
      this.isWHManagerInfo = true;
      this.ManagerCountrySetList = this.CountrySetList;
    }
    else {
      // this.WarehouseManagerInfoFormControls1.disable();
      //this.WarehouseManagerInfoFormControls1.enable();
      this.isWHManagerInfo = false;
      this.ManagerCountrySetList = this.CountrySetList.filter(x => x.GccFlag == 'X');
    }

  }
  managerIdType(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.ManagerIdTypeName = this.oIdType1[i].Text;
      }
    }
    // alert(this.WarehouseManagerInfoFormControls1.value.idType);
    // if(this.WarehouseManagerInfoFormControls1.value.idType == "ZS0003") {
    //   // alert('hi');

    // }
    if (this.WarehouseManagerInfoFormControls1.value.idType == "ZS0001") {
      //this.WarehouseManagerInfoFormControls1.get("idNumber").disable();
      //this.WarehouseManagerInfoFormControls1.disable();
      // this.WarehouseManagerInfoFormControls1.get("dateOfHiring").enable();
      // this.WarehouseManagerInfoFormControls1.get("idType").enable();
      $("#idValidation").modal("show");
      this.ManagerCountrySetList = this.CountrySetList;
      this.isWHManagerInfo = true;
      this.WarehouseManagerInfoFormControls1.patchValue({
        nationalityOfOwner: 'SA'
      })
    }
    else if (this.WarehouseManagerInfoFormControls1.value.idType == "ZS0002") {
      //this.WarehouseManagerInfoFormControls1.disable();
      // this.WarehouseManagerInfoFormControls1.get("dateOfHiring").enable();
      // this.WarehouseManagerInfoFormControls1.get("nationalityOfOwner").enable();
      // this.WarehouseManagerInfoFormControls1.get("idType").enable();
      $("#idValidation").modal("show");
      this.isWHManagerInfo = true;
      this.ManagerCountrySetList = this.CountrySetList;
      this.WarehouseManagerInfoFormControls1.patchValue({
        nationalityOfOwner: ''
      })
    }
    else {
      // this.WarehouseManagerInfoFormControls1.disable();
      //this.WarehouseManagerInfoFormControls1.enable();
      this.isWHManagerInfo = false;
      this.ManagerCountrySetList = this.CountrySetList.filter(x => x.GccFlag == 'X');
      this.WarehouseManagerInfoFormControls1.patchValue({
        nationalityOfOwner: ''
      })
    }

  }
  ownerIdNumber(value) {
    const IdType = this.WarehouseIsIndividualOwnerShip.value.idType;
    const todayDate = moment(this.CurrentDate).format('YYYYMMDD');
    setTimeout(() => {
      this.wareHousesService.getWHIDOwnerInfo(IdType, value, todayDate).subscribe(data => {
        if (data) {
          console.log('owner-id-no', data["d"]);
          this.WarehouseIsIndividualOwnerShip.patchValue({
            'Nameoftheowner': data["d"]["Name1"],
            'phoneNumber': data["d"]["Mobile"],
            'emailId': data["d"]["Email"]
          })
        }
      }, (error) => {
        console.log('err', error);
        // this.WarehouseIsIndividualOwnerShip.patchValue({
        //   'idNumber': ''
        // });
      });
    }, 500)
  }
  ownerIdCRNumber(value) {
    setTimeout(() => {
      this.wareHousesService.getCrno(value).subscribe(data => {
        if (data) {
          console.log('owner-id-no', data["d"]);
          this.WarehouseIsCompanyOwnerShip.patchValue({
            companyName: data["d"]["Compnm"],
            address: data["d"]["WoAddress"],
            phone: data["d"]["TelNumber"],
            tin: data["d"]["WoTin"]
          });
        }
      }, (error) => {
        console.log('err', error);
        // this.WarehouseIsCompanyOwnerShip.patchValue({
        //   'tin': ''
        // });
      });
    }, 500)
  }
  isNo: boolean = false;
  whOwnership(val) {
    // if (val == '1') {
    //   this.isCard1 = 'Yes';
    // }
    // else {
    //   this.isCard1 = 'No';
    // }
    this.isCard1 = val;
    this.isCompany = false;
    if (val == 'Yes') {
      this.isNo = true;
      this.iswhOwnership = true;
      this.isIndividual = true;
      // this.warehouseOwnerShipFormControls();
      this.warehouseownershipIndividualFormControls();
    } else {
      this.isNo = false;
      this.iswhOwnership = false;
      this.isIndividual = false;
      // this.removeOwnerShipControls();
      // this.removeOwnershipIsindividualControls();
      // this.removeOwnershipIsCompanyControls();
    }
  }
  NationalityofownerType(value) {
    for (let d = 0; d < this.CountrySetList.length; d++) {

      if (value == this.CountrySetList[d].Land1) {
        this.ManagerNationalityName = this.CountrySetList[d].Landx50;
      }
    }
  }
  ManagerTitleChange(value) {
    for (let d = 0; d < this.CountrySetList.length; d++) {
      if (value == this.CountrySetList[d].Land1) {
        this.ManagerTitleName = this.CountrySetList[d].Natio50;
      }
    }
  }
  districtchange(value) {
    for (let d = 0; d < this.RegionDistrictList.length; d++) {
      if (value == this.RegionDistrictList[d].Bland) {
        this.DistrictName = this.RegionDistrictList[d].Bezei;
      }
    }
  }
  citychange(value) {
    // for (let d = 0; d < this.CityList.length; d++) {
    //   if (value == this.CityList[d].CityName) {
    //     this.CityName = this.CityList[d].CityName;
    //   }
    // }
    this.CityName = value;
  }
  removeOwnerShipControls() {
    this.WarehouseOwnerShip.removeControl('ownerType');
    //this.WarehouseOwnerShip.removeControl('validFrom');
    this.WarehouseIsCompanyOwnerShip.removeControl('leaseDate');
    this.WarehouseIsCompanyOwnerShip.removeControl('expiryDate');
    this.WarehouseOwnerShip.removeControl('leasedWarehouse');
  }
  removeOwnershipIsindividualControls() {
    this.WarehouseIsIndividualOwnerShip.removeControl('idType');
    this.WarehouseIsIndividualOwnerShip.removeControl('idNumber');
    this.WarehouseIsIndividualOwnerShip.removeControl('nationality');
    this.WarehouseIsIndividualOwnerShip.removeControl('Nameoftheowner');
    this.WarehouseIsIndividualOwnerShip.removeControl('phoneNumber');
    this.WarehouseIsIndividualOwnerShip.removeControl('emailId');
  }
  removeOwnershipIsCompanyControls() {
    this.WarehouseIsCompanyOwnerShip.removeControl('countryCode');
    this.WarehouseIsCompanyOwnerShip.removeControl('crNo');
    this.WarehouseIsCompanyOwnerShip.removeControl('tin');
    this.WarehouseIsCompanyOwnerShip.removeControl('companyName');
    this.WarehouseIsCompanyOwnerShip.removeControl('address');
    this.WarehouseIsCompanyOwnerShip.removeControl('phone');
  }
  saveownership() {
    //common
    this.WholeData.Whlsf = this.isCard1 == "No" ? '0' : '1';
    this.WholeData.Whlsi = this.WarehouseOwnerShip.value.ownerType;
    //this.WholeData.ChgWhOiDt = this.WarehouseOwnerShip.value.validFrom;
    let leasedate;
    let expirydate;
    if (this.WarehouseOwnerShip.value.leaseDate !== undefined && this.WarehouseOwnerShip.value.leaseDate !== "" && this.WarehouseOwnerShip.value.leaseDate !== null) {
      if (this.WarehouseOwnerShip.value.leaseDate.calendarEnd != undefined) {
        leasedate = this.datePickerValue(this.WarehouseOwnerShip.value.leaseDate);
      }
      else if (this.WarehouseOwnerShip.value.leaseDate.includes('/Date')) {
        leasedate = new Date(+this.WarehouseOwnerShip.value.leaseDate.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        leasedate = this.WarehouseOwnerShip.value.leaseDate;
      }
    } else {
      leasedate = this.CurrentDate.toISOString().slice(0, 19);
    }

    if (this.WarehouseOwnerShip.value.expiryDate !== undefined && this.WarehouseOwnerShip.value.expiryDate !== "" && this.WarehouseOwnerShip.value.expiryDate !== null) {
      if (this.WarehouseOwnerShip.value.expiryDate.calendarEnd != undefined) {
        expirydate = this.datePickerValue(this.WarehouseOwnerShip.value.expiryDate);
      }
      else if (this.WarehouseOwnerShip.value.expiryDate.includes('/Date')) {
        expirydate = new Date(+this.WarehouseOwnerShip.value.expiryDate.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        expirydate = this.WarehouseOwnerShip.value.expiryDate;
      }
    } else {
      expirydate = this.CurrentDate.toISOString().slice(0, 19);
    }
    this.WholeData.Lsfdt = leasedate;
    this.WholeData.Lsedt = expirydate;
    //individual
    if (this.WarehouseOwnerShip.value.ownerType == "I") {
      this.WholeData.WH_CONTACTPSet.results[1].Type = this.WarehouseIsIndividualOwnerShip.value.idType;
      this.WholeData.WH_CONTACTPSet.results[1].Idnumber = this.WarehouseIsIndividualOwnerShip.value.idNumber;
      this.WholeData.WH_CONTACTPSet.results[1].Nationality = this.WarehouseIsIndividualOwnerShip.value.nationality;
      this.WholeData.WH_CONTACTPSet.results[1].Firstnm = this.WarehouseIsIndividualOwnerShip.value.Nameoftheowner;
      this.WholeData.WH_CONTACT_DTLSet.results[1].MobNumber = this.WarehouseIsIndividualOwnerShip.value.phoneNumber;
      this.WholeData.WH_CONTACT_DTLSet.results[1].SmtpAddr = this.WarehouseIsIndividualOwnerShip.value.emailId;
    }
    //company
    if (this.WarehouseOwnerShip.value.ownerType == "C") {
      this.WholeData.WoCrNo = this.WarehouseIsCompanyOwnerShip.value.crNo;
      this.WholeData.WoTin = this.WarehouseIsCompanyOwnerShip.value.tin;
      this.WholeData.Compnm = this.WarehouseIsCompanyOwnerShip.value.companyName;
      this.WholeData.WoAddress = this.WarehouseIsCompanyOwnerShip.value.address;
      this.WholeData.WH_CONTACT_DTLSet.results[1].TelNumber = this.WarehouseIsCompanyOwnerShip.value.phone;
    }
    this.WholeData.Operationz = '05';
    this.wareHousesService.RenewalWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        console.log('save-2', data["d"]);
        this.WholeData = [];
        this.WholeData = data["d"];
        //this.successMsg = true;
        if (this.whnoflag == true) {
          this.step3();
        }
        let successmsg;
        if (this.Language == 'A') {
          successmsg = "تم حفظ طلب تجديد رخصة المستودع الضريبي بنجاح";
        }
        else {
          successmsg = "Warehouse License Renewal Application Form saved successfully";
        }
        this.notifierService.notify(
          "success",
          successmsg
        );

      }
    }, (error) => {
      console.log('err-2', error);
    });
  }
  /* ownership end*/
  ValidateFile(name: String) {
    // alert(name);
    // let filesize = 1000;
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'pdf') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'xls') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'xlsx') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'doc') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'docx') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'png') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'jpg') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'jpeg') {
      this.attachmentError = false;
      return true;
    }
    else {
      this.attachmentError = true;
      if (this.attachmentError == true) {
        if (this.Language == 'A') {
          this.errorMessage = "اختر ملفًا بملحق .XLS ، .XLSX ، .DOC ، .DOCX ، .PDF ، .JPG ، .JPEG ، .PNG"

        }
        else {
          this.errorMessage = "Choose only file with extension .XLS, .XLSX, .DOC, .DOCX, .PDF, .JPG, .JPEG &.PNG";
        }
        jQuery("#AttachmentModal").modal('show');
        return false;
      }
    }
  }
  warehouseIdentificationFormControls() {
    this.WarehouseIdentication = new FormGroup({
      warehouseName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      validFrom: new FormControl(''),
      BuildingNo: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern(this.NumberPattern)]),
      StreetName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      RegionDistrict: new FormControl('', [Validators.required]),
      City: new FormControl('', [Validators.required]),
      PostalCode: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.pattern(this.NumberPattern)]),
      Addrnumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(this.NumberPattern)]),
      Quarter: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      latitude: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern(this.DecimalPointPattern)]),
      longitude: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern(this.DecimalPointPattern)])
    });
  }
  managerIdNumberChange(value) {
    const IdType = this.WarehouseManagerInfoFormControls1.value.idType;
    this.WarehouseManagerInfoFormControls1.value.idNumber;
    const todayDate = moment(this.CurrentDate).format('YYYYMMDD');
    setTimeout(() => {
      this.wareHousesService.getWHIDManagerInfo(IdType, value, todayDate).subscribe(data => {
        if (data) {
          console.log('owner-id-no', data["d"]);
          this.WarehouseManagerInfoFormControls1.patchValue({
            'title': data["d"]["Title"],
            'name': data["d"]["Name1"],
            'surname': data["d"]["FamilyName"],
            'middlename': data["d"]["Initials"],
            'fatherName': data["d"]["FatherName"],
            'grandFatherName': data["d"]["GrandfatherName"],
            'phoneNumber': data["d"]["Mobile"],
            'emailId': data["d"]["Email"]
          })
        }
      }, (error) => {
        console.log('err', error);
        // this.WarehouseManagerInfoFormControls1.patchValue({
        //   'idNumber': ''
        // })
      });
    }, 500)
  }
  /*Dimensions Start*/
  warehouseDimensionsFormControls() {
    this.WarehouseDimensions = new FormGroup({
      //validFrom: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required, Validators.minLength(0.5), Validators.maxLength(1000), Validators.pattern(this.DecimalPointTwoPattern)]),
      width: new FormControl('', [Validators.required, Validators.minLength(0.5), Validators.maxLength(1000), Validators.pattern(this.DecimalPointTwoPattern)]),
      height: new FormControl('', [Validators.required, Validators.minLength(0.5), Validators.maxLength(1000), Validators.pattern(this.DecimalPointTwoPattern)]),
      cubicMeters: new FormControl('', [Validators.required, Validators.minLength(0.5), Validators.maxLength(1000), Validators.pattern(this.DecimalPointTwoPattern)]),
      squareMeters: new FormControl('', [Validators.required, Validators.minLength(0.5), Validators.maxLength(1000), Validators.pattern(this.DecimalPointTwoPattern)]),
    });
  }

  warehouseDimensionsData() {
    const warehouseDimension = this.WarehouseDimensions.value;
    this.WarehouseDimensionsModel.Length = warehouseDimension.length;
    this.WarehouseDimensionsModel.Width = warehouseDimension.width;
    this.WarehouseDimensionsModel.Height = warehouseDimension.height;
    this.WarehouseDimensionsModel.CubicMeters = warehouseDimension.cubicMeters;
    this.WarehouseDimensionsModel.SquareMeters = warehouseDimension.squareMeters;
    return this.WarehouseDimensionsModel;
  }
  saveDimension() {
    const Dimension = this.WarehouseDimensions.value;
    //let Hiring = Dimension.validFrom !== undefined && Dimension.validFrom !== null && Dimension.validFrom !== "" && Dimension.validFrom !== "Invalid date" ? this.datePickerValue(Dimension.validFrom) : moment(this.CurrentDate).format("YYYY-MM-DD");
    //this.WholeData.ChgWhDmDt = Hiring;
    this.WholeData.WH_ADDRESSSet.results[0].LenSiz = (Dimension.length != '' && Dimension.length != null && Dimension.length != undefined) ? Dimension.length : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].WidSiz = (Dimension.width != '' && Dimension.width != null && Dimension.width != undefined) ? Dimension.width : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].HeiSiz = (Dimension.height != '' && Dimension.height != null && Dimension.height != undefined) ? Dimension.height : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].CubicSc = (Dimension.cubicMeters != '' && Dimension.cubicMeters != null && Dimension.cubicMeters != undefined) ? Dimension.cubicMeters : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].SquarSc = (Dimension.squareMeters != '' && Dimension.squareMeters != null && Dimension.squareMeters != undefined) ? Dimension.squareMeters : '0.00';
    this.WholeData.Operationz = '05';
    this.wareHousesService.RenewalWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        console.log('save-3', data["d"]);
        this.WholeData = [];
        this.WholeData = data["d"];
        //this.successMsg = true;
        this.warehouseDimensionsData();
        if (this.whnoflag == true) {
          this.step3();
        }
        let successmsg;
        if (this.Language == 'A') {
          successmsg = "تم حفظ طلب تجديد رخصة المستودع الضريبي بنجاح";
        }
        else {
          successmsg = "Warehouse License Renewal Application Form saved successfully";
        }
        this.notifierService.notify(
          "success",
          successmsg
        );
      }
    }, (error) => {
      console.log('err-3', error);
    });
  }
  /*Dimensions End*/
  /*Type&Product start */
  TypeProductFormControls() {
    this.TypeProductForm = new FormGroup({
      Purpose: new FormControl('', [Validators.required]),
      Flag: new FormControl('', [Validators.required]),
      GoodsWarehouse: new FormControl(''),
    });
  }
  typecheckClick(value) {
    if (value == false) {
      this.TypeProductForm.patchValue({
        Flag: ''
      })
    }
  }
  saveTypeProduct() {
    let flag = "";
    if (this.TypeProductForm.value.Flag == true) {
      flag = "1";
    }
    else {
      flag = "";
    }

    this.WholeData.Purpose = this.TypeProductForm.value.Purpose;
    this.WholeData.ChgWhPrdDt = this.CurrentDate.toISOString().slice(0, 19);
    this.WholeData.ChgWhPrd = flag;
    this.WholeData.WH_EREGGOODSSet.results = [];
    for (let i = 0; i < this.ProductSet.length; i++) {
      if (this.ProductSet[i].flag == true) {
        this.WholeData.WH_EREGGOODSSet.results.push({
          DataVersion: "00000",
          Flag: "X"
          , FormGuid: ""
          , GdtyChgFg: ""
          , GdtyDelimitDt: null
          , GdtyDelimitDtC: ""
          , GdtyDelimitFg: ""
          , GoodsTxt: this.ProductSet[i].GoodsTxt
          , GoodsTyp: this.ProductSet[i].GoodsTyp
          , LineNo: 0
          , RankingOrder: "00"
        });
      }
    }
    this.WholeData.Operationz = '05';
    // this.WholeData.WH_EREGGOODSSet.results[0].Flag = flag;
    // this.WholeData.WH_EREGGOODSSet.results[0].GoodsTyp = this.TypeProductForm.value.GoodsWarehouse;
    this.wareHousesService.RenewalWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        console.log('save-7', data["d"]);
        this.WholeData = [];
        this.WholeData = data["d"];
        let purpose = this.UsagePurposeList.filter(x => x.Key == this.WholeData.Purpose);
        this.Purpose = purpose[0].Text;
        this.GoodsType = '';
        let goodstype = this.WH_EREGGOODSSet.filter(x => x.Flag == "X");
        for (let i = 0; i < goodstype.length; i++) {
          if (i < goodstype.length - 1) {
            this.GoodsType += goodstype[i].GoodsTxt + ",";
          }
          else {
            this.GoodsType += goodstype[i].GoodsTxt
          }
        }
        //this.successMsg = true;
        if (this.whnoflag == true) {
          this.step3();
        }
        let successmsg;
        if (this.Language == 'A') {
          successmsg = "تم حفظ طلب تجديد رخصة المستودع الضريبي بنجاح";
        }
        else {
          successmsg = "Warehouse License Renewal Application Form saved successfully";
        }
        this.notifierService.notify(
          "success",
          successmsg
        );
      }
    }, (error) => {

      this.notifierService.notify(
        "error",
        error.error.error.innererror.errordetails[0].message
      );
    });
  }
  PurposeChange(val) {
    for (let i = 0; i < this.UsagePurposeList.length; i++) {
      if (this.UsagePurposeList[i].Key == val) {
        this.TypeProductForm.patchValue({
          Purpose: this.UsagePurposeList[i].Key
        });
        this.WarehousePurposeName = this.UsagePurposeList[i].Text;
      }
    }
    if (val == '02') {
      this.storageflag = true;
    }
    else {
      this.storageflag = false;
    }
  }
  /*Type&Product End */
  /* Step - 7 Info Starts */
  warehouseManagerInfo2() {
    this.WarehouseManagerInfoFormControls2.addControl('financialPosition', new FormControl(this.WholeData.AddQuesSet.results[0].RbFg, [Validators.required]));
    this.WarehouseManagerInfoFormControls2.addControl('financialCrimes', new FormControl(this.WholeData.AddQuesSet.results[1].RbFg, [Validators.required]));
    this.WarehouseManagerInfoFormControls2.addControl('administrativeSystem', new FormControl(this.WholeData.AddQuesSet.results[2].RbFg, [Validators.required]));
    this.WarehouseManagerInfoFormControls2.addControl('secureMeasures', new FormControl(this.WholeData.AddQuesSet.results[3].RbFg, [Validators.required]));
    this.WarehouseManagerInfoFormControls2.addControl('agree', new FormControl(''));
    for (let z = 0; z < this.WholeData.NOTESSet.results.length; z++) {
      if (this.WholeData.NOTESSet.results[z].Rcodez == "EWQ_NOTE01") {
        this.level1(this.WholeData.AddQuesSet.results[0].RbFg, this.WholeData.NOTESSet.results[z].Strline);
      }
      if (this.WholeData.NOTESSet.results[z].Rcodez == "EWQ_NOTE02") {
        this.level2(this.WholeData.AddQuesSet.results[1].RbFg, this.WholeData.NOTESSet.results[z].Strline);
      }
      if (this.WholeData.NOTESSet.results[z].Rcodez == "EWQ_NOTE03") {
        this.level3(this.WholeData.AddQuesSet.results[2].RbFg, this.WholeData.NOTESSet.results[z].Strline);
      }
      if (this.WholeData.NOTESSet.results[z].Rcodez == "EWQ_NOTE04") {
        this.level4(this.WholeData.AddQuesSet.results[3].RbFg, this.WholeData.NOTESSet.results[z].Strline);
      }
    }
    this.bindingAdditionalAttachment();
  }
  bindingAttachment() {
    var attahmentata = this.WholeData?.ATTACHSet.results;
    if (attahmentata.length > 0) {
      for (let i = 0; i < attahmentata.length; i++) {
        if (attahmentata[i].Dotyp == 'WA01') {
          var file = attahmentata[i].Filename;
          var fileName = file.split(".");
          var obj = { Filename: '', name: '', size: 0, type: '', url: '', did: '', Doguid: '' };
          obj.Filename = attahmentata[i].Filename;
          obj.name = fileName[0];
          obj.size = 0;
          obj.type = fileName[1];
          obj.did = attahmentata[i].Doguid;
          this.OwnershipAttachFiles.push(obj);
        }
        if (attahmentata[i].Dotyp == 'WA02') {
          var file = attahmentata[i].Filename;
          var fileName = file.split(".");
          var obj = { Filename: '', name: '', size: 0, type: '', url: '', did: '', Doguid: '' };
          obj.Filename = attahmentata[i].Filename;
          obj.name = fileName[0];
          obj.size = 0;
          obj.type = fileName[1];
          obj.did = attahmentata[i].Doguid;
          this.DimensionAttachFiles.push(obj);
        }
      }
    }
    console.log('arr- WA01 error uploa', this.OwnershipAttachFiles);
    console.log('arr- WA02 error uploa', this.DimensionAttachFiles);


  }
  bindingAdditionalAttachment() {
    this.UploadFiles1 = [];
    this.UploadFiles2 = [];
    this.UploadFiles3 = [];
    this.UploadFiles4 = [];
    var attahmentata = this.WholeData?.ATTACHSet.results;
    if (attahmentata.length > 0) {
      for (let i = 0; i < attahmentata.length; i++) {
        if (attahmentata[i].Dotyp == 'WQ01') {
          this.isUploaded1 = !this.isUploaded1;
          var file = attahmentata[i].Filename;
          var fileName = file.split(".");
          var obj = { Filename: '', name: '', size: 0, type: '', url: '', did: '', Doguid: '' };
          obj.Filename = attahmentata[i].Filename;
          obj.name = fileName[0];
          obj.size = 0;
          obj.type = fileName[1];
          obj.did = attahmentata[i].Doguid;
          this.UploadFiles1.push(obj);
          console.log('WQ01', attahmentata[i]);
        }
        if (attahmentata[i].Dotyp == 'WQ02') {
          this.isUploaded2 = !this.isUploaded2;
          var file = attahmentata[i].Filename;
          var fileName = file.split(".");
          var obj = { Filename: '', name: '', size: 0, type: '', url: '', did: '', Doguid: '' };
          obj.Filename = attahmentata[i].Filename;
          obj.name = fileName[0];
          obj.size = 0;
          obj.type = fileName[1];
          obj.did = attahmentata[i].Doguid;
          this.UploadFiles2.push(obj);
        }
        if (attahmentata[i].Dotyp == 'WQ03') {
          this.isUploaded3 = !this.isUploaded3;
          var file = attahmentata[i].Filename;
          var fileName = file.split(".");
          var obj = { Filename: '', name: '', size: 0, type: '', url: '', did: '', Doguid: '' };
          obj.Filename = attahmentata[i].Filename;
          obj.name = fileName[0];
          obj.size = 0;
          obj.type = fileName[1];
          obj.did = attahmentata[i].Doguid;
          this.UploadFiles3.push(obj);
        }
        if (attahmentata[i].Dotyp == 'WQ04') {
          this.isUploaded4 = !this.isUploaded4;
          var file = attahmentata[i].Filename;
          var fileName = file.split(".");
          var obj = { Filename: '', name: '', size: 0, type: '', url: '', did: '', Doguid: '' };
          obj.Filename = attahmentata[i].Filename;
          obj.name = fileName[0];
          obj.size = 0;
          obj.type = fileName[1];
          obj.did = attahmentata[i].Doguid;
          this.UploadFiles4.push(obj);
        }
      }
    }
    console.log('arr- WA01 error uploa', this.OwnershipAttachFiles);
    console.log('arr- WA02 error uploa', this.DimensionAttachFiles);


  }
  answerValue(value, index) {
    var answerObj = {
      AttByz: "TP",
      ByGpartz: this.GPartz,
      ByPusrz: "",
      DataVersionz: "",
      ElemNo: 0,
      Erfdtz: this.CurrentDate.toISOString().slice(0, 19),
      Erftmz: "PT12H37M45S",
      Erfusrz: this.GPartz,
      Lineno: 0,
      Namez: "",
      Noteno: "",
      Notenoz: "",
      Rcodez: "",
      Refnamez: "",
      Sect: "",
      Strdt: "",
      Strline: "",
      Strtime: moment(this.CurrentDate).format("00:00:00"),
      Tdformat: "",
      Tdline: "",
      XInvoicez: "",
      XObsoletez: ""
    }
    if (index == 1) {
      answerObj.Strline = value;
      answerObj.Rcodez = "EWQ_NOTE01";
      answerObj.Notenoz = "001";
    }
    else if (index == 2) {
      answerObj.Strline = value;
      answerObj.Rcodez = "EWQ_NOTE02";
      answerObj.Notenoz = "002";
    }
    else if (index == 3) {
      answerObj.Strline = value;
      answerObj.Rcodez = "EWQ_NOTE03";
      answerObj.Notenoz = "003";
    }
    else if (index == 4) {
      answerObj.Strline = value;
      answerObj.Rcodez = "EWQ_NOTE04";
      answerObj.Notenoz = "004";
    }
    return answerObj;
  }
  saveManagerInfo2() {
    const ManagerInfo2 = this.WarehouseManagerInfoFormControls2.value;
    let answer1 = ManagerInfo2.answer1 !== undefined && ManagerInfo2.answer1 !== "" ? ManagerInfo2.answer1 : '';
    let obj1 = this.answerValue(answer1, 1);
    this.OtherReasonValue.push(obj1);
    let answer2 = ManagerInfo2.answer2 !== undefined && ManagerInfo2.answer2 !== "" ? ManagerInfo2.answer2 : '';
    let obj2 = this.answerValue(answer2, 2);
    this.OtherReasonValue.push(obj2);
    let answer3 = ManagerInfo2.answer3 !== undefined && ManagerInfo2.answer3 !== "" ? ManagerInfo2.answer3 : '';
    let obj3 = this.answerValue(answer3, 3);
    this.OtherReasonValue.push(obj3);
    let answer4 = ManagerInfo2.answer4 !== undefined && ManagerInfo2.answer4 !== "" ? ManagerInfo2.answer4 : '';
    let obj4 = this.answerValue(answer4, 4);
    this.OtherReasonValue.push(obj4);
    this.WholeData.AddQuesSet.results[0].RbFg = ManagerInfo2.financialPosition;
    this.WholeData.AddQuesSet.results[1].RbFg = ManagerInfo2.financialCrimes;
    this.WholeData.AddQuesSet.results[2].RbFg = ManagerInfo2.administrativeSystem;
    this.WholeData.AddQuesSet.results[3].RbFg = ManagerInfo2.secureMeasures;
    this.WholeData.NOTESSet["results"] = this.OtherReasonValue;
    this.WholeData.Operationz = '05';
    this.wareHousesService.RenewalWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        console.log('save-6', data["d"]);
        //this.successMsg = true;
        this.WholeData = [];
        this.WholeData = data["d"];
        if (this.whnoflag == true) {
          this.step3();
        }
        let successmsg;
        if (this.Language == 'A') {
          successmsg = "تم حفظ طلب تجديد رخصة المستودع الضريبي بنجاح";
        }
        else {
          successmsg = "Warehouse License Renewal Application Form saved successfully";
        }
        this.notifierService.notify(
          "success",
          successmsg
        );
      }
    }, (error) => {
      console.log('err-6', error);
    });
  }
  level1(val, note1) {
    if (val == '0') {
      this.Additional1 = true;
      this.AdditionalName1 = 'No';
      this.AdditionalTextarea1 = true;
      if (note1 !== null) {
        let RsValue = note1 !== undefined && note1 !== "" ? note1 : '';
        this.WarehouseManagerInfoFormControls2.addControl('answer1', new FormControl(RsValue));
      }
      else {
        this.WarehouseManagerInfoFormControls2.addControl('answer1', new FormControl(''));
      }
    }
    else {
      this.AdditionalName1 = 'Yes';
      this.Additional1 = true;
      this.AdditionalTextarea1 = false;
      this.WarehouseManagerInfoFormControls2.removeControl('answer1')
    }
  }
  level2(val, note2) {
    if (val == '0') {
      this.Additional2 = true;
      this.AdditionalName2 = 'No';
      this.AdditionalTextarea2 = true;
      if (note2 !== null) {
        let RsValue = note2 !== undefined && note2 !== "" ? note2 : '';
        this.WarehouseManagerInfoFormControls2.addControl('answer2', new FormControl(RsValue));
      }
      else {
        this.WarehouseManagerInfoFormControls2.addControl('answer2', new FormControl(''));
      }

    }
    else {
      this.AdditionalName2 = 'Yes';
      this.Additional2 = true;
      this.AdditionalTextarea2 = false;
      this.WarehouseManagerInfoFormControls2.removeControl('answer2')
    }
  }
  level3(val, note3) {
    if (val == '0') {
      this.AdditionalName3 = 'No';
      this.Additional3 = true;
      this.AdditionalTextarea3 = true;
      if (note3 !== null) {
        let RsValue = note3 !== undefined && note3 !== "" ? note3 : '';
        this.WarehouseManagerInfoFormControls2.addControl('answer3', new FormControl(RsValue));
      }
      else {
        this.WarehouseManagerInfoFormControls2.addControl('answer3', new FormControl(''));
      }
    }
    else {
      this.AdditionalName3 = 'Yes';
      this.Additional3 = true;
      this.AdditionalTextarea3 = false;
      this.WarehouseManagerInfoFormControls2.removeControl('answer3')
    }
  }
  level4(val, note4) {
    if (val == '0') {
      this.Additional4 = true;
      this.AdditionalName4 = 'No';
      this.AdditionalTextarea4 = true;
      if (note4 !== null) {
        let RsValue = note4 !== undefined && note4 !== "" ? note4 : '';
        this.WarehouseManagerInfoFormControls2.addControl('answer4', new FormControl(RsValue));
      }
      else {
        this.WarehouseManagerInfoFormControls2.addControl('answer4', new FormControl(''));
      }
    }
    else {
      this.AdditionalName4 = 'Yes';
      this.Additional4 = true;
      this.AdditionalTextarea4 = false;
      this.WarehouseManagerInfoFormControls2.removeControl('answer4')
    }
  }
  /* Step - 7 Info Ends */
  /* Step - 8 DeclarationInfo Starts */
  declarationInfo() {
    let agreeflag = this.WholeData.Decfg !== undefined && this.WholeData.Decfg !== null ? this.agreeStringValueCheck(this.WholeData.Decfg) : false;
    this.DeclarationFormControls.addControl('contactName', new FormControl(this.WholeData.Decnm, [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]));
    this.DeclarationFormControls.addControl('designation', new FormControl(this.WholeData.Decdg, [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]));
    this.DeclarationFormControls.addControl('idType', new FormControl(this.WholeData.Type, [Validators.required]));
    this.DeclarationFormControls.addControl('idNumber', new FormControl(this.WholeData.Idnumber, [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(16)]));
    this.DeclarationFormControls.addControl('agree', new FormControl(agreeflag, [Validators.required]));
    this.DeclarationFormControls.addControl('date', new FormControl(this.CurrentDate));
  }
  warehouseDeclarationData() {
    const warehouseDeclaration = this.DeclarationFormControls.value;
    this.DeclarationInfoModel.IdType = warehouseDeclaration.idType;
    this.DeclarationInfoModel.IdNumber = warehouseDeclaration.idNumber;
    this.DeclarationInfoModel.Name = warehouseDeclaration.contactName;
    this.DeclarationInfoModel.Designation = warehouseDeclaration.designation;
    this.DeclarationInfoModel.Agree = warehouseDeclaration.agree;
    return this.DeclarationInfoModel;
  }
  declarationIdNumberChange(value) {
    const IdType = this.DeclarationFormControls.value.idType;
    const todayDate = moment(this.CurrentDate).format('YYYYMMDD');
    setTimeout(() => {
      this.wareHousesService.getWHIDDeclarationInfo(IdType, value, todayDate).subscribe(data => {
        if (data) {
          console.log('owner-id-no', data["d"]);
        }
      }, (error) => {
        console.log('err', error);
      });
    }, 500)
  }
  declarationidTypeChange(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.DeclarationIdTypeName = this.oIdType1[i].Text;
      }
    }
    if (this.DeclarationFormControls.value.idType == "ZS0001") {
      //this.WarehouseManagerInfoFormControls1.get("idNumber").disable();
      //this.DeclarationFormControls.disable();
      //this.DeclarationFormControls.get("idType").enable();
      $("#idWHDeclarationValidation").modal("show");
      this.isWHDeclarationInfo = true;
    }
    else if (this.DeclarationFormControls.value.idType == "ZS0002") {
      //this.DeclarationFormControls.disable();
      //this.DeclarationFormControls.get("idType").enable();
      // this.DeclarationFormControls.get("idType").enable();
      $("#idWHDeclarationValidation").modal("show");
      this.isWHDeclarationInfo = true;

    }
    else {
      // this.WarehouseManagerInfoFormControls1.disable();
      // this.DeclarationFormControls.enable();
      //this.DeclarationFormControls.get("Date").disable();
      this.isWHDeclarationInfo = false;
    }
  }
  saveDeclaration() {
    const Declaration = this.DeclarationFormControls.value;
    let agree = this.agreeBooleanValueCheck(this.DeclarationFormControls.value.agree);
    this.WholeData.Decnm = Declaration.contactName;
    this.WholeData.Decdg = Declaration.designation;
    this.WholeData.Type = Declaration.idType;
    this.WholeData.Idnumber = Declaration.idNumber;
    this.WholeData.Decdt = this.CurrentDate.toISOString().slice(0, 19);
    this.WholeData.Decfg = agree;
    this.WholeData.Operationz = '05';
    this.wareHousesService.RenewalWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        console.log('save-7', data["d"]);
        this.WholeData = [];
        this.WholeData = data["d"];
        this.warehouseDeclarationData();
        //this.successMsg = true;
        if (this.whnoflag == true) {
          this.step3();
        }
        let successmsg;
        if (this.Language == 'A') {
          successmsg = "تم حفظ طلب تجديد رخصة المستودع الضريبي بنجاح";
        }
        else {
          successmsg = "Warehouse License Renewal Application Form saved successfully";
        }
        this.notifierService.notify(
          "success",
          successmsg
        );
      }
    }, (error) => {
      console.log('err-7', error);
    });
  }
  /* Step - 8 DeclarationInfo Ends */
  /* Attachment Details Start */
  uploadFile(event, label) {
    var obj = { Filename: '', name: '', size: '', type: '', url: '', did: '' };
    for (let i = 0; i < event.length; i++) {
      const element = event[i];
      obj.Filename = element.name;
      obj.name = element.name.split(".")[0];
      obj.size = parseFloat((+(element.size / 1000000) || 0).toString()).toFixed(2);
      let data = element.name.split(".");
      for (let j = 0; j < data.length; j++) {
        obj.type = data[j];
      }
    }
    let filesize = event[0]["size"];
    let filename = event[0]["name"];
    const fsize = Math.round((filesize / 1024));

    if (fsize == 0) {
      this.fileSizeError = true;
      if (this.fileSizeError == true) {
        if (this.Language == 'A') {
          this.errorMessage = "عذراً، لا يمكن أن يكون اسم الملف، نوع الملف، ومحتوى الملف فارغاً للنشر";
        }
        else {
          this.errorMessage = "File Name, Doc Type, Ret.Guid and File Content cannot be blank in action N";
        }
        jQuery("#AttachmentModal").modal('show');
        return false;
      }
    } else if (fsize > 2000) {
      // alert('File size Exceed');
      this.fileSizeError = true;
      if (this.fileSizeError == true) {
        if (this.Language == 'A') {
          this.errorMessage = "اعلى حجم للملف هو 2MB";
        }
        else {
          this.errorMessage = "Maximum file size is 2MB";
        }
        jQuery("#AttachmentModal").modal('show');
        return false;
      }
    }

    if (!this.ValidateFile(event[0].name)) {
      console.log('Selected file format is not supported');
      return false;
    }
    if (label == 'ownership') {
      let fileset = this.OwnershipAttachFiles.filter(x => x.type == obj.type);
      if (fileset.length > 0) {
        console.log('fileset', fileset.filter(name => name.Filename == filename));
        fileset = fileset.filter(name => name.Filename == filename);
        if (fileset.length == 1) {
          if (this.Language == 'A') {
            this.errorMessage = "يوجد ملف بنفس الاسم مرفق مسبقا";
          }
          else {
            this.errorMessage = "File with the same name already exists";
          }

          jQuery("#AttachmentModal").modal('show');

          // setTimeout(function () {
          //   jQuery('#infoModal1').modal('hide');
          // }, 3000);
          return false;
        }
      }
      this.OwnershipAttachFiles.push(obj);
      console.log('Ownership-Attach-Files', this.OwnershipAttachFiles);
    }
    else if (label == 'dimensions') {
      this.DimensionAttachFiles.push(obj);
      console.log('dimensions-Attach-Files', this.DimensionAttachFiles);
    }
    this.uploadFiles(label);
  }
  uploadFiles(label) {
    const frmData = new FormData();
    let fileName;
    let docType;
    if (label == 'ownership') {

      for (var i = 0; i < this.OwnershipAttachFiles.length; i++) {
        fileName = `${this.OwnershipAttachFiles[i]["Filename"]}`;
        docType = 'WA01';
        frmData.append("fileUpload", this.OwnershipAttachFiles[i]);
      }
      console.log("res", fileName, this.OwnershipAttachFiles);
      this.wareHousesService.saveWHAttachmentOwnerDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
        if (data) {
          console.log('attch-data', data["d"]);
          for (let h = 0; h < this.OwnershipAttachFiles.length; h++) {
            this.OwnershipAttachFiles[h].url = data["d"]["DocUrl"];
            this.OwnershipAttachFiles[h].did = data["d"]["Doguid"];
          }
        }
      });
    }
    else if (label == 'dimensions') {
      for (var i = 0; i < this.DimensionAttachFiles.length; i++) {
        fileName = `${this.DimensionAttachFiles[i]["Filename"]}`;
        docType = 'WA02';
        frmData.append("fileUpload", this.DimensionAttachFiles[i]);
      }
      console.log("res", fileName, this.DimensionAttachFiles);
      this.wareHousesService.saveWHAttachmentDimensionsDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
        if (data) {
          console.log('attch-data', data["d"]);
          for (let h = 0; h < this.DimensionAttachFiles.length; h++) {
            this.DimensionAttachFiles[h].url = data["d"]["DocUrl"];
            this.DimensionAttachFiles[h].did = data["d"]["Doguid"];
          }
        }
      });
    }
  }
  deleteAttachment(j, label) {
    if (label == 'ownership') {

      this.wareHousesService.deletefiledocument(this.ReturnId, this.OwnershipAttachFiles[0].did, 'WA01').subscribe(data => {
        if (data) {
          console.log('attch-data', data["d"]);

        }
      });
      this.OwnershipAttachFiles.splice(j, 1);
    }
    else if (label == 'dimensions') {

      this.wareHousesService.deletefiledocument(this.ReturnId, this.DimensionAttachFiles[0].did, 'WA02').subscribe(data => {
        if (data) {
          console.log('attch-data', data["d"]);

        }
      });
      this.DimensionAttachFiles.splice(j, 1);
    }
  }
  /* Attachment Details End */
  /* File Uploads Starts Here */
  uploadManagerFile(event, label) {
    var obj = { Filename: '', name: '', size: '', type: '', url: '', did: '' };
    for (let i = 0; i < event.length; i++) {
      const element = event[i];
      obj.Filename = element.name;
      obj.name = element.name.split(".")[0];
      obj.size = parseFloat((+(element.size / 1000000) || 0).toString()).toFixed(2);
      let data = element.name.split(".");
      for (let j = 0; j < data.length; j++) {
        obj.type = data[j];
      }
    }
    let filesize = event[0]["size"];
    let filename = event[0]["name"];
    const fsize = Math.round((filesize / 1024));

    if (fsize == 0) {
      this.fileSizeError = true;
      if (this.fileSizeError == true) {
        if (this.Language == 'A') {
          this.errorMessage = "عذراً، لا يمكن أن يكون اسم الملف، نوع الملف، ومحتوى الملف فارغاً للنشر";
        }
        else {
          this.errorMessage = "File Name, Doc Type, Ret.Guid and File Content cannot be blank in action N";
        }
        jQuery("#AttachmentModal").modal('show');
        return false;
      }
    } else if (fsize > 2048) {
      // alert('File size Exceed');
      this.fileSizeError = true;
      if (this.fileSizeError == true) {
        if (this.Language == 'A') {
          this.errorMessage = "اعلى حجم للملف هو 2MB";
        }
        else {
          this.errorMessage = "Maximum file size is 2MB";
        }
        jQuery("#AttachmentModal").modal('show');
        return false;
      }
    }

    if (!this.ValidateFile(event[0].name)) {
      console.log('Selected file format is not supported');
      return false;
    }
    if (label == 'upload1') {
      this.isUploaded1 = true;
      this.UploadFiles1.push(obj);
      console.log('Add1', this.UploadFiles1);
    }
    else if (label == 'upload2') {
      this.isUploaded2 = true;
      this.UploadFiles2.push(obj);
      console.log('Add2', this.UploadFiles2);
    }
    else if (label == 'upload3') {
      this.isUploaded3 = true;
      this.UploadFiles3.push(obj);
      console.log('Add3', this.UploadFiles3);
    }
    else if (label == 'upload4') {
      this.isUploaded4 = true;
      this.UploadFiles4.push(obj);
      console.log('Add4', this.UploadFiles4);
    }
    this.uploadManagerFiles(label);
  }
  uploadManagerFiles(label) {
    const frmData = new FormData();
    let fileName;
    let docType;
    if (label == 'upload1') {
      for (var i = 0; i < this.UploadFiles1.length; i++) {
        fileName = `${this.UploadFiles1[i]["Filename"]}`;
        docType = 'WQ01';
        frmData.append("file3", this.UploadFiles1[i]);
      }
      console.log("res", fileName, this.UploadFiles1);
      this.wareHousesService.commonAttachmentDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
        if (data) {
          console.log('attch-data', data["d"]);
          for (let h = 0; h < this.UploadFiles1.length; h++) {
            this.UploadFiles1[h].url = data["d"]["DocUrl"];
            this.UploadFiles1[h].did = data["d"]["Doguid"];

          }
        }
      });
    }
    else if (label == 'upload2') {
      for (var i = 0; i < this.UploadFiles2.length; i++) {
        fileName = `${this.UploadFiles2[i]["Filename"]}`;
        docType = 'WQ02';
        frmData.append("file4", this.UploadFiles2[i]);
      }
      console.log("res", fileName, this.UploadFiles2);
      this.wareHousesService.commonAttachmentDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
        if (data) {
          console.log('attch-data', data["d"]);
          for (let h = 0; h < this.UploadFiles2.length; h++) {
            this.UploadFiles2[h].url = data["d"]["DocUrl"];
            this.UploadFiles2[h].did = data["d"]["Doguid"];
          }
        }
      });
    }
    else if (label == 'upload3') {
      for (var i = 0; i < this.UploadFiles3.length; i++) {
        fileName = `${this.UploadFiles3[i]["Filename"]}`;
        docType = 'WQ03';
        frmData.append("file5", this.UploadFiles3[i]);
      }
      console.log("res", fileName, this.UploadFiles3);
      this.wareHousesService.commonAttachmentDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
        if (data) {
          console.log('attch-data', data["d"]);
          for (let h = 0; h < this.UploadFiles3.length; h++) {
            this.UploadFiles3[h].url = data["d"]["DocUrl"];
            this.UploadFiles3[h].did = data["d"]["Doguid"];
          }
        }
      });
    }
    else if (label == 'upload4') {
      for (var i = 0; i < this.UploadFiles4.length; i++) {
        fileName = `${this.UploadFiles4[i]["Filename"]}`;
        docType = 'WQ04';
        frmData.append("file6", this.UploadFiles4[i]);
      }
      console.log("res", fileName, this.UploadFiles4);
      this.wareHousesService.commonAttachmentDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
        if (data) {
          console.log('attch-data', data["d"]);
          for (let h = 0; h < this.UploadFiles4.length; h++) {
            this.UploadFiles4[h].url = data["d"]["DocUrl"];
            this.UploadFiles4[h].did = data["d"]["Doguid"];
          }
        }
      });
    }
  }
  deleteManagerAttachment(j, label) {
    if (label == 'upload1') {
      this.isUploaded1 = false;

      this.wareHousesService.deletefiledocument(this.ReturnId, this.UploadFiles1[0].did, 'WQ01').subscribe(data => {
        if (data) {
          console.log('attch-data', data["d"]);

        }
      });
      this.UploadFiles1.splice(j, 1);
    }
    else if (label == 'upload2') {
      this.isUploaded2 = false;
      this.wareHousesService.deletefiledocument(this.ReturnId, this.UploadFiles2[0].did, 'WQ02').subscribe(data => {
        if (data) {
          console.log('attch-data', data["d"]);
        }
      });
      this.UploadFiles2.splice(j, 1);
    }
    else if (label == 'upload3') {
      this.isUploaded3 = false;

      this.wareHousesService.deletefiledocument(this.ReturnId, this.UploadFiles3[0].did, 'WQ03').subscribe(data => {
        if (data) {
          console.log('attch-data', data["d"]);
        }
      });
      this.UploadFiles3.splice(j, 1);
    }
    else if (label == 'upload4') {
      this.isUploaded4 = false;
      this.wareHousesService.deletefiledocument(this.ReturnId, this.UploadFiles4[0].did, 'WQ04').subscribe(data => {
        if (data) {
          console.log('attch-data', data["d"]);

        }
      });
      this.UploadFiles4.splice(j, 1);
    }
  }
  /* File Uploads Ends Here */
  datePickerValue(value) {
    if (value !== undefined && value !== null && value !== "") {
      let day = value.calendarStart.day;
      if (value.calendarStart.day < 10) {
        day = '0' + value.calendarStart.day;
      }
      let month = value.calendarStart.month;
      if (value.calendarStart.month < 10) {
        month = '0' + value.calendarStart.month;
      }
      let year = value.calendarStart.year;
      const convertedDate = `${year}-${month}-${day}T00:00:00`;
      return convertedDate;
    } else {
      return null;
    }
  }
  warehouseOwnerShipData() {
    const warehouseOwner = this.WarehouseOwnerShip.value;
    const warehouseIndividual = this.WarehouseIsIndividualOwnerShip.value;
    const warehouseCompany = this.WarehouseIsCompanyOwnerShip.value;
    let valid;
    let leased;
    let expiry;
    if (warehouseOwner.validFrom !== undefined && warehouseOwner.validFrom !== "") {
      valid = this.datePickerValue(warehouseOwner.validFrom);
      this.WarehouseOwnerShipModel.ValidFrom = valid;
    } else {
      valid = this.CurrentDate;
      this.WarehouseOwnerShipModel.ValidFrom = valid;
    }
    if (warehouseCompany.leaseDate !== undefined && warehouseCompany.leaseDate !== "") {
      leased = this.datePickerValue(warehouseCompany.leaseDate);
    } else {
      leased = this.CurrentDate;
    }
    if (warehouseCompany.expiryDate !== undefined && warehouseCompany.expiryDate !== "") {
      expiry = this.datePickerValue(warehouseCompany.expiryDate);
    } else {
      expiry = this.CurrentDate;
    }
    this.WarehouseOwnerShipModel.OwnerType = warehouseOwner.ownerType;
    this.WarehouseOwnerShipModel.IdType = warehouseIndividual.idType;
    this.WarehouseOwnerShipModel.IdNumber = warehouseIndividual.idNumber;
    this.WarehouseOwnerShipModel.Nationality = warehouseIndividual.nationality;
    this.WarehouseOwnerShipModel.Nameoftheowner = warehouseIndividual.Nameoftheowner;
    this.WarehouseOwnerShipModel.PhoneNumber = warehouseIndividual.phoneNumber;
    this.WarehouseOwnerShipModel.EmailId = warehouseIndividual.emailId;
    this.WarehouseOwnerShipModel.CountryCode = warehouseCompany.countryCode;
    this.WarehouseOwnerShipModel.CRNo = warehouseCompany.crNo;
    this.WarehouseOwnerShipModel.Tin = warehouseCompany.tin;
    this.WarehouseOwnerShipModel.CompanyName = warehouseCompany.companyName;
    this.WarehouseOwnerShipModel.Address = warehouseCompany.address;
    this.WarehouseOwnerShipModel.Phone = warehouseCompany.phone;
    this.WarehouseOwnerShipModel.LeaseDate = leased;
    this.WarehouseOwnerShipModel.ExpiryDate = expiry;
    return this.WarehouseOwnerShipModel;
  }
  getWarehouseNoData(value) {
    this.wareHousesService.validateWarehouseNo(this.GPartz, this.Language, value,'').subscribe(data => {
      if (data) {
        console.log('warehouse-no-data', data["d"]);
        this.WholeData = data["d"];
        if (this.Step == 1) {
          this.step2();
        }
        else {
          this.WarehouseInformationFormGroup.controls['finNo'].setValue(this.WholeData.Fin);
          this.WarehouseInformationFormGroup.controls['bussinessName'].setValue(this.WholeData.Actnm);
          const expiryDate = this.WholeData.Expdt !== null ? this.WholeData.Expdt : this.CurrentDate;
          console.log('exp', expiryDate);
          this.WarehouseInformationFormGroup.controls['expiryDate'].setValue(expiryDate);
        }
      }
    }, (error) => {
      console.log('err', error);
    });
  }
  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.instructionFormControls();
        break;
      case 2:
        if (this.whnoflag == false) {
          this.getWHInformation();
        }
        this.warehouseDetailsList();
        this.warehoueInformationFormControls();
        break;
      case 3:
        this.warehouseDetailsList();

        // this.getDeclarationDetails();
        break;
      case 4:
        if (this.whnoflag == false) {
          //this.TypeProductFormControls();
        }
        //this.warehouseDimensionsFormControls();
        break;
      case 5:
        //this.warehouseIdentificationFormControls();
        break;
      case 6:
        //this.warehouseOwnerShipFormControls();
        //this.warehouseownershipIndividualFormControls();
        break;
      case 7:
        //this.warehouseDimensionsFormControls();
        break;
      case 8:
        //this.warehouseManagerInfo1();
        break;
      case 9:
        //this.warehouseBankInfoFormControls();
        break;
      case 10:
        this.warehouseManagerInfo2();
        break;
      case 11:
        this.declarationInfo();
        break;
      default:
        break;
    }
    return this.Step;
  }
  saveIdentification1() {
    const Identity1 = this.WarehouseIdentication.value;
    this.WholeData.Whfnm = Identity1.warehouseName;
    this.WholeData.WH_ADDRESSSet.results[0].BuildingNo = Identity1.BuildingNo;
    this.WholeData.WH_ADDRESSSet.results[0].Street = Identity1.StreetName;
    this.WholeData.WH_ADDRESSSet.results[0].Region = Identity1.RegionDistrict;
    this.WholeData.WH_ADDRESSSet.results[0].City = Identity1.City;
    this.WholeData.WH_ADDRESSSet.results[0].PostalCd = Identity1.PostalCode;
    this.WholeData.WH_ADDRESSSet.results[0].Addrnumber = Identity1.Addrnumber;
    this.WholeData.WH_ADDRESSSet.results[0].Quarter = Identity1.Quarter;
    this.WholeData.WH_ADDRESSSet.results[0].LatitudeC = Identity1.latitude;
    this.WholeData.WH_ADDRESSSet.results[0].LongitudeC = Identity1.longitude;
    this.WholeData.Operationz = '05';
    // this.WholeData.Lsfdt = null;
    // this.WholeData.Lsedt = null;
    // this.WholeData.WH_CONTACTPSet.results[0].HiringDt =null;
    this.wareHousesService.RenewalWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        console.log('save-1', data["d"]);
        this.WholeData = [];
        this.WholeData = data["d"];
        //this.successMsg = true;
        if (this.whnoflag == true) {
          this.step3();
        }
        let successmsg;
        if (this.Language == 'A') {
          successmsg = "تم حفظ طلب تجديد رخصة المستودع الضريبي بنجاح";
        }
        else {
          successmsg = "Warehouse License Renewal Application Form saved successfully";
        }
        this.notifierService.notify(
          "success",
          successmsg
        );
      }
    }, (error) => {
      console.log('err-1', error);
    });

  }
  /* Step - 1 Info Starts */
  // getWarehouseDetails() {
  //   this.wareHousesService.getWholeData(this.GPartz, this.Language).subscribe(data => {
  //     if (data) {
  //       console.log('button-list-data', data["d"]);

  //     }
  //   }, (error) => {
  //     console.log('err', error);
  //   });

  //   this.wareHousesService.getWHInformationfresh(this.GPartz, this.Language).subscribe(data => {
  //     if (data) {
  //       console.log('draft-data', data["d"]);

  //     }
  //   }, (error) => {
  //     console.log('err', error);
  //   });
  // }
  /* Step - 1 Info Ends */
  /* Step - 2 Info Starts */
  instructionFormControls() {
    this.InstructionFormGroup.addControl('agree', new FormControl(false, [Validators.required]));
  }
  termsAndConditionsOfInstructionAcceptance() {
    $('#instructions').modal('hide');
  }
  warehoueInformationFormControls() {
    this.WarehouseInformation.addControl('finNo', new FormControl(''));
    this.WarehouseInformation.addControl('bussinessName', new FormControl(''));
    this.WarehouseInformation.addControl('purpose', new FormControl('', [Validators.required]));
    this.WarehouseInformation.addControl('expiryDate', new FormControl(this.CurrentDate));
    this.WarehouseInformation.addControl('RenewalExtent', new FormControl(''));
  }
  setWarehoueInformationFormControls() {
    let Terms1 = this.agreeStringValueCheck(this.WarehouseData.Agreeflg);
    this.InstructionFormGroup.addControl('agree', new FormControl(Terms1, [Validators.required]));
    this.WarehouseInformation.addControl('finNo', new FormControl(this.WarehouseData.Fin));
    this.WarehouseInformation.addControl('bussinessName', new FormControl(this.WarehouseData.Bussiness));
    this.WarehouseInformation.addControl('purpose', new FormControl(this.WarehouseData.SelectWarehouse, [Validators.required]));
    this.WarehouseInformation.addControl('expiryDate', new FormControl(this.WarehouseData.ExpiryDate));
    this.WarehouseInformation.addControl('RenewalExtent', new FormControl(this.WarehouseData.RenExt));
    this.Step = 2;
  }
  warehouseManagerInfo() {
    this.WarehouseManagerInfoFormControls1.addControl('ValidFrom', new FormControl(''));
    this.WarehouseManagerInfoFormControls1.addControl('idType', new FormControl(''));
    this.WarehouseManagerInfoFormControls1.addControl('idNumber', new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(15)]));
    this.WarehouseManagerInfoFormControls1.addControl('nationalityOfOwner', new FormControl('', [Validators.pattern(this.StringPattern)]));
    this.WarehouseManagerInfoFormControls1.addControl('dateOfHiring', new FormControl(this.CurrentDate, [Validators.required]));
    this.WarehouseManagerInfoFormControls1.addControl('title', new FormControl(''));
    this.WarehouseManagerInfoFormControls1.addControl('name', new FormControl(''));
    this.WarehouseManagerInfoFormControls1.addControl('surname', new FormControl(''));
    this.WarehouseManagerInfoFormControls1.addControl('middlename', new FormControl(''));
    this.WarehouseManagerInfoFormControls1.addControl('fatherName', new FormControl(''));
    this.WarehouseManagerInfoFormControls1.addControl('grandFatherName', new FormControl(''));
    this.WarehouseManagerInfoFormControls1.addControl('phoneNumber', new FormControl(''));
    this.WarehouseManagerInfoFormControls1.addControl('emailId', new FormControl('', [Validators.pattern(this.EmailPattern)]));
  }
  warehouseManagerInfo1() {
    this.warehouseManagerInfo();
    let hiring;
    moment.locale('en-Us');
    if (this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== undefined && this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== "" && this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== null) {
      if (this.WholeData.WH_CONTACTPSet.results[0].HiringDt.includes('/Date')) {

        hiring = moment(new Date(+(((this.WholeData.WH_CONTACTPSet.results[0].HiringDt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
        this.WarehouseManagerInfoModel.DateOfHiring = hiring;
        // hiring = new Date(+this.WholeData.WH_CONTACTPSet.results[0].HiringDt.substr(6, 13)).toISOString().slice(0, 19);
        if (this.Language === 'E') {
          hiring = this.commonValidation.toJulianDate1(new Date(hiring));
        }
        else {
          hiring = this.commonValidation.toJulianDate1(new Date(hiring));
          hiring = (this.commonValidation.dateFormate(hiring, "Islamic"))
          //  hiring = this.commonValidation.getArabicFormat(new Date(hiring));
        }
      }
      else {
        hiring = this.datePickerValue(this.WholeData.WH_CONTACTPSet.results[0].HiringDt);
        this.WarehouseManagerInfoModel.DateOfHiring = hiring;
      }
    } else {
      hiring = this.CurrentDate.toISOString().slice(0, 19);
      this.WarehouseManagerInfoModel.DateOfHiring = this.CurrentDate.toISOString().slice(0, 10);
    }


    this.WarehouseManagerInfoFormControls1.patchValue({
      ValidFrom: this.WholeData.ChgWhMiDt,
      idType: this.WholeData.WH_CONTACTPSet.results[0].Type,
      idNumber: this.WholeData.WH_CONTACTPSet.results[0].Idnumber,
      nationalityOfOwner: this.WholeData.WH_CONTACTPSet.results[0].Nationality,
      dateOfHiring: hiring,
      title: this.WholeData.WH_CONTACTPSet.results[0].Title,
      name: this.WholeData.WH_CONTACTPSet.results[0].Firstnm,
      surname: this.WholeData.WH_CONTACTPSet.results[0].Lastnm,
      middlename: this.WholeData.WH_CONTACTPSet.results[0].Initials,
      fatherName: this.WholeData.WH_CONTACTPSet.results[0].Fathernm,
      grandFatherName: this.WholeData.WH_CONTACTPSet.results[0].Grandfathernm,
      phoneNumber: this.WholeData.WH_CONTACT_DTLSet.results[0].MobNumber,
      emailId: this.WholeData.WH_CONTACT_DTLSet.results[0].SmtpAddr
    });
  }
  warehouseManagerInfoData() {
    const warehouseManagerInfo = this.WarehouseManagerInfoFormControls1.value;
    let hiring;
    //hiring = warehouseManagerInfo.dateOfHiring !== undefined && warehouseManagerInfo.dateOfHiring !== null && warehouseManagerInfo.dateOfHiring !== "" ? this.datePickerValue(warehouseManagerInfo.dateOfHiring) : this.CurrentDate;
    console.log('hiring', hiring);
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (warehouseManagerInfo.idType == this.oIdType1[i].Key) {
        this.ManagerIdTypeName = this.oIdType1[i].Text;
      }
    }
    this.WarehouseManagerInfoModel.IdType = warehouseManagerInfo.idType;
    this.WarehouseManagerInfoModel.IdNumber = warehouseManagerInfo.idNumber;
    this.WarehouseManagerInfoModel.Nationality = warehouseManagerInfo.nationality;
    // this.WarehouseManagerInfoModel.DateOfHiring = warehouseManagerInfo.dateOfHiring;
    this.WarehouseManagerInfoModel.Title = warehouseManagerInfo.title;
    this.WarehouseManagerInfoModel.NameSurname = warehouseManagerInfo.nameSurname;
    this.WarehouseManagerInfoModel.FirstName = warehouseManagerInfo.name;
    this.WarehouseManagerInfoModel.SurName = warehouseManagerInfo.surname;
    this.WarehouseManagerInfoModel.MiddleName = warehouseManagerInfo.middlename;
    this.WarehouseManagerInfoModel.FatherName = warehouseManagerInfo.fatherName;
    this.WarehouseManagerInfoModel.GrandFatherName = warehouseManagerInfo.grandFatherName;
    this.WarehouseManagerInfoModel.CountryCode = warehouseManagerInfo.countryCode;
    this.WarehouseManagerInfoModel.PhoneNumber = warehouseManagerInfo.phoneNumber;
    this.WarehouseManagerInfoModel.EmailId = warehouseManagerInfo.emailId;
    console.log('date', this.WarehouseManagerInfoModel.DateOfHiring);
    return this.WarehouseManagerInfoModel;
  }
  saveManagerInfo1() {
    const ManagerInfo1 = this.WarehouseManagerInfoFormControls1.value;
    //let validfrom = ManagerInfo1.ValidFrom !== undefined && ManagerInfo1.ValidFrom !== null && ManagerInfo1.ValidFrom !== "" && ManagerInfo1.ValidFrom !== "Invalid date" ? this.datePickerValue(ManagerInfo1.ValidFrom) : moment(this.CurrentDate).format("YYYY-MM-DDT00:00:00");

    // let Hiring = ManagerInfo1.dateOfHiring !== undefined ? ManagerInfo1.dateOfHiring : this.datePickerValue(ManagerInfo1.dateOfHiring);
    let Hiring;
    if (ManagerInfo1.dateOfHiring !== undefined && ManagerInfo1.dateOfHiring !== "" && ManagerInfo1.dateOfHiring !== null) {
      if (ManagerInfo1.dateOfHiring.calendarEnd != undefined) {
        Hiring = this.datePickerValue(ManagerInfo1.dateOfHiring);
      }
      else if (ManagerInfo1.dateOfHiring.includes('/Date')) {
        Hiring = new Date(+ManagerInfo1.dateOfHiring.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        Hiring = ManagerInfo1.dateOfHiring;
      }
    } else {
      Hiring = this.CurrentDate.toISOString().slice(0, 19);
    }
    // let Hiring = ManagerInfo1.dateOfHiring !== undefined && ManagerInfo1.dateOfHiring !== null && ManagerInfo1.dateOfHiring !== "" && ManagerInfo1.dateOfHiring !== "Invalid date" ? this.datePickerValue(ManagerInfo1.dateOfHiring) : moment(this.CurrentDate).format("YYYY-MM-DDT00:00:00");
    this.WholeData.WH_CONTACTPSet.results[0].Type = ManagerInfo1.idType;
    this.WholeData.WH_CONTACTPSet.results[0].Idnumber = ManagerInfo1.idNumber;
    this.WholeData.WH_CONTACTPSet.results[0].Nationality = ManagerInfo1.nationalityOfOwner;
    this.WholeData.WH_CONTACTPSet.results[0].HiringDt = Hiring;
    this.WholeData.WH_CONTACTPSet.results[0].Title = ManagerInfo1.title;
    this.WholeData.WH_CONTACTPSet.results[0].Firstnm = ManagerInfo1.name;
    this.WholeData.WH_CONTACTPSet.results[0].Lastnm = ManagerInfo1.surname;
    this.WholeData.WH_CONTACTPSet.results[0].Initials = ManagerInfo1.middlename;
    this.WholeData.WH_CONTACTPSet.results[0].Fathernm = ManagerInfo1.fatherName;
    this.WholeData.WH_CONTACTPSet.results[0].Grandfathernm = ManagerInfo1.grandFatherName;
    this.WholeData.WH_CONTACT_DTLSet.results[0].MobNumber = ManagerInfo1.phoneNumber;
    this.WholeData.WH_CONTACT_DTLSet.results[0].SmtpAddr = ManagerInfo1.emailId;
    this.WholeData.Operationz = '05';
    this.wareHousesService.RenewalWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        console.log('save-4', data["d"]);
        this.WholeData = [];
        this.WholeData = data["d"];
        //this.successMsg = true;
        if (this.whnoflag == true) {
          this.step3();
        }
        let successmsg;
        if (this.Language == 'A') {
          successmsg = "تم حفظ طلب تجديد رخصة المستودع الضريبي بنجاح";
        }
        else {
          successmsg = "Warehouse License Renewal Application Form saved successfully";
        }
        this.notifierService.notify(
          "success",
          successmsg
        );
      }
    }, (error) => {
      console.log('err-4', error);
    });
  }

  warehouseBankInfoFormControls() {
    this.BankGuaranteeInformation = this.formBuilder.group({
      Rows: this.formBuilder.array([]),
      initialBankGuaranteeValue: this.formBuilder.control('')
    });

    let goodsType;

    for (let i = 0; i < this.RetailSet.length; i++) {
      for (let j = 0; j < this.TaxGoodType.length; j++) {
        if (this.TaxGoodType[j].Key == this.RetailSet[i].Gddtl) {
          goodsType = this.RetailSet[i].Gddtl;
        }
      }
      this.formArr().push(this.initRows(this.RetailSet[i].Gdtyp, goodsType, this.RetailSet[i].Bgqt, this.RetailSet[i].Bguom, this.RetailSet[i].Bgrsp));
      this.rspTotal(i);
    }
  }
  formArr(): FormArray {
    return this.BankGuaranteeInformation.get("Rows") as FormArray;
  }
  // rspTotal(index) {
  //   let productType;
  //   for (let j = 0; j < this.BankGuaranteeInformation.value.Rows.length; j++) {
  //     if (index == j) {
  //       productType = this.BankGuaranteeInformation.value.Rows[j].energyDrinks;
  //     }
  //   }
  //   console.log('prod-type', productType);
  //   this.getSum(productType);
  // }
  // getSum(value) {
  //   this.BankRSPValueTotal = this.formArr().value.reduce((prev, next) => prev + +next.totalRspValue, 0);
  //   console.log('sum', this.BankRSPValueTotal);
  //   for (let k = 0; k < this.TaxRateSet.length; k++) {
  //     if (value == this.TaxRateSet[k].GoodsNo) {
  //       this.BankGuaranteeValue = parseFloat(this.BankRSPValueTotal) - (parseFloat(this.BankRSPValueTotal) / ((1 + (parseFloat(this.TaxRateSet[k].Rates) / 100))));
  //     }
  //   }
  //   this.BankGuaranteeInformation.controls['initialBankGuaranteeValue'].setValue(this.BankGuaranteeValue.toFixed(2));
  //   this.BankGuaranteeInformation.controls['initialBankGuaranteeValue'].disable({ onlySelf: true });
  // }
  rspTotal(index) {
    let productType;
    const control = this.BankGuaranteeInformation.get("Rows") as FormArray;
    console.log("rows", control);
    for (let j = 0; j < control.controls.length; j++) {
      productType = control.controls[j].value.energyDrinks;
      for (let k = 0; k < this.TaxRateSet.length; k++) {
        console.log(control.controls[j].value.energyDrinks, this.TaxRateSet[k].GoodsNo)
        console.log(control.controls[j].value.energyDrinks == this.TaxRateSet[k].GoodsNo)
        if (control.controls[j].value.energyDrinks == this.TaxRateSet[k].GoodsNo) {
          let amount = 0;
          console.log("this.TaxRateSet[k].Rates", this.TaxRateSet[k].Rates);
          amount = (+control.controls[j].value.totalRspValue) - ((+control.controls[j].value.totalRspValue) / (1 + ((+this.TaxRateSet[k].Rates)) / 100));
          control.controls[j].patchValue({ 'resRspValue': amount });
        }
      }
    }
    console.log('prod-type', productType);
    this.getSum(productType);
  }
  getSum(value) {
    let total = 0
    const control = this.BankGuaranteeInformation.get("Rows") as FormArray;
    for (let j = 0; j < control.controls.length; j++) {
      total = total + (+control.controls[j].value.resRspValue)
    }
    this.BankGuaranteeInformation.controls['initialBankGuaranteeValue'].setValue(parseFloat((+total || 0).toString()).toFixed(2));
    this.BankGuaranteeInformation.controls['initialBankGuaranteeValue'].disable({ onlySelf: true });
    this.BankGuaranteeValue = parseFloat((+total || 0).toString()).toFixed(2);
  }
  initRows(productKey, goodsKey, quantity, unitofMeasure, totalRspValue): FormGroup {
    return this.formBuilder.group({
      energyDrinks: this.formBuilder.control(productKey, [Validators.required]),
      movedgoods: this.formBuilder.control(goodsKey, [Validators.required]),
      quantity: this.formBuilder.control(quantity, [Validators.required, Validators.pattern(this.DecimalPointPattern), Validators.maxLength(25)]),
      unitofMeasure: this.formBuilder.control(unitofMeasure, [Validators.required]),
      totalRspValue: this.formBuilder.control(totalRspValue, [Validators.required, Validators.pattern(this.DecimalPointPattern), Validators.maxLength(25)]),
      resRspValue: ''
    });
  }
  warehouseBankInfo() {
    const bankArray = this.BankGuaranteeInformation.get("Rows") as FormArray;
    this.BankGuaranteeInformation = this.formBuilder.group({
      Rows: this.formBuilder.array([]),
      initialBankGuaranteeValue: this.formBuilder.control('')
    });
    let goodsType;
    let quantity;
    let unitofMeasure;
    let totalRspValue;

    for (let i = 0; i < this.RetailSet.length; i++) {
      for (let j = 0; j < this.TaxGoodType.length; j++) {
        if (this.TaxGoodType[j].Key == this.RetailSet[i].Gddtl) {
          goodsType = this.RetailSet[i].Gddtl;
          quantity = this.RetailSet[i].Bgqt;
          unitofMeasure = this.RetailSet[i].Bguom;
          totalRspValue = this.RetailSet[i].Bgrsp;
        }
      }
      this.formArr().push(this.bankGarFormControls(this.RetailSet[i].Gdtyp, goodsType, quantity, unitofMeasure, totalRspValue));
    }
    // let productType;
    // for (let j = 0; j < this.RetailSet.length; j++) {
    //   productType = this.RetailSet[j].Gdtyp;
    //   this.getSum(productType);
    // }
    this.rspTotal('');
  }
  bankGarFormControls(energyDrinks, movedgoods, quantity, unitofMeasure, totalRspValue) {
    return this.formBuilder.group({
      energyDrinks: this.formBuilder.control(energyDrinks, [Validators.required]),
      movedgoods: this.formBuilder.control(movedgoods, [Validators.required]),
      quantity: this.formBuilder.control(quantity, [Validators.required, Validators.pattern(this.DecimalPointPattern), Validators.maxLength(25)]),
      unitofMeasure: this.formBuilder.control(unitofMeasure, [Validators.required]),
      totalRspValue: this.formBuilder.control(totalRspValue, [Validators.required, Validators.pattern(this.DecimalPointPattern), Validators.maxLength(25)]),
      resRspValue: ''
    });
  }
  removeBankInfoFormControls() {
    let control2 = <FormArray>this.BankGuaranteeInformation.controls.Rows;
    control2.reset();
    this.BankGuaranteeInformation.removeControl('initialBankGuaranteeValue');
  }
  warehouseBankData() {
    const warehouseBank = this.BankGuaranteeInformation.value;
    this.BankInfoModel.InitialBankGuaranteeValue = warehouseBank.initialBankGuaranteeValue;
    return this.BankInfoModel;
  }
  agreeBooleanValueCheck(value) {
    let agree;
    if (value == true) {
      agree = "1";
    }
    else {
      agree = "0";
    }
    return agree;
  }
  agreeStringValueCheck(value) {
    let agree;
    if (value == "1") {
      agree = true;
    }
    else {
      agree = false;
    }
    return agree;
  }
  SaveasDraftWHTypeProduct() {
    //TypeProduct
    let flag = "";
    if (this.TypeProductForm.value.Flag == true) {
      flag = "1";
    }
    else {
      flag = "";
    }
    this.WholeData.Purpose = this.TypeProductForm.value.Purpose !== undefined && this.TypeProductForm.value.Purpose !== "" ? this.TypeProductForm.value.Purpose : '';
    this.WholeData.ChgWhPrdDt = this.CurrentDate.toISOString().slice(0, 19);
    this.WholeData.ChgWhPrd = flag;
    this.WholeData.WH_EREGGOODSSet.results = [];
    for (let i = 0; i < this.ProductSet.length; i++) {
      if (this.ProductSet[i].flag == true) {
        this.WholeData.WH_EREGGOODSSet.results.push({
          DataVersion: "00000",
          Flag: "X"
          , FormGuid: ""
          , GdtyChgFg: ""
          , GdtyDelimitDt: null
          , GdtyDelimitDtC: ""
          , GdtyDelimitFg: ""
          , GoodsTxt: this.ProductSet[i].GoodsTxt
          , GoodsTyp: this.ProductSet[i].GoodsTyp
          , LineNo: 0
          , RankingOrder: "00"
        });
      }
    }
    //this.SaveasDraft();
  }

  SaveasDraftWHIdentification() {
    //warehouseidentification
    const Identity1 = this.WarehouseIdentication.value;
    this.WholeData.Whfnm = Identity1.warehouseName;
    this.WholeData.WH_ADDRESSSet.results[0].BuildingNo = Identity1.BuildingNo !== undefined && Identity1.BuildingNo !== "" ? Identity1.BuildingNo : '';
    this.WholeData.WH_ADDRESSSet.results[0].Street = Identity1.StreetName !== undefined && Identity1.StreetName !== "" ? Identity1.StreetName : '';
    this.WholeData.WH_ADDRESSSet.results[0].Region = Identity1.RegionDistrict !== undefined && Identity1.RegionDistrict !== "" ? Identity1.RegionDistrict : '';
    this.WholeData.WH_ADDRESSSet.results[0].City = Identity1.City !== undefined && Identity1.City !== "" ? Identity1.City : ''; Identity1.City;
    this.WholeData.WH_ADDRESSSet.results[0].PostalCd = Identity1.PostalCode !== undefined && Identity1.PostalCode !== "" ? Identity1.PostalCode : '';
    this.WholeData.WH_ADDRESSSet.results[0].Addrnumber = Identity1.Addrnumber !== undefined && Identity1.Addrnumber !== "" ? Identity1.Addrnumber : '';
    this.WholeData.WH_ADDRESSSet.results[0].Quarter = Identity1.Quarter !== undefined && Identity1.Quarter !== "" ? Identity1.Quarter : '';
    this.WholeData.WH_ADDRESSSet.results[0].LatitudeC = Identity1.latitude !== undefined && Identity1.latitude !== "" ? Identity1.latitude : '';
    this.WholeData.WH_ADDRESSSet.results[0].LongitudeC = Identity1.longitude !== undefined && Identity1.longitude !== "" ? Identity1.longitude : '';
    this.SaveasDraftWHTypeProduct();
    //this.SaveasDraft();

  }
  SaveasDraftWHownership() {
    //ownership and identification

    this.WholeData.Whlsf = this.isCard1 == "No" ? '0' : '1';
    this.WholeData.Whlsi = this.WarehouseOwnerShip.value.ownerType;
    //this.WholeData.ChgWhOiDt = this.WarehouseOwnerShip.value.validFrom;
    let leasedate;
    let expirydate;
    if (this.WarehouseOwnerShip.value.leaseDate !== undefined && this.WarehouseOwnerShip.value.leaseDate !== "" && this.WarehouseOwnerShip.value.leaseDate !== null) {
      if (this.WarehouseOwnerShip.value.leaseDate.calendarEnd != undefined) {
        leasedate = this.datePickerValue(this.WarehouseOwnerShip.value.leaseDate);
      }
      else if (this.WarehouseOwnerShip.value.leaseDate.includes('/Date')) {
        leasedate = new Date(+this.WarehouseOwnerShip.value.leaseDate.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        leasedate = this.WarehouseOwnerShip.value.leaseDate;
      }
    } else {
      leasedate = this.CurrentDate.toISOString().slice(0, 19);
    }

    if (this.WarehouseOwnerShip.value.expiryDate !== undefined && this.WarehouseOwnerShip.value.expiryDate !== "" && this.WarehouseOwnerShip.value.expiryDate !== null) {
      if (this.WarehouseOwnerShip.value.expiryDate.calendarEnd != undefined) {
        expirydate = this.datePickerValue(this.WarehouseOwnerShip.value.expiryDate);
      }
      else if (this.WarehouseOwnerShip.value.expiryDate.includes('/Date')) {
        expirydate = new Date(+this.WarehouseOwnerShip.value.expiryDate.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        expirydate = this.WarehouseOwnerShip.value.expiryDate;
      }
    } else {
      expirydate = this.CurrentDate.toISOString().slice(0, 19);
    }
    this.WholeData.Lsfdt = leasedate;
    this.WholeData.Lsedt = expirydate;
    //individual
    if (this.WarehouseOwnerShip.value.ownerType == "I") {
      this.WholeData.WH_CONTACTPSet.results[1].Type = this.WarehouseIsIndividualOwnerShip.value.idType !== undefined && this.WarehouseIsIndividualOwnerShip.value.idType !== "" ? this.WarehouseIsIndividualOwnerShip.value.idType : '';
      this.WholeData.WH_CONTACTPSet.results[1].Idnumber = this.WarehouseIsIndividualOwnerShip.value.idNumber !== undefined && this.WarehouseIsIndividualOwnerShip.value.idNumber !== "" ? this.WarehouseIsIndividualOwnerShip.value.idNumber : '';
      this.WholeData.WH_CONTACTPSet.results[1].Nationality = this.WarehouseIsIndividualOwnerShip.value.nationality !== undefined && this.WarehouseIsIndividualOwnerShip.value.nationality !== "" ? this.WarehouseIsIndividualOwnerShip.value.nationality : '';
      this.WholeData.WH_CONTACTPSet.results[1].Firstnm = this.WarehouseIsIndividualOwnerShip.value.Nameoftheowner !== undefined && this.WarehouseIsIndividualOwnerShip.value.Nameoftheowner !== "" ? this.WarehouseIsIndividualOwnerShip.value.Nameoftheowner : '';
      this.WholeData.WH_CONTACT_DTLSet.results[1].MobNumber = this.WarehouseIsIndividualOwnerShip.value.phoneNumber !== undefined && this.WarehouseIsIndividualOwnerShip.value.phoneNumber !== "" ? this.WarehouseIsIndividualOwnerShip.value.phoneNumber : '';
      this.WholeData.WH_CONTACT_DTLSet.results[1].SmtpAddr = this.WarehouseIsIndividualOwnerShip.value.emailId !== undefined && this.WarehouseIsIndividualOwnerShip.value.emailId !== "" ? this.WarehouseIsIndividualOwnerShip.value.emailId : '';
    }
    //company
    if (this.WarehouseOwnerShip.value.ownerType == "C") {
      this.WholeData.WoCrNo = this.WarehouseIsCompanyOwnerShip.value.crNo !== undefined && this.WarehouseIsCompanyOwnerShip.value.crNo !== "" ? this.WarehouseIsCompanyOwnerShip.value.crNo : '';
      this.WholeData.WoTin = this.WarehouseIsCompanyOwnerShip.value.tin !== undefined && this.WarehouseIsCompanyOwnerShip.value.tin !== "" ? this.WarehouseIsCompanyOwnerShip.value.tin : '';
      this.WholeData.Compnm = this.WarehouseIsCompanyOwnerShip.value.companyName !== undefined && this.WarehouseIsCompanyOwnerShip.value.companyName !== "" ? this.WarehouseIsCompanyOwnerShip.value.companyName : '';
      this.WholeData.WoAddress = this.WarehouseIsCompanyOwnerShip.value.address !== undefined && this.WarehouseIsCompanyOwnerShip.value.address !== "" ? this.WarehouseIsCompanyOwnerShip.value.address : '';
      this.WholeData.WH_CONTACT_DTLSet.results[1].TelNumber = this.WarehouseIsCompanyOwnerShip.value.phone !== undefined && this.WarehouseIsCompanyOwnerShip.value.phone !== "" ? this.WarehouseIsCompanyOwnerShip.value.phone : '';
    }
    this.SaveasDraftWHTypeProduct();
    this.SaveasDraftWHIdentification();
    //this.SaveasDraft();
  }
  SaveasDraftWHDiemensions() {
    //dimensions
    const Dimension = this.WarehouseDimensions.value;
    this.WholeData.WH_ADDRESSSet.results[0].LenSiz = (Dimension.length != '' && Dimension.length != null && Dimension.length != undefined) ? Dimension.length : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].WidSiz = (Dimension.width != '' && Dimension.width != null && Dimension.width != undefined) ? Dimension.width : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].HeiSiz = (Dimension.height != '' && Dimension.height != null && Dimension.height != undefined) ? Dimension.height : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].CubicSc = (Dimension.cubicMeters != '' && Dimension.cubicMeters != null && Dimension.cubicMeters != undefined) ? Dimension.cubicMeters : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].SquarSc = (Dimension.squareMeters != '' && Dimension.squareMeters != null && Dimension.squareMeters != undefined) ? Dimension.squareMeters : '0.00';
    this.SaveasDraftWHTypeProduct();
    this.SaveasDraftWHIdentification();
    this.SaveasDraftWHownership();
    //this.SaveasDraft();
  }

  SaveasDraftWHManagerInfo() {
    //warehousemanagerinfo

    const ManagerInfo1 = this.WarehouseManagerInfoFormControls1.value;
    //let validfrom = ManagerInfo1.ValidFrom !== undefined && ManagerInfo1.ValidFrom !== null && ManagerInfo1.ValidFrom !== "" && ManagerInfo1.ValidFrom !== "Invalid date" ? this.datePickerValue(ManagerInfo1.ValidFrom) : moment(this.CurrentDate).format("YYYY-MM-DDT00:00:00");

    // let Hiring = ManagerInfo1.dateOfHiring !== undefined ? ManagerInfo1.dateOfHiring : this.datePickerValue(ManagerInfo1.dateOfHiring);
    //let Hiring = ManagerInfo1.dateOfHiring !== undefined && ManagerInfo1.dateOfHiring !== null && ManagerInfo1.dateOfHiring !== "" && ManagerInfo1.dateOfHiring !== "Invalid date" ? this.datePickerValue(ManagerInfo1.dateOfHiring) : moment(this.CurrentDate).format("YYYY-MM-DDT00:00:00");
    let Hiring;
    if (ManagerInfo1.dateOfHiring !== undefined && ManagerInfo1.dateOfHiring !== "" && ManagerInfo1.dateOfHiring !== null) {
      if (ManagerInfo1.dateOfHiring.calendarEnd != undefined) {
        Hiring = this.datePickerValue(ManagerInfo1.dateOfHiring);
      }
      else if (ManagerInfo1.dateOfHiring.includes('/Date')) {
        Hiring = new Date(+ManagerInfo1.dateOfHiring.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        Hiring = ManagerInfo1.dateOfHiring;
      }
    } else {
      Hiring = this.CurrentDate.toISOString().slice(0, 19);
    }
    this.WholeData.WH_CONTACTPSet.results[0].Type = ManagerInfo1.idType !== undefined && ManagerInfo1.idType !== "" ? ManagerInfo1.idType : '';
    this.WholeData.WH_CONTACTPSet.results[0].Idnumber = ManagerInfo1.idNumber !== undefined && ManagerInfo1.idNumber !== "" ? ManagerInfo1.idNumber : '';
    //this.WholeData.WH_CONTACTPSet.results[0].Nationality = ManagerInfo1.nationalityOfOwner;
    this.WholeData.WH_CONTACTPSet.results[0].Nationality = ManagerInfo1.nationalityOfOwner !== undefined && ManagerInfo1.nationalityOfOwner !== "" ? ManagerInfo1.nationalityOfOwner : '';
    this.WholeData.WH_CONTACTPSet.results[0].HiringDt = Hiring;
    this.WholeData.WH_CONTACTPSet.results[0].Title = ManagerInfo1.title !== undefined && ManagerInfo1.title !== "" ? ManagerInfo1.title : '';
    this.WholeData.WH_CONTACTPSet.results[0].Firstnm = ManagerInfo1.name !== undefined && ManagerInfo1.name !== "" ? ManagerInfo1.name : '';
    this.WholeData.WH_CONTACTPSet.results[0].Lastnm = ManagerInfo1.surname !== undefined && ManagerInfo1.surname !== "" ? ManagerInfo1.surname : '';
    this.WholeData.WH_CONTACTPSet.results[0].Initials = ManagerInfo1.middlename !== undefined && ManagerInfo1.middlename !== "" ? ManagerInfo1.middlename : '';
    this.WholeData.WH_CONTACTPSet.results[0].Fathernm = ManagerInfo1.fatherName !== undefined && ManagerInfo1.fatherName !== "" ? ManagerInfo1.fatherName : '';
    this.WholeData.WH_CONTACTPSet.results[0].Grandfathernm = ManagerInfo1.grandFatherName !== undefined && ManagerInfo1.grandFatherName !== "" ? ManagerInfo1.grandFatherName : '';
    this.WholeData.WH_CONTACT_DTLSet.results[0].MobNumber = ManagerInfo1.phoneNumber !== undefined && ManagerInfo1.phoneNumber !== "" ? ManagerInfo1.phoneNumber : '';
    this.WholeData.WH_CONTACT_DTLSet.results[0].SmtpAddr = ManagerInfo1.emailId !== undefined && ManagerInfo1.emailId !== "" ? ManagerInfo1.emailId : '';
    this.SaveasDraftWHTypeProduct();
    this.SaveasDraftWHIdentification();
    this.SaveasDraftWHownership();
    this.SaveasDraftWHDiemensions();
    //this.SaveasDraft();
  }
  SaveasDraftAdditionalInfo() {
    //additionalinfo  
    const ManagerInfo2 = this.WarehouseManagerInfoFormControls2.value;
    let answer1 = ManagerInfo2.answer1 !== undefined && ManagerInfo2.answer1 !== "" ? ManagerInfo2.answer1 : '';
    let obj1 = this.answerValue(answer1, 1);
    this.OtherReasonValue.push(obj1);
    let answer2 = ManagerInfo2.answer2 !== undefined && ManagerInfo2.answer2 !== "" ? ManagerInfo2.answer2 : '';
    let obj2 = this.answerValue(answer2, 2);
    this.OtherReasonValue.push(obj2);
    let answer3 = ManagerInfo2.answer3 !== undefined && ManagerInfo2.answer3 !== "" ? ManagerInfo2.answer3 : '';
    let obj3 = this.answerValue(answer3, 3);
    this.OtherReasonValue.push(obj3);
    let answer4 = ManagerInfo2.answer4 !== undefined && ManagerInfo2.answer4 !== "" ? ManagerInfo2.answer4 : '';
    let obj4 = this.answerValue(answer4, 4);
    this.OtherReasonValue.push(obj4);
    this.WholeData.AddQuesSet.results[0].RbFg = ManagerInfo2.financialPosition !== undefined && ManagerInfo2.financialPosition !== "" ? ManagerInfo2.financialPosition : '';
    this.WholeData.AddQuesSet.results[1].RbFg = ManagerInfo2.financialCrimes !== undefined && ManagerInfo2.financialCrimes !== "" ? ManagerInfo2.financialCrimes : '';
    this.WholeData.AddQuesSet.results[2].RbFg = ManagerInfo2.administrativeSystem !== undefined && ManagerInfo2.administrativeSystem !== "" ? ManagerInfo2.administrativeSystem : '';
    this.WholeData.AddQuesSet.results[3].RbFg = ManagerInfo2.secureMeasures !== undefined && ManagerInfo2.secureMeasures !== "" ? ManagerInfo2.secureMeasures : '';
    this.WholeData.NOTESSet["results"] = this.OtherReasonValue;
    this.SaveasDraftWHTypeProduct();
    this.SaveasDraftWHIdentification();
    this.SaveasDraftWHownership();
    this.SaveasDraftWHDiemensions();
    this.SaveasDraftWHManagerInfo();
    //this.SaveasDraft();
  }
  SaveasDraftWHDeclartion() {
    //declaration
    const Declaration = this.DeclarationFormControls.value;
    let agree = this.agreeBooleanValueCheck(this.DeclarationFormControls.value.agree);
    this.WholeData.Decnm = Declaration.contactName !== undefined && Declaration.contactName !== "" ? Declaration.contactName : '';
    this.WholeData.Decdg = Declaration.designation !== undefined && Declaration.designation !== "" ? Declaration.designation : '';
    this.WholeData.Type = Declaration.idType !== undefined && Declaration.idType !== "" ? Declaration.idType : '';
    this.WholeData.Idnumber = Declaration.idNumber !== undefined && Declaration.idNumber !== "" ? Declaration.idNumber : '';
    this.WholeData.Decfg = agree;
    this.WholeData.Decdt = this.CurrentDate.toISOString().slice(0, 19);
    this.SaveasDraftWHTypeProduct();
    this.SaveasDraftWHIdentification();
    this.SaveasDraftWHownership();
    this.SaveasDraftWHDiemensions();
    this.SaveasDraftWHManagerInfo();
    this.SaveasDraftAdditionalInfo();
    //this.SaveasDraft();
  }

  SaveasDraft() {
    this.WholeData.RenChg = this.licenserenewal == 'Yes' ? '1' : '0';
    this.WholeData.Operationz = '05';
    this.wareHousesService.RenewalWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        console.log('save-2', data["d"]);
        //this.successMsg = true;
        this.WholeData = data["d"];
        let successmsg;
        if (this.Language == 'A') {
          successmsg = "تم حفظ طلب تجديد رخصة المستودع الضريبي بنجاح";
        }
        else {
          successmsg = "Warehouse License Renewal Application Form saved successfully";
        }
        this.notifierService.notify(
          "success",
          successmsg
        );
      }
    }, (error) => {
      console.log('err-2', error);
    });
  }
  summery() {
    //TypeProduct
    let flag = "";
    if (this.TypeProductForm.value.Flag == true) {
      flag = "1";
    }
    else {
      flag = "";
    }
    this.WholeData.RenChg = this.licenserenewal == 'Yes' ? '1' : '0';
    this.WholeData.Purpose = this.TypeProductForm.value.Purpose !== undefined && this.TypeProductForm.value.Purpose !== "" ? this.TypeProductForm.value.Purpose : '';
    this.WholeData.ChgWhPrdDt = this.CurrentDate.toISOString().slice(0, 19);
    this.WholeData.Decdt = this.CurrentDate.toISOString().slice(0, 19);
    this.WholeData.ChgWhPrd = flag;
    this.WholeData.WH_EREGGOODSSet.results = [];
    for (let i = 0; i < this.ProductSet.length; i++) {
      if (this.ProductSet[i].flag == true) {
        this.WholeData.WH_EREGGOODSSet.results.push({
          DataVersion: "00000",
          Flag: "X"
          , FormGuid: ""
          , GdtyChgFg: ""
          , GdtyDelimitDt: null
          , GdtyDelimitDtC: ""
          , GdtyDelimitFg: ""
          , GoodsTxt: this.ProductSet[i].GoodsTxt
          , GoodsTyp: this.ProductSet[i].GoodsTyp
          , LineNo: 0
          , RankingOrder: "00"
        });
      }
    }
    //warehouseidentification
    const Identity1 = this.WarehouseIdentication.value;
    this.WholeData.Whfnm = Identity1.warehouseName;
    this.WholeData.WH_ADDRESSSet.results[0].BuildingNo = Identity1.BuildingNo !== undefined && Identity1.BuildingNo !== "" ? Identity1.BuildingNo : '';
    this.WholeData.WH_ADDRESSSet.results[0].Street = Identity1.StreetName !== undefined && Identity1.StreetName !== "" ? Identity1.StreetName : '';
    this.WholeData.WH_ADDRESSSet.results[0].Region = Identity1.RegionDistrict !== undefined && Identity1.RegionDistrict !== "" ? Identity1.RegionDistrict : '';
    this.WholeData.WH_ADDRESSSet.results[0].City = Identity1.City !== undefined && Identity1.City !== "" ? Identity1.City : ''; Identity1.City;
    this.WholeData.WH_ADDRESSSet.results[0].PostalCd = Identity1.PostalCode !== undefined && Identity1.PostalCode !== "" ? Identity1.PostalCode : '';
    this.WholeData.WH_ADDRESSSet.results[0].Addrnumber = Identity1.Addrnumber !== undefined && Identity1.Addrnumber !== "" ? Identity1.Addrnumber : '';
    this.WholeData.WH_ADDRESSSet.results[0].Quarter = Identity1.Quarter !== undefined && Identity1.Quarter !== "" ? Identity1.Quarter : '';
    this.WholeData.WH_ADDRESSSet.results[0].LatitudeC = Identity1.latitude !== undefined && Identity1.latitude !== "" ? Identity1.latitude : '';
    this.WholeData.WH_ADDRESSSet.results[0].LongitudeC = Identity1.longitude !== undefined && Identity1.longitude !== "" ? Identity1.longitude : '';
    //ownership and identification

    this.WholeData.Whlsf = this.isCard1 == "No" ? '0' : '1';
    this.WholeData.Whlsi = this.WarehouseOwnerShip.value.ownerType;
    //this.WholeData.ChgWhOiDt = this.WarehouseOwnerShip.value.validFrom;
    let leasedate;
    let expirydate;
    if (this.WarehouseOwnerShip.value.leaseDate !== undefined && this.WarehouseOwnerShip.value.leaseDate !== "" && this.WarehouseOwnerShip.value.leaseDate !== null) {
      if (this.WarehouseOwnerShip.value.leaseDate.calendarEnd != undefined) {
        leasedate = this.datePickerValue(this.WarehouseOwnerShip.value.leaseDate);
      }
      else if (this.WarehouseOwnerShip.value.leaseDate.includes('/Date')) {
        leasedate = new Date(+this.WarehouseOwnerShip.value.leaseDate.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        leasedate = this.WarehouseOwnerShip.value.leaseDate;
      }
    } else {
      leasedate = this.CurrentDate.toISOString().slice(0, 19);
    }

    if (this.WarehouseOwnerShip.value.expiryDate !== undefined && this.WarehouseOwnerShip.value.expiryDate !== "" && this.WarehouseOwnerShip.value.expiryDate !== null) {
      if (this.WarehouseOwnerShip.value.expiryDate.calendarEnd != undefined) {
        expirydate = this.datePickerValue(this.WarehouseOwnerShip.value.expiryDate);
      }
      else if (this.WarehouseOwnerShip.value.expiryDate.includes('/Date')) {
        expirydate = new Date(+this.WarehouseOwnerShip.value.expiryDate.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        expirydate = this.WarehouseOwnerShip.value.expiryDate;
      }
    } else {
      expirydate = this.CurrentDate.toISOString().slice(0, 19);
    }
    this.WholeData.Lsfdt = leasedate;
    this.WholeData.Lsedt = expirydate;
    //individual
    if (this.WarehouseOwnerShip.value.ownerType == "I") {
      this.WholeData.WH_CONTACTPSet.results[1].Type = this.WarehouseIsIndividualOwnerShip.value.idType !== undefined && this.WarehouseIsIndividualOwnerShip.value.idType !== "" ? this.WarehouseIsIndividualOwnerShip.value.idType : '';
      this.WholeData.WH_CONTACTPSet.results[1].Idnumber = this.WarehouseIsIndividualOwnerShip.value.idNumber !== undefined && this.WarehouseIsIndividualOwnerShip.value.idNumber !== "" ? this.WarehouseIsIndividualOwnerShip.value.idNumber : '';
      this.WholeData.WH_CONTACTPSet.results[1].Nationality = this.WarehouseIsIndividualOwnerShip.value.nationality !== undefined && this.WarehouseIsIndividualOwnerShip.value.nationality !== "" ? this.WarehouseIsIndividualOwnerShip.value.nationality : '';
      this.WholeData.WH_CONTACTPSet.results[1].Firstnm = this.WarehouseIsIndividualOwnerShip.value.Nameoftheowner !== undefined && this.WarehouseIsIndividualOwnerShip.value.Nameoftheowner !== "" ? this.WarehouseIsIndividualOwnerShip.value.Nameoftheowner : '';
      this.WholeData.WH_CONTACT_DTLSet.results[1].MobNumber = this.WarehouseIsIndividualOwnerShip.value.phoneNumber !== undefined && this.WarehouseIsIndividualOwnerShip.value.phoneNumber !== "" ? this.WarehouseIsIndividualOwnerShip.value.phoneNumber : '';
      this.WholeData.WH_CONTACT_DTLSet.results[1].SmtpAddr = this.WarehouseIsIndividualOwnerShip.value.emailId !== undefined && this.WarehouseIsIndividualOwnerShip.value.emailId !== "" ? this.WarehouseIsIndividualOwnerShip.value.emailId : '';
    }
    //company
    if (this.WarehouseOwnerShip.value.ownerType == "C") {
      this.WholeData.WoCrNo = this.WarehouseIsCompanyOwnerShip.value.crNo !== undefined && this.WarehouseIsCompanyOwnerShip.value.crNo !== "" ? this.WarehouseIsCompanyOwnerShip.value.crNo : '';
      this.WholeData.WoTin = this.WarehouseIsCompanyOwnerShip.value.tin !== undefined && this.WarehouseIsCompanyOwnerShip.value.tin !== "" ? this.WarehouseIsCompanyOwnerShip.value.tin : '';
      this.WholeData.Compnm = this.WarehouseIsCompanyOwnerShip.value.companyName !== undefined && this.WarehouseIsCompanyOwnerShip.value.companyName !== "" ? this.WarehouseIsCompanyOwnerShip.value.companyName : '';
      this.WholeData.WoAddress = this.WarehouseIsCompanyOwnerShip.value.address !== undefined && this.WarehouseIsCompanyOwnerShip.value.address !== "" ? this.WarehouseIsCompanyOwnerShip.value.address : '';
      this.WholeData.WH_CONTACT_DTLSet.results[1].TelNumber = this.WarehouseIsCompanyOwnerShip.value.phone !== undefined && this.WarehouseIsCompanyOwnerShip.value.phone !== "" ? this.WarehouseIsCompanyOwnerShip.value.phone : '';
    }
    //dimensions
    const Dimension = this.WarehouseDimensions.value;
    this.WholeData.WH_ADDRESSSet.results[0].LenSiz = (Dimension.length != '' && Dimension.length != null && Dimension.length != undefined) ? Dimension.length : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].WidSiz = (Dimension.width != '' && Dimension.width != null && Dimension.width != undefined) ? Dimension.width : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].HeiSiz = (Dimension.height != '' && Dimension.height != null && Dimension.height != undefined) ? Dimension.height : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].CubicSc = (Dimension.cubicMeters != '' && Dimension.cubicMeters != null && Dimension.cubicMeters != undefined) ? Dimension.cubicMeters : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].SquarSc = (Dimension.squareMeters != '' && Dimension.squareMeters != null && Dimension.squareMeters != undefined) ? Dimension.squareMeters : '0.00';
    //warehousemanagerinfo

    const ManagerInfo1 = this.WarehouseManagerInfoFormControls1.value;
    //let validfrom = ManagerInfo1.ValidFrom !== undefined && ManagerInfo1.ValidFrom !== null && ManagerInfo1.ValidFrom !== "" && ManagerInfo1.ValidFrom !== "Invalid date" ? this.datePickerValue(ManagerInfo1.ValidFrom) : moment(this.CurrentDate).format("YYYY-MM-DDT00:00:00");

    // let Hiring = ManagerInfo1.dateOfHiring !== undefined ? ManagerInfo1.dateOfHiring : this.datePickerValue(ManagerInfo1.dateOfHiring);
    //let Hiring = ManagerInfo1.dateOfHiring !== undefined && ManagerInfo1.dateOfHiring !== null && ManagerInfo1.dateOfHiring !== "" && ManagerInfo1.dateOfHiring !== "Invalid date" ? this.datePickerValue(ManagerInfo1.dateOfHiring) : moment(this.CurrentDate).format("YYYY-MM-DDT00:00:00");
    let Hiring;
    if (ManagerInfo1.dateOfHiring !== undefined && ManagerInfo1.dateOfHiring !== "" && ManagerInfo1.dateOfHiring !== null) {
      if (ManagerInfo1.dateOfHiring.calendarEnd != undefined) {
        Hiring = this.datePickerValue(ManagerInfo1.dateOfHiring);
      }
      else if (ManagerInfo1.dateOfHiring.includes('/Date')) {
        Hiring = new Date(+ManagerInfo1.dateOfHiring.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        Hiring = ManagerInfo1.dateOfHiring;
      }
    } else {
      Hiring = this.CurrentDate.toISOString().slice(0, 19);
    }
    this.WholeData.WH_CONTACTPSet.results[0].Type = ManagerInfo1.idType !== undefined && ManagerInfo1.idType !== "" ? ManagerInfo1.idType : '';
    this.WholeData.WH_CONTACTPSet.results[0].Idnumber = ManagerInfo1.idNumber !== undefined && ManagerInfo1.idNumber !== "" ? ManagerInfo1.idNumber : '';
    //this.WholeData.WH_CONTACTPSet.results[0].Nationality = ManagerInfo1.nationalityOfOwner;
    this.WholeData.WH_CONTACTPSet.results[0].Nationality = ManagerInfo1.nationalityOfOwner !== undefined && ManagerInfo1.nationalityOfOwner !== "" ? ManagerInfo1.nationalityOfOwner : '';
    this.WholeData.WH_CONTACTPSet.results[0].HiringDt = Hiring;
    this.WholeData.WH_CONTACTPSet.results[0].Title = ManagerInfo1.title !== undefined && ManagerInfo1.title !== "" ? ManagerInfo1.title : '';
    this.WholeData.WH_CONTACTPSet.results[0].Firstnm = ManagerInfo1.name !== undefined && ManagerInfo1.name !== "" ? ManagerInfo1.name : '';
    this.WholeData.WH_CONTACTPSet.results[0].Lastnm = ManagerInfo1.surname !== undefined && ManagerInfo1.surname !== "" ? ManagerInfo1.surname : '';
    this.WholeData.WH_CONTACTPSet.results[0].Initials = ManagerInfo1.middlename !== undefined && ManagerInfo1.middlename !== "" ? ManagerInfo1.middlename : '';
    this.WholeData.WH_CONTACTPSet.results[0].Fathernm = ManagerInfo1.fatherName !== undefined && ManagerInfo1.fatherName !== "" ? ManagerInfo1.fatherName : '';
    this.WholeData.WH_CONTACTPSet.results[0].Grandfathernm = ManagerInfo1.grandFatherName !== undefined && ManagerInfo1.grandFatherName !== "" ? ManagerInfo1.grandFatherName : '';
    this.WholeData.WH_CONTACT_DTLSet.results[0].MobNumber = ManagerInfo1.phoneNumber !== undefined && ManagerInfo1.phoneNumber !== "" ? ManagerInfo1.phoneNumber : '';
    this.WholeData.WH_CONTACT_DTLSet.results[0].SmtpAddr = ManagerInfo1.emailId !== undefined && ManagerInfo1.emailId !== "" ? ManagerInfo1.emailId : '';
    //additionalinfo  
    const ManagerInfo2 = this.WarehouseManagerInfoFormControls2.value;
    let answer1 = ManagerInfo2.answer1 !== undefined && ManagerInfo2.answer1 !== "" ? ManagerInfo2.answer1 : '';
    let obj1 = this.answerValue(answer1, 1);
    this.OtherReasonValue.push(obj1);
    let answer2 = ManagerInfo2.answer2 !== undefined && ManagerInfo2.answer2 !== "" ? ManagerInfo2.answer2 : '';
    let obj2 = this.answerValue(answer2, 2);
    this.OtherReasonValue.push(obj2);
    let answer3 = ManagerInfo2.answer3 !== undefined && ManagerInfo2.answer3 !== "" ? ManagerInfo2.answer3 : '';
    let obj3 = this.answerValue(answer3, 3);
    this.OtherReasonValue.push(obj3);
    let answer4 = ManagerInfo2.answer4 !== undefined && ManagerInfo2.answer4 !== "" ? ManagerInfo2.answer4 : '';
    let obj4 = this.answerValue(answer4, 4);
    this.OtherReasonValue.push(obj4);
    this.WholeData.AddQuesSet.results[0].RbFg = ManagerInfo2.financialPosition !== undefined && ManagerInfo2.financialPosition !== "" ? ManagerInfo2.financialPosition : '';
    this.WholeData.AddQuesSet.results[1].RbFg = ManagerInfo2.financialCrimes !== undefined && ManagerInfo2.financialCrimes !== "" ? ManagerInfo2.financialCrimes : '';
    this.WholeData.AddQuesSet.results[2].RbFg = ManagerInfo2.administrativeSystem !== undefined && ManagerInfo2.administrativeSystem !== "" ? ManagerInfo2.administrativeSystem : '';
    this.WholeData.AddQuesSet.results[3].RbFg = ManagerInfo2.secureMeasures !== undefined && ManagerInfo2.secureMeasures !== "" ? ManagerInfo2.secureMeasures : '';
    this.WholeData.NOTESSet["results"] = this.OtherReasonValue;
    //declaration
    const Declaration = this.DeclarationFormControls.value;
    let agree = this.agreeBooleanValueCheck(this.DeclarationFormControls.value.agree);
    this.WholeData.Decnm = Declaration.contactName !== undefined && Declaration.contactName !== "" ? Declaration.contactName : '';
    this.WholeData.Decdg = Declaration.designation !== undefined && Declaration.designation !== "" ? Declaration.designation : '';
    this.WholeData.Type = Declaration.idType !== undefined && Declaration.idType !== "" ? Declaration.idType : '';
    this.WholeData.Idnumber = Declaration.idNumber !== undefined && Declaration.idNumber !== "" ? Declaration.idNumber : '';
    this.WholeData.Decfg = agree;
    this.WholeData.Operationz = '01';
    this.wareHousesService.RenewalWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        console.log('save-2', data["d"]);
        //this.successMsg = true;
        this.WholeData = data["d"];
        this.step13();
      }
    }, (error) => {
      console.log('err-2', error);
    });
  }
  SaveAll() {
    const ManagerInfo1 = this.WarehouseManagerInfoFormControls1.value;

    let Hiring;
    if (ManagerInfo1.dateOfHiring !== undefined && ManagerInfo1.dateOfHiring !== "" && ManagerInfo1.dateOfHiring !== null) {
      if (ManagerInfo1.dateOfHiring.calendarEnd != undefined) {
        Hiring = this.datePickerValue(ManagerInfo1.dateOfHiring);
      }
      else if (ManagerInfo1.dateOfHiring.includes('/Date')) {
        Hiring = new Date(+ManagerInfo1.dateOfHiring.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        Hiring = ManagerInfo1.dateOfHiring;
      }
    } else {
      Hiring = this.CurrentDate.toISOString().slice(0, 19);
    }
    this.WholeData.RenChg = this.licenserenewal == 'Yes' ? '1' : '0';
    this.WholeData.WH_CONTACTPSet.results[0].HiringDt = Hiring;
    const Dimension = this.WarehouseDimensions.value;
    this.WholeData.WH_ADDRESSSet.results[0].LenSiz = (Dimension.length != '' && Dimension.length != null && Dimension.length != undefined) ? Dimension.length : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].WidSiz = (Dimension.width != '' && Dimension.width != null && Dimension.width != undefined) ? Dimension.width : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].HeiSiz = (Dimension.height != '' && Dimension.height != null && Dimension.height != undefined) ? Dimension.height : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].CubicSc = (Dimension.cubicMeters != '' && Dimension.cubicMeters != null && Dimension.cubicMeters != undefined) ? Dimension.cubicMeters : '0.00';
    this.WholeData.WH_ADDRESSSet.results[0].SquarSc = (Dimension.squareMeters != '' && Dimension.squareMeters != null && Dimension.squareMeters != undefined) ? Dimension.squareMeters : '0.00';
    this.WholeData.Operationz = '01';
    this.wareHousesService.RenewalWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        console.log('save-2', data["d"]);
        //this.successMsg = true;
        this.WholeData = data["d"];
        this.step13();
      }
    }, (error) => {
      console.log('err-2', error);
    });
  }


  //To allow numbers only in inputs
  NumberAllow(event) {
    // var rgx = /^[0-9]*$/;
    // if (rgx.test(event.target.value)) {
    //   // this.idErr1 = true;
    //   return true;
    // }
    // else if (event.keyCode == 32) {
    //   this.idErr1 = true;
    //   return false;
    // }
    // else {
    //   this.idErr1 = true;
    //   return false;
    // }
    let charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 32)) {
      return false;
    }
  }

  TextAllow(event) {
    var rgx = /^[a-zA-Z \s]*$/
    if (rgx.test(event.target.value)) {
      // this.idErr1 = true;
      return true;
    }
    else {
      return false;
    }
  }
  SpaceValidator(event) {
    if (!event.target.value.length && event.keyCode == 32) {
      event.preventDefault();
    }
  }
}
export class WarehouseInfoModel {
  Agreeflg: boolean;
  Fin: string;
  Bussiness: string;
  ExpiryDate: string;
  SelectWarehouse: string;
}
export class WarehouseDetailsModel {
  Agreeflg: boolean;
  Fin: string;
  Bussiness: string;
  SelectWarehouse: string;
  ExpiryDate: string;
  RenExt: string;
}
export class WarehouseIdentificationModel {
  WarehouseName: string;
  Address: string;
  Latitude: any;
  Longitude: any;
}

export class WarehouseOwnerShipModel {
  OwnerType: string;
  ValidFrom: string;
  IdType: string;
  IdNumber: string;
  Nationality: string;
  PhoneNumber: number;
  Nameoftheowner: string;
  EmailId: string;
  CountryCode: string;
  CRNo: string;
  Tin: string;
  CompanyName: string;
  Address: string;
  Phone: number;
  LeaseDate: string;
  ExpiryDate: string;
}

export class WarehouseDimensionsModel {
  Length: any;
  Width: any;
  Height: any;
  CubicMeters: any;
  SquareMeters: any;
}

export class WarehouseManagerInfoModel {
  IdType: string;
  IdNumber: string;
  Nationality: string;
  DateOfHiring: string;
  Title: string;
  NameSurname: string;
  FirstName: string;
  SurName: string;
  MiddleName: String;
  FatherName: string;
  GrandFatherName: string;
  CountryCode: string;
  PhoneNumber: number;
  EmailId: string;
}

export class BankInfoModel {
  InitialBankGuaranteeValue: any;
}
export class DeclarationInfoModel {
  Name: string;
  Designation: string;
  IdType: string;
  IdNumber: string;
  Agree: boolean;
}

