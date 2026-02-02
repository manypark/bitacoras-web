import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControlStatus, ReactiveFormsModule } from '@angular/forms';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';

import { SubmitButtonComponent } from "@app/shared";
import { CreateUpdateUserComponent, RolesListSelectComponent } from '@app/users/presentation/components';
import { CreateOrUpdateUserFacade, CreateUpdateUserFormService, SelectFiltersUsersService, UploadImageManagmenteService } from '@app/users/presentation/services';

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
  readonly createUpdateFacade = inject(CreateOrUpdateUserFacade);
  readonly createUpdateUserFormServices = inject(CreateUpdateUserFormService);

  // #=============== ciclo de vida ===============#
  ngOnInit(): void {
    this.createUpdateUserFormServices.initForm();

    this.activatedRoute.params.subscribe( ({id}) => {
      this.createUpdateFacade.resetStateForCreate();
      if(id) {
        this.createUpdateFacade.loadUser(id);
        this.createUpdateUserFormServices.idUserParam.set(id);
      } else {
        this.createUpdateUserFormServices.addPasswordValidate(true);
      }
    });
  }
  
  // #=============== funciones ===============#
  async onSubmit() {
    await this.createUpdateFacade.submit();
  }

  readonly isDisabled = computed(() => {
    return  this.uploadImageManagment.uploadImageProfileMutation.isPending() ||
      this.createUpdateUserFormServices.updateUserMutation.isPending() ||
      this.createUpdateUserFormServices.createUserCompleteMutation.isPending();
  });

  readonly isLoading = computed(() => {
    return this.uploadImageManagment.uploadImageProfileMutation.isPending() ||
      this.createUpdateUserFormServices.updateUserMutation.isPending() ||
      this.createUpdateUserFormServices.createUserCompleteMutation.isPending();
  });
}