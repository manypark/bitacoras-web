import { Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { RegisterRepository, UploadImageEntity, UploadImageResponseEntity, } from "@app/auth/register/domain";

@Injectable({ providedIn: 'root' })
export class UploadImageProfileUsecase {
    constructor( private registerRepository: RegisterRepository ) {}
    execute(  data:UploadImageEntity ):Promise<ApiResponse<UploadImageResponseEntity>> {
        return this.registerRepository.uploadImageProfile( data );
    }
}