import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

import { FormUtilsService } from '../services';

@Component({
  selector: 'app-password-input',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="grid gap-3 relative">
      <label [for]="id">{{ label }}</label>
      <input
        [type]="showPassword ? 'text' : 'password'" 
        [id]="id"
        [formControlName]="controlName"
        class="border rounded-sm px-3 py-2 focus:outline-none"
        [ngClass]="formUtilServices.getInputClasses(formGroup, controlName)"
        [placeholder]="placeholder"/>

      <button
        type="button"
        (click)="togglePassword()"
        class="absolute right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        [ngClass]="{
          'top-3/4': !formUtilServices.isInvalid(formGroup, controlName),
          'top-2/4': formUtilServices.isInvalid(formGroup, controlName)
        }">
        @if (!showPassword) {
          <img width="25" src="assets/icons/eye-line.svg" alt="visible">
        }
        @if (showPassword) {
          <img width="25" src="assets/icons/eye-off-line.svg" alt="oculto">
        }
      </button>

      @if (formUtilServices.isInvalid(formGroup, controlName)) {
        <p class="text-sm text-red-500">
          {{ formUtilServices.getErrorMessage(formGroup, controlName) }}
        </p>
      }
    </div>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class PasswordInputComponent {
    
  @Input() label!: string;
  @Input() id!: string;
  @Input() placeholder!: string;
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;

  showPassword = false;

  constructor(public formUtilServices: FormUtilsService) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}