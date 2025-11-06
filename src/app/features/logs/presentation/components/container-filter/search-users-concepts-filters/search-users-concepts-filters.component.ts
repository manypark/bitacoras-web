import { FormsModule } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { GetAllConceptUsecase } from '@app/concepts/domain';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { GetAllUsersUsecase } from '@app/tasks/domain';
import { LogsService } from '@app/logs/presentation/services';
import { CustomSelectConceptsComponent, CustomSelectComponent } from "@app/shared";

@Component({
  selector    : 'search-users-concepts-filters',
  styleUrl    : './search-users-concepts-filters.component.css',
  templateUrl : './search-users-concepts-filters.component.html',
  imports     : [CustomSelectConceptsComponent, CustomSelectComponent, FormsModule ],
})
export class SearchUsersConceptsFiltersComponent {

  // #=============== dependencias ===============#
  readonly logsListServices = inject(LogsService);
  private readonly getUsersUsecase = inject(GetAllUsersUsecase);
  private readonly getConceptsUsecase = inject(GetAllConceptUsecase);

  // #=============== dependencias ===============#
  selectedUsers  = signal<string[]>([]);
  selectedConcepts  = signal<string[]>([]);

  // #=============== queries ===============#
  readonly usersList = injectQuery( () => ({
    queryKey: ['getUsers'],
    queryFn : () => this.getUsersUsecase.execute(),
  }));
  
  readonly conceptsList = injectQuery( () => ({
    queryKey: ['getConcepts'],
    queryFn : () => this.getConceptsUsecase.execute(  50, 0 ),
  }));
  
  // #=============== funciones ===============#
  onUserCreatedChange(values:any) {
    this.logsListServices.idUserAssigned.set( values );
  }
  onConceptsChangeChange(values:any) {
    this.logsListServices.idConcepts.set( values );
  }
}
