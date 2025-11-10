import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { Component, computed, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { GetTasksInfoUsecase } from '@app/dashboards/domain';

Chart.register(...registerables);

@Component({
  selector    : 'tasks-chart',
  imports     : [ BaseChartDirective ],
  template    : `
  @if  ( tasksInfo.isLoading() ) {
      <div class="card bg-base-100 w-96 h-96 shadow-md p-8 border border-gray-100 flex justify-center items-center">
          <span class="loading loading-ring loading-xl"></span>
      </div>
  }

  @if ( tasksInfo.data() && !tasksInfo.isLoading() ) {
      <div class="card bg-base-100 w-96 shadow-md p-8 border border-gray-100">
          <h1 class="text-2xl font-bold"> Tareas </h1>
          <canvas baseChart [data]="barChartData()" type="pie"></canvas>
      </div>
  }`,
})
export class TasksChartComponent {
    // #=============== dependencias ==============#
  private readonly tasksInfoUsecase = inject(GetTasksInfoUsecase);

  // #=============== query ==============#
  tasksInfo = injectQuery( () => ({
    queryKey: ['tasksInfoChart'],
    queryFn : () => this.tasksInfoUsecase.execute(),
  }));
  
  // #=============== charts computed ==============#
  barChartData = computed<ChartConfiguration<'pie'>['data']>( () => {

    const actives   = this.tasksInfo.data()?.data?.actives ?? 0;
    const inactives = this.tasksInfo.data()?.data?.inactives ?? 0;

    return {
      labels  : ['Activos', 'Inactivos'],
      datasets: [{
        data            : [actives, inactives],
        label           : 'Tareas',
        backgroundColor : ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
      }],
    };
  });
}
