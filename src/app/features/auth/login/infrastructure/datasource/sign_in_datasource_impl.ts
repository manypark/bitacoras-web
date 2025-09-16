import { inject, Injectable } from "@angular/core";
import { catchError, firstValueFrom, throwError } from "rxjs";

import { ApiResponse } from "@utils/api_response";
import { HttpClientService } from "../../../../../core/services";
import { SignInDatasource } from "@app/auth/login/domain/datasource";
import { SignInResponseEntity } from "@app/auth/login/domain/entities";
import { EmailVO, PasswordVO } from "@app/auth/login/domain/value-objects";

@Injectable({ providedIn: 'root' })
export class SignInDatasourceImpl implements SignInDatasource {

    private httpClient = inject(HttpClientService);

    async signIn(email: EmailVO, password: PasswordVO): Promise<ApiResponse<SignInResponseEntity>> {
        return await firstValueFrom( this.httpClient.post<ApiResponse<SignInResponseEntity>>( '/auth/singIn', { 
            email   : email.getValue(), 
            password: password.getValue(),
        } ).pipe(
                catchError(error => {
                    return throwError( () => new Error(error) );
                })
            )
        );
    }
}