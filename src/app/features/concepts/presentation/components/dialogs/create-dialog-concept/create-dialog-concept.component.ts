import { FormsModule } from '@angular/forms';
import { Component, ElementRef, inject, output, signal, ViewChild } from '@angular/core';

import { ToastService } from '@app/shared/toast';
import { CreateConceptUsecase } from '@app/concepts/domain';

@Component({
  selector    : 'create-dialog-concept',
  imports     : [ FormsModule, ],
  styleUrl    : './create-dialog-concept.component.css',
  templateUrl : './create-dialog-concept.component.html',
})
export class CreateDialogComponent {

  // #=============== dependencias ===============#
  private readonly createConceptUsecase = inject(CreateConceptUsecase);
  private readonly toast = inject(ToastService);
  
  // #=============== variables ===============#
  public conceptCreated  = output<boolean>();
  @ViewChild('newConcept') newConceptInput!: ElementRef;
  errMsg        = signal<string>('');
  isLoading     = signal<boolean>(false);

  // #=============== funciones ===============#
  submitNewConcept() {
    const value = this.newConceptInput.nativeElement.value;
    this.isLoading.set(true);

    this.createConceptUsecase.execute(value).subscribe({
      next: () => {
        this.toast.success('Concepto creado', value );
        this.conceptCreated.emit(true);
        this.closeModal();
      },
      error: (err) => {
        this.conceptCreated.emit(false);
        this.errMsg.set( err ?? 'Error al crearlo' );
        this.toast.error('Error', err ?? 'Error al crearlo');
        this.isLoading.set(false);
      },
      complete: () =>  this.isLoading.set(false),
    });
  }

  closeModal() {
    const modal = document.getElementById('custom-create-concept') as HTMLDialogElement | null;
    this.newConceptInput.nativeElement.value = '';
    this.isLoading.set(false);
    modal?.close();
  }
}