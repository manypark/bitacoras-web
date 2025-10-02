import { HttpResourceRef } from '@angular/common/http';
import { Component, effect, signal } from '@angular/core';

import { RolesEntity } from '@app/roles/domain';
import { ApiResponse } from '@utils/api_response';
import { RolesRepositoryImpl } from '@app/roles/infrastructure/repositories';
import { ToastService } from '@app/shared/toast';

@Component({
  selector    : 'app-roles',
  imports     : [],
  templateUrl : './roles.component.html',
  styleUrl    : './roles.component.css',
})
export default class RolesComponent {

  ref:HttpResourceRef<ApiResponse<RolesEntity[]>>;

  roles = signal<RolesEntity[]>([]);
  constructor(
    private repository: RolesRepositoryImpl,
    private toast     : ToastService,
  ) {
    this.ref = this.repository.getAllRoles();

    effect( () => {
      const data = this.ref.value();
      if(data) {
        this.roles.set(data.data);
        this.toast.success('Petición exitosa', 'Roles cargados correctamente');
      }
      
      if( this.ref.error() )
      this.toast.success('Petición fallida', this.ref.error()?.message ?? 'Hubo algún error' );
    });
  }


}