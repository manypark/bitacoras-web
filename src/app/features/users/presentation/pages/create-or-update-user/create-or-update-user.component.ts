import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { GetAllRolesUsecase } from '@app/roles/domain';
import { GetMenuListUsecase } from '@app/users/domain';
import { EmailVO, PasswordVO } from '@app/auth/login/domain';
import { FirstNameVO, LastNameVO } from '@app/auth/register/domain';
import { InputGenericFieldComponent, PasswordInputComponent, SubmitButtonComponent } from "@app/shared";
import { emailVOValidator, firstNameVOValidator, lastNameVOValidator, passwordVOValidator } from '@app/shared/validators';

@Component({
  selector    : 'create-or-update-user',
  templateUrl : './create-or-update-user.component.html',
  imports: [
    ReactiveFormsModule,
    SubmitButtonComponent,
    PasswordInputComponent,
    InputGenericFieldComponent,
  ],
})
export default class CreateOrUpdateUserComponent implements OnInit {
  // #=============== dependencias ===============#
  private fb  = inject(FormBuilder);
  private getAllRolesUsecase = inject(GetAllRolesUsecase);
  private getMenuListUsecase = inject(GetMenuListUsecase);

  // #=============== variables ===============#
  createOrUpdateUserForm!:FormGroup;
  imagePreview = signal<string>('');
  selectedFile = signal<File | null>(null);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // #=============== ciclo de vida ===============#
  ngOnInit(): void {
    this.initForm();
  }
  
  // #=============== queries ===============#
  rolesList = injectQuery( () => ({
    queryKey: ['rolesList'],
    queryFn : () => this.getAllRolesUsecase.execute( 100, 0 ),
  }));

  menuList = injectQuery( () => ({
    queryKey: ['menuList'],
    queryFn : () => this.getMenuListUsecase.execute( 100, 0 ),
  }));
  
  // #=============== funciones ===============#
  initForm() {
    this.createOrUpdateUserForm = this.fb.group({
      name      : ['', [Validators.required, firstNameVOValidator() ]],
      firstName : ['', [Validators.required, firstNameVOValidator() ] ],
      lastName  : ['', [Validators.required, lastNameVOValidator() ] ],
      email     : ['', [Validators.required, emailVOValidator() ] ],
      password  : ['', [Validators.required, passwordVOValidator() ] ],
      rolesArray: this.fb.array<number>([]),
      menuArrays: this.fb.array<number>([]),
    });
  }

  get rolesArray() {
    return this.createOrUpdateUserForm.get('rolesArray') as FormArray;
  }

  get menuArrays() {
    return this.createOrUpdateUserForm.get('menuArrays') as FormArray;
  }

  onRoleToggle(roleId: number, checked: boolean) {
    if (checked) {
      this.rolesArray.push(this.fb.control(roleId));
    } else {
      const index = this.rolesArray.controls.findIndex(ctrl => ctrl.value === roleId);
      if (index !== -1) { this.rolesArray.removeAt(index); }
    }
  }

  onMenuToggle(menuId: number, checked: boolean) {
    if (checked) {
      this.menuArrays.push(this.fb.control(menuId));
    } else {
      const index = this.menuArrays.controls.findIndex(ctrl => ctrl.value === menuId);
      if (index !== -1) { this.menuArrays.removeAt(index); }
    }
  }

  onFileSelected( event:Event ) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedFile.set(null);
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) return;

    this.selectedFile.set(file);

    this.imagePreview.set( URL.createObjectURL(file) );
  }

  removeImage() {
    this.selectedFile.set(null);

    if (this.imagePreview) {
      URL.revokeObjectURL( this.imagePreview() );
      this.imagePreview.set('');
      this.fileInput.nativeElement.value = '';
    }
  }

  onSubmit() {
    this.createOrUpdateUserForm.valid;
    console.log(this.createOrUpdateUserForm.value);
    return;

    if (this.createOrUpdateUserForm.valid) {
      const nameVO = new FirstNameVO(this.createOrUpdateUserForm.value.firstName);
      const firstNameVO = new FirstNameVO(this.createOrUpdateUserForm.value.firstName);
      const lastNameVO  = new LastNameVO(this.createOrUpdateUserForm.value.lastName);
      const emailVO     = new EmailVO(this.createOrUpdateUserForm.value.email);
      const passwordVO  = new PasswordVO(this.createOrUpdateUserForm.value.password);
    }
  }
}