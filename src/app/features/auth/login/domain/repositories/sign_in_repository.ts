import { InjectionToken } from "@angular/core";

import { EmailVO, PasswordVO } from "../value-objects";
import { ApiResponse } from "../../../../../core/utils";
import { SignInResponseEntity } from "../entities/sign_in_entity";

export interface SignInRepository {
    signIn(  email:EmailVO, password:PasswordVO ):Promise<ApiResponse<SignInResponseEntity>>;
}

export const SIGN_IN_REPOSITORY = new InjectionToken<SignInRepository>(
  'SignInRepository'
);