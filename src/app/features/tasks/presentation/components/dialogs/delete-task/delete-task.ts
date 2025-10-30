import { Component, inject, output } from '@angular/core';
import { TaskSelectedServices } from '@app/tasks/presentation/signals';

import { DeleteTasksUsecase } from '@app/tasks/domain';
import { CustomDialogBaseComponent } from '@app/shared';

@Component({
  selector    : 'delete-dialog-task',
  templateUrl : './delete-task.html',
  styleUrl    : './delete-task.css',
})
export class DeleteTask extends CustomDialogBaseComponent<any> {

  // #=============== dependencias ===============#
  readonly selectedTaskServices = inject(TaskSelectedServices);
  private readonly taskDeleteUsecase = inject(DeleteTasksUsecase);

  // #=================== output ===================#
  public readonly taskDeleted = output<boolean>();
  
  // #=================== funciones heredadas ===================#
  submitDeleteTask = () => this.submit();
  
  protected override performOperation = (): Promise<any> => this.taskDeleteUsecase.execute( this.selectedTaskServices.selectedTask()?.idTasks! );

  protected successTitle = ():string => 'Tarea eliminada';

  protected successMessage = () : string | undefined => this.selectedTaskServices.selectedTask()?.title;

  protected modalId = () : string => 'custom-delete-task';

  protected emitResult = ( value:boolean ): void => this.taskDeleted.emit(value);

  protected override onClose(): void {
    this.selectedTaskServices.clearSelectedTask();
    this.close();
  } 
}