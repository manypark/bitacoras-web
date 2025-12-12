import { FormsModule } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { GetAllRoles } from '@app/roles/domain';
import { GetAllUsersUsecase } from '@app/tasks/domain';
import { TitleDescriptionCustomButtonComponent, CustomSelectComponent, CustomSelectRolesComponent, CustomTableComponent, ColumnConfig } from "@app/shared";

@Component({
  selector    : 'app-users',
  styleUrl    : './users.component.css',
  templateUrl : './users.component.html',
  imports     : [
      FormsModule,
      CustomSelectComponent,
      CustomSelectRolesComponent,
      CustomTableComponent,
      TitleDescriptionCustomButtonComponent,
  ],
})
export default class UsersComponent {
  // #=============== dependencias ===============#
  private readonly getAllRolesUsecase = inject(GetAllRoles);
  private readonly getUsersUsecase = inject(GetAllUsersUsecase);

  // ============ Variables ============
  readonly searchUsers = signal('');
  selectedUsers = signal<string[]>([]);
  selectedRoles = signal<string[]>([]);
  columns:ColumnConfig[] = [
      { key: 'idUser', header: 'ID', type: 'text' },
      { key: 'user', header: 'Usuario', type: 'text' },
      { key: 'email', header: 'Correo', type: 'text' },
      { key: 'active', header: 'Estatus', type: 'booleanBadge' },
      { key: 'avatarUrl', header: 'Avatar', type: 'image' },
  ];

  // #=============== queries ===============#
  readonly usersList = injectQuery( () => ({
    queryKey: ['getUsersList'],
    queryFn : () => this.getUsersUsecase.execute(),
  }));

  readonly rolesList = injectQuery( () => ({
    queryKey: ['getRolesList'],
    queryFn : () => this.getAllRolesUsecase.execute( 100, 0 ),
  }));
}