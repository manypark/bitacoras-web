import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, computed, inject, signal } from '@angular/core';

import { GetAllConceptUsecase } from '@app/concepts/domain';
import { GetLogsByConceptUsecase } from '@app/dashboards/domain';

@Component({
  selector    : 'logs-by-concepts-chart',
  templateUrl : './logs-by-concepts-chart.component.html',
  imports     : [ BaseChartDirective ],
})
export class LogsByConceptsChartComponent {

  private readonly getConceptsUsecase = inject(GetAllConceptUsecase);
  private readonly logsByConceptUsecase = inject(GetLogsByConceptUsecase);

  idConcepts = signal<string>('');

  readonly getConceptsQuery = injectQuery( () => ({
    queryKey: [ 'allConcepts'],
    queryFn : () => this.getConceptsUsecase.execute( 100, 0 ),
  }));

  readonly query = injectQuery(() => ({
      queryKey: ['logsByConcepts'],
      queryFn : () => this.logsByConceptUsecase.execute( this.idConcepts() ),
  }));

  barChartData = computed<ChartConfiguration<'bar'>['data']>( () => {

      const labels    = this.query.data()?.data.map( log => log.concept ) ?? [''];
      const dataLogs  = this.query.data()?.data.map( log => log.total ) ?? [0];

        return {
            labels    : labels,
            datasets  : [{
              label           : 'Bitacoras por concepto',
              data            : dataLogs,
              backgroundColor : [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
            }],
        };
    });

}