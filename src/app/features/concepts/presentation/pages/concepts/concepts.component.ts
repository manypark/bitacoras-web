import { Component } from '@angular/core';

import { CreateDialogComponent } from "../../components/dialogs";
import { TitleDescriptionCustomButtonComponent } from '@app/shared/containers';

@Component({
  selector    : 'app-concepts',
  imports: [
    CreateDialogComponent,
    TitleDescriptionCustomButtonComponent,
],
  templateUrl : './concepts.component.html',
  styleUrl    : './concepts.component.css',
})
export default class ConceptsComponent {
  
}