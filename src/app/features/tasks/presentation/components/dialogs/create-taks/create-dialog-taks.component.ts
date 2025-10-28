import { Component, inject, signal } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastService } from '@app/shared';
import { descriptionVOValidator, titleVOValidator } from '@app/tasks/presentation/forms-validators';
import { CreateTaskUsecase, DescriptionVO, GetAllUsersUsecase, TaskEntity, TitleVO, UsersEntity } from '@app/tasks/domain';

@Component({
  selector    : 'create-dialog-task',
  templateUrl : './create-dialog-taks.component.html',
  styleUrl    : './create-dialog-taks.component.css',
  imports     : [ ReactiveFormsModule ],
})
export class CreateTaksComponent {

  // #=============== dependencias ===============#
  private readonly getUsersUsecase = inject(GetAllUsersUsecase);
  private readonly postTaskUsecase = inject(CreateTaskUsecase);
  private readonly toast           = inject(ToastService);

  // #=============== queries ===============#
  usersList = injectQuery( () => ({
    queryKey: ['getUsers'],
    queryFn : () => this.getUsersUsecase.execute(),
  }));

  // #=============== mutation ===============#
  postTask = injectMutation(  () => ({
    mutationKey : ['postTask'],
    mutationFn  : (data:TaskEntity) => this.postTaskUsecase.execute(data),
    onSuccess   : (res) => {
      this.toast.success('Tarea creada', `Felicidades, tu tarea se creó correctamente`);
      this.onClose();
    },
    onError: (error: Error) => {
      this.toast.error('Error al crear tarea', error.message);
    },
  }));

  // #=============== variables ===============#
  userLogueaded   = signal<string>( localStorage.getItem('username') ?? 'fallo' );
  userLogueadedId = signal<string>( localStorage.getItem('idUser') ?? '0' );

  taskForm = inject(NonNullableFormBuilder).group({
    title       : ['', [Validators.required, titleVOValidator ]],
    description : ['', [Validators.required, descriptionVOValidator ]],
    assignedUser: ['', Validators.required ],
    createdUser : [ this.userLogueadedId(), Validators.required],
  });

  // #=============== funciones ===============#
  onSelectUser( user:UsersEntity ) { 
    this.taskForm.get('assignedUser')?.setValue(user.idUser+'');
  }

  submitNewTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    
    this.postTask.mutate({
      title       : new TitleVO(this.taskForm.value.title!),
      description : new DescriptionVO(this.taskForm.value.description!),
      userCreated : parseInt(this.userLogueadedId()!),
      userAssigned: +this.taskForm.controls.assignedUser.value,
    });
  }
  
  onClose() {
    const modal = document.getElementById('custom-create-task') as HTMLDialogElement | null;
    this.taskForm.reset();
    modal?.close();
  }
}