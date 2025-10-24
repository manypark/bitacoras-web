import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UsersResponseDto } from '@app/tasks/infrastructure/dtos';

@Component({
  selector    : 'create-dialog-task',
  templateUrl : './create-dialog-taks.component.html',
  styleUrl    : './create-dialog-taks.component.css',
  imports     : [ ReactiveFormsModule ],
})
export class CreateTaksComponent {

  usersList:UsersResponseDto[] = [
    {
            "idUser": 49,
            "firstName": "Manuel",
            "lastName": "Lopez",
            "email": "manu.lopez@live.com",
            "active": true,
            "avatarUrl": ""
        },
        {
            "idUser": 25,
            "firstName": "Rodolfo",
            "lastName": "Vera",
            "email": "jose@gmail.com",
            "active": true,
            "avatarUrl": "https://twerlrptjboelidlfioz.supabase.co/storage/v1/object/sign/images-bitacoras/kaiju-no-8-1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YTIyNTM2Mi02N2I1LTRjMTYtODgxZC0zYzBlMDhhYzU4YmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtYml0YWNvcmFzL2thaWp1LW5vLTgtMS5qcGciLCJpYXQiOjE3NTU3ODQ0MDAsImV4cCI6MTc4NzMyMDQwMH0.i4PU_P1hzy7hkZwlXmnEZ3bxCRV1wrCM-WR9TOl_Yw4"
        },
        {
            "idUser": 26,
            "firstName": "Manuel",
            "lastName": "Maldonado",
            "email": "manu@live.com",
            "active": true,
            "avatarUrl": ""
        },
        {
            "idUser": 28,
            "firstName": "Jose",
            "lastName": "Lopez",
            "email": "jose.l@outlook.com",
            "active": true,
            "avatarUrl": ""
        },
        {
            "idUser": 50,
            "firstName": "Edna",
            "lastName": "Serrato",
            "email": "edna.serrato@live.com",
            "active": true,
            "avatarUrl": ""
        }
  ];
  userLogueaded = this.usersList.filter( user => user.idUser+'' === (localStorage.getItem('idUser') ?? '0') )[0];
  taskForm = inject(NonNullableFormBuilder).group({
    title       : ['', Validators.required],
    description : ['', Validators.required],
    assignedUser: ['', Validators.required],
  });

  onSelectUser( user:UsersResponseDto ) {
    console.log(user);
  }

  submitNewTask() {

  }
  
  onClose() {
    const modal = document.getElementById('custom-create-task') as HTMLDialogElement | null;
    modal?.close();
  }
}