import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { SelectFiltersUsersService } from '@app/users/presentation/services';
import { CustomSelectComponent, CustomSelectRolesComponent } from "@app/shared";

@Component({
  selector    : 'filters-selects',
  templateUrl : './filters-selects.component.html',
  imports     : [
    FormsModule,
    CustomSelectComponent,
    CustomSelectRolesComponent,
  ],
})
export class FiltersSelectsComponent {
  // #=============== dependencias ===============#
  readonly selectAndFilterServices = inject(SelectFiltersUsersService);
}