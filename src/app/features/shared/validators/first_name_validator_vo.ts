import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { FirstNameVO } from "../../auth/register/domain/value-objects";

export function firstNameVOValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    try {
      new FirstNameVO(control.value);
      return null;
    } catch (e: any) {
      return { firstNameVO: { valid: false, message: e.message } };
    }
  };
}