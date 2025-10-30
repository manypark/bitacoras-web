import { Component, inject, output } from '@angular/core';

import { DialogBaseComponent } from '@app/shared';
import { UpdateConceptUsecase } from '@app/concepts/domain';
import { ConceptSelectedService } from '@app/concepts/presentation/signals';

@Component({
  selector    : 'update-dialog-concept',
  templateUrl : './update-dialog-concept.component.html',
  styleUrl    : './update-dialog-concept.component.css',
})
export class UpdateDialogConceptComponent extends DialogBaseComponent {

  // #=================== dependencias ===================#
  private readonly conceptUpdateUsecase = inject(UpdateConceptUsecase);
  readonly conceptSelectedServices = inject(ConceptSelectedService);

  // #=================== variables ===================#
  public readonly conceptUpdated = output<boolean>();

  // #=================== funciones ===================#
  onEditConcept = (): void => this.submit();

  protected override performOperation() {
    const value = this.conceptSelectedServices.selectedConcept();
    return this.conceptUpdateUsecase.execute(value!);
  }

  protected successTitle = ():string => 'Concepto actualizado';

  protected successMessage = (): string | undefined => this.conceptSelectedServices.selectedConcept()?.description;

  protected modalId = ():string => 'custom-edit-concept';

  protected emitResult = (value: boolean): void => this.conceptUpdated.emit(value);

  protected override onClose(): void {
    this.conceptSelectedServices.clearSelectedConcept();
    this.close();
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