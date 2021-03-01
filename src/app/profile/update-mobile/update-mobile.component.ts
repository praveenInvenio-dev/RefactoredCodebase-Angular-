import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { interval, Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfileService } from "src/app/services/profile.service";
import { NotifierService } from "angular-notifier";
import { FormControl } from "@angular/forms";
import { environment } from "src/environments/environment";
import { constants } from "src/app/constants/constants.model";
import { ProfileConstants } from "src/app/constants/profileConstants";

declare var $: any;

@Component({
  selector: "app-update-mobile",
  templateUrl: "./update-mobile.component.html",
  styleUrls: ["./update-mobile.component.css"],
})
export class UpdateMobileComponent implements OnInit {
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

  @ViewChild("e1") public e1;
  @ViewChild("e2") public e2;
  @ViewChild("e3") public e3;
  @ViewChild("e4") public e4;
  resendFlag: boolean;
  mobForm: FormGroup;
  matchErr: boolean;
  submitted: boolean;
  selectedCC: any;
  setMobPatternError: boolean;
  payload = JSON.parse(JSON.stringify(ProfileConstants.updateMobilePayload));
  mobile: any;
  maxLengthErr: boolean;
  maxLength: number;
  MobileCountry: any;
  email: any;
  logouturl = environment.logouturl;
  lang: any;
  dir: any;

  constructor(
    public appSrv: AppService,
    private router: Router,
    private fb: FormBuilder,
    private profileSrv: ProfileService,
    public notifierService: NotifierService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.mobForm = this.fb.group(
      {
        cc: [null],
        mob: ["", [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
        confrmCC: [null],
        cnfrmMob: ["", Validators.required],
        // acceptTerms: ["", Validators.required],
      },
      {
        validator: [
          this.mustMatch("mob", "cnfrmMob"),
          this.mustMatch("cc", "confrmCC"),
        ],
      }
    );

    if (localStorage.getItem("lang") === "ar") {
      this.menu = ProfileConstants.updateMobileMenuArb;
      this.lang = constants.langz.arb.updtMobile;
      this.dir = constants.langz.arb.dir;
    } else {
      this.menu = ProfileConstants.updateMobileMenuEng;
      this.lang = constants.langz.eng.updtMobile;
      this.dir = constants.langz.eng.dir;
    }

    this.appSrv.getPhoneCode().subscribe((res) => {
      console.log(res);
      this.codes = res["d"]["results"];
      this.codes.sort(function (a, b) {
        return a.Telefto - b.Telefto;
      });
      this.selectedCC = this.codes.find((c) => c.Telefto == 966);
      this.mobForm.get("cc").setValue(this.selectedCC["Telefto"]);
      this.maxLength = 15 - (this.mobForm.get("cc").value.length + 2);
      this.mobForm.get("confrmCC").setValue(this.selectedCC["Telefto"]);
      console.log(this.selectedCC);
      console.log(this.codes);
    });

    this.mobForm.get("mob").valueChanges.subscribe((query) => {
      console.log(query);
      // this.validateibn(query);
      // if (query.substr(0,1) !== 5) {
      //   this.setMobPatternError = true;
      // } else {
      //   this.setMobPatternError = false;
      // }
    });
  }

  get f() {
    return this.mobForm.controls;
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

  onChange(val) {
    console.log(val);
    this.maxLength = 15 - (val["Telefto"].length + 2);
    this.MobileCountry = val["Land1"];
    if (this.mobForm.value.mob.length < this.maxLength) {
    } else this.mobForm.controls.mob.setValue("");
    // this.name = val;
  }

  onChange1(val) {
    console.log(val);
    // this.name1 = val;
  }

  onSubmit() {
    this.submitted = true;
    // $("#openModal").modal("show");
    console.log("SUBMITTED");
    console.log(":: mobForm ::", this.mobForm);
    if (this.mobForm.invalid) {
      return;
    }
    this.payload["Mobile"] =
      "00" + this.mobForm.get("cc").value + this.mobForm.get("mob").value;
    this.payload["MobileChk"] = "1";
    this.payload["VerifyMobile"] = "X";
    this.payload["MobileCountry"] = this.MobileCountry;
    this.payload["Email"] = localStorage.getItem("email");
    this.payload["Taxpayerz"] = localStorage.getItem("gpart");
    this.payload["Partner"] = localStorage.getItem("gpart");
    this.payload["MobileLoginCd"] = "";
    this.payload["Conf"] = "";
    console.log(this.payload);

    this.profileSrv.updateMobile(this.payload).subscribe(
      (res) => {
        console.log(res);
        this.NextStep(2);
        this.notifierService.notify("success", this.lang.errMsgs.e2);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  NextStep(id) {
    this.currentTab = id;
    this.optionActive = id;
    if (id == 2) {
      setTimeout(() => {
        $("#e1Id").focus();
      }, 1);
      this.counterSubscription = interval(1000).subscribe((count) => {
        console.log((this.counter = this.counter - 1));
        this.transform();
      });
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
      // console.log("Resend OTP req :: ", this.otpRespObj1);`
      this.retryCount = this.retryCount + 1;

      this.payload["VerifyMobile"] = "X";
      this.payload["MobileLoginCd"] = "";
      this.payload["Conf"] = "";

      this.profileSrv.updateMobile(this.payload).subscribe(
        (res) => {
          this.resendFlag = true;
          console.log("Resend OTP Res :: ", res);
          this.enableResendButton = false;
          this.notifierService.notify("success", this.lang.errMsgs.e2);
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

    this.payload["Conf"] = "X";
    this.payload["MobileLoginCd"] = otp;
    this.payload["VerifyMobile"] = "";
    this.payload["MobileChk"] = "1";
    this.payload["MobileCountry"] = this.MobileCountry;
    this.payload["Email"] = localStorage.getItem("email");
    this.payload["Taxpayerz"] = localStorage.getItem("gpart");
    this.payload["Partner"] = localStorage.getItem("gpart");
    this.payload["EmailChk"] = "";
    this.payload["EmailLoginCd"] = "";

    this.profileSrv.updateMobile(this.payload).subscribe(
      (res) => {
        console.log(res);
        this.mobile = res["d"]["Mobile"];
        this.counterSubscription.unsubscribe();
        // this.notifierService.notify(
        //   "success",
        //   "OTP Validated"
        // );
        $("#openModal").modal("show");
        this.next();
      },
      (err) => {
        // this.counter = 120;
        // this.counterSubscription.unsubscribe();
        // this.enableResendButton = true;
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
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

  next() {
    if (this.optionActive < 3) this.optionActive++;

    if (this.optionActive === 3) this.isSuccess = true;
    $("#openModal").modal("show");
    // setTimeout(() => this.logout(), 5000)
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

  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if (x >= 48 && x <= 57) return true;
    else return false;
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
