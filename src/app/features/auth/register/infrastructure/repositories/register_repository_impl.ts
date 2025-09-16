import { Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { EmailVO, PasswordVO } from "@app/auth/login/domain";
import { RegisterDatasourceImpl } from "@app/auth/register/infrastructure/datasource";
import { FirstNameVO, LastNameVO, RegisterRepository, RegisterResponseEntity } from "@app/auth/register/domain";

@Injectable({ providedIn: 'root' })
export class RegsiterRepositoryImpl implements RegisterRepository {

    constructor( private registerDatasource:RegisterDatasourceImpl) {}

    register(
        firstName   : FirstNameVO, 
        lastName    : LastNameVO, 
        email       : EmailVO, 
        password    : PasswordVO,
    ): Promise<ApiResponse<RegisterResponseEntity>> {
        return this.registerDatasource.register( firstName, lastName, email, password );
    }
}