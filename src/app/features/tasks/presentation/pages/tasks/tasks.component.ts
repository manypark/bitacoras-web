import { FormsModule } from '@angular/forms';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, computed, inject, signal } from '@angular/core';

import { TaskSelectedServices } from '@app/tasks/presentation/signals';
import { PaginationComponent } from "@app/roles/presentation/components";
import { GetAllTasksUsecase, GetAllUsersUsecase, TaskListEntity } from '@app/tasks/domain';
import { CreateTaksComponent, DeleteTask, UpdateTaskComponent } from "../../components/dialogs";
import { TitleDescriptionCustomButtonComponent, CustomTableComponent, ColumnConfig } from "@app/shared";
import { CustomSelectComponent } from "@app/shared/custom-selects/custom-select/custom-select.component";

const importsList = [
  TitleDescriptionCustomButtonComponent, CreateTaksComponent, CustomTableComponent, 
  PaginationComponent, FormsModule, CustomSelectComponent,
];

@Component({
  selector    : 'app-tasks',
  styleUrl    : './tasks.component.css',
  templateUrl : './tasks.component.html',
  imports     : [...importsList, DeleteTask, UpdateTaskComponent ],
})
export default class TasksComponent {

  // #=============== dependencias ===============#
  private readonly selectedTask = inject(TaskSelectedServices);
  private readonly getUsersUsecase = inject(GetAllUsersUsecase);
  private readonly getTaskListUsecase = inject(GetAllTasksUsecase);

  // #=============== variables ===============#
  columns:ColumnConfig[] = [
    { key: 'idTasks', header: 'ID', type: 'text' },
    { key: 'title', header: 'Tarea', type: 'text' },
    { key: 'description', header: 'Descripción', type: 'text' },
    { key: 'userCreated', header: 'Creada Por', type: 'text' },
    { key: 'userAssigned', header: 'Asignada A', type: 'text' },
    { key: 'createdAt', header: 'Fecha creación', type: 'date' },
    { key: 'active', header: 'Estado', type: 'booleanBadge' },
    { key: 'logsCount', header: 'Bitacoras', type: 'link' },
  ];
  page = signal(1);
  idUserCreatedSelected = signal<string>('');
  idUserAsignedSelected = signal<string>('');
  selectedUsersCreated  = signal<string[]>([]);
  selectedUsersAsigned  = signal<string[]>([]);
  searchTask = signal<string>('');
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

  readonly usersList = injectQuery( () => ({
    queryKey: ['getUsers'],
    queryFn : () => this.getUsersUsecase.execute(),
  }));

  // #=============== functions ===============#
  nextPage = () =>  this.page.update(p => p + 1);

  prevPage() { 
    if (this.page() > 1) this.page.update(p => p - 1);
  }

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
    if(event) {
      this.taskQuery.refetch();
    }
  }
}