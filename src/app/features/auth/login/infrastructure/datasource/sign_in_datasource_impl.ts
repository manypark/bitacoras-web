import { firstValueFrom } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { catchError } from "rxjs/internal/operators/catchError";
import { throwError } from "rxjs/internal/observable/throwError";

import { ApiResponse } from "../../../../../core/utils";
import { SignInDatasource } from "../../domain/datasource";
import { SignInResponseEntity } from "../../domain/entities";
import { HttpClientService } from "../../../../../core/services";
import { EmailVO, PasswordVO } from "../../domain/value-objects";

@Injectable({ providedIn: 'root' })
export class SignInDatasourceImpl implements SignInDatasource {

    private httpClient = inject(HttpClientService);

    async signIn(email: EmailVO, password: PasswordVO): Promise<ApiResponse<SignInResponseEntity>> {
        return await firstValueFrom( this.httpClient.post<ApiResponse<SignInResponseEntity>>( '/auth/singIn', { 
            email   : email.getValue(), 
            password: password.getValue() 
        } ).pipe(
                catchError(error => {
                    return throwError( () => new Error(error) );
                })
            )
        );
    }
}