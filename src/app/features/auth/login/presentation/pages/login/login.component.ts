import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

import { SignInService } from '../../signals/signIn.service';
import { EmailVO, PasswordVO } from '../../../domain/value-objects';

@Component({
  selector    : 'app-login',
  imports     : [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl : './login.component.html',
  styleUrl    : './login.component.css',
})
export default class LoginComponent implements OnInit {

  signInForm!:FormGroup;
  showPassword = false;
  private fb = inject(FormBuilder);
  private signInServices = inject(SignInService);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.signInForm = this.fb.group({
      email     : ['', [Validators.required, emailVOValidator()] ],
      password  : ['', [Validators.required, passwordVOValidator()] ],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  isInvalid(controlName: string): boolean {
    const control = this.signInForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  getInputClasses(controlName: string): string {
    return this.isInvalid(controlName)
      ? 'border-red-500 bg-red-50 focus:ring focus:ring-red-300'
      : 'border-gray-300 focus:ring focus:ring-blue-300';
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.signInForm.get(controlName);
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

  onSubmit() {
    if (this.signInForm.valid) {

      const emailVO     = new EmailVO(this.signInForm.value.email);
      const passwordVO  = new PasswordVO(this.signInForm.value.password);

      this.signInServices.signIn( emailVO, passwordVO );
    }
  }

}

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