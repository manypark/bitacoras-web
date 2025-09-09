import { Observable } from "rxjs";

import { EmailVO, PasswordVO } from "../value-objects";
import { SignInResponseEntity } from "../entities/sign_in_entity";
import { InjectionToken } from "@angular/core";

export interface SignInRepository {
    signIn(  email:EmailVO, password:PasswordVO ):Observable<SignInResponseEntity>;
}

export const SIGN_IN_REPOSITORY = new InjectionToken<SignInRepository>(
  'SignInRepository'
);