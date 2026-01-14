import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector    : 'create-or-update-user',
  templateUrl : './create-or-update-user.component.html',
  imports     : [
    ReactiveFormsModule
  ]
})
export default class CreateOrUpdateUserComponent implements OnInit {

  
  private fb  = inject(FormBuilder);
  createOrUpdateUserForm!:FormGroup;
  
  initForm() {
    this.createOrUpdateUserForm = this.fb.group({
      name      : ['', Validators.required],
      firstName : ['', Validators.required],
      lastName  : ['', Validators.required,],
      email     : ['', Validators.required,],
      password  : ['', Validators.required,],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}