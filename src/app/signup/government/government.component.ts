import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { AppService } from "src/app/app.service";
import { CommonValidation } from "src/app/constants/commonValidations";
import { constants } from "src/app/constants/constants.model";
import { SignupService } from "src/app/services/signup.service";

@Component({
  selector: "app-government",
  templateUrl: "./government.component.html",
  styleUrls: ["./government.component.css"],
})
export class GovernmentComponent implements OnInit {
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;
  lang: any;
  direction: any;
  url = "/signup/others";
  optionActive: number;
  showVerification: boolean = false;
  show: boolean = false;
  currentTab: any;
  defaultValue: number = 1;
  showOne: boolean = false;
  showTwo: boolean = false;
  mobile: String = "";
  resend: boolean = false;
  retryCount =1;
  resendObj: any;
  enableResendButton: boolean;
  otpRespObj: any;
  governmentDTO = new GovernmentDTO();
  idTErr: boolean;
  idErr: boolean;
  dobErr: boolean;
  cncode = "966";
  caseuid = "";
  codes: any;
  nameErr1: boolean;
  nameErr2: boolean;
  nameErr3: boolean;
  tinMsg: string;
  cMsg: string;
  nameMsg: string;
  nameErr8: boolean;
  indErr: any;
  msMsg: any;
  nameErr9: boolean;
  eMsg: any;
  nameErr10: boolean;
  ceMsg: any;
  showc1: boolean;
  showc2: boolean;
  maxLength = 10;
  errd: any;
  tinExist: boolean = false;
  cidErr: boolean;
  no: any;
  name: any;
  type = "govt";
  type2 = "NREG";

  constructor(
    public notifierService: NotifierService,
    public appSrv: AppService,
    private router: Router,
    public commonVaidation: CommonValidation,
    public signupService: SignupService
  ) {}

  ngOnInit(): void {
  
    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.Government;
      this.direction = constants.langz.arb.dir;
      this.indErr = constants.langz.arb.individual.indErr;
    } else {
      this.lang = constants.langz.eng.Government;
      this.direction = constants.langz.eng.dir;
      this.indErr = constants.langz.eng.individual.indErr;
    }
    this.optionActive = 1;
    this.appSrv.getPhoneCode().subscribe((res) => {
      console.log(res);
      this.codes = res["d"]["results"];
      this.codes.forEach((item) => {
        item["maxLength"] = 13 - item.Telefto.length;
      });
      console.log("countru", this.codes);
    });

    this.signupService.getCaseGuid().subscribe((res) => {
      this.caseuid = res["d"]["results"][0].CaseGuid;
      console.log(this.caseuid);
    });
  }

  backClick(id) {
    if (id === 1) {
      this.optionActive = id;
      // if (id <= this.currentTab && !this.show) {
      //   this.optionActive = id;
      // }
    }
  }

  NextStep(id) {
    this.currentTab = id;
    this.optionActive = id;
    console.log("option", this.optionActive);
    if (this.optionActive === 3) {
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

  getOTPFromUser(otp) {
    console.log("getOTPFromUser :: " + otp, otp.length);
    if (otp.length === 4) {
      // this.otpRespObj["MobileOtp"] = otp;
      // this.otpRespObj["Zsubmit"] = "X";
      // // this.counterSubscription.unsubscribe();
      // this.getOTP(this.otpRespObj);
      this.getOtp2(otp);
    }
  }
  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57)) return true;
    else return false;
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
      this.router.navigate(["signup"]);
    }
  }

  onSubmit1() {
    this.governmentDTO.cId === "" || this.governmentDTO.cId === undefined
      ? ((this.nameErr3 = true), (this.cMsg =  this.lang.err.t5))
      : (this.nameErr3 = false);

    this.governmentDTO.gName === "" || this.governmentDTO.gName === undefined
      ? ((this.nameErr1 = true),
        (this.nameMsg =  this.lang.err.t6))
      : (this.nameErr1 = false);

    if (this.tinExist) {
      this.governmentDTO.tin === "" || this.governmentDTO.tin === undefined
        ? ((this.nameErr2 = true), (this.tinMsg = this.lang.err.t7))
        : (this.nameErr2 = false);
    }

    if (this.governmentDTO.MobileNo === "") {
      this.nameErr8 = true;
      this.msMsg = this.indErr.e11;
    }
    if (this.governmentDTO.email === "") {
      this.nameErr9 = true;
      this.eMsg = this.indErr.e12;
    }

    if (this.governmentDTO.cemail === "") {
      this.nameErr10 = true;
      this.ceMsg = this.indErr.e12;
    }
    if (this.tinExist) this.validate(this.governmentDTO, 2);
    
    this.validate(this.governmentDTO, 1);
    this.validate(this.governmentDTO, 3);
    this.validate(this.governmentDTO, 8);
    this.validate(this.governmentDTO, 9);
    this.validate(this.governmentDTO, 10);

    if (
      this.nameErr1 ||
      this.nameErr2 ||
      this.nameErr8 ||
      this.nameErr9 ||
      this.nameErr10 ||
      this.nameErr3 ||
      this.cidErr
    ) {
    } else {
      this.submit("");
      // this.getOtp2("");
      // this.mobile = this.governmentDTO.MobileNo;
    }
  }

  getCompanyValidated() {
    this.governmentDTO.tin = "";
    this.governmentDTO.gName = "";
    if (this.governmentDTO.cId !== "" && !this.nameErr3) {
      let obj = {
        type: "ZS0005",
        idNumber: this.governmentDTO.cId,
      };

      this.signupService.getCompanyValidation(obj).subscribe(
        (res) => {
          console.log("res", res);
          if (
            res["d"]["Bpkind"] === "305A" ||
            res["d"]["Bpkind"] === "305B" ||
            res["d"]["Bpkind"] === "305C" ||
            res["d"]["Bpkind"] === "4" ||
            res["d"]["Bpkind"] === ""
          ) {
           // this.notifierService.notify("success", this.lang.err.t8);

            this.nameErr2 = false;
            this.governmentDTO.tin = res["d"]["Tin"];
            if (res["d"]["Tin"] !== ""){
              this.tinExist = true;
              //this.submit("");

            }
            else this.tinExist = false;
            this.governmentDTO.gName = res["d"]["FullName"];
            //this.cidErr = false;
            // if (res["d"]["Tin"] !== "") {
            //   this.tinExist = true;
            // } else {
            //   this.tinExist = false;
            // }
          } else {
            this.tinExist = false;
            let errormsg = "";
            this.direction !== "rtl"
              ? (errormsg = "Entered ID doesn't match entity type")
              : (errormsg = "الرقم المدخل لا يطابق نوع الكيان");
            this.notifierService.notify("error", errormsg);
            this.governmentDTO.cId = "";
            //this.cidErr = true;
          }
        },
        (err) => {
          //this.cidErr = true;
          //this.governmentDTO.cId = "";
          if (
            err.error.error.innererror?.errordetails[0].code === "ZD_ZREG/304"
          ) {
            this.governmentDTO.cId = "";
          }
          if (
            err.error.error.innererror?.errordetails[0].code === "ZD_PUSR/069"
          ) {
            this.tinExist = true;
          } else {
            this.tinExist = false;
          }
          this.notifierService.notify(
            "error",
            err.error.error.innererror?.errordetails[0].message
          );
          console.log(err.error);
        }
      );
    }
  }

  getOtp2(otp) {
    let obj = {};
    obj["IdType"] = "ZS0005";
    obj["Id"] = this.governmentDTO.cId;
    obj["OtpType"] = "001";
    // obj["BuDob"] = value.changeDate(
    //   value.Birthdt["calendarStart"]
    // );
    obj["MobileNo"] = "00" + this.cncode + this.governmentDTO.MobileNo;
    obj["CommMobNo"] = "00" + this.cncode + this.governmentDTO.MobileNo;
    obj["OtpVer"] = "1";
    if (otp != ""){
      obj["Zsubmit"] = "X";
      obj["CommMobileOtp"] = otp;
    }else{
      obj["CommMobileOtp"] = otp;
    }
    obj["CaseGuid"] = this.caseuid;
    console.log("value", obj);
    this.resendObj = obj;
    console.log("obj", obj);
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
          this.notifierService.notify("error", this.lang.err.t9);
        }
      }
    );
  }

  getMaxLength(val) {
    this.maxLength = val;
    if (this.governmentDTO.MobileNo.length < this.maxLength) {
    } else this.governmentDTO.MobileNo = "";
  }

  validate(val, n) {
    if (n === 1) {
      if (val.gName.toString() !== "") {
        
        let a = this.commonVaidation.isAlphanumerics(val.gName);
        a ? (this.nameErr1 = false) : (this.nameErr1 = true);
        if (this.nameErr1) this.nameMsg = this.indErr.e2;
      }
    }

    // if (n === 2) {
    //   this.nameErr2 = this.commonVaidation.isAlphanumeric(
    //     val.CityName.toString()
    //   );
    //   if (this.nameErr2) this.tinMsg = "this.indErr.e2";
    // }

    if (n === 2) {
      if (val.tin !== "") {
        let a = this.commonVaidation.isNumber(val.tin.toString());
        a ? (this.nameErr2 = false) : (this.nameErr2 = true);
        if (this.nameErr2) this.tinMsg = this.indErr.e3;
        else {
          let first = this.governmentDTO.tin.substr(0, 1);
          if (parseInt(first) !== 3) {
            this.nameErr2 = true;
            this.tinMsg = this.lang.err.t1;
          } else {
            if (this.governmentDTO.tin.length < 10) {
              this.nameErr2 = true;
              this.tinMsg =  this.lang.err.t2;
            } else {
              this.nameErr2 = false;
            }
          }
        }
        if (this.nameErr2) this.governmentDTO.tin = "";
        console.log(this.governmentDTO.tin);
      } else {
        this.nameErr2 = false;
        this.tinMsg = "";
      }
    }

    if (n === 3) {
      if (val.cId !== "") {
        let a = this.commonVaidation.isNumber(val.cId.toString());
        a ? (this.nameErr3 = false) : (this.nameErr3 = true);
        if (this.nameErr3) this.cMsg = this.indErr.e3;
        else {
          let first = this.governmentDTO.cId.substr(0, 1);
          if (parseInt(first) !== 7) {
            this.nameErr3 = true;
            this.cMsg =  this.lang.err.t3;
          } else {
            if (this.governmentDTO.cId.length < 10) {
              this.nameErr3 = true;
              this.cMsg = this.lang.err.t4;
            } else {
              this.nameErr3 = false;
            }
          }
        }
      }
    }

    if (n === 8) {
      if (val.MobileNo !== "") {
        let n = val.MobileNo.substring(0, 1);
        if (n === "0") {
          this.nameErr8 = true;
          this.msMsg = this.indErr.e22;
        } else {
          let a = this.commonVaidation.isNumber(val.MobileNo.toString());
          a ? (this.nameErr8 = false) : (this.nameErr8 = true);
          if (this.nameErr8) this.msMsg = this.indErr.e3;
          if (this.nameErr8) this.governmentDTO.MobileNo = "";
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
      if (val.email !== "") {
        let a = this.commonVaidation.isEmailValid(val.email.toString());
        a ? (this.nameErr9 = false) : (this.nameErr9 = true);
        if (this.nameErr9) this.eMsg = this.indErr.e16;
      }
    }
    if (n === 10) {
      if (val.cemail !== "") {
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

    if (this.nameErr1 || this.nameErr2 || this.nameErr3) this.showc1 = true;
    else this.showc1 = false;

    if (this.nameErr8 || this.nameErr9 || this.nameErr10) this.showc2 = true;
    else this.showc2 = false;
  }

  submit(val) {
    console.log("val", val);

    let obj = {
      ACountry: "SA",
      AEmail: this.governmentDTO.email,
      AEmailCode: "0106",
      APassword: val,
      AGovtAgency: this.governmentDTO.gName,
      AIdnumber: this.governmentDTO.cId,
      ALang: "E",
      AMobile: "00" + this.cncode + "" + this.governmentDTO.MobileNo,
      APhone: "00966",
      ATin: this.governmentDTO.tin,
      ATinExist: "",
      AType: "4",
      ASmsCode: "0106",
      ASubmit: "",
      Fbnum: "",
      CaseGuid: this.caseuid,
    };

    if (this.optionActive !== 1) {
      obj.ASubmit = "X";
    }
    console.log("obj", obj);
    this.signupService.postGovernment(obj).subscribe(
      (res) => {
        console.log("res", res);

        if (this.optionActive === 1) {
          this.getOtp2("");
          this.mobile = this.governmentDTO.MobileNo;
        } else {
          this.no = res["d"]["ANreg"];
          this.name = res["d"]["AGovtAgency"];
          this.show = true;
        }
      },
      (err) => {
        this.errd = [];
        this.errd = err.error.error.innererror.errordetails;
        this.notifierService.show({
          message: "",
          type: "error",
          template: this.customNotificationTmpl,
        });
      }
    );
  }
}

export class GovernmentDTO {
  tin: String = "";
  cId: String = "";
  gName: String = "";
  email: string = "";
  cemail: string = "";
  MobileNo: String = "";
  Agree;
  flag: false;
}
