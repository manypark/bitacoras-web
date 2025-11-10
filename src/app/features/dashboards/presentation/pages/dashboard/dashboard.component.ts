import { Component } from '@angular/core';

import { UsersChartComponent, TasksChartComponent, RolesChartComponent, LogsChartComponent } from "../../components";
import { LogsInfoComponent, RolesInfoComponent, TasksInfoComponent, UsersInfoComponent } from '@app/dashboards/presentation/components/containers-info';

@Component({
  selector    : 'app-dashboard',
  styleUrl    : './dashboard.component.css',
  templateUrl : './dashboard.component.html',
  imports: [
    LogsInfoComponent,
    UsersInfoComponent,
    TasksInfoComponent,
    RolesInfoComponent,
    UsersChartComponent,
    TasksChartComponent,
    RolesChartComponent,
    LogsChartComponent,
],
})
export default class DashboardComponent {}