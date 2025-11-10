import { Component } from '@angular/core';

import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

import { LogsInfoComponent, RolesInfoComponent, TasksInfoComponent, UsersInfoComponent } from '@app/dashboards/presentation/components/containers-info';

Chart.register(...registerables);

@Component({
  selector    : 'app-dashboard',
  styleUrl    : './dashboard.component.css',
  templateUrl : './dashboard.component.html',
  imports     : [
    LogsInfoComponent,
    UsersInfoComponent,
    TasksInfoComponent,
    RolesInfoComponent,
    BaseChartDirective,
  ],
})
export default class DashboardComponent {
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [{ data: [45, 37, 60, 70], label: 'Ventas' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
}