import { Injectable, Injector } from "@angular/core";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";

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

    updateConcept( { idConcept, description, active }:ConceptEntity ): Observable<ApiResponse<ConceptResponseDto>> {
        return this.httpClient.patch<ApiResponse<ConceptResponseDto>>(`/concepts/${idConcept}`, { description, active }).pipe(
            catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
        );
    }

    createConcept( concept:string ):Observable<ApiResponse<ConceptResponseDto>> {
        return this.httpClient.post<ApiResponse<ConceptResponseDto>>('/concepts', { description: concept }).pipe(
            catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
        );
    }
}