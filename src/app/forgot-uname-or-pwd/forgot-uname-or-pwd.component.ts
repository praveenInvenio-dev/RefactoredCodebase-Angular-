import { Component, OnInit, Output, Input, EventEmitter, OnDestroy, DoCheck, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription, interval } from 'rxjs';
import { ForgotUserPWD } from '../constants/ForgotUserPWD';
import { ForgotUNameOrPwdService } from '../services/forgot-uname-or-pwd.service';
import { constants } from "src/app/constants/constants.model";
import { environment } from 'src/environments/environment';
import { CommonValidation } from '../constants/commonValidations';
import { MessageService } from 'primeng/api';

declare var $: any;
@Component({
  selector: 'app-forgot-uname-or-pwd',
  templateUrl: './forgot-uname-or-pwd.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./forgot-uname-or-pwd.component.css'],
  providers: [MessageService]
})
export class ForgotUNameOrPwdComponent implements OnInit, DoCheck {
  forgotUNamePwd: any;
  optionActive: number = 0;
  menu;
  otp = [];
  menuForgotSuccess;
  successMenu: number = 0;
  enableResendButton: boolean = false;
  otpRespObj: Object;
  // otpRespObj1: Object;   
  resendFlag: boolean;
  isSuccess: boolean = false;
  onloadUrlData = {};
  // userType: string = '1';
  userType: any;
  userTypeErr: string = '';
  userObj: Object = {};
  userFormGroup: FormGroup;
  IdnumberErr;
  submittedUser: boolean;
  userEIdErr: boolean = false;
  userEIdErrMsg;
  tin;
  tinList;
  otpObj = {};

  resend: boolean = false;
  retryCount = 1;
  wrongOTPCount = 0;
  otpObj4Validation: Object = {};
  createPWDObj: Object = {};
  lang;
  direction: string;
  vatErr;
  loginURL: string;
  last4DigitsMob;

  mobilenum;
  pattern = "[0-9]+";
  Idnumber;
  commonErr;

  maxlengthValue = 10;
  minlen: number = 10;
  minlenErr: boolean = false;
  isEmail: boolean = false;
  tinErr: boolean = false;
  tinErrMsg = "";
  emailTin;
  constructor(public service: ForgotUNameOrPwdService, private _formBuilder: FormBuilder
    , public notifierService: NotifierService,
    private router: Router, private activatedRoute: ActivatedRoute, public commonVaidation: CommonValidation, private messageService: MessageService) { }

  ngOnInit(): void {
    let lang = this.activatedRoute.snapshot.queryParams.lang;
    this.loginURL = environment.loginurl + lang + "&login=angular";
    localStorage.setItem("lang", lang);
    if (localStorage.getItem("lang") === "ar") {
      this.lang = ForgotUserPWD.langz.arb;
      this.direction = ForgotUserPWD.langz.arb.dir;
      this.menu = ForgotUserPWD.menuForgotArb;
      this.commonErr = constants.langz.arb;
      this.menuForgotSuccess = ForgotUserPWD.menuForgotSuccessArb;
      // this.loginURL = this.loginURL.replace("=en&", "=ar&");
      // console.log('loginURL ar->'+this.loginURL);
    } else {
      this.lang = ForgotUserPWD.langz.eng;
      this.direction = ForgotUserPWD.langz.eng.dir;
      this.menu = ForgotUserPWD.menuForgot;
      this.commonErr = constants.langz.eng;
      this.menuForgotSuccess = ForgotUserPWD.menuForgotSuccess;
    }


    this.loadData();
    this.userFormGroup = this._formBuilder.group({
      Idnumber: ["", [Validators.required, Validators.pattern(this.pattern)]]
    });
  }
  timeoutObj: any = null;
  resendOTP() {
    if (this.retryCount < 6) {
      // console.log("Resend OTP req :: ", this.otpRespObj1);`      
      this.resend = false;
      this.retryCount = this.retryCount + 1;
      this.service.generateOTP(this.tin).subscribe(
        (res) => {
          console.log("Resend OTP Res :: ", res);
          this.enableResendButton = false;
          this.resend = true;
          this.otpRespObj = res["d"];
          this.mobilenum = res['d']['MobileNo'];
          this.last4DigitsMobile();


        },
        (err) => {
          this.notifierService.hideOldest();
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
    } else {
      this.notifierService.hideOldest();
      // TO BE DONE -> SHOW MSG TO USER STATING THAT RETRY ATTEMPTS EXCEEDED - REDIRECT HIM TO SCREEN 1

      this.messageService.clear();
      this.messageService.add({ severity: 'error', detail: this.lang.s1.err.e10, sticky: true });
      if (!this.timeoutObj) {
        this.timeoutObj = setTimeout(() => {
          this.messageService.clear();
          this.redirectToLoginPage();
        }, 16000);
      }

      // this.notifierService.notify("error", this.lang.s1.err.e10);   
      //this.redirectToLoginPage();

    }
  }
  getErrMsgOTP(message: any): string {
    if (message.includes('locked')) {
      return this.lang.s1.err.e5;
    }
    return this.lang.s1.err.e2;
  }
  last4DigitsMobile() {
    if (this.mobilenum != null && this.mobilenum.length > 4)
      this.last4DigitsMob = this.mobilenum.substr(this.mobilenum.length - 4);
  }
  loadData() {
    this.service.getData().subscribe(res => {
      this.onloadUrlData = res['d']['results'];
      console.log('this.onloadUrlData -> ' + this.onloadUrlData);
    },
      (err) => {
        console.log(err);
      });
  }

  get f1() {
    return this.userFormGroup.controls;
  }

  setBgImg(value) {
    this.forgotUNamePwd = value;
    this.successMenu = value;
    this.submittedUser = false;
  }

  setUType(value) {
    // this.forgotUNamePwd=0;
    this.userType = value;
    this.userTypeErr = "";
    this.minlenErr = false;
    if (value == 1) {
      this.maxlengthValue = 60;
      this.minlen = 1;
    } else {
      this.maxlengthValue = 10
      this.minlen = 10;
      if (this.userFormGroup.value.Idnumber !== undefined && new String(this.userFormGroup.value.Idnumber).length > 0) {
        this.checkMinlength();
      }
    }


    // this.userFormGroup.get("Idnumber").reset();
    this.userFormGroup.get("Idnumber").setValue('');
  }
  next() {
    if (this.optionActive < 3)
      this.optionActive++;

    if (this.optionActive === 3)
      this.isSuccess = true;
  }
  generateOTP() {
    if (this.isEmail && this.emailTin === undefined) {
      this.tinErr = true;
      this.tinErrMsg = this.commonErr.vatError.e11;
      return;
    } else {
      this.tinErr = false;
      this.tinErrMsg = "";
    }
    if (this.isEmail) {
      this.tin = this.emailTin;
    }
    this.service.generateOTP(this.tin).subscribe(res => {
      this.otpObj = res;
      this.mobilenum = res['d']['MobileNo'];
      this.last4DigitsMobile();

      console.log('this.otpObj=', res);
      console.log('mobile No->', this.mobilenum);

      this.next();
    },
      (err) => {
        this.notifierService.hideOldest();
        this.notifierService.notify(
          "error",
          this.getErrMsgOTP(err.error.error.innererror.errordetails[0].message)
          // err
        );

        // console.log(err);
      }
    );

  }

  submitUser() {
    this.submittedUser = true;
    this.userEIdErr = false;
    this.minlenErr = false;
    // console.log("submit", this.userFormGroup.value.Idnumber);
    if (this.userType === undefined) {
      this.userTypeErr = this.lang.s1.err.e8;
      return;
    }

    if (this.userFormGroup.invalid || this.userType === undefined) {
      return;
    }
    this.checkMinlength();
    if (this.minlenErr) {
      return;
    }

    this.service.getUserDetails(this.userType, this.userFormGroup.value.Idnumber).subscribe(res => {
      // this.notifierService.notify("success", "Valid ID Number");
      console.log('get() res', res);
      this.userEIdErr = false;
      this.userEIdErrMsg = '';
      let resObj = res['d'];
      this.prepareUserObj(resObj);
      console.log(this.userObj);
      this.postUserDetails();
      this.submittedUser = false;
    },
      (err) => {
        console.log('get() err', err);
        this.userEIdErr = true;
        this.userEIdErrMsg = this.lang.s1.err.e9;
        this.notifierService.hideOldest();
        this.notifierService.notify(
          "error",
          // err.error.error.innererror.errordetails[0].message
          this.lang.s1.err.e2
        );
        console.log(err);
        this.submittedUser = false;
      }
    );
  }
  checkMinlength() {
    if (this.userType === '0' && new String(this.userFormGroup.value.Idnumber).length < 10) {
      this.minlenErr = true;
    } else {
      this.minlenErr = false;
    }
  }
  postUserDetails() {
    this.service.postUserDetails(this.userObj).subscribe(res => {
      console.log('post() res', res);
      this.userEIdErr = false;
      this.userEIdErrMsg = '';
      // this.notifierService.notify("success", "Success");
      this.isSuccess = true;
    }, (err) => {
      this.userEIdErr = true;
      this.userEIdErrMsg = this.lang.s1.err.e9;
      console.log('post() err', err);
      // this.notifierService.notify(
      //   "error",
      //   err.error.error.innererror.errordetails[0].message
      // );
      this.notifierService.hideOldest();
      this.notifierService.notify(
        "error",
        // err['status'] + "\t" + err['statusText']
        this.lang.s1.err.e2
      );
      console.log(err);
    });
  }
  prepareUserObj(resObj: any) {
    this.userObj['Langu'] = resObj['Langu'];
    this.userObj['Idnumber'] = resObj['Idnumber'];
    this.userObj['SubType'] = resObj['SubType'];
    // this.userObj['MobileNo'] = resObj['MobileNo'];
    this.userObj['MobileNo'] = "";
    this.userObj['Otp'] = resObj['Otp'];
    // this.userObj['Action'] = resObj['Action'];
    this.userObj['Action'] = '40';
    this.userObj['RdBt'] = resObj['RdBt'];
  }
  back() {
    if (this.optionActive > 0) this.optionActive--;
  }

  ngDoCheck(): void {

  }


  getOTPFromUser(otp) {
    console.log("getOTPFromUser :: " + otp);

    this.prepareOTPObj(otp);
    this.service.validateOTP(this.otpObj4Validation).subscribe(res => {
      console.log('validateOTP ->', res);
      // this.notifierService.notify("success", "Success");
      this.next();
    }, (err) => {
      console.log('post() err', err);
      let errMsg = '';
      if (this.wrongOTPCount < 2) {
        this.notifierService.hideOldest();
        this.notifierService.notify(
          "error",
          // err['status'] + "\t" + err['statusText']
          this.getErrMsg()
        );
      }
      this.wrongOTPCount = this.wrongOTPCount + 1;
      console.log(err);
      // this.next();//must delete/hide
      if (this.wrongOTPCount > 2) {
        this.prepareOTPObj(otp);
        this.service.validateOTP(this.otpObj4Validation).subscribe(res => {

        }, (err) => { });
        this.notifierService.hideOldest();
        $("#ibanValidation").modal("show");
      }
    });

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
  prepareOTPObj(otp) {
    let langu = 'E';
    if (localStorage.getItem("lang") == 'ar') {
      langu = 'A';
    }
    this.otpObj4Validation['Langu'] = langu;
    this.otpObj4Validation['Tin'] = this.tin;
    this.otpObj4Validation['Otp'] = otp;
    this.otpObj4Validation['Action'] = '01';
    if (this.wrongOTPCount > 2) {
      this.otpObj4Validation['Action'] = '42';
    }

    this.otpObj4Validation['RdBt'] = 'P';
  }

  submit(newPWD) {
    this.prepareCreatePWDObj(newPWD);
    this.service.createPWD(this.createPWDObj).subscribe(res => {
      console.log('submit newPWD ->', res);
      // this.notifierService.notify("success", "Success");
      this.next();
    }, (err) => {
      console.log('newPWD post() err', err);
      this.notifierService.hideOldest();
      this.notifierService.notify(
        "error",
        err['status'] + "\t" + err['statusText']
      );

    });

  }
  prepareCreatePWDObj(newPWD) {
    let langu = 'E';
    if (localStorage.getItem("lang") == 'ar') {
      langu = 'A';
    }
    this.createPWDObj['Langu'] = langu;
    this.createPWDObj['Tin'] = this.tin;
    this.createPWDObj['NewPwd'] = newPWD;
    this.createPWDObj['Action'] = '40';
    this.createPWDObj['RdBt'] = 'P';
  }
  redirectToLoginPage() {
    window.open(this.loginURL, "_self");
  }
  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57) || x == 45) return true;
    else return false;
  }
  checkTinorEmail() {
    if (this.commonVaidation.isEmailValid(this.tin)) {

      this.service.getTins(this.tin).subscribe(
        (res) => {
          this.isEmail = true;
          this.tinList = res["d"]["results"];
        },
        (err) => {
          this.tinErrMsg = this.lang.s1.err.e12;
          this.isEmail = false;
        }
      );
    } else {
      this.isEmail = false;
    }
  }
  hideErr() {
    this.tinErr = false;
    this.tinErrMsg = "";
  }
  ngOnDestroy(): void {
    if (this.timeoutObj) {
      clearTimeout(this.timeoutObj);
    }
  }
}
