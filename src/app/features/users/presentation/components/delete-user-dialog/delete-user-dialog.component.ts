import { Component, inject, output } from '@angular/core';

import { DeleteUserUsecase } from '@app/users/domain';
import { DialogBaseComponent } from '@app/shared/custom-dialog';
import { UserSelectedService } from '@app/users/presentation/services';

@Component({
  selector    : 'delete-user-dialog',
  templateUrl : './delete-user-dialog.component.html',
})
export class DeleteUserDialogComponent extends DialogBaseComponent {
  // #=================== dependencias ===================#
  readonly userSelectedServices = inject(UserSelectedService);
  private readonly deleteUserUsecase = inject(DeleteUserUsecase);

  // #=================== variables ===================#
  public readonly userDeleted = output<boolean>();
  
  // #=================== funciones ===================#
  submitDeletedUser = (): void => this.submit();

  protected performOperation = () => this.deleteUserUsecase.execute( this.userSelectedServices.selectedUser()?.idUser ?? 0 );

  protected successTitle = ():string => 'Usuario eliminado';

  protected successMessage = () : string | undefined => this.userSelectedServices.selectedUser()?.fullName;

  protected modalId = () : string => 'custom-delete-user';

  protected emitResult = ( value:boolean ): void => this.userDeleted.emit(value);

  protected override onClose() { 
    this.userSelectedServices.clearSelectedRole();
    this.close(); 
  }
}