import { inject, Injectable, Injector } from "@angular/core";
import { catchError, firstValueFrom, throwError } from "rxjs";

import { ApiResponse } from "@utils/api_response";
import { HttpClientService } from "../../../../core/services";
import { RolesEntity, RolesInfoEntity } from "@app/roles/domain";
import { RolesResponseDto } from "@app/roles/infrastructure/dtos";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

@Injectable({ providedIn: 'root'})
export class RolesDatasource {

    private httpClient = inject(HttpClientService);
    constructor( private injector:Injector ) {}

    async getAllRoles(limit: number = 5, offset: number):Promise<ApiResponse<RolesResponseDto[]>> {
        return await firstValueFrom( 
            this.httpClient.get<ApiResponse<RolesResponseDto[]>>( `/roles?limit=${limit}&offset=${offset}`)
        );
    }

    getAllRolesInfo():HttpResourceRef<ApiResponse<RolesInfoEntity>> {
        return httpResource<ApiResponse<RolesInfoEntity>>(
            () => ({ url: `${environment.apiUrl}/roles/info`, }),
            {
                injector: this.injector,
            }
        ) as HttpResourceRef<ApiResponse<RolesInfoEntity>>;
    }

    async updateRole( {name, active, idRoles}:RolesEntity ):Promise<ApiResponse<RolesEntity>> {
        return await firstValueFrom(
            this.httpClient.patch<Promise<ApiResponse<RolesEntity>> >(`/roles/${idRoles}`, { name, active }).pipe(
                catchError(error =>  throwError( () => new Error(error) ) ),
            ),
        );
    }

    async createRole( rol:string ):Promise<ApiResponse<RolesEntity>> {
        return await firstValueFrom(
            this.httpClient.post<Promise<ApiResponse<RolesEntity>> >(`/roles`, { name: rol }).pipe(
                catchError(error =>  throwError( () => new Error(error) ) ),
            ),
        );
    }

}