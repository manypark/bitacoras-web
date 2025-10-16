import { Component, inject, output, signal } from '@angular/core';

import { ToastService } from '@app/shared';
import { DeleteConceptUsecase } from '@app/concepts/domain';
import { ConceptSelectedService } from '@app/concepts/presentation/signals';

@Component({
  selector    : 'delete-dialog-concept',
  templateUrl : './delete-dialog-concept.component.html',
  styleUrl    : './delete-dialog-concept.component.css',
})
export class DeleteDialogConceptComponent {
  
  // #=================== dependencias ===================#
  private readonly conceptUpdateUsecase = inject(DeleteConceptUsecase);
  readonly conceptSelectedServices = inject(ConceptSelectedService);
  private readonly toast = inject(ToastService);

  // #=================== variables ===================#
  errValue  = signal<string>('');
  isLoading = signal<boolean>(false);
  public readonly conceptDeleted = output<boolean>();

  // #=================== funciones ===================#
  onEditConcept() {
    this.isLoading.set(true);

    const concept = this.conceptSelectedServices.selectedConcept();
    if (!concept) throw new Error('No hay concepto seleccionado');

    this.conceptUpdateUsecase.execute( concept.idConcept ).subscribe({
      next: () => {
        this.toast.success('Concepto eliminado', this.conceptSelectedServices.selectedConcept()?.description );
        this.conceptDeleted.emit(true);
        this.isLoading.set(false);
        this.closeModal();
      },
      error: (err) => {
        this.conceptDeleted.emit(false);
        this.isLoading.set(false);
        this.errValue.set(err);
        this.toast.error('Error', err ?? 'Error al eliminar');
      },
      complete: () => this.isLoading.set(false),
    });    
  }

  closeModal() {
    const modal = document.getElementById('custom-delete-concept') as HTMLDialogElement | null;
    modal?.close();
    this.errValue.set('');
    this.conceptSelectedServices.clearSelectedConcept();
  }
}