import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { GetAllRolesUsecase } from '@app/roles/domain/usecase';
import { CreateUpdateUserFormService } from '@app/users/presentation/services';

@Component({
  selector    : 'roles-list-select',
  templateUrl : './roles-list-select.component.html',
  imports     : [

  ],
})
export class RolesListSelectComponent {
  // #=============== dependencias ===============#
  private getAllRolesUsecase = inject(GetAllRolesUsecase);
  readonly createUpdateUserFormServices = inject(CreateUpdateUserFormService);
  
  // #=============== queries ===============#
  rolesList = injectQuery( () => ({
    queryKey: ['rolesList'],
    queryFn : () => this.getAllRolesUsecase.execute( 100, 0 ),
  }));
}