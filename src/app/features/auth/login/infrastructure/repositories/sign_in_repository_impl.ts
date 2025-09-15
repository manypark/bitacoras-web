import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { SignInDatasourceImpl } from "../datasource";
import { ApiResponse } from "../../../../../core/utils";
import { SignInResponseEntity } from "../../domain/entities";
import { SignInRepository } from "../../domain/repositories";
import { EmailVO, PasswordVO } from "../../domain/value-objects";

@Injectable({ providedIn: 'root' })
export class SignInRepositoryImpl implements SignInRepository {

    constructor( private signInDataSource:SignInDatasourceImpl ){}

    signIn(email: EmailVO, password: PasswordVO): Promise<ApiResponse<SignInResponseEntity>> {
        return this.signInDataSource.signIn( email, password );
    }

}