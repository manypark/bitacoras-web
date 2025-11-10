import { Component } from '@angular/core';

import { LogsInfoComponent, RolesInfoComponent, TasksInfoComponent, UsersInfoComponent } from '@app/dashboards/presentation/components';

@Component({
  selector    : 'app-dashboard',
  styleUrl    : './dashboard.component.css',
  templateUrl : './dashboard.component.html',
  imports     : [
    UsersInfoComponent,
    TasksInfoComponent,
    RolesInfoComponent,
    LogsInfoComponent
  ],
})
export default class DashboardComponent { }