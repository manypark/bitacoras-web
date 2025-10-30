import { Component, inject, output, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ApiResponse } from '@utils/index';
import { CustomDialogBaseComponent } from '@app/shared';
import { descriptionVOValidator, titleVOValidator } from '@app/tasks/presentation/forms-validators';
import { CreateTaskUsecase, DescriptionVO, GetAllUsersUsecase, TaskEntity, TaskResponseEntity, TitleVO, UsersEntity } from '@app/tasks/domain';

@Component({
  selector    : 'create-dialog-task',
  templateUrl : './create-dialog-taks.component.html',
  styleUrl    : './create-dialog-taks.component.css',
  imports     : [ ReactiveFormsModule ],
})
export class CreateTaksComponent extends CustomDialogBaseComponent<ApiResponse<TaskResponseEntity>> {
  // #=============== dependencias ===============#
  private readonly getUsersUsecase = inject(GetAllUsersUsecase);
  private readonly postTaskUsecase = inject(CreateTaskUsecase);

   // #=============== Outputs ===============#
  readonly taskCreated = output<boolean>();

  // #=============== variables ===============#
  userLogueaded   = signal<string>( localStorage.getItem('username') ?? 'fallo' );
  userLogueadedId = signal<string>( localStorage.getItem('idUser') ?? '0' );

  // #=============== formulario ===============#
  taskForm = inject(NonNullableFormBuilder).group({
    title       : ['', [Validators.required, titleVOValidator ]],
    description : ['', [Validators.required, descriptionVOValidator ]],
    assignedUser: ['', Validators.required ],
    createdUser : [ this.userLogueadedId(), Validators.required],
  });

  // #=============== queries ===============#
  usersList = injectQuery( () => ({
    queryKey: ['getUsers'],
    queryFn : () => this.getUsersUsecase.execute(),
  }));

  // #=============== Implementaciones del Template ===============#
  protected async performOperation(): Promise<ApiResponse<TaskResponseEntity>> {
    const form = this.taskForm.value;
    const task: TaskEntity = {
      title       : new TitleVO(form.title!),
      description : new DescriptionVO(form.description!),
      userCreated : parseInt(this.userLogueadedId()!),
      userAssigned: +this.taskForm.controls.assignedUser.value,
    };
    const exec = await this.postTaskUsecase.execute(task);
    this.taskForm.reset();
    return exec;
  }

  protected successTitle = (): string => 'Tarea creada';

  protected successMessage = (): string => 'Tu tarea se creó correctamente 🎉';

  protected modalId = (): string => 'custom-create-task';

  protected emitResult = (success: boolean): void => this.taskCreated.emit(success);

  protected override onClose(): void {
    this.taskForm.reset();
    this.close();
  }

  // #=============== Métodos auxiliares ===============#
  onSelectUser = (user: UsersEntity): void => this.taskForm.get('assignedUser')?.setValue(user.idUser + '');

  submitNewTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    this.submit();
  }
}