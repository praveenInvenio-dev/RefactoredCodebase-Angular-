import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
import * as moment from 'moment-hijri';

export class CustomValidators {

    static emailValidator(confirmEmailInput: string): ValidatorFn {
        let confirmEmailControl: FormControl;
        let emailControl: FormControl;

        return (control: FormControl) => {
            if (!control.parent) {
                return null;
            }

            if (!confirmEmailControl) {
                confirmEmailControl = control;
                emailControl = control.parent.get(confirmEmailInput) as FormControl;
                emailControl.valueChanges.subscribe(() => {
                    confirmEmailControl.updateValueAndValidity();
                });
            }

            // && emailControl.value
            if (confirmEmailControl.valid && emailControl.value !== confirmEmailControl.value) {
                return {
                    notMatch: true
                };
            }
            return null;
        };
    }
    static startsWithValidator(startString: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const isStarting = 0 === control.value.indexOf(startString);
            return isStarting ? null : { 'startsWith': { value: control.value } };
        };
    }
    static companyIDValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            console.log("companyIDValidator");
            return { 'invalidID': { value: control.value } };
        };
    }
    static futureDateValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            let date = control.value.calendarStart;
            let calendarType = control.value.calendarName;
            let format = "YYYY/MM/DD";
            if (calendarType == "Islamic") {
                format = 'iYYYY/iMM/iDD';
            }
            let timeStamp = moment(date.year + '/' + date.month + '/' + date.day, format).valueOf();
            // console.log("futureDateValidator",calendarType, date.year + '/' + date.month + '/' + date.day, date, timeStamp, new Date().getTime() < timeStamp);
            let futureDate = new Date().getTime() < timeStamp;
            console.log(futureDate);
            if (futureDate) {
                control.markAsTouched();
            }
            return futureDate ? { 'futureDate': true } : null;
        };
    }
    static containsOnlyNumbers(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            var regexp = /^\d+$/;
            let isOnlyNumbers = false;
            isOnlyNumbers = regexp.test(control.value);
            return isOnlyNumbers ? { 'containsOnlyNumbers': { value: control.value } } : null
        };
    }
    static startsWithZeroValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            // var regexp = /^[1-9]{1}[0-9]+/;
            var regexp = /^[1-9][0-9]*$/
            let startsWithZero = false;
            startsWithZero = !regexp.test(control.value);
            return startsWithZero ? { 'startsWithZero': { value: control.value } } : null
        };
    }
    static specialCharctersValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            let regexp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            // let regexp = new RegExp("(?=.*[$@$!%*#?&])");
            const containsSpecialChars = regexp.test(control.value);
            return containsSpecialChars ? { 'containsSpecialChars': { value: control.value } } : null
        };
    }
    static minLengthValidator(length: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            // if (!control.value) {
            //   return null;
            // }
            const minlength = control.value.length < length;
            return minlength ? { 'minlength': true } : null;
        };
    }
    static maxLengthValidator(length: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            // if (!control.value) {
            //   return null;
            // }
            const maxlength = !control.value || (control.value.length > length);
            return maxlength ? { 'maxlength': true } : null;
        };
    }
    static atLeastOneUpperValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            // if (!control.value) {
            //   return null;
            // }
            const atLeastOneUpper = /[A-Z]+/.test(control.value);
            return atLeastOneUpper ? null : { 'atLeastOneUpper': true };
        };
    }
    static atLeastOneLowerValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            // if (!control.value) {
            //   return null;
            // }
            const atLeastOneLower = /[a-z]+/.test(control.value);
            return atLeastOneLower ? null : { 'atLeastOneLower': true };
        };
    }
    static atLeastOneSpecialCharValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            // if (!control.value) {
            //   return null;
            // }
            let regexp = new RegExp("(?=.*[$@$!%*#?&])");
            const atLeastOneSpecialChar = regexp.test(control.value);
            return atLeastOneSpecialChar ? null : { 'atLeastOneSpecialChar': true };
        };
    }
    static atLeastOneNumberValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            // if (!control.value) {
            //   return null;
            // }
            let regexp = new RegExp("(?=\\D*\\d)");
            const atLeastOneNumber = regexp.test(control.value);
            return atLeastOneNumber ? null : { 'atLeastOneNumber': true };
        };
    }
    static pwdValidator(pwdctrlInput: string): ValidatorFn {

        let confirmPwdControl: FormControl;
        let pwdControl: FormControl;

        return (control: FormControl) => {
            if (!control.parent) {
                return null;
            }

            if (!confirmPwdControl) {
                confirmPwdControl = control;
                pwdControl = control.parent.get(pwdctrlInput) as FormControl;
                pwdControl.valueChanges.subscribe(() => {
                    confirmPwdControl.updateValueAndValidity();
                });
            }

            if (!pwdControl.value || !confirmPwdControl.value || pwdControl.value !== confirmPwdControl.value) {
                return {
                    notMatch: true
                };
            }
            return null;
        };
    }
    static percentageValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let percentageValueError = false;
            let onlydecimal = false;
            let splits = control.value ? control.value.split(".") : [];
            if (splits.length > 1 && !splits[1]) {
                onlydecimal = true;
            }
            if (!control.value) {
                return null;
            } else if (isNaN(control.value)) {
                //error
                percentageValueError = true;
            } else if (control.value && onlydecimal) {
                percentageValueError = true;
            }
            else if (control.value && Number(control.value) > 100) {
                //error
                percentageValueError = true;
            } else if (Number(control.value) < 100) {
                percentageValueError = false;
                if (control.value.toString().length > 7) {
                    percentageValueError = true;
                }
            }
            return percentageValueError ? { 'percentage': true } : null;
        };
    }
    static EmailValidator(confirmEmailInput: string) {
        let confirmEmailControl: FormControl;
        let emailControl: FormControl;

        return (control: FormControl) => {
            if (!control.parent) {
                return null;
            }

            if (!confirmEmailControl) {
                confirmEmailControl = control;
                emailControl = control.parent.get(confirmEmailInput) as FormControl;
                emailControl.valueChanges.subscribe(() => {
                    confirmEmailControl.updateValueAndValidity();
                });
            }

            // && emailControl.value
            if (confirmEmailControl.valid && emailControl.value !== confirmEmailControl.value) {
                return {
                    notMatch: true
                };
            }
            return null;
        };
    }
}
