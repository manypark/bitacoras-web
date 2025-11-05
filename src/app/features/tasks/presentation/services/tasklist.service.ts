import { injectQuery } from '@tanstack/angular-query-experimental';
import { computed, inject, Injectable, signal } from '@angular/core';

import { GetAllTasksUsecase } from '@app/tasks/domain';

@Injectable({ providedIn: 'root' })
export class TasklistService {

  private readonly getTaskListUsecase = inject(GetAllTasksUsecase);

  // === Estado ===
  readonly page = signal(1);
  readonly searchTask = signal('');
  readonly idUserCreatedSelected = signal('');
  readonly idUserAssignedSelected = signal('');

  readonly tasksParams = computed(() => ({
    idUserCreated: this.idUserCreatedSelected(),
    idUserAssigned: this.idUserAssignedSelected(),
    limit: 5,
    offset: this.page() - 1,
  }));

  // === Query ===
  readonly taskQuery = injectQuery(() => ({
    queryKey: ['taskList', this.tasksParams()],
    queryFn: () => this.getTaskListUsecase.execute(this.tasksParams()),
  }));

  // === Computed ===
  readonly filteredTasks = computed(() => {
    const search = this.searchTask().toLowerCase().trim();
    const tasks = this.taskQuery.data()?.data ?? [];
    if (!search) return tasks.sort((a, b) => b.idTasks - a.idTasks);
    return tasks
      .sort((a, b) => a.idTasks - b.idTasks)
      .filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
      );
  });

  // === Actions ===
  nextPage = () => this.page.update((p) => p + 1);
  prevPage = () => (this.page() > 1 ? this.page.update((p) => p - 1) : null);

  setCreatedUsers = ( ids : any ) => this.idUserCreatedSelected.set(ids);
  setAssignedUsers = ( ids : any ) => this.idUserAssignedSelected.set(ids);

  retry() { this.taskQuery.refetch(); }
}