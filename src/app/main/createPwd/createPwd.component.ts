import { FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { constants } from "src/app/constants/constants.model";
import { ForgotUserPWD } from '../../constants/ForgotUserPWD';``
@Component({
  selector: 'app-createpwd',
  templateUrl: './createPwd.component.html',
  styleUrls: ['./createPwd.component.css']
})
export class CreatePwdComponent implements OnInit {
  @Input("direction") direction: string;
  // @Input("prevPwd") prevPwd: string = '';
  @Output()
  completed: EventEmitter<string> = new EventEmitter<string>();
  // @Output()
  // formStat: EventEmitter<string> = new EventEmitter<string>();

  lang;
  dir: string;
  errMsgs;
  passwordForm: FormGroup;
  minLen: boolean = false;
  maxLen: boolean = false;
  numSymb: boolean = false;
  caseSens: boolean = false;
  submitted: boolean = false;
  progressVal: number = 0;
  btn: boolean = false;
  isDisabled: boolean = false;
  hide = true;
  hide1 = true;
  cnfmHide = true;
  matchErr: boolean;
  continue: string;
  constructor(private fb: FormBuilder) { }
  individual
  ngOnInit() {

    if (localStorage.getItem("lang") === "ar") {
      this.lang = ForgotUserPWD.langz.arb;
      this.dir = ForgotUserPWD.langz.arb.dir;
      this.continue = "التالي";

    } else {
      this.lang = ForgotUserPWD.langz.eng;
      this.dir = ForgotUserPWD.langz.eng.dir;
      this.continue = "Continue";
    }

    this.passwordForm = this.fb.group(
      {
        prevPwd: ["", [
          Validators.required,
          Validators.pattern(
            /(?=\D*\d)(?=.*[$@$!%*#?&])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,16}/
          ),
        ],],
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

    // this.formStat.emit("true");
    this.completed.emit(this.passwordForm.value);
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
      val1 = 25;
    } else {
      this.minLen = false;
    }
    console.log("Progress Value 1:: ", this.progressVal);
    if (val.length < 16) {
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
    console.log("dfdfd", e)
    this.btn = e;
    // this.storedPosts.push(event);
  }
}
