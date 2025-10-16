import { Injectable } from "@angular/core";

import { ConceptRepository } from "@app/concepts/domain/repositories";

@Injectable({providedIn: 'root'})
export class DeleteConceptUsecase {
    
    constructor( private repository:ConceptRepository ) {}

    execute( idConcept:number ) { return this.repository.deleteConcept( idConcept ); }
}