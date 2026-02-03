import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PasswordInputComponent, InputGenericFieldComponent } from '@app/shared';
import { CreateUpdateUserFormService, UploadImageManagmenteService } from '@app/users/presentation/services';

@Component({
  selector    : 'create-update-user',
  templateUrl : './create-update-user.component.html',
  imports     : [
    NgOptimizedImage,
    ReactiveFormsModule,
    PasswordInputComponent,
    InputGenericFieldComponent,
  ],
})
export class CreateUpdateUserComponent {
  // #=============== dependencias ===============#
  readonly uploadImageManagment = inject(UploadImageManagmenteService);
  readonly createUpdateUserFormServices = inject(CreateUpdateUserFormService);
}
