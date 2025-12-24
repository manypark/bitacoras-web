import { FormsModule } from '@angular/forms';
import { Component, computed, inject, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { GetAllRoles } from '@app/roles/domain';
import { GetAllUsersFilteredUsecase, GetAllUsersUsecase } from '@app/tasks/domain';
import { TitleDescriptionCustomButtonComponent, CustomSelectComponent, CustomSelectRolesComponent, CustomTableComponent, ColumnConfig } from "@app/shared";
import { PaginationComponent } from "@app/roles/presentation/components";

@Component({
  selector    : 'app-users',
  styleUrl    : './users.component.css',
  templateUrl : './users.component.html',
  imports     : [
    FormsModule,
    PaginationComponent,
    CustomTableComponent,
    CustomSelectComponent,
    CustomSelectRolesComponent,
    TitleDescriptionCustomButtonComponent,
  ],
})
export default class UsersComponent {
  // #=============== dependencias ===============#
  private readonly getAllRolesUsecase = inject(GetAllRoles);
  private readonly getUsersUsecase = inject(GetAllUsersUsecase);
  private readonly getUsersFiltertedUsecase = inject(GetAllUsersFilteredUsecase);

  // ============ Variables ============
  readonly searchUsers = signal('');
  readonly page = signal(1);
  selectedUsers = signal<string[]>([]);
  selectedRoles = signal<string[]>([]);
  readonly usersParams = computed(() => ({
    idUsers : this.selectedUsers(),
    idRoles : this.selectedRoles(),
    limit   : 5,
    offset  : this.page() - 1,
  }));
  columns:ColumnConfig[] = [
      { key: 'idUser', header: 'ID', type: 'text' },
      { key: 'user', header: 'Usuario', type: 'text' },
      { key: 'email', header: 'Correo', type: 'text' },
      { key: 'active', header: 'Estatus', type: 'booleanBadge' },
      { key: 'avatarUrl', header: 'Avatar', type: 'image' },
  ];

  // #=============== funciones ===============#
  nextPage = () => this.page.update((p) => p + 1);
  prevPage = () => (this.page() > 1 ? this.page.update((p) => p - 1) : null);

  // #=============== queries ===============#
  readonly usersList = injectQuery( () => ({
    queryKey: ['getUsersList'],
    queryFn : () => this.getUsersUsecase.execute(),
  }));

  readonly usersListSelect = injectQuery( () => ({
    queryKey: ['getUsersListSelect', this.usersParams()],
    queryFn : () => this.getUsersFiltertedUsecase.execute( this.usersParams() ),
  }));

  readonly rolesList = injectQuery( () => ({
    queryKey: ['getRolesList'],
    queryFn : () => this.getAllRolesUsecase.execute( 100, 0 ),
  }));
}