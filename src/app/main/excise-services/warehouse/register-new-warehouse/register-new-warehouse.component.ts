import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import { registernewwarehouseconstants } from "src/app/main/excise-services/warehouse/register-new-warehouse/registernewwarehouseconstants.model";
import * as moment from 'moment';
import { WarehouseService } from '../warehouse.service';
import { NotifierService } from 'angular-notifier';
import * as FileSaver from 'file-saver';
import { CommonValidation } from 'src/app/constants/commonValidations';
import { AppService } from "src/app/app.service";
import { CalendarComponent } from "src/app/constants/calendar.component";
declare var jQuery;
declare var $;
@Component({
  selector: 'app-register-new-warehouse',
  templateUrl: './register-new-warehouse.component.html',
  styleUrls: ['./register-new-warehouse.component.css']
})
export class RegisterNewWarehouseComponent implements OnInit {
  @ViewChild('confirm', { static: false }) confirm: ElementRef;
  @ViewChild('proceed', { static: false }) proceed: ElementRef;
  @ViewChild('instructions', { static: false }) instructions: ElementRef;
  @ViewChild('htmlData', { static: false }) htmlData: ElementRef;
  headerComponent = CalendarComponent;
  attachmentError: boolean = false;
  errorMessage: any;
  defaultEnamble: boolean = false;
  confirmBtn: boolean = false;
  fileSizeError: boolean = false;
  InstructionFormGroup: FormGroup = new FormGroup({});
  WarehouseInformation: FormGroup = new FormGroup({});
  WarehouseIdentication: FormGroup = new FormGroup({});
  WarehouseOwnerShip: FormGroup = new FormGroup({});
  WarehouseIsIndividualOwnerShip: FormGroup = new FormGroup({});
  WarehouseIsCompanyOwnerShip: FormGroup = new FormGroup({});
  WarehouseDimensions: FormGroup = new FormGroup({});
  WarehouseManagerInformation: FormGroup = new FormGroup({});
  BankGuaranteeInformation: FormGroup = new FormGroup({});
  AdditionalInformation: FormGroup = new FormGroup({});
  DeclarationFormGroup: FormGroup = new FormGroup({});
  TextAreaForm1: FormGroup = new FormGroup({});
  TextAreaForm2: FormGroup = new FormGroup({});
  TextAreaForm3: FormGroup = new FormGroup({});
  TextAreaForm4: FormGroup = new FormGroup({});
  IdTypeOwnerShipFormgroup: FormGroup;
  StringPattern = "[a-zA-Z \s]*$";
  ContactNoPattern = "[5][0-9]{8}";
  // DecimalPointPattern = "/^\d*\.?\d*$/";
  // DecimalPointPattern="[0-9]+(\.[0-9][0-9]?)?";
  DecimalPointPattern = "^[0-9]+(\.[0-9]{1,12})?$";
  DecimalPointTwoPattern = '^[0-9]{1,5}(?:\[.][0-9]{1,2})?$';
  NumberPattern1 = "^[0-9]+(\.[0-9]{1,2})?$";
  NumberPattern = "^[0-9]*$";
  EmailPattern = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
  DimesnionsPattern = "/^-?(0|[1-9]\d*)?$/";

  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 1;
  ReturnId: any;
  CurrentDate = new Date();
  WareHouseDetails: any;
  purpose: any;
  WareHouseDetails2: any;
  TitleSet: any;
  CountrySet: any;
  DropGoodsSet: any;
  GoodsType: any;
  TaxRateSet: any;
  WHDraftInfo: any;
  ItemSavedSet: any;
  iswhOwnership: boolean = false;
  isCompany: boolean = false;
  isIndividual: boolean = false;
  isCard: string = 'No';
  OwnershipAttachFiles: any[] = [];
  DimensionAttachFiles: any[] = [];
  BankAttachFiles: any[] = [];
  OtherReasonValue: any[] = [];
  RetailSet: any;
  ProductSet: any;
  MeasurementSet: any;
  isCard1: string = 'Yes';
  isTextarea1: boolean = false;
  isUpload1: boolean = true;
  isCard2: string = 'Yes';
  isTextarea2: boolean = false;
  isUpload2: boolean = true;
  isCard3: string = 'Yes';
  isTextarea3: boolean = false;
  isUpload3: boolean = true;
  isCard4: string = 'Yes';
  isTextarea4: boolean = false;
  isUpload4: boolean = true;
  isUploaded1: boolean = false;
  isUploaded2: boolean = false;
  isUploaded3: boolean = false;
  isUploaded4: boolean = false;
  UploadFiles1: any[] = [];
  UploadFiles2: any[] = [];
  UploadFiles3: any[] = [];
  UploadFiles4: any[] = [];
  isOwnerType: any;
  OwnerIdTypeName: any;
  ManagerIdTypeName: any;
  DeclarationIdTypeName: any;
  ManagerNationalityName: any;
  ManagerTitleName: any;
  OwnerNationalityName: any;
  OwnerTypeName: any;
  usagePurpose: any;
  type1: boolean = false;
  type2: boolean = false;
  type3: boolean = false;
  type4: boolean = false;
  isTypes: boolean = false;
  good1: any;
  good2: any;
  good3: any;
  good4: any;
  BankRSPValueTotal: any;
  BankGuaranteeValue: any;
  WH_EREGGOODSSet: any;
  lang: any;
  direction: string;
  CountrySetListDuplicate: any;
  CountrySetList: any;
  CountrySetList1: any;
  OwnerShipCountrySetList: any;
  ManagerCountrySetList: any;
  isWHOwnershipInfo: boolean = false;
  isWHManagerInfo: boolean = false;
  isWHDeclarationInfo: boolean = false;
  idErr1: boolean = false;
  id1: string;
  enddate: any;
  WarehouseInfoModel = new WarehouseInfoModel();
  WarehouseIdentificationModel = new WarehouseIdentificationModel();
  WarehouseOwnerShipModel = new WarehouseOwnerShipModel();
  WarehouseDimensionsModel = new WarehouseDimensionsModel();
  WarehouseManagerInfoModel = new WarehouseManagerInfoModel();
  BankInfoModel = new BankInfoModel();
  AdditionalInfoModel = new AdditionalInfoModel();
  DeclarationInfoModel = new DeclarationInfoModel();
  ProductHeader: any;
  wareHsLease: any;
  oIdType1: any;
  TaxGoodType: any;
  LeasedList: any;
  draftflag: boolean = false;
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
  //   }, {
  //     "Key": "RL",
  //     "Text": "Released Goods"
  //   }
  // ]

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
  maxDate = new Date();
  Step3OwnerIdTypeName: string;
  DraftList: any;
  Fbguid: any;
  Fbnum: any;
  successMsg1: boolean = false;
  purposeValue: any;
  RegionDistrictList: any;
  CityList: any;
  DistrictName: any;
  CityName: any;
  goodsflag: boolean = false;

  constructor(
    private router: Router,
    private wareHousesService: WarehouseService,
    private ref: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private fb: FormBuilder,
    public appSrv: AppService,
    public commonValidation: CommonValidation
  ) {
    this.GPartz = localStorage.getItem('gpart');

    if (localStorage.getItem("lang") === "ar") {
      this.lang = registernewwarehouseconstants.langz.arb.registernewwarehouse;
      this.direction = registernewwarehouseconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = registernewwarehouseconstants.langz.eng.registernewwarehouse;
      this.direction = registernewwarehouseconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
    }

  }

  ngOnInit() {
    this.appSrv.data1.subscribe((res) => {
      this.enddate = this.commonValidation.dateFormate(
        this.commonValidation.toJulianDate(new Date()),
        res
      );
    });
    this.Dropdownbindtext();
    this.WarehouseInformation.addControl('purpose', new FormControl('', [Validators.required]));
    this.InstructionFormGroup.addControl('agree', new FormControl(false, [Validators.required]));

    this.stepsChecking();
    this.getDraftedWHInfo();
    //this.getWHInformation();
    this.getWHInformation2();

    this.WarehouseIdentication = new FormGroup({
      warehouseName: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern(this.StringPattern)]),
      //address: new FormControl('', [Validators.required]),
      BuildingNo: new FormControl('', [Validators.maxLength(15), Validators.pattern(this.NumberPattern)]),
      StreetName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      RegionDistrict: new FormControl('', [Validators.required]),
      City: new FormControl('', [Validators.required]),
      PostalCode: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.pattern(this.NumberPattern)]),
      Addrnumber: new FormControl(''),
      Quarter: new FormControl(''),
      latitude: new FormControl('', [Validators.maxLength(32), Validators.min(-999.999999999999), Validators.max(999.999999999999), Validators.pattern(this.DecimalPointPattern)]),
      longitude: new FormControl('', [Validators.maxLength(32), Validators.min(-999.999999999999), Validators.max(999.999999999999), Validators.pattern(this.DecimalPointPattern)])
    });

    this.WarehouseDimensions = new FormGroup({
      length: new FormControl('', [Validators.pattern(this.DecimalPointTwoPattern)]),
      width: new FormControl('', [Validators.pattern(this.DecimalPointTwoPattern)]),
      height: new FormControl('', [Validators.pattern(this.DecimalPointTwoPattern)]),
      cubicMeters: new FormControl('', [Validators.pattern(this.DecimalPointTwoPattern)]),
      squareMeters: new FormControl('', [Validators.pattern(this.DecimalPointTwoPattern)]),
    });

    this.WarehouseManagerInformation = new FormGroup({
      idType: new FormControl('',),
      idNumber: new FormControl('', [Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.NumberPattern)]),
      nationality: new FormControl('',),
      dateOfHiring: new FormControl(undefined),
      title: new FormControl('',),
      name: new FormControl('', [Validators.pattern(this.StringPattern)]),
      surname: new FormControl('', [Validators.pattern(this.StringPattern)]),
      middlename: new FormControl('', [Validators.pattern(this.StringPattern)]),
      fatherName: new FormControl('', [Validators.pattern(this.StringPattern)]),
      grandFatherName: new FormControl('', [Validators.pattern(this.StringPattern)]),
      countryCode: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.minLength(10), Validators.pattern(this.NumberPattern)]),
      emailId: new FormControl('', [Validators.pattern(this.EmailPattern)]),
    });

    this.BankGuaranteeInformation = this.fb.group({
      Rows: this.fb.array([]),
      initialBankGuaranteeValue: this.fb.control('')
    });

    this.DeclarationFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(this.StringPattern)]),
      designation: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(this.StringPattern)]),
      idType: new FormControl('', [Validators.required]),
      idNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.NumberPattern)]),
      agree: new FormControl('', [Validators.required]),
      date: new FormControl('', [])
    });
    this.IdTypeOwnerShipFormgroup = new FormGroup({
      Idnumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(16)]),
      Dob: new FormControl(undefined, [Validators.required]),
    });

  }

  declarationInfo() {
    // let agreeflag = this.WareHouseDetails.Decfg !== undefined && this.WareHouseDetails.Decfg !== null ? this.agreeStringValueCheck(this.WareHouseDetails.Decfg) : false;
    // this.DeclarationFormGroup.addControl('name', new FormControl(this.WareHouseDetails.Decnm, [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]));
    // this.DeclarationFormGroup.addControl('designation', new FormControl(this.WareHouseDetails.Decdg, [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]));
    // this.DeclarationFormGroup.addControl('idType', new FormControl(this.WareHouseDetails.Type, [Validators.required]));
    // this.DeclarationFormGroup.addControl('idNumber', new FormControl(this.WareHouseDetails.Idnumber, [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(16)]));
    // this.DeclarationFormGroup.addControl('agree', new FormControl(agreeflag, [Validators.required]));
    // this.DeclarationFormGroup.addControl('date', new FormControl(this.CurrentDate));
    // return this.DeclarationFormGroup;

    this.DeclarationFormGroup.patchValue({
      name: this.WareHouseDetails.Decnm,
      designation: this.WareHouseDetails.Decdg,
      idType: this.WareHouseDetails.Type,
      idNumber: this.WareHouseDetails.Idnumber,
      agree: this.WareHouseDetails.Decfg,
      date: this.CurrentDate.toISOString().slice(0, 10)
    });
    this.warehouseDeclarationData();
  }

  popUpClose() {
    $('#instructions').modal('hide');
    this.router.navigate(['/mains/tax']);
  }
  newApp() {
    $('#confirm').modal('hide');
    //$('#instructions').modal('show');
    this.step1();
  }
  Popupconfirmation() {
    $('#confirm').modal('hide');
    $('#proceed').modal('show');
  }
  draftRadioSelected(index) {
    $('#proceed').modal('hide');
    for (let h = 0; h < this.DraftList.length; h++) {
      if (index == h) {
        this.Fbguid = this.DraftList[h].Fbguid;
        this.Fbnum = this.DraftList[h].Fbnum;
      }
    }
    this.draftflag = true;
    // if (this.Fbguid !== undefined && this.Fbnum !== undefined) {
    //   this.getWHInformation();
    // }
    this.step1();
  }
  termsAndConditionsAccept() {
    this.successMsg1 = true;
    // this.step1();
    $('#instructions').modal('hide');
  }
  step1() {
    this.getWHInformation();
    this.Step = 1;

  }
  getDraftedWHInfo() {
    this.wareHousesService.getDraftedWHInfo(this.GPartz, this.Language).subscribe((data) => {
      this.WHDraftInfo = data['d'];
      console.log("WHDraftInfo", this.WHDraftInfo);
      this.DraftList = this.WHDraftInfo.ITM_SAVEDSet.results;
      if (this.lang == 'ar') {
        moment.locale('ar-Sa');
      }
      else {
        moment.locale('en-Us');

      }
      this.DraftList.forEach(element => {
        element.Keydt = moment(new Date(+(((element.Keydt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
      });
      if (this.successMsg1 == false) {
        this.confirm.nativeElement.click();
        $('#confirm').modal('show');
      }
    });
  }
  step1WHInformation(val) {
    this.InstructionFormGroup.patchValue({ agree: (val.Stgfg == "1") ? true : false });
    this.WarehouseInformation.patchValue({ purpose: val.Purpose });
    this.warehouseInfoData();
    // for (let j = 0; j < this.ProductSet.length; j++) {
    //   for (let k = 0; k < this.WareHouseDetails.WH_EREGGOODSSet.results.length; k++) {
    //     if (this.ProductSet[j].GoodsTyp == this.WareHouseDetails.WH_EREGGOODSSet.results[k].GoodsTyp) {
    //       if(this.WareHouseDetails.WH_EREGGOODSSet.results[k].Flag == "X")
    //       {
    //       this.ProductSet[j].flag == true;
    //       }
    //       else
    //       {
    //         this.ProductSet[j].flag == false;
    //       }
    //     }
    //   }

    // }
    // if (this.WareHouseDetails.WH_EREGGOODSSet.results.length > 0) {
    //   let goodstype = this.WareHouseDetails.WH_EREGGOODSSet.results.filter(x => x.Flag == "X");
    //   for (let i = 0; i < goodstype.length; i++) {
    //     for (let j = 0; j < this.ProductSet.length; j++) {
    //       if (this.ProductSet[j].GoodsTyp == goodstype[i].GoodsTyp) {
    //         this.Ereggoodsset(j);
    //         this.ProductSet[j].flag = true;
    //       }
    //     }
    //   }
    // }
  }
  Step2Identification(val) {
    this.WarehouseIdentication.patchValue({
      warehouseName: val.Whfnm,
      BuildingNo: val.WH_ADDRESSSet.results[0].BuildingNo,
      StreetName: val.WH_ADDRESSSet.results[0].Street,
      RegionDistrict: val.WH_ADDRESSSet.results[0].Region,
      PostalCode: val.WH_ADDRESSSet.results[0].PostalCd,
      Addrnumber: val.WH_ADDRESSSet.results[0].Addrnumber,
      Quarter: val.WH_ADDRESSSet.results[0].Quarter,
      City: val.WH_ADDRESSSet.results[0].City,
      latitude: val.WH_ADDRESSSet["results"][0].Latitude,
      longitude: val.WH_ADDRESSSet["results"][0].Longitude
    });
    this.warehouseIdentificationData();
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
  bindingAttachment() {
    var attahmentata = this.WareHouseDetails?.ATTACHSet.results;
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
    var attahmentata = this.WareHouseDetails?.ATTACHSet.results;
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
  getAttachmentNotes(val) {
    for (let z = 0; z < this.WareHouseDetails.NOTESSet.results.length; z++) {
      if (this.WareHouseDetails.NOTESSet.results[z].Rcodez == "EWQ_NOTE01") {
        this.TextAreaForm1.patchValue({
          textarea1: this.WareHouseDetails.NOTESSet.results[z].Strline
        });
        // this.AdditionalInfoModel.TextArea1 = this.WareHouseDetails.NOTESSet.results[z].Strline;
      }
      if (this.WareHouseDetails.NOTESSet.results[z].Rcodez == "EWQ_NOTE02") {
        this.TextAreaForm2.patchValue({
          textarea2: this.WareHouseDetails.NOTESSet.results[z].Strline
        });
        // this.AdditionalInfoModel.TextArea2 = this.WareHouseDetails.NOTESSet.results[z].Strline;
      }
      if (this.WareHouseDetails.NOTESSet.results[z].Rcodez == "EWQ_NOTE03") {
        this.TextAreaForm3.patchValue({
          textarea3: this.WareHouseDetails.NOTESSet.results[z].Strline
        });
        // this.AdditionalInfoModel.TextArea3 = this.WareHouseDetails.NOTESSet.results[z].Strline;
      }
      if (this.WareHouseDetails.NOTESSet.results[z].Rcodez == "EWQ_NOTE04") {
        this.TextAreaForm4.patchValue({
          textarea4: this.WareHouseDetails.NOTESSet.results[z].Strline
        });
        // this.AdditionalInfoModel.TextArea4 = this.WareHouseDetails.NOTESSet.results[z].Strline;
      }
    }
    this.warehouseAdditionalData();
  }
  getWHInformation() {
    let Fbguid = this.Fbguid != undefined ? this.Fbguid : '';
    let Fbnum = this.Fbnum != undefined ? this.Fbnum : '';
    this.wareHousesService.getWHInformation(this.GPartz, this.Language, Fbguid, Fbnum).subscribe((data) => {
      this.WareHouseDetails = data['d'];
      this.WH_EREGGOODSSet = data["d"]["WH_EREGGOODSSet"]["results"];
      this.RetailSet = this.WareHouseDetails.WH_GOODSDTLSet.results;
      this.ReturnId = data["d"].ReturnIdz;
      if (this.draftflag == true) {
        this.step1WHInformation(this.WareHouseDetails);
        this.Step2Identification(this.WareHouseDetails);
        this.step3ownership(this.WareHouseDetails);
        this.step4dimensions(this.WareHouseDetails);
        this.bindingAttachment();
        this.bindingAdditionalAttachment();
        this.getAttachmentNotes(this.WareHouseDetails);
        this.warehouseBankInfoFormControls();
        this.ownerIdType2(this.WarehouseManagerInformation.value.idType);
        this.warehouseManagerInfo1();
        this.warehouseManagerInfoData();
        this.declarationInfo();

        // this.warehouseDeclarationData();
        //this.warehouseBankInfo();
        if (this.WH_EREGGOODSSet.length > 0) {

          let goodstype = this.WH_EREGGOODSSet.filter(x => x.Flag == "X");
          for (let i = 0; i < goodstype.length; i++) {
            for (let j = 0; j < this.ProductSet.length; j++) {
              if (this.ProductSet[j].GoodsTyp == goodstype[i].GoodsTyp) {
                this.Ereggoodsset1(j);
                this.ProductSet[j].flag = true;
                this.ProductSet[j].flag1 = false;
              }
            }
          }
        }
        for (let i = 0; i < this.ProductSet.length; i++) {
          if (this.ProductSet[i].flag == 'X' && this.ProductSet[i].GoodsTyp == '001') {
            this.ProductSet.forEach(element => {
              if (element.GoodsTyp != '001') {
                element.disabled = true;
              }
            });
          }
          else if (this.ProductSet[i].flag == 'X' && (this.ProductSet[i].GoodsTyp == '002' || this.ProductSet[i].GoodsTyp == '003' || this.ProductSet[i].GoodsTyp == '004')) {
            this.ProductSet.forEach(element => {
              if (element.GoodsTyp == '001') {
                element.disabled = true;
              }
            });
          }
        }
        let flag = this.ProductSet.filter(x => x.flag == true);
        if (flag.length > 0) {
          this.goodsflag = true;
        }
        else {
          this.goodsflag = false;
        }
      }
      else
      {
        if (this.WH_EREGGOODSSet.length > 0) {

          let goodstype = this.WH_EREGGOODSSet.filter(x => x.Flag == "X");
          for (let i = 0; i < goodstype.length; i++) {
            for (let j = 0; j < this.ProductSet.length; j++) {
              if (this.ProductSet[j].GoodsTyp == goodstype[i].GoodsTyp) {
                this.ProductSet[j].disabled = false;
                this.ProductSet[j].flag = false;
                this.ProductSet[j].flag1 = false;
              }
            }
          }
        }
      }

    });
  }

  getWHInformation2() {
    this.wareHousesService.getWHInformation2(this.GPartz, this.Language).subscribe((data) => {
      this.WareHouseDetails2 = data['d'];
      this.ProductSet = this.WareHouseDetails2.DropGoodsSet.results;
      this.ProductSet.filter(x => x.flag = '');
      this.ProductSet.forEach(element => {
        element['flag'] = false;
        element['disabled'] = false;
      });
      this.MeasurementSet = this.WareHouseDetails2.UnitMSet.results;
      this.CountrySet = this.WareHouseDetails2.COUNTRYSet.results;
      this.CountrySetListDuplicate = this.WareHouseDetails2.COUNTRYSet.results;
      this.RegionDistrictList = data["d"]["districtSet"]["results"];
      this.CityList = data["d"]["citySet"]["results"];
      this.CountrySetList = data["d"]["COUNTRYSet"]["results"];
      this.TitleSet = this.WareHouseDetails2.TITLESet.results;
      this.TaxRateSet = this.WareHouseDetails2.GDTAXRATESet.results;
      console.log("WareHouseDetails2", this.WareHouseDetails2);
      console.log("this.WH_EREGGOODSSet", this.WH_EREGGOODSSet)
    });
  }
  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.warehouseInfoFormControls();
        this.instructionFormControls();
        break;
      case 2:
        //this.warehouseIdentificationFormControls();
        break;
      case 3:
        break;
      case 4:
        this.warehouseDimensionsFormControls();
        break;
      case 5:
        this.warehouseManagerInfoFormControls();
        break;
      case 6:
        //this.warehouseBankInfoFormControls();
        break;
      case 7:

        break;
      case 8:
        this.warehouseDeclarationFormControls();
        break;
      case 9:

        break;
      case 10:

        break;
      default:
        break;
    }
    return this.Step;
  }


  Ereggoodsset1(val) {
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
  }

  selectedCount: number = 0;
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

    }
    else {
      for (let i = 0; i < this.TaxGoodType.length; i++) {
        this.formArr().push(this.initRows(this.ProductSet[val].GoodsTyp, this.TaxGoodType[i].Key, '0.00', '', '0.00'));
        this.rspTotal(i);
      }
    }
    for (let i = 0; i < this.WH_EREGGOODSSet.length; i++) {
      for (let j = 0; j < this.ProductSet.length; j++) {
        if (this.ProductSet[j].GoodsTyp == this.WH_EREGGOODSSet[i].GoodsTyp) {
          this.ProductSet[j].flag1 = false;
        }
        else
        {
          this.ProductSet[j].flag1 = true;
        }
      }
    }
    console.log('goods', this.WH_EREGGOODSSet);
    console.log("ProductSet", this.ProductSet);
    let flag = this.ProductSet.filter(x => x.flag == true);
    if (flag.length > 0) {
      this.goodsflag = true;
    }
    else {
      this.goodsflag = false;
    }
  }
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

  /* Step - 1 First Screen Info Starts */
  warehouseInfoFormControls() {
    //this.WarehouseInformation.addControl('purpose', new FormControl('', [Validators.required]));
  }

  instructionFormControls() {
    //this.InstructionFormGroup.addControl('agree', new FormControl(false, [Validators.required]));
  }


  wareHouseChange(val) {
    this.purposeValue = val;
    for (let i = 0; i < this.ProductHeader.length; i++) {
      if (val == this.ProductHeader[i].Key) {
        this.usagePurpose = this.ProductHeader[i].Text;

      }


    }
    if (val === '02') {
      this.instructions.nativeElement.click();
      $('#instructions').modal('show');
    } else {
      this.InstructionFormGroup.controls['agree'].setValue(false);
    }
    this.isTypes = false;

  }

  // Ereggoodsset1(val) {
  //   this.ProductSet[val].flag = !this.ProductSet[val].flag;

  //   if (val == 0 && this.ProductSet[val].flag == false) {
  //     this.ProductSet.forEach(element => {
  //       if (element.GoodsTyp != "001") {
  //         element.disabled = false;
  //         element.flag = false;
  //       }
  //     });
  //   }
  //   else if (val > 0 && this.ProductSet[val].flag == false) {
  //     if (!this.ProductSet[1].flag && !this.ProductSet[2].flag && !this.ProductSet[3].flag) {
  //       this.ProductSet.forEach(element => {
  //         element.disabled = false;
  //         element.flag = false;
  //       });
  //     }
  //   }
  //   if (val > 0 && this.ProductSet[val].flag == true) {
  //     this.ProductSet.forEach(element => {
  //       if (element.GoodsTyp == "001") {
  //         element.disabled = true;
  //         element.flag = false;
  //       }
  //     });
  //   }

  //   this.RetailSet.filter(x => x.Gdtyp == this.ProductSet[val].GoodsTyp);
  //   if (this.ProductSet[val].flag == false) {
  //     let control = <FormArray>this.BankGuaranteeInformation.controls['Rows'];
  //     let control1 = control.value.filter(x => x.energyDrinks != this.ProductSet[val].GoodsTyp);

  //     this.BankGuaranteeInformation = this.fb.group({
  //       Rows: this.fb.array([]),
  //       initialBankGuaranteeValue: this.fb.control('')
  //     });
  //     this.BankGuaranteeValue = 0;
  //     for (let i = 0; i < control1.length; i++) {
  //       this.formArr().push(this.initRows(control1[i].energyDrinks, control1[i].movedgoods, control1[i].quantity, control1[i].unitofMeasure, control1[i].totalRspValue));
  //       this.rspTotal(i);
  //     }
  //   }
  //   else {
  //     for (let i = 0; i < this.TaxGoodType.length; i++) {
  //       console.log(this.formArr())
  //       this.formArr().push(this.initRows(this.ProductSet[val].GoodsTyp, this.TaxGoodType[i].Key, '0.00', '', '0.00'));
  //       console.log(this.formArr())
  //       this.rspTotal(i);
  //     }
  //   }
  //   console.log('goods', this.WH_EREGGOODSSet);
  //   this.addingproducts();
  // }
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


  onWarehouseSelection(i) {
    let selected = this.ProductSet.filter(e => e.flag);
    if (i == 0) {
      if (selected.length > 0) {
        if (+selected[0]["GoodsTyp"] - 1 != i) {
          return
        }
      }
      this.ProductSet[i].flag = !this.ProductSet[i].flag;
      if (this.ProductSet[0].flag) {
        this.ProductSet.filter((e, index) => {
          if (i != index) {
            e.flag = false;
            e.disabled = true;
          }
        });
      } else {
        this.ProductSet.filter(e => { e.flag = false; e.disabled = false; });
      }
    } else if (!this.ProductSet[0].flag) {
      this.ProductSet[i].flag = !this.ProductSet[i].flag;
      if (i == 1 || i == 2 || i == 3) {
        this.ProductSet[0].disabled = true;
        this.ProductSet[0].flag = false;
      }
      if (!this.ProductSet[1].flag && !this.ProductSet[2].flag && !this.ProductSet[3].flag) {
        this.ProductSet[0].disabled = false;
      }
    }
    let countoftiles = this.ProductSet.filter(x => x.flag == true);
    if (countoftiles.length > 0) {
      this.defaultEnamble = true
    }
    else {
      this.defaultEnamble = true
    }
  }

  warehouseInfoData() {
    const instructionValue = this.InstructionFormGroup.value;
    const warehouseValue = this.WarehouseInformation.value;
    this.WarehouseInfoModel.Agreeflg = instructionValue.agree;
    this.WarehouseInfoModel.SelectWarehouse = warehouseValue.purpose;
    this.WarehouseInfoModel.Fin = this.WareHouseDetails.Fin;
    this.WarehouseInfoModel.Bussiness = this.WareHouseDetails.Bunm;
    return this.WarehouseInfoModel;
  }

  continueFirstScreen() {
    const obj1 = this.warehouseInfoData();
    for (let j = 0; j < this.ProductSet.length; j++) {
      for (let k = 0; k < this.WareHouseDetails.WH_EREGGOODSSet.results.length; k++) {
        if (this.ProductSet[j].GoodsTyp == this.WareHouseDetails.WH_EREGGOODSSet.results[k].GoodsTyp) {
          this.WareHouseDetails.WH_EREGGOODSSet.results[j].Flag = (this.ProductSet[j].Flag == true) ? "X" : "";
          this.WareHouseDetails.WH_EREGGOODSSet.results[j].GoodsTyp = this.ProductSet[j].GoodsTyp;
        }
      }
    }
    this.WareHouseDetails.Purpose = this.WarehouseInfoModel.SelectWarehouse;
    console.log('wh-info', obj1);
    // this.removeFirstScreenControls();
    this.step2();
  }
  /* Step - 1 First Screen Info End */

  /* Step - 2 Second Screen Info Starts */


  warehouseIdentificationData() {
    const warehouseValue = this.WarehouseIdentication.value;
    this.WarehouseIdentificationModel.WarehouseName = warehouseValue.warehouseName;
    this.WarehouseIdentificationModel.Address = warehouseValue.address;
    this.WarehouseIdentificationModel.Latitude = warehouseValue.latitude;
    this.WarehouseIdentificationModel.Longitude = warehouseValue.longitude;
    return this.WarehouseIdentificationModel;
  }

  editStep2() {
    // this.WarehouseIdentication = new FormGroup({
    //   warehouseName: new FormControl(this.WarehouseIdentificationModel.WarehouseName, [Validators.required]),
    //   address: new FormControl(this.WarehouseIdentificationModel.Address, [Validators.required]),
    //   latitude: new FormControl(this.WarehouseIdentificationModel.Latitude, [Validators.min(-90), Validators.max(90), Validators.pattern(this.NumberPattern)]),
    //   longitude: new FormControl(this.WarehouseIdentificationModel.Longitude, [Validators.min(-180), Validators.max(180), Validators.pattern(this.NumberPattern)])
    // });
    this.Step = 2;
  }

  continueSecondScreen() {
    const obj2 = this.warehouseIdentificationData();
    console.log('identifi', obj2);
    // this.removeSecondScreenControls();
    this.step3();
  }

  /* Step - 2 Second Screen Info End */

  /* Step - 3 Third Screen Info Starts */
  warehouseOwnerShipFormControls() {
    this.WarehouseOwnerShip = new FormGroup({
      ownerType: new FormControl(''),
      validFrom: new FormControl(''),
      leaseDate: new FormControl(undefined),
      expiryDate: new FormControl(undefined)
    });
  }

  warehouseownershipIndividualFormControls() {
    this.WarehouseIsIndividualOwnerShip = new FormGroup({
      idType: new FormControl(''),
      idNumber: new FormControl('', [Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.NumberPattern)]),
      nationality: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.NumberPattern)]),
      emailId: new FormControl('', [Validators.pattern(this.EmailPattern)])
    });
  }

  warehouseownershipIsCompanyFormControls() {
    this.WarehouseIsCompanyOwnerShip = new FormGroup({
      crNo: new FormControl('', [Validators.pattern(this.NumberPattern), Validators.minLength(10), Validators.maxLength(10)]),
      tin: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      companyName: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl('')
    });
  }

  GetCrno() {
    if (this.WarehouseIsCompanyOwnerShip.get('crNo').value.length == 10) {
      this.wareHousesService.getCrno(this.WarehouseIsCompanyOwnerShip.get('crNo').value).subscribe((data) => {

        this.WarehouseIsCompanyOwnerShip.patchValue({
          tin: data["d"]["WoTin"],
          companyName: data["d"]["Compnm"],
          address: data["d"]["WoAddress"],
          phone: data["d"]["TelNumber"]
        });

      },
        (err) => {
          console.log("err", err);
        });
    }
  }


  isNo: boolean = false;
  whOwnership(val) {
    this.isCard = val;
    this.isCompany = false;
    if (val == 'Yes') {
      this.isNo = true;
      this.iswhOwnership = true;
      this.isIndividual = true;
      this.warehouseOwnerShipFormControls();
      this.warehouseownershipIndividualFormControls();

    } else {
      this.isNo = false;
      this.iswhOwnership = false;
      this.isIndividual = false;
      for (let i = 0; i < this.OwnershipAttachFiles.length; i++) {
        this.wareHousesService.deletefiledocument(this.ReturnId, this.OwnershipAttachFiles[i].did, 'WA01').subscribe(data => {
          if (data) {
            console.log('attch-data', data["d"]);

          }
        });
      }

      this.OwnershipAttachFiles = [];
    }
  }

  ownerTypeChange(val) {
    this.isOwnerType = val;
    for (let i = 0; i < this.wareHsLease.length; i++) {
      if (val == this.wareHsLease[i].Key) {
        this.OwnerTypeName = this.wareHsLease[i].Text;
      }
    }
    if (val == 'C') {
      this.isCompany = true;
      this.isIndividual = false;
      this.WarehouseIsCompanyOwnerShip.removeControl('leaseDate');
      this.WarehouseIsCompanyOwnerShip.removeControl('expiryDate');
      //this.removeOwnershipIsindividualControls();
      this.warehouseownershipIsCompanyFormControls();
    } else {
      this.isCompany = false;
      this.isIndividual = true;
      //  this.removeOwnerShipControls();
      this.WarehouseIsCompanyOwnerShip.removeControl('leaseDate');
      this.WarehouseIsCompanyOwnerShip.removeControl('expiryDate');
      this.warehouseownershipIndividualFormControls();
    }
  }

  ownerNationality(value) {
    for (let i = 0; i < this.CountrySet.length; i++) {
      if (value == this.CountrySet[i].Land1) {
        this.OwnerNationalityName = this.CountrySet[i].Natio50;
      }
    }
  }

  ownerIdType(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.OwnerIdTypeName = this.oIdType1[i].Text;
        this.ownerNationality1(value);
      }
    }
  }
  ownerIdType1(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.Step3OwnerIdTypeName = this.oIdType1[i].Text;
        this.ownerNationality2(value);
      }
    }

  }
  ownerIdType2(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.Step3OwnerIdTypeName = this.oIdType1[i].Text;
        this.ownerNationality3(value);
      }
    }

  }
  ownerIdType3(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.DeclarationIdTypeName = this.oIdType1[i].Text;
      }
    }
    if (value == "ZS0003") {
      //this.CountrySetList1=this.CountrySetListDuplicate.filter(data=>{return data. GccFlag=='X'});
    }
    else if (value == "ZS0001" || value == "ZS0002") {
      $("#idWHOwnerValidation").modal("show");
      this.isWHDeclarationInfo = true;
      //this.CountrySetList1=this.CountrySetListDuplicate;
    }
  }
  ownerNationality2(value) {
    if (value == "ZS0003") {
      this.CountrySetList1 = this.CountrySetListDuplicate.filter(data => { return data.GccFlag == 'X' });

    }
    else if (value == "ZS0001" || value == "ZS0002") {
      $("#idWHOwnerValidation").modal("show");
      this.isWHManagerInfo = true;
      this.CountrySetList1 = this.CountrySetListDuplicate;
    }
  }
  ownerNationality3(value) {
    if (value == "ZS0003") {
      this.CountrySetList1 = this.CountrySetListDuplicate.filter(data => { return data.GccFlag == 'X' });

    }
    else if (value == "ZS0001" || value == "ZS0002") {
      this.isWHManagerInfo = true;
      this.CountrySetList1 = this.CountrySetListDuplicate;
    }
  }
  ownerNationality1(value) {
    if (value == "ZS0003") {
      this.CountrySet = this.CountrySetListDuplicate.filter(data => { return data.GccFlag == 'X' });
    }
    else if (value == "ZS0001" || value == "ZS0002") {
      $("#idWHOwnerValidation").modal("show");
      this.isWHOwnershipInfo = true;
      this.CountrySet = this.CountrySetListDuplicate;
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
          this.WarehouseIsIndividualOwnerShip.patchValue({
            idNumber: res["d"]["Idnum"]
          });
          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: undefined
          });
          $("#idWHOwnerValidation").modal("hide");
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
    }


    if (this.WarehouseManagerInformation.value.idType !== "ZS0003") {
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
        type: this.WarehouseManagerInformation.value.idType,
        idNumber: this.IdTypeOwnerShipFormgroup.value.Idnumber,
      };
      this.wareHousesService.getUserValidation(obj, currentdate).subscribe(
        (res) => {
          this.WarehouseManagerInformation.patchValue({
            idNumber: res["d"]["Idnum"]
          });
          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: undefined
          });
          $("#idWHOwnerValidation").modal("hide");
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
    }


    if (this.DeclarationFormGroup.value.idType !== "ZS0003") {
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
        type: this.DeclarationFormGroup.value.idType,
        idNumber: this.IdTypeOwnerShipFormgroup.value.Idnumber,
      };
      this.wareHousesService.getUserValidation(obj, currentdate).subscribe(
        (res) => {
          this.DeclarationFormGroup.patchValue({
            idNumber: res["d"]["Idnum"]
          });
          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: undefined
          });
          $("#idWHOwnerValidation").modal("hide");

        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );

        }
      );
    }
    // }

  }

  clearPopup() {
    this.IdTypeOwnerShipFormgroup.patchValue({
      Idnumber: '',
      Dob: undefined
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
  NumberAllow(event) {
    var rgx = /^[0-9]*$/;
    if (rgx.test(event.target.value)) {
      // this.idErr1 = true;
      return true;
    }
    else if (event.keyCode == 32) {
      this.idErr1 = true;
      return false;
    }
    else {
      this.idErr1 = true;
      return false;
    }
  }
  ownerIdNumber(value) {
    const IdType = this.WarehouseIsIndividualOwnerShip.value.idType;
    const currentDateFormat = this.CurrentDate.toISOString().slice(0, 10);
    const formatSplit = currentDateFormat.split("-");
    const todayDate = `${formatSplit[0]}${formatSplit[1]}${formatSplit[2]}`;
    setTimeout(() => {
      this.wareHousesService.getWHIDOwnerInfo(IdType, value, todayDate).subscribe(data => {
        if (data) {
          console.log('owner-id-no', data["d"]);
        }
      }, (error) => {
        console.log('err', error);
      });
    }, 500)
  }

  removeOwnerShipControls() {
    this.WarehouseOwnerShip.removeControl('ownerType');
    this.WarehouseOwnerShip.removeControl('validFrom');
    this.WarehouseIsCompanyOwnerShip.removeControl('leaseDate');
    this.WarehouseIsCompanyOwnerShip.removeControl('expiryDate');
  }

  removeOwnershipIsindividualControls() {
    this.WarehouseIsIndividualOwnerShip.removeControl('idType');
    this.WarehouseIsIndividualOwnerShip.removeControl('idNumber');
    this.WarehouseIsIndividualOwnerShip.removeControl('nationality');
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
      valid = this.CurrentDate.toISOString().slice(0, 19);
      this.WarehouseOwnerShipModel.ValidFrom = valid;
    }
    if (warehouseCompany.leaseDate !== undefined && warehouseCompany.leaseDate !== "") {
      leased = this.datePickerValue(warehouseCompany.leaseDate);
    } else {
      leased = this.CurrentDate.toISOString().slice(0, 19);
    }
    if (warehouseCompany.expiryDate !== undefined && warehouseCompany.expiryDate !== "") {
      expiry = this.datePickerValue(warehouseCompany.expiryDate);
    } else {
      expiry = this.CurrentDate.toISOString().slice(0, 19);
    }


    this.WarehouseOwnerShipModel.OwnerType = warehouseOwner.ownerType;
    this.WarehouseOwnerShipModel.IdType = warehouseIndividual.idType;
    this.WarehouseOwnerShipModel.IdNumber = warehouseIndividual.idNumber;
    this.WarehouseOwnerShipModel.Nationality = warehouseIndividual.nationality;
    this.WarehouseOwnerShipModel.PhoneNumber = warehouseIndividual.phoneNumber;
    this.WarehouseOwnerShipModel.EmailId = warehouseIndividual.emailId;
    this.WarehouseOwnerShipModel.CountryCode = warehouseCompany.countryCode;
    this.WarehouseOwnerShipModel.CRNo = warehouseCompany.crNo;
    this.WarehouseOwnerShipModel.Tin = warehouseCompany.tin;
    this.WarehouseOwnerShipModel.CompanyName = warehouseCompany.companyName;
    this.WarehouseOwnerShipModel.Address = warehouseCompany.address;
    this.WarehouseOwnerShipModel.Phone = warehouseCompany.phone;
    // this.WarehouseOwnerShipModel.LeaseDate = moment(leased).format("YYYY-MM-DD");
    this.WarehouseOwnerShipModel.LeaseDate = leased;
    this.WarehouseOwnerShipModel.ExpiryDate = expiry;
    // this.WarehouseOwnerShipModel.ExpiryDate = moment(expiry).format("YYYY-MM-DD");
    return this.WarehouseOwnerShipModel;
  }

  editStep3() {
    if (this.isCard == 'Yes') {
      this.WarehouseOwnerShip = new FormGroup({
        ownerType: new FormControl(this.WarehouseOwnerShipModel.OwnerType, [Validators.required]),
        validFrom: new FormControl(this.WarehouseOwnerShipModel.ValidFrom, [Validators.required]),
        leaseDate: new FormControl(this.WarehouseOwnerShipModel.LeaseDate),
        expiryDate: new FormControl(this.WarehouseOwnerShipModel.ExpiryDate)
      })
      if (this.isOwnerType == 'C') {
        this.WarehouseIsCompanyOwnerShip = new FormGroup({
          countryCode: new FormControl(this.WarehouseOwnerShipModel.CountryCode),
          crNo: new FormControl(this.WarehouseOwnerShipModel.CRNo),
          tin: new FormControl(this.WarehouseOwnerShipModel.Tin),
          companyName: new FormControl(this.WarehouseOwnerShipModel.CompanyName),
          address: new FormControl(this.WarehouseOwnerShipModel.Address),
          phone: new FormControl(this.WarehouseOwnerShipModel.Phone)
        });
        this.isCompany = true;
        this.isIndividual = false;
      } else {
        this.WarehouseIsIndividualOwnerShip = new FormGroup({
          idType: new FormControl(this.WarehouseOwnerShipModel.IdType, [Validators.required]),
          idNumber: new FormControl(this.WarehouseOwnerShipModel.IdNumber, [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.NumberPattern)]),
          nationality: new FormControl(this.WarehouseOwnerShipModel.Nationality),
          phoneNumber: new FormControl(this.WarehouseOwnerShipModel.PhoneNumber, [Validators.required, Validators.minLength(10), Validators.pattern(this.NumberPattern)]),
          emailId: new FormControl(this.WarehouseOwnerShipModel.EmailId, [Validators.required, Validators.pattern(this.EmailPattern)])
        })
        this.isCompany = false;
        this.isIndividual = true;
      }
    }
    this.Step = 3;
  }
  continueThirdScreen() {
    if (this.isNo == true) {
      const obj3 = this.warehouseOwnerShipData();
      console.log('owner', obj3);
    }
    this.step4();
  }
  /* Step - 3 Third Screen Info End */

  /* Step - 4 Fourth Screen Info Starts */
  warehouseDimensionsFormControls() {

  }
  step3ownership(val) {
    this.warehouseOwnerShipFormControls();
    this.isCard = val.Whlsf == 1 ? "Yes" : "No";
    if (this.isCard == 'Yes') {
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
    if (val.Lsfdt !== undefined && val.Lsfdt !== "" && val.Lsfdt !== null) {
      leased = val.Lsfdt;
    } else {
      leased = this.CurrentDate;
    }
    if (val.Lsedt !== undefined && val.Lsedt !== "" && val.Lsedt !== null) {
      expiry = val.Lsedt;
    } else {
      expiry = this.CurrentDate;
    }
    this.WarehouseOwnerShip.patchValue({
      ownerType: val.Whlsi,
      leasedWarehouse: val.Whlsf == "Yes" ? 1 : 0,
      leaseDate: leased,
      expiryDate: expiry
    });

    if (val.Whlsi == 'C') {
      this.warehouseownershipIsCompanyFormControls();

      this.isCompany = true;
      this.isIndividual = false;
      this.WarehouseIsCompanyOwnerShip.patchValue({
        crNo: val.WoCrNo,
        tin: val.WoTin,
        companyName: val.Compnm,
        address: val.WoAddress,
        phone: val.WH_CONTACT_DTLSet.results[1].TelNumber
      });

    } else {
      this.warehouseownershipIndividualFormControls();
      this.isCompany = false;
      this.isIndividual = true;
      this.WarehouseIsIndividualOwnerShip.patchValue({
        idType: val.WH_CONTACTPSet.results[1].Type,
        idNumber: val.WH_CONTACTPSet.results[1].Idnumber,
        nationality: val.WH_CONTACTPSet.results[1].Nationality,
        Nameoftheowner: val.WH_CONTACTPSet.results[1].Firstnm,
        phoneNumber: val.WH_CONTACT_DTLSet.results[1].MobNumber,
        emailId: val.WH_CONTACT_DTLSet.results[1].SmtpAddr
      });
    }
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (val.WH_CONTACTPSet.results[1].Type == this.oIdType1[i].Key) {
        this.OwnerIdTypeName = this.oIdType1[i].Text;
      }
    }
    if (this.isCard == 'Yes') {
      this.iswhOwnership = true;
    }
    else {
      this.isCompany = false;
      this.isIndividual = false;
      this.iswhOwnership = false;
    }
    this.WarehouseIsIndividualOwnerShip.patchValue({
      idType: val.WH_CONTACTPSet.results[1].Type,
      idNumber: val.WH_CONTACTPSet.results[1].Idnumber,
      nationality: val.WH_CONTACTPSet.results[1].Nationality,
      Nameoftheowner: val.WH_CONTACTPSet.results[1].Firstnm,
      phoneNumber: val.WH_CONTACT_DTLSet.results[1].MobNumber,
      emailId: val.WH_CONTACT_DTLSet.results[1].SmtpAddr
    });
    this.WarehouseOwnershipMethod(val);
  }
  WarehouseOwnershipMethod(val) {
    this.isCard = val.Whlsf == 1 ? "Yes" : "No";
    if (this.isCard == 'Yes') {
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
    moment.locale('en-Us');
    if (val.Lsfdt !== undefined && val.Lsfdt !== "" && val.Lsfdt !== null) {
      if (val.Lsfdt.includes('/Date')) {

        leased = moment(new Date(+(((val.Lsfdt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
        this.WarehouseManagerInfoModel.DateOfHiring = leased;
        if (this.Language === 'E') {
          leased = this.commonValidation.toJulianDate1(new Date(leased));
        }
        else {
          leased = this.commonValidation.toJulianDate1(new Date(leased));
          leased = (this.commonValidation.dateFormate(leased, "Islamic"))
        }
      }
      else {
        leased = this.datePickerValue(val.Lsfdt);
      }
    } else {
      leased = this.CurrentDate.toISOString().slice(0, 19);

    }
    if (val.Lsedt !== undefined && val.Lsedt !== "" && val.Lsedt !== null) {
      if (val.Lsedt.includes('/Date')) {

        expiry = moment(new Date(+(((val.Lsedt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
        this.WarehouseManagerInfoModel.DateOfHiring = expiry;
        if (this.Language === 'E') {
          expiry = this.commonValidation.toJulianDate1(new Date(expiry));
        }
        else {
          expiry = this.commonValidation.toJulianDate1(new Date(expiry));
          expiry = (this.commonValidation.dateFormate(expiry, "Islamic"))
        }
      }
      else {
        expiry = this.datePickerValue(val.Lsedt);
      }
    } else {
      expiry = this.CurrentDate.toISOString().slice(0, 19);

    }
    this.WarehouseOwnerShip.patchValue({
      ownerType: val.Whlsi,
      leasedWarehouse: val.Whlsf == "Yes" ? 1 : 0,
      leaseDate: leased,
      expiryDate: expiry
    });

    if (val.Whlsi == 'C') {
      this.isCompany = true;
      this.isIndividual = false;
      this.WarehouseIsCompanyOwnerShip.patchValue({
        crNo: val.WoCrNo,
        tin: val.WoTin,
        companyName: val.Compnm,
        address: val.WoAddress,
        phone: val.WH_CONTACT_DTLSet.results[1].TelNumber
      });
      this.ownerIdCRNumber(val.WoCrNo);
    } else {
      this.isCompany = false;
      this.isIndividual = true;
      this.WarehouseIsIndividualOwnerShip.patchValue({
        idType: val.WH_CONTACTPSet.results[1].Type,
        idNumber: val.WH_CONTACTPSet.results[1].Idnumber,
        nationality: val.WH_CONTACTPSet.results[1].Nationality,
        Nameoftheowner: val.WH_CONTACTPSet.results[1].Firstnm,
        phoneNumber: val.WH_CONTACT_DTLSet.results[1].MobNumber,
        emailId: val.WH_CONTACT_DTLSet.results[1].SmtpAddr
      });
    }
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (val.WH_CONTACTPSet.results[1].Type == this.oIdType1[i].Key) {
        this.OwnerIdTypeName = this.oIdType1[i].Text;
      }
    }
    if (this.isCard == 'Yes') {
      this.iswhOwnership = true;
    }
    else {
      this.isCompany = false;
      this.isIndividual = false;
      this.iswhOwnership = false;
    }
  }
  warehouseManagerInfo1() {
    let hiring;
    moment.locale('en-Us');
    if (this.WareHouseDetails.WH_CONTACTPSet.results[0].HiringDt !== undefined && this.WareHouseDetails.WH_CONTACTPSet.results[0].HiringDt !== "" && this.WareHouseDetails.WH_CONTACTPSet.results[0].HiringDt !== null) {
      if (this.WareHouseDetails.WH_CONTACTPSet.results[0].HiringDt.includes('/Date')) {

        hiring = moment(new Date(+(((this.WareHouseDetails.WH_CONTACTPSet.results[0].HiringDt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
        this.WarehouseManagerInfoModel.DateOfHiring = hiring;
        // hiring = new Date(+this.WareHouseDetails.WH_CONTACTPSet.results[0].HiringDt.substr(6, 13)).toISOString().slice(0, 19);
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
        hiring = this.datePickerValue(this.WareHouseDetails.WH_CONTACTPSet.results[0].HiringDt);
        this.WarehouseManagerInfoModel.DateOfHiring = hiring;
      }
    } else {
      hiring = undefined;
      this.WarehouseManagerInfoModel.DateOfHiring = '';
    }


    this.WarehouseManagerInformation.patchValue({
      ValidFrom: this.WareHouseDetails.ChgWhMiDt,
      idType: this.WareHouseDetails.WH_CONTACTPSet.results[0].Type,
      idNumber: this.WareHouseDetails.WH_CONTACTPSet.results[0].Idnumber,
      nationality: this.WareHouseDetails.WH_CONTACTPSet.results[0].Nationality,
      dateOfHiring: hiring,
      title: this.WareHouseDetails.WH_CONTACTPSet.results[0].Title,
      name: this.WareHouseDetails.WH_CONTACTPSet.results[0].Firstnm,
      surname: this.WareHouseDetails.WH_CONTACTPSet.results[0].Lastnm,
      middlename: this.WareHouseDetails.WH_CONTACTPSet.results[0].Initials,
      fatherName: this.WareHouseDetails.WH_CONTACTPSet.results[0].Fathernm,
      grandFatherName: this.WareHouseDetails.WH_CONTACTPSet.results[0].Grandfathernm,
      phoneNumber: this.WareHouseDetails.WH_CONTACT_DTLSet.results[0].MobNumber,
      emailId: this.WareHouseDetails.WH_CONTACT_DTLSet.results[0].SmtpAddr
    });
  }
  warehouseManagerInfoData() {
    const warehouseManagerInfo = this.WarehouseManagerInformation.value;
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
    this.WarehouseManagerInfoModel.NameSurname = warehouseManagerInfo.name;
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
      });
    }, 500)
  }
  step4dimensions(val) {
    this.WarehouseDimensions.patchValue({
      length: val.WH_ADDRESSSet.results[0].LenSiz,
      width: val.WH_ADDRESSSet.results[0].LenSiz,
      height: val.WH_ADDRESSSet.results[0].HeiSiz,
      cubicMeters: val.WH_ADDRESSSet.results[0].SquarSc,
      squareMeters: val.WH_ADDRESSSet.results[0].CubicSc
    });
    this.warehouseDimensionsData();
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

  editStep4() {
    this.WarehouseDimensions = new FormGroup({
      length: new FormControl(this.WarehouseDimensionsModel.Length, [Validators.pattern(this.DecimalPointTwoPattern)]),
      width: new FormControl(this.WarehouseDimensionsModel.Width, [Validators.pattern(this.DecimalPointTwoPattern)]),
      height: new FormControl(this.WarehouseDimensionsModel.Height, [Validators.pattern(this.DecimalPointTwoPattern)]),
      cubicMeters: new FormControl(this.WarehouseDimensionsModel.CubicMeters, [Validators.pattern(this.DecimalPointTwoPattern)]),
      squareMeters: new FormControl(this.WarehouseDimensionsModel.SquareMeters, [Validators.pattern(this.DecimalPointTwoPattern)]),
    });
    this.Step = 4;
  }

  continueFourthScreen() {
    const obj4 = this.warehouseDimensionsData();
    console.log('dimension', obj4);
    // this.removeDimensionsFormControls();
    this.step5();
  }
  /* Step - 4 Fourth Screen Info End */

  /* Step - 5 Fifth Screen Info Starts */
  warehouseManagerInfoFormControls() {

  }

  manageridTypeChange(val) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (val == this.oIdType1[i].Key) {
        this.ManagerIdTypeName = this.oIdType1[i].Text;
      }
    }
  }

  managerIdNumberChange(value) {
    const IdType = this.WarehouseManagerInformation.value.idType;
    const currentDateFormat = this.CurrentDate.toISOString().slice(0, 10);
    const formatSplit = currentDateFormat.split("-");
    const todayDate = `${formatSplit[0]}${formatSplit[1]}${formatSplit[2]}`;
    setTimeout(() => {
      this.wareHousesService.getWHIDManagerInfo(IdType, value, todayDate).subscribe(data => {
        if (data) {
          console.log('owner-id-no', data["d"]);
        }
      }, (error) => {
        console.log('err', error);
      });
    }, 500)
  }

  managerNationality(value) {
    for (let i = 0; i < this.CountrySetList1.length; i++) {
      if (value == this.CountrySetList1[i].Land1) {
        this.ManagerNationalityName = this.CountrySetList1[i].Natio50;
      }
    }
  }

  managerTitle(value) {
    for (let i = 0; i < this.TitleSet.length; i++) {
      if (value == this.TitleSet[i].Title) {
        this.ManagerTitleName = this.TitleSet[i].TitleMedi;
      }
    }
  }

  // warehouseManagerInfoData() {
  //   const warehouseManagerInfo = this.WarehouseManagerInformation.value;
  //   let hiring;
  //   hiring = warehouseManagerInfo.dateOfHiring !== undefined && warehouseManagerInfo.dateOfHiring !== null && warehouseManagerInfo.dateOfHiring !== "" ? this.datePickerValue(warehouseManagerInfo.dateOfHiring) : this.CurrentDate.toISOString().slice(0, 19);
  //   console.log('hiring', hiring);
  //   this.WarehouseManagerInfoModel.IdType = warehouseManagerInfo.idType;
  //   this.WarehouseManagerInfoModel.IdNumber = warehouseManagerInfo.idNumber;
  //   this.WarehouseManagerInfoModel.Nationality = warehouseManagerInfo.nationality;
  //   this.WarehouseManagerInfoModel.DateOfHiring = hiring;
  //   this.WarehouseManagerInfoModel.Title = warehouseManagerInfo.title;
  //   this.WarehouseManagerInfoModel.NameSurname = warehouseManagerInfo.nameSurname;
  //   this.WarehouseManagerInfoModel.FatherName = warehouseManagerInfo.fatherName;
  //   this.WarehouseManagerInfoModel.GrandFatherName = warehouseManagerInfo.grandFatherName;
  //   this.WarehouseManagerInfoModel.CountryCode = warehouseManagerInfo.countryCode;
  //   this.WarehouseManagerInfoModel.PhoneNumber = warehouseManagerInfo.phoneNumber;
  //   this.WarehouseManagerInfoModel.EmailId = warehouseManagerInfo.emailId;
  //   console.log('date', this.WarehouseManagerInfoModel.DateOfHiring);
  //   return this.WarehouseManagerInfoModel;
  // }

  editStep5() {
    // this.WarehouseManagerInformation = new FormGroup({
    //   idType: new FormControl(this.WarehouseManagerInfoModel.IdType, [Validators.required]),
    //   idNumber: new FormControl(this.WarehouseManagerInfoModel.IdNumber, [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.NumberPattern)]),
    //   nationality: new FormControl(this.WarehouseManagerInfoModel.Nationality),
    //   dateOfHiring: new FormControl(this.WarehouseManagerInfoModel.DateOfHiring || undefined),
    //   title: new FormControl(this.WarehouseManagerInfoModel.Title),
    //   nameSurname: new FormControl(this.WarehouseManagerInfoModel.NameSurname),
    //   fatherName: new FormControl(this.WarehouseManagerInfoModel.FatherName),
    //   grandFatherName: new FormControl(this.WarehouseManagerInfoModel.GrandFatherName),
    //   countryCode: new FormControl(this.WarehouseManagerInfoModel.CountryCode),
    //   phoneNumber: new FormControl(this.WarehouseManagerInfoModel.PhoneNumber, [Validators.required, Validators.minLength(10), Validators.pattern(this.NumberPattern)]),
    //   emailId: new FormControl(this.WarehouseManagerInfoModel.EmailId, [Validators.required, Validators.pattern(this.EmailPattern)]),
    // });
    this.Step = 5;
  }

  continueFifthScreen() {

    const obj5 = this.warehouseManagerInfoData();
    console.log('manager-info', this.WarehouseManagerInformation);
    // this.removeManagerInfoFormControls();
    this.step6();
  }
  /* Step - 5 Fifth Screen Info Ends */

  tobaccoSelected: any;
  enDrinksSelected: any;
  soDrinksSelected: any;
  swBavSelected: any;

  /* Step - 6 Sixth Screen Info Starts */
  // warehouseBankInfoFormControls() {

  //   let goodsType;

  //   for (let i = 0; i < this.RetailSet.length; i++) {
  //     for (let j = 0; j < this.TaxGoodType.length; j++) {
  //       if (this.TaxGoodType[j].Key == this.RetailSet[i].Gddtl) {
  //         goodsType = this.RetailSet[i].Gddtl;
  //       }
  //     }
  //   }

  // }



  formArr(): FormArray {
    return this.BankGuaranteeInformation.get("Rows") as FormArray;
  }

  rspTotal(index) {
    let productType;
    const control = this.BankGuaranteeInformation.get("Rows") as FormArray;
    console.log("rows", control);
    for (let j = 0; j < control.controls.length; j++) {
      productType = control.controls[j].value.energyDrinks;
      for (let k = 0; k < this.TaxRateSet.length; k++) {
        if (control.controls[j].value.energyDrinks == this.TaxRateSet[k].GoodsNo) {
          let amount = 0;
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
      quantity: this.formBuilder.control(quantity || "0", [Validators.required, Validators.pattern(this.NumberPattern)]),
      unitofMeasure: this.formBuilder.control(unitofMeasure, [Validators.required]),
      totalRspValue: this.formBuilder.control(totalRspValue || "0.00", [Validators.required, Validators.pattern(this.DecimalPointPattern)]),
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
      quantity: this.formBuilder.control(quantity, [Validators.required, Validators.pattern(this.NumberPattern), Validators.maxLength(25)]),
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
    this.BankInfoModel.InitialBankGuaranteeValue = warehouseBank.initialBankGuaranteeValue !== "" && warehouseBank.initialBankGuaranteeValue !== null && warehouseBank.initialBankGuaranteeValue !== undefined ? warehouseBank.initialBankGuaranteeValue : "0.00";
    return this.BankInfoModel;
  }
  editStep6() {
    this.warehouseBankInfo();
    this.Step = 6;
  }

  continueSixthScreen() {
    const obj6 = this.warehouseBankData();
    this.WareHouseDetails.WH_GOODSDTLSet.results = [];
    const control = this.BankGuaranteeInformation.get("Rows") as FormArray;
    for (let j = 0; j < control.controls.length; j++) {
      this.WareHouseDetails.WH_GOODSDTLSet.results.push({
        Gdtyp: control.controls[j].value.energyDrinks,
        Gddtl: control.controls[j].value.movedgoods,
        Bgqt: control.controls[j].value.quantity,
        Bguom: control.controls[j].value.unitofMeasure,
        Bgrsp: control.controls[j].value.totalRspValue
      });
    }
    this.step7();
  }
  /* Step - 6 Sixth Screen Info Ends */

  /* Step - 7 Seventh Screen Info Starts */
  valid: boolean = false;
  card1(val) {
    this.isCard1 = val;
    if (val == 'No') {
      this.isTextarea1 = true;
      this.isUpload1 = true;
      this.textAreaFormControls1();
      this.valid = true;
    } else {
      this.isTextarea1 = false;
      this.isUpload1 = true;
      this.valid = false;
      // this.removeTextAreaFormControls1();
    }
  }

  checkValidity1() {
    if (this.TextAreaForm1.get('textarea1').value.length > 0 && this.UploadFiles1.length > 0) {
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  card2(val) {
    this.isCard2 = val;
    if (val == 'No') {
      this.isTextarea2 = true;
      this.isUpload2 = true;
      this.textAreaFormControls2();
      this.valid = true;
    } else {
      this.isTextarea2 = false;
      this.isUpload2 = true;
      this.valid = false;
      // this.removeTextAreaFormControls2();
    }
  }

  checkValidity2() {
    if (this.TextAreaForm2.get('textarea2').value.length > 0 && this.UploadFiles2.length > 0) {
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  card3(val) {
    this.isCard3 = val;
    if (val == 'No') {
      this.isTextarea3 = true;
      this.isUpload3 = true;
      this.textAreaFormControls3();
      this.valid = true;
    } else {
      this.isTextarea3 = false;
      this.isUpload3 = true;
      this.valid = false;
      // this.removeTextAreaFormControls3();
    }
  }

  checkValidity3() {
    if (this.TextAreaForm3.get('textarea3').value.length > 0 && this.UploadFiles3.length > 0) {
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  card4(val) {
    this.isCard4 = val;
    if (val == 'No') {
      this.isTextarea4 = true;
      this.isUpload4 = true;
      this.textAreaFormControls4();
      this.valid = true;
    } else {
      this.isTextarea4 = false;
      this.isUpload4 = true;
      this.valid = false;
      // this.removeTextAreaFormControls4();
    }
  }

  checkValidity4() {
    if (this.TextAreaForm4.get('textarea4').value.length > 0 && this.UploadFiles4.length > 0) {
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  textAreaFormControls1() {
    this.TextAreaForm1 = new FormGroup({
      textarea1: new FormControl(''),
    })
  }

  textAreaFormControls2() {
    this.TextAreaForm2 = new FormGroup({
      textarea2: new FormControl(''),
    })
  }

  textAreaFormControls3() {
    this.TextAreaForm3 = new FormGroup({
      textarea3: new FormControl(''),
    })
  }

  textAreaFormControls4() {
    this.TextAreaForm4 = new FormGroup({
      textarea4: new FormControl(''),
    })
  }
  downloadownershipattach(Doguid, Dotyp, filename) {
    this.wareHousesService.downloadAttachments(Doguid, Dotyp).subscribe((data: any) => {

      FileSaver.saveAs(data, filename);

    }, (error) => {
      console.log('err-2', error);
    });
  }
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

  warehouseAdditionalData() {
    const warehouseText1 = this.TextAreaForm1.value;
    const warehouseText2 = this.TextAreaForm2.value;
    const warehouseText3 = this.TextAreaForm3.value;
    const warehouseText4 = this.TextAreaForm4.value;
    this.AdditionalInfoModel.TextArea1 = warehouseText1.textarea1;
    this.AdditionalInfoModel.TextArea2 = warehouseText2.textarea2;
    this.AdditionalInfoModel.TextArea3 = warehouseText3.textarea3;
    this.AdditionalInfoModel.TextArea4 = warehouseText4.textarea4;
    return this.AdditionalInfoModel;
  }
  AcknowledgementMethod() {
    let fnumb = '0' + this.WareHouseDetails.Fbnumz;
    this.wareHousesService.acknowledgementform(fnumb).subscribe((data: any) => {

      FileSaver.saveAs(data, this.WareHouseDetails.Fbnumz + ".pdf");

    }, (error) => {

    });
  }
  DownloadFormMethod() {
    let fnumb = '0' + this.WareHouseDetails.Fbnumz;
    this.wareHousesService.downloadfilledform(fnumb).subscribe((data: any) => {

      FileSaver.saveAs(data, "DownloadForm.pdf");

    }, (error) => {

    });
  }
  step13() {
    this.Step = 13;
  }
  editStep7() {
    if (this.isTextarea1 == true) {
      this.TextAreaForm1 = new FormGroup({
        textarea1: new FormControl(this.AdditionalInfoModel.TextArea1),
      });
    }
    if (this.isTextarea2 == true) {
      this.TextAreaForm2 = new FormGroup({
        textarea2: new FormControl(this.AdditionalInfoModel.TextArea2),
      });
    }
    if (this.isTextarea3 == true) {
      this.TextAreaForm3 = new FormGroup({
        textarea3: new FormControl(this.AdditionalInfoModel.TextArea3),
      });
    }
    if (this.isTextarea4 == true) {
      this.TextAreaForm4 = new FormGroup({
        textarea4: new FormControl(this.AdditionalInfoModel.TextArea4),
      });
    }
    this.Step = 7;
  }

  continueSeventhScreen() {
    const obj7 = this.warehouseAdditionalData();
    console.log('additional', obj7);
    this.step8();
  }
  /* Step - 7 Seventh Screen Info Ends */

  /* Step - 8 Eight Screen Info Starts */
  warehouseDeclarationFormControls() {
  }

  warehouseDeclarationData() {
    const warehouseDeclaration = this.DeclarationFormGroup.value;
    this.DeclarationInfoModel.IdType = warehouseDeclaration.idType;
    this.DeclarationInfoModel.IdNumber = warehouseDeclaration.idNumber;
    this.DeclarationInfoModel.Name = warehouseDeclaration.name;
    this.DeclarationInfoModel.Designation = warehouseDeclaration.designation;
    this.DeclarationInfoModel.Agree = warehouseDeclaration.agree;
    this.DeclarationInfoModel.Date = warehouseDeclaration.date;
    return this.DeclarationInfoModel;
  }

  declarationIdNumberChange(value) {
    const IdType = this.DeclarationFormGroup.value.idType;
    const currentDateFormat = this.CurrentDate.toISOString().slice(0, 10);
    const formatSplit = currentDateFormat.split("-");
    const todayDate = `${formatSplit[0]}${formatSplit[1]}${formatSplit[2]}`;
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
  }

  editStep8() {
    // this.DeclarationFormGroup = new FormGroup({
    //   name: new FormControl(this.DeclarationInfoModel.Name, [Validators.required, Validators.pattern(this.StringPattern)]),
    //   designation: new FormControl(this.DeclarationInfoModel.Designation, [Validators.required, Validators.maxLength(20), Validators.pattern(this.StringPattern)]),
    //   idType: new FormControl(this.DeclarationInfoModel.IdType, [Validators.required]),
    //   idNumber: new FormControl(this.DeclarationInfoModel.IdNumber, [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.NumberPattern)]),
    //   agree: new FormControl(this.DeclarationInfoModel.Agree, [Validators.required])
    // });
    this.Step = 8;
  }

  continueEightScreen() {
    const obj8 = this.warehouseDeclarationData();
    console.log('wh-dclaration', obj8);
    // this.removewarehouseDeclarationFormControls();
    this.step9();
  }
  /* Step - 8 Eight Screen Info Ends */
  SaveDraft1() {
    this.warehouseInfoData();
    for (let j = 0; j < this.ProductSet.length; j++) {
      for (let k = 0; k < this.WareHouseDetails.WH_EREGGOODSSet.results.length; k++) {
        if (this.ProductSet[j].GoodsTyp == this.WareHouseDetails.WH_EREGGOODSSet.results[k].GoodsTyp) {
          this.WareHouseDetails.WH_EREGGOODSSet.results[j].Flag = (this.ProductSet[j].flag == true) ? "X" : "";
          this.WareHouseDetails.WH_EREGGOODSSet.results[j].GoodsTyp = this.ProductSet[j].GoodsTyp;
        }
      }

    }
    this.WareHouseDetails.WH_GOODSDTLSet.results = [];
    const control = this.BankGuaranteeInformation.get("Rows") as FormArray;
    for (let j = 0; j < control.controls.length; j++) {
      this.WareHouseDetails.WH_GOODSDTLSet.results.push({
        Gdtyp: control.controls[j].value.energyDrinks,
        Gddtl: control.controls[j].value.movedgoods,
        Bgqt: control.controls[j].value.quantity || "0.00",
        Bguom: control.controls[j].value.unitofMeasure,
        Bgrsp: control.controls[j].value.totalRspValue || "0.00",
        Inqt: "0.00",
        Inrsp: "0.00",
      });
    }
    //this.WareHouseDetails.Bgqt="0.00";
    const agree1 = this.agreeBooleanValueCheck(this.WarehouseInfoModel.Agreeflg);
    this.WareHouseDetails.Purpose = this.WarehouseInfoModel.SelectWarehouse;
    // this.WareHouseDetails.Fin = this.WareHouseDetails.Fin;
    // this.WareHouseDetails.Bussiness = this.WareHouseDetails.Bunm;
    this.WareHouseDetails.Stgfg = agree1;
    this.WareHouseDetails.Operationz = '05';
    this.wareHousesService.saveWHDetails(this.WareHouseDetails).subscribe(data => {
      if (data) {
        console.log('step1 Info-save', data["d"]);
      }
    }, (error) => {
      console.log('err-3', error);
    });
  }
  /*Identification*/
  SaveDraft2() {
    this.warehouseInfoData();
    const agree1 = this.agreeBooleanValueCheck(this.WarehouseInfoModel.Agreeflg);
    this.WareHouseDetails.Purpose = this.purposeValue;
    // this.WareHouseDetails.Fin = this.WareHouseDetails.Fin;
    // this.WareHouseDetails.Bussiness = this.WareHouseDetails.Bunm;
    this.WareHouseDetails.Stgfg = agree1;
    this.warehouseIdentificationData();
    this.WareHouseDetails.Whfnm = this.WarehouseIdentificationModel.WarehouseName;
    const Identity1 = this.WarehouseIdentication.value;
    //this.WareHouseDetails.WH_ADDRESSSet["results"][0].Addrnumber = this.WarehouseIdentificationModel.Address;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Latitude = this.WarehouseIdentificationModel.Latitude;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Longitude = this.WarehouseIdentificationModel.Longitude;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].BuildingNo = Identity1.BuildingNo;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Street = Identity1.StreetName;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Region = Identity1.RegionDistrict;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].City = Identity1.City;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].PostalCd = Identity1.PostalCode;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Addrnumber = Identity1.Addrnumber;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Quarter = Identity1.Quarter;
    this.WareHouseDetails.Operationz = '05';
    this.wareHousesService.saveWHDetails(this.WareHouseDetails).subscribe(data => {
      if (data) {
        console.log('Identification Info-save', data["d"]);
      }
    }, (error) => {
      console.log('err-3', error);
    });
  }
  /*Ownership*/
  SaveDraft3() {
    this.warehouseInfoData();
    const agree1 = this.agreeBooleanValueCheck(this.WarehouseInfoModel.Agreeflg);
    this.WareHouseDetails.Purpose = this.purposeValue;
    // this.WareHouseDetails.Fin = this.WareHouseDetails.Fin;
    // this.WareHouseDetails.Bussiness = this.WareHouseDetails.Bunm;
    this.WareHouseDetails.Stgfg = agree1;
    this.warehouseIdentificationData();
    this.WareHouseDetails.Whfnm = this.WarehouseIdentificationModel.WarehouseName;
    const Identity1 = this.WarehouseIdentication.value;
    //this.WareHouseDetails.WH_ADDRESSSet["results"][0].Addrnumber = this.WarehouseIdentificationModel.Address;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Latitude = this.WarehouseIdentificationModel.Latitude;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Longitude = this.WarehouseIdentificationModel.Longitude;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].BuildingNo = Identity1.BuildingNo;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Street = Identity1.StreetName;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Region = Identity1.RegionDistrict;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].City = Identity1.City;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].PostalCd = Identity1.PostalCode;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Addrnumber = Identity1.Addrnumber;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Quarter = Identity1.Quarter;
    const obj3 = this.warehouseOwnerShipData();
    const warehouseLeasedValue = this.cardValue(this.isCard);
    this.WareHouseDetails.Whlsf = warehouseLeasedValue;
    this.WareHouseDetails.Whlsi = this.WarehouseOwnerShipModel.OwnerType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Type = this.WarehouseOwnerShipModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Idnumber = this.WarehouseOwnerShipModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Nationality = this.WarehouseOwnerShipModel.Nationality;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].SmtpAddr = this.WarehouseOwnerShipModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].MobNumber = this.WarehouseOwnerShipModel.PhoneNumber;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].TelNumber = this.WarehouseOwnerShipModel.Phone;
    this.WareHouseDetails.WoCrNo = this.WarehouseOwnerShipModel.CRNo;
    this.WareHouseDetails.WoTin = this.WarehouseOwnerShipModel.Tin;
    this.WareHouseDetails.Compnm = this.WarehouseOwnerShipModel.CompanyName;
    this.WareHouseDetails.WoAddress = this.WarehouseOwnerShipModel.Address;
    this.WareHouseDetails.Lsfdt = this.WarehouseOwnerShipModel.LeaseDate;
    this.WareHouseDetails.Lsedt = this.WarehouseOwnerShipModel.ExpiryDate;
    this.WareHouseDetails.Operationz = '05';
    this.wareHousesService.saveWHDetails(this.WareHouseDetails).subscribe(data => {
      if (data) {
        console.log('Ownership Info-save', data["d"]);
      }
    }, (error) => {
      console.log('err-3', error);
    });
  }
  /*Dimensions*/
  SaveDraft4() {
    this.warehouseInfoData();
    const agree1 = this.agreeBooleanValueCheck(this.WarehouseInfoModel.Agreeflg);
    this.WareHouseDetails.Purpose = this.purposeValue;
    // this.WareHouseDetails.Fin = this.WareHouseDetails.Fin;
    // this.WareHouseDetails.Bussiness = this.WareHouseDetails.Bunm;
    this.WareHouseDetails.Stgfg = agree1;
    this.warehouseIdentificationData();
    this.WareHouseDetails.Whfnm = this.WarehouseIdentificationModel.WarehouseName;
    const Identity1 = this.WarehouseIdentication.value;
    //this.WareHouseDetails.WH_ADDRESSSet["results"][0].Addrnumber = this.WarehouseIdentificationModel.Address;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Latitude = this.WarehouseIdentificationModel.Latitude;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Longitude = this.WarehouseIdentificationModel.Longitude;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].BuildingNo = Identity1.BuildingNo;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Street = Identity1.StreetName;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Region = Identity1.RegionDistrict;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].City = Identity1.City;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].PostalCd = Identity1.PostalCode;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Addrnumber = Identity1.Addrnumber;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Quarter = Identity1.Quarter;
    const obj3 = this.warehouseOwnerShipData();
    const warehouseLeasedValue = this.cardValue(this.isCard);
    this.WareHouseDetails.Whlsf = warehouseLeasedValue;
    this.WareHouseDetails.Whlsi = this.WarehouseOwnerShipModel.OwnerType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Type = this.WarehouseOwnerShipModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Idnumber = this.WarehouseOwnerShipModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Nationality = this.WarehouseOwnerShipModel.Nationality;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].SmtpAddr = this.WarehouseOwnerShipModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].MobNumber = this.WarehouseOwnerShipModel.PhoneNumber;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].TelNumber = this.WarehouseOwnerShipModel.Phone;
    this.WareHouseDetails.WoCrNo = this.WarehouseOwnerShipModel.CRNo;
    this.WareHouseDetails.WoTin = this.WarehouseOwnerShipModel.Tin;
    this.WareHouseDetails.Compnm = this.WarehouseOwnerShipModel.CompanyName;
    this.WareHouseDetails.WoAddress = this.WarehouseOwnerShipModel.Address;
    this.WareHouseDetails.Lsfdt = this.WarehouseOwnerShipModel.LeaseDate;
    this.WareHouseDetails.Lsedt = this.WarehouseOwnerShipModel.ExpiryDate;
    const obj4 = this.warehouseDimensionsData();
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].LenSiz = this.WarehouseDimensionsModel.Length;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].WidSiz = this.WarehouseDimensionsModel.Width;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].HeiSiz = this.WarehouseDimensionsModel.Height;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].CubicSc = this.WarehouseDimensionsModel.CubicMeters;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].SquarSc = this.WarehouseDimensionsModel.SquareMeters;
    this.WareHouseDetails.Operationz = '05';
    this.wareHousesService.saveWHDetails(this.WareHouseDetails).subscribe(data => {
      if (data) {
        console.log('Dimensions Info-save', data["d"]);
      }
    }, (error) => {
      console.log('err-3', error);
    });
  }
  /*Manager Info*/
  SaveDraft5() {
    this.warehouseInfoData();
    const agree1 = this.agreeBooleanValueCheck(this.WarehouseInfoModel.Agreeflg);
    this.WareHouseDetails.Purpose = this.purposeValue;
    // this.WareHouseDetails.Fin = this.WareHouseDetails.Fin;
    // this.WareHouseDetails.Bussiness = this.WareHouseDetails.Bunm;
    this.WareHouseDetails.Stgfg = agree1;
    this.warehouseIdentificationData();
    this.WareHouseDetails.Whfnm = this.WarehouseIdentificationModel.WarehouseName;
    const Identity1 = this.WarehouseIdentication.value;
    //this.WareHouseDetails.WH_ADDRESSSet["results"][0].Addrnumber = this.WarehouseIdentificationModel.Address;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Latitude = this.WarehouseIdentificationModel.Latitude;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Longitude = this.WarehouseIdentificationModel.Longitude;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].BuildingNo = Identity1.BuildingNo;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Street = Identity1.StreetName;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Region = Identity1.RegionDistrict;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].City = Identity1.City;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].PostalCd = Identity1.PostalCode;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Addrnumber = Identity1.Addrnumber;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Quarter = Identity1.Quarter;
    const obj3 = this.warehouseOwnerShipData();
    const warehouseLeasedValue = this.cardValue(this.isCard);
    this.WareHouseDetails.Whlsf = warehouseLeasedValue;
    this.WareHouseDetails.Whlsi = this.WarehouseOwnerShipModel.OwnerType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Type = this.WarehouseOwnerShipModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Idnumber = this.WarehouseOwnerShipModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Nationality = this.WarehouseOwnerShipModel.Nationality;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].SmtpAddr = this.WarehouseOwnerShipModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].MobNumber = this.WarehouseOwnerShipModel.PhoneNumber;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].TelNumber = this.WarehouseOwnerShipModel.Phone;
    this.WareHouseDetails.WoCrNo = this.WarehouseOwnerShipModel.CRNo;
    this.WareHouseDetails.WoTin = this.WarehouseOwnerShipModel.Tin;
    this.WareHouseDetails.Compnm = this.WarehouseOwnerShipModel.CompanyName;
    this.WareHouseDetails.WoAddress = this.WarehouseOwnerShipModel.Address;
    this.WareHouseDetails.Lsfdt = this.WarehouseOwnerShipModel.LeaseDate;
    this.WareHouseDetails.Lsedt = this.WarehouseOwnerShipModel.ExpiryDate;
    const obj4 = this.warehouseDimensionsData();
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].LenSiz = this.WarehouseDimensionsModel.Length;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].WidSiz = this.WarehouseDimensionsModel.Width;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].HeiSiz = this.WarehouseDimensionsModel.Height;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].CubicSc = this.WarehouseDimensionsModel.CubicMeters;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].SquarSc = this.WarehouseDimensionsModel.SquareMeters;
    const ManagerInfo1 = this.WarehouseManagerInformation.value;
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
    const obj5 = this.warehouseManagerInfoData();
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Type = this.WarehouseManagerInfoModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Idnumber = this.WarehouseManagerInfoModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Nationality = this.WarehouseManagerInfoModel.Nationality;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt = Hiring;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Title = this.WarehouseManagerInfoModel.Title;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Firstnm = this.WarehouseManagerInfoModel.FirstName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Lastnm = this.WarehouseManagerInfoModel.SurName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Initials = this.WarehouseManagerInfoModel.MiddleName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Fathernm = this.WarehouseManagerInfoModel.FatherName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Grandfathernm = this.WarehouseManagerInfoModel.GrandFatherName;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][0].SmtpAddr = this.WarehouseManagerInfoModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][0].MobNumber = this.WarehouseManagerInfoModel.PhoneNumber;
    this.WareHouseDetails.Operationz = '05';
    this.wareHousesService.saveWHDetails(this.WareHouseDetails).subscribe(data => {
      if (data) {
        console.log('Manager Info-save', data["d"]);
      }
    }, (error) => {
      console.log('err-3', error);
    });

  }
  /*Bank gurantee */
  SaveDraft6() {
    this.warehouseInfoData();
    const agree1 = this.agreeBooleanValueCheck(this.WarehouseInfoModel.Agreeflg);
    this.WareHouseDetails.Purpose = this.purposeValue;
    // this.WareHouseDetails.Fin = this.WareHouseDetails.Fin;
    // this.WareHouseDetails.Bussiness = this.WareHouseDetails.Bunm;
    this.WareHouseDetails.Stgfg = agree1;
    this.warehouseIdentificationData();
    this.WareHouseDetails.Whfnm = this.WarehouseIdentificationModel.WarehouseName;
    const Identity1 = this.WarehouseIdentication.value;
    //this.WareHouseDetails.WH_ADDRESSSet["results"][0].Addrnumber = this.WarehouseIdentificationModel.Address;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Latitude = this.WarehouseIdentificationModel.Latitude;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Longitude = this.WarehouseIdentificationModel.Longitude;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].BuildingNo = Identity1.BuildingNo;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Street = Identity1.StreetName;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Region = Identity1.RegionDistrict;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].City = Identity1.City;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].PostalCd = Identity1.PostalCode;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Addrnumber = Identity1.Addrnumber;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Quarter = Identity1.Quarter;
    const obj3 = this.warehouseOwnerShipData();
    const warehouseLeasedValue = this.cardValue(this.isCard);
    this.WareHouseDetails.Whlsf = warehouseLeasedValue;
    this.WareHouseDetails.Whlsi = this.WarehouseOwnerShipModel.OwnerType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Type = this.WarehouseOwnerShipModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Idnumber = this.WarehouseOwnerShipModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Nationality = this.WarehouseOwnerShipModel.Nationality;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].SmtpAddr = this.WarehouseOwnerShipModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].MobNumber = this.WarehouseOwnerShipModel.PhoneNumber;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].TelNumber = this.WarehouseOwnerShipModel.Phone;
    this.WareHouseDetails.WoCrNo = this.WarehouseOwnerShipModel.CRNo;
    this.WareHouseDetails.WoTin = this.WarehouseOwnerShipModel.Tin;
    this.WareHouseDetails.Compnm = this.WarehouseOwnerShipModel.CompanyName;
    this.WareHouseDetails.WoAddress = this.WarehouseOwnerShipModel.Address;
    this.WareHouseDetails.Lsfdt = this.WarehouseOwnerShipModel.LeaseDate;
    this.WareHouseDetails.Lsedt = this.WarehouseOwnerShipModel.ExpiryDate;
    const obj4 = this.warehouseDimensionsData();
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].LenSiz = this.WarehouseDimensionsModel.Length;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].WidSiz = this.WarehouseDimensionsModel.Width;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].HeiSiz = this.WarehouseDimensionsModel.Height;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].CubicSc = this.WarehouseDimensionsModel.CubicMeters;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].SquarSc = this.WarehouseDimensionsModel.SquareMeters;
    const ManagerInfo1 = this.WarehouseManagerInformation.value;
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
    const obj5 = this.warehouseManagerInfoData();
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Type = this.WarehouseManagerInfoModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Idnumber = this.WarehouseManagerInfoModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Nationality = this.WarehouseManagerInfoModel.Nationality;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt = Hiring;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Title = this.WarehouseManagerInfoModel.Title;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Firstnm = this.WarehouseManagerInfoModel.FirstName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Lastnm = this.WarehouseManagerInfoModel.SurName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Initials = this.WarehouseManagerInfoModel.MiddleName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Firstnm = this.WarehouseManagerInfoModel.FirstName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Fathernm = this.WarehouseManagerInfoModel.FatherName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Grandfathernm = this.WarehouseManagerInfoModel.GrandFatherName;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][0].SmtpAddr = this.WarehouseManagerInfoModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][0].MobNumber = this.WarehouseManagerInfoModel.PhoneNumber;

    const obj6 = this.warehouseBankData();
    this.WareHouseDetails.WH_GOODSDTLSet.results = [];
    const control = this.BankGuaranteeInformation.get("Rows") as FormArray;
    for (let j = 0; j < control.controls.length; j++) {
      this.WareHouseDetails.WH_GOODSDTLSet.results.push({
        Gdtyp: control.controls[j].value.energyDrinks,
        Gddtl: control.controls[j].value.movedgoods,
        Bgqt: control.controls[j].value.quantity,
        Bguom: control.controls[j].value.unitofMeasure,
        Bgrsp: control.controls[j].value.totalRspValue
      });
    }
    this.WareHouseDetails.Bgamt = this.BankInfoModel.InitialBankGuaranteeValue;
    this.WareHouseDetails.Operationz = '05';
    this.wareHousesService.saveWHDetails(this.WareHouseDetails).subscribe(data => {
      if (data) {
        console.log('Dimensions Info-save', data["d"]);
      }
    }, (error) => {
      console.log('err-3', error);
    });
  }
  /*additional info*/
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

  SaveDraft7() {
    this.warehouseInfoData();
    const agree1 = this.agreeBooleanValueCheck(this.WarehouseInfoModel.Agreeflg);
    this.WareHouseDetails.Purpose = this.purposeValue;
    // this.WareHouseDetails.Fin = this.WareHouseDetails.Fin;
    // this.WareHouseDetails.Bussiness = this.WareHouseDetails.Bunm;
    this.WareHouseDetails.Stgfg = agree1;
    this.warehouseIdentificationData();
    this.WareHouseDetails.Whfnm = this.WarehouseIdentificationModel.WarehouseName;
    const Identity1 = this.WarehouseIdentication.value;
    //this.WareHouseDetails.WH_ADDRESSSet["results"][0].Addrnumber = this.WarehouseIdentificationModel.Address;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Latitude = this.WarehouseIdentificationModel.Latitude;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Longitude = this.WarehouseIdentificationModel.Longitude;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].BuildingNo = Identity1.BuildingNo;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Street = Identity1.StreetName;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Region = Identity1.RegionDistrict;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].City = Identity1.City;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].PostalCd = Identity1.PostalCode;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Addrnumber = Identity1.Addrnumber;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Quarter = Identity1.Quarter;
    this.warehouseOwnerShipData();
    const warehouseLeasedValue = this.cardValue(this.isCard);
    this.WareHouseDetails.Whlsf = warehouseLeasedValue;
    this.WareHouseDetails.Whlsi = this.WarehouseOwnerShipModel.OwnerType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Type = this.WarehouseOwnerShipModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Idnumber = this.WarehouseOwnerShipModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Nationality = this.WarehouseOwnerShipModel.Nationality;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].SmtpAddr = this.WarehouseOwnerShipModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].MobNumber = this.WarehouseOwnerShipModel.PhoneNumber;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].TelNumber = this.WarehouseOwnerShipModel.Phone;
    this.WareHouseDetails.WoCrNo = this.WarehouseOwnerShipModel.CRNo;
    this.WareHouseDetails.WoTin = this.WarehouseOwnerShipModel.Tin;
    this.WareHouseDetails.Compnm = this.WarehouseOwnerShipModel.CompanyName;
    this.WareHouseDetails.WoAddress = this.WarehouseOwnerShipModel.Address;
    this.WareHouseDetails.Lsfdt = this.WarehouseOwnerShipModel.LeaseDate;
    this.WareHouseDetails.Lsedt = this.WarehouseOwnerShipModel.ExpiryDate;
    this.warehouseDimensionsData();
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].LenSiz = this.WarehouseDimensionsModel.Length;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].WidSiz = this.WarehouseDimensionsModel.Width;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].HeiSiz = this.WarehouseDimensionsModel.Height;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].CubicSc = this.WarehouseDimensionsModel.CubicMeters;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].SquarSc = this.WarehouseDimensionsModel.SquareMeters;

    const ManagerInfo1 = this.WarehouseManagerInformation.value;
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
    const obj5 = this.warehouseManagerInfoData();
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Type = this.WarehouseManagerInfoModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Idnumber = this.WarehouseManagerInfoModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Nationality = this.WarehouseManagerInfoModel.Nationality;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt = Hiring;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Title = this.WarehouseManagerInfoModel.Title;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Firstnm = this.WarehouseManagerInfoModel.FirstName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Lastnm = this.WarehouseManagerInfoModel.SurName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Initials = this.WarehouseManagerInfoModel.MiddleName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Firstnm = this.WarehouseManagerInfoModel.FirstName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Fathernm = this.WarehouseManagerInfoModel.FatherName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Grandfathernm = this.WarehouseManagerInfoModel.GrandFatherName;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][0].SmtpAddr = this.WarehouseManagerInfoModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][0].MobNumber = this.WarehouseManagerInfoModel.PhoneNumber;
    this.WareHouseDetails.WH_GOODSDTLSet.results = [];
    const control = this.BankGuaranteeInformation.get("Rows") as FormArray;
    for (let j = 0; j < control.controls.length; j++) {
      this.WareHouseDetails.WH_GOODSDTLSet.results.push({
        Gdtyp: control.controls[j].value.energyDrinks,
        Gddtl: control.controls[j].value.movedgoods,
        Bgqt: control.controls[j].value.quantity,
        Bguom: control.controls[j].value.unitofMeasure,
        Bgrsp: control.controls[j].value.totalRspValue
      });
    }
    const obj7 = this.warehouseAdditionalData();
    const card1 = this.cardValue(this.isCard1);
    const card2 = this.cardValue(this.isCard2);
    const card3 = this.cardValue(this.isCard3);
    const card4 = this.cardValue(this.isCard4);
    this.WareHouseDetails.AddQuesSet["results"][0].RbFg = card1;
    this.WareHouseDetails.AddQuesSet["results"][1].RbFg = card2;
    this.WareHouseDetails.AddQuesSet["results"][2].RbFg = card3;
    this.WareHouseDetails.AddQuesSet["results"][3].RbFg = card4;
    this.warehouseAdditionalData();
    let answer1 = this.AdditionalInfoModel.TextArea1 !== undefined && this.AdditionalInfoModel.TextArea1 !== "" ? this.AdditionalInfoModel.TextArea1 : '';
    let obj1 = this.answerValue(answer1, 1);
    this.OtherReasonValue.push(obj1);
    let answer2 = this.AdditionalInfoModel.TextArea2 !== undefined && this.AdditionalInfoModel.TextArea2 !== "" ? this.AdditionalInfoModel.TextArea2 : '';
    let obj2 = this.answerValue(answer2, 2);
    this.OtherReasonValue.push(obj2);
    let answer3 = this.AdditionalInfoModel.TextArea3 !== undefined && this.AdditionalInfoModel.TextArea3 !== "" ? this.AdditionalInfoModel.TextArea3 : '';
    let obj3 = this.answerValue(answer3, 3);
    this.OtherReasonValue.push(obj3);
    let answer4 = this.AdditionalInfoModel.TextArea4 !== undefined && this.AdditionalInfoModel.TextArea4 !== "" ? this.AdditionalInfoModel.TextArea4 : '';
    let obj4 = this.answerValue(answer4, 4);
    this.OtherReasonValue.push(obj4);
    this.WareHouseDetails.NOTESSet["results"] = this.OtherReasonValue;
    this.WareHouseDetails.Operationz = '05';
    this.wareHousesService.saveWHDetails(this.WareHouseDetails).subscribe(data => {
      if (data) {
        console.log('Addition Info-save', data["d"]);
      }
    }, (error) => {
      console.log('err-3', error);
    });
  }
  /*Declaration*/
  SaveDraft8() {
    this.warehouseInfoData();
    const agree1 = this.agreeBooleanValueCheck(this.WarehouseInfoModel.Agreeflg);
    this.WareHouseDetails.Purpose = this.purposeValue;
    // this.WareHouseDetails.Fin = this.WareHouseDetails.Fin;
    // this.WareHouseDetails.Bussiness = this.WareHouseDetails.Bunm;
    this.WareHouseDetails.Stgfg = agree1;
    this.warehouseIdentificationData();
    this.WareHouseDetails.Whfnm = this.WarehouseIdentificationModel.WarehouseName;
    const Identity1 = this.WarehouseIdentication.value;
    //this.WareHouseDetails.WH_ADDRESSSet["results"][0].Addrnumber = this.WarehouseIdentificationModel.Address;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Latitude = this.WarehouseIdentificationModel.Latitude;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Longitude = this.WarehouseIdentificationModel.Longitude;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].BuildingNo = Identity1.BuildingNo;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Street = Identity1.StreetName;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Region = Identity1.RegionDistrict;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].City = Identity1.City;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].PostalCd = Identity1.PostalCode;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Addrnumber = Identity1.Addrnumber;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Quarter = Identity1.Quarter;
    this.warehouseOwnerShipData();
    const warehouseLeasedValue = this.cardValue(this.isCard);
    this.WareHouseDetails.Whlsf = warehouseLeasedValue;
    this.WareHouseDetails.Whlsi = this.WarehouseOwnerShipModel.OwnerType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Type = this.WarehouseOwnerShipModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Idnumber = this.WarehouseOwnerShipModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Nationality = this.WarehouseOwnerShipModel.Nationality;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].SmtpAddr = this.WarehouseOwnerShipModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].MobNumber = this.WarehouseOwnerShipModel.PhoneNumber;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].TelNumber = this.WarehouseOwnerShipModel.Phone;
    this.WareHouseDetails.WoCrNo = this.WarehouseOwnerShipModel.CRNo;
    this.WareHouseDetails.WoTin = this.WarehouseOwnerShipModel.Tin;
    this.WareHouseDetails.Compnm = this.WarehouseOwnerShipModel.CompanyName;
    this.WareHouseDetails.WoAddress = this.WarehouseOwnerShipModel.Address;
    this.WareHouseDetails.Lsfdt = this.WarehouseOwnerShipModel.LeaseDate;
    this.WareHouseDetails.Lsedt = this.WarehouseOwnerShipModel.ExpiryDate;
    this.warehouseDimensionsData();
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].LenSiz = this.WarehouseDimensionsModel.Length;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].WidSiz = this.WarehouseDimensionsModel.Width;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].HeiSiz = this.WarehouseDimensionsModel.Height;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].CubicSc = this.WarehouseDimensionsModel.CubicMeters;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].SquarSc = this.WarehouseDimensionsModel.SquareMeters;

    const ManagerInfo1 = this.WarehouseManagerInformation.value;
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
    const obj5 = this.warehouseManagerInfoData();
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Type = this.WarehouseManagerInfoModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Idnumber = this.WarehouseManagerInfoModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Nationality = this.WarehouseManagerInfoModel.Nationality;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt = Hiring;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Title = this.WarehouseManagerInfoModel.Title;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Firstnm = this.WarehouseManagerInfoModel.FirstName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Lastnm = this.WarehouseManagerInfoModel.SurName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Initials = this.WarehouseManagerInfoModel.MiddleName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Firstnm = this.WarehouseManagerInfoModel.FirstName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Fathernm = this.WarehouseManagerInfoModel.FatherName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Grandfathernm = this.WarehouseManagerInfoModel.GrandFatherName;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][0].SmtpAddr = this.WarehouseManagerInfoModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][0].MobNumber = this.WarehouseManagerInfoModel.PhoneNumber;
    this.WareHouseDetails.WH_GOODSDTLSet.results = [];
    const control = this.BankGuaranteeInformation.get("Rows") as FormArray;
    for (let j = 0; j < control.controls.length; j++) {
      this.WareHouseDetails.WH_GOODSDTLSet.results.push({
        Gdtyp: control.controls[j].value.energyDrinks,
        Gddtl: control.controls[j].value.movedgoods,
        Bgqt: control.controls[j].value.quantity,
        Bguom: control.controls[j].value.unitofMeasure,
        Bgrsp: control.controls[j].value.totalRspValue
      });
    }
    const obj7 = this.warehouseAdditionalData();
    const card1 = this.cardValue(this.isCard1);
    const card2 = this.cardValue(this.isCard2);
    const card3 = this.cardValue(this.isCard3);
    const card4 = this.cardValue(this.isCard4);
    this.WareHouseDetails.AddQuesSet["results"][0].RbFg = card1;
    this.WareHouseDetails.AddQuesSet["results"][1].RbFg = card2;
    this.WareHouseDetails.AddQuesSet["results"][2].RbFg = card3;
    this.WareHouseDetails.AddQuesSet["results"][3].RbFg = card4;
    this.warehouseAdditionalData();
    let answer1 = this.AdditionalInfoModel.TextArea1 !== undefined && this.AdditionalInfoModel.TextArea1 !== "" ? this.AdditionalInfoModel.TextArea1 : '';
    let obj1 = this.answerValue(answer1, 1);
    this.OtherReasonValue.push(obj1);
    let answer2 = this.AdditionalInfoModel.TextArea2 !== undefined && this.AdditionalInfoModel.TextArea2 !== "" ? this.AdditionalInfoModel.TextArea2 : '';
    let obj2 = this.answerValue(answer2, 2);
    this.OtherReasonValue.push(obj2);
    let answer3 = this.AdditionalInfoModel.TextArea3 !== undefined && this.AdditionalInfoModel.TextArea3 !== "" ? this.AdditionalInfoModel.TextArea3 : '';
    let obj3 = this.answerValue(answer3, 3);
    this.OtherReasonValue.push(obj3);
    let answer4 = this.AdditionalInfoModel.TextArea4 !== undefined && this.AdditionalInfoModel.TextArea4 !== "" ? this.AdditionalInfoModel.TextArea4 : '';
    let obj4 = this.answerValue(answer4, 4);
    this.OtherReasonValue.push(obj4);
    this.WareHouseDetails.NOTESSet["results"] = this.OtherReasonValue;
    const obj8 = this.warehouseDeclarationData();
    const agree2 = this.agreeBooleanValueCheck(this.DeclarationInfoModel.Agree);
    this.WareHouseDetails.Decfg = agree2;
    this.WareHouseDetails.Decnm = this.DeclarationInfoModel.Name;
    this.WareHouseDetails.Decdg = this.DeclarationInfoModel.Designation;
    this.WareHouseDetails.Type = this.DeclarationInfoModel.IdType;
    this.WareHouseDetails.Idnumber = this.DeclarationInfoModel.IdNumber;
    this.WareHouseDetails.Decdt = this.CurrentDate.toISOString().slice(0, 19);
    this.WareHouseDetails.Operationz = '05';
    this.wareHousesService.saveWHDetails(this.WareHouseDetails).subscribe(data => {
      if (data) {
        console.log('Declaration-save', data["d"]);
      }
    }, (error) => {
      console.log('err-3', error);
    });
  }
  SaveDraft9() {
    this.warehouseInfoData();
    const agree1 = this.agreeBooleanValueCheck(this.WarehouseInfoModel.Agreeflg);
    this.WareHouseDetails.Purpose = this.purposeValue;
    // this.WareHouseDetails.Fin = this.WareHouseDetails.Fin;
    // this.WareHouseDetails.Bussiness = this.WareHouseDetails.Bunm;
    this.WareHouseDetails.Stgfg = agree1;
    this.warehouseIdentificationData();
    this.WareHouseDetails.Whfnm = this.WarehouseIdentificationModel.WarehouseName;
    const Identity1 = this.WarehouseIdentication.value;
    //this.WareHouseDetails.WH_ADDRESSSet["results"][0].Addrnumber = this.WarehouseIdentificationModel.Address;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Latitude = this.WarehouseIdentificationModel.Latitude;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Longitude = this.WarehouseIdentificationModel.Longitude;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].BuildingNo = Identity1.BuildingNo;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Street = Identity1.StreetName;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Region = Identity1.RegionDistrict;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].City = Identity1.City;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].PostalCd = Identity1.PostalCode;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Addrnumber = Identity1.Addrnumber;
    this.WareHouseDetails.WH_ADDRESSSet.results[0].Quarter = Identity1.Quarter;
    this.warehouseOwnerShipData();
    const warehouseLeasedValue = this.cardValue(this.isCard);
    this.WareHouseDetails.Whlsf = warehouseLeasedValue;
    this.WareHouseDetails.Whlsi = this.WarehouseOwnerShipModel.OwnerType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Type = this.WarehouseOwnerShipModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Idnumber = this.WarehouseOwnerShipModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Nationality = this.WarehouseOwnerShipModel.Nationality;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].SmtpAddr = this.WarehouseOwnerShipModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].MobNumber = this.WarehouseOwnerShipModel.PhoneNumber;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].TelNumber = this.WarehouseOwnerShipModel.Phone;
    this.WareHouseDetails.WoCrNo = this.WarehouseOwnerShipModel.CRNo;
    this.WareHouseDetails.WoTin = this.WarehouseOwnerShipModel.Tin;
    this.WareHouseDetails.Compnm = this.WarehouseOwnerShipModel.CompanyName;
    this.WareHouseDetails.WoAddress = this.WarehouseOwnerShipModel.Address;
    this.WareHouseDetails.Lsfdt = this.WarehouseOwnerShipModel.LeaseDate;
    this.WareHouseDetails.Lsedt = this.WarehouseOwnerShipModel.ExpiryDate;
    this.warehouseDimensionsData();
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].LenSiz = this.WarehouseDimensionsModel.Length;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].WidSiz = this.WarehouseDimensionsModel.Width;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].HeiSiz = this.WarehouseDimensionsModel.Height;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].CubicSc = this.WarehouseDimensionsModel.CubicMeters;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].SquarSc = this.WarehouseDimensionsModel.SquareMeters;

    const ManagerInfo1 = this.WarehouseManagerInformation.value;
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
    const obj5 = this.warehouseManagerInfoData();
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Type = this.WarehouseManagerInfoModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Idnumber = this.WarehouseManagerInfoModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Nationality = this.WarehouseManagerInfoModel.Nationality;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt = Hiring;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Title = this.WarehouseManagerInfoModel.Title;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Firstnm = this.WarehouseManagerInfoModel.FirstName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Lastnm = this.WarehouseManagerInfoModel.SurName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Initials = this.WarehouseManagerInfoModel.MiddleName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Fathernm = this.WarehouseManagerInfoModel.FatherName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Grandfathernm = this.WarehouseManagerInfoModel.GrandFatherName;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][0].SmtpAddr = this.WarehouseManagerInfoModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][0].MobNumber = this.WarehouseManagerInfoModel.PhoneNumber;
    this.WareHouseDetails.WH_GOODSDTLSet.results = [];
    const control = this.BankGuaranteeInformation.get("Rows") as FormArray;
    for (let j = 0; j < control.controls.length; j++) {
      this.WareHouseDetails.WH_GOODSDTLSet.results.push({
        Gdtyp: control.controls[j].value.energyDrinks,
        Gddtl: control.controls[j].value.movedgoods,
        Bgqt: control.controls[j].value.quantity,
        Bguom: control.controls[j].value.unitofMeasure,
        Bgrsp: control.controls[j].value.totalRspValue
      });
    }
    const obj7 = this.warehouseAdditionalData();
    const card1 = this.cardValue(this.isCard1);
    const card2 = this.cardValue(this.isCard2);
    const card3 = this.cardValue(this.isCard3);
    const card4 = this.cardValue(this.isCard4);
    this.WareHouseDetails.AddQuesSet["results"][0].RbFg = card1;
    this.WareHouseDetails.AddQuesSet["results"][1].RbFg = card2;
    this.WareHouseDetails.AddQuesSet["results"][2].RbFg = card3;
    this.WareHouseDetails.AddQuesSet["results"][3].RbFg = card4;
    this.warehouseAdditionalData();
    let answer1 = this.AdditionalInfoModel.TextArea1 !== undefined && this.AdditionalInfoModel.TextArea1 !== "" ? this.AdditionalInfoModel.TextArea1 : '';
    let obj1 = this.answerValue(answer1, 1);
    this.OtherReasonValue.push(obj1);
    let answer2 = this.AdditionalInfoModel.TextArea2 !== undefined && this.AdditionalInfoModel.TextArea2 !== "" ? this.AdditionalInfoModel.TextArea2 : '';
    let obj2 = this.answerValue(answer2, 2);
    this.OtherReasonValue.push(obj2);
    let answer3 = this.AdditionalInfoModel.TextArea3 !== undefined && this.AdditionalInfoModel.TextArea3 !== "" ? this.AdditionalInfoModel.TextArea3 : '';
    let obj3 = this.answerValue(answer3, 3);
    this.OtherReasonValue.push(obj3);
    let answer4 = this.AdditionalInfoModel.TextArea4 !== undefined && this.AdditionalInfoModel.TextArea4 !== "" ? this.AdditionalInfoModel.TextArea4 : '';
    let obj4 = this.answerValue(answer4, 4);
    this.OtherReasonValue.push(obj4);
    this.WareHouseDetails.NOTESSet["results"] = this.OtherReasonValue;
    const obj8 = this.warehouseDeclarationData();
    const agree2 = this.agreeBooleanValueCheck(this.DeclarationInfoModel.Agree);
    this.WareHouseDetails.Decfg = agree2;
    this.WareHouseDetails.Decnm = this.DeclarationInfoModel.Name;
    this.WareHouseDetails.Decdg = this.DeclarationInfoModel.Designation;
    this.WareHouseDetails.Type = this.DeclarationInfoModel.IdType;
    this.WareHouseDetails.Idnumber = this.DeclarationInfoModel.IdNumber;
    this.WareHouseDetails.Operationz = '05';
    this.wareHousesService.saveWHDetails(this.WareHouseDetails).subscribe(data => {
      if (data) {
        console.log('Declaration-save', data["d"]);
      }
    }, (error) => {
      console.log('err-3', error);
    });
  }
  /* Step - 9 Ninth Screen Info Starts */
  summaryDetails() {
    const warehouseLeasedValue = this.cardValue(this.isCard);
    const card1 = this.cardValue(this.isCard1);
    const card2 = this.cardValue(this.isCard2);
    const card3 = this.cardValue(this.isCard3);
    const card4 = this.cardValue(this.isCard4);
    const agree1 = this.agreeBooleanValueCheck(this.WarehouseInfoModel.Agreeflg);
    const agree2 = this.agreeBooleanValueCheck(this.DeclarationInfoModel.Agree);
    this.WareHouseDetails.Purpose = this.purposeValue;
    this.WareHouseDetails.Stgfg = agree1;
    this.WareHouseDetails.Whfnm = this.WarehouseIdentificationModel.WarehouseName;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Addrnumber = this.WarehouseIdentificationModel.Address;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Latitude = this.WarehouseIdentificationModel.Latitude;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].Longitude = this.WarehouseIdentificationModel.Longitude;
    this.WareHouseDetails.Whlsf = warehouseLeasedValue;
    this.WareHouseDetails.Whlsi = this.WarehouseOwnerShipModel.OwnerType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Type = this.WarehouseOwnerShipModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Idnumber = this.WarehouseOwnerShipModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][1].Nationality = this.WarehouseOwnerShipModel.Nationality;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].SmtpAddr = this.WarehouseOwnerShipModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].MobNumber = this.WarehouseOwnerShipModel.PhoneNumber;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][1].TelNumber = this.WarehouseOwnerShipModel.Phone;
    this.WareHouseDetails.WoCrNo = this.WarehouseOwnerShipModel.CRNo;
    this.WareHouseDetails.WoTin = this.WarehouseOwnerShipModel.Tin;
    this.WareHouseDetails.Compnm = this.WarehouseOwnerShipModel.CompanyName;
    this.WareHouseDetails.WoAddress = this.WarehouseOwnerShipModel.Address;
    this.WareHouseDetails.Lsfdt = this.WarehouseOwnerShipModel.LeaseDate;
    this.WareHouseDetails.Lsedt = this.WarehouseOwnerShipModel.ExpiryDate;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].LenSiz = this.WarehouseDimensionsModel.Length;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].WidSiz = this.WarehouseDimensionsModel.Width;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].HeiSiz = this.WarehouseDimensionsModel.Height;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].CubicSc = this.WarehouseDimensionsModel.CubicMeters;
    this.WareHouseDetails.WH_ADDRESSSet["results"][0].SquarSc = this.WarehouseDimensionsModel.SquareMeters;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Type = this.WarehouseManagerInfoModel.IdType;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Idnumber = this.WarehouseManagerInfoModel.IdNumber;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Nationality = this.WarehouseManagerInfoModel.Nationality;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt = this.WarehouseManagerInfoModel.DateOfHiring;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Title = this.WarehouseManagerInfoModel.Title;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Firstnm = this.WarehouseManagerInfoModel.FirstName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Fathernm = this.WarehouseManagerInfoModel.FatherName;
    this.WareHouseDetails.WH_CONTACTPSet["results"][0].Grandfathernm = this.WarehouseManagerInfoModel.GrandFatherName;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][0].SmtpAddr = this.WarehouseManagerInfoModel.EmailId;
    this.WareHouseDetails.WH_CONTACT_DTLSet["results"][0].MobNumber = this.WarehouseManagerInfoModel.PhoneNumber;
    this.WareHouseDetails.Bgamt = this.BankInfoModel.InitialBankGuaranteeValue;
    this.WareHouseDetails.AddQuesSet["results"][0].RbFg = card1;
    this.WareHouseDetails.AddQuesSet["results"][1].RbFg = card2;
    this.WareHouseDetails.AddQuesSet["results"][2].RbFg = card3;
    this.WareHouseDetails.AddQuesSet["results"][3].RbFg = card4;
    this.warehouseAdditionalData();
    let answer1 = this.AdditionalInfoModel.TextArea1 !== undefined && this.AdditionalInfoModel.TextArea1 !== "" ? this.AdditionalInfoModel.TextArea1 : '';
    let obj1 = this.answerValue(answer1, 1);
    this.OtherReasonValue.push(obj1);
    let answer2 = this.AdditionalInfoModel.TextArea2 !== undefined && this.AdditionalInfoModel.TextArea2 !== "" ? this.AdditionalInfoModel.TextArea2 : '';
    let obj2 = this.answerValue(answer2, 2);
    this.OtherReasonValue.push(obj2);
    let answer3 = this.AdditionalInfoModel.TextArea3 !== undefined && this.AdditionalInfoModel.TextArea3 !== "" ? this.AdditionalInfoModel.TextArea3 : '';
    let obj3 = this.answerValue(answer3, 3);
    this.OtherReasonValue.push(obj3);
    let answer4 = this.AdditionalInfoModel.TextArea4 !== undefined && this.AdditionalInfoModel.TextArea4 !== "" ? this.AdditionalInfoModel.TextArea4 : '';
    let obj4 = this.answerValue(answer4, 4);
    this.OtherReasonValue.push(obj4);
    this.WareHouseDetails.NOTESSet["results"] = this.OtherReasonValue;
    this.WareHouseDetails.Decfg = agree2;
    this.WareHouseDetails.Decnm = this.DeclarationInfoModel.Name;
    this.WareHouseDetails.Decdg = this.DeclarationInfoModel.Designation;
    this.WareHouseDetails.Type = this.DeclarationInfoModel.IdType;
    this.WareHouseDetails.Idnumber = this.DeclarationInfoModel.IdNumber;
    return this.WareHouseDetails;
  }

  continueNinthScreen() {
    let Hiring;
    if (this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt !== undefined && this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt !== "" && this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt !== null) {
      if (this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt.calendarEnd != undefined) {
        Hiring = this.datePickerValue(this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt);
      }
      else if (this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt.includes('/Date')) {
        Hiring = new Date(+ this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        Hiring = this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt;
      }
    } else {
      Hiring = this.CurrentDate.toISOString().slice(0, 19);
    }

    const obj9 = this.summaryDetails();

    this.WareHouseDetails.WH_CONTACTPSet["results"][0].HiringDt = null;
    this.WareHouseDetails.Lsfdt = null; //this.WarehouseOwnerShipModel.LeaseDate;
    this.WareHouseDetails.Lsedt = null; //this.WarehouseOwnerShipModel.ExpiryDate;
    this.WareHouseDetails.Operationz = '01';
    console.log('whole-data-save', this.WareHouseDetails);
    this.wareHousesService.saveWHDetails(this.WareHouseDetails).subscribe(data => {
      if (data) {
        // this.Step = 10;
        console.log('final-submit', data["d"]);
        this.WareHouseDetails = data["d"]
        this.step13();
      }
    }, (error) => {

    });
  }
  /* Step - 9 Ninth Screen Info Ends */

  /* Step - 10 Tenth Screen Info Starts */
  acknowledgementDetails() {
    //Fbnumz
  }

  downloadAck() {
    this.router.navigate(['/mains/tax']);
  }
  /* Step - 10 Tenth Screen Info End */

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
  cardValue(value) {
    let warehouseLease;
    if (value == 'Yes') {
      warehouseLease = "1";
    }
    else {
      warehouseLease = "0";
    }
    return warehouseLease;
  }


  agreeBooleanValueCheck(value) {
    let agree;
    if (value == true) {
      agree = "X";
    }
    else {
      agree = "Y";
    }
    return agree;
  }

  agreeStringValueCheck(value) {
    let agree;
    if (value == "X") {
      agree = true;
    }
    else {
      agree = false;
    }
    return agree;
  }


  back1() {
    this.Step = 1;
    this.stepsChecking();
  }

  back2() {
    this.Step = 2;
    this.stepsChecking();
  }

  back3() {
    this.Step = 3;
    this.stepsChecking();
  }

  back4() {
    this.Step = 4;
    this.stepsChecking();
  }

  back5() {
    this.Step = 5;
    this.stepsChecking();
  }

  back6() {
    this.Step = 6;
    this.stepsChecking();
  }

  back7() {
    this.Step = 7;
    this.stepsChecking();
  }

  back8() {
    this.Step = 8;
    this.stepsChecking();
  }

  back9() {
    this.Step = 9;
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

  managerIdType(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.ManagerIdTypeName = this.oIdType1[i].Text;
      }
    }
    if (this.WarehouseManagerInformation.value.idType == "ZS0001") {
      $("#idValidation").modal("show");
      this.ManagerCountrySetList = this.CountrySetList;
      this.isWHManagerInfo = true;
      this.WarehouseManagerInformation.patchValue({
        nationalityOfOwner: 'SA'
      })
    }
    else if (this.WarehouseManagerInformation.value.idType == "ZS0002") {
      $("#idValidation").modal("show");
      this.isWHManagerInfo = true;
      this.ManagerCountrySetList = this.CountrySetList;
      this.WarehouseManagerInformation.patchValue({
        nationalityOfOwner: ''
      })
    }
    else {
      this.isWHManagerInfo = false;
      this.ManagerCountrySetList = this.CountrySetList.filter(x => x.GccFlag == 'X');
      this.WarehouseManagerInformation.patchValue({
        nationalityOfOwner: ''
      })
    }

  }
  

  
  //To Validate WHManager Idz
  validateIDz() {
    if (this.WarehouseManagerInformation.value.idType !== "ZS0003") {

      let d = this.IdTypeOwnerShipFormgroup.value.Dob["calendarStart"];

      if (d.day < 10 && d.day.toString().length == 1) {
        d.day = "0" + d.day;
      }
      if (d.month < 10 && d.month.toString().length == 1) {
        d.month = "0" + d.month;
      }
      let currentdate = "" + d.year + d.month + d.day;

      let obj = {
        type: this.WarehouseManagerInformation.value.idType,
        idNumber: this.IdTypeOwnerShipFormgroup.value.Idnumber,
      };
      this.wareHousesService.getUserValidation(obj, currentdate).subscribe(
        (res) => {

          this.WarehouseManagerInformation.patchValue({
            idNumber: res["d"]["Idnum"]
          });
          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: ''
          });
       

          $("#idValidation").modal("hide");

         
        },
        (err) => {
          
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
 

  //To Validate WHDeclarationIdz
  validateWHDeclarationIdz() {
    if (this.DeclarationFormGroup.value.idType !== "ZS0003") {

      let d = this.IdTypeOwnerShipFormgroup.value.Dob["calendarStart"];

      if (d.day < 10 && d.day.toString().length == 1) {
        d.day = "0" + d.day;
      }
      if (d.month < 10 && d.month.toString().length == 1) {
        d.month = "0" + d.month;
      }
      let currentdate = "" + d.year + d.month + d.day;

      let obj = {
        type: this.DeclarationFormGroup.value.idType,
        idNumber: this.IdTypeOwnerShipFormgroup.value.Idnumber,
      };
      this.wareHousesService.getUserValidation(obj, currentdate).subscribe(
        (res) => {
          

          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: ''
          });
         
          this.DeclarationFormGroup.patchValue({
            idNumber: res["d"]["Idnum"]
          });
          $("#idWHDeclarationValidation").modal("hide");

        },
        (err) => {
         
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );

        }
      );
    }

    //}
  }
  

  ngAfterViewChecked() {
    this.ref.detectChanges();
  }
}

export class WarehouseInfoModel {
  Agreeflg: boolean;
  Fin: string;
  Bussiness: string;
  SelectWarehouse: string;
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

export class AdditionalInfoModel {
  TextArea1: string;
  TextArea2: string;
  TextArea3: string;
  TextArea4: string;
}

export class DeclarationInfoModel {
  Name: string;
  Designation: string;
  IdType: string;
  IdNumber: string;
  Agree: boolean;
  Date: string;
}
