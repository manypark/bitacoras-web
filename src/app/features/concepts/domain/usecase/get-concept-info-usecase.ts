import { Injectable } from "@angular/core";

import { ConceptRepository } from "@app/concepts/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetConceptInfoUsecase {
    
    constructor( private repository:ConceptRepository ) {}

    execute() { this.repository.getAllConceptsInfo() }
}