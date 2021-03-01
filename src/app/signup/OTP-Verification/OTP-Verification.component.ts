import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { Subscription, interval } from "rxjs";
import { AppService } from "src/app/app.service";
import { constants } from "src/app/constants/constants.model";

declare var $: any;
@Component({
  selector: "app-otp-verification",
  templateUrl: "./OTP-Verification.component.html",
  styleUrls: ["./OTP-Verification.component.css"],
})
export class OTPVerificationComponent implements OnInit, OnDestroy {
  @Input("resend") resendFlag: boolean;
  @Input("mobile") mobile: string;
  @Output()
  resend: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  validateOTP: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild("e1") public e1;
  @ViewChild("e2") public e2;
  @ViewChild("e3") public e3;
  @ViewChild("e4") public e4;

  lang;
  otp = [];
  mobileNum;
  direction;
  enableResendButton: boolean = false;
  counter: number = 120;
  counterSubscription: Subscription;

  constructor(public appService: AppService) {
    this.appService.data6.subscribe((res) => {
      console.log("res", res);
      if (res === "1") {
        $("#one").focus();
        this.e1.nativeElement.value = "";
        this.e2.nativeElement.value = "";
        this.e3.nativeElement.value = "";
        this.e4.nativeElement.value = "";
        this.otp = [];
      }
    });
  }
  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
    this.counterSubscription.unsubscribe();
  }

  ngOnInit() {
    this.counterSubscription = interval(1000).subscribe((count) => {
      console.log((this.counter = this.counter - 1));
    });
    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.otp;
      this.direction = constants.langz.arb.dir;
    } else {
      this.lang = constants.langz.eng.otp;
      this.direction = constants.langz.eng.dir;
    }
    this.mobile = this.mobile.substr(-4);
  }

  ngDoCheck(): void {
    if (this.counter === 0) {
      this.counterSubscription.unsubscribe();
      this.enableResendButton = true;
    }
    if (this.resendFlag) {
      this.resendFlag = false;
      this.counter = 120;
      this.enableResendButton = false;
      this.otp = [];
      this.counterSubscription = interval(1000).subscribe((count) => {
        console.log("Resend", (this.counter = this.counter - 1));
        if (this.counter === 0) {
          this.counterSubscription.unsubscribe();
          this.enableResendButton = true;
        }
      });
    }
  }

  getOTPFromUser(otp) {
    console.log("getOTPFromUser :: " + otp, otp.length);
    if (otp.length === 4) {
      this.validateOTP.emit(otp);
    }
  }

  keyUpEvent(event, index) {
    this.otp[index - 1] = event.target.value;
    let nextInput = event.srcElement.nextElementSibling;
    if (index <= 3 && nextInput !== null) {
      nextInput.focus();
    }
    //this.direction === "rtl" ? (this.otp = this.otp.reverse()) : this.otp = this.otp;
    this.getOTPFromUser(this.otp.join(""));
    console.log(this.otp);
    // console.log(event);
  }

  resendOTP() {
    this.resend.emit();
    this.enableResendButton = false;
    this.e1.nativeElement.value = "";
    this.e2.nativeElement.value = "";
    this.e3.nativeElement.value = "";
    this.e4.nativeElement.value = "";
  }
}
