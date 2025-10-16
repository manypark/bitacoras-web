import { Component, inject, output, signal } from '@angular/core';

import { ToastService } from '@app/shared';
import { UpdateRoloesUsecase } from '@app/roles/domain';
import { RoleSelectionService } from '@app/roles/presentation/signals';

@Component({
  selector    : 'delete-dialog',
  templateUrl : './delete-dialog.component.html',
  styleUrl    : './delete-dialog.component.css',
})
export class DeleteDialogComponent {

  // #=================== dependencias ===================#
  roleSelectedServices  = inject(RoleSelectionService);
  private readonly roleUpdateUsecase  = inject(UpdateRoloesUsecase);
  private readonly toast = inject(ToastService);

  // #=================== variables ===================#
  errValue    = signal<string>('');
  isLoading   = signal<boolean>(false);
  public roleUpdated  = output<boolean>();

  onEdit() {

      this.isLoading.set(true);

      const role = this.roleSelectedServices.selectedRole();
      if (!role) throw new Error('No hay rol seleccionado');

      this.roleUpdateUsecase.execute({ ...role, active:false }).subscribe({
        next: () => {
          this.toast.success('Rol eliminado',this.roleSelectedServices.selectedRole()?.name );
          this.roleUpdated.emit(true);
          this.isLoading.set(false);
          this.closeModal();
        },
        error: (err) => {
          this.isLoading.set(false);
          this.roleUpdated.emit(false);
          this.errValue.set(err);
          this.toast.error('Error', err ?? 'Error al editar');
        },
        complete: () => this.isLoading.set(false)
      });
  }

  closeModal() {
    const modal = document.getElementById('custom-delete-role') as HTMLDialogElement | null;
    modal?.close();
    this.errValue.set('');
    this.roleSelectedServices.clearSelectedRole();
  }
}