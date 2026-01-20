import { Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { RegisterResponseEntity, RegisterRepository, RegisterEntity, } from "@app/auth/register/domain";

@Injectable({ providedIn: 'root' })
export class RegisterUsecase {

    constructor( private registerRepository: RegisterRepository ) {}

    execute(  userNew:RegisterEntity ):Promise<ApiResponse<RegisterResponseEntity>> {
        return this.registerRepository.register( userNew );
    }
}