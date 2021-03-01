import { AppService } from "src/app/app.service";
import { Component, OnInit, HostListener } from "@angular/core";
import { constants } from "src/app/constants/constants.model";
import { SignupService } from "src/app/services/signup.service";
import { CommonValidation } from "src/app/constants/commonValidations";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription, interval, of } from "rxjs";
import {
  NgbCalendar,
  NgbDatepickerI18n,
  NgbCalendarIslamicCivil,
  NgbCalendarGregorian,
} from "@ng-bootstrap/ng-bootstrap";

import { CalendarComponent } from "src/app/constants/calendar.component";

import { NotifierService } from "angular-notifier";
import { Router } from "@angular/router";
import { VatServiceService } from "src/app/services/vat-service.service";

declare var $: any;
@Component({
  selector: "app-individuals-sign-up",
  templateUrl: "./individuals-sign-up.component.html",
  styleUrls: ["./individuals-sign-up.component.css"],
})
export class IndividualsSignUpComponent implements OnInit {
  headerComponent = CalendarComponent;
  individualDto1 = [];
  currentTab: any;
  individualDto = new IndividualDto();
  individualDto2 = new IndividualDto();
  defaultValue: number = 1;
  showOne: boolean = false;
  showTwo: boolean = false;
  datz;
  lang;
  direction;
  idTypes = [];
  errMsgs;
  taxDetailForm: FormGroup;
  otp = [];
  url = "/signup";
  // lang = constants.langz.eng.individual;
  // direction = constants.langz.eng.dir;
  show: boolean = false;
  innerWidth: number;
  submitted1: boolean;
  bDate: Date;
  idErr: boolean = false;
  idMsg: string;
  showVerification: boolean = false;
  enableResendButton: Boolean = false;
  tin: any;
  backgroundImg: any;
  backgroundImg1: any;
  counterSubscription: Subscription;
  counter: number = 60;
  retryCount = 1;
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  dateForOTP: any;
  mobileNum;
  otpRespObj: Object;
  otpRespObj1: Object;
  optRed: Object;
  optionActive: number;
  showGcc: boolean = false;
  idTErr: boolean = false;
  dobErr: boolean = false;
  IDErrz: any;
  mErr: boolean = false;
  emailErr: boolean = true;
  btn: boolean = false;
  resend: boolean = false;

  minFromDate = new Date(2020 - 10, 0, 1);
  minDate: Date;
  maxDate2: Date;
  caseuid: any;
  dataErr: boolean = false;
  dataMsg: string;
  nameErr: boolean;
  nameMsg: string;
  cityErr: boolean;
  cityMsg: string;
  dErr: boolean;
  dMsg: string;
  sErr: boolean;
  sMsg: string;
  zErr: boolean;
  zMsg: string;
  bErr: boolean;

  bMsg: string;
  uErr: boolean;
  uMsg: string;
  msErr: boolean;
  msMsg: string;
  eErr: boolean;
  eMsg: string;
  nameErr1: boolean = false;
  nameErr2: boolean = false;
  nameErr3: boolean = false;
  nameErr4: boolean = false;
  nameErr5: boolean = false;
  nameErr6: boolean = false;
  nameErr7: boolean = false;
  nameErr8: boolean = false;
  nameErr9: boolean = false;
  codes: any;
  cncode = "966";
  nameErr10: boolean = false;
  ceMsg: string;
  maxLength = 10;
  indErr: any;
  idtype: String;
  mobile: String = "";
  showc1: boolean = false;
  showc2: boolean = false;
  dateMsg: any;
  resendObj: any;
  dobErr1: boolean;
  cityList = [];
  htmlStr: any;
  tpinfo: any;
  opens: boolean = false;
  no = "";
  name = "";
  type = "individual";
  type2 = "ZVTI";
  nameVal: boolean;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    // console.log("soze", this.innerWidth)
  }

  constructor(
    public vatService: VatServiceService,
    public appSrv: AppService,
    public signupService: SignupService,
    public commonVaidation: CommonValidation,
    public sanitizer: DomSanitizer,
    private fb: FormBuilder,
    public NgbCalendarz: NgbCalendar,
    public notifierService: NotifierService,
    private router: Router,
    public commonValid: CommonValidation
  ) {
    this.criteria = {
      property: "CityCode",
      descending: false,
    };
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(1990 - 10, 0, 1);
    this.maxDate2 = new Date(currentYear + 5, 11, 31);
  }
  private jdn = 2352861; // Julian Day Number of October 24th 1729 (Gregorian calendar)
  startDate; // create Gregorian calendar date from given Julian Day Number
  enddate;
  criteria: any;

  ngOnInit(): void {
    // Math.round((2020 - 622) * (33 / 32));
    // const a = Math.round(toJulianDate(new Date("2020-10-24")));
    // const b = Math.round(toJulianDate(new Date("2020-08-01")));
    // const c = Math.round(toJulianDate(new Date("2020-12-24")));
    // this.datz = new GregorianCalendarDate(new JDNPeriod(a, a));
    // this.startDate = this.commonVaidation.toJulianDate(new Date("2020-08-01"));
    // this.enddate = new GregorianCalendarDate(new JDNPeriod(c, c));
    this.appSrv.getPhoneCode().subscribe((res) => {
      console.log(res);
      this.codes = res["d"]["results"];
      this.codes.forEach((item) => {
        item["maxLength"] = 13 - item.Telefto.length;
      });
      console.log("countru", this.codes);
    });

    this.appSrv.data1.subscribe(
      (res) => {
        console.log("test1", res);
        this.datz = this.commonVaidation.dateFormate(
          this.commonVaidation.toJulianDate(new Date("2020-10-24")),
          res
        );
        this.startDate = this.commonVaidation.dateFormate(
          this.commonVaidation.toJulianDate(new Date("1900-01-01")),
          res
        );
        let dateObj = new Date();
        dateObj.setDate(dateObj.getDate() - 1);
        this.enddate = this.commonVaidation.dateFormate(
          this.commonVaidation.toJulianDate(dateObj),
          res
        );
        const tst = this.commonVaidation.dateFormate(this.startDate, res);
        this.individualDto2.Birthdt = null;
        console.log("sds", tst);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );

    // this.appSrv.data1.subscribe((res) => {
    //   console.log("test1", res);
    //   this.datz = this.commonVaidation.dateFormate(new Date("2020-10-24"), res);
    //   this.startDate = this.commonVaidation.dateFormate(new Date("2020-08-01"), res);
    //   this.enddate = this.commonVaidation.dateFormate(new Date("2020-12-24"), res);
    //   const tst = this.commonVaidation.dateFormate(this.startDate, res);
    //   console.log("sds", tst);
    // });
    this.optionActive = 1;

    this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(
      "url('assets/images/3@2x.png')"
    );
    this.backgroundImg1 = this.sanitizer.bypassSecurityTrustStyle(
      "url('assets/images/4@2x.png')"
    );

    // this.appSrv.getOTP().subscribe((res) => {
    //   let otp = "0106";
    //   console.log("Individual Component :: ", res);
    //   this.appSrv.getOTP(otp).subscribe((res) => {
    //     console.log("Individual Component - OTP Validation :: ", res);
    //   });
    // });
    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.individual;
      this.errMsgs = constants.langz.arb.errorMsgs;
      this.IDErrz = constants.langz.arb.vatError;
      this.direction = constants.langz.arb.dir;
      this.idTypes = constants.langz.arb.idTypes;
      this.indErr = constants.langz.arb.individual.indErr;
      this.criteria.property = "CityName";
    } else {
      this.lang = constants.langz.eng.individual;
      this.direction = constants.langz.eng.dir;
      this.errMsgs = constants.langz.eng.errorMsgs;
      this.idTypes = constants.langz.eng.idTypes;
      this.IDErrz = constants.langz.eng.vatError;
      this.indErr = constants.langz.eng.individual.indErr;
      this.criteria.property = "CityName";
    }

    this.taxDetailForm = this.fb.group({
      Type: ["", Validators.required],
      Idnumber: ["", Validators.required],
      dob: ["", Validators.required],
    });

    this.appSrv.getCityList().subscribe((res) => {
      this.cityList = res["d"]["city_dropdownSet"]["results"];
      this.cityList.shift();
      this.cityList.forEach((ele) => {
        ele.CityName = ele.CityName.toUpperCase();
      });

      for (var i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i].CityCode === "10") {
          this.cityList.splice(i, 1);
        }
      }
      for (var i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i].CityCode === "2400") {
          this.cityList.splice(i, 1);
        }
      }

      //this.cityList = this.cityList.sort((a, b) => b.CityName < a.CityName ? 1: -1);
      console.log("this.city", this.cityList);
    });

    // this.vatService.getSignupTermsAndConditions().subscribe((res) => {
    //   console.log("res", res);

    // });

    // this.taxDetailForm.get("dob").valueChanges.subscribe((d) => {
    //   console.log(d);
    //   d.day < 10 ? (d.day = "0" + d.day) : d.day;
    //   d.month < 10 ? (d.month = "0" + d.month) : d.month;
    //   // To BE passed as YYYY-MM-DDT00:00:00 to get response from OTP API
    //   this.dateForOTP = d.year + "-" + d.month + "-" + d.day + "T00:00:00";
    //   console.log(this.dateForOTP);
    // });
  }

  getdatazaa() {
    this.appSrv.data1.subscribe((res) => {
      console.log("test", res);
    });
  }

  ngDoCheck(): void {
    // if (this.counter === 0) {
    //   this.counterSubscription.unsubscribe();
    //   this.enableResendButton = true;
    // }
  }

  get f1() {
    return this.taxDetailForm.controls;
  }

  getAddress(type, id) {
    this.signupService.getAddress(type, id).subscribe(
      (res) => {
        console.log("Address", res);
        //this.individualDto = res["d"]["results"][0];
        if (res["d"]["results"].length === 1) {
          this.individualDto1 = [];
          res["d"]["results"].forEach((element) => {
            element["flag"] = true;

            this.individualDto1.push(element);
          });
          this.pushData();
        } else {
          res["d"]["results"].forEach((element) => {
            element["flag"] = false;
            this.individualDto1.push(element);
          });
          this.open();
        }

        // this.individualDto1[1]=  this.individualDto1[0]
        // for(var i=0;i<2;i++){
        //   let obj={
        //     flag:false,
        //     name:''
        //   }
        //   if(i==0){
        //     obj.flag = true;
        //     obj.name = i+"name";
        //    this.individualDto1.push(obj)
        //   }else{
        //     obj.flag = false;
        //     obj.name = i+"name";
        //    this.individualDto1.push(obj)
        //   }
        // }

        console.log("asasas", this.individualDto1);
        //this.open();
      },
      (err) => {
        if (
          err.error.error.innererror.errordetails[0].message ===
          "An exception was raised"
        ) {
        } else {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }

        this.pushData();
      }
    );
  }

  open() {
    $("#address").modal("show");
  }

  backClick(id) {
    // if (id === 1) {
    //   this.individualDto2.IdType = "";
    //   if (this.individualDto.IdType === "National ID") {
    //     this.individualDto2.IdType = "ZS0001";
    //   }
    //   if (this.individualDto.IdType === "Iqama ID") {
    //     this.individualDto2.IdType = "ZS0002";
    //   }
    //   if ((this.individualDto.IdType = "GCC ID")) {
    //     this.individualDto2.IdType = "ZS0003";
    //   }
    // }

    if (id === 2) {
      if (this.individualDto2.IdType === "ZS0001") {
        this.direction === "rtl"
          ? (this.individualDto.IdType = "الهوية الوطنية")
          : (this.individualDto.IdType = "National ID");
      }
      if (this.individualDto2.IdType === "ZS0002") {
        this.direction === "rtl"
          ? (this.individualDto.IdType = "الإقامة")
          : (this.individualDto.IdType = "Iqama ID");
      }
      if (this.individualDto2.IdType === "ZS0003") {
        this.direction === "rtl"
          ? (this.individualDto.IdType = "هوية مواطني دول الخليج")
          : (this.individualDto.IdType = "GCC ID");
      }
    }
    if (id === 1) this.individualDto2.IdType = this.idtype;
    //this.individualDto2.IdType = this.individualDto.IdType;
    console.log("value", id, this.individualDto2.IdType);
    if (id <= this.currentTab && !this.show) {
      this.optionActive = id;
    }
  }

  pushData() {
    console.log(this.individualDto2);
    this.idtype = this.individualDto2.IdType;
    console.log(this.idtype);
    let count = 0;
    this.individualDto = new IndividualDto();

    if (this.individualDto1.length <= 0) {
      if (this.individualDto2.IdType === "ZS0001") {
        this.direction === "rtl"
          ? (this.individualDto.IdType = "الهوية الوطنية")
          : (this.individualDto.IdType = "National ID");
      }
      if (this.individualDto2.IdType === "ZS0002") {
        this.direction === "rtl"
          ? (this.individualDto.IdType = "الإقامة")
          : (this.individualDto.IdType = "Iqama ID");
      }
      if (this.individualDto2.IdType === "ZS0003") {
        this.direction === "rtl"
          ? (this.individualDto.IdType = "هوية مواطني دول الخليج")
          : (this.individualDto.IdType = "GCC ID");
      }
      this.individualDto.IdNumber = this.individualDto2.IdNumber;
      this.individualDto.Name = "";
      this.individualDto.email = "";
    } else {
      this.individualDto1.forEach((item) => {
        if (item.IdType === "ZS0003") {
          this.individualDto = item;
          if (this.individualDto2.IdType === "ZS0001") {
            this.direction === "rtl"
              ? (this.individualDto.IdType = "الهوية الوطنية")
              : (this.individualDto.IdType = "National ID");
          }
          if (this.individualDto2.IdType === "ZS0002") {
            this.direction === "rtl"
              ? (this.individualDto.IdType = "الإقامة")
              : (this.individualDto.IdType = "Iqama ID");
          }
          if (this.individualDto2.IdType === "ZS0003") {
            this.direction === "rtl"
              ? (this.individualDto.IdType = "هوية مواطني دول الخليج")
              : (this.individualDto.IdType = "GCC ID");
          }
          this.individualDto.IdNumber = this.individualDto2.IdNumber;
          this.individualDto.Name = "";
          this.individualDto.email = "";
        }
        if (item.flag) {
          // this.individualDto = value;
          count++;
          this.individualDto = item;
          if (this.individualDto2.IdType === "ZS0001") {
            this.direction === "rtl"
              ? (this.individualDto.IdType = "الهوية الوطنية")
              : (this.individualDto.IdType = "National ID");
          }
          if (this.individualDto2.IdType === "ZS0002") {
            this.direction === "rtl"
              ? (this.individualDto.IdType = "الإقامة")
              : (this.individualDto.IdType = "Iqama ID");
          }
          if (this.individualDto2.IdType === "ZS0003") {
            this.direction === "rtl"
              ? (this.individualDto.IdType = "هوية مواطني دول الخليج")
              : (this.individualDto.IdType = "GCC ID");
          }
          this.individualDto.IdNumber = this.individualDto2.IdNumber;
          if (this.tpinfo["Name1"] !== "" || this.tpinfo["Name2"] !== "") {
            this.nameVal = true;
          } else {
            this.nameVal = false;
          }
          this.individualDto.Name =
            this.tpinfo["Name1"] + " " + this.tpinfo["Name2"];
          this.individualDto.email = "";
        } else {
          this.dataErr = true;
          this.dataMsg = this.IDErrz.e14;
        }
      });

      if (count > 1) {
        this.dataErr = true;
        this.dataMsg = this.IDErrz.e15;
      } else if (count === 0) {
        this.dataErr = true;
        this.dataMsg = this.IDErrz.e14;
      } else {
        this.dataErr = false;
        $("#address").modal("hide");
      }
    }
  }

  validate(val, n) {
    if (n === 1) {
      if (val.Name.toString() === "") {
        this.nameErr1 = false;
        //this.nameMsg = "Please Enter Name";
      } else {
        let a = this.commonVaidation.isArabic(val.Name.toString());
        a ? (this.nameErr1 = false) : (this.nameErr1 = true);
        if (this.nameErr1) this.nameMsg = this.indErr.e1;
        console.log(/^[A-Za-z -_]+$/.test(val.Name.toString()), a);
      }
    }
    if (n === 2) {
      this.nameErr2 = this.commonVaidation.isAlphanumeric(
        val.CityName.toString()
      );
      if (this.nameErr2) this.cityMsg = this.indErr.e2;
    }
    if (n === 3) {
      this.nameErr3 = this.commonVaidation.isAlphanumeric(
        val.DistrictName.toString()
      );
      if (this.nameErr3) this.dMsg = this.indErr.e2;
    }
    if (n === 4) {
      this.nameErr4 = this.commonVaidation.isAlphanumeric(
        val.StreetName.toString()
      );
      if (this.nameErr4) this.sMsg = this.indErr.e2;
    }
    if (n === 5) {
      if (val.Zipcode.toString() === "") this.nameErr5 = false;
      else {
        let a = this.commonVaidation.isNumber(val.Zipcode.toString());
        a ? (this.nameErr5 = false) : (this.nameErr5 = true);
        if (this.nameErr5) this.zMsg = this.indErr.e3;
      }
    }
    if (n === 6) {
      if (val.BuildingNo.toString() === "") this.nameErr6 = false;
      else {
        let a = this.commonVaidation.isNumber(val.BuildingNo.toString());
        a ? (this.nameErr6 = false) : (this.nameErr6 = true);
        if (this.nameErr6) this.bMsg = this.indErr.e3;
      }
    }
    if (n === 7) {
      if (val.UnitNo.toString() === "") this.nameErr7 = false;
      else {
        let a = this.commonVaidation.isNumber(val.UnitNo.toString());
        a ? (this.nameErr7 = false) : (this.nameErr7 = true);
        if (this.nameErr7) this.uMsg = this.indErr.e3;
      }
    }

    if (n === 8) {
      if (val.MobileNo.toString() === "") this.nameErr8 = false;
      else {
        let n = val.MobileNo.substring(0, 1);
        if (n === "0") {
          this.nameErr8 = true;
          this.msMsg = this.indErr.e22;
        } else {
          let a = this.commonVaidation.isNumber(val.MobileNo.toString());
          a ? (this.nameErr8 = false) : (this.nameErr8 = true);
          if (this.nameErr8) this.msMsg = this.indErr.e3;
          else {
            // if (val.MobileNo.length === 9) this.nameErr8 = false;
            // else {
            //   this.nameErr8 = true;
            //   this.msMsg = "Please Enter 9 Digits";
            // }
          }
        }
      }
    }
    if (n === 9) {
      if (val.email.toString() === "") this.nameErr9 = false;
      else {
        let a = this.commonVaidation.isEmailValid(val.email.toString());
        a ? (this.nameErr9 = false) : (this.nameErr9 = true);
        if (this.nameErr9) this.eMsg = this.indErr.e16;
      }
    }
    if (n === 10) {
      if (val.cemail.toString() === "") this.nameErr10 = false;
      else {
        let a = this.commonVaidation.isEmailValid(val.cemail.toString());
        a ? (this.nameErr10 = false) : (this.nameErr10 = true);
        if (this.nameErr10) this.ceMsg = this.indErr.e16;
        else {
          if (val.cemail.toLowerCase() !== val.email.toLowerCase()) {
            this.nameErr10 = true;
            this.ceMsg = this.indErr.e13;
          }
        }
      }
    }
    if (
      this.nameErr1 ||
      this.nameErr2 ||
      this.nameErr3 ||
      this.nameErr4 ||
      this.nameErr5 ||
      this.nameErr6 ||
      this.nameErr7
    )
      this.showc1 = true;
    else this.showc1 = false;

    if (this.nameErr8 || this.nameErr9 || this.nameErr10) this.showc2 = true;
    else this.showc2 = false;
  }

  validateCity(city) {
    city !== "" ? (this.nameErr2 = false) : (this.nameErr2 = true);
    console.log(this.nameErr2);
  }

  onSubmit2() {
    if (this.individualDto.MobileNo === "") {
      this.nameErr8 = true;
      this.msMsg = "Please Enter the Mobile Number";
    }
  }

  onSubmit3() {
    if (this.individualDto.Name === "") {
      this.nameErr1 = true;
      this.nameMsg = this.indErr.e4;
    }
    if (this.individualDto.CityName === "") {
      this.nameErr2 = true;
      this.cityMsg = this.indErr.e5;
    }
    if (this.individualDto.DistrictName === "") {
      this.nameErr3 = true;
      this.dMsg = this.indErr.e6;
    }
    if (this.individualDto.StreetName === "") {
      this.nameErr4 = true;
      this.sMsg = this.indErr.e7;
    }
    if (this.individualDto.Zipcode === "") {
      this.nameErr5 = true;
      this.zMsg = this.indErr.e8;
    }
    if (this.individualDto.BuildingNo === "") {
      this.nameErr6 = true;
      this.bMsg = this.indErr.e9;
    }
    if (this.individualDto.UnitNo === "") {
      this.nameErr7 = true;
      this.uMsg = this.indErr.e10;
    }
    if (this.individualDto.MobileNo === "") {
      this.nameErr8 = true;
      this.msMsg = this.indErr.e11;
    }
    if (this.individualDto.email === "") {
      this.nameErr9 = true;
      this.eMsg = this.indErr.e12;
    }

    if (this.individualDto.cemail === "") {
      this.nameErr10 = true;
      this.ceMsg = this.indErr.e12;
    }

    if (
      this.individualDto.email.toLowerCase() !==
      this.individualDto.cemail.toLowerCase()
    ) {
      this.nameErr10 = true;
      this.ceMsg = this.indErr.e13;
    }

    if (
      this.nameErr1 ||
      this.nameErr2 ||
      this.nameErr3 ||
      this.nameErr4 ||
      this.nameErr5 ||
      this.nameErr6 ||
      this.nameErr7 ||
      this.nameErr8 ||
      this.nameErr9 ||
      this.nameErr10
    ) {
    } else {
      this.getOtp2(this.individualDto, "");
      this.mobile = this.individualDto.MobileNo;
    }
  }

  NextStep(id) {
    this.currentTab = id;
    this.optionActive = id;
    if (this.optionActive === 2) {
      this.showOne = true;
      if (this.individualDto2.IdType.toString() === "ZS0003") {
        this.individualDto1.push(this.individualDto2);
        //this.open();
        this.pushData();
      } else {
        this.getAddress(
          this.individualDto2.IdType,
          this.individualDto2.IdNumber
        );
        // this.appSrv.getTaxpayerInfo().subscribe((res) => {
        //   console.log("Individual Component - TAX:: ", res);
        //   this.tin = res["d"]["Tin"];
        //   if (this.tin != "") {

        //   }
        // });
      }
    }
    if (this.optionActive === 3) {
      this.showTwo = true;
    }

    this.defaultCss(id);
  }

  defaultCss(id) {
    this.defaultValue += id;
  }

  submit(val) {
    //this.show = true;
    this.individualDto.Password = val;
    this.individualDto.Agree = true;
    // //this.individualDto.Birthdt = new Date();
    // console.log("pasddword :: ", this.individualDto);
    // delete this.individualDto.flag
    // delete this.individualDto.Birthdt
    let obj1 = {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
    let obj = {
      City: this.individualDto.CityName,
      IdType: this.individualDto.IdType,
      IdNumber: this.individualDto.IdNumber,
      Email: this.individualDto.email,
      BuildingNo: this.individualDto.BuildingNo,
      Agree: this.individualDto.Agree,
      Floor: this.individualDto.UnitNo,
      Mobile: "00" + this.cncode + this.individualDto.MobileNo,
      Name: this.individualDto.Name,
      Neighborhood: this.individualDto.DistrictName,
      Password: this.individualDto.Password,
      PostalCd: this.individualDto.Zipcode,
      StreetNm: this.individualDto.StreetName,
      CaseGuid: this.caseuid,
      Birthdt: this.commonVaidation.changeDate(
        this.individualDto2.Birthdt["calendarStart"]
      ),
      AgreeDt: this.commonVaidation.changeDate(obj1),
      Region: "01",
      Country: "SA",
    };
    this.signupService.submit(obj).subscribe(
      (res) => {
        this.show = true;
        console.log("result", res);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  testCal(val, e) {
    console.log("cons", e);
    if (val === 1) {
      localStorage.setItem("cal", "ar");
      this.appSrv.updatedDataSelection1("en");
    } else {
      localStorage.setItem("cal", "en");
      this.appSrv.updatedDataSelection1("en");
    }
  }

  validateEmail(val) {
    this.emailErr = this.commonVaidation.isEmailValid(val);
    console.log(this.emailErr);
  }

  BirthdtForm() {
    console.log(this.individualDto2);
  }

  IDtypeValidation1() {
    if (this.individualDto2.IdType === "ZS0003") {
      if (this.commonValid.isNumber(this.individualDto2.IdNumber)) {
        if (
          this.individualDto2.IdNumber.length < 7 ||
          this.individualDto2.IdNumber.length > 15
        ) {
          this.idErr = true;
          this.idMsg = this.IDErrz.e19;
        } else {
          this.idErr = false;
        }
      } else {
        this.idErr = true;
        this.idMsg = this.IDErrz.e20;
      }
    } else {
      let obj = {
        flag: false,
        msg: "",
      };
      obj = this.commonValid.IDtypeValidation(
        this.individualDto2.IdType,
        this.individualDto2.IdNumber
      );
      this.idErr = obj.flag;
      this.idMsg = obj.msg;
    }
  }

  validateDOB() {
    if (this.individualDto2.Birthdt !== null) this.dobErr = false;
    console.log(this.individualDto2.Birthdt);
  }

  onSubmit1() {
    console.log(this.individualDto2.Birthdt);

    this.individualDto2.IdType === "" ||
    this.individualDto2.IdType === undefined
      ? (this.idTErr = true)
      : (this.idTErr = false);
    this.individualDto2.IdNumber === "" ||
    this.individualDto2.IdNumber === undefined
      ? (this.idErr = true)
      : (this.idErr = false);
    this.individualDto2.Birthdt === "" || this.individualDto2.Birthdt === null
      ? (this.dobErr = true)
      : (this.dobErr = false);

    this.IDtypeValidation1();

    // if (this.individualDto2.email !== this.individualDto2.cemail) {
    //   this.nameErr10 = true;
    //   this.ceMsg = "Email and Confirm Email should be same";
    // }

    if (this.idTErr || this.idErr || this.dobErr || this.dobErr1) {
    } else {
      if (this.individualDto2.IdType === "ZS0003") {
        let id = "ZS0018";
        let obj3 = {
          type: id,
          idNumber: this.individualDto2.IdNumber,
        };
        let d = this.individualDto2.Birthdt["calendarStart"];
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
        let currentdate = d.year + "" + mnth + "" + day;
        console.log("date", currentdate);
        this.vatService.getUserValidation(obj3, currentdate).subscribe(
          (res) => {
            this.tpinfo = res["d"];
            if (res["d"]["Tin"] !== "") {
              this.notifierService.notify(
                "error",

                // res["d"]["Tin"] +
                this.indErr.e17
              );
            } else {
              this.NextStep(2);
              this.notifierService.notify("success", this.indErr.e18);
            }
          },
          (err) => {
            console.log(err.error);
            this.notifierService.notify(
              "error",
              err.error.error.innererror.errordetails[0].message
            );
          }
        );
        // if (
        //   this.individualDto2.MobileNo === "" ||
        //   this.individualDto2.MobileNo === null ||
        //   this.individualDto2.MobileNo === undefined
        // ) {
        //   this.nameErr8 = true;
        //   this.msMsg = "Please enter Mobile Number";
        //e }
      } else {
        let obj = {};
        obj["IdType"] = this.individualDto2.IdType;
        obj["Id"] = this.individualDto2.IdNumber;
        obj["OtpType"] = "001";
        obj["BuDob"] = this.commonVaidation.changeDate(
          this.individualDto2.Birthdt["calendarStart"]
        );

        if (obj["IdType"] === "ZS0003") {
          if (
            this.individualDto2.MobileNo === "" ||
            this.individualDto2.MobileNo === undefined
          ) {
            this.mErr = true;
          } else {
            obj["MobileNo"] = this.individualDto2.MobileNo;
            this.mErr = false;
            this.getOTP(obj);
          }
        } else {
          let obj2 = this.commonVaidation.IDtypeValidation(
            this.individualDto2.IdType,
            this.individualDto2.IdNumber
          );

          if (obj2.flag) {
            this.idErr = true;
            this.idMsg = obj2.msg;
          } else {
            this.idErr = false;
            let id;
            if (this.individualDto2.IdType === "ZS0001") id = "ZS0015";
            if (this.individualDto2.IdType === "ZS0002") id = "ZS0017";
            if (this.individualDto2.IdType === "ZS0003") id = "ZS0018";
            let obj3 = {
              type: id,
              idNumber: this.individualDto2.IdNumber,
            };
            let d = this.individualDto2.Birthdt["calendarStart"];
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
            let currentdate = d.year + "" + mnth + "" + day;
            console.log("date", currentdate);
            this.vatService.getUserValidation(obj3, currentdate).subscribe(
              (res) => {
                this.tpinfo = res["d"];
                if (res["d"]["Tin"] !== "") {
                  this.notifierService.notify(
                    "error",

                    // res["d"]["Tin"] +
                    this.indErr.e17
                  );
                } else {
                  this.getOTP(obj);
                  this.notifierService.notify("success", this.indErr.e18);
                }
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
        }
      }
    }
  }

  // onSubmit2(){

  //   if(this.individualDto2.MobileNo === ''){
  //     this.mobErr = true;
  //     this.mobMsg = "Please Enter the mo"
  //   }else{

  //   }
  //   if(this.individualDto2.Name === ''){

  //   }else{

  //   }
  // }

  getOTP(obj) {
    this.resendObj = obj;
    console.log("obj", obj);
    this.appSrv.getOTP(obj).subscribe(
      (res) => {
        console.log("Individual Component - TAX:: ", res);
        this.otpRespObj = res["d"];
        this.otpRespObj1 = res["d"];
        this.caseuid = res["d"]["CaseGuid"];
        this.showVerification = true;
        if (res["d"]["Zvalidate"]) {
          this.showVerification = false;
          this.NextStep(2);
        } else {
          if (obj.MobileOtp === undefined) {
            // this.counterSubscription = interval(1000).subscribe((count) => {
            //   console.log((this.counter = this.counter - 1));
            // });
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
      }
    );
  }

  resendOTP() {
    if (this.retryCount < 5) {
      console.log("Resend OTP req :: ", this.resendObj);
      this.resend = false;
      this.retryCount = this.retryCount + 1;
      this.appSrv.getOTP(this.resendObj).subscribe(
        (res) => {
          console.log("Resend OTP Res :: ", res);
          this.enableResendButton = false;
          this.otpRespObj = res["d"];
          this.resend = true;
          this.notifierService.notify("success", this.indErr.e19);
          // this.counter = 60;
          // this.counterSubscription = interval(1000).subscribe((count) => {
          //   console.log((this.counter = this.counter - 1));
          // });
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
    } else {
      // TO BE DONE -> SHOW MSG TO USER STATING THAT RETRY ATTEMPTS EXCEEDED - REDIRECT HIM TO SCREEN 1
      this.notifierService.notify("error", "Maximun attempts reached");
      this.router.navigate(["main/dashboard"]);
    }
  }

  getOTPFromUser(otp) {
    console.log("getOTPFromUser :: " + otp, otp.length);
    if (this.optionActive === 2) {
      if (otp.length == 4) {
        // this.otpRespObj["MobileOtp"] = otp;
        // this.otpRespObj["Zsubmit"] = "X";
        // // this.counterSubscription.unsubscribe();
        // this.getOTP(this.otpRespObj);
        this.getOtp2(this.individualDto, otp);
      }
    } else {
      if (otp.length == 4) {
        this.otpRespObj["MobileOtp"] = otp;
        this.otpRespObj["Zsubmit"] = "X";
        // this.counterSubscription.unsubscribe();
        this.getOTP(this.otpRespObj);
      }
    }
  }
  checkGcc(val) {
    this.individualDto2.IdNumber = "";
    this.idErr = false;
    console.log("value", val);
    // if (val === "ZS0003") {
    //   this.showGcc = true;
    // } else {
    //   this.showGcc = false;
    // }
  }

  getOtp2(value, otp) {
    console.log("value", value);
    let obj = {};

    if (
      this.individualDto.IdType === "National ID" ||
      this.individualDto.IdType === "الهوية الوطنية"
    ) {
      this.individualDto.IdType = "ZS0001";
    }
    if (
      this.individualDto.IdType === "Iqama ID" ||
      this.individualDto.IdType === "الإقامة"
    ) {
      this.individualDto.IdType = "ZS0002";
    }
    if (
      this.individualDto.IdType === "GCC ID" ||
      this.individualDto.IdType === "هوية مواطني دول الخليج"
    ) {
      this.individualDto.IdType = "ZS0003";
    }
    obj["IdType"] = this.individualDto.IdType;
    obj["Id"] = value.IdNumber;
    obj["OtpType"] = "001";
    obj["BuDob"] = this.commonVaidation.changeDate(
      this.individualDto2.Birthdt["calendarStart"]
    );
    obj["MobileNo"] = "00" + this.cncode + value.MobileNo;
    if (this.individualDto.IdType === "ZS0003") {
      obj["CommMobNo"] = "";
      obj["OtpVer"] = "";
      obj["CommMobileOtp"] = "";
      obj["MobileOtp"] = otp;
    } else {
      obj["CommMobNo"] = "00" + this.cncode + value.MobileNo;
      obj["OtpVer"] = "1";
      obj["CommMobileOtp"] = otp;
    }
    // obj["CommMobNo"] = "00" + this.cncode + value.MobileNo;
    //   obj["OtpVer"] = "1";
    if (otp != "") obj["Zsubmit"] = "X";
    obj["CommMobileOtp"] = otp;
    obj["CaseGuid"] = this.caseuid;
    console.log("value", obj, this.individualDto);
    this.resendObj = obj;
    this.appSrv.getOTP(obj).subscribe(
      (res) => {
        this.appSrv.updatedDataSelection6("0");
        this.showVerification = true;
        this.caseuid = res["d"]["CaseGuid"];
        console.log("res", res);
        if (res["d"]["Zvalidate"]) {
          this.showVerification = false;
          this.NextStep(3);
        } else {
          if (obj["CommMobileOtp"] === "") {
            // this.counterSubscription = interval(1000).subscribe((count) => {
            //   console.log((this.counter = this.counter - 1));
            // });
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
        if (err.error.error.innererror.errordetails[0].message === undefined) {
          this.notifierService.notify("error", "OTP Service Error.");
        }
      }
    );
  }

  getMaxLength(val) {
    this.maxLength = val;
    if (this.individualDto.MobileNo.length < this.maxLength) {
    } else this.individualDto.MobileNo = "";
  }

  // keyUpEvent(event, index) {
  //   this.otp[index - 1] = event.target.value;
  //   let nextInput = event.srcElement.nextElementSibling;
  //   if (index <= 3 && nextInput !== null) {
  //     nextInput.focus();
  //   }

  //   this.getOTPFromUser(this.otp.join(""));
  //   console.log(this.otp);
  //   // console.log(event);
  //   console.log(index);
  // }

  getdateErr() {
    let dateObj = new Date();
    console.log(dateObj.toLocaleDateString("ar-EG"));
    dateObj.setDate(dateObj.getDate() - 1);
    if (
      new Date(
        this.individualDto2.Birthdt["calendarStart"].year +
          "-" +
          this.individualDto2.Birthdt["calendarStart"].month +
          "-" +
          this.individualDto2.Birthdt["calendarStart"].day
      ) > dateObj
    ) {
      this.dobErr1 = true;
      this.dateMsg = this.indErr.e21;
    } else {
      this.dobErr1 = false;
      this.dateMsg = "";
    }
  }

  restrictAlphabetss(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57) || x == 45) return true;
    else return false;
  }

  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if (x >= 48 && x <= 57) return true;
    else return false;
  }

  // openedChange(opened: boolean) {
  //   opened ? (this.opens = true) : (this.opens = false);
  //   console.log(this.opens);
  //   console.log();
  // }
}

export class IndividualDto {
  IdType: String = "";
  Tin: String = "";
  Birthdt: String = "";
  TpType: String = "";
  IdNumber: String = "";
  MobileNo: String = "";
  AdditionalNo: String = "";
  BuildingNo: String = "";
  Zipcode: String = "";
  UnitNo: String = "";
  DistrictName: String = "";
  StreetName: String = "";
  CityName: String = "";
  Name: String = "";
  email: string = "";
  cemail: string = "";
  Password: String = "";
  Agree;
  flag: false;
}

export class factorys {
  myServiceFactory() {
    const isMock = localStorage.getItem("lang");
    return isMock === "ar"
      ? new NgbCalendarIslamicCivil()
      : new NgbCalendarGregorian();
  }
}
// export let myServiceFactory = () => {
//   const isMock = localStorage.getItem("lang");

//   return isMock === "ar"
//     ? new NgbCalendarIslamicCivil()
//     : new NgbCalendarGregorian();
// };

function toJulianDate(date) {
  var floor = Math.floor;
  var y = date.getUTCFullYear();
  var m = date.getUTCMonth() + 1;
  var d = date.getUTCDate() + (date % 8.64e7) / 8.64e7;

  if (m < 3) {
    y -= 1;
    m += 12;
  }

  var a = floor(y / 100);
  var b = date < new Date(Date.UTC(1582, 9, 15)) ? 0 : 2 - a + floor(a / 4);
  var c = floor(y < 0 ? 365.25 * y - 0.75 : 365.25 * y);
  var e = floor(30.6001 * (m + 1));

  return b + c + d + e + 1720994.5;
}
