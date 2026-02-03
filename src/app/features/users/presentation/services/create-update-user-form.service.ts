import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { inject, Injectable, signal } from '@angular/core';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { FormArray, FormBuilder, FormControlStatus, FormGroup, Validators } from '@angular/forms';

import { EmailVO, PasswordVO } from '@app/auth/login/domain';
import { SelectFiltersUsersService } from '@app/users/presentation/services';
import { GetUserInfoUsecase, UpdateUserEntity, UpdateUserUsecase } from '@app/users/domain';
import { firstNameVOValidator, lastNameVOValidator, emailVOValidator, passwordVOValidator } from '@app/shared';
import { FirstNameVO, LastNameVO, RegisterCompleteEntity, RegisterCompleteUsecase } from '@app/auth/register/domain';
import { distinctUntilChanged } from 'rxjs';

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
  private readonly creteUserCompleteUsecase = inject(RegisterCompleteUsecase);
  private readonly selectAndFilterServices = inject(SelectFiltersUsersService);

  // #=============== variables ===============#
  readonly toast = toast;
  idUserParam = signal<number>(0);
  createOrUpdateUserForm!:FormGroup;
  statusChangesForm = signal<boolean>(false);
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

    this.createOrUpdateUserForm.statusChanges.pipe(
      distinctUntilChanged()
    ).subscribe( value => this.statusChangesForm.set(value == 'VALID') );
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
      mutationFn  : async ( idUser:number ) => await this.getUserInfoUsecase.execute( idUser )
  }));
  
  updateUserMutation = injectMutation( () => ({
    mutationFn  : async ( data:UpdateUserDataEntity ) => await this.updateUserUsecase.execute( data.idUser, data.data ),
    onSuccess   : () => {
      this.toast.success( 'Usuario actualizado correctamente' , { description: 'Felicidades actualizaste un usuario correctamente' });
      this.selectAndFilterServices.usersListSelect.refetch();
      this.router.navigate(['/home/users']);
    },
  }));

  hydrateForm(userData: any) {
    const { user: { firstName, lastName }, email, rolesList, active } = userData;

    this.createOrUpdateUserForm.patchValue({
      firstName,
      lastName,
      email,
      active,
    });

    rolesList.forEach(({ idRoles }: any) => this.onRoleToggle(idRoles, true) );

    this.isRolChecked.set(rolesList.map((rol: any) => rol.idRoles));
  }

  create(data: RegisterCompleteEntity) {
    this.createUserCompleteMutation.mutate(data);
  }

  update(data: RegisterCompleteEntity) {

    const { firstName, lastName, email, password, idRoles, imageUrl } = data;
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

  buildUserEntity( uploadedImageUrl: string, previewUrl: string ): RegisterCompleteEntity {

    const idRoles = this.rolesArray.value;

    const emailVO = new EmailVO(this.createOrUpdateUserForm.value.email);
    const lastNameVO = new LastNameVO(this.createOrUpdateUserForm.value.lastName);
    const firstNameVO = new FirstNameVO(this.createOrUpdateUserForm.value.firstName);

    let passwordVO;
    if (this.createOrUpdateUserForm.value.password) {
      passwordVO = new PasswordVO(this.createOrUpdateUserForm.value.password);
    }

    return {
      email: emailVO,
      firstName: firstNameVO,
      lastName: lastNameVO,
      password: passwordVO,
      idRoles,
      imageUrl: uploadedImageUrl || previewUrl,
    };
  }

  resetForm() {
    this.createOrUpdateUserForm.reset();
    this.rolesArray.clear();
    this.isRolChecked.set([]);
    this.idUserParam.set(0);
  }
}