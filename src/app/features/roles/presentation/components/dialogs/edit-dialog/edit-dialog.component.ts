import { Component, inject, output } from '@angular/core';

import { UpdateRolesUsecase } from '@app/roles/domain';
import { DialogBaseComponent } from '@app/shared/custom-dialog';
import { RoleSelectionService } from '@app/roles/presentation/signals';

@Component({
  selector    : 'edit-dialog',
  templateUrl : './edit-dialog.component.html',
  styleUrl    : './edit-dialog.component.css',
})
export class EditDialogComponent extends DialogBaseComponent {
  // #=================== dependencias ===================#
  roleSelectedServices  = inject(RoleSelectionService);
  private readonly roleUpdateUsecase  = inject(UpdateRolesUsecase);

  // #=================== variables ===================#
  public readonly roleUpdated  = output<boolean>();

  // #=================== funciones ===================#
  protected performOperation() {
    return this.roleUpdateUsecase.execute( this.roleSelectedServices.selectedRole()! );
  }
  
  protected successTitle = ():string => 'Rol actualizado';

  protected successMessage = () : string | undefined => this.roleSelectedServices.selectedRole()?.name;

  protected modalId = () : string => 'custom-edit-role';

  protected emitResult = ( value:boolean ): void => this.roleUpdated.emit(value);

  submitUpdateRol = (): void => this.submit();

  protected override onClose(): void {
    this.roleSelectedServices.clearSelectedRole();
    this.close();
  }

  onNameChange(value: string) {
    this.roleSelectedServices.updateSelectedRole({ name: value });
  }
  
  onStatusChange(event:Event) {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;
    this.roleSelectedServices.updateSelectedRole({ active: isChecked });
  }
}