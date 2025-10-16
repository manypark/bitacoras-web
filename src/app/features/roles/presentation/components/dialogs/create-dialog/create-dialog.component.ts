import { FormsModule } from '@angular/forms';
import { Component, ElementRef, inject, output, signal, ViewChild } from '@angular/core';

import { ToastService } from '@app/shared/toast';
import { CreateRolUsecase } from '@app/roles/domain/usecase';

@Component({
  selector    : 'create-dialog',
  imports     : [ FormsModule, ],
  styleUrl    : './create-dialog.component.css',
  templateUrl : './create-dialog.component.html',
})
export class CreateDialogComponent {

  // #=================== dependencias ===================#
  private readonly createRolUsecase = inject(CreateRolUsecase);
  private readonly toast = inject(ToastService);

  // #=================== variables ===================#
  @ViewChild('newRol') newRolInput!: ElementRef;
  errValue    = signal<string>('');
  isLoading   = signal<boolean>(false);
  roleCreated = output<boolean>();

  // #=================== funciones ===================#
  submitNewRol() {
    const value = this.newRolInput.nativeElement.value;
    this.isLoading.set(true);

    this.createRolUsecase.execute( value ).subscribe({
      next: () => {
        this.toast.success('Rol creado', value);
        this.roleCreated.emit(true);
        this.closeModal();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.roleCreated.emit(false);
        this.errValue.set(err);
        this.toast.error('Error', err ?? 'Error al crearlo');
      },
      complete: () => this.isLoading.set(false)
    });
  }

  closeModal() {
    this.errValue.set('');
    this.newRolInput.nativeElement.value = '';
    const modal = document.getElementById('custom-create-role') as HTMLDialogElement | null;
    modal?.close();
  }
}