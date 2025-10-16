import { Component, inject, output, signal } from '@angular/core';

import { ToastService } from '@app/shared/toast';
import { UpdateRoloesUsecase } from '@app/roles/domain';
import { RoleSelectionService } from '@app/roles/presentation/signals';

@Component({
  selector    : 'edit-dialog',
  templateUrl : './edit-dialog.component.html',
  styleUrl    : './edit-dialog.component.css',
})
export class EditDialogComponent {

  // #=================== dependencias ===================#
  roleSelectedServices  = inject(RoleSelectionService);
  private readonly roleUpdateUsecase  = inject(UpdateRoloesUsecase);
  private readonly toast = inject(ToastService);

  // #=================== variables ===================#
  errValue    = signal<string>('');
  isLoading   = signal<boolean>(false);
  public readonly roleUpdated  = output<boolean>();

  // #=================== funciones ===================#
  onEdit() {
      this.isLoading.set(true);
      const role = this.roleSelectedServices.selectedRole();
      if (!role) throw new Error('No hay rol seleccionado');

      this.roleUpdateUsecase.execute(role).subscribe({
        next: () => {
          this.toast.success('Rol actualizado',this.roleSelectedServices.selectedRole()?.name );
          this.roleUpdated.emit(true);
          this.isLoading.set(false);
          this.closeModal();
        },
        error: (err) => {
          this.roleUpdated.emit(false);
          this.isLoading.set(false);
          this.errValue.set(err);
          this.toast.error('Error', err ?? 'Error al editar');
        },
        complete: () => this.isLoading.set(false),
      });
  }

  closeModal() {
    const modal = document.getElementById('custom-edit-role') as HTMLDialogElement | null;
    modal?.close();
    this.errValue.set('');
    this.roleSelectedServices.clearSelectedRole();
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