import { FormsModule } from '@angular/forms';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, computed, inject, Input, output, signal, WritableSignal } from '@angular/core';

import { CustomSelectComponent } from "@app/shared";
import { GetAllUsersUsecase } from '@app/tasks/domain';

@Component({
  selector    : 'search-and-selects-filters',
  styleUrl    : './SearchAndSelectsFilters.component.css',
  templateUrl : './SearchAndSelectsFilters.component.html',
  imports     : [ CustomSelectComponent, FormsModule ],
})
export class SearchAndSelectsFiltersComponent {

  // #=============== dependencias ===============#
  private readonly getUsersUsecase = inject(GetAllUsersUsecase);
  
  // #=============== queries ===============#
  readonly usersList = injectQuery( () => ({
    queryKey: ['getUsers'],
    queryFn : () => this.getUsersUsecase.execute(),
  }));

  // #=============== variables ===============#
  idUserCreatedSelected = signal<string>('');
  idUserAsignedSelected = signal<string>('');
  selectedUsersCreated  = signal<string[]>([]);
  selectedUsersAsigned  = signal<string[]>([]);
  @Input({ required: true }) searchTask!: WritableSignal<string>;
  
  // #=============== outputs ===============#
  userCreatedChange = output<string[]>();
  userAssignedChange = output<string[]>();
  
  // #=============== funciones ===============#
  onUserCreatedChange(values:any) {
    this.idUserCreatedSelected.set(values);
    this.userCreatedChange.emit(values);
  }

  onUserAssignedChange(values:any) {
    this.idUserAsignedSelected.set(values);
    this.userAssignedChange.emit(values);
  }
}