import { Component } from '@angular/core';
import { CustomDialogBaseComponent } from '@app/shared';
import { ApiResponse } from '@utils/api_response';

@Component({
  selector: 'app-update-task',
  imports: [],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css',
})
export class UpdateTaskComponent extends CustomDialogBaseComponent<ApiResponse<any>> {

  // #=============== Implementaciones del Template ===============#
  protected override performOperation(): Promise<ApiResponse<any>> {
    throw new Error('Method not implemented.');
  }
  protected override successTitle(): string {
    throw new Error('Method not implemented.');
  }
  protected override successMessage(): string | undefined {
    throw new Error('Method not implemented.');
  }
  protected override modalId(): string {
    throw new Error('Method not implemented.');
  }
  protected override emitResult(success: boolean): void {
    throw new Error('Method not implemented.');
  }

}
