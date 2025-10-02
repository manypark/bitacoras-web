import { Injectable } from "@angular/core";

import { EmailVO, PasswordVO } from "../value-objects";
import { ApiResponse } from "../../../../../core/utils";
import { SignInResponseEntity } from "../entities/index";
import { SignInRepository } from "@app/auth/login/domain/repositories";

@Injectable({ providedIn: 'root' })
export class SignInUsecase {

    constructor( private signInRepository: SignInRepository ) {}

    execute(  email:EmailVO, password:PasswordVO ):Promise<ApiResponse<SignInResponseEntity>> {
        return this.signInRepository.signIn( email, password );
    }
}