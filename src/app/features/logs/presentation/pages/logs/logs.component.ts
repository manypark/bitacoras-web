import { Component, inject } from '@angular/core';

import { LogsService } from '@app/logs/presentation/services';
import { ColumnConfig, CustomTableComponent, TitleDescriptionCustomButtonComponent } from '@app/shared';
import { PaginationComponent } from "@app/roles/presentation/components";
import { LogsMapComponent } from "../../components/logs-maps/LogsMap/logs-map.component";
import { SearchUsersConceptsFiltersComponent } from '@app/logs/presentation/components/container-filter/search-users-concepts-filters/search-users-concepts-filters.component';

@Component({
  selector    : 'app-logs',
  styleUrl    : './logs.component.css',
  templateUrl : './logs.component.html',
  imports: [
    LogsMapComponent,
    PaginationComponent,
    CustomTableComponent,
    SearchUsersConceptsFiltersComponent,
    TitleDescriptionCustomButtonComponent
],
})
export default class LogsComponent {

  readonly logsListServices = inject(LogsService);

  columns:ColumnConfig[] = [
      { key: 'idLogs', header: 'ID', type: 'text' },
      { key: 'idUser', header: 'Usuario', type: 'text' },
      { key: 'image_url', header: 'Imagen', type: 'image' },
      { key: 'idConcept', header: 'Concepto', type: 'text' },
      { key: 'description', header: 'Descripción', type: 'text' },
      { key: 'createdAt', header: 'Fecha creación', type: 'date' },
  ];

  retryQueries( event:boolean ) {
    if(event) { this.logsListServices.retry() }
  }
}