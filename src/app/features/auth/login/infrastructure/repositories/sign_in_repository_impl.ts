import { Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { SignInDatasourceImpl } from "@app/auth/login/infrastructure/datasource";
import { SignInResponseEntity, SignInRepository, EmailVO, PasswordVO } from "@app/auth/login/domain";

@Injectable({ providedIn: 'root' })
export class SignInRepositoryImpl implements SignInRepository {

    constructor( private signInDataSource:SignInDatasourceImpl ){}

    signIn(email: EmailVO, password: PasswordVO): Promise<ApiResponse<SignInResponseEntity>> {
        return this.signInDataSource.signIn( email, password );
    }
}