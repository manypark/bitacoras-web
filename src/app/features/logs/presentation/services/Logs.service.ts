import { injectQuery } from '@tanstack/angular-query-experimental';
import { computed, inject, Injectable, signal } from '@angular/core';

import { GetLogsListUsecase, LogsParamsEntity } from '@app/logs/domain';

@Injectable({ providedIn: 'root' })
export class LogsService {

  // #================ dependencias ================#
  private readonly getLogsList = inject(GetLogsListUsecase);
  
  // #================ variables ================#
  readonly page = signal(1);
  readonly endDate = signal('');
  readonly startDate = signal('');
  readonly searchLogs = signal('');
  readonly idConcepts = signal('');
  readonly idUserAssigned = signal('');

  // #================ computed ================#
  readonly logsParams = computed<LogsParamsEntity>(() => ({
    limit           : 5,
    offset          : this.page() - 1,
    endDate         : this.endDate(),
    startDate       : this.startDate(),
    idConcepts      : this.idConcepts(),
    idUserAssigned  : this.idUserAssigned()
  }));

  readonly filteredLogs = computed(() => {
    const search = this.searchLogs().toLowerCase().trim();
    const logs = this.logsQuery.data()?.data ?? [];
    return logs.filter( (task) => 
      task.description.toLowerCase().includes(search) || 
      task.idConcept.description.toLowerCase().includes(search)
    );
  });

  // #================ query ================#
  readonly logsQuery = injectQuery(() => ({
    queryKey: ['logsList', this.logsParams()],
    queryFn: () => this.getLogsList.execute( this.logsParams() ),
  }));
  
  // #================ funciones ================#
  nextPage = () => this.page.update((p) => p + 1);
  prevPage = () => (this.page() > 1 ? this.page.update((p) => p - 1) : null);
  retry() { this.logsQuery.refetch(); }
}