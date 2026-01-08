import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { FiltersSelectsComponent } from "../../components";
import { PaginationComponent } from "@app/roles/presentation/components";
import { SelectFiltersUsersService } from '@app/users/presentation/services';
import { TitleDescriptionCustomButtonComponent, CustomTableComponent, ColumnConfig } from "@app/shared";

@Component({
  selector    : 'app-users',
  styleUrl    : './users.component.css',
  templateUrl : './users.component.html',
  imports: [
    FormsModule,
    PaginationComponent,
    CustomTableComponent,
    FiltersSelectsComponent,
    TitleDescriptionCustomButtonComponent,
],
})
export default class UsersComponent {
  // #=============== dependencias ===============#
  readonly selectAndFilterServices = inject(SelectFiltersUsersService);
  
  // ============ Variables ============
  columns:ColumnConfig[] = [
      { key: 'idUser', header: 'ID', type: 'text' },
      { key: 'user', header: 'Usuario', type: 'text' },
      { key: 'email', header: 'Correo', type: 'text' },
      { key: 'active', header: 'Estatus', type: 'booleanBadge' },
      { key: 'avatarUrl', header: 'Avatar', type: 'image' },
  ];
}