import { FormsModule } from '@angular/forms';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, ElementRef, inject, ViewChild, output, signal } from '@angular/core';

import { MenuEntity, RolesEntity } from '@app/roles/domain';
import { DialogBaseComponent, CustomSelectMenusComponent } from '@app/shared';
import { CreateRolUsecase, GetMenuListUsecase } from '@app/roles/domain/usecase';

@Component({
  selector    : 'create-dialog',
  imports     : [FormsModule, CustomSelectMenusComponent],
  styleUrl    : './create-dialog.component.css',
  templateUrl : './create-dialog.component.html',
})
export class CreateDialogComponent extends DialogBaseComponent {

  // #=============== dependencias ===============#
  readonly getMenuListUsecase = inject(GetMenuListUsecase);
  private readonly createRolUsecase = inject(CreateRolUsecase);
  
  // #=============== variables ===============#
  @ViewChild('newRol') newRolInput!: ElementRef<HTMLInputElement>;
  public readonly roleCreated = output<boolean>();
  menusSelected = signal<MenuEntity[]>([]);
  newRol = signal<RolesEntity | null>(null);

  // #=================== queries ===================#
  readonly menuList = injectQuery( () => ({
    queryKey: ['getMenuList'],
    queryFn : () => this.getMenuListUsecase.execute( 10, 0),
  }));

  // #=============== funciones ===============#
  submitNewRol = (): void => this.submit();

  protected emitResult = (value: boolean): void => this.roleCreated.emit(value);

  protected successTitle = ():string => 'Rol creado';

  protected successMessage = (): string | undefined => this.newRolInput?.nativeElement?.value;

  protected modalId = ():string => 'custom-create-role';

  protected override onClose(): void {
    (this.newRolInput) ? this.newRolInput.nativeElement.value = '' : null;
    this.close();
  }

  protected performOperation() {
    const value = this.newRolInput?.nativeElement?.value;
    const data:RolesEntity = {
      idRoles : 0,
      active  : true,
      name    : value,
      menus   : this.menusSelected(),
    };
    return this.createRolUsecase.execute( data );
  }

  onMenusChange( value:MenuEntity[] ) {
    this.menusSelected.set(value);
  }
}