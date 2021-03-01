import { Component, OnInit, Output, Input, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { constants } from 'src/app/constants/constants.model';
import { ForgotUserPWD } from '../constants/ForgotUserPWD';
declare var $: any;
@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OTPVerificationComponent implements OnInit, OnDestroy {

  @Input("resend") resendFlag: boolean;
  @Output()
  resend: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  validateOTP: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('e1') public e1;
  @ViewChild('e2') public e2;
  @ViewChild('e3') public e3;
  @ViewChild('e4') public e4;

  lang;
  errMsg;
  otp = [];
  mobileNum;
  direction;
  enableResendButton: boolean = false;
  counter;
  counterDisplay;
  counterSubscription: Subscription;

  constructor() { }
  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
    this.counterSubscription.unsubscribe();
  }

  ngOnInit() {
    this.resetCounter();
    this.resetResendFlag();
    this.disableResendBtn();
    setTimeout(() => {
      $("#e1Id").focus();
    }, 1);
    this.counterSub();

    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.otp;
      this.errMsg = ForgotUserPWD.langz.arb;
      this.direction = constants.langz.arb.dir;

    } else {
      this.lang = constants.langz.eng.otp;
      this.errMsg = ForgotUserPWD.langz.eng;
      this.direction = constants.langz.eng.dir;
    }
  }
  counterSub() {
    this.transform();
    this.counterSubscription = interval(1000).subscribe((count) => {
      this.counter = this.counter - 1;
      this.transform();
    });
  }

  ngDoCheck(): void {
    if (this.counter === 0) {
      this.counterSubscription.unsubscribe();
      this.enableResendBtn();
    } else {
      this.disableResendBtn();
    }
    if (this.resendFlag) {
      this.resetResendFlag();
      this.resetCounter();
      this.counterSub();
    }

  }
  resetResendFlag() {
    this.resendFlag = false;
  }
  resetCounter() {
    this.counter = 120;
  }
  enableResendBtn() {
    this.enableResendButton = true;
  }

  disableResendBtn() {
    this.enableResendButton = false;
  }

  getOTPFromUser(otp) {
    console.log("getOTPFromUser :: " + otp, otp.length);
    if (otp.length == 4) {
      this.validateOTP.emit(otp);
      this.resetOTPValues();

      for (let i = 0; i < otp.length; i++)
        this.otp.pop();

      this.resetCounter();
    }
  }
  resetOTPValues() {
    this.e1.nativeElement.value = '';
    this.e2.nativeElement.value = '';
    this.e3.nativeElement.value = '';
    this.e4.nativeElement.value = '';
  }

  keyUpEvent(event, index) {
    if (event.keyCode === 8) {
      // event.preventDefault();
    } else {
      this.otp[index - 1] = event.target.value;
      let nextInput = event.srcElement.nextElementSibling;
      if (index <= 3 && nextInput !== null) {
        nextInput.focus();
      }
      if (index == 4) {
        this.e1.nativeElement.focus();
      }
      this.getOTPFromUser(this.otp.join(""));
    }
  }

  resendOTP() {
    this.disableResendBtn();
    this.resetOTPValues();
    this.resend.emit();

  }
  transform() {
    if (this.counter >= 0) {
      const minutes: number = Math.floor(this.counter / 60);
      const seconds = this.counter - minutes * 60;
      let secDisplay = seconds + '';
      if (seconds < 10) {
        secDisplay = "0" + seconds;
      }
      this.counterDisplay = minutes + ':' + secDisplay;
    }

  }
}
