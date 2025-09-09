import { Signal } from "@angular/core";

import { EmailVO, PasswordVO } from "../value-objects/index";
import { SignInResponseEntity } from "../entities/sign_in_entity";

export interface SignInDatasource {
    signIn( email:EmailVO, password:PasswordVO ):Signal<SignInResponseEntity>;
}