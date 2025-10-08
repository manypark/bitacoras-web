import { Component, effect, inject, output, resource, signal } from '@angular/core';

import { ToastService } from '@app/shared';
import { UpdateRoloesUsecase } from '@app/roles/domain';
import { RoleSelectionService } from '@app/roles/presentation/signals';

@Component({
  selector    : 'delete-dialog',
  templateUrl : './delete-dialog.component.html',
  styleUrl    : './delete-dialog.component.css',
})
export class DeleteDialogComponent {

  roleSelectedServices  = inject(RoleSelectionService);
  private readonly roleUpdateUsecase  = inject(UpdateRoloesUsecase);
  private readonly toast = inject(ToastService);

  private readonly trigger = signal<number | null >(null);
  public roleUpdated  = output<boolean>();

  readonly updateResource = resource({
    params: () => this.trigger(),
    loader: async ( triggerValue ) => {

      if (triggerValue.params === null) return null;

      const role = this.roleSelectedServices.selectedRole();
      if (!role) throw new Error('No hay rol seleccionado');

      return await this.roleUpdateUsecase.execute({ ...role, active:false });
    },
  });

  constructor() {
    effect( () => {
      if ( this.updateResource.value() !== undefined &&  this.updateResource.value() !== null ) {
        this.toast.success('Rol eliminado', this.updateResource.value()!.data.name);
        this.roleUpdated.emit(true);
        this.closeModal();
      }

      if( this.updateResource.error() ) {
        this.roleUpdated.emit(false);
        this.toast.error('Error', this.updateResource.error()?.message ?? 'Error al actualizar');
      }
    });
  }

  onEdit() { this.trigger.update((v) => v! + 1); }

  closeModal() {
    const modal = document.getElementById('custom-delete-role') as HTMLDialogElement | null;
    modal?.close();
    this.roleSelectedServices.clearSelectedRole();
  }
}
