import { Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { RegisterResponseEntity, RegisterRepository, RegisterCompleteEntity, } from "@app/auth/register/domain";

@Injectable({ providedIn: 'root' })
export class RegisterCompleteUsecase {

    constructor( private registerRepository: RegisterRepository ) {}

    execute(  userNewComplete:RegisterCompleteEntity ):Promise<ApiResponse<RegisterResponseEntity>> {
        return this.registerRepository.registerComplete( userNewComplete );
    }
}