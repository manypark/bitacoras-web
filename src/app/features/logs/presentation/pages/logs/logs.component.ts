import { Component, inject } from '@angular/core';

import { LogsService } from '@app/logs/presentation/services';
import { ColumnConfig, CustomTableComponent } from '@app/shared';
import { PaginationComponent } from "@app/roles/presentation/components";
import { SearchUsersConceptsFiltersComponent } from '@app/logs/presentation/components/container-filter/search-users-concepts-filters/search-users-concepts-filters.component';

@Component({
  selector    : 'app-logs',
  styleUrl    : './logs.component.css',
  templateUrl : './logs.component.html',
  imports: [CustomTableComponent, PaginationComponent, SearchUsersConceptsFiltersComponent],
})
export default class LogsComponent {

  readonly logsListServices = inject(LogsService);

  columns:ColumnConfig[] = [
      { key: 'idLogs', header: 'ID', type: 'text' },
      { key: 'idUser', header: 'Usuario', type: 'text' },
      { key: 'image_url', header: 'Imagen', type: 'image' },
      { key: 'idConcept', header: 'Concepto', type: 'text' },
      { key: 'description', header: 'Descripción', type: 'text' },
  ];

  onTableAction(event:any) {}

  retryQueries( event:boolean ) {
    if(event) { this.logsListServices.retry() }
  }
}