import { Injectable } from "@angular/core";
import { GeneralInfoRepository } from "@app/dashboards/domain/repositories";

@Injectable({providedIn: 'root'})
export class GetLogsByConceptUsecase {
    constructor( private repository:GeneralInfoRepository ) {}
    execute = ( idConcepts:string ) => this.repository.getLogsByConcept(idConcepts);
}