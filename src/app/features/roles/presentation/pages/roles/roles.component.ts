import { HttpResourceRef } from '@angular/common/http';
import { Component, effect, signal } from '@angular/core';

import { ToastService } from '@app/shared/toast';
import { ApiResponse } from '@utils/api_response';
import { CustomTableComponent } from "@app/shared";
import { ROLES_KEYS, RolesEntity } from '@app/roles/domain';
import { RolesRepositoryImpl } from '@app/roles/infrastructure/repositories';

@Component({
  selector    : 'app-roles',
  imports     : [ CustomTableComponent ],
  templateUrl : './roles.component.html',
  styleUrl    : './roles.component.css',
})
export default class RolesComponent {

  ref:HttpResourceRef<ApiResponse<RolesEntity[]>>;
  roles = signal<RolesEntity[]>([]);
  keys = ROLES_KEYS;

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

  onTableAction(event: { action: string; row: RolesEntity }) {
    if (event.action === 'edit') {
      this.toast.info('Editar', `Editar rol ${event.row.name}`);
    } else if (event.action === 'delete') {
      this.toast.error('Eliminar', `Eliminar rol ${event.row.name}`);
    }
  }
}