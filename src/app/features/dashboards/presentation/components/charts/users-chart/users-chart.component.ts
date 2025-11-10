import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { Component, computed, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { GetUsersInfoUsecase } from '@app/dashboards/domain';

Chart.register(...registerables);

@Component({
  selector    : 'users-chart',
  imports     : [ BaseChartDirective ],
  template    : `
  @if  ( usersInfo.isLoading() ) {
      <div class="card bg-base-100 w-96 h-96 shadow-md p-8 border border-gray-100 flex justify-center items-center">
          <span class="loading loading-ring loading-xl"></span>
      </div>
  }

  @if ( usersInfo.data() && !usersInfo.isLoading() ) {
      <div class="card bg-base-100 w-96 shadow-md p-8 border border-gray-100">
          <h1 class="text-2xl font-bold"> Usuarios </h1>
          <canvas baseChart [data]="barChartData()" type="pie"></canvas>
      </div>
  }`,
})
export class UsersChartComponent {
  // #=============== dependencias ==============#
  private readonly usersInfoUsecase = inject(GetUsersInfoUsecase);

  // #=============== query ==============#
  usersInfo = injectQuery( () => ({
    queryKey: ['usersInfoChart'],
    queryFn : () => this.usersInfoUsecase.execute(),
  }));
  
  // #=============== charts computed ==============#
  barChartData = computed<ChartConfiguration<'pie'>['data']>( () => {

    const actives   = this.usersInfo.data()?.data?.actives ?? 0;
    const inactives = this.usersInfo.data()?.data?.inactives ?? 0;

    return {
      labels  : ['Activos', 'Inactivos'],
      datasets: [{
        data            : [actives, inactives],
        label           : 'Usuarios',
        backgroundColor : ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
      }],
    };
  });
}