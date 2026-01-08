import { GetAllRolesUsecase } from '@app/roles/domain';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { computed, inject, Injectable, signal } from '@angular/core';

import { GetAllUsersFilteredUsecase, GetAllUsersUsecase } from '@app/tasks/domain';

@Injectable({ providedIn: 'root' })
export class SelectFiltersUsersService {
  // #=============== dependencias ===============#
  private readonly getUsersUsecase = inject(GetAllUsersUsecase);
  private readonly getAllRolesUsecase = inject(GetAllRolesUsecase);
  private readonly getUsersFiltertedUsecase = inject(GetAllUsersFilteredUsecase);
  
  // #=============== variables ===============#
  readonly page = signal(1);
  readonly searchUsers = signal('');
  selectedUsers = signal<string[]>([]);
  selectedRoles = signal<string[]>([]);
  readonly usersParams = computed(() => ({
    idUsers : this.selectedUsers(),
    idRoles : this.selectedRoles(),
    limit   : 5,
    offset  : this.page() - 1,
  }));
  
  // #=============== funciones ===============#
  nextPage = () => this.page.update((p) => p + 1);
  prevPage = () => (this.page() > 1 ? this.page.update((p) => p - 1) : null);

  // #=============== query ===============#
  readonly usersList = injectQuery( () => ({
      queryKey: ['getUsersList'],
      queryFn : () => this.getUsersUsecase.execute(),
    }));

  readonly rolesList = injectQuery( () => ({
    queryKey: ['getRolesList'],
    queryFn : () => this.getAllRolesUsecase.execute( 100, 0 ),
  }));

  readonly usersListSelect = injectQuery( () => ({
    queryKey: ['getUsersListSelect', this.usersParams()],
    queryFn : () => this.getUsersFiltertedUsecase.execute( this.usersParams() ),
  }));
}