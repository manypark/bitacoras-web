import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, computed, inject, signal } from '@angular/core';

import { CreateTaksComponent } from "../../components/dialogs";
import { GetAllTasksUsecase, TaskParamsEntity, } from '@app/tasks/domain';
import { TitleDescriptionCustomButtonComponent, CustomTableComponent, ToastService } from "@app/shared";

const importsList = [TitleDescriptionCustomButtonComponent, CreateTaksComponent];

@Component({
  selector    : 'app-tasks',
  imports     : [...importsList, CustomTableComponent],
  templateUrl : './tasks.component.html',
  styleUrl    : './tasks.component.css',
})
export default class TasksComponent {

  private readonly toast = inject(ToastService);
  private readonly getTaskListUsecase = inject(GetAllTasksUsecase);

  keys = ['idTasks','title','description','userCreated','userAssigned','active','createdAt'];
  searchTask = signal<string>('');
  tasksParams = signal<TaskParamsEntity>({ idUserAssigned:'', idUserCreated: '', limit: 5, offset: 0 });
  filteredTask = computed( () => {
    const search = this.searchTask().toLowerCase().trim();
    if (!search) return this.taskQuery.data()?.data.sort( (a, b) => a.idTasks - b.idTasks );
    return this.taskQuery.data()?.data.sort().sort( (a, b) => a.idTasks - b.idTasks ).filter( role =>
      role.title.toLowerCase().includes(search) || 
      role.description.toLowerCase().includes(search),
    );
  });

  readonly taskQuery = injectQuery( () => ({
    queryKey: ['taskList'],
    queryFn : () => this.getTaskListUsecase.execute( this.tasksParams() ),
  }));

  onTableAction(event:any) {

  }
}