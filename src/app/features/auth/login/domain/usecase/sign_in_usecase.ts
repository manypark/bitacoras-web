import { Inject, Injectable } from "@angular/core";

import { EmailVO, PasswordVO } from "../value-objects";
import { ApiResponse } from "../../../../../core/utils";
import { SignInResponseEntity } from "../entities/index";
import { SIGN_IN_REPOSITORY, SignInRepository } from "../repositories/index";

@Injectable({ providedIn: 'root' })
export class SignInUsecase {

    constructor( @Inject(SIGN_IN_REPOSITORY) private signInRepository: SignInRepository ) {}

    execute(  email:EmailVO, password:PasswordVO ):Promise<ApiResponse<SignInResponseEntity>> {
        return this.signInRepository.signIn( email, password );
    }
}