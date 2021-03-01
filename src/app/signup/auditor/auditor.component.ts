import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { AppService } from "src/app/app.service";
import { CommonValidation } from "src/app/constants/commonValidations";
import { constants } from "src/app/constants/constants.model";
import { MustMatch } from "src/app/constants/Mustmatch";
import { VATConstants } from "src/app/constants/VATConstants";
import { SignupService } from "src/app/services/signup.service";

//Declare jquery
declare var $: any;
@Component({
  selector: "app-auditor",
  templateUrl: "./auditor.component.html",
  styleUrls: ["./auditor.component.css"],
})
export class AuditorComponent implements OnInit {
  //Declared Variables
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;
  auditorForm: FormGroup;
  contactsForm: FormGroup;
  submitted = false;
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
  retryCount = 1;
  resendObj: any;
  enableResendButton: boolean;
  otpRespObj: any;
  no: any;
  name: any;
  type = "govt";
  type2 = "NREG";
  codes: any;
  caseuid: any;
  submitted1: boolean;
  cityList = [];
  criteria: { property: string; descending: boolean };
  cncode = "966";
  maxLength = 10;
  licenseList = [];
  returnId: any;
  //docType: any;
  files = [];
  numsAttachment = 2;
  title = "test2";
  docType = "SU02";
  id = 0;
  show1: boolean = false;
  show2: boolean = false;
  showFlag = [];
  cityName: any;
  errd: any[];
  indErr: any;

  constructor(
    public notifierService: NotifierService,
    public appSrv: AppService,
    private router: Router,
    public commonVaidation: CommonValidation,
    public signupService: SignupService,
    private formBuilder: FormBuilder
  ) {
    this.criteria = {
      property: "CityCode",
      descending: false,
    };
  }

  ngOnInit(): void {
    for (var i = 0; i < 2; i++) {
      this.showFlag.push(false);
    }

    this.auditorForm = this.formBuilder.group(
      {
        tin: [
          "",
          [Validators.required, tinValidation, Validators.minLength(10)],
        ],
        name: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /^[a-zA-Z\u0600-\u06FF ][\sa-zA-Z\u0600-\u06FF ]*$/
            ),
          ],
        ],
        licenseNo: [
          "",
          [Validators.required, Validators.pattern(/^[-_a-zA-Z0-9.]+$/)],
        ],
        licenseBy: ["", Validators.required],
        licenseCity: ["", Validators.required],
        cncode: ["966"],
        attach1: ["", Validators.required],
        attach2: ["", Validators.required],
        mobile: ["", [Validators.required, mobileValidation]],
        email: [
          "",
          [
            Validators.required,
            Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
          ],
        ],
        cemail: [
          "",
          [
            Validators.required,
            Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
          ],
        ],
      },
      {
        validator: MustMatch("email", "cemail"),
      }
    );

    this.files = [];

    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.Auditor;
      this.direction = constants.langz.arb.dir;
      this.criteria.property = "CityName";
      this.licenseList = VATConstants.licenseListArb;
      this.indErr = constants.langz.arb.individual.indErr;
    } else {
      this.lang = constants.langz.eng.Auditor;
      this.direction = constants.langz.eng.dir;
      this.criteria.property = "CityName";
      this.licenseList = VATConstants.licenseList;
      this.indErr = constants.langz.eng.individual.indErr;
    }
    this.optionActive = 1;

    //Fetch phone codes
    this.appSrv.getPhoneCode().subscribe((res) => {
      this.codes = res["d"]["results"];
      this.codes.forEach((item) => {
        item["maxLength"] = 13 - item.Telefto.length;
      });
    });

    //Fetch GUID
    this.signupService.getCaseGuid().subscribe((res) => {
      this.caseuid = res["d"]["results"][0].CaseGuid;
    });

    //Fetch City Names
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

      this.signupService.getGovernment().subscribe((res) => {});
    });

    for (var i = 0; i < 2; i++) {
      let obj = {
        name: "",
        size: 0,
      };
      this.files.push(obj);
    }

    //Attachment Related settings
    this.appSrv.updatedDataSelection12([]);

    this.appSrv.data12.subscribe((res) => {
      this.files = res;
      this.showFlag = [];
      this.files.forEach((item) => {
        if (item.name !== "") {
          this.showFlag.push(true);
        } else {
          this.showFlag.push(false);
        }
      });
      if (this.showFlag[0]) {
        this.auditorForm.controls.attach1.setValue("test");
      } else {
        this.auditorForm.controls.attach1.setValue("");
      }
      if (this.showFlag[1]) {
        this.auditorForm.controls.attach2.setValue("test");
      } else {
        this.auditorForm.controls.attach2.setValue("");
      }
    });
  }

  //Method to navigate back
  backClick(id) {
    if (id === 1) {
      this.optionActive = id;
    }
  }

  //Method to navigate forward
  NextStep(id) {
    this.currentTab = id;
    this.optionActive = id;
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

  //Get the current selected cityname.
  getCityname(item) {
    this.cityName = item.CityName;
  }

  //Submit method for Audtior form
  submit(val) {
    let obj = {
      ALang: "",
      AType: "3",
      ALicenceNo: this.auditorForm.controls.licenseNo.value,
      ATin: this.auditorForm.controls.tin.value,
      ACompany: this.auditorForm.controls.name.value,
      AEmail: this.auditorForm.controls.email.value,
      APhone: "00966",
      AMobile:
        this.auditorForm.controls.cncode.value +
        this.auditorForm.controls.mobile.value,
      ACountry: "SA",
      AIssuedBy: this.auditorForm.controls.licenseNo.value,
      CaseGuid: this.caseuid,
      ACity: this.cityName,
      ACityCode: this.auditorForm.controls.licenseCity.value,
      APractcingCert: "1",
      ALicDoc: "1",
      ATinExist: "X",
      ASmsCode: "",
      ASubmit: "",
      APassword: "",
    };

    if (val !== "") {
      (obj.APassword = val), (obj.ASubmit = "X");
      obj.ASmsCode = "0106";
    } else {
      //     this.getOtp2("");
    }

    this.direction === "rtl" ? (obj.ALang = "A") : (obj.ALang = "E");

    this.signupService.postGovernment(obj).subscribe(
      (res) => {
        if (val === "") {
          this.getOtp2("");
        } else {
          this.no = res["d"]["Fbnum"];
          this.name = res["d"]["ACompany"];
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

  //Get the otp response from OTP component
  getOTPFromUser(otp) {
    if (otp.length === 4) {
      this.getOtp2(otp);
    }
  }

  //Resend OTP method
  resendOTP() {
    if (this.retryCount < 5) {
      this.resend = false;
      this.retryCount = this.retryCount + 1;
      this.appSrv.getOTP(this.resendObj).subscribe(
        (res) => {
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

  //Function for formcontrol
  get f() {
    return this.auditorForm.controls;
  }

  //Submit method for the first step
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.auditorForm.invalid) {
      return;
    }
    this.mobile = this.auditorForm.controls.mobile.value;
    this.submit("");
  }

  //Reset the form
  onReset() {
    this.submitted = false;
    this.auditorForm.reset();
  }

  //Open the attachments component
  openAttachment(id, doc, title) {
    let obj = {
      caseid: this.caseuid,
      title: title,
      id: id,
      docType: doc,
      numsattach: this.numsAttachment,
    };
    this.appSrv.updatedDataSelection10(obj);
    $("#attch").modal("show");
  }

  //Restrict the user to enter text
  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if (x >= 48 && x <= 57) return true;
    else return false;
  }

  //Method to send the otp
  getOtp2(otp) {
    let obj = {};
    obj["IdType"] = "ZS0004";
    obj["Id"] = this.auditorForm.controls.licenseNo.value;
    obj["OtpType"] = "001";
    // obj["BuDob"] = value.changeDate(
    //   value.Birthdt["calendarStart"]
    // );
    obj["MobileNo"] =
      "00" +
      this.auditorForm.controls.cncode.value +
      this.auditorForm.controls.mobile.value;
    obj["CommMobNo"] =
      "00" +
      this.auditorForm.controls.cncode.value +
      this.auditorForm.controls.mobile.value;
    obj["OtpVer"] = "1";
    if (otp != "") {
      obj["Zsubmit"] = "X";
      obj["CommMobileOtp"] = otp;
    } else {
      obj["CommMobileOtp"] = otp;
    }
    obj["CaseGuid"] = this.caseuid;
    this.resendObj = obj;
    this.appSrv.getOTP(obj).subscribe(
      (res) => {
        this.appSrv.updatedDataSelection6("0");
        this.showVerification = true;
        this.caseuid = res["d"]["CaseGuid"];
        if (res["d"]["Zvalidate"]) {
          this.showVerification = false;
          this.NextStep(3);
        } else {
          if (obj["CommMobileOtp"] === "") {
            // this.counterSubscription = interval(1000).subscribe((count) => {
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

  //Method to get maximum length of phone number
  getMaxLength(val) {
    this.maxLength = val;
    if (this.auditorForm.controls.mobile.value.length < this.maxLength) {
    } else this.auditorForm.controls.mobile.setValue("");
  }
}

//custom validation for tin
function tinValidation(
  control: AbstractControl
): { [key: string]: any } | null {
  const val = control.value;

  if (val == "") {
    return null;
  }

  let first = val.substr(0, 1);
  if (first !== "3") {
    return { tinValidation: true };
  } else {
    return null;
  }
}

//custom validation for Mobile number
function mobileValidation(
  control: AbstractControl
): { [key: string]: any } | null {
  const val = control.value;

  if (val == "") {
    return null;
  }

  let first = val.substring(0, 1);
  if (first === "0") {
    return { mobileValidation: true };
  } else {
    return null;
  }
}
