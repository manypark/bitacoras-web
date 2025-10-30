import { computed, Injectable, signal } from '@angular/core';

import { TaskListEntity } from '@app/tasks/domain/entities';

@Injectable({ providedIn: 'root' })
export class TaskSelectedServices {
  // #=================== Variables ===================@
  private readonly _selectedTask = signal<TaskListEntity | null >(null);
  readonly selectedTask = computed( () => this._selectedTask() );

  // #=================== funciones ===================@
  setSelectedTask = ( task:TaskListEntity ) => this._selectedTask.set( task );

  clearSelectedTask = () => this._selectedTask.set(null);

  updateSelectedTask( partial:Partial<TaskListEntity> ) {
    const current = this._selectedTask();
    if( !current ) return;

    this._selectedTask.set({ ...current, ...partial });
  }
}