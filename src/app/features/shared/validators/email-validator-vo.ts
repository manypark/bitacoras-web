import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

import { EmailVO } from "../../auth/login/domain/value-objects";

export function emailVOValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    try {
      // Intenta crear una instancia de tu Value Object con el valor del campo
      new EmailVO(control.value);
      // Si no hay error, la validación es exitosa
      return null;
    } catch (e: any) {
      // Si EmailVO lanza un error, la validación falla
      // Puedes capturar el mensaje de error o usar un error genérico
      return { emailVO: { valid: false, message: e.message } };
    }
  };
}