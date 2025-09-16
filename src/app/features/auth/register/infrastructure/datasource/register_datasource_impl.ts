import { inject, Injectable } from "@angular/core";
import { catchError, firstValueFrom, throwError } from "rxjs";

import { ApiResponse } from "@utils/api_response";
import { HttpClientService } from "../../../../../core/services";
import { EmailVO, PasswordVO } from "@app/auth/login/domain/value-objects";
import { FirstNameVO, LastNameVO, RegisterDatasource, RegisterResponseEntity } from "@app/auth/register/domain";

@Injectable({ providedIn: 'root' })
export class RegisterDatasourceImpl implements RegisterDatasource {

    private httpClient = inject(HttpClientService);

    async register(
        firstName   : FirstNameVO, 
        lastName    : LastNameVO, 
        email       : EmailVO, 
        password    : PasswordVO,
    ): Promise<ApiResponse<RegisterResponseEntity>> {
        return await firstValueFrom( this.httpClient.post<ApiResponse<RegisterResponseEntity>>('/auth/singUp', {
                firstName   : firstName.getValue(),
                lastName    : lastName.getValue(),
                email       : email.getValue(), 
                password    : password.getValue(),
            }).pipe( catchError(error =>  throwError( () => new Error(error) ) ) )
        );
    }   
}