import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { Component, computed, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { GetLogsInfoUsecase } from '@app/dashboards/domain';

Chart.register(...registerables);

@Component({
  selector: 'logs-chart',
  imports: [BaseChartDirective],
  template    : `
  @if  ( logsInfo.isLoading() ) {
      <div class="card bg-base-100 w-96 h-96 shadow-md p-8 border border-gray-100 flex justify-center items-center">
          <span class="loading loading-ring loading-xl"></span>
      </div>
  }

  @if ( logsInfo.data() && !logsInfo.isLoading() ) {
      <div class="card bg-base-100 w-96 shadow-md p-8 border border-gray-100">
          <h1 class="text-2xl font-bold"> Bitacoras </h1>
          <canvas baseChart [data]="barChartData()" type="pie"></canvas>
      </div>
  }`,
})
export class LogsChartComponent {
    // #=============== dependencias ==============#
  private readonly logsInfoUsecase = inject(GetLogsInfoUsecase);

  // #=============== query ==============#
  logsInfo = injectQuery( () => ({
    queryKey: ['logsInfoChart'],
    queryFn : () => this.logsInfoUsecase.execute(),
  }));
  
  // #=============== charts computed ==============#
  barChartData = computed<ChartConfiguration<'pie'>['data']>( () => {

    const actives   = this.logsInfo.data()?.data?.actives ?? 0;
    const inactives = this.logsInfo.data()?.data?.inactives ?? 0;

    return {
      labels  : ['Activos', 'Inactivos'],
      datasets: [{
        data            : [actives, inactives],
        label           : 'Bitacoras',
        backgroundColor : ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
      }],
    };
  });
}