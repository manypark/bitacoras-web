import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PaginationComponent } from "@app/roles/presentation/components";
import { FiltersSelectsComponent, DeleteUserDialogComponent } from "../../components";
import { SelectFiltersUsersService, UserSelectedService } from '@app/users/presentation/services';
import { TitleDescriptionCustomButtonComponent, CustomTableComponent, ColumnConfig } from "@app/shared";

@Component({
  selector    : 'users-list',
  templateUrl : './users-list.component.html',
  imports     : [
    FormsModule,
    PaginationComponent,
    CustomTableComponent,
    FiltersSelectsComponent,
    DeleteUserDialogComponent,
    TitleDescriptionCustomButtonComponent,
  ],
})
export default class UsersListComponent {
  // #=============== dependencias ===============#
  readonly router = inject(Router);
  readonly userSelectedServices = inject(UserSelectedService);
  readonly selectAndFilterServices = inject(SelectFiltersUsersService);
  
  // ============ Variables ======================#
  columns:ColumnConfig[] = [
    { key: 'idUser', header: 'ID', type: 'text' },
    { key: 'user', header: 'Usuario', type: 'text' },
    { key: 'email', header: 'Correo', type: 'text' },
    { key: 'rolesList', header: 'Roles', type: 'array' },
    { key: 'active', header: 'Estatus', type: 'booleanBadge' },
    { key: 'avatarUrl', header: 'Avatar', type: 'image' },
  ];

  // ============ funciones ======================#
  onTableAction(event: { action: string; row:any }) {
    if( event.action === 'edit' ) {
      this.goToCreateUpdateUser(event.row.idUser);
      return;
    }
    const modalId = event.action === 'edit' ? 'custom-edit-user' : event.action === 'delete' ? 'custom-delete-user': null;
    if (modalId) {
      const modal = document.getElementById(modalId) as HTMLDialogElement | null;
      this.userSelectedServices.setSelectedUser(event.row);
      modal?.showModal();
    }
  }

  retryGetAllUsers( value:boolean ) {
    if(value) { this.selectAndFilterServices.usersListSelect.refetch(); }
  }

  goToCreateUpdateUser( idUser?:number ) {
    if(idUser) this.router.navigate([`/home/users/create-update/${idUser}`]);
    if(!idUser) this.router.navigate([`/home/users/create-update`]);
  }
}