import { FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { constants } from "src/app/constants/constants.model";
import { VatServiceService } from "src/app/services/vat-service.service";
import { NotifierService } from "angular-notifier";
declare var $: any;
@Component({
  selector: "app-Create-Password",
  templateUrl: "./Create-Password.component.html",
  styleUrls: ["./Create-Password.component.css"],
})
export class CreatePasswordComponent implements OnInit {
  @Input("direction") direction: string;
  @Input("type2") type: string;
  @Output()
  completed: EventEmitter<string> = new EventEmitter<string>();

  lang;
  errMsgs;
  passwordForm: FormGroup;
  minLen: boolean = false;
  maxLen: boolean = false;
  numSymb: boolean = false;
  caseSens: boolean = false;
  submitted: boolean = false;
  progressVal: number = 0;
  btn: boolean = false;
  matchErr: boolean;
  hide = true;
  hide1 = true;
  htmlStr: any;
  accptErr: boolean;

  constructor(
    private fb: FormBuilder,
    public vatService: VatServiceService,
    public notifierService: NotifierService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.createPassword;
      this.errMsgs = constants.langz.arb.errorMsgs;
      this.direction = constants.langz.arb.dir;
    } else {
      this.lang = constants.langz.eng.createPassword;
      this.direction = constants.langz.eng.dir;
      this.errMsgs = constants.langz.eng.errorMsgs;
    }

    this.passwordForm = this.fb.group(
      {
        // pwd: ["", [Validators.required, Validators.pattern("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/")]],
        pwd: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /(?=\D*\d)(?=.*[$@$!%*#?&])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,16}/
            ),
          ],
        ],
        cnfrmPwd: ["", Validators.required],
        acceptTerms: [false, Validators.required],
      },
      {
        validator: this.mustMatch("pwd", "cnfrmPwd"),
      }
    );

    this.passwordForm
      .get("pwd")
      .valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((change) => {
        console.log("Change :: ", change);
        this.validatePassword(change);
      });
  }

  get f() {
    return this.passwordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log("SUBMITTED");
    console.log(":: passwordForm ::", this.passwordForm);
    if (!this.passwordForm.controls["acceptTerms"].value) this.accptErr = true;
    else this.accptErr = false;

    if (
      this.passwordForm.invalid ||
      !this.passwordForm.controls["acceptTerms"].value
    ) {
      return;
    }
    this.completed.emit(this.passwordForm.get("pwd").value);
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
        this.matchErr = true;
        matchingControl.setErrors(null);
      }
    };
  }

  validatePassword(val) {
    console.log(val);
    let val1 = 0;
    let val2 = 0;
    let val3 = 0;
    let val4 = 0;
    let numberSymbolCheck = new RegExp("(?=\\D*\\d)(?=.*[$@$!%*#?&])");
    let caseCheck = new RegExp("(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])");
    console.log("Progress Value 0:: ", this.progressVal);
    if (val == "" || val == undefined) {
      this.progressVal = 0;
      this.maxLen = false;
      this.maxLen = false;
      this.numSymb = false;
      this.caseSens = false;
      return;
    }
    if (val.length >= 8) {
      this.minLen = true;
      console.log("sadasds", this.passwordForm.value.pwd.length);
      val1 = 25;
    } else {
      this.minLen = false;
    }
    console.log("Progress Value 1:: ", this.progressVal);
    if (val.length <= 16) {
      this.maxLen = true;
      val2 = 25;
    } else {
      this.maxLen = false;
    }
    console.log("Progress Value 2:: ", this.progressVal);
    if (numberSymbolCheck.test(val)) {
      this.numSymb = true;
      val3 = 25;
    } else {
      this.numSymb = false;
    }
    console.log("Progress Value 3:: ", this.progressVal);
    if (caseCheck.test(val)) {
      this.caseSens = true;
      val4 = 25;
    } else {
      this.caseSens = false;
    }
    console.log("Progress Value 4:: ", this.progressVal);

    this.progressVal = val1 + val2 + val3 + val4;
  }

  onDatapush(e) {
    console.log("dfdfd", e);
    this.btn = e;
    // this.storedPosts.push(event);
  }

  getTermsAndCondition() {
    this.vatService.getSignupTermsAndConditions(this.type).subscribe(
      (res) => {
        $("#exampleModal").modal("show");
        console.log("hrml", res);
        this.htmlStr = res["d"]["Zterms"];
        console.log("hrml", this.htmlStr);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
    // this.vatService.getVatTermsAndConditions().subscribe(
    //   (res) => {
    //     $("#exampleModal").modal("show");
    //     console.log("hrml", res);
    //     this.htmlStr = res["d"]["Zterms"];
    //     console.log("hrml", this.htmlStr);
    //   },
    //   (err) => {
    //     this.notifierService.notify(
    //       "error",
    //       err.error.error.innererror.errordetails[0].message
    //     );
    //   }
    // );
  }
}
