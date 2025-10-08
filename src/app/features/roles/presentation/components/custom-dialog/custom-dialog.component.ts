import { Component, effect, inject, output, resource, signal } from '@angular/core';

import { ToastService } from '@app/shared/toast';
import { UpdateRoloesUsecase } from '@app/roles/domain';
import { RoleSelectionService } from '@app/roles/presentation/signals';

@Component({
  selector    : 'custom-dialog',
  imports     : [],
  templateUrl : './custom-dialog.component.html',
  styleUrl    : './custom-dialog.component.css',
})
export class CustomDialogComponent {

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

      return await this.roleUpdateUsecase.execute(role);
    },
  });

  constructor() {
    effect( () => {
      if ( this.updateResource.value() !== undefined &&  this.updateResource.value() !== null ) {
        this.toast.success('Rol actualizado', this.updateResource.value()!.data.name);
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
    const modal = document.getElementById('custom-edit-role') as HTMLDialogElement | null;
    modal?.close();
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