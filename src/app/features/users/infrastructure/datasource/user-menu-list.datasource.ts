import { inject, Injectable } from "@angular/core";
import { catchError, firstValueFrom, throwError } from "rxjs";

import { ApiResponse } from "@utils/api_response";
import { HttpClientService } from "../../../../core/services";
import { CreateUserMenuRolesDto } from "@app/users/infrastructure/dtos";
import { UsersMenuRolesDto } from "@app/users/infrastructure/dtos/responses";

@Injectable({ providedIn: 'root'})
export class UserMenuRolesDatasource {

    private httpClient = inject(HttpClientService);

    async getUserMenuList(limit: number = 5, offset: number):Promise<ApiResponse<UsersMenuRolesDto[]>> {
        return await firstValueFrom(
            this.httpClient.get<ApiResponse<UsersMenuRolesDto[]>>(`/users?limit=${limit}&offset=${offset}`).pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            )
        );
    }

    async createUserMenuRoles( data:CreateUserMenuRolesDto ):Promise<ApiResponse<any[]>> {
        return await firstValueFrom(
            this.httpClient.post<ApiResponse<any[]>>(`/menu-roles`, { ...data }).pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            )
        );
    }

    async updateUserMenuRoles( data:CreateUserMenuRolesDto ):Promise<ApiResponse<any[]>> {
        return await firstValueFrom(
            this.httpClient.patch<ApiResponse<any[]>>( `/menu-roles/${data.idUser}`, { ...data } ).pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            )
        );
    }

    deleteUser( idUser:number  ) {
        return this.httpClient.delete<ApiResponse<void>>(`/users/${idUser}`).pipe(
            catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
        );
    }
}