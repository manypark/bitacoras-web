import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { PaginationComponent } from "@app/roles/presentation/components";
import { SelectFiltersUsersService, UserSelectedService } from '@app/users/presentation/services';
import { FiltersSelectsComponent, DeleteUserDialogComponent } from "../../components";
import { TitleDescriptionCustomButtonComponent, CustomTableComponent, ColumnConfig } from "@app/shared";

@Component({
  selector    : 'app-users',
  styleUrl    : './users.component.css',
  templateUrl : './users.component.html',
  imports     : [
    FormsModule,
    PaginationComponent,
    CustomTableComponent,
    FiltersSelectsComponent,
    DeleteUserDialogComponent,
    TitleDescriptionCustomButtonComponent,
  ],
})
export default class UsersComponent {
  // #=============== dependencias ===============#
  readonly userSelectedServices = inject(UserSelectedService);
  readonly selectAndFilterServices = inject(SelectFiltersUsersService);
  
  // ============ Variables ======================#
  columns:ColumnConfig[] = [
    { key: 'idUser', header: 'ID', type: 'text' },
    { key: 'user', header: 'Usuario', type: 'text' },
    { key: 'email', header: 'Correo', type: 'text' },
    { key: 'active', header: 'Estatus', type: 'booleanBadge' },
    { key: 'avatarUrl', header: 'Avatar', type: 'image' },
  ];

  // ============ funciones ======================#
  onTableAction(event: { action: string; row:any }) {
    const modalId = event.action === 'edit' ? 'custom-edit-user' : event.action === 'delete' ? 'custom-delete-user': null;
    if (modalId) {
      const modal = document.getElementById(modalId) as HTMLDialogElement | null;
      this.userSelectedServices.setSelectedUser(event.row);
      modal?.showModal();
    }
  }

  retryGetAllRoles( value:boolean ) {
    if(value) { this.selectAndFilterServices.usersListSelect.refetch(); }
  }
}