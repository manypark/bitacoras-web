import { Component } from '@angular/core';

import { 
  UsersChartComponent, 
  TasksChartComponent, 
  RolesChartComponent, 
  LogsChartComponent,
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
],
})
export default class DashboardComponent {}