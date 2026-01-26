import { Component, inject, output, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { CustomSelectMenusComponent } from "@app/shared";
import { DialogBaseComponent } from '@app/shared/custom-dialog';
import { RoleSelectionService } from '@app/roles/presentation/signals';
import { GetMenuListUsecase, UpdateRolesUsecase } from '@app/roles/domain';

@Component({
  selector    : 'edit-dialog',
  templateUrl : './edit-dialog.component.html',
  styleUrl    : './edit-dialog.component.css',
  imports     : [ CustomSelectMenusComponent ],
})
export class EditDialogComponent extends DialogBaseComponent {
  // #=================== dependencias ===================#
  roleSelectedServices  = inject(RoleSelectionService);
  readonly getMenuListUsecase = inject(GetMenuListUsecase);
  private readonly roleUpdateUsecase  = inject(UpdateRolesUsecase);

  // #=================== variables ===================#
  public readonly roleUpdated  = output<boolean>();
  selectedMenus = signal<string[]>([]);

  // #=================== queries ===================#
  readonly menuList = injectQuery( () => ({
    queryKey: ['getMenuList'],
    queryFn : () => this.getMenuListUsecase.execute( 10, 0),
  }));

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
    this.selectedMenus.set([]);
    this.close();
  }

  onNameChange(value: string) {
    this.roleSelectedServices.updateSelectedRole({ name: value });
  }

  onMenusChange() {
    const idMenusNumber = this.selectedMenus().map( menu => parseInt(menu) );
    this.roleSelectedServices.updateSelectedRole({ idMenus: idMenusNumber });
  }
  
  onStatusChange(event:Event) {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;
    this.roleSelectedServices.updateSelectedRole({ active: isChecked });
  }
}