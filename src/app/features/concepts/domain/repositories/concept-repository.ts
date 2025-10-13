import { HttpResourceRef } from "@angular/common/http";

import { ApiResponse } from "@utils/api_response";
import { ConceptEntity, ConceptInfoEntity } from "@app/concepts/domain/entities";

export abstract class ConceptRepository {
    abstract getAllConcepts(limit: number, offset: number):Promise<ApiResponse<ConceptEntity[]>>;
    abstract getAllConceptsInfo():HttpResourceRef<ApiResponse<ConceptInfoEntity>>;
    abstract createNewConcept( newConcept:string ):Promise<ApiResponse<ConceptEntity>>;
    abstract updateConcept( concept:ConceptEntity ):Promise<ApiResponse<ConceptEntity>>;
}