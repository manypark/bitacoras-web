import { Injectable } from "@angular/core";
import { HttpResourceRef } from "@angular/common/http";

import { ApiResponse } from "@utils/api_response";
import { ConceptRepository } from "@app/concepts/domain/repositories";
import { ConceptEntity, ConceptInfoEntity } from "@app/concepts/domain/entities";
import { ConceptDatasource } from "@app/concepts/infrastructure/datasource/concept-datasource";

@Injectable({ providedIn: 'root'})
export class ConceptRepositoryImpl implements ConceptRepository {

    constructor( private datasource:ConceptDatasource ) {}

    getAllConcepts(limit: number, offset: number): Promise<ApiResponse<ConceptEntity[]>> {
        return this.datasource.getAllConcepts( limit, offset );
    }

    getAllConceptsInfo(): HttpResourceRef<ApiResponse<ConceptInfoEntity>> {
        return this.datasource.getAllConceptsInfo();
    }

    createNewConcept(newConcept: string): Promise<ApiResponse<ConceptEntity>> {
        return this.datasource.createConcept( newConcept );
    }

    updateConcept(concept: ConceptEntity): Promise<ApiResponse<ConceptEntity>> {
        return this.datasource.updateConcept( concept );
    }

}