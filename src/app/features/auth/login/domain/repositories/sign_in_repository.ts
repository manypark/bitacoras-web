import { Signal } from "@angular/core";

import { EmailVO, PasswordVO } from "../value-objects";
import { SignInResponseEntity } from "../entities/sign_in_entity";

export interface SignInRepository {
    signIn(  email:EmailVO, password:PasswordVO ):Signal<SignInResponseEntity>;
}