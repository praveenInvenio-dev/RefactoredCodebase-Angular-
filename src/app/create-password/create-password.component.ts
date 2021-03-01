import { FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { constants } from "src/app/constants/constants.model";
import { ForgotUserPWD } from '../constants/ForgotUserPWD';
@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {
  @Input("direction") direction: string;
  @Output()
  completed: EventEmitter<string> = new EventEmitter<string>();

  lang;
  dir: string;
  errMsgs;
  passwordForm: FormGroup;
  minLen: boolean = false;
  maxLen: boolean = false;
  numSymb: boolean = false;
  caseSens: boolean = false;
  matchPWDs: boolean = false;
  submitted: boolean = false;
  progressVal: number = 0;
  btn: boolean = false;
  isDisabled: boolean = false;
  hide = true;
  cnfmHide = true;
  constructor(private fb: FormBuilder) { }
  individual
  ngOnInit() {

    if (localStorage.getItem("lang") === "ar") {
      this.lang = ForgotUserPWD.langz.arb;
      this.dir = ForgotUserPWD.langz.arb.dir;

    } else {
      this.lang = ForgotUserPWD.langz.eng;
      this.dir = ForgotUserPWD.langz.eng.dir;
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
            Validators.maxLength
          ],
        ],
        cnfrmPwd: ["", Validators.required],
        // acceptTerms: ["", Validators.required],
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
    this.passwordForm
      .get("cnfrmPwd")
      .valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((change) => {
        console.log("Change :: ", change);
        this.validateCreatePassword(change);
      });
  }

  get f() {
    return this.passwordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log("SUBMITTED");
    console.log(":: passwordForm ::", this.passwordForm);
    if (this.passwordForm.invalid) {
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
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  validateCreatePassword(val) {
    console.log(val);
    
    let val5 = 0;
   
    console.log("Progress Value 0:: ", this.progressVal);
    if (val == "" || val == undefined) {    
      this.matchPWDs = false;
      return;
    }
    
    if (this.isMatched("pwd", "cnfrmPwd")) {
      this.matchPWDs = true;
      val5 = 20;
    } else {
      this.matchPWDs = false;
    }


    console.log("Progress Value 4:: ", this.progressVal);

    this.progressVal = val5;
  }
  validatePassword(val) {
    console.log(val);
    let val1 = 0;
    let val2 = 0;
    let val3 = 0;
    let val4 = 0;
    let val5 = 0;
    let numberSymbolCheck = new RegExp("(?=\\D*\\d)(?=.*[$@$!%*#?&])");
    let caseCheck = new RegExp("(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])");
    console.log("Progress Value 0:: ", this.progressVal);
    if (val == "" || val == undefined) {
      this.progressVal = 0;
      this.minLen = false;
      this.maxLen = false;
      this.numSymb = false;
      this.caseSens = false;
      this.matchPWDs = false;
      return;
    }
    if (val.length >= 8) {
      this.minLen = true;
      val1 = 20;
    } else {
      this.minLen = false;
    }
    console.log("Progress Value 1:: ", this.progressVal);
    if (val.length <= 16) {
      this.maxLen = true;
      val2 = 20;
    } else {
      this.maxLen = false;
    }
    console.log("Progress Value 2:: ", this.progressVal);
    if (numberSymbolCheck.test(val)) {
      this.numSymb = true;
      val3 = 20;
    } else {
      this.numSymb = false;
    }
    console.log("Progress Value 3:: ", this.progressVal);
    if (caseCheck.test(val)) {
      this.caseSens = true;
      val4 = 20;
    } else {
      this.caseSens = false;
    }
    if (this.isMatched("pwd", "cnfrmPwd")) {
      this.matchPWDs = true;
      val5 = 20;
    } else {
      this.matchPWDs = false;
    }


    console.log("Progress Value 4:: ", this.progressVal);

    this.progressVal = val1 + val2 + val3 + val4 + val5;
  }
  isMatched(controlName: string, matchingControlName: string) {

    const control = this.passwordForm.controls[controlName];
    const matchingControl = this.passwordForm.controls[matchingControlName];

    if (control===undefined || matchingControl===undefined || control.value != matchingControl.value) {
      // return if another validator has already found an error on the matchingControl
      // set error on matchingControl if validation fails
      return false;
    }
    return true;

  }
  onDatapush(e) {
    console.log("dfdfd", e)
    this.btn = e;
    // this.storedPosts.push(event);
  }
}
