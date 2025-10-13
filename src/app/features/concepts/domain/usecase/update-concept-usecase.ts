import { Injectable } from "@angular/core";
import { ConceptEntity } from "@app/concepts/domain/entities";
import { ConceptRepository } from "@app/concepts/domain/repositories";

@Injectable({providedIn: 'root'})
export class UpdateConceptUsecase {
    
    constructor( private repository:ConceptRepository ) {}

    execute( concept:ConceptEntity ) { this.repository.updateConcept( concept ); }
}