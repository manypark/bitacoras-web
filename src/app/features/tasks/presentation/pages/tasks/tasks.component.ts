import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, computed, inject, signal } from '@angular/core';

import { GetAllTasksUsecase, TaskParamsEntity, } from '@app/tasks/domain';
import { PaginationComponent } from "@app/roles/presentation/components";
import { CreateTaksComponent, DeleteTask } from "../../components/dialogs";
import { TitleDescriptionCustomButtonComponent, CustomTableComponent, ColumnConfig } from "@app/shared";
import { TaskSelectedServices } from '@app/tasks/presentation/signals';

const importsList = [TitleDescriptionCustomButtonComponent, CreateTaksComponent, CustomTableComponent, PaginationComponent];

@Component({
  selector    : 'app-tasks',
  imports: [...importsList, DeleteTask],
  templateUrl : './tasks.component.html',
  styleUrl    : './tasks.component.css',
})
export default class TasksComponent {

  // #=============== dependencias ===============#
  private readonly getTaskListUsecase = inject(GetAllTasksUsecase);
  private readonly selectedTask = inject(TaskSelectedServices);

  // #=============== variables ===============#
  columns:ColumnConfig[] = [
    { key: 'idTasks', header: 'ID', type: 'text' },
    { key: 'title', header: 'Tarea', type: 'text' },
    { key: 'description', header: 'Descripción', type: 'text' },
    { key: 'userCreated', header: 'Asignada Por', type: 'text' },
    { key: 'userAssigned', header: 'Asignada A', type: 'text' },
    { key: 'createdAt', header: 'Fecha creación', type: 'date' },
    { key: 'active', header: 'Estado', type: 'booleanBadge' },
    { key: 'logsCount', header: 'Bitacoras', type: 'link' },
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
    const modalId = event.action === 'edit' ? 'custom-edit-role' : event.action === 'delete' ? 'custom-delete-task': null;
    if (modalId) {
      const modal = document.getElementById(modalId) as HTMLDialogElement | null;
      this.selectedTask.setSelectedTask(event.row);
      modal?.showModal();
    }
  }

  retryQueries( event:boolean ) {
    if(event) {
      this.taskQuery.refetch();
    }
  }
}