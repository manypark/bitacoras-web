import { FormsModule } from '@angular/forms';
import { Component, effect, ElementRef, inject, output, resource, signal, ViewChild } from '@angular/core';

import { ToastService } from '@app/shared/toast';
import { CreateRolUsecase } from '@app/roles/domain/usecase';

@Component({
  selector    : 'create-dialog',
  imports     : [ FormsModule, ],
  styleUrl    : './create-dialog.component.css',
  templateUrl : './create-dialog.component.html',
})
export class CreateDialogComponent {

  private readonly createRolUsecase = inject(CreateRolUsecase);
  private readonly toast = inject(ToastService);
  public roleCreated  = output<boolean>();
  @ViewChild('newRol') newRolInput!: ElementRef;
  valueRol = signal<string>('');

  readonly createdResource = resource({
    params: () => this.valueRol(),
    loader: async ( newRolCreated ) => {
      if (newRolCreated.params === '') return null;
      return await this.createRolUsecase.execute(newRolCreated.params);
    },
  });

  constructor() {
    effect( () => {
      if ( this.createdResource.value() !== undefined &&  this.createdResource.value() !== null ) {
        this.toast.success('Rol creado', this.createdResource.value()!.data.name);
        this.roleCreated.emit(true);
        this.closeModal();
      }

      if( this.createdResource.error() ) {
        this.roleCreated.emit(false);
        this.toast.error('Error', this.createdResource.error()?.message ?? 'Error al crearlo');
      }
    });
  }

  submitNewRol() {
    const value = this.newRolInput.nativeElement.value;
    this.valueRol.set(value);
    this.newRolInput.nativeElement.value = '';
  }

  closeModal() {
    const modal = document.getElementById('custom-create-role') as HTMLDialogElement | null;
    modal?.close();
  }

}