import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { Component, computed, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { GetRolesInfoUsecase } from '@app/dashboards/domain';

Chart.register(...registerables);

@Component({
  selector: 'roles-chart',
  imports: [ BaseChartDirective ],
  template    : `
  @if  ( rolesInfo.isLoading() ) {
      <div class="card bg-base-100 w-96 h-96 shadow-md p-8 border border-gray-100 flex justify-center items-center">
          <span class="loading loading-ring loading-xl"></span>
      </div>
  }

  @if ( rolesInfo.data() && !rolesInfo.isLoading() ) {
      <div class="card bg-base-100 w-96 shadow-md p-8 border border-gray-100">
          <h1 class="text-2xl font-bold"> Roles </h1>
          <canvas baseChart [data]="barChartData()" type="pie"></canvas>
      </div>
  }`,

})
export class RolesChartComponent {
    // #=============== dependencias ==============#
  private readonly rolesInfoUsecase = inject(GetRolesInfoUsecase);

  // #=============== query ==============#
  rolesInfo = injectQuery( () => ({
    queryKey: ['rolesInfoChart'],
    queryFn : () => this.rolesInfoUsecase.execute(),
  }));
  
  // #=============== charts computed ==============#
  barChartData = computed<ChartConfiguration<'pie'>['data']>( () => {

    const actives   = this.rolesInfo.data()?.data?.actives ?? 0;
    const inactives = this.rolesInfo.data()?.data?.inactives ?? 0;

    return {
      labels  : ['Activos', 'Inactivos'],
      datasets: [{
        data            : [actives, inactives],
        label           : 'Roles',
        backgroundColor : ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
      }],
    };
  });
}