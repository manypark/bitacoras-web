import { Component, inject } from '@angular/core';

import { CreateDialogComponent } from "../../components/dialogs";
import { GetConceptInfoUsecase } from '@app/concepts/domain';
import { TitleDescriptionCustomButtonComponent, TotalsInfoComponent } from '@app/shared/containers';

@Component({
  selector    : 'app-concepts',
  imports: [
    TotalsInfoComponent,
    CreateDialogComponent,
    TitleDescriptionCustomButtonComponent,
],
  templateUrl : './concepts.component.html',
  styleUrl    : './concepts.component.css',
})
export default class ConceptsComponent {

  private readonly getConceptsInfoUsecase = inject(GetConceptInfoUsecase);
  conceptsInfo = this.getConceptsInfoUsecase.execute();
  
}