import { Component, inject, output } from '@angular/core';

import { DialogBaseComponent } from '@app/shared';
import { DeleteRolesUsecase } from '@app/roles/domain';
import { RoleSelectionService } from '@app/roles/presentation/signals';

@Component({
  selector    : 'delete-dialog',
  templateUrl : './delete-dialog.component.html',
  styleUrl    : './delete-dialog.component.css',
})
export class DeleteDialogComponent extends DialogBaseComponent {
  // #=================== dependencias ===================#
  roleSelectedServices  = inject(RoleSelectionService);
  private readonly roleUpdateUsecase  = inject(DeleteRolesUsecase);

  // #=================== variables ===================#
  public readonly roleDeleted = output<boolean>();
  
  // #=================== funciones ===================#
  submitDeletedRol = (): void => this.submit();

  protected performOperation = () => this.roleUpdateUsecase.execute( this.roleSelectedServices.selectedRole()?.idRoles! );

  protected successTitle = ():string => 'Rol eliminado';

  protected successMessage = () : string | undefined => this.roleSelectedServices.selectedRole()?.name;

  protected modalId = () : string => 'custom-delete-role';

  protected emitResult = ( value:boolean ): void => this.roleDeleted.emit(value);

  protected override onClose(): void {
    this.roleSelectedServices.clearSelectedRole();
    this.close();
  }
}