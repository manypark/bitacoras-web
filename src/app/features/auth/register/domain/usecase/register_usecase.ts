import { Inject, Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { EmailVO, PasswordVO } from "@app/auth/login/domain/value-objects";
import { 
    FirstNameVO, LastNameVO, RegisterResponseEntity,  REGISTER_REPOSITORY, RegisterRepository,
} from "@app/auth/register/domain";

@Injectable({ providedIn: 'root' })
export class RegisterUsecase {

    constructor( @Inject(REGISTER_REPOSITORY) private registerRepository: RegisterRepository ) {}

    execute( firstName:FirstNameVO, lastName:LastNameVO, email:EmailVO, password:PasswordVO ):Promise<ApiResponse<RegisterResponseEntity>> {
        return this.registerRepository.register( firstName, lastName, email, password );
    }
}