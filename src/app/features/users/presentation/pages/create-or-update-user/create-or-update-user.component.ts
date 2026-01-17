  import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetAllRolesUsecase } from '@app/roles/domain';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector    : 'create-or-update-user',
  templateUrl : './create-or-update-user.component.html',
  imports     : [
    ReactiveFormsModule
  ]
})
export default class CreateOrUpdateUserComponent implements OnInit {
  // #=============== dependencias ===============#
  private fb  = inject(FormBuilder);
  private getAllRolesUsecase = inject(GetAllRolesUsecase);

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
  
  // #=============== funciones ===============#
  initForm() {
    this.createOrUpdateUserForm = this.fb.group({
      name      : ['', Validators.required],
      firstName : ['', Validators.required],
      lastName  : ['', Validators.required,],
      email     : ['', Validators.required,],
      password  : ['', Validators.required,],
    });
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

  removeImage(): void {
    this.selectedFile.set(null);

    if (this.imagePreview) {
      URL.revokeObjectURL( this.imagePreview() );
      this.imagePreview.set('');
      this.fileInput.nativeElement.value = '';
    }
  }
}