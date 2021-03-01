
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { constants } from "src/app/constants/constants.model";
import { VatServiceService } from "src/app/services/vat-service.service";
import { NotifierService } from "angular-notifier";
import {CustomValidators} from '../../../shared/custom-validators';

declare var $: any;

@Component({
  selector: 'signup-create-password',
  templateUrl: './signup-create-password.component.html',
  styleUrls: ['./signup-create-password.component.css']
})
export class SignupCreatePasswordComponent implements OnInit {

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
  accptErr1: boolean;
  @Input("TC") TC: boolean;
  constructor(
    private fb: FormBuilder,
    public vatService: VatServiceService,
    public notifierService: NotifierService
  ) { }

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
        pwd: ['', [
          Validators.required,
          CustomValidators.atLeastOneUpperValidator(),
          CustomValidators.atLeastOneLowerValidator(),
          CustomValidators.atLeastOneSpecialCharValidator(),
          CustomValidators.atLeastOneNumberValidator(),
          CustomValidators.minLengthValidator(8),
          CustomValidators.maxLengthValidator(16)
          // Validators.minLength(8),
          // Validators.maxLength(16),
        ],
        ],
        cnfrmPwd: ["", [Validators.required, CustomValidators.pwdValidator('pwd')]],
        acceptTerms: [false, Validators.required],
        acceptTerms1: [],
      }
    );
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

  onEnterPwd() {
    const control = this.passwordForm.get("pwd");
    let strength = 0;
    if (!control.value) {
      strength = 0;
      this.progressVal = 0;
      return true;
    } else if (control.value && control.valid) {
      strength = 100;
      this.progressVal = 100;
      return true;
    }
    this.progressVal = 0;
    strength = 0;
    if (!control.errors['atLeastOneUpper'] && !control.errors['atLeastOneLower']) {
      strength = strength + 25;
    }

    if (!control.errors['atLeastOneSpecialChar'] && !control.errors['atLeastOneNumber']) {
      strength = strength + 25;
    }
    if (!control.errors['minlength']) {
      strength = strength + 25;
    }
    if (!control.errors['maxlength']) {
      strength = strength + 25;
    }
    this.progressVal = strength;
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
      });
  }
}