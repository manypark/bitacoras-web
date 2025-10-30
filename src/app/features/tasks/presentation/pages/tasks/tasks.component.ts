import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, computed, inject, signal } from '@angular/core';

import { CreateTaksComponent } from "../../components/dialogs";
import { GetAllTasksUsecase, TaskParamsEntity, } from '@app/tasks/domain';
import { PaginationComponent } from "@app/roles/presentation/components";
import { TitleDescriptionCustomButtonComponent, CustomTableComponent, ColumnConfig } from "@app/shared";

const importsList = [TitleDescriptionCustomButtonComponent, CreateTaksComponent, CustomTableComponent, PaginationComponent];

@Component({
  selector    : 'app-tasks',
  imports     : [...importsList],
  templateUrl : './tasks.component.html',
  styleUrl    : './tasks.component.css',
})
export default class TasksComponent {

  // #=============== dependencias ===============#
  private readonly getTaskListUsecase = inject(GetAllTasksUsecase);

  // #=============== variables ===============#
  columns:ColumnConfig[] = [
    { key: 'idTasks', header: 'ID', type: 'text' },
    { key: 'title', header: 'Tarea', type: 'text' },
    { key: 'description', header: 'Descripción', type: 'text' },
    { key: 'userCreated', header: 'Asignada Por', type: 'text' },
    { key: 'userAssigned', header: 'Asignada A', type: 'text' },
    { key: 'createdAt', header: 'Fecha creación', type: 'date' },
    { key: 'active', header: 'Estado', type: 'booleanBadge' },
  ];
  searchTask = signal<string>('');
  page = signal(1);
  tasksParams = signal<TaskParamsEntity>({ idUserAssigned:'', idUserCreated: '', limit: 5, offset: 0 });
  filteredTask = computed( () => {
    const search = this.searchTask().toLowerCase().trim();
    if (!search) return this.taskQuery.data()?.data.sort( (a, b) => b.idTasks - a.idTasks );
    return this.taskQuery.data()?.data.sort().sort( (a, b) => a.idTasks - b.idTasks ).filter( role =>
      role.title.toLowerCase().includes(search) || 
      role.description.toLowerCase().includes(search),
    );
  });

  // #=============== queries ===============#
  readonly taskQuery = injectQuery( () => ({
    queryKey: ['taskList', this.tasksParams() ],
    queryFn : () => this.getTaskListUsecase.execute( this.tasksParams() ),
  }));

  // #=============== functions ===============#
  nextPage() { 
    this.page.update(p => p + 1);
    this.tasksParams.set({ idUserAssigned:'', idUserCreated: '', limit: 5, offset: this.page() - 1});
  }

  prevPage() { 
    if (this.page() > 1) this.page.update(p => p - 1);
    this.tasksParams.set({ idUserAssigned:'', idUserCreated: '', limit: 5, offset: this.page() - 1});
  }

  onTableAction(event:any) {

  }

  retryQueries( event:boolean ) {
    if(event) {
      this.taskQuery.refetch();
    }
  }
}