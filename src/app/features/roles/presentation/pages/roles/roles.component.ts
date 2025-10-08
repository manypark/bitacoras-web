import { HttpResourceRef } from '@angular/common/http';
import { Component, effect, signal } from '@angular/core';

import { ToastService } from '@app/shared/toast';
import { ApiResponse } from '@utils/api_response';
import { CustomTableComponent } from "@app/shared";
import { ROLES_KEYS, RolesEntity } from '@app/roles/domain';
import { RoleSelectionService } from '@app/roles/presentation/signals';
import { RolesRepositoryImpl } from '@app/roles/infrastructure/repositories';
import { EditDialogComponent, DeleteDialogComponent } from "../../components";

@Component({
  selector    : 'app-roles',
  imports: [
    CustomTableComponent,
    EditDialogComponent,
    DeleteDialogComponent
],
  templateUrl : './roles.component.html',
  styleUrl    : './roles.component.css',
})
export default class RolesComponent {

  ref:HttpResourceRef<ApiResponse<RolesEntity[]>>;
  roles = signal<RolesEntity[]>([]);
  keys = ROLES_KEYS;

  constructor(
    private repository          : RolesRepositoryImpl,
    private toast               : ToastService,
    private roleSelectedServices: RoleSelectionService
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
      const modal = document.getElementById('custom-edit-role') as HTMLDialogElement | null;
      this.roleSelectedServices.setSelectedRole(event.row);
      modal?.showModal();
    }

    if (event.action === 'delete') {
      const modal = document.getElementById('custom-delete-role') as HTMLDialogElement | null;
      this.roleSelectedServices.setSelectedRole(event.row);
      modal?.showModal();
    }

  }

  retryGetAllRoles( value:boolean ) {
    if(value) {
      this.roles.set([]);
      this.ref.reload();
    }
  }
}