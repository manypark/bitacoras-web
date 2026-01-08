import { Observable } from 'rxjs';
import { Component, output } from '@angular/core';

import { DialogBaseComponent } from '@app/shared/custom-dialog';

@Component({
  selector    : 'delete-user-dialog',
  templateUrl : './delete-user-dialog.component.html',
})
export class DeleteUserDialogComponent extends DialogBaseComponent {
  // #=================== variables ===================#
  public readonly userDeleted = output<boolean>();

  protected performOperation(): Observable<unknown> {
    throw new Error('Method not implemented.');
  }
  protected successTitle = ():string => 'Usuario eliminado';

  protected successMessage(): string | undefined {
    throw new Error('Method not implemented.');
  }
  protected modalId = () : string => 'custom-delete-user';

  protected emitResult = ( value:boolean ): void => this.userDeleted.emit(value);

  protected override onClose() { this.close(); }
}