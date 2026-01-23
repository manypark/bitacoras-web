import { Injectable } from "@angular/core";

import { RegisterRepository, UploadImageEntity, UploadImageResponseEntity, } from "@app/auth/register/domain";

@Injectable({ providedIn: 'root' })
export class UploadImageProfileUsecase {
    constructor( private registerRepository: RegisterRepository ) {}
    execute(  data:UploadImageEntity ):Promise<UploadImageResponseEntity> {
        return this.registerRepository.uploadImageProfile( data );
    }
}