import { Directive } from "@angular/core";
import { NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { AbstractControl, ValidatorFn } from "@angular/forms";

// validation function
function validateJuriNameFactory(): ValidatorFn {
  return (c: AbstractControl) => {
    let isValid = /^(?=.*?[A-Za-z])[A-Za-z0-9 -]+$/.test(c.value);

    if (isValid) {
      return null;
    } else {
      return {
        juriName: {
          valid: false,
        },
      };
    }
  };
}
@Directive({
  selector: "[Alpha]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: NameValidator, multi: true }
  ]
})
export class NameValidator implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = validateJuriNameFactory();
  }

  validate(c: AbstractControl) {
    return this.validator(c);
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }
}
