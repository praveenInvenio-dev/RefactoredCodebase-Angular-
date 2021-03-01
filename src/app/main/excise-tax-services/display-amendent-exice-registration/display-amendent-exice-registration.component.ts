import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import { displayamendentconstants } from "src/app/main/excise-tax-services/display-amendent-exice-registration/display-amendent-exiceconstants.model";
import { NotifierService } from "angular-notifier";
import { ExciseTaxServicesService } from '../excise-tax-services.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CommonValidation } from "src/app/constants/commonValidations";
import { VatServiceService } from "src/app/services/vat-service.service";
import { ExciseServiceService } from "src/app/services/excise-service.service";
import { DomSanitizer } from "@angular/platform-browser";
import { CalendarComponent } from "src/app/constants/calendar.component";
declare var $;
@Component({
  selector: 'app-display-amendent-exice-registration',
  templateUrl: './display-amendent-exice-registration.component.html',
  styleUrls: ['./display-amendent-exice-registration.component.css']
})
export class DisplayAmendentExiceRegistrationComponent implements OnInit {
  [x: string]: any;
  ibnErr2: boolean;
  iban: any;
  bankLogo: any;
  bankLogo1: any;
  Step: any = 0;
  GPartz: any;
  Direction: string;
  Language: string;
  CurrentDate = new Date();
  WholeData: any;
  NewIBAN: any;
  dob1: any = "";
  TaxPayerForm: FormGroup = new FormGroup({});
  ExciseTaxForm: FormGroup = new FormGroup({});
  IBANForm: FormGroup = new FormGroup({});
  DeclarationForm: FormGroup = new FormGroup({});
  InstructionsFormGroup: FormGroup = new FormGroup({});
  IdTypeOwnerShipFormgroup: FormGroup;
  DelinkFlag: boolean = false;
  IBANFlag: boolean = false;
  DisableNewIBANFlag: boolean = false;
  StringPattern = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";
  ContactNoPattern = "[5][0-9]{8}";
  // DecimalPointPattern = "/^\d*\.?\d*$/";
  // DecimalPointPattern="[0-9]+(\.[0-9][0-9]?)?";
  DecimalPointPattern = "^[0-9]+(\.[0-9]{1,57})?$";
  NumberPattern = "^[0-9]*$";
  EmailPattern = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
  DimesnionsPattern = "/^-?(0|[1-9]\d*)?$/";
  NationalIdPattern = "[1][0-9]{10}";
  IqamaPattern = "[2][0-9]{10}";
  Step4flag: boolean = false;
  Step2flag: boolean = false;
  Step3flag: boolean = false;
  Step1flag: boolean = false;
  oIdType1: any;
  goodsActv: any;
  rejectionflag: any;
  Dob: string = "";
  id1: string;
  idErr1: boolean;
  idMsg: any;
  vatErr;
  dobErr: boolean;
  dobMsg: any;
  iddErr: boolean;
  Dropdownbindtext() {
    if (this.Language == 'A') {
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
      ],
        this.goodsActv = [
          {
            "key": "",
            "value": "",
            "Flag": "0"
          },
          {
            "key": "01",
            "value": "استيراد السلع الانتقائية",
            "Flag": "0"
          },
          {
            "key": "02",
            "value": "إنتاج السلع الانتقائية",
            "Flag": "0"
          },
          {
            "key": "03",
            "value": "كلا النشاطين",
            "Flag": "0"
          }
        ]

    } else {
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
      ],
        this.goodsActv = [
          {
            "key": "",
            "value": "",
            "Flag": "0"
          },
          {
            "key": "01",
            "value": "Import Excise Goods",
            "Flag": "0"
          },
          {
            "key": "02",
            "value": "Produce Excise goods",
            "Flag": "0"
          },
          {
            "key": "03",
            "value": "Both activities",
            "Flag": "0"
          }
        ]

    }
  }
  CRDropDownList: any = [];
  CRNoSet: any;
  formz: FormGroup;
  formz1: FormGroup;
  checked: boolean;
  NewIBANFlag: boolean;
  GDTYPESetDropDownList: any;
  Goodsarray: any = [];
  GoodsTypeName: string;
  firstcount: number;
  secondcount: number;
  resText: any;
  resText1: any;
  lang: any;
  ibn;
  numErr: boolean = true;
  ibanErr: string;
  ibnErrMsg2: any;
  direction: string;
  private readonly notifier: NotifierService;
  crcount: any = 0;
  GoodsType: string;
  ibnList = [];
  ibnList1 = [];
  newIban = [];
  ibnErr1: boolean;
  decIdTypeName: string;
  headerComponent = CalendarComponent;
  rejectflag: boolean = false;
  constructor(
    private router: Router,
    private exciseTaxServices: ExciseTaxServicesService,
    private ref: ChangeDetectorRef,
    public notifierService: NotifierService,
    public commonValid: CommonValidation,
    private formBuilder: FormBuilder,
    private exciseService: ExciseServiceService,
    public vatService: VatServiceService,
    private sanitizer: DomSanitizer
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
      this.lang = displayamendentconstants.langz.arb.displayamendent;
      this.direction = displayamendentconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = displayamendentconstants.langz.eng.displayamendent;
      this.direction = displayamendentconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
    }
    // ref.detach();
    // setInterval(() => {
    //   this.ref.detectChanges();
    // }, 1000);
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.Dropdownbindtext();
    this.formz = this.formBuilder.group({
      ibn: [""],
    });
    this.formz1 = this.formBuilder.group({
      ibn: [""],
      ValidFrom: this.CurrentDate.toISOString().slice(0, 10)
    });
    this.IdTypeOwnerShipFormgroup = new FormGroup({
      Idnumber: new FormControl('', [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(10), Validators.maxLength(10)]),
      Dob: new FormControl(undefined, [Validators.required]),
    });
    this.getDisplayamendent();
    //this.getDisplayamendent1();
    this.stepsChecking();
    this.InstructionsFormGroup = this.formBuilder.group({
      agree: false,
    });
  }
  isNumberValid() {

    let value = this.IdTypeOwnerShipFormgroup.value.Idnumber[0];

    if (value !== "" && value !== undefined) {
      if (this.DeclarationForm.value.idType == "ZS0001") {
        if (value == "1") {
          this.isNationalEnterValidNumber = false;

        } else {
          this.isNationalEnterValidNumber = true;

        }
      }
      if (this.DeclarationForm.value.idType == "ZS0002") {
        if (value == "2") {
          this.isIqamaEnterValidNumber = false;
        } else {
          this.isIqamaEnterValidNumber = true;
        }
      }

    } else {
      this.isNationalEnterValidNumber = false;
      this.isIqamaEnterValidNumber = false;
    }
  }
  validateWHDeclarationIdz() {
    if (this.DeclarationForm.value.idType !== "ZS0003") {
      this.validateID();
     
      if (this.IdTypeOwnerShipFormgroup.value.Dob === undefined || this.IdTypeOwnerShipFormgroup.value.Dob === null) {
        //this.idErr1 = false;
        this.dobErr = true;
        this.dobMsg = this.lang.step6.t23;
      } else {
        this.dobErr = false;
        this.dobMsg = "";
        console.log("test");
      }
      if (!this.idErr1 && !this.dobErr && this.IdTypeOwnerShipFormgroup.value.Dob) {
        let d = this.IdTypeOwnerShipFormgroup.value.Dob["calendarStart"];
        if (d.day < 10 && d.day.toString().length == 1) {
          d.day = "0" + d.day;
        }
        if (d.month < 10 && d.month.toString().length == 1) {
          d.month = "0" + d.month;
        }
        let currentdate = "" + d.year + d.month + d.day;

        let obj = {
          type: this.DeclarationForm.value.idType,
          idNumber: this.IdTypeOwnerShipFormgroup.value.Idnumber,
        };
        this.exciseTaxServices.getUserValidation(obj, currentdate).subscribe(
          (res) => {
            this.IdTypeOwnerShipFormgroup.patchValue({
              Idnumber: '',
              Dob: undefined
            });
            this.DeclarationForm.patchValue({
              idNumber: res["d"]["Idnum"]
            });
            //this.DeclarationForm.get('idNumber').disable({onlySelf:true});
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
  test() {
    alert('hi');
  }
  clearPopup() {
    this.idErr1 = false;
    this.idMsg = "";
    this.dobErr = false;
    this.dobMsg = "";
    this.isNationalEnterValidNumber = false;
    this.isIqamaEnterValidNumber = false;
    this.IdTypeOwnerShipFormgroup.patchValue({
      Idnumber: '',
      Dob: undefined
    });
    this.DeclarationForm.patchValue({
      Idnumber: ''
    });
  }
  getDisplayamendent() {
    this.exciseTaxServices.getDisplayamendent(this.GPartz, this.Language).subscribe((data) => {
      this.WholeData = data['d'];
      console.log('amendent1:', data['d']);
      this.crcount = this.WholeData.CRDTLSet.results.length;
      this.getDisplayamendent1();
      if (this.WholeData.Statusz == "E0018") {
        this.rejectflag = true;
      }
    }, (err) => {
      $("#aftsubmit").modal("show");
      this.resText = err.error.error.innererror.errordetails[0].message;
      this.resText1 = err.error.error.innererror.errordetails[1].message;
    });
  }
  termsAndConditionsAccept() {
    $('#termsmodal').modal('hide');
    //this.Step = 1;
  }
  resetIban() {
    //this.ibn = "";
    this.newiban = '';
    this.numErr = true;
    this.ibanErr = "";
    this.ibnErrMsg2 = "";
    this.formz.controls["ibn"].setValue("");
    this.formz1.controls["ibn"].setValue("");
  }
  validateibn(value) {
    if (value != "") {
      this.ibnErr2 = false;
    }
    value = value.replace(/\s/g, "");
    value = value.replace(/\|/g, "");
    let first = value.substr(0, 2);
    let last = "";

    first === "SA"
      ? (last = value.substr(2, 24))
      : (last = value.substr(0, 22));
    console.log("vat", last);
    // this.submitted = true;
    let obj = this.commonValid.validateibn2(last);
    if (obj.flag) {
      this.numErr = true;
      this.ibanErr = obj.msg;
    } else {
      // this.validateIbanz(value);
      this.numErr = false;
      this.newiban = "SA" + last;
    }
  }
  transform(val) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(val);
  }
  validateIbanz(value, text) {
    value = this.iban;
    if (value == "") {
      this.ibnErr2 = true;
      this.ibnErrMsg2 = this.lang.step1.t10;
    } else {
      this.vatService.getIBNValidation(value.replace(/\s/g, "")).subscribe(
        (res) => {
          $("#iban").modal("hide");
          this.ibnErr1 = false;
          // this.notifierService.notify("success", this.lang.validIban);
          console.log("resadas", res);
          this.iban = res["d"]["Iban"] || '';
          // this.TaxPayerForm.patchValue({
          //   NewIBAN: this.iban,
          //   ValidFrom: this.CurrentDate.toISOString().slice(0, 10)
          // })
          // this.IBANForm.patchValue({
          //   NewIBAN: ''
          // });
          let lastFiveChars = "...." + this.iban.substr(-4);
          let bankCode = this.iban.substr(4, 2);
          this.ibanCode = this.iban.substr(4, 2);
          this.exciseService.getBankLogo(bankCode).subscribe(
            (res) => {
              let img =
                "data:image/svg+xml;base64," +
                res["d"]["results"][0]["LogoBid"];
              this.bankLogo = this.transform(img);
              let name = res["d"]["results"][0]["Descr"];
              let obj = {
                id: lastFiveChars,
                ibn: this.iban,
                flag: true,
                name: name,
                img: this.transform(img),
              };
              this.ibnList.push(obj);
              for (var i = 0; i < this.ibnList.length; i++) {
                i === this.ibnList.length - 1
                  ? (this.ibnList[i].flag = true)
                  : (this.ibnList[i].flag = false);
              }
            },
            (err) => {
              // this.errorMessage = '';
              // for (let i = 0; i < err.error.error.innererror.errordetails.length - 1; i++) {
              //   this.errorMessage = this.errorMessage + " " + err.error.error.innererror.errordetails[i].message
              // }
              this.notifierService.notify(
                "error",
                err.error.error.innererror.errordetails[0].message
              );
            }
          );
        },
        (err) => {
          if (text == '1') {
            this.notifierService.notify(
              "error",
              err.error.error.innererror.errordetails[0].message
            );
          }
        }
      );
    }
  }
  validateID() {
    if (this.IdTypeOwnerShipFormgroup.value.Idnumber === "" && this.DeclarationForm.value.idNumber === "") {
      this.idErr1 = true;
      this.idMsg = this.lang.step6.t49;
    } else if (this.DeclarationForm.value.idType !== "ZS0003") {
      let id=this.IdTypeOwnerShipFormgroup.value.Idnumber!=undefined?this.IdTypeOwnerShipFormgroup.value.Idnumber:'';
      this.IDtypeValidation1(id);
    } else {
      this.idErr1 = false;
      this.dobErr = false;
      this.iddErr = false;
    }
  }
  // onSubmitf(testForm) {
  //   console.log("TF:", testForm.value);
  //   if (testForm.value.sd !== null && testForm.value.sd !== undefined) {
  //     testForm.resetForm(testForm.value);
  //   }
  // }
  IDtypeValidation1(idNum) {
    let obj = {
      flag: false,
      msg: "",
    };
    obj = this.commonValid.IDtypeValidation(
      this.DeclarationForm.value.idType,
      idNum
    );
    this.idErr1 = obj.flag;
    this.idMsg = obj.msg;
  }
  validateNewIbanz(value, text) {
    value = this.newiban;
    if (value == "") {
      this.ibnErr2 = true;
      this.ibnErrMsg2 = this.lang.step1.t10;
    } else {
      this.vatService.getIBNValidation(value.replace(/\s/g, "")).subscribe(
        (res) => {
          $("#iban").modal("hide");
          this.ibnErr1 = false;
          // this.notifierService.notify("success", this.lang.validIban);
          console.log("resadas", res);
          this.newiban = res["d"]["Iban"] || '';
          this.TaxPayerForm.patchValue({
            NewIBAN: this.newiban,
            ValidFrom: this.CurrentDate.toISOString().slice(0, 10)
          });
          this.WholeData.ChgCbbox1 = "1";
          this.IBANForm.patchValue({
            NewIBAN: ''
          });
          let lastFiveChars = "...." + this.newiban.substr(-4);
          let bankCode = this.newiban.substr(4, 2);
          this.ibanCode1 = this.newiban.substr(4, 2);
          this.exciseService.getBankLogo(bankCode).subscribe(
            (res) => {
              let img =
                "data:image/svg+xml;base64," +
                res["d"]["results"][0]["LogoBid"];
              this.bankLogo1 = this.transform(img);
              let name = res["d"]["results"][0]["Descr"];
              let obj = {
                id: lastFiveChars,
                ibn: this.newiban,
                flag: true,
                name: name,
                img: this.transform(img),
              };
              this.ibnList1.push(obj);
              this.ibnList.forEach(element => {
                element.flag = false;
              })
              for (var i = 0; i < this.ibnList1.length; i++) {
                i === this.ibnList1.length - 1
                  ? (this.ibnList1[i].flag = true)
                  : (this.ibnList1[i].flag = false);
              }
            },
            (err) => {
              // this.errorMessage = '';
              // for (let i = 0; i < err.error.error.innererror.errordetails.length - 1; i++) {
              //   this.errorMessage = this.errorMessage + " " + err.error.error.innererror.errordetails[i].message
              // }
              this.notifierService.notify(
                "error",
                err.error.error.innererror.errordetails[0].message
              );
            }
          );
        },
        (err) => {
          if (text == '1') {
            this.notifierService.notify(
              "error",
              err.error.error.innererror.errordetails[0].message
            );
          }
        }
      );
    }
  }
  getDisplayamendent1() {
    this.exciseTaxServices.getDisplayamendent1(this.GPartz, this.Language).subscribe((data) => {
      console.log('amendent1:', data['d']);
      this.CRDropDownList = data['d']['crddSet']['results'];
      this.GDTYPESetDropDownList = data['d']['GDTYPESet']['results'];
      for (let j = 0; j < this.GDTYPESetDropDownList.length; j++) {
        this.GDTYPESetDropDownList[j].Flag = '0';
      }
      this.GetTPFormmethod();
      this.GetETFormmethod();
    });
  }
  DelinkChange(event, i) {
    if (event.checked == true) {
      this.DelinkFlag = true;
      this.checked = true;
      let date = this.CurrentDate.toISOString().slice(0, 10);

      (this.TaxPayerForm.get('Rows') as FormArray).controls[i].patchValue({
        'CrDeliFg': true,
        'CrFrmDt': date
      })
    }
    else {
      this.DelinkFlag = false;
      this.checked = false;
      let date = null;
      (this.TaxPayerForm.get('Rows') as FormArray).controls[i].patchValue({
        'CrDeliFg': false,
        'CrFrmDt': date
      })
    }
    let count = 0;
    for (let i = 0; i < this.TaxPayerForm.value.Rows.length; i++) {
      if (this.TaxPayerForm.value.Rows[i].CrDeliFg == false) {
        count += 1;
      }
    }
    if (count == 0) {
      if (this.Language == 'E') {
        this.notifier.notify('error', 'Minimum of 1 CR Should be Maintained');
      }
      else {
        this.notifier.notify('error', 'يجب إضافة بسجل تجاري واحد كحد أدنى');
      }
    }
  }
  DelimitClickExicegoods(event, i) {
    if (event.checked == true) {
      let date = this.CurrentDate.toISOString().slice(0, 10);
      (this.ExciseTaxForm.get('Rows') as FormArray).controls[i].patchValue({
        'GdtyDelimitFg': true,
        'GdtyDelimitDt': date
      })
    }
    else {
      let date = null;
      (this.ExciseTaxForm.get('Rows') as FormArray).controls[i].patchValue({
        'GdtyDelimitFg': false,
        'GdtyDelimitDt': date
      })
    }
    let count = 0;
    for (let i = 0; i < this.ExciseTaxForm.value.Rows.length; i++) {
      if (this.ExciseTaxForm.value.Rows[i].GdtyDelimitFg == false) {
        count += 1;
      }
    }
    if (count == 0) {
      if (this.Language == 'E') {
        this.notifier.notify('error', 'Minimum of 1 Goods Should be Maintained');
      }
      else {
        this.notifier.notify('error', 'يجب اضافة بسلعة واحدة على الأقل');
      }
    }
  }
  stepsChecking() {
    switch (this.Step) {
      case 0:
        this.TaxPayerFormControls();
        this.IBANFormControls();
        this.ExciseTaxFormControls();

        break;
      case 1:
        // this.TaxPayerFormControls();
        // this.IBANFormControls();
        break;
      case 2:
        // this.ExciseTaxFormControls();
        break;
      case 3:
        break;
      default:
        break;
    }
    return this.Step;
  }
  CRChange(value) {
    // for (let j = 0; j < this.CRDropDownList?.length; j++) {
    //   if (this.CRDropDownList[j].CrNo == value) {
    //     this.CRDropDownList[j].CrActFg = "1";
    //   }
    // }
  }
  GoodsChange(value, index) {
    let control = <FormArray>this.ExciseTaxForm.controls['Rows'];
    for (let j = 0; j < this.GDTYPESetDropDownList.length; j++) {
      if (this.GDTYPESetDropDownList[j].GoodsTyp == value) {
        this.GDTYPESetDropDownList[j].Flag = '1';
        //this.GDTYPESetDropDownList=this.GDTYPESetDropDownList.filter(x=>x.GoodsTyp !=this.WholeData.GOODTYPESSet.results[i].GoodsTyp);
      }
    }
    let types = this.GDTYPESetDropDownList;
    for (let k = 0; k < control.value.length; k++) {
      types = types.filter(x => x.GoodsTyp != control.value[k].GoodsTxt);
    }
    for (let j = 0; j < this.GDTYPESetDropDownList.length; j++) {
      for (let k = 0; k < types.length; k++) {
        if (this.GDTYPESetDropDownList[j].GoodsTyp == types[k].GoodsTyp) {
          this.GDTYPESetDropDownList[j].Flag = '0';
        }
      }
    }
  }
  GetETFormmethod() {
    this.ExciseTaxForm.patchValue({
      ExcActvt: this.WholeData.ExcActvt,
      NewExcActvt: (this.WholeData.NewExcActvt != undefined && this.WholeData.NewExcActvt != '00') ? this.WholeData.NewExcActvt : '',
      ExcActvtFrDt: (this.WholeData.ExcActvtFrDt != null && this.WholeData.ExcActvtFrDt != '' && this.WholeData.ExcActvtFrDt != undefined) ? this.WholeData.ExcActvtFrDt : this.CurrentDate.toISOString().slice(0, 10),
    });
    let goodsType;
    for (let k = 0; k < this.goodsActv.length; k++) {
      if (this.WholeData.ExcActvt == this.goodsActv[k].key) {
        this.goodsActv[k].Flag = "1"
        this.GoodsTypeName = this.goodsActv[k].value;
      }
    }
    for (let i = 0; i < this.WholeData.GOODTYPESSet.results.length; i++) {
      for (let j = 0; j < this.GDTYPESetDropDownList.length; j++) {
        if (this.GDTYPESetDropDownList[j].GoodsTyp == this.WholeData.GOODTYPESSet.results[i].GoodsTyp) {
          goodsType = this.GDTYPESetDropDownList[j].GoodsTyp;
          this.GDTYPESetDropDownList[j].Flag = '1';
          //this.GDTYPESetDropDownList=this.GDTYPESetDropDownList.filter(x=>x.GoodsTyp !=this.WholeData.GOODTYPESSet.results[i].GoodsTyp);
        }
      }
      let date;
      let delinkflag = this.WholeData.GOODTYPESSet.results[i].GdtyDelimitFg == "1" ? true : false;
      if (delinkflag == true) {
        if (this.WholeData.GOODTYPESSet.results[i].GdtyDelimitDt !== undefined && this.WholeData.GOODTYPESSet.results[i].GdtyDelimitDt !== "" && this.WholeData.GOODTYPESSet.results[i].GdtyDelimitDt !== null) {
          if (this.WholeData.GOODTYPESSet.results[i].GdtyDelimitDt.includes('/Date')) {
            date = new Date(+this.WholeData.GOODTYPESSet.results[i].GdtyDelimitDt.substr(6, 13)).toISOString().slice(0, 10);
          }
          else {
            date = this.WholeData.GOODTYPESSet.results[i].GdtyDelimitDt;
          }
        } else {
          date = this.CurrentDate.toISOString().slice(0, 10);
        }
        //date = this.WholeData.GOODTYPESSet.results[i].GdtyDelimitDt == null ? moment(this.CurrentDate).format("YYYY-MM-DD") : moment(this.WholeData.GOODTYPESSet.results[i].GdtyDelimitDt).format("YYYY-MM-DD");
      }
      else {
        date = null;
      }
      this.formArr().push(this.initRows(delinkflag, goodsType, date, '1'));
    }
    this.GoodsTypes = '';
    for (let i = 0; i < this.ExciseTaxForm.value.Rows.length; i++) {
      for (let j = 0; j < this.GDTYPESetDropDownList?.length; j++) {
        if (this.GDTYPESetDropDownList[j].GoodsTyp == this.ExciseTaxForm.value.Rows[i].GoodsTxt) {
          if (i < this.ExciseTaxForm.value.Rows.length - 1) {
            this.GoodsTypes += this.GDTYPESetDropDownList[j].GoodsTxt + ",";
          }
          else {
            this.GoodsTypes += this.GDTYPESetDropDownList[j].GoodsTxt
          }
        }
      }
    }
  }
  GetTPFormmethod() {
    let goodsType;
    this.TaxPayerForm.patchValue({
      TINNo: this.WholeData.Gpart,
      IBAN: this.WholeData.Iban,
      NewIBAN: this.WholeData.NewIban,
      ValidFrom: this.WholeData.IbanFrDt,
      ComercialName: this.WholeData.NameOrg2
    })

    if (this.WholeData.Iban) {
      // this.NewIBANFlag = false;
      // this.IBANFlag = true;
      // this.DisableNewIBANFlag = false;
      this.iban = this.WholeData.Iban;
      this.validateIbanz(this.WholeData.Iban, '0');
    }
    else {
      //this.NewIBANFlag = true;
    }
    for (let i = 0; i < this.WholeData.CRDTLSet.results.length; i++) {
      for (let j = 0; j < this.CRDropDownList?.length; j++) {
        if (this.CRDropDownList[j].CrNo == this.WholeData.CRDTLSet.results[i].CrNo) {
          this.CRDropDownList[j].CrActFg = "1";
        }
      }
      let delinkflag = false;
      this.formArrTPForm().push(this.initRowsTPForm(delinkflag, this.WholeData.CRDTLSet.results[i].CrNo, null, '1'));
    }

    this.declarationIdType(this.WholeData.Type);
  }
  DeleteCrNo(index) {
    let control = <FormArray>this.TaxPayerForm.controls['Rows'];
    control.removeAt(index);
    this.crcount -= 1;
  }
  DeleteExciseGoods(index) {
    let control = <FormArray>this.ExciseTaxForm.controls['Rows'];
    for (let j = 0; j < this.GDTYPESetDropDownList.length; j++) {
      if (this.GDTYPESetDropDownList[j].GoodsTyp == control.value[index].GoodsTxt) {
        this.GDTYPESetDropDownList[j].Flag = '0';
        //this.GDTYPESetDropDownList=this.GDTYPESetDropDownList.filter(x=>x.GoodsTyp !=this.WholeData.GOODTYPESSet.results[i].GoodsTyp);
      }
    }
    control.removeAt(index);
  }
  AddNewTPRow() {
    this.formArrTPForm().push(this.initRowsTPForm(false, '', null, '0'));
    this.crcount += 1;
  }
  AddNewRow() {
    this.formArr().push(this.initRows(false, '', null, '0'));
  }
  declarationIdType(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.decIdTypeName = this.oIdType1[i].Text;
      }
    }
    // if (this.DeclarationForm.value.idType == "ZS0001") {
    //   this.IdTypeOwnerShipFormgroup.get('Idnumber').clearValidators();
    //   this.IdTypeOwnerShipFormgroup.get('Idnumber').updateValueAndValidity();
    //   this.IdTypeOwnerShipFormgroup.get('Idnumber').setValidators([Validators.required, Validators.pattern(this.NationalIdPattern)]);
    //   this.IdTypeOwnerShipFormgroup.get('Idnumber').updateValueAndValidity();
    // }
    // else {
    //   this.IdTypeOwnerShipFormgroup.get('Idnumber').clearValidators();
    //   this.IdTypeOwnerShipFormgroup.get('Idnumber').updateValueAndValidity();
    //   this.IdTypeOwnerShipFormgroup.get('Idnumber').setValidators([Validators.required, Validators.pattern(this.IqamaPattern)]);
    //   this.IdTypeOwnerShipFormgroup.get('Idnumber').updateValueAndValidity();
    // }
  }
  declarationIdType1(value) {
    for (let i = 0; i < this.oIdType1.length; i++) {
      if (value == this.oIdType1[i].Key) {
        this.decIdTypeName = this.oIdType1[i].Text;
      }
    }
    this.DeclarationForm.patchValue({
      idNumber: ''
    });
    this.IdTypeOwnerShipFormgroup.patchValue({
      Dob: undefined
    });
    if (this.DeclarationForm.value.idType == "ZS0001" || this.DeclarationForm.value.idType == "ZS0002") {
      $("#idWHDeclarationValidation").modal("show");
      // if (this.DeclarationForm.value.idType == "ZS0001") {
      //   this.WarehouseDimensions.get('Idnumber').clearValidators();
      //   this.WarehouseDimensions.get('Idnumber').updateValueAndValidity();
      //   this.IdTypeOwnerShipFormgroup.get('Idnumber').setValidators([Validators.required, Validators.pattern(this.NationalIdPattern)]);
      //   this.IdTypeOwnerShipFormgroup.get('Idnumber').updateValueAndValidity();
      // }
      // else {
      //   this.WarehouseDimensions.get('Idnumber').clearValidators();
      //   this.WarehouseDimensions.get('Idnumber').updateValueAndValidity();
      //   this.IdTypeOwnerShipFormgroup.get('Idnumber').setValidators([Validators.required, Validators.pattern(this.IqamaPattern)]);
      //   this.IdTypeOwnerShipFormgroup.get('Idnumber').updateValueAndValidity();
      // }
    }
    else {
      this.DeclarationForm.patchValue({
        idNumber: ''
      });

    }
  }
  //To allow numbers only in inputs
  NumberAllow(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 32)) {
      return false;
    }
  }
  declarationInfo() {
    this.DeclarationForm.addControl('contactName', new FormControl(this.WholeData.Decname, [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]));
    this.DeclarationForm.addControl('designation', new FormControl(this.WholeData.Decdesignation, [Validators.required, Validators.pattern(this.StringPattern), Validators.maxLength(40)]));
    this.DeclarationForm.addControl('idType', new FormControl(this.WholeData.Type, [Validators.required]));
    this.DeclarationForm.addControl('idNumber', new FormControl(this.WholeData.Idnumber, [Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(7), Validators.maxLength(15)]));
    this.DeclarationForm.addControl('agree', new FormControl(true, [Validators.required]));
    this.DeclarationForm.addControl('validfrom', new FormControl(this.CurrentDate.toISOString().slice(0, 10), [Validators.required]));
  }
  Step1() {
    let count = 0;
    for (let i = 0; i < this.TaxPayerForm.value.Rows.length; i++) {
      if (this.TaxPayerForm.value.Rows[i].CrDeliFg == false) {
        count += 1;
      }
    }
    if (count == 0) {
      if (this.Language == 'E') {
        this.notifier.notify('error', 'Minimum of 1 CR Should be Maintained');
      }
      else {
        this.notifier.notify('error', 'يجب إضافة بسجل تجاري واحد كحد أدنى');
      }
    }
    else {
      this.Step = 2;
    }
    if (this.firstcount != 1) {
      //this.ExciseTaxFormControls();
      // this.GetETFormmethod();
      this.firstcount = 1;
    }
    this.Step2flag = true;
    this.Step1flag = true;
  }
  Step2() {
    let count = 0;
    for (let i = 0; i < this.ExciseTaxForm.value.Rows.length; i++) {
      if (this.ExciseTaxForm.value.Rows[i].GdtyDelimitFg == false) {
        count += 1;
      }
    }
    if (count == 0) {

      if (this.Language == 'E') {
        this.notifier.notify('error', 'Minimum of 1 Goods Should be Maintained');
      }
      else {
        this.notifier.notify('error', 'يجب اضافة بسلعة واحدة على الأقل');
      }
    }
    else {
      if (this.rejectflag == true) {
        this.Step = 4;
      }
      else {
        this.Step = 3;
      }

    }
    if (this.secondcount != 1) {
      this.declarationInfo();
      this.secondcount = 1;
    }
    this.Step3flag = true;
    this.GoodsType = '';
    for (let i = 0; i < this.ExciseTaxForm.value.Rows.length; i++) {
      for (let j = 0; j < this.GDTYPESetDropDownList?.length; j++) {
        if (this.GDTYPESetDropDownList[j].GoodsTyp == this.ExciseTaxForm.value.Rows[i].GoodsTxt) {
          if (i < this.ExciseTaxForm.value.Rows.length - 1) {
            this.GoodsType += this.GDTYPESetDropDownList[j].GoodsTxt + ",";
          }
          else {
            this.GoodsType += this.GDTYPESetDropDownList[j].GoodsTxt
          }
        }
      }
    }
  }
  Step3() {
    this.Step = 4;
    this.Step4flag = true;
  }
  back() {
    if (this.rejectflag == true) {
      this.Step = 2;
    }
    else {
      this.Step = 3;
    }
  }
  ExciseTaxFormControls() {
    this.ExciseTaxForm = this.formBuilder.group({
      ExcActvt: this.formBuilder.control(''),
      NewExcActvt: this.formBuilder.control(''),
      ExcActvtFrDt: this.formBuilder.control(null),
      Rows: this.formBuilder.array([])
    });
  }
  TaxPayerFormControls() {
    this.TaxPayerForm = this.formBuilder.group({
      TINNo: this.formBuilder.control(''),
      IBAN: this.formBuilder.control(''),
      NewIBAN: this.formBuilder.control(''),
      ValidFrom: this.formBuilder.control(''),
      ComercialName: this.formBuilder.control(''),
      Rows: this.formBuilder.array([])
    });
  }
  IBANFormControls() {
    this.IBANForm = this.formBuilder.group({
      NewIBAN: this.formBuilder.control('', [Validators.required])
    });
  }
  // AddIBANMethod() {
  //   this.TaxPayerForm.patchValue({
  //     NewIBAN: this.IBANForm.value.NewIBAN,
  //     ValidFrom: this.CurrentDate.toISOString().slice(0, 10)
  //   })
  //   // this.IBANFlag = true;
  //   // this.NewIBANFlag = false;
  //   // this.DisableNewIBANFlag = true;
  //   this.IBANForm.patchValue({
  //     NewIBAN: ''
  //   })
  //   $('#iban').modal('hide');
  // }
  DeleteIBAN() {
    this.TaxPayerForm.patchValue({
      IBAN: '',
      NewIBAN: ''
    });
    this.ibnList.forEach(element => {
      element.flag = true;
    })
    this.ibnList1.pop();
    this.newiban = '';
    //this.bankLogo=null;
  }

  formArr(): FormArray {
    return this.ExciseTaxForm.get("Rows") as FormArray;
  }
  formArrTPForm(): FormArray {
    return this.TaxPayerForm.get("Rows") as FormArray;
  }
  initRowsTPForm(CrDeliFg, CrNo, CrFrmDt, flag): FormGroup {
    return this.formBuilder.group({
      CrDeliFg: this.formBuilder.control(CrDeliFg),
      CrNo: this.formBuilder.control(CrNo, [Validators.required]),
      CrFrmDt: this.formBuilder.control(CrFrmDt),
      Flag: this.formBuilder.control(flag)
    });
  }
  initRows(GdtyDelimitFg, GoodsTxt, GdtyDelimitDt, flag): FormGroup {
    return this.formBuilder.group({
      GdtyDelimitFg: this.formBuilder.control(GdtyDelimitFg),
      GoodsTxt: this.formBuilder.control(GoodsTxt, [Validators.required]),
      GdtyDelimitDt: this.formBuilder.control(GdtyDelimitDt),
      Flag: this.formBuilder.control(flag)
    });
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
  Back() {
    this.router.navigate(['/mains/tax']);
  }
  Save() {
    this.WholeData.ExcActvt = this.ExciseTaxForm.value.ExcActvt;
    this.WholeData.NewExcActvt = this.ExciseTaxForm.value.NewExcActvt;
    this.WholeData.ExcActvtFrDt = this.CurrentDate.toISOString().slice(0, 16);
    let control = <FormArray>this.ExciseTaxForm.controls['Rows'];
    this.WholeData.GOODTYPESSet.results = [];
    let control1 = <FormArray>this.TaxPayerForm.controls['Rows'];

    for (let i = 0; i < control.value.length; i++) {
      let goodstxt = this.GDTYPESetDropDownList.filter(x => x.GoodsTyp == control.value[i].GoodsTxt);
      this.WholeData.GOODTYPESSet.results.push({
        DataVersion: "00001",
        FormGuid: "005056B1365C1EDB91B9130CE4E552BF",
        GdtyChgFg: "",
        GdtyDelimitDt: (control.value[i].GdtyDelimitDt == null) ? null : this.CurrentDate.toISOString().slice(0, 16),
        GdtyDelimitDtC: "",
        GdtyDelimitFg: (control.value[i].GdtyDelimitFg == true) ? '1' : '0',
        GoodsTxt: goodstxt[0].GoodsTxt,
        GoodsTyp: control.value[i].GoodsTxt,
        LineNo: i + 1,
        Mandt: "210",
        RankingOrder: "99"
      });
    }
    this.WholeData.CRDTLSet.results = [];
    for (let j = 0; j < control1.value.length; j++) {
      this.WholeData.CRDTLSet.results.push({
        CrActFg: "",
        CrChgFg: "",
        CrDeliFg: (control1.value[j].CrDeliFg == true) ? '1' : '',
        CrFrmDt: (control1.value[j].CrFrmDt == null) ? null : this.CurrentDate.toISOString().slice(0, 16),
        CrFrmDtC: "G",
        CrNm: "",
        CrNo: control1.value[j].CrNo,
        DataVersion: "00001",
        FormGuid: "005056B1365C1EDB91B9130CE4E532BF",
        LineNo: j + 1,
        Mandt: "210",
        RankingOrder: "99"
      });
    }

    this.WholeData.Gpart = this.TaxPayerForm.value.TINNo;
    //this.WholeData.Iban = this.TaxPayerForm.value.IBAN;
    this.WholeData.Iban = '';
    this.WholeData.NewIban = this.TaxPayerForm.value.NewIBAN;
    this.WholeData.IbanFrDt = (this.TaxPayerForm.value.ValidFrom != null) ? this.CurrentDate.toISOString().slice(0, 16) : null;
    this.WholeData.NameOrg2 = this.TaxPayerForm.value.ComercialName;
    const Declaration = this.DeclarationForm.value;
    let agree = this.agreeBooleanValueCheck(this.DeclarationForm.value.agree);
    this.WholeData.Decname = Declaration.contactName;
    this.WholeData.Decdesignation = Declaration.designation;
    this.WholeData.Type = Declaration.idType;
    this.WholeData.Idnumber = Declaration.idNumber;
    this.WholeData.Decfg = agree;
    this.WholeData.Decdate = this.CurrentDate.toISOString().slice(0, 16);
    this.WholeData.Operationz = '01';
    this.exciseTaxServices.SaveDisplayamendent(this.WholeData).subscribe(data => {
      if (data) {
        this.WholeData = data["d"] || '';
        this.Step = 5;
      }
    }, (err) => {
      // this.errorMessage = '';
      // for (let i = 0; i < err.error.error.innererror.errordetails.length - 1; i++) {
      //   this.errorMessage = this.errorMessage + " " + err.error.error.innererror.errordetails[i].message
      // }
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
    });
  }
  AcknowledgementMethod() {
    let fnumb = '0' + this.WholeData.Fbnumz;
    this.exciseTaxServices.acknowledgmentdownload(fnumb).subscribe((data: any) => {
      FileSaver.saveAs(data, this.WholeData.Fbnumz + ".pdf");
    }, (error) => {
      console.log('err-2', error);
    });
  }

  // DownloadFormMethod() {
  //   let fnumb = '0' + this.WholeData.Fbnumz;
  //   this.wareHousesService.downloadfilledform(fnumb).subscribe((data: any) => {

  //     FileSaver.saveAs(data, "DownloadForm.pdf");

  //   }, (error) => {
  //     console.log('err-2', error);
  //   });
  // }

  isNumberKey(event) {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
    // let charCode = (event.which) ? event.which : event.keyCode;
    // if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 32)) {
    //   return false;
    // }
  };
}
