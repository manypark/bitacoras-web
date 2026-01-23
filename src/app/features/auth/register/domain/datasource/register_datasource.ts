import { ApiResponse } from "@utils/index";
import { 
    RegisterEntity, 
    RegisterResponseEntity, 
    RegisterCompleteEntity, 
    UploadImageEntity, 
    UploadImageResponseEntity,
} from "@app/auth/register/domain/entities";

export interface RegisterDatasource {
    register( userNew:RegisterEntity ):Promise<ApiResponse<RegisterResponseEntity>>;
    uploadImageProfile( data:UploadImageEntity ):Promise<UploadImageResponseEntity>;
    registerComplete( userNewComplete:RegisterCompleteEntity ):Promise<ApiResponse<RegisterResponseEntity>>;
}