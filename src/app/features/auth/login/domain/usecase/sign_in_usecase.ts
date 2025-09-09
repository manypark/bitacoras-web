import { Injectable, Signal } from "@angular/core";

import { EmailVO, PasswordVO } from "../value-objects";
import { SignInRepository } from "../repositories/index";
import { SignInResponseEntity } from "../entities/index";

export class SignInUsecase {

    constructor( private signInRepository:SignInRepository ) {}

    execute(  email:EmailVO, password:PasswordVO ):Signal<SignInResponseEntity> {
        return this.signInRepository.signIn( email, password );
    }
}