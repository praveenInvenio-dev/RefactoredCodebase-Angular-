import { Component, OnInit, Output, Input, EventEmitter, OnDestroy, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AppService } from "src/app/app.service";
import { constants } from './signup-otp.constants';

declare var $: any;
@Component({
  selector: 'signup-otp',
  templateUrl: './signup-otp.component.html',
  styleUrls: ['./signup-otp.component.css']
})
export class SignupOtpComponent implements OnInit {
  @Input("params") params = {
    "IdType": "",
    "Id": "",
    "MobileNo": "",
    "OtpType": ""
  };
  lang;
  otp = [];
  direction;
  enableResendButton: boolean = false;
  CaseGuid: any;
  retryCount: number = 1;
  incorrectOTPCount: number = 0;
  timeLeft: number = 120;
  interval;

  @Output() onOTPSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onInvalidOTP: EventEmitter<any> = new EventEmitter<any>();
  @Output() onOTPError: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("e1") public e1;
  @ViewChild("e2") public e2;
  @ViewChild("e3") public e3;
  @ViewChild("e4") public e4;
  Cremailid: string = "";
  Crmobno: string = "";

  constructor(public appService: AppService, public notifierService: NotifierService, private router: Router) { }
  ngOnInit() {
    //console.log("OTP Component INIT()");
    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.otp;
      this.direction = constants.langz.arb.dir;
    } else {
      this.lang = constants.langz.eng.otp;
      this.direction = constants.langz.eng.dir;
    }
    this.params.MobileNo
    this.sendOTP();
  }

  sendOTP() {
    //console.log("sendOTP");
    let otpObj = {
      "IdType": this.params.IdType,
      "Id": this.params.Id,
      "OtpType": this.params.OtpType ? this.params.OtpType : "002",
      "BuDob": null,
      "CommMobNo": "",
      "CommMobileOtp": "",
      "MobileNo": this.params.MobileNo,
      "MobileOtp": "",
      "OtpVer": "",
    };
    this.appService.getOTP(otpObj).subscribe((response) => {
      this.CaseGuid = response["d"]["CaseGuid"];
      if (this.params.OtpType == "003") {
        this.Cremailid = response["d"]["Cremailid"] || "";
        this.Crmobno = response["d"]["Crmobno"] || "";
        this.params.MobileNo = this.Crmobno;
        if (!this.Crmobno) {
          this.onOTPError.emit(response);
          this.stopTimer();
        } else {
          this.stopTimer();
          this.startTimer();
          this.e1.nativeElement.focus();
          this.notifierService.notify("success", this.lang.e19);
        }

      } else {
        this.stopTimer();
        this.startTimer();
        this.e1.nativeElement.focus();
        this.notifierService.notify("success", this.lang.e19);
      }

    }, (err) => {
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
    });
  }
  keyUpEvent(event, index) {
    this.otp[index - 1] = event.target.value;
    let nextInput = event.srcElement.nextElementSibling;
    if (index <= 3 && nextInput !== null) {
      nextInput.focus();
    }
    this.getOTPFromUser(this.otp.join(""));
    //console.log(this.otp);
  }

  getOTPFromUser(otp) {
    //console.log("getOTPFromUser :: " + otp, otp.length);
    if (otp.length === 4) {
      this.verifyOTP(otp);
    }
  }
  startTimer() {
    this.timeLeft = 120;
    this.interval = setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft--;
      } else {
        this.stopTimer();
        this.enableResendButton = true;
      }
    }, 1000);
  }
  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.timeLeft = 0;
    }
  }

  verifyOTP(otp) {
    //console.log("verifyOTP");
    //console.log(otp);
    //console.log("incorrectOTPCount", this.incorrectOTPCount);
    let otpObj = {
      "IdType": this.params.IdType,
      "Id": this.params.Id,
      "OtpType": this.params.OtpType ? this.params.OtpType : "002",
      "BuDob": null,
      "CommMobNo": "",
      "CommMobileOtp": otp,
      "MobileNo": this.params.MobileNo,
      "MobileOtp": "",
      "OtpVer": "1",
      "Zsubmit": "X",
      "CaseGuid": this.CaseGuid
    };
    this.appService.getOTP(otpObj).subscribe((response) => {

      if (response["d"]["Zvalidate"]) {
        if (this.params.OtpType == "003") {
          response["d"]["Cremailid"] = this.Cremailid;
          response["d"]["Crmobno"] = this.Crmobno;
        } else {
          response["d"]["Cremailid"] = "";
          response["d"]["Crmobno"] = "";
        }
        this.onOTPSuccess.emit(response);
      } else {
        this.notifierService.notify("error", this.lang.e20);
        this.clearOTP();
        this.incorrectOTPCount++;
        if (this.incorrectOTPCount > 4) {
          this.notifierService.notify("error", "Maximun attempts reached");
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 2000);
        } else {
          this.onInvalidOTP.emit(response);
        }
      }
    }, (err) => {
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
      this.onOTPError.emit(err);
    });
  }

  resendOTP() {
    //console.log("resendOTP");
    this.enableResendButton = false;
    this.incorrectOTPCount = 0;
    this.clearOTP();
    if (this.retryCount < 5) {
      this.retryCount++;
      this.sendOTP();
    } else {
      this.notifierService.notify("error", "Maximun attempts reached");
      this.router.navigate(["/login"]);
    }
  }

  clearOTP() {
    this.e1.nativeElement.value = "";
    this.e2.nativeElement.value = "";
    this.e3.nativeElement.value = "";
    this.e4.nativeElement.value = "";
    this.otp = [];
    this.e1.nativeElement.focus();
  }
  ngOnDestroy(): void {
    this.stopTimer();
  }
}

