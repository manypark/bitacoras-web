import { FormsModule } from '@angular/forms';
import { Component, ElementRef, inject, output, ViewChild } from '@angular/core';

import { CreateConceptUsecase } from '@app/concepts/domain';
import { RoleDialogBaseComponent } from '@app/shared/custom-dialog';

@Component({
  selector    : 'create-dialog-concept',
  imports     : [ FormsModule, ],
  styleUrl    : './create-dialog-concept.component.css',
  templateUrl : './create-dialog-concept.component.html',
})
export class CreateDialogComponent extends RoleDialogBaseComponent {

  // #=============== dependencias ===============#
  private readonly createConceptUsecase = inject(CreateConceptUsecase);

  // #=============== variables ===============#
  public conceptCreated  = output<boolean>();
  @ViewChild('newConcept') newConceptInput!: ElementRef<HTMLInputElement>;

  // #=============== funciones ===============#

  submitNewConcept = (): void => this.submit();

  protected performOperation() {
    const value = this.newConceptInput?.nativeElement?.value;
    return this.createConceptUsecase.execute(value);
  }

  protected successTitle = ():string => 'Concepto creado';

  protected successMessage = (): string | undefined => this.newConceptInput?.nativeElement?.value;

  protected modalId = ():string => 'custom-create-concept';

  protected emitResult = (value: boolean): void => this.conceptCreated.emit(value);

  protected override onClose(): void {
    (this.newConceptInput) ? this.newConceptInput.nativeElement.value = '' : null;
    this.close();
  }
}