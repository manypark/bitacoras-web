import { FormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, computed, inject, signal } from '@angular/core';

import { CustomSelectComponent } from "@app/shared";
import { GetLogsByUserUsecase } from '@app/dashboards/domain';
import { GetAllUsersUsecase } from '@app/tasks/domain/usecase';

@Component({
  selector    : 'logs-by-user-chart',
  templateUrl : './logs-by-user-chart.component.html',
  imports     : [BaseChartDirective, CustomSelectComponent, FormsModule],
})
export class LogsByUserChartComponent {
  // #=============== dependencias ===============#
  private readonly getUsersUsecase = inject(GetAllUsersUsecase);
  private readonly logsByUserUsecase = inject(GetLogsByUserUsecase);

  // #=============== variables ===============#
  selectedUsers = signal<string[]>([]);
  readonly startDate = signal( new Date().toISOString().split('T')[0] );
  private readonly idUserAssigned  = computed( () => this.selectedUsers().join(',') );

  // #=============== querys ===============#
  readonly query = injectQuery(() => ({
    queryKey: [ 'logsByUsers', this.startDate(), this.idUserAssigned() ],
    queryFn : () => this.logsByUserUsecase.execute( this.startDate(), this.idUserAssigned() ),
  }));

  readonly usersList = injectQuery( () => ({
    queryKey: ['getUsers'],
    queryFn : () => this.getUsersUsecase.execute(),
  }));

  // #=============== funciones ===============#
  clearSelect = () => this.selectedUsers.set([]);

   // #=============== chart data ===============#
  barChartData = computed<ChartConfiguration<'bar'>['data']>( () => {
    const labels    = this.query.data()?.data.map( log => log.name ) ?? [''];
    const dataLogs  = this.query.data()?.data.map( log => log.total ) ?? [0];
      return {
          labels    : labels,
          datasets  : [{
            label           : 'Bitacoras por usuario',
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
