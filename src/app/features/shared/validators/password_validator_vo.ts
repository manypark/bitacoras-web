import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import { PasswordVO } from "../../auth/login/domain/value-objects";

export function passwordVOValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    try {
      // Intenta crear una instancia de tu Value Object con el valor del campo
      new PasswordVO(control.value);
      // Si no hay error, la validación es exitosa
      return null;
    } catch (e: any) {
      // Si EmailVO lanza un error, la validación falla
      // Puedes capturar el mensaje de error o usar un error genérico
      return { passwordVO: { valid: false, message: e.message } };
    }
  };
}