import { Component } from '@angular/core';

import { 
  UsersChartComponent, 
  TasksChartComponent, 
  RolesChartComponent, 
  LogsChartComponent,
  LogsByConceptsChartComponent,
} from "../../components";

import { 
  LogsInfoComponent, 
  RolesInfoComponent, 
  TasksInfoComponent, 
  UsersInfoComponent,
} from '@app/dashboards/presentation/components/containers-info';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  imports     : [
    LogsInfoComponent,
    UsersInfoComponent,
    TasksInfoComponent,
    LogsChartComponent,
    RolesInfoComponent,
    UsersChartComponent,
    TasksChartComponent,
    RolesChartComponent,
    LogsByConceptsChartComponent
],
})
export default class DashboardComponent {}