import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import { LastNameVO } from "../../auth/register/domain/value-objects";

export function lastNameVOValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    try {
      new LastNameVO(control.value);
      return null;
    } catch (e: any) {
      return { lastNameVO: { valid: false, message: e.message } };
    }
  };
}