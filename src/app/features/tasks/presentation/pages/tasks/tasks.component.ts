import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { TaskListEntity } from '@app/tasks/domain';
import { headersColumns } from "./../../headers-table";
import { TasklistService } from '@app/tasks/presentation/services';
import { TaskSelectedServices } from '@app/tasks/presentation/signals';
import { PaginationComponent } from "@app/roles/presentation/components";
import { TitleDescriptionCustomButtonComponent, CustomTableComponent } from "@app/shared";
import { CreateTaksComponent, DeleteTask, UpdateTaskComponent } from "../../components/dialogs";
import { SearchAndSelectsFiltersComponent } from '@app/tasks/presentation/components/container-selects/SearchAndSelectsFilters/SearchAndSelectsFilters.component';

const importsList:any[] = [
  DeleteTask,
  FormsModule,
  PaginationComponent,
  UpdateTaskComponent,
  CreateTaksComponent,
  CustomTableComponent,
  SearchAndSelectsFiltersComponent,
  TitleDescriptionCustomButtonComponent,
];

@Component({
  selector    : 'app-tasks',
  styleUrl    : './tasks.component.css',
  templateUrl : './tasks.component.html',
  imports     : [ ...importsList ],
})
export default class TasksComponent {

  // #=============== dependencias ===============#
  readonly taskServices = inject(TasklistService);
  private readonly selectedTask = inject(TaskSelectedServices);

  // #=============== variables ===============#
  columns = headersColumns;

  onTableAction(event: { action:string; row:TaskListEntity }) {
    const modalId = event.action === 'edit' ? 'custom-update-task' : event.action === 'delete' ? 'custom-delete-task': '';
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    this.selectedTask.setSelectedTask(event.row);
    modal?.showModal();
  }

  retryQueries( event:boolean ) {
    if(event) { this.taskServices.retry() }
  }
}