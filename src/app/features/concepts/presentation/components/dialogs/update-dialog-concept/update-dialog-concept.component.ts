import { Component, inject, output, signal } from '@angular/core';

import { ToastService } from '@app/shared';
import { UpdateConceptUsecase } from '@app/concepts/domain';
import { ConceptSelectedService } from '@app/concepts/presentation/signals';

@Component({
  selector    : 'update-dialog-concept',
  templateUrl : './update-dialog-concept.component.html',
  styleUrl    : './update-dialog-concept.component.css',
})
export class UpdateDialogConceptComponent {

  // #=================== dependencias ===================#
  private readonly conceptUpdateUsecase = inject(UpdateConceptUsecase);
  readonly conceptSelectedServices = inject(ConceptSelectedService);
  private readonly toast = inject(ToastService);

  // #=================== variables ===================#
  errValue  = signal<string>('');
  isLoading = signal<boolean>(false);
  public readonly conceptUpdated = output<boolean>();

  // #=================== funciones ===================#
  onEditConcept() {
    this.isLoading.set(true);

    const concept = this.conceptSelectedServices.selectedConcept();
    if (!concept) throw new Error('No hay concepto seleccionado');

    this.conceptUpdateUsecase.execute( concept ).subscribe({
      next: () => {
        this.toast.success('Concepto actualizado', this.conceptSelectedServices.selectedConcept()?.description );
        this.conceptUpdated.emit(true);
        this.isLoading.set(false);
        this.closeModal();
      },
      error: (err) => {
        this.conceptUpdated.emit(false);
        this.isLoading.set(false);
        this.errValue.set(err);
        this.toast.error('Error', err ?? 'Error al editar');
      },
      complete: () => this.isLoading.set(false),
    });    
  }

  closeModal() {
    const modal = document.getElementById('custom-edit-concept') as HTMLDialogElement | null;
    modal?.close();
    this.errValue.set('');
    this.conceptSelectedServices.clearSelectedConcept();
  }

  onNameChange(value: string) {
    this.conceptSelectedServices.updateSelectedConcept({ description: value });
  }
  
  onStatusChange(event:Event) {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;
    this.conceptSelectedServices.updateSelectedConcept({ active: isChecked });
  }
}
