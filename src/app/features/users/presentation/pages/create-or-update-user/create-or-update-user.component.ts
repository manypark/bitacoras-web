import { toast } from 'ngx-sonner';
import { ActivatedRoute, Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { GetAllRolesUsecase } from '@app/roles/domain';
import { GetUserInfoUsecase, UpdateUserEntity, UpdateUserUsecase } from '@app/users/domain';
import { environment } from '@environment/environment';
import { EmailVO, PasswordVO } from '@app/auth/login/domain';
import { InputGenericFieldComponent, PasswordInputComponent, SubmitButtonComponent } from "@app/shared";
import { emailVOValidator, firstNameVOValidator, lastNameVOValidator, passwordVOValidator } from '@app/shared/validators';
import { FirstNameVO, LastNameVO, RegisterCompleteEntity, RegisterCompleteUsecase, UploadImageEntity, UploadImageProfileUsecase } from '@app/auth/register/domain';

interface UpdateUserDataEntity {
  idUser:number;
  data:UpdateUserEntity
}

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
  readonly router = inject(Router);
  private fb  = inject(FormBuilder);
  readonly activatedRoute = inject(ActivatedRoute);
  private updateUserUsecase = inject(UpdateUserUsecase);
  private getAllRolesUsecase = inject(GetAllRolesUsecase);
  private getUserInfoUsecase = inject(GetUserInfoUsecase);
  private uploadImageUsecase = inject(UploadImageProfileUsecase);
  private creteUserCompleteUsecase = inject(RegisterCompleteUsecase);

  // #=============== variables ===============#
  readonly toast = toast;
  createOrUpdateUserForm!:FormGroup;
  imagePreview = signal<string>('');
  avatarUrlImageProfile = signal<string>('');
  selectedFile = signal<File | null>(null);
  isRolChecked = signal<number[]>([]);
  isUpdateUser = signal<boolean>(false);
  idUserParam = signal<number>(0);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // #=============== ciclo de vida ===============#
  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe( ({id}) => {
      if(id) {
        this.getUserInfo.mutate(id);
        this.isUpdateUser.set(true);
        this.idUserParam.set(id);
      } else {
        this.addPasswordValidate(true);
      }
    });
  }
  
  // #=============== queries ===============#
  rolesList = injectQuery( () => ({
    queryKey: ['rolesList'],
    queryFn : () => this.getAllRolesUsecase.execute( 100, 0 ),
  }));

  // #=============== mutations ===============#
  createUserCompleteMutation = injectMutation( () => ({
    mutationFn  : async ( newUserComplete:RegisterCompleteEntity ) => await this.creteUserCompleteUsecase.execute(newUserComplete),
    onSuccess   : () => {
      this.toast.success( 'Usuario creado correctamente' , { description: 'Felicidades creaste un usuario nuevo' });
      this.router.navigate(['/home/users']);
    },
    onError : (error: any) => {
      console.log(error);
      const message = typeof error === 'string' ? error : error?.message ?? 'Error en la petición';
      this.toast.error('Error', { description: message });
    },
  }));

  uploadImageProfileMutation = injectMutation( () => ({
    mutationFn  : async ( data:UploadImageEntity ) => await this.uploadImageUsecase.execute(data),
    onSuccess   : ( dataResponse ) => {
      const shortUrlImageProfile = dataResponse.secure_url.split('upload')[1];
      this.avatarUrlImageProfile.set(shortUrlImageProfile);
    },
  }));

  getUserInfo = injectMutation( () => ({
    mutationFn  : async ( idUser:number ) => await this.getUserInfoUsecase.execute( idUser ),
    onSuccess   : ( { data: { user : { firstName, lastName }, email, rolesList, active } } ) => {

      this.createOrUpdateUserForm.patchValue({
        firstName : firstName,
        lastName  : lastName,
        email     : email,
        active    : active,
      });

      rolesList.map( ({ idRoles }) => this.onRoleToggle( idRoles, true ) );

      this.isRolChecked.set( rolesList.map( rol => rol.idRoles ) );
    },
  }));

  updateUserMutation = injectMutation( () => ({
    mutationFn  : async ( data:UpdateUserDataEntity ) => await this.updateUserUsecase.execute( data.idUser, data.data ),
    onSuccess   : () => {
      this.toast.success( 'Usuario actualizado correctamente' , { description: 'Felicidades actualizaste un usuario correctamente' });
      this.router.navigate(['/home/users']);
    },
  }));
  
  // #=============== funciones ===============#
  initForm() {
    this.createOrUpdateUserForm = this.fb.group({
      firstName : ['', [Validators.required, firstNameVOValidator() ] ],
      lastName  : ['', [Validators.required, lastNameVOValidator() ] ],
      email     : ['', [Validators.required, emailVOValidator() ] ],
      password  : ['', [] ],
      active    : [false, [] ],
      rolesArray: this.fb.array<number>([], { validators: [ Validators.required ] }),
    });
  }

  addPasswordValidate( canAddValidator:boolean = false) {
    if( canAddValidator ) this.createOrUpdateUserForm.get('password')?.addValidators([ passwordVOValidator() ]);
  }

  get rolesArray() {
    return this.createOrUpdateUserForm.get('rolesArray') as FormArray;
  }

  get isActive() {
    return this.createOrUpdateUserForm.get('active')?.value;
  }

  onRoleToggle(roleId: number, checked: boolean) {
    if (checked) {
      this.rolesArray.push(this.fb.control(roleId));
    } else {
      const index = this.rolesArray.controls.findIndex(ctrl => ctrl.value === roleId);
      if (index !== -1) { this.rolesArray.removeAt(index); }
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

  uploadImage() {
    const username = `${this.createOrUpdateUserForm.value.firstName}-${this.createOrUpdateUserForm.value.lastName}`.replaceAll(' ', '-');
    
    const data:UploadImageEntity = {
      uploadPreset: 'ml_default',
      publicId    : username ?? 'image-default',
      apiKey      : environment.api_key_image_storage,
      file        : this.selectedFile()!,
      folder      : `${username ?? 'image-default'}-Image-Profile`,
    };

    return this.uploadImageProfileMutation.mutateAsync( data );
  }

  async onSubmit() {
    if (this.createOrUpdateUserForm.valid) {
      this.isUpdateUser() ? this.onUpdateUser() : this.onCreateUser();
    }
  }

  async onUpdateUser() {

    if( this.selectedFile() ) await this.uploadImage();
    const { firstName, lastName, email, password, idRoles, imageUrl } = this.getUserFormInfo();
    const dataUpdateUser = {
      user    : {
        active    : this.createOrUpdateUserForm.value.active,
        avatarUrl : imageUrl,
        email     : email.getValue(),
        password  : password?.getValue(),
        user      : {
          firstName:firstName.getValue(),
          lastName:lastName.getValue()
        }
      },
      idRoles : idRoles
    };
    
    this.updateUserMutation.mutate({
      idUser: this.idUserParam(),
      data  : dataUpdateUser
    });
  }

  async onCreateUser() {
    if( this.selectedFile() ) await this.uploadImage();
      const dataUserNew = this.getUserFormInfo();
      this.createUserCompleteMutation.mutate( dataUserNew );
  }

  getUserFormInfo() {
    let passwordVO;

    const firstNameVO = new FirstNameVO(this.createOrUpdateUserForm.value.firstName);
    const lastNameVO  = new LastNameVO(this.createOrUpdateUserForm.value.lastName);
    const emailVO     = new EmailVO(this.createOrUpdateUserForm.value.email);
    const idRoles = this.createOrUpdateUserForm.value.rolesArray;
    if( this.createOrUpdateUserForm.value.password ) {
      passwordVO  = new PasswordVO(this.createOrUpdateUserForm.value.password);
    }

    const dataUserNewComplete:RegisterCompleteEntity = {
      email     : emailVO,
      firstName : firstNameVO,
      lastName  : lastNameVO,
      password  : passwordVO,
      idRoles   : idRoles,
      imageUrl  : this.avatarUrlImageProfile(),
    };

    return dataUserNewComplete;
  }

  isDiabled() : boolean {
    return !this.createOrUpdateUserForm.valid || 
    this.uploadImageProfileMutation.isPending() ||
    this.updateUserMutation.isPending() ||
    this.createUserCompleteMutation.isPending();
  }

  isLoading() : boolean {
    return this.uploadImageProfileMutation.isPending() ||
    this.updateUserMutation.isPending() ||
    this.createUserCompleteMutation.isPending();
  }
}