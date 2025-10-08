import { inject, Injectable, Injector } from "@angular/core";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { catchError, firstValueFrom, throwError } from "rxjs";

import { RolesEntity } from "@app/roles/domain";
import { ApiResponse } from "@utils/api_response";
import { HttpClientService } from "../../../../core/services";
import { RolesResponseDto } from "@app/roles/infrastructure/dtos";
import { environment } from "../../../../../environments/environment";

@Injectable({ providedIn: 'root'})
export class RolesDatasource {

    private httpClient = inject(HttpClientService);
    
    constructor( private injector:Injector ) {}

    getAllRoles():HttpResourceRef<ApiResponse<RolesResponseDto[]>> {
        return httpResource<ApiResponse<RolesResponseDto[]>>(
            () => ({ url: `${environment.apiUrl}/roles`, }),
            {
                injector: this.injector,
            }
        ) as HttpResourceRef<ApiResponse<RolesResponseDto[]>>;
    }

    async updateRole( {name, active, idRoles}:RolesEntity ):Promise<ApiResponse<RolesEntity>> {
        return await firstValueFrom(
            this.httpClient.patch<Promise<ApiResponse<RolesEntity>> >(`/roles/${idRoles}`, { name, active }).pipe( catchError(error =>  throwError( () => new Error(error) ) ) )
        );
    }

}