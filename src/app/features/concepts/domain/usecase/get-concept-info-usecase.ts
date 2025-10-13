import { Injectable } from "@angular/core";

import { ConceptRepository } from "@app/concepts/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetConceptInfoUsecase {
    
    constructor( private repository:ConceptRepository ) {}

    execute() { return this.repository.getAllConceptsInfo() }
}