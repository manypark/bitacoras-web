import { FormsModule } from '@angular/forms';
import { Component, ElementRef, inject, ViewChild, output } from '@angular/core';

import { RoleDialogBaseComponent } from '@app/shared';
import { CreateRolUsecase } from '@app/roles/domain/usecase';

@Component({
  selector    : 'create-dialog',
  imports     : [ FormsModule ],
  styleUrl    : './create-dialog.component.css',
  templateUrl : './create-dialog.component.html',
})
export class CreateDialogComponent extends RoleDialogBaseComponent {

  // #=============== dependencias ===============#
  private readonly createRolUsecase = inject(CreateRolUsecase);
  
  // #=============== variables ===============#
  @ViewChild('newRol') newRolInput!: ElementRef<HTMLInputElement>;
  public readonly roleCreated = output<boolean>();

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
    return this.createRolUsecase.execute(value);
  }
}