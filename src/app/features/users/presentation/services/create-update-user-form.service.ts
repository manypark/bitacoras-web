import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { inject, Injectable, signal } from '@angular/core';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailVO, PasswordVO } from '@app/auth/login/domain';
import { GetUserInfoUsecase, UpdateUserEntity, UpdateUserUsecase } from '@app/users/domain';
import { SelectFiltersUsersService, UploadImageManagmenteService } from '@app/users/presentation/services';
import { firstNameVOValidator, lastNameVOValidator, emailVOValidator, passwordVOValidator } from '@app/shared';
import { FirstNameVO, LastNameVO, RegisterCompleteEntity, RegisterCompleteUsecase } from '@app/auth/register/domain';

interface UpdateUserDataEntity {
  idUser:number;
  data:UpdateUserEntity
}

@Injectable({ providedIn: 'root' })
export class CreateUpdateUserFormService {
  // #=============== dependencias ===============#
  readonly router = inject(Router);
  readonly fb  = inject(FormBuilder);
  private readonly updateUserUsecase = inject(UpdateUserUsecase);
  private readonly getUserInfoUsecase = inject(GetUserInfoUsecase);
  private readonly uploadImageServices = inject(UploadImageManagmenteService);
  private readonly creteUserCompleteUsecase = inject(RegisterCompleteUsecase);
  private readonly selectAndFilterServices = inject(SelectFiltersUsersService);

  // #=============== variables ===============#
  readonly toast = toast;
  idUserParam = signal<number>(0);
  createOrUpdateUserForm!:FormGroup;
  isRolChecked = signal<number[]>([]);
  isUpdateUser = signal<boolean>(false);
  get isActive() {
    return this.createOrUpdateUserForm.get('active')?.value;
  }
  get rolesArray() {
    return this.createOrUpdateUserForm.get('rolesArray') as FormArray;
  }

  get getFirstName() {
    return this.createOrUpdateUserForm.get('firstName')?.value;
  }

  get getLastName() {
    return this.createOrUpdateUserForm.get('lastName')?.value;
  }

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

  onRoleToggle(roleId: number, checked: boolean) {
    if (checked) {
      this.rolesArray.push(this.fb.control(roleId));
    } else {
      const index = this.rolesArray.controls.findIndex(ctrl => ctrl.value === roleId);
      if (index !== -1) { this.rolesArray.removeAt(index); }
    }
  }

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
  
  getUserInfo = injectMutation( () => ({
      mutationFn  : async ( idUser:number ) => await this.getUserInfoUsecase.execute( idUser ),
      onSuccess   : ( { data: { user : { firstName, lastName }, email, rolesList, active,  avatarUrl } } ) => {
  
        this.createOrUpdateUserForm.patchValue({
          firstName : firstName,
          lastName  : lastName,
          email     : email,
          active    : active,
        });
  
        this.uploadImageServices.imagePreview.set(avatarUrl);
  
        rolesList.map( ({ idRoles }) => this.onRoleToggle( idRoles, true ) );
  
        this.isRolChecked.set( rolesList.map( rol => rol.idRoles ) );
      },
  }));
  
  updateUserMutation = injectMutation( () => ({
    mutationFn  : async ( data:UpdateUserDataEntity ) => await this.updateUserUsecase.execute( data.idUser, data.data ),
    onSuccess   : () => {
      this.toast.success( 'Usuario actualizado correctamente' , { description: 'Felicidades actualizaste un usuario correctamente' });
      this.selectAndFilterServices.usersListSelect.refetch();
      this.router.navigate(['/home/users']);
    },
  }));

  async onSubmit() {
    if (this.createOrUpdateUserForm.valid) {
      this.idUserParam() !== 0 ? this.onUpdateUser() : this.onCreateUser();
    }
  }

  async onUpdateUser() {

    if( this.uploadImageServices.selectedFile() ) await this.uploadImageServices.uploadImage();
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
    if( this.uploadImageServices.selectedFile() ) await this.uploadImageServices.uploadImage();
      const dataUserNew = this.getUserFormInfo();
      this.createUserCompleteMutation.mutate( dataUserNew );
  }

  getUserFormInfo() {
    let passwordVO;

    const idRoles = this.createOrUpdateUserForm.value.rolesArray;
    const emailVO     = new EmailVO(this.createOrUpdateUserForm.value.email);
    const lastNameVO  = new LastNameVO(this.createOrUpdateUserForm.value.lastName);
    const firstNameVO = new FirstNameVO(this.createOrUpdateUserForm.value.firstName);

    if( this.createOrUpdateUserForm.value.password ) {
      passwordVO  = new PasswordVO(this.createOrUpdateUserForm.value.password);
    }

    const dataUserNewComplete:RegisterCompleteEntity = {
      email     : emailVO,
      firstName : firstNameVO,
      lastName  : lastNameVO,
      password  : passwordVO,
      idRoles   : idRoles,
      imageUrl  : this.uploadImageServices.avatarUrlImageProfile().length === 0 ? 
      this.uploadImageServices.imagePreview() : 
      this.uploadImageServices.avatarUrlImageProfile(),
    };

    return dataUserNewComplete;
  }
}