import { ProfileService } from "src/app/services/profile.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { interval, Subscription } from "rxjs";
import { NotifierService } from "angular-notifier";
import { ForgotUNameOrPwdService } from "src/app/services/forgot-uname-or-pwd.service";
import { ForgotUserPWD } from "src/app/constants/ForgotUserPWD";
import { environment } from "src/environments/environment";
import { ProfileConstants } from "src/app/constants/profileConstants";

declare var $: any;
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  codes: any;
  name = "";
  name1 = "";
  currentTab: any;
  optionActive = 2;
  defaultValue: number = 1;
  menu;
  resend: boolean = false;
  retryCount = 1;
  enableResendButton: boolean = false;
  counter: number = 120;
  counterDisplay;
  counterSubscription: Subscription;
  otp = [];
  mobileNum;
  isSuccess: boolean = false;
  payload = ProfileConstants.updateMobilePayload;
  hide = true;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  @ViewChild("e1") public e1;
  @ViewChild("e2") public e2;
  @ViewChild("e3") public e3;
  @ViewChild("e4") public e4;
  resendFlag: boolean;
  emailForm: FormGroup;
  matchErr: boolean;
  submitted: boolean;
  password: any;
  prevpwd;

  //OTP
  last4DigitsMob;
  tin = localStorage.getItem("gpart");
  otpObj = {};
  mobilenum;
  lang;
  otpObj4Validation: Object = {};
  wrongOTPCount = 0;
  otpRespObj: Object;
  loginURL: string;
  direction: string;

  //Create PWD
  createPWDObj: Object = {};
  email: any = "";
  logouturl = environment.logouturl;

  constructor(
    public appSrv: AppService,
    public service: ForgotUNameOrPwdService,
    private router: Router,
    private fb: FormBuilder,
    private profileSrv: ProfileService,
    public notifierService: NotifierService
  ) {}

  ngOnInit() {
    this.loginURL = environment.loginurl;
    this.loginURL = this.loginURL + "en&login=angular";
    if (localStorage.getItem("lang") === "ar") {
      this.menu = ProfileConstants.changePwdMenuArb;
      this.lang = ForgotUserPWD.langz.arb;
      this.direction = ForgotUserPWD.langz.arb.dir;
      this.loginURL = this.loginURL.replace("=en&", "=ar&");
    } else {
      this.menu = ProfileConstants.changePwdMenuEng;
      this.lang = ForgotUserPWD.langz.eng;
      this.direction = ForgotUserPWD.langz.eng.dir;
    }

    // this.generateOTP();
  }
  next() {
    // if (this.optionActive < 3)
    this.optionActive++;

    // if (this.optionActive === 3)
    //   this.isSuccess = true;
  }

  back() {
    // if (this.optionActive > 1) {
    //   this.optionActive--;
    // } else {
    this.router.navigate(["mains/profile"]);
    // }
  }

  generateOTP() {
    this.service.generateOTP(this.tin).subscribe(
      (res) => {
        this.otpObj = res;
        this.mobilenum = res["d"]["MobileNo"];
        this.email = res["d"]["EmailId"];
        this.last4DigitsMobile();
        console.log("this.otpObj=", res);
        console.log("mobile No->", this.mobilenum);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          this.getErrMsgOTP(err.error.error.innererror.errordetails[0].message)
        );
      }
    );
  }

  last4DigitsMobile() {
    if (this.mobilenum != null && this.mobilenum.length > 4)
      this.last4DigitsMob = this.mobilenum.substr(this.mobilenum.length - 4);
  }

  getErrMsgOTP(message: any): string {
    if (message.includes("locked")) {
      return this.lang.s1.err.e5;
    }
    return this.lang.s1.err.e2;
  }

  getOTPFromUser(otp) {
    console.log("getOTPFromUser :: " + otp);

    this.prepareOTPObj(otp);
    this.service.validateOTP(this.otpObj4Validation).subscribe(
      (res) => {
        console.log("validateOTP ->", res);
        this.next();
      },
      (err) => {
        console.log("post() err", err);
        let errMsg = "";
        if (this.wrongOTPCount < 2) {
          this.notifierService.notify("error", this.getErrMsg());
        }
        this.wrongOTPCount = this.wrongOTPCount + 1;
        console.log(err);
        if (this.wrongOTPCount > 2) {
          this.prepareOTPObj(otp);
          this.service.validateOTP(this.otpObj4Validation).subscribe(
            (res) => {},
            (err) => {}
          );
          $("#ibanValidation").modal("show");
        }
      }
    );
  }
  prepareOTPObj(otp) {
    let langu = "E";
    if (this.lang != "en") {
      langu = "A";
    }
    this.otpObj4Validation["Langu"] = langu;
    this.otpObj4Validation["Tin"] = this.tin;
    this.otpObj4Validation["Otp"] = otp;
    this.otpObj4Validation["Action"] = "01";
    if (this.wrongOTPCount > 2) {
      this.otpObj4Validation["Action"] = "42";
    }

    this.otpObj4Validation["RdBt"] = "P";
  }

  getErrMsg(): string {
    let errMsg = this.lang.s1.err.e3;
    if (this.wrongOTPCount == 1) {
      errMsg = this.lang.s1.err.e4;
    }
    if (this.wrongOTPCount == 2) {
      errMsg = this.lang.s1.err.e5;
    }

    return errMsg;
  }
  resendOTP() {
    if (this.retryCount < 5) {
      // console.log("Resend OTP req :: ", this.otpRespObj1);`
      this.resend = false;
      this.retryCount = this.retryCount + 1;
      this.service.generateOTP(this.tin).subscribe(
        (res) => {
          console.log("Resend OTP Res :: ", res);
          this.enableResendButton = false;
          this.resend = true;
          this.otpRespObj = res["d"];
          this.mobilenum = res["d"]["MobileNo"];
          this.email = res["d"]["EmailId"];
          this.last4DigitsMobile();
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
      this.redirectToLoginPage();
    }
  }
  redirectToLoginPage() {
    $("#openModal").modal("hide");
    localStorage.clear();
    setTimeout(() => {
      window.location.replace(this.logouturl);
    });
  }

  submit(newPWD) {
    // $("#openModal").modal("show");
    this.prepareCreatePWDObj(newPWD);
    this.service.updatePWD(this.createPWDObj).subscribe(
      (res) => {
        // this.service.createPWD(this.createPWDObj).subscribe(res => {
        console.log("submit newPWD ->", res);
        // this.notifierService.notify("success", "Success");
        this.next();
        this.isSuccess = true;
        $("#openModal").modal("show");
      },
      (err) => {
        console.log("newPWD post() err", err);
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }
  prepareCreatePWDObj(newPWD) {
    // let langu = 'E';
    // if (this.lang == 'ar') {
    //   langu = 'A';
    // }
    // this.createPWDObj['Langu'] = langu;
    // this.createPWDObj['Tin'] = this.tin;
    // this.createPWDObj['NewPwd'] = newPWD;
    // this.createPWDObj['Action'] = '40';
    // this.createPWDObj['RdBt'] = 'P';

    this.createPWDObj["Email"] = this.email;
    this.createPWDObj["PasswordOld"] = newPWD["currentPwd"];
    this.createPWDObj["PasswordNew"] = newPWD["pwd"];
    this.createPWDObj["Partner"] = this.tin;
    this.createPWDObj["PasswordConf"] = newPWD["pwd"];
  }
}
