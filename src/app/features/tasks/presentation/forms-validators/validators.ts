import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import { TitleVO, DescriptionVO } from "@app/tasks/domain";

export const titleVOValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  try {
    new TitleVO(control.value);
    return null;
  } catch (error) {
    return { titleError: (error as Error).message };
  }
};

export const descriptionVOValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  try {
    new DescriptionVO(control.value);
    return null;
  } catch (error) {
    return { descriptionError: (error as Error).message };
  }
};