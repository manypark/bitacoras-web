import { Injectable } from "@angular/core";
import { ConceptRepository } from "@app/concepts/domain/repositories";

@Injectable({providedIn: 'root'})
export class CreateConceptUsecase {
    
    constructor( private repository:ConceptRepository ) {}

    execute( concept:string ) { this.repository.createNewConcept(concept); }
}