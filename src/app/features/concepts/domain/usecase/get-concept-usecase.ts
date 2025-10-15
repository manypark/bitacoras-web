import { Injectable } from "@angular/core";
import { ConceptRepository } from "@app/concepts/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetAllConceptUsecase {
    
    constructor( private repository:ConceptRepository ) {}

    execute( limit:number, offset:number ) { return this.repository.getAllConcepts( limit, offset ); }
}