import { Component, inject, output } from '@angular/core';

import { DialogBaseComponent } from '@app/shared';
import { DeleteConceptUsecase } from '@app/concepts/domain';
import { ConceptSelectedService } from '@app/concepts/presentation/signals';

@Component({
  selector    : 'delete-dialog-concept',
  templateUrl : './delete-dialog-concept.component.html',
  styleUrl    : './delete-dialog-concept.component.css',
})
export class DeleteDialogConceptComponent extends DialogBaseComponent {

  // #=================== dependencias ===================#
  private readonly conceptUpdateUsecase = inject(DeleteConceptUsecase);
  readonly conceptSelectedServices = inject(ConceptSelectedService);

  // #=================== variables ===================#
  public readonly conceptDeleted = output<boolean>();

  // #=================== funciones ===================#
  onEditConcept = (): void => this.submit();

  protected override performOperation() {
    const value = this.conceptSelectedServices.selectedConcept();
    return this.conceptUpdateUsecase.execute(value?.idConcept!);
  }

  protected successTitle = ():string => 'Rol eliminado';

  protected successMessage = (): string | undefined => this.conceptSelectedServices.selectedConcept()?.description;

  protected modalId = ():string => 'custom-delete-concept';

  protected emitResult = (value: boolean): void => this.conceptDeleted.emit(value);

  protected override onClose(): void {
    this.conceptSelectedServices.clearSelectedConcept();
    this.close();
  }
}