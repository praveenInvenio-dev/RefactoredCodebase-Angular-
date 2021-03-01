import { ProfileService } from "src/app/services/profile.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { interval, Subscription } from "rxjs";
import { NotifierService } from "angular-notifier";
import { environment } from "src/environments/environment";
import { constants } from "src/app/constants/constants.model";
import { ProfileConstants } from "src/app/constants/profileConstants";

declare var $: any;

@Component({
  selector: "app-update-email",
  templateUrl: "./update-email.component.html",
  styleUrls: ["./update-email.component.css"],
})
export class UpdateEmailComponent implements OnInit {
  codes: any;
  name = "";
  name1 = "";
  currentTab: any;
  optionActive = 1;
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
  payload = JSON.parse(JSON.stringify(ProfileConstants.updateMobilePayload));
  hide = true;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
  logouturl = environment.logouturl;

  @ViewChild("e1") public e1;
  @ViewChild("e2") public e2;
  @ViewChild("e3") public e3;
  @ViewChild("e4") public e4;
  resendFlag: boolean;
  emailForm: FormGroup;
  matchErr: boolean;
  submitted: boolean;
  password: any;
  prevpwd = "";
  email: any;
  lang;
  dir: string;
  pwdErr: boolean;

  constructor(
    public appSrv: AppService,
    private router: Router,
    private fb: FormBuilder,
    private profileSrv: ProfileService,
    public notifierService: NotifierService
  ) {}

  ngOnInit() {
    // this.counterSubscription = interval(1000).subscribe((count) => {
    //   console.log((this.counter = this.counter - 1));
    this.transform();
    // });

    if (localStorage.getItem("lang") === "ar") {
      this.menu = ProfileConstants.updateEmailMenuArb;
      this.lang = constants.langz.arb.updtEmail;
      this.dir = constants.langz.arb.dir;
    } else {
      this.menu = ProfileConstants.updateEmailMenuEng;
      this.lang = constants.langz.eng.updtEmail;
      this.dir = constants.langz.eng.dir;
    }

    this.emailForm = this.fb.group(
      {
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

  get f() {
    return this.emailForm.controls;
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

  onSubmit() {
    this.submitted = true;
    // $("#openModal").modal("show");
    if (this.emailForm.invalid) {
      return;
    }
    this.NextStep(2);
  }

  NextStep(id) {
    this.currentTab = id;
    this.optionActive = id;
    if (id == 3) {
      setTimeout(() => {
        $("#e1Id").focus();
      }, 1);
    }
    // this.defaultCss(id);
  }

  // defaultCss(id) {
  //   this.defaultValue += id;
  // }

  back() {
    if (this.optionActive > 1) {
      this.optionActive--;
      this.counterSubscription.unsubscribe();
    } else {
      this.router.navigate(["mains/profile"]);
    }
  }

  resendOTP() {
    if (true) {
      this.resend = false;
      this.retryCount = this.retryCount + 1;

      this.payload["Email"] = this.emailForm.value.email;
      this.payload["PrevEmail"] = localStorage.getItem("email");
      this.payload["EmailChk"] = "1";
      this.payload["VerifyEmail"] = "X";
      this.payload["Taxpayerz"] = localStorage.getItem("gpart");
      this.payload["Partner"] = localStorage.getItem("gpart");

      if (this.payload["EmailLoginCd"] !== "") {
        this.payload["EmailLoginCd"] = "";
      }

      if (this.payload["Conf"] == "X") {
        this.payload["Conf"] = "";
      }

      this.payload["PasswordChk"] = "";
      this.payload["PasswordNew"] = "";
      this.payload["PasswordOld"] = "";
      this.payload["PreviousPwd"] = "";

      this.profileSrv.updateEmail(this.payload).subscribe(
        (res) => {
          this.resendFlag = true;
          console.log("Resend OTP Res :: ", res);
          this.enableResendButton = false;
          this.notifierService.notify("success", this.lang.errMsgs.e7);
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
      this.router.navigate(["mains/dashboard"]);
    }
  }

  // keyUpEvent(event, index) {
  //   this.otp[index - 1] = event.target.value;
  //   let nextInput = event.srcElement.nextElementSibling;
  //   if (index <= 3 && nextInput !== null) {
  //     nextInput.focus();
  //   }

  keyUpEvent(event, index) {
    var x = event.which || event.keycode;
    this.otp[index - 1] = event.target.value;
    let nextInput = event.srcElement.nextElementSibling;
    if (index <= 3 && nextInput !== null) {
      if ((x >= 48 && x <= 57) || /[0-9]/.test(event.target.value)) {
        nextInput.focus();
      } else {
        event.currentTarget.value = "";
      }
    }

    if (index == 4) {
      this.e1.nativeElement.focus();
    }
    this.getOTPFromUser(this.otp.join(""));
    console.log(this.otp);
    // console.log(event);
    console.log(index);
  }

  getOTPFromUser(otp) {
    console.log("getOTPFromUser :: " + otp, otp.length);
    if (otp.length == 4) {
      this.validateOTP(otp);
      this.e1.nativeElement.value = "";
      this.e2.nativeElement.value = "";
      this.e3.nativeElement.value = "";
      this.e4.nativeElement.value = "";
      for (let i = 0; i < otp.length; i++) this.otp.pop();
    }
  }

  validateOTP(otp) {
    console.log("getOTPFromUser :: " + otp);

    this.payload["EmailLoginCd"] = otp;
    this.payload["Email"] = this.emailForm.value.email;
    this.payload["PrevEmail"] = localStorage.getItem("email");
    this.payload["EmailChk"] = "1";
    this.payload["VerifyEmail"] = "";
    this.payload["Conf"] = "X";
    this.payload["Taxpayerz"] = localStorage.getItem("gpart");
    this.payload["Partner"] = localStorage.getItem("gpart");
    this.payload["PasswordChk"] = "1";
    this.payload["PasswordNew"] = this.password;
    this.payload["PasswordOld"] = this.password;
    this.payload["PreviousPwd"] = this.prevpwd;
    this.payload["MobileChk"] = "";
    this.payload["MobileLoginCd"] = "";

    this.profileSrv.updateEmail(this.payload).subscribe(
      (res) => {
        console.log(res);
        this.email = res["d"]["Email"];
        // this.notifierService.notify("success", "OTP Validated");
        this.counterSubscription.unsubscribe();
        $("#openModal").modal("show");
        this.next(4);
      },
      (err) => {
        console.log("post() err", err);
        let errMsg = "";
        // this.counter = 120;
        // this.counterSubscription.unsubscribe();
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
        // this.enableResendButton = true;
        // this.wrongOTPCount = this.wrongOTPCount + 1;
        console.log(err);
        // this.next();//must delete/hide
      }
    );
  }

  ngDoCheck(): void {
    if (this.counter === 0) {
      this.counterSubscription.unsubscribe();
      this.enableResendButton = true;
    }
    if (this.resendFlag) {
      this.resendFlag = false;
      this.enableResendButton = false;
      this.counter = 120;
      this.counterSubscription = interval(1000).subscribe((count) => {
        console.log("Resend", (this.counter = this.counter - 1));
        this.transform();
      });
    }
  }

  next(id) {
    this.optionActive = id;
    if (this.optionActive === 4) this.isSuccess = true;
  }

  transform() {
    const minutes: number = Math.floor(this.counter / 60);
    const seconds = this.counter - minutes * 60;
    let secDisplay = seconds + "";
    if (seconds < 10) {
      secDisplay = "0" + seconds;
    }
    this.counterDisplay = minutes + ":" + secDisplay;
  }

  formStat(val) {
    if (val === "false") {
      this.pwdErr = true;
      return;
    } else {
      this.pwdErr = false;
    }
  }

  submit(val) {
    console.log(val);
    this.password = val.pwd;
    this.prevpwd = val.prevPwd;
    this.pwdErr = false;

    this.payload["Email"] = this.emailForm.value.email;
    this.payload["PrevEmail"] = localStorage.getItem("email");
    this.payload["EmailChk"] = "1";
    this.payload["VerifyEmail"] = "X";
    this.payload["Taxpayerz"] = localStorage.getItem("gpart");
    this.payload["Partner"] = localStorage.getItem("gpart");

    if (this.payload["EmailLoginCd"] !== "") {
      this.payload["EmailLoginCd"] = "";
    }

    if (this.payload["Conf"] == "X") {
      this.payload["Conf"] = "";
    }

    this.payload["PasswordChk"] = "1";
    this.payload["PasswordNew"] = this.password;
    this.payload["PasswordOld"] = this.password;
    this.payload["PreviousPwd"] = this.prevpwd;

    this.profileSrv.updateEmail(this.payload).subscribe(
      (res) => {
        console.log(res);
        this.enableResendButton = false;
        this.NextStep(3);
        this.next(3);
        this.notifierService.notify("success", this.lang.errMsgs.e7);
        this.counterSubscription = interval(1000).subscribe((count) => {
          console.log((this.counter = this.counter - 1));
          this.transform();
        });
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  logout() {
    $("#openModal").modal("hide");
    console.log("test");
    localStorage.clear();
    setTimeout(() => {
      window.location.replace(this.logouturl);
    });
  }
}
