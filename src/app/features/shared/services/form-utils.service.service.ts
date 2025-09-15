import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormUtilsService {

   /** Verifica si un control es inválido y fue tocado */
  isInvalid(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  /** Devuelve las clases de error o normales para un input */
  getInputClasses(form: FormGroup, controlName: string): string {
    return this.isInvalid(form, controlName)
      ? 'border-red-500 bg-red-50 focus:ring focus:ring-red-300'
      : 'border-gray-300 focus:ring focus:ring-blue-300';
  }

  /** Obtiene el mensaje de error de un control */
  getErrorMessage(form: FormGroup, controlName: string): string | null {
    const control = form.get(controlName);
    if (!control || !control.errors) return null;

    if (control.hasError('required')) {
      return 'Este campo es obligatorio.';
    }

    if (control.hasError('emailVO')) {
      return control.getError('emailVO').message;
    }

    if (control.hasError('passwordVO')) {
      return control.getError('passwordVO').message;
    }

    return null;
  }

}