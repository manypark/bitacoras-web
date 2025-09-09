import { Observable } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { catchError } from "rxjs/internal/operators/catchError";
import { throwError } from "rxjs/internal/observable/throwError";

import { SignInDatasource } from "../../domain/datasource";
import { SignInResponseEntity } from "../../domain/entities";
import { HttpClientService } from "../../../../../core/services";
import { EmailVO, PasswordVO } from "../../domain/value-objects";

@Injectable({ providedIn: 'root' })
export class SignInDatasourceImpl implements SignInDatasource {

    private httpClient = inject(HttpClientService);

    signIn(email: EmailVO, password: PasswordVO): Observable<SignInResponseEntity> {
        return this.httpClient.post<SignInResponseEntity>( '/auth/singIn', { 
            email   : email.getValue(), 
            password: password.getValue() 
        } ).pipe(
            catchError(error => {
                return throwError( () => new Error(error) );
            })
        );
    }

}