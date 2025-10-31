import { Component, effect, inject, output } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ApiResponse } from '@utils/api_response';
import { CustomDialogBaseComponent } from '@app/shared';
import { TaskSelectedServices } from '@app/tasks/presentation/signals';
import { titleVOValidator, descriptionVOValidator } from '@app/tasks/presentation/forms-validators';
import { DescriptionVO, GetAllUsersUsecase, TitleVO, UpdateTaskEntity, UpdateTaskUsecase } from '@app/tasks/domain';

@Component({
  selector    : 'update-dialog-task',
  styleUrl    : './update-task.component.css',
  templateUrl : './update-task.component.html',
  imports     : [ ReactiveFormsModule ],
})
export class UpdateTaskComponent extends CustomDialogBaseComponent<ApiResponse<any>> {
  // #=============== dependencias ===============#
  readonly selectedTaskServices = inject(TaskSelectedServices);
  private readonly getUsersUsecase = inject(GetAllUsersUsecase);
  private readonly updateTaskUsecase = inject(UpdateTaskUsecase);

  // #=============== Outputs ===============#
  readonly taskUpdated = output<boolean>();

  // #=============== formulario ===============#
  taskForm = inject(NonNullableFormBuilder).group({
    title       : [this.selectedTaskServices.selectedTask()?.title, [Validators.required, titleVOValidator ]],
    description : [this.selectedTaskServices.selectedTask()?.description, [Validators.required, descriptionVOValidator ]],
    assignedUser: [this.selectedTaskServices.selectedTask()?.userAssigned.idUser, Validators.required ],
    active      : [this.selectedTaskServices.selectedTask()?.active, Validators.required],
  });
  
  // #=============== ciclos de vida ===============#
  constructor() {
    super();
    effect(() => {
      const task = this.selectedTaskServices.selectedTask();
      if (task) {
        this.taskForm.patchValue({
          title         : task.title,
          description   : task.description,
          assignedUser  : task.userAssigned.idUser,
          active        : task.active,
        });
      }
    });
  }

  // #=============== queries ===============#
    usersList = injectQuery( () => ({
      queryKey: ['getUsers'],
      queryFn : () => this.getUsersUsecase.execute(),
    }));

  // #=============== Implementaciones del Template ===============#
  protected async performOperation(): Promise<ApiResponse<any>> {
    const form = this.taskForm.value;
    const taskUpdated:UpdateTaskEntity = {
      idTask      : this.selectedTaskServices.selectedTask()?.idTasks ?? 0, 
      title       : new TitleVO(form.title!),
      description : new DescriptionVO(form.description!),
      active      : form.active ?? false,
      userAssigned: form.assignedUser ?? 0,
    };
    const exec = await this.updateTaskUsecase.execute(taskUpdated);
    this.taskForm.reset();
    return exec;
  }

  protected successTitle = (): string => 'Tarea actualizada';

  protected successMessage = (): string => 'Tu tarea se actualizo correctamente 🎉';

  protected modalId = (): string => 'custom-update-task';

  protected emitResult = (success: boolean): void => this.taskUpdated.emit(success);

  protected override onClose(): void {
    this.taskForm.reset();
    this.selectedTaskServices.clearSelectedTask();
    this.close();
  }

  // #=============== Métodos auxiliares ===============#
  submitUpdateTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    this.submit();
  }

  onStatusChange(event:Event) {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;
    this.taskForm.get('active')?.setValue(isChecked);
  }
}