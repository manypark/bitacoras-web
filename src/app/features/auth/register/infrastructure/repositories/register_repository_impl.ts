import { Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { RegisterDatasourceImpl } from "@app/auth/register/infrastructure/datasource";
import { 
    RegisterCompleteEntity, 
    RegisterEntity, 
    RegisterRepository, 
    RegisterResponseEntity, 
    UploadImageEntity, 
    UploadImageResponseEntity,
} from "@app/auth/register/domain";

@Injectable({ providedIn: 'root' })
export class RegsiterRepositoryImpl implements RegisterRepository {

    constructor( private registerDatasource:RegisterDatasourceImpl) {}

    uploadImageProfile(data: UploadImageEntity): Promise<ApiResponse<UploadImageResponseEntity>> {
        return this.registerDatasource.uploadImageProfile(data);
    }

    register( userNew: RegisterEntity ): Promise<ApiResponse<RegisterResponseEntity>> {
        return this.registerDatasource.register(userNew);
    }

    registerComplete( userNewComplete : RegisterCompleteEntity): Promise<ApiResponse<RegisterResponseEntity>> {
        return this.registerDatasource.registerComplete(userNewComplete);
    }
}