import { InjectionToken } from "@angular/core";

import { ApiResponse } from "@utils/index";
import { PasswordVO, EmailVO } from "@app/auth/login/domain/domain";
import { FirstNameVO, LastNameVO, RegisterResponseEntity } from "@app/auth/register/domain";

export interface RegisterRepository {
    register( 
        firstName   :FirstNameVO,
        lastName    :LastNameVO,
        email       :EmailVO, 
        password    :PasswordVO,
    ):Promise<ApiResponse<RegisterResponseEntity>>;
}


export const REGISTER_REPOSITORY = new InjectionToken<RegisterRepository>(
  'RegisterRepository'
);