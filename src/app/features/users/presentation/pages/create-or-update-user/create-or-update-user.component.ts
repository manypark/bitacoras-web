import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';

import { SubmitButtonComponent } from "@app/shared";
import { CreateUpdateUserComponent, RolesListSelectComponent } from '@app/users/presentation/components';
import { CreateUpdateUserFormService, SelectFiltersUsersService, UploadImageManagmenteService } from '@app/users/presentation/services';

@Component({
  selector    : 'create-or-update-user',
  templateUrl : './create-or-update-user.component.html',
  imports: [
    ReactiveFormsModule,
    SubmitButtonComponent,
    RolesListSelectComponent,
    CreateUpdateUserComponent,
  ],
})
export default class CreateOrUpdateUserComponent implements OnInit {
  // #=============== dependencias ===============#
  readonly activatedRoute = inject(ActivatedRoute);
  readonly selectAndFilterServices = inject(SelectFiltersUsersService);
  readonly uploadImageManagment = inject(UploadImageManagmenteService);
  readonly createUpdateUserFormServices = inject(CreateUpdateUserFormService);

  // #=============== ciclo de vida ===============#
  ngOnInit(): void {
    this.createUpdateUserFormServices.initForm();

    this.activatedRoute.params.subscribe( ({id}) => {
      if(id) {
        this.createUpdateUserFormServices.getUserInfo.mutate(id);
        this.createUpdateUserFormServices.idUserParam.set(id);
      } else {
        this.createUpdateUserFormServices.addPasswordValidate(true);
      }
    });
  }
  
  // #=============== funciones ===============#
  isDiabled() : boolean {
    return !this.createUpdateUserFormServices.createOrUpdateUserForm.valid || 
    this.uploadImageManagment.uploadImageProfileMutation.isPending() ||
    this.createUpdateUserFormServices.updateUserMutation.isPending() ||
    this.createUpdateUserFormServices.createUserCompleteMutation.isPending();
  }

  isLoading() : boolean {
    return this.uploadImageManagment.uploadImageProfileMutation.isPending() ||
    this.createUpdateUserFormServices.updateUserMutation.isPending() ||
    this.createUpdateUserFormServices.createUserCompleteMutation.isPending();
  }
}