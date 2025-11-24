import { BaseChartDirective } from 'ng2-charts';
import { Component, inject } from '@angular/core';

import { BasePieChartComponent } from '@app/dashboards/presentation/components';
import { GetRolesInfoUsecase } from '@app/dashboards/domain';

@Component({
  selector  : 'roles-chart',
  imports   : [ BaseChartDirective ],
  template  :`
  @if  ( query!.isError() ) {
      <div class="card bg-base-100 w-96 h-96 shadow-md p-8 border border-gray-100 flex justify-center items-center">
          <span class="loading loading-ring loading-xl"> {{ query.error() }} </span>
      </div>
  }

  @if  ( query!.isLoading() ) {
      <div class="card bg-base-100 w-96 h-96 shadow-md p-8 border border-gray-100 flex justify-center items-center">
          <span class="loading loading-ring loading-xl"></span>
      </div>
  }

  @if ( query?.data() && !query?.isLoading() ) {
      <div class="card bg-base-100 w-96 shadow-md p-8 border border-gray-100">
          <h1 class="text-2xl font-bold"> {{ getLabel() }} </h1>
          <canvas baseChart [data]="barChartData()" type="pie"></canvas>
      </div>
  }`,
})
export class RolesChartComponent extends BasePieChartComponent {
    // #=============== dependencias ==============#
    private readonly rolesInfoUsecase = inject(GetRolesInfoUsecase);

    // #=============== funciones heredadas ==============#
    protected override queryKey = () => ['rolesInfoChart'];
    protected override queryFn  = () => this.rolesInfoUsecase.execute();
    protected override getLabel = (): string => 'Roles';
}