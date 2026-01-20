import { inject, Injectable } from "@angular/core";
import { catchError, firstValueFrom, throwError } from "rxjs";

import { ApiResponse } from "@utils/api_response";
import { HttpClientService } from "../../../../../core/services";
import { RegisterCompleteEntity, RegisterDatasource, RegisterEntity, RegisterResponseEntity } from "@app/auth/register/domain";

@Injectable({ providedIn: 'root' })
export class RegisterDatasourceImpl implements RegisterDatasource {
    
    private httpClient = inject(HttpClientService);

    async register( { email, firstName, lastName, password }:RegisterEntity ): Promise<ApiResponse<RegisterResponseEntity>> {
        return await firstValueFrom( this.httpClient.post<ApiResponse<RegisterResponseEntity>>('/auth/singUp', {
                firstName   : firstName.getValue(),
                lastName    : lastName.getValue(),
                email       : email.getValue(), 
                password    : password.getValue(),
            }).pipe( catchError(error =>  throwError( () => new Error(error.error.message) ) ), )
        );
    }

    async registerComplete( {email, firstName, idMenu, idRoles, lastName, password }: RegisterCompleteEntity): Promise<ApiResponse<RegisterResponseEntity>> {
        return await firstValueFrom( this.httpClient.post<ApiResponse<RegisterResponseEntity>>('/auth/singUpComplete', {
                firstName   : firstName.getValue(),
                lastName    : lastName.getValue(),
                email       : email.getValue(), 
                password    : password.getValue(),
                idMenu,
                idRoles
            }).pipe( catchError(error =>  throwError( () => new Error(error.error.message) ) ), )
        );
    }
}