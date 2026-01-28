import { inject, Injectable } from "@angular/core";
import { catchError, firstValueFrom, throwError } from "rxjs";

import { ApiResponse } from "@utils/api_response";
import { UpdateUserEntity } from "@app/users/domain";
import { HttpClientService } from "../../../../core/services";
import { UsersMenuRolesDto } from "@app/users/infrastructure/dtos/responses";
import { UserResponseDto } from "@app/tasks/infrastructure/dtos/response/user_response.dto";

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

    async getUserInfo( idUser : number ) : Promise<ApiResponse<UserResponseDto>> {
        return await firstValueFrom(
            this.httpClient.get<ApiResponse<UserResponseDto>>(`/users/${idUser}`).pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            )
        );
    }

    async updateUser( idUser:number, data:UpdateUserEntity ):Promise<ApiResponse<any>> {
        return await firstValueFrom(
            this.httpClient.patch<ApiResponse<any>>(`/users/${idUser}`,{
                ...data
            }).pipe( catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ) )
        );
    }

    deleteUser( idUser:number  ) {
        return this.httpClient.delete<ApiResponse<void>>(`/users/${idUser}`).pipe(
            catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
        );
    }
}