import { inject, Injectable } from "@angular/core";
import { catchError, firstValueFrom, throwError } from "rxjs";

import { RolesEntity } from "@app/roles/domain";
import { ApiResponse } from "@utils/api_response";
import { HttpClientService } from "../../../../core/services";
import { RolesResponseDto } from "@app/roles/infrastructure/dtos";

@Injectable({ providedIn: 'root'})
export class RolesDatasource {

    private httpClient = inject(HttpClientService);

    async getAllRoles(limit: number = 5, offset: number):Promise<ApiResponse<RolesResponseDto[]>> {
        return await firstValueFrom( 
            this.httpClient.get<ApiResponse<RolesResponseDto[]>>( `/roles?limit=${limit}&offset=${offset}`)
        );
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