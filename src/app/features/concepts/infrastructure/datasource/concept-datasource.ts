import { Injectable, Injector } from "@angular/core";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { httpResource, HttpResourceRef } from "@angular/common/http";

import { ApiResponse } from "@utils/api_response";
import { HttpClientService } from "../../../../core/services";
import { environment } from "../../../../../environments/environment";
import { ConceptEntity, ConceptInfoEntity } from "@app/concepts/domain/entities";
import { ConceptResponseDto } from "@app/concepts/infrastructure/dtos/responses/concepts-dto-response";

@Injectable({ providedIn: 'root'})
export class ConceptDatasource {

    constructor( 
        private injector:Injector,
        private httpClient: HttpClientService
    ) {}

    async getAllConcepts( limit:number = 5, offset:number): Promise<ApiResponse<ConceptResponseDto[]>> {
        return await firstValueFrom(
            this.httpClient.get<ApiResponse<ConceptResponseDto[]>>(`/concepts?limit=${limit}&offset=${offset}`).pipe(
                catchError(error =>  throwError( () => new Error(error) ) ),
            ),
        );
    }

    getAllConceptsInfo():HttpResourceRef<ApiResponse<ConceptInfoEntity>> {
        return httpResource<ApiResponse<ConceptInfoEntity>>(
            () => ({ url: `${environment.apiUrl}/concepts/info`, }),
            { injector: this.injector, }
        ) as HttpResourceRef<ApiResponse<ConceptInfoEntity>>;
    }

    async updateConcept( { idConcept, description, active }:ConceptEntity ): Promise<ApiResponse<ConceptResponseDto>> {
        return await firstValueFrom(
            this.httpClient.patch<ApiResponse<ConceptResponseDto>>(`/concepts/${idConcept}`, { description, active }).pipe(
                catchError(error =>  throwError( () => new Error(error) ) ),
            ),
        );
    }

    async createConcept( concept:string ):Promise<ApiResponse<ConceptResponseDto>> {
        return await firstValueFrom(
            this.httpClient.post<ApiResponse<ConceptResponseDto>>('/concepts', { description: concept }).pipe(
                catchError(error =>  throwError( () => new Error(error) ) ),
            ),
        )
    }

}