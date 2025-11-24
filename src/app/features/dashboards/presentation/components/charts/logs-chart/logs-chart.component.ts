import { BaseChartDirective } from 'ng2-charts';
import { Component, inject } from '@angular/core';

import { GetLogsInfoUsecase } from '@app/dashboards/domain';
import { BasePieChartComponent } from '@app/dashboards/presentation/components';

@Component({
  selector  : 'logs-chart',
  imports   : [BaseChartDirective],
  template  : `
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

  @if ( query!.data() && !query!.isLoading() ) {
      <div class="card bg-base-100 w-full shadow-md p-8 border border-gray-100">
          <h1 class="text-2xl font-bold"> {{ getLabel() }} </h1>
          <canvas baseChart [data]="barChartData()" type="pie"></canvas>
      </div>
  }`,
})
export class LogsChartComponent extends BasePieChartComponent {
    // #=============== dependencias ==============#
    private readonly logsInfoUsecase = inject(GetLogsInfoUsecase);

    // #=============== funciones heredadas ==============#
    protected override queryKey = () => ['logsInfoChart'];
    protected override queryFn  = () => this.logsInfoUsecase.execute();
    protected override getLabel = (): string => 'Bitacoras';
}