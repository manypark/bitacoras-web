import { Component, computed, inject, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { ColumnConfig, CustomTableComponent } from '@app/shared';
import { GetLogsListUsecase, LogsParamsEntity } from '@app/logs/domain';

@Component({
  selector    : 'app-logs',
  styleUrl    : './logs.component.css',
  templateUrl : './logs.component.html',
  imports     : [CustomTableComponent],
})
export default class LogsComponent {

  private readonly getLogsList = inject(GetLogsListUsecase);

  readonly page = signal(1);
  readonly rageDate = signal('');
  readonly searchLogs = signal('');
  readonly idConcepts = signal('');
  readonly idUserAssigned = signal('');
  columns:ColumnConfig[] = [
      { key: 'idLogs', header: 'ID', type: 'text' },
      { key: 'idUser', header: 'Usuario', type: 'text' },
      { key: 'image_url', header: 'Imagen', type: 'text' },
      { key: 'idConcept', header: 'Concepto', type: 'text' },
      { key: 'description', header: 'Descripción', type: 'text' },
      { key: 'location', header: 'Localización', type: 'text' },
  ];

  readonly logsParams = computed<LogsParamsEntity>(() => ({
    limit           : 5,
    offset          : this.page() - 1,
    endDate         : this.rageDate(),
    startDate       : this.rageDate(),
    idConcepts      : this.idConcepts(),
    idUserAssigned  : this.idUserAssigned()
  }));

  readonly logsQuery = injectQuery(() => ({
    queryKey: ['logsList', this.logsParams()],
    queryFn: () => this.getLogsList.execute( this.logsParams() ),
  }));

  readonly filteredLogs = computed(() => {
    const search = this.searchLogs().toLowerCase().trim();
    const logs = this.logsQuery.data()?.data ?? [];
    return logs.filter( (task) => 
      task.description.toLowerCase().includes(search) || 
      task.idConcept.description.toLowerCase().includes(search)
    );
  });

  onTableAction( event:any ) {

  }

}