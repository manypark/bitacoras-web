import { inject, Injectable, Injector } from "@angular/core";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";

import { ApiResponse } from "@utils/api_response";
import { HttpClientService } from "../../../../core/services";
import { RolesEntity, RolesInfoEntity } from "@app/roles/domain";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { MenuListResponseDto, RolesResponseDto } from "@app/roles/infrastructure/dtos";

@Injectable({ providedIn: 'root'})
export class RolesDatasource {

    private injector = inject(Injector);
    private httpClient = inject(HttpClientService);

    async getAllRoles(limit: number = 5, offset: number):Promise<ApiResponse<RolesResponseDto[]>> {
        return await firstValueFrom( 
            this.httpClient.get<ApiResponse<RolesResponseDto[]>>( `/roles?limit=${limit}&offset=${offset}`).pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            ),
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

    async getMenuList(limit: number = 5, offset: number = 0):Promise<ApiResponse<MenuListResponseDto[]>> {
        return await firstValueFrom(
            this.httpClient.get<ApiResponse<MenuListResponseDto[]>>(`/menu?limit=${limit}&offset=${offset}`).pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            )
        );
    }

    updateRole( {name, active, idRoles}:RolesEntity ):Observable<ApiResponse<RolesEntity>> {
        return this.httpClient.patch<ApiResponse<RolesEntity>>(`/roles/${idRoles}`, { name, active }).pipe(
            catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
        );
    }

    async createRole( rol:string ):Promise<ApiResponse<RolesEntity>> {
        return await firstValueFrom(
            this.httpClient.post<Promise<ApiResponse<RolesEntity>> >(`/roles`, { name: rol }).pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            ),
        );
    }

    createRoleObs( rol:string ):Observable<ApiResponse<RolesEntity>> {
        return  this.httpClient.post<ApiResponse<RolesEntity>>(`/roles`, { name: rol }).pipe(
            catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
        );
    }

    deleteRole( idRol:number ):Observable<void> {
        return this.httpClient.delete<void>(`/roles/${idRol}`).pipe(
            catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
        );
    }
}