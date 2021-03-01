import { Component, OnInit, ElementRef, ViewChild, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { modifywarehouseconstants } from "src/app/main/excise-services/warehouse/modify-warehouse-license/modifywarehouseconstants.model";
import { WarehouseService } from '../warehouse.service';
import { NotifierService } from 'angular-notifier';
import { CommonValidation } from 'src/app/constants/commonValidations';
import * as FileSaver from 'file-saver';
import { CalendarComponent } from "src/app/constants/calendar.component";


declare var $;
@Component({
  selector: 'app-modify-warehouse-license',
  templateUrl: './modify-warehouse-license.component.html',
  styleUrls: ['./modify-warehouse-license.component.css']
})
export class ModifyWarehouseLicenseComponent implements OnInit {

  @ViewChild('confirm', { static: false }) confirm: ElementRef;
  @ViewChild('proceed', { static: false }) proceed: ElementRef;

  WarehouseIdentication: FormGroup;
  WarehouseIdentificationFormControls2: FormGroup = new FormGroup({});
  warehouseCompanyFormControl: FormGroup = new FormGroup({});
  warehouseChangeformGroup: FormGroup = new FormGroup({});
  WarehouseDimensionsFormControls: FormGroup = new FormGroup({});
  WarehouseManagerInfoFormControls1: FormGroup = new FormGroup({});
  BankGuaranteeFormControls: FormGroup = new FormGroup({});
  WarehouseManagerInfoFormControls2: FormGroup = new FormGroup({});
  DeclarationFormControls: FormGroup = new FormGroup({});
  confirmBtn: boolean = false;
  headerComponent = CalendarComponent;

  StringPattern = "[a-zA-Z \s]*$";
  NumberPattern = "^[0-9]*$";
  ContactNoPattern = "[5][0-9]{8}";
  NumberWithDecimalPoints = "[0-9.]*$";
  EmailPattern = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
  DecimalPointPattern = "^[0-9]+(\.[0-9]{1,57})?$";
  Alphanumeric = '^[a-zA-Z0-9][a-zA-Z0-9 ]+$';
  DecimalPointTwoPattern = '^[0-9]{1,5}(?:\[.][0-9]{1,2})?$';

  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 1;
  WholeData: any;
  WarehouseDetails: any;
  WarehouseList: any;
  OwnerTypeList: any;
  UsagePurposeList: any;
  LeasedList: any;
  AdditionalList: any;
  IdTypeList: any;
  CountrySet: any;
  TitleSet: any;
  DraftList: any;
  Fbguid: any;
  Fbnum: any;
  WarehousePurposeName: any;
  WarehouseGoodName: any;
  OwnerLeasedName: any;
  OwnerTypeName: any;
  disableTypeProductButton: boolean = true;
  OwnerIdTypeName: any;
  OwnerNationalityName: any;
  ManagerTitleName: any;
  ManagerIdTypeName: any;
  ManagerNationalityName: any;
  DeclarationIdTypeName: any;

  AdditionalName1: any;
  AdditionalName2: any;
  AdditionalName3: any;
  AdditionalName4: any;

  Additional1: boolean = false;
  Additional2: boolean = false;
  Additional3: boolean = false;
  Additional4: boolean = false;

  AdditionalTextarea1: boolean = true;
  AdditionalTextarea2: boolean = true;
  AdditionalTextarea3: boolean = true;
  AdditionalTextarea4: boolean = true;

  isUploaded1: boolean = false;
  isUploaded2: boolean = false;
  isUploaded3: boolean = false;
  isUploaded4: boolean = false;
  OwnershipAttachFiles: any[] = [];
  DimensionAttachFiles: any[] = [];

  UploadFiles1: any[] = [];
  UploadFiles2: any[] = [];
  UploadFiles3: any[] = [];
  UploadFiles4: any[] = [];

  AdditionalNotes1: any;
  AdditionalNotes2: any;
  AdditionalNotes3: any;
  AdditionalNotes4: any;

  isCompany: boolean;
  isIndividual: boolean;
  isOwnerType: any;
  ReturnId: any;
  OtherReasonValue: any[] = [];
  CurrentDate = new Date();
  successMsg1: boolean = false;
  successMsg: boolean = false;
  lang: any;
  direction: string;

  agree: boolean = false;
  WarehouseInformation: FormGroup;
  isCardTP: string = '0';
  isCardWD: string = '0';
  isCardWI: string = '0';
  isCardWM: string = '0';
  isCardWO: string = '0';
  isCardBG: string = '0';
  TypeProductForm: FormGroup;
  whnoflag: boolean = false;
  flag:boolean=false;
  RegionDistrictList: any;
  CityList: any;
  CountrySetList: any;
  CountrySetList1: any;
  OwnerShipCountrySetList: any;
  ManagerCountrySetList: any;
  ProductSet: any;
  UnitMSet: any;
  TaxRateSet: any;
  Purpose: any;
  GoodsType: any;
  WH_EREGGOODSSet: any;
  WareHouseNoDropdown: any = [];
  TypeandProductFlag = false;
  Changetype: string = '0';
  expiryDate: any;
  step2Enable: boolean = false;
  step3Enable: boolean = false;
  step4Enable: boolean = false;
  step5Enable: boolean = false;
  step6Enable: boolean = false;
  step11Enable: boolean = false;
  RetailSet: any = [];
  BankGuaranteeInformation: FormGroup;
  BankGuaranteeValue: number;
  BankRSPValueTotal: any;
  TaxGoodType: any;
  ProductHeader: any;
  wareHsLease: any;
  oIdType1: any;
  ProdValidfrom: any;
  storageflag: boolean = false;
  CountrySetListDuplicate: any;
  DistrictName: any;
  CityName: any;
  Ownership: boolean = false;
  isWHOwnershipInfo: boolean = false;
  IdTypeOwnerShipFormgroup: FormGroup;
  isWHManagerInfo: boolean = false;
  isWHDeclarationInfo: boolean = false;
  idErr1: boolean = false;
  id1: string;
  enddate: any;
  Step3OwnerIdTypeName: any;
  HiringDate: any;
  constructor(
    private router: Router,
    private warehouseService: WarehouseService,
    public appService: AppService, private fb: FormBuilder, private notifierService: NotifierService, private commonValidation: CommonValidation
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
      this.lang = modifywarehouseconstants.langz.arb.modifywarehouse;
      this.direction = modifywarehouseconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = modifywarehouseconstants.langz.eng.modifywarehouse;
      this.direction = modifywarehouseconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
    }

    this.Dropdownbindtext();
  }

  ngOnInit() {

    this.WarehouseIdentication = new FormGroup({
      warehouseName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      validFrom: new FormControl(''),
      BuildingNo: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern(this.NumberPattern)]),
      StreetName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      RegionDistrict: new FormControl(''),
      City: new FormControl(''),
      PostalCode: new FormControl(''),
      Addrnumber: new FormControl(''),
      Quarter: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl('')
    });
    this.WarehouseInformation = this.fb.group({
      "purpose": [null, [Validators.required]],
      "RenewalExtent": [null],
      "finNo": [null],
      "bussinessName": [null],
      "expiryDate": [this.CurrentDate]
    });
    this.TypeProductForm = this.fb.group({
      "Purpose": [null],
      "flag": false
    });

    this.BankGuaranteeInformation = this.fb.group({
      Rows: this.fb.array([]),
      initialBankGuaranteeValue: this.fb.control('')
    });
    this.IdTypeOwnerShipFormgroup = new FormGroup({
      Idnumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(7), Validators.maxLength(15)]),
      Dob: new FormControl('', [Validators.required]),
    });


    this.appService.data1.subscribe((res) => {
      this.enddate = this.commonValidation.dateFormate(
        this.commonValidation.toJulianDate(new Date()),
        res
      );
    });
    this.getWHInfoDropDownList();
    this.warehouseDetailsList();
    this.idTypeDetails();
    this.successMsg = false;
    this.stepsChecking();


  }

  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.warehouseDetails();
        break;
      case 2:
        this.warehoueIdentification1();
        break;
      case 3:
        this.warehouseChangeform();
        break;
      case 4:
        this.warehouseDimensions();
        break;
      case 5:
        this.warehouseManagerInfo1();
        break;
      case 6:
        this.bankGuaranteeInfo();
        break;
      case 7:
        this.warehouseManagerInfo2();
        break;
      case 8:
        this.declarationInfo();
        break;
      case 10:
        this.declarationInfo();
        break;
      default:
        break;
    }
    return this.Step;
  }

  warehouseDetailsList() {
    if (this.Language == 'A') {
      this.WarehouseList = {
        "manuGoods": [
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
        ]
      }
    }
    else {
      this.WarehouseList = {
        "manuGoods": [
          {
            "Key": "",
            "Text": ""
          },
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
    this.LeasedList = this.WarehouseList.selAboveinfo;
    this.AdditionalList = this.WarehouseList.InspReq;
  }

  idTypeDetails() {
    if (this.Language == 'A') {
      this.IdTypeList = {
        "idTyp": [
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
      }
    }
    else {
      this.IdTypeList = {
        "idTyp": [
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
      }
    }

    this.IdTypeList = this.IdTypeList.idTyp;
  }

  onWarehouseSelected(value) {
    this.warehouseService.fetchWarehouseNoDetails(this.GPartz, this.Language, value).subscribe(data => {
      if (data) {
      
        this.WholeData = data["d"];
        this.ReturnId = data["d"].ReturnIdz;
        let leased;
        let expiry;
        let hiring;
        moment.locale('en-Us');
        if (this.WholeData.Lsfdt !== undefined && this.WholeData.Lsfdt !== "" && this.WholeData.Lsfdt !== null) {
          if (this.WholeData.Lsfdt.includes('/Date')) {

            leased = moment(new Date(+(((this.WholeData.Lsfdt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');

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

        this.WholeData.Lsfdt = null;//leased;
        if (this.WholeData.Lsedt !== undefined && this.WholeData.Lsedt !== "" && this.WholeData.Lsedt !== null) {
          if (this.WholeData.Lsedt.includes('/Date')) {

            expiry = moment(new Date(+(((this.WholeData.Lsedt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');


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
        this.WholeData.Lsedt = null;//expiry;

        if (this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== undefined && this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== "" && this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== null) {
          if (this.WholeData.WH_CONTACTPSet.results[0].HiringDt.includes('/Date')) {

            hiring = moment(new Date(+(((this.WholeData.WH_CONTACTPSet.results[0].HiringDt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');

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
          }
        } else {
          hiring = this.CurrentDate.toISOString().slice(0, 19);

        }
        this.WholeData.WH_CONTACTPSet.results[0].HiringDt = hiring;

        this.WH_EREGGOODSSet = data["d"]["WH_EREGGOODSSet"]["results"];
        this.allDropdownListBindingNames();
      }
    }, (error) => {
    
      this.notifierService.notify("error", error["error"]["error"]["innererror"]["errordetails"][0]["message"])
    });

    return this.WholeData;
  }

  getWHInfoDropDownList() {
    this.warehouseService.getWHInformation2(this.GPartz, this.Language).subscribe((data) => {
      this.CountrySet = data["d"].COUNTRYSet.results;
      this.TitleSet = data["d"].TITLESet.results;
    
    }, (error) => {
   
      this.notifierService.notify("error", error["error"]["error"]["innererror"]["errordetails"][0]["message"])
    });
  }

  draftSelected() {
    this.warehouseService.validateWarehouseNoDetails(this.GPartz, this.Language, this.Fbguid, this.Fbnum).subscribe(data => {
      if (data) {
       
        this.WholeData = data["d"];
        this.ReturnId = data["d"].ReturnIdz;


        let leased;
        let expiry;
        let hiring;
        moment.locale('en-Us');
        if (this.WholeData.Lsfdt !== undefined && this.WholeData.Lsfdt !== "" && this.WholeData.Lsfdt !== null) {
          if (this.WholeData.Lsfdt.includes('/Date')) {

            leased = moment(new Date(+(((this.WholeData.Lsfdt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');

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

        this.WholeData.Lsfdt = null;//leased;
        if (this.WholeData.Lsedt !== undefined && this.WholeData.Lsedt !== "" && this.WholeData.Lsedt !== null) {
          if (this.WholeData.Lsedt.includes('/Date')) {

            expiry = moment(new Date(+(((this.WholeData.Lsedt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');


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
        this.WholeData.Lsedt = null;//expiry;

        if (this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== undefined && this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== "" && this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== null) {
          if (this.WholeData.WH_CONTACTPSet.results[0].HiringDt.includes('/Date')) {

            hiring = moment(new Date(+(((this.WholeData.WH_CONTACTPSet.results[0].HiringDt).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');

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
          }
        } else {
          hiring = this.CurrentDate.toISOString().slice(0, 19);

        }
        this.WholeData.WH_CONTACTPSet.results[0].HiringDt = hiring;
        this.allDropdownListBindingNames();
      }
    }, (error) => {
    
      this.notifierService.notify("error", error["error"]["error"]["innererror"]["errordetails"][0]["message"])
    });

    return this.WholeData;
  }

  draftRadioSelected(index) {
    $('#proceed').modal('hide');
    for (let h = 0; h < this.DraftList.length; h++) {
      if (index == h) {
        this.Fbguid = this.DraftList[h].Fbguid;
        this.Fbnum = this.DraftList[h].Fbnum;
      }
    }
    if (this.Fbguid !== undefined && this.Fbnum !== undefined) {
      this.draftSelected();
    }
    this.saveAsDraftDetails();
  }
  saveAsDraftDetails() {
    this.warehouseService.getWHInformation2(this.GPartz, this.Language).subscribe(data => {
      if (data) {
       
        this.WarehouseDetails = data["d"].results[0];
        this.WareHouseNoDropdown = data["d"].results;
        if (this.WarehouseDetails !== undefined) {
          this.onWarehouseSelected(this.WarehouseDetails.Whnox);
        }
      }
    }, (error) => {
     
      this.notifierService.notify("error", error["error"]["error"]["innererror"]["errordetails"][0]["message"])
    });
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

      for (let d = 0; d < this.CountrySet.length; d++) {
        if (this.WholeData.WH_CONTACTPSet.results[1].Nationality == this.CountrySet[d].Land1) {
          this.OwnerNationalityName = this.CountrySet[d].Natio50;
        }
        if (this.WholeData.WH_CONTACTPSet.results[0].Nationality == this.CountrySet[d].Land1) {
          this.ManagerNationalityName = this.CountrySet[d].Natio50;
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
  /*final save functionality*/
  SaveAll() {
    let Hiring;
    if (this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== undefined && this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== "" && this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== null) {
      if (this.WholeData.WH_CONTACTPSet.results[0].HiringDt.calendarEnd != undefined) {
        Hiring = this.datePickerValue(this.WholeData.WH_CONTACTPSet.results[0].HiringDt);
      }
      else if (this.WholeData.WH_CONTACTPSet.results[0].HiringDt.includes('/Date')) {
        Hiring = new Date(+this.WholeData.WH_CONTACTPSet.results[0].HiringDt.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        Hiring = this.WholeData.WH_CONTACTPSet.results[0].HiringDt;
      }
    } else {
      Hiring = this.CurrentDate.toISOString().slice(0, 19);
    }
    this.WholeData.WH_CONTACTPSet.results[0].HiringDt = Hiring;
    this.WholeData.Operationz = '01';
    this.warehouseService.modifyWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
       
        this.WholeData = data["d"]
        this.successMsg = true;
        this.step13();
      }
    }, (error) => {
    
    });
  }
  /* Step - 1 Info Starts */
  warehouseDetails() {
    this.warehouseService.getWarehouseDetails(this.GPartz, this.Language).subscribe(data => {
      if (data) {
       
        this.DraftList = data["d"].ITM_SAVEDSet.results;
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
      }
    }, (error) => {
     
      this.notifierService.notify("error", error["error"]["error"]["innererror"]["errordetails"][0]["message"])
    });


    this.warehouseService.getWarehouseDropDownList(this.GPartz, this.Language).subscribe(data => {
      if (data) {

      }
    }, (error) => {
     
      this.notifierService.notify("error", error["error"]["error"]["innererror"]["errordetails"][0]["message"])
    });
  }
  getexistingmodifywarehouseApi() {
    this.warehouseService.getWarehouseLicense(this.GPartz, this.Language).subscribe(data => {
      if (data) {
       
        this.WarehouseDetails = data["d"].results[0];
        this.WareHouseNoDropdown = data["d"].results;
        if (this.WarehouseDetails !== undefined) {
          this.onWarehouseSelected(this.WarehouseDetails.Whnox);
        }
      }
    }, (error) => {
     
      this.notifierService.notify("error", error["error"]["error"]["innererror"]["errordetails"][0]["message"])
    });
  }
  /* Step - 1 Info Ends */

  /* Step - 2 Info Starts */
  warehoueIdentification1() {

    this.WarehouseIdentication.patchValue({
      'warehouseName': this.WholeData.Whfnm,
      'BuildingNo': this.WholeData.WH_ADDRESSSet.results[0].BuildingNo,
      'StreetName': this.WholeData.WH_ADDRESSSet.results[0].Street,
      'RegionDistrict': this.WholeData.WH_ADDRESSSet.results[0].Region,
      'City': this.WholeData.WH_ADDRESSSet.results[0].City,
      'PostalCode': this.WholeData.WH_ADDRESSSet.results[0].PostalCd,
      'Addrnumber': this.WholeData.WH_ADDRESSSet.results[0].Addrnumber,
      'Quarter': this.WholeData.WH_ADDRESSSet.results[0].Quarter,
      'latitude': this.WholeData.WH_ADDRESSSet.results[0].Latitude,
      'longitude': this.WholeData.WH_ADDRESSSet.results[0].Longitude
    });

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
    this.warehouseService.modifyWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
        this.WholeData = [];
        this.WholeData = data["d"];
      }
    }, (error) => {
    
    });

  }
  /* Step - 2 Info Ends */
  ownerTypeChange(val) {
    this.isOwnerType = val;
    if (val == 'C') {
      this.isCompany = true;
      this.isIndividual = false;
      this.warehouseownershipIsCompanyFormControls();
      this.removeOwnershipIsindividualControls();
    } else {
      this.isCompany = false;
      this.isIndividual = true;
      this.warehoueIdentification2();
      this.removeOwnershipIsCompanyControls();
    }
    for (let g = 0; g < this.OwnerTypeList.length; g++) {
      if (val == this.OwnerTypeList[g].Key) {
        this.OwnerTypeName = this.OwnerTypeList[g].Text;
      }
    }

  }

  datePickerValue(value) {
    if (value !== undefined && value !== null && value !== "") {
      if (value.calendarStart !== undefined && value.calendarStart !== null && value.calendarStart !== "") {
        let day = value.calendarStart.day;
        let month = value.calendarStart.month;
        let year = value.calendarStart.year;
        const convertedDate = `${year}-${month}-${day}T00:00:00`;
        return convertedDate;
      }
      else {
        return value;
      }
    } else {
      return null;
    }
  }

  warehouseownershipIsCompanyFormControls() {
    // this.warehouseCompanyFormControl.addControl('ownerType', new FormControl([Validators.required]));
    //this.warehouseCompanyFormControl.addControl('validFrom', new FormControl(this.WholeData, [Validators.required]));
    //this.warehouseCompanyFormControl.addControl('countryCode', new FormControl(this.WholeData, [Validators.required]));
    this.warehouseCompanyFormControl.addControl('crNo', new FormControl(this.WholeData.WoCrNo, [ Validators.pattern(this.NumberPattern), Validators.minLength(10), Validators.maxLength(10)]));
    this.warehouseCompanyFormControl.addControl('tin', new FormControl(this.WholeData.WoTin));
    this.warehouseCompanyFormControl.addControl('companyName', new FormControl(this.WholeData.Compnm));
    this.warehouseCompanyFormControl.addControl('address', new FormControl(this.WholeData.WoAddress));
    this.warehouseCompanyFormControl.addControl('phone', new FormControl(this.WholeData.WH_CONTACT_DTLSet.results[1].TelNumber));

  }
  warehouseChangeform() {
    this.warehouseChangeformGroup.addControl('leasedWarehouse', new FormControl(this.WholeData.Whlsf, [Validators.required]));
    this.warehouseChangeformGroup.addControl('ownerType', new FormControl(this.WholeData.Whlsi));
    this.warehouseChangeformGroup.addControl('warehouseRentDate', new FormControl(this.WholeData.Lsfdt || 'dd-mm-yyyy'));
    this.warehouseChangeformGroup.addControl('warehouseRentExpiryDate', new FormControl(this.WholeData.Lsedt || 'dd-mm-yyyy'));
    if(this.warehouseChangeformGroup.value.leasedWarehouse=='1')
    {
      this.Ownership=true;
    }
    else
    {
      this.Ownership=false;
    }
    this.ownerTypeChange(this.WholeData.Whlsi);
  }
  /* Step - 3 Info Starts */
  warehoueIdentification2() {
    this.WarehouseIdentificationFormControls2.addControl('idType', new FormControl(this.WholeData.WH_CONTACTPSet.results[1].Type));
    this.WarehouseIdentificationFormControls2.addControl('idNumber', new FormControl(this.WholeData.WH_CONTACTPSet.results[1].Idnumber, [ Validators.pattern(this.Alphanumeric), Validators.minLength(3), Validators.maxLength(16)]));
    this.WarehouseIdentificationFormControls2.addControl('nationalityOfOwner', new FormControl(this.WholeData.WH_CONTACTPSet.results[1].Nationality));
    this.WarehouseIdentificationFormControls2.addControl('phoneNumber', new FormControl(this.WholeData.WH_CONTACT_DTLSet.results[1].MobNumber, [Validators.minLength(10), Validators.maxLength(14), Validators.pattern(this.NumberPattern)]));
    this.WarehouseIdentificationFormControls2.addControl('emailId', new FormControl(this.WholeData.WH_CONTACT_DTLSet.results[1].SmtpAddr, [ Validators.maxLength(40), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]));
    this.WarehouseIdentificationFormControls2.addControl('Nameoftheowner', new FormControl(this.WholeData.WH_CONTACTPSet.results[1].Firstnm, [Validators.maxLength(40)]));
  }
  removeOwnershipIsindividualControls() {
    this.WarehouseIdentificationFormControls2.removeControl('idType');
    this.WarehouseIdentificationFormControls2.removeControl('idNumber');
    this.WarehouseIdentificationFormControls2.removeControl('nationality');
    this.WarehouseIdentificationFormControls2.removeControl('phoneNumber');
    this.WarehouseIdentificationFormControls2.removeControl('emailId');
  }

  removeOwnershipIsCompanyControls() {
    this.warehouseCompanyFormControl.removeControl('countryCode');
    this.warehouseCompanyFormControl.removeControl('crNo');
    this.warehouseCompanyFormControl.removeControl('tin');
    this.warehouseCompanyFormControl.removeControl('companyName');
    this.warehouseCompanyFormControl.removeControl('address');
    this.warehouseCompanyFormControl.removeControl('phone');
  }
  saveIdentification2() {
    const Identity2 = this.WarehouseIdentificationFormControls2.value;
    const Identity3 = this.warehouseChangeformGroup.value;
    const Identity4 = this.warehouseCompanyFormControl.value;

    let rent = Identity3.warehouseRentDate !== undefined && Identity3.warehouseRentDate !== null && Identity3.warehouseRentDate !== "" && Identity3.warehouseRentDate !== "Invalid date" ? this.datePickerValue(Identity3.warehouseRentDate) : this.CurrentDate.toISOString().slice(0, 19);
    let rentexpiry = Identity3.warehouseRentExpiryDate !== undefined && Identity3.warehouseRentExpiryDate !== null && Identity3.warehouseRentExpiryDate !== "" && Identity3.warehouseRentExpiryDate !== "Invalid date" ? this.datePickerValue(Identity3.warehouseRentExpiryDate) : this.CurrentDate.toISOString().slice(0, 19);
    // let rentexpiry = Identity3.warehouseRentExpiryDate !== undefined ? Identity3.warehouseRentExpiryDate : this.datePickerValue(Identity3.warehouseRentExpiryDate);
    //individual save
    this.WholeData.WH_CONTACTPSet.results[1].Type = Identity2.idType;
    this.WholeData.WH_CONTACTPSet.results[1].Idnumber = Identity2.idNumber;
    this.WholeData.WH_CONTACTPSet.results[1].Nationality = Identity2.nationalityOfOwner;
    this.WholeData.WH_CONTACT_DTLSet.results[1].MobNumber = Identity2.phoneNumber;
    this.WholeData.WH_CONTACT_DTLSet.results[1].SmtpAddr = Identity2.emailId;
    //company save
    this.WholeData.WoCrNo = Identity4.crNo;
    this.WholeData.WoTin = Identity4.tin;
    this.WholeData.Compnm = Identity4.companyName;
    this.WholeData.WoAddress = Identity4.address;
    this.WholeData.WH_CONTACT_DTLSet.results[1].TelNumber = Identity4.phone;
    //common fields save
    this.WholeData.Whlsf = Identity3.leasedWarehouse;
    this.WholeData.Whlsi = Identity3.ownerType;
    this.WholeData.Lsfdt = null;//rent; 
    this.WholeData.Lsedt = null;//rentexpiry;
    this.WholeData.Operationz = '05';
    this.warehouseService.modifyWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
     
        this.successMsg = true;
        // this.step1();
      }
    }, (error) => {
    
    });
  }
  /* Step - 3 Info Ends */

  /* Step - 4 Info Starts */
  warehouseDimensions() {
    this.WarehouseDimensionsFormControls.addControl('length', new FormControl(this.WholeData.WH_ADDRESSSet.results[0].LenSiz, [ Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]));
    this.WarehouseDimensionsFormControls.addControl('width', new FormControl(this.WholeData.WH_ADDRESSSet.results[0].WidSiz, [ Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]));
    this.WarehouseDimensionsFormControls.addControl('height', new FormControl(this.WholeData.WH_ADDRESSSet.results[0].HeiSiz, [ Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]));
    this.WarehouseDimensionsFormControls.addControl('cubic', new FormControl(this.WholeData.WH_ADDRESSSet.results[0].CubicSc, [ Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]));
    this.WarehouseDimensionsFormControls.addControl('square', new FormControl(this.WholeData.WH_ADDRESSSet.results[0].SquarSc, [ Validators.minLength(0.5), Validators.pattern(this.DecimalPointTwoPattern)]));
    this.WarehouseDimensionsFormControls.addControl('copyOfMunicipal', new FormControl(''));
  }

  saveDimension() {
    const Dimension = this.WarehouseDimensionsFormControls.value;
    this.WholeData.WH_ADDRESSSet.results[0].LenSiz = Dimension.length;
    this.WholeData.WH_ADDRESSSet.results[0].WidSiz = Dimension.width;
    this.WholeData.WH_ADDRESSSet.results[0].HeiSiz = Dimension.height;
    this.WholeData.WH_ADDRESSSet.results[0].CubicSc = Dimension.cubic;
    this.WholeData.WH_ADDRESSSet.results[0].SquarSc = Dimension.square;
    this.WholeData.Operationz = '05';
    this.warehouseService.modifyWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
       
        this.successMsg = true;
        // this.step1();
      }
    }, (error) => {
    
    });
  }
  /* Step - 4 Info Ends */

  /* Step - 5 Info Starts */
  warehouseManagerInfo1() {
    debugger;
    this.WarehouseManagerInfoFormControls1.addControl('idType', new FormControl(this.WholeData.WH_CONTACTPSet.results[0].Type, [Validators.required]));
    this.WarehouseManagerInfoFormControls1.addControl('idNumber', new FormControl(this.WholeData.WH_CONTACTPSet.results[0].Idnumber, [Validators.required, Validators.pattern(this.Alphanumeric), Validators.minLength(7), Validators.maxLength(15)]));
    this.WarehouseManagerInfoFormControls1.addControl('nationalityOfOwner', new FormControl(this.WholeData.WH_CONTACTPSet.results[0].Nationality));

    let Hiring;
    if (this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== undefined && this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== "" && this.WholeData.WH_CONTACTPSet.results[0].HiringDt !== null) {
      if (this.WholeData.WH_CONTACTPSet.results[0].HiringDt.calendarEnd != undefined) {
        Hiring = this.datePickerValue(this.WholeData.WH_CONTACTPSet.results[0].HiringDt);
      }
      else if (this.WholeData.WH_CONTACTPSet.results[0].HiringDt.includes('/Date')) {
        Hiring = new Date(+this.WholeData.WH_CONTACTPSet.results[0].HiringDt.substr(6, 13)).toISOString().slice(0, 19);
      }
      else {
        Hiring = this.WholeData.WH_CONTACTPSet.results[0].HiringDt;
      }
    } else {
      Hiring = this.CurrentDate.toISOString().slice(0, 19);
    }
    this.WarehouseManagerInfoFormControls1.addControl('dateOfHiring', new FormControl(Hiring, [Validators.required]));
    this.WarehouseManagerInfoFormControls1.addControl('title', new FormControl(this.WholeData.WH_CONTACTPSet.results[0].Title, [Validators.required]));
    this.WarehouseManagerInfoFormControls1.addControl('name', new FormControl(this.WholeData.WH_CONTACTPSet.results[0].Firstnm, [Validators.required, Validators.pattern(this.StringPattern)]));
    this.WarehouseManagerInfoFormControls1.addControl('fatherName', new FormControl(this.WholeData.WH_CONTACTPSet.results[0].Fathernm, [Validators.required, Validators.pattern(this.StringPattern)]));
    this.WarehouseManagerInfoFormControls1.addControl('grandFatherName', new FormControl(this.WholeData.WH_CONTACTPSet.results[0].Grandfathernm, [Validators.required, Validators.pattern(this.StringPattern)]));
    this.WarehouseManagerInfoFormControls1.addControl('phoneNumber', new FormControl(this.WholeData.WH_CONTACT_DTLSet.results[0].MobNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(14), Validators.pattern(this.NumberPattern)]));
    this.WarehouseManagerInfoFormControls1.addControl('emailId', new FormControl(this.WholeData.WH_CONTACT_DTLSet.results[0].SmtpAddr, [Validators.required, Validators.maxLength(40), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]));
  }
  saveManagerInfo1() {
    const ManagerInfo1 = this.WarehouseManagerInfoFormControls1.value;
    // let Hiring = ManagerInfo1.dateOfHiring !== undefined ? ManagerInfo1.dateOfHiring : this.datePickerValue(ManagerInfo1.dateOfHiring);
    let Hiring = ManagerInfo1.dateOfHiring !== undefined && ManagerInfo1.dateOfHiring !== null && ManagerInfo1.dateOfHiring !== "" && ManagerInfo1.dateOfHiring !== "Invalid date" ? this.datePickerValue(ManagerInfo1.dateOfHiring) : this.CurrentDate.toISOString().slice(0, 19);
    this.WholeData.WH_CONTACTPSet.results[0].Type = ManagerInfo1.idType;
    this.WholeData.WH_CONTACTPSet.results[0].Idnumber = ManagerInfo1.idNumber;
    this.WholeData.WH_CONTACTPSet.results[0].Nationality = ManagerInfo1.nationalityOfOwner;
    this.WholeData.WH_CONTACTPSet.results[0].HiringDt = Hiring;
    this.WholeData.WH_CONTACTPSet.results[0].Title = ManagerInfo1.title;
    this.WholeData.WH_CONTACTPSet.results[0].Firstnm = ManagerInfo1.name;
    this.WholeData.WH_CONTACTPSet.results[0].Fathernm = ManagerInfo1.fatherName;
    this.WholeData.WH_CONTACTPSet.results[0].Grandfathernm = ManagerInfo1.grandFatherName;
    this.WholeData.WH_CONTACT_DTLSet.results[0].MobNumber = ManagerInfo1.phoneNumber;
    this.WholeData.WH_CONTACT_DTLSet.results[0].SmtpAddr = ManagerInfo1.emailId;
    this.WholeData.Operationz = '05';
    this.warehouseService.modifyWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
       
        this.successMsg = true;
        // this.step1();
      }
    }, (error) => {
     
    });
  }
  /* Step - 5 Info Ends */

  /* Step - 6 Info Starts */
  bankGuaranteeInfo() {
    this.BankGuaranteeFormControls.addControl('bankGuaranteeValue', new FormControl(this.WholeData.Bgamt, [Validators.required, Validators.pattern(this.NumberWithDecimalPoints)]));
  }

  saveBankInfo() {
    const BankInfo = this.BankGuaranteeFormControls.value;
    this.WholeData.Bgamt = BankInfo.bankGuaranteeValue !== "" && BankInfo.bankGuaranteeValue !== null && BankInfo.bankGuaranteeValue !== undefined ? BankInfo.bankGuaranteeValue : "0.00";
    this.WholeData.Operationz = '05';
    this.warehouseService.modifyWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
      
        this.successMsg = true;
        // this.step1();
      }
    }, (error) => {
    
    });
  }
  /* Step - 6 Info Ends */

  /* Step - 7 Info Starts */
  warehouseManagerInfo2() {
    this.WarehouseManagerInfoFormControls2.addControl('financialPosition', new FormControl(this.WholeData.AddQuesSet.results[0].RbFg, [Validators.required]));
    this.WarehouseManagerInfoFormControls2.addControl('financialCrimes', new FormControl(this.WholeData.AddQuesSet.results[1].RbFg, [Validators.required]));
    this.WarehouseManagerInfoFormControls2.addControl('administrativeSystem', new FormControl(this.WholeData.AddQuesSet.results[2].RbFg, [Validators.required]));
    this.WarehouseManagerInfoFormControls2.addControl('secureMeasures', new FormControl(this.WholeData.AddQuesSet.results[3].RbFg, [Validators.required]));

    this.level1('0', null);
    this.level2('0', null);
    this.level3('0', null);
    this.level4('0', null);

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
  }

  biningAttata() {
    var attahmentata = this.WholeData?.ATTACHSet.results;
    if (attahmentata.length > 0) {
      for (let i = 0; i < attahmentata.length; i++) {
        if (attahmentata[i].Dotyp == 'WA01') {
          this.OwnershipAttachFiles.push(attahmentata[i]);
        
        }
        if (attahmentata[i].Dotyp == 'WA02') {
          this.DimensionAttachFiles.push(attahmentata[i]);
        
        }
      }
    }
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
    this.warehouseService.modifyWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
      
        this.successMsg = true;
      }
    }, (error) => {
   
    });
  }

  level1(val, note1) {
    if (val == '0') {
      this.Additional1 = true;
      this.AdditionalTextarea1 = true;
      if (note1 !== null) {
        let RsValue = note1 !== undefined && note1 !== "" ? note1 : '';
        this.WarehouseManagerInfoFormControls2.addControl('answer1', new FormControl(RsValue, [Validators.required]));
      }
      else {
        this.WarehouseManagerInfoFormControls2.addControl('answer1', new FormControl('', [Validators.required]));
      }
    }
    else {
      // this.Additional1 = false;
      this.AdditionalTextarea1 = false;
      this.WarehouseManagerInfoFormControls2.removeControl('answer1')
    }
  }

  level2(val, note2) {
    if (val == '0') {
      this.Additional2 = true;
      this.AdditionalTextarea2 = true;
      if (note2 !== null) {
        let RsValue = note2 !== undefined && note2 !== "" ? note2 : '';
        this.WarehouseManagerInfoFormControls2.addControl('answer2', new FormControl(RsValue, [Validators.required]));
      }
      else {
        this.WarehouseManagerInfoFormControls2.addControl('answer2', new FormControl('', [Validators.required]));
      }

    }
    else {
      // this.Additional2 = false;
      this.AdditionalTextarea2 = false;
      this.WarehouseManagerInfoFormControls2.removeControl('answer2')
    }
  }

  level3(val, note3) {
    if (val == '0') {
      this.Additional3 = true;
      this.AdditionalTextarea3 = true;
      if (note3 !== null) {
        let RsValue = note3 !== undefined && note3 !== "" ? note3 : '';
        this.WarehouseManagerInfoFormControls2.addControl('answer3', new FormControl(RsValue, [Validators.required]));
      }
      else {
        this.WarehouseManagerInfoFormControls2.addControl('answer3', new FormControl('', [Validators.required]));
      }
    }
    else {
      // this.Additional3 = false;
      this.AdditionalTextarea3 = false;
      this.WarehouseManagerInfoFormControls2.removeControl('answer3')
    }
  }

  level4(val, note4) {
    if (val == '0') {
      this.Additional4 = true;
      this.AdditionalTextarea4 = true;
      if (note4 !== null) {
        let RsValue = note4 !== undefined && note4 !== "" ? note4 : '';
        this.WarehouseManagerInfoFormControls2.addControl('answer4', new FormControl(RsValue, [Validators.required]));
      }
      else {
        this.WarehouseManagerInfoFormControls2.addControl('answer4', new FormControl('', [Validators.required]));
      }
    }
    else {
      // this.Additional4 = false;
      this.AdditionalTextarea4 = false;
      this.WarehouseManagerInfoFormControls2.removeControl('answer4')
    }
  }
  /* Step - 7 Info Ends */

  /* Step - 8 Info Starts */
  declarationInfo() {

    this.DeclarationFormControls.addControl('contactName', new FormControl(this.WholeData.Decnm, [Validators.required, Validators.pattern(this.StringPattern)]));
    this.DeclarationFormControls.addControl('designation', new FormControl(this.WholeData.Decdg, [Validators.required, Validators.pattern(this.StringPattern)]));
    this.DeclarationFormControls.addControl('idType', new FormControl(this.WholeData.Type, [Validators.required]));
    this.DeclarationFormControls.addControl('idNumber', new FormControl(this.WholeData.Idnumber, [Validators.required, Validators.pattern(this.Alphanumeric), Validators.minLength(3), Validators.maxLength(16)]));
    this.DeclarationFormControls.addControl('warehouseRentExpiryDate', new FormControl(this.CurrentDate.toISOString().slice(0, 19)));
    this.DeclarationFormControls.addControl('agree', new FormControl('', [Validators.required]));

  }

  saveDeclaration() {
    const Declaration = this.DeclarationFormControls.value;
    this.WholeData.Decnm = Declaration.contactName;
    this.WholeData.Decdg = Declaration.designation;
    this.WholeData.Type = Declaration.idType;
    this.WholeData.Idnumber = Declaration.idNumber;
    this.WholeData.Operationz = '05';
    this.warehouseService.modifyWarehouseDetails(this.WholeData).subscribe(data => {
      if (data) {
      
        this.successMsg = true;
        // this.step1();
      }
    }, (error) => {
     
    });
  }
  /* Step - 8 Info Ends */
  uploadFile(event, label) {
    var obj = { name: '', size: 0, type: '', url: '', did: '' };
    for (let i = 0; i < event.length; i++) {
      const element = event[i];
      obj.name = element.name.split(".")[0];
      obj.size = element.size / 10000;
      obj.type = element.name.split(".")[1];
    }
    if (label == 'ownership') {
      this.OwnershipAttachFiles.push(obj);
     
    }
    else if (label == 'dimensions') {
      this.DimensionAttachFiles.push(obj);
    
    }
    this.uploadFiles(label);
  }

  uploadFiles(label) {
    const frmData = new FormData();
    let fileName;
    let docType;
    if (label == 'ownership') {
      for (var i = 0; i < this.OwnershipAttachFiles.length; i++) {
        fileName = `${this.OwnershipAttachFiles[i]["name"]}.${this.OwnershipAttachFiles[i]["type"]}`;
        docType = 'WA01';
        frmData.append("fileUpload", this.OwnershipAttachFiles[i]);
      }
  
      this.warehouseService.saveWHAttachmentOwnerDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
        if (data) {
        
          for (let h = 0; h < this.OwnershipAttachFiles.length; h++) {
            this.OwnershipAttachFiles[h].url = data["d"]["DocUrl"];
            this.OwnershipAttachFiles[h].did = data["d"]["Doguid"];
          }
        }
      });
    }
    else if (label == 'dimensions') {
      for (var i = 0; i < this.DimensionAttachFiles.length; i++) {
        fileName = `${this.DimensionAttachFiles[i]["name"]}.${this.DimensionAttachFiles[i]["type"]}`;
        docType = 'WA02';
        frmData.append("fileUpload", this.DimensionAttachFiles[i]);
      }
    
      this.warehouseService.saveWHAttachmentDimensionsDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
        if (data) {
         
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
      this.OwnershipAttachFiles.splice(j, 1);
    }
    else if (label == 'dimensions') {
      this.DimensionAttachFiles.splice(j, 1);
    }
  }
  /* Attachment Details End */
  /* File Uploads Starts Here */
  uploadManagerFile(event, label) {
    var obj = { name: '', size: 0, type: '', url: '', did: '' };
    for (let i = 0; i < event.length; i++) {
      const element = event[i];
      obj.name = element.name.split(".")[0];
      obj.size = element.size / 10000;
      obj.type = element.name.split(".")[1];
    }
    if (label == 'upload1') {
      this.isUploaded1 = true;
      this.UploadFiles1.push(obj);
     
    }
    else if (label == 'upload2') {
      this.isUploaded2 = true;
      this.UploadFiles2.push(obj);
    
    }
    else if (label == 'upload3') {
      this.isUploaded3 = true;
      this.UploadFiles3.push(obj);
     
    }
    else if (label == 'upload4') {
      this.isUploaded4 = true;
      this.UploadFiles4.push(obj);
     
    }
    this.uploadManagerFiles(label);
  }

  uploadManagerFiles(label) {
    const frmData = new FormData();
    let fileName;
    let docType;
    if (label == 'upload1') {
      for (var i = 0; i < this.UploadFiles1.length; i++) {
        fileName = `${this.UploadFiles1[i]["name"]}.${this.UploadFiles1[i]["type"]}`;
        docType = 'WQ01';
        frmData.append("file3", this.UploadFiles1[i]);
      }
     
      this.warehouseService.commonAttachmentDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
        if (data) {
        
          for (let h = 0; h < this.UploadFiles1.length; h++) {
            this.UploadFiles1[h].url = data["d"]["DocUrl"];
            this.UploadFiles1[h].did = data["d"]["Doguid"];
          }
        }
      });
    }
    else if (label == 'upload2') {
      for (var i = 0; i < this.UploadFiles2.length; i++) {
        fileName = `${this.UploadFiles2[i]["name"]}.${this.UploadFiles2[i]["type"]}`;
        docType = 'WQ02';
        frmData.append("file4", this.UploadFiles2[i]);
      }
    
      this.warehouseService.commonAttachmentDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
        if (data) {
        
          for (let h = 0; h < this.UploadFiles2.length; h++) {
            this.UploadFiles2[h].url = data["d"]["DocUrl"];
            this.UploadFiles2[h].did = data["d"]["Doguid"];
          }
        }
      });
    }
    else if (label == 'upload3') {
      for (var i = 0; i < this.UploadFiles3.length; i++) {
        fileName = `${this.UploadFiles3[i]["name"]}.${this.UploadFiles3[i]["type"]}`;
        docType = 'WQ03';
        frmData.append("file5", this.UploadFiles3[i]);
      }
    
      this.warehouseService.commonAttachmentDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
        if (data) {
         
          for (let h = 0; h < this.UploadFiles3.length; h++) {
            this.UploadFiles3[h].url = data["d"]["DocUrl"];
            this.UploadFiles3[h].did = data["d"]["Doguid"];
          }
        }
      });
    }
    else if (label == 'upload4') {
      for (var i = 0; i < this.UploadFiles4.length; i++) {
        fileName = `${this.UploadFiles4[i]["name"]}.${this.UploadFiles4[i]["type"]}`;
        docType = 'WQ04';
        frmData.append("file6", this.UploadFiles4[i]);
      }
     
      this.warehouseService.commonAttachmentDetails(this.ReturnId, docType, fileName, frmData).subscribe(data => {
        if (data) {
         
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
      this.UploadFiles1.splice(j, 1);
    }
    else if (label == 'upload2') {
      this.UploadFiles2.splice(j, 1);
    }
    else if (label == 'upload3') {
      this.UploadFiles3.splice(j, 1);
    }
    else if (label == 'upload4') {
      this.UploadFiles4.splice(j, 1);
    }
  }
  /* File Uploads Ends Here */

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
    this.WholeData.WH_ADDRESSSet.results[0].Addrnumber = this.WarehouseIdentication.value.Addrnumber;

    this.biningAttata();
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
  step10() {
    this.Step = 10;
    this.getexistingmodifywarehouseApi();
  }
  step13() {
    this.Step = 13;
  }
  Popupconfirmation() {
    $('#confirm').modal('hide');
    $('#proceed').modal('show');

  }

  newApp() {
    $('#confirm').modal('hide');
    $('#instructions').modal('show');

  }
  popUpClose() {
    $('#instructions').modal('hide');
    this.router.navigate(['/mains/exciseServices/warehouse/warehouseList']);
  }
  termsAndConditionsAccept() {
    this.successMsg1 = true;
    // this.step1();
    this.step10();
    $('#instructions').modal('hide');
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
      Strtime: this.CurrentDate.toISOString().slice(11, 19),
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
  typecheckClick(value) {
    if (value == false) {
      this.TypeProductForm.patchValue({
        'flag': ''
      })
    }
  }
  typecheckchange(value) {
    if (value.currentTarget.checked == true) {
      this.TypeProductForm.patchValue({
        'flag': true
      })
    }
    else {
      this.TypeProductForm.patchValue({
        'flag': ''
      })
    }
  }


  getStatusChangeApi(val) {
    this.warehouseService.getWHInformation5(this.GPartz, this.Language, val).subscribe(data => {
   
      this.RegionDistrictList = data["d"]["districtSet"]["results"];
      this.CityList = data["d"]["citySet"]["results"];
      this.CountrySetList = data["d"]["COUNTRYSet"]["results"];
      this.CountrySetListDuplicate = data["d"]["COUNTRYSet"]["results"];
      this.OwnerShipCountrySetList = this.CountrySetList;
      this.ManagerCountrySetList = this.CountrySetList;

      this.TitleSet = data["d"]["TITLESet"]["results"];
      this.ProductSet = data["d"]["DropGoodsSet"]["results"];
      this.ProductSet.filter(x => x.flag = '');
      this.ProductSet.forEach(element => {
        element['flag'] = false;
        element['disabled'] = false;
      });
      this.UnitMSet = data["d"]["UnitMSet"]["results"];
      this.TaxRateSet = data["d"]["GDTAXRATESet"]["results"];
      let purpose = this.UsagePurposeList.filter(x => x.Key == this.WholeData.Purpose);
      this.Purpose = purpose[0].Text;
      this.GoodsType = '';
     
      let goodstype = this.WH_EREGGOODSSet.filter(x => x.Flag == "X");
      for (let i = 0; i < goodstype.length; i++) {
        for (let j = 0; j < this.ProductSet.length; j++) {
          if (this.ProductSet[j].GoodsTyp == goodstype[i].GoodsTyp) {
            this.Ereggoodsset(j);
            this.ProductSet[j].flag = 'X';
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
      for (let i = 0; i < this.CountrySetList.length; i++) {
        if (this.WholeData.WH_CONTACTPSet['results'][0]['Nationality'] == this.CountrySetList[i].Land1) {
          this.OwnerNationalityName = this.CountrySetList[i].Landx50;
        }
      }
      this.warehouseBankInfoFormControls();
    });
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
        this.ProductSet[0].flag = false;
      }
    }
  
    // this.addingproducts();
  }

  wareHouseChange(val, Fbguid) {
    this.warehouseService.fetchWarehouseNoDetails(this.GPartz, this.Language, val).subscribe(data => {
      this.WholeData = [];
      this.WholeData = data["d"];
      this.ReturnId = data["d"].ReturnIdz;
     
      this.WH_EREGGOODSSet = data["d"]["WH_EREGGOODSSet"]["results"];
      this.getStatusChangeApi(this.WholeData.Statusz);
      this.WarehouseInformation.controls['finNo'].setValue(this.WholeData.Fin);
      this.WarehouseInformation.patchValue({
        'purpose': val,
        'RenewalExtent': this.WholeData.RenPeriod
      });
      this.WarehouseInformation.controls['bussinessName'].setValue(this.WholeData.Bunm);
      this.expiryDate = this.WholeData.Endda !== null && this.WholeData.Endda !== undefined ? new Date(+this.WholeData.Endda.substr(6, 13)) : this.CurrentDate;
     
      this.WarehouseInformation.controls['expiryDate'].setValue(this.expiryDate.toString());
      this.RetailSet = data["d"]["WH_GOODSDTLSet"]["results"];

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
      this.PurposeChange(this.WholeData.Purpose);
    },
      (err) => {
        $("#aftsubmit").modal("show");
        // this.resText = err.error.error.innererror.errordetails[0].message;
        // this.resText1 = err.error.error.innererror.errordetails[1].message;
      }
    );
  }

  disbaleButton: boolean = true;
  TypesChange(value) {
    let count = 0;

    if (value == 'TP') {
      if (this.isCardTP == '1') {
        this.isCardTP = '0';
        this.WholeData.ChgWhPrd = '0';
        this.isCardBG = '1';
        this.TypeandProductFlag = true;
        this.step11Enable = false;
      } else {
        this.isCardTP = '1';
        this.step11Enable = true;
        this.WholeData.ChgWhPrd = '1';
        this.TypeandProductFlag = false;
      }
    }
    if (value == 'WD') {
      if (this.isCardWD == '1') {
        this.isCardWD = '0';
        this.WholeData.ChgWhDm = '0';
        this.WholeData.ChgWhDmDt = "\/Date(" + new Date().getTime() + ")\/";
        this.isCardBG = '1';
        this.step4Enable = false;
      } else {
        this.isCardWD = '1';
        this.step4Enable = true;
        this.WholeData.ChgWhDm = '1'
      }
    }
    if (value == 'WI') {
      if (this.isCardWI == '1') {
        this.isCardWI = '0';
        this.WholeData.ChgWhId = '0';
        this.isCardBG = '0';
        this.step2Enable = false;
        this.step6Enable = false;
      } else {
        this.isCardWI = '1';
        this.step2Enable = true;
        this.WholeData.ChgWhId = '1'
      }
    }
    if (value == 'WM') {
      if (this.isCardWM == '1') {
        this.isCardWM = '0';
        this.WholeData.ChgWhMi = '0';
        this.step5Enable = false;
        this.isCardBG = '0';
        this.step6Enable = false;
      } else {
        this.isCardWM = '1';
        this.step5Enable = true;
        this.WholeData.ChgWhMi = '1'
      }
    }
    if (value == 'WO') {
      if (this.isCardWO == '1') {
        this.isCardWO = '0';
        this.step3Enable = false;
        this.WholeData.ChgWhOi = '0';
        this.isCardBG = '0';
        this.step6Enable = false;
      } else {
        this.isCardWO = '1';
        this.step3Enable = true;
        this.WholeData.ChgWhOi = '1'
      }
    }
    if (value == 'TP' || value == 'WD') {
      if ((this.isCardWD == '0' || this.isCardWD == '') && (this.isCardTP == '0' || this.isCardTP == '')) {
        this.isCardBG = '0';
        this.step6Enable = false;
        // this.WholeData.ChgWhBg = '0';
        this.Changetype = '0';
      }
      else {
        this.isCardBG = '1';
        this.step6Enable = true;
        //  this.WholeData.ChgWhBg = '1'
        this.Changetype = '1';
      }
    }
    else {
      if (((this.isCardWO == '0' || this.isCardWO == '') && (this.isCardWM == '0' || this.isCardWM == '') && (this.isCardWI == '0' || this.isCardWI == ''))) {
        this.Changetype = '0';
      }
      else {
        this.Changetype = '1';
      }
    }
   
    if (value == 'BG') {
      if (this.isCardBG == '1') {
        this.isCardBG = '0';
        this.step6Enable = false;
        this.WholeData.ChgWhBg = '0';
        this.Changetype = '0';
        count += 1;
      } else {
        this.isCardBG = '1';
        this.step6Enable = true;
        this.WholeData.ChgWhBg = '1'
        this.Changetype = '1';
      }
    }
    if (this.isCardBG == '1' || this.isCardWO == '1' || this.isCardWD == '1' || this.isCardTP == '1' || this.isCardWM == '1' || this.isCardWI == '1') {
      this.Changetype = '1';
    }
    if (this.isCardWD == '1' || this.isCardTP == '1') {
      this.isCardBG = '1';
      this.step6Enable = true;
    }
    // if()
  }
  continueFirstScreen() {
    this.Step = 11;
    let k = 0;
    this.ProductSet.forEach((element) => {
      if (element.flag == true) {
        k++;
      }
    });
    if (k == 0) {
      this.disableTypeProductButton = false;
    }
    else {
      this.disableTypeProductButton = true;
    }
  }
  formArr(): FormArray {
    return this.BankGuaranteeInformation.get("Rows") as FormArray;
  }
  Ereggoodsset1(val) {
    this.ProductSet[val].flag = !this.ProductSet[val].flag;

    if (val == 0 && this.ProductSet[val].flag == false) {
      this.ProductSet.forEach(element => {
        if (element.GoodsTyp != "001") {
          element.disabled = false;
          element.flag = false;
        }
      });
    }
    else if (val > 0 && this.ProductSet[val].flag == false) {
      if (!this.ProductSet[1].flag && !this.ProductSet[2].flag && !this.ProductSet[3].flag) {
        this.ProductSet.forEach(element => {
          element.disabled = false;
          element.flag = false;
        });
      }
    }
    if (val > 0 && this.ProductSet[val].flag == true) {
      this.ProductSet.forEach(element => {
        if (element.GoodsTyp == "001") {
          element.disabled = true;
          element.flag = false;
        }
      });
    }

    this.RetailSet.filter(x => x.Gdtyp == this.ProductSet[val].GoodsTyp);
    if (this.ProductSet[val].flag == false) {
      let control = <FormArray>this.BankGuaranteeInformation.controls['Rows'];
      let control1 = control.value.filter(x => x.energyDrinks != this.ProductSet[val].GoodsTyp);

      this.BankGuaranteeInformation = this.fb.group({
        Rows: this.fb.array([]),
        initialBankGuaranteeValue: this.fb.control('')
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
  
    let k = 0;
    this.ProductSet.forEach((element) => {
      if (element.flag == true) {
        k++;
      }
    });
    if (k == 0) {
      this.disableTypeProductButton = true;
    }
    else {
      this.disableTypeProductButton = false;
    }
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
  rspTotal(index) {
    let productType;
    const control = this.BankGuaranteeInformation.get("Rows") as FormArray;
  
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
  initRows(productKey, goodsKey, quantity, unitofMeasure, totalRspValue): FormGroup {
    return this.fb.group({
      energyDrinks: this.fb.control(productKey, [Validators.required]),
      movedgoods: this.fb.control(goodsKey, [Validators.required]),
      quantity: this.fb.control(quantity, [Validators.required, Validators.pattern(this.DecimalPointPattern), Validators.maxLength(25)]),
      unitofMeasure: this.fb.control(unitofMeasure, [Validators.required]),
      totalRspValue: this.fb.control(totalRspValue, [Validators.required, Validators.pattern(this.DecimalPointPattern), Validators.maxLength(25)]),
      resRspValue: this.fb.control(0)
    });
  }
  PurposeChange(val) {
    for (let i = 0; i < this.UsagePurposeList.length; i++) {
    
    
      if (this.UsagePurposeList[i].Key == val) {
        this.TypeProductForm.patchValue({
          'Purpose': this.UsagePurposeList[i].Key
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
  LeasedListChange(value) {
    if (+(value) == 1) {
      this.Ownership = true;
      this.OwnerLeasedName = 'Yes';
      this.warehouseChangeformGroup.patchValue({ 'leasedWarehouse': 1 });

    }
    else {
      this.Ownership = false;
      this.OwnerLeasedName = 'No';
      //this.warehouseChangeformGroup.addControl('leasedWarehouse', new FormControl(this.WholeData.Whlsf, [Validators.required]));
      this.warehouseChangeformGroup.patchValue({ 'leasedWarehouse': 0 });
    }

  }
  warehouseBankInfoFormControls() {
    this.BankGuaranteeInformation = this.fb.group({
      Rows: this.fb.array([]),
      initialBankGuaranteeValue: this.fb.control('')
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
  Back() {

  }
  // ownerIdType(value) {
  //   for (let i = 0; i < this.oIdType1.length; i++) {
  //     if (value == this.oIdType1[i].Key) {
  //       this.Step3OwnerIdTypeName = this.oIdType1[i].Text;
  //       this.ownerNationality1(value);
  //     }
  //   }

  // }
  ownerIdType3(value) {
    if (value == "ZS0003") {
      //this.CountrySetList1=this.CountrySetListDuplicate.filter(data=>{return data. GccFlag=='X'});
    }
    else {
      $("#idWHOwnerValidation").modal("show");
      this.isWHDeclarationInfo = true;
      //this.CountrySetList1=this.CountrySetListDuplicate;
    }
  }
  ownerIdType1(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.OwnerIdTypeName = this.oIdType1[i].Text;
        this.ownerNationality2(value);
      }
    }

    if (this.WarehouseManagerInfoFormControls1.value.idType == "ZS0001") {
      this.OwnerShipCountrySetList = this.CountrySetList;
      this.isWHOwnershipInfo = true;
    }
    else if (this.WarehouseManagerInfoFormControls1.value.idType == "ZS0002") {
      this.OwnerShipCountrySetList = this.CountrySetList;
      this.isWHOwnershipInfo = true;
    }
    else {
      this.isWHOwnershipInfo = false;
      this.OwnerShipCountrySetList = this.CountrySetList.filter(x => x.GccFlag == 'X');
    }

  }
  ownerNationality2(value) {
    if (value == "ZS0003") {
      this.CountrySetList1 = this.CountrySetListDuplicate.filter(data => { return data.GccFlag == 'X' });
    }
    else {
      $("#idWHOwnerValidation").modal("show");
      this.isWHManagerInfo = true;
      this.CountrySetList1 = this.CountrySetListDuplicate;
    }
  }
  ownerNationality1(value) {
    if (value == "ZS0003") {
      this.CountrySetList = this.CountrySetListDuplicate.filter(data => { return data.GccFlag == 'X' });
    }
    else {
      $("#idWHOwnerValidation").modal("show");
      this.isWHOwnershipInfo = true;
      this.CountrySetList = this.CountrySetListDuplicate;
    }
  }
  ownerNationality(value) {
  
    for (let i = 0; i < this.CountrySetList.length; i++) {
      if (value == this.CountrySetList[i].Land1) {
        this.OwnerNationalityName = this.CountrySetList[i].Landx50;
      }
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
  ManagerTitleChange(value) {
    for (let f = 0; f < this.TitleSet.length; f++) {
      if (value == this.TitleSet[f].Title) {
        this.ManagerTitleName = this.TitleSet[f].TitleMedi;
      }
    }
  }
  ManagerDateChange(value) {
    this.HiringDate = this.commonValidation.changeDate2(this.WarehouseManagerInfoFormControls1.value.dateOfHiring);
  }
  ownerIdCRNumber() {
    setTimeout(() => {
      this.warehouseService.getCrno(this.warehouseCompanyFormControl.value.crNo).subscribe(data => {
        if (data) {
        
          this.warehouseCompanyFormControl.patchValue({
            'tin': data["d"]["WoTin"],
            'companyName': data["d"]["Compnm"],
            'address': data["d"]["WoAddress"],
            'phone': data["d"]["TelNumber"]
          })

        }
      }, (error) => {
      
      });
    }, 500)
  }
  AcknowledgementMethod() {
    let fnumb = '0' + this.WholeData.Fbnumz;
    this.warehouseService.acknowledgementform(fnumb).subscribe((data: any) => {

      FileSaver.saveAs(data, "acknowledgement.pdf");

    }, (error) => {
     
    });
  }
  DownloadFormMethod() {
    let fnumb = '0' + this.WholeData.Fbnumz;
    this.warehouseService.downloadfilledform(fnumb).subscribe((data: any) => {

      FileSaver.saveAs(data, "DownloadForm.pdf");

    }, (error) => {
    
    });
  }
  managerIdType(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.ManagerIdTypeName = this.oIdType1[i].Text;
      }
    }
    if (this.WarehouseManagerInfoFormControls1.value.idType == "ZS0001") {
      $("#idValidation").modal("show");
      this.ManagerCountrySetList = this.CountrySetList;
      this.isWHManagerInfo = true;
      this.WarehouseManagerInfoFormControls1.patchValue({
        nationalityOfOwner: 'SA'
      })
    }
    else if (this.WarehouseManagerInfoFormControls1.value.idType == "ZS0002") {
      $("#idValidation").modal("show");
      this.isWHManagerInfo = true;
      this.ManagerCountrySetList = this.CountrySetList;
      this.WarehouseManagerInfoFormControls1.patchValue({
        nationalityOfOwner: ''
      })
    }
    else {
      this.isWHManagerInfo = false;
      this.ManagerCountrySetList = this.CountrySetList.filter(x => x.GccFlag == 'X');
      this.WarehouseManagerInfoFormControls1.patchValue({
        nationalityOfOwner: ''
      })
    }

  }
  ownerIdType(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.Step3OwnerIdTypeName = this.oIdType1[i].Text;
      }
    }
    if (this.WarehouseIdentificationFormControls2.value.idType == "ZS0001") {

      $("#idWHOwnerValidation").modal("show");
      this.OwnerShipCountrySetList = this.CountrySetList;
      this.isWHOwnershipInfo = true;
      this.WarehouseIdentificationFormControls2.patchValue({
        nationality: 'SA'
      })
    }
    else if (this.WarehouseIdentificationFormControls2.value.idType == "ZS0002") {
      //this.WarehouseIsIndividualOwnerShip.disable();
      //this.WarehouseIsIndividualOwnerShip.get("nationality").enable();
      // this.WarehouseIsIndividualOwnerShip.get("idType").enable();
      $("#idWHOwnerValidation").modal("show");
      this.OwnerShipCountrySetList = this.CountrySetList;
      this.isWHOwnershipInfo = true;
      this.WarehouseIdentificationFormControls2.patchValue({
        nationality: ''
      })
    }
    else {
      // this.WarehouseIsIndividualOwnerShip.disable();
      this.WarehouseIdentificationFormControls2.enable();
      this.isWHOwnershipInfo = false;
      this.OwnerShipCountrySetList = this.CountrySetList.filter(x => x.GccFlag == 'X');
      this.WarehouseIdentificationFormControls2.patchValue({
        nationality: ''
      })
    }
  }

  declarationidTypeChange(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.DeclarationIdTypeName = this.oIdType1[i].Text;
      }
    }
    if (this.DeclarationFormControls.value.idType == "ZS0001") {

      $("#idWHDeclarationValidation").modal("show");
      this.isWHDeclarationInfo = true;
    }
    else if (this.DeclarationFormControls.value.idType == "ZS0002") {
      $("#idWHDeclarationValidation").modal("show");
      this.isWHDeclarationInfo = true;

    }
    else {
      this.isWHDeclarationInfo = false;
    }
  }
  //To Validate WHManager Idz
  validateIDz() {
    if (this.WarehouseManagerInfoFormControls1.value.idType !== "ZS0003") {

      let d = this.IdTypeOwnerShipFormgroup.value.Dob["calendarStart"];

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
      this.warehouseService.getUserValidation(obj, currentdate).subscribe(
        (res) => {

          this.WarehouseManagerInfoFormControls1.patchValue({
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
  //To Validate WHOwnerIdz 
  validateWHOwnerIdz() {
    if (this.WarehouseIdentificationFormControls2.value.idType !== "ZS0003") {
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
        type: this.WarehouseIdentificationFormControls2.value.idType,
        idNumber: this.IdTypeOwnerShipFormgroup.value.Idnumber,
      };
      this.warehouseService.getUserValidation(obj, currentdate).subscribe(
        (res) => {
         
          this.WarehouseIdentificationFormControls2.patchValue({
            idNumber: res["d"]["Idnum"]
          });
          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: ''
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

  //To Validate WHDeclarationIdz
  validateWHDeclarationIdz() {
    if (this.DeclarationFormControls.value.idType !== "ZS0003") {

      let d = this.IdTypeOwnerShipFormgroup.value.Dob["calendarStart"];

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
      this.warehouseService.getUserValidation(obj, currentdate).subscribe(
        (res) => {
          

          this.IdTypeOwnerShipFormgroup.patchValue({
            Idnumber: '',
            Dob: ''
          });
         
          this.DeclarationFormControls.patchValue({
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

}