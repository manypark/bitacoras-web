import { FormsModule } from '@angular/forms';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, computed, inject, signal } from '@angular/core';

import { headersColumns } from "./../../headers-table";
import { GetAllTasksUsecase, TaskListEntity } from '@app/tasks/domain';
import { TaskSelectedServices } from '@app/tasks/presentation/signals';
import { PaginationComponent } from "@app/roles/presentation/components";
import { TitleDescriptionCustomButtonComponent, CustomTableComponent } from "@app/shared";
import { CreateTaksComponent, DeleteTask, UpdateTaskComponent } from "../../components/dialogs";
import { SearchAndSelectsFiltersComponent } from '@app/tasks/presentation/components/container-selects/SearchAndSelectsFilters/SearchAndSelectsFilters.component';

const importsList:any[] = [
  TitleDescriptionCustomButtonComponent, CreateTaksComponent, CustomTableComponent, 
  PaginationComponent, FormsModule, DeleteTask, UpdateTaskComponent, SearchAndSelectsFiltersComponent,
];

@Component({
  selector    : 'app-tasks',
  styleUrl    : './tasks.component.css',
  templateUrl : './tasks.component.html',
  imports     : [ ...importsList ],
})
export default class TasksComponent {

  // #=============== dependencias ===============#
  private readonly selectedTask = inject(TaskSelectedServices);
  private readonly getTaskListUsecase = inject(GetAllTasksUsecase);

  // #=============== variables ===============#
  columns = headersColumns;
  page = signal(1);
  searchTask = signal<string>('');
  idUserCreatedSelected = signal<string>('');
  idUserAsignedSelected = signal<string>('');
  tasksParams = computed(() => ({
    idUserAssigned: this.idUserAsignedSelected(),
    idUserCreated : this.idUserCreatedSelected(),
    limit         : 5,
    offset        : this.page() - 1,
  }));
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
  nextPage = () =>  this.page.update(p => p + 1);

  prevPage = () => (this.page() > 1) ? this.page.update(p => p - 1) : null;

  onUserCreatedChange = (values:any) => this.idUserCreatedSelected.set(values);
  
  onUserAssignedChange = (values:any) => this.idUserAsignedSelected.set(values);

  onTableAction(event: { action:string; row:TaskListEntity }) {
    const modalId = event.action === 'edit' ? 'custom-update-task' : event.action === 'delete' ? 'custom-delete-task': null;
    if (modalId) {
      const modal = document.getElementById(modalId) as HTMLDialogElement | null;
      this.selectedTask.setSelectedTask(event.row);
      modal?.showModal();
    }
  }

  retryQueries( event:boolean ) {
    if(event) { this.taskQuery.refetch(); }
  }
}