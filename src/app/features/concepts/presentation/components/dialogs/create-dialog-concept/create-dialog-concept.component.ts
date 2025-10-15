import { FormsModule } from '@angular/forms';
import { Component, effect, ElementRef, inject, output, resource, signal, ViewChild } from '@angular/core';

import { ToastService } from '@app/shared/toast';
import { CreateConceptUsecase } from '@app/concepts/domain';

@Component({
  selector    : 'create-dialog-concept',
  imports     : [ FormsModule, ],
  styleUrl    : './create-dialog-concept.component.css',
  templateUrl : './create-dialog-concept.component.html',
})
export class CreateDialogComponent {

  private readonly createConceptUsecase = inject(CreateConceptUsecase);
  private readonly toast = inject(ToastService);
  public conceptCreated  = output<boolean>();
  @ViewChild('newConcept') newConceptInput!: ElementRef;
  valueConcept = signal<string>('');

  readonly createdResource = resource({
    params: () => this.valueConcept(),
    loader: async ( newConcept ) => {
      if (newConcept.params === '') return null;
      return await this.createConceptUsecase.execute(newConcept.params);
    },
  });

  constructor() {
    effect( () => {
      if ( this.createdResource.value() !== undefined &&  this.createdResource.value() !== null ) {
        this.toast.success('Concepto creado', this.createdResource.value()!.data.description);
        this.conceptCreated.emit(true);
        this.closeModal();
      }

      if( this.createdResource.error() ) {
        this.conceptCreated.emit(false);
        this.toast.error('Error', this.createdResource.error()?.message ?? 'Error al crearlo');
      }
    });
  }

  submitNewConcept() {
    const value = this.newConceptInput.nativeElement.value;
    this.valueConcept.set(value);
    this.newConceptInput.nativeElement.value = '';
  }

  closeModal() {
    const modal = document.getElementById('custom-create-concept') as HTMLDialogElement | null;
    modal?.close();
  }

}