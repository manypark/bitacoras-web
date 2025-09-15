import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

import { FormUtilsService } from '../services';

@Component({
  selector: 'app-generic-input',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="grid gap-3">
      <label [for]="id">{{ label }}</label>
      <input 
        [type]="type" 
        [id]="id" 
        [formControlName]="controlName"
        class="border rounded-sm px-3 py-2 focus:outline-none"
        [ngClass]="formUtilServices.getInputClasses(formGroup, controlName)"
        [placeholder]="placeholder"/>

      @if (formUtilServices.isInvalid(formGroup, controlName)) {
        <p class="text-sm text-red-500">
          {{ formUtilServices.getErrorMessage(formGroup, controlName) }}
        </p>
      }
    </div>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InputGenericFieldComponent {
  @Input() label!: string;
  @Input() type = 'text';
  @Input() id!: string;
  @Input() placeholder!: string;
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;

  constructor(public formUtilServices:FormUtilsService) {}
}