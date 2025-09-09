import { Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";

import { EmailVO, PasswordVO } from "../value-objects";
import { SignInResponseEntity } from "../entities/index";
import { SIGN_IN_REPOSITORY, SignInRepository } from "../repositories/index";

@Injectable({ providedIn: 'root' })
export class SignInUsecase {

    constructor( @Inject(SIGN_IN_REPOSITORY) private signInRepository: SignInRepository ) {}

    execute(  email:EmailVO, password:PasswordVO ):Observable<SignInResponseEntity> {
        return this.signInRepository.signIn( email, password );
    }
}