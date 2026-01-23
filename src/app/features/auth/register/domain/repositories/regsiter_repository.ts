import { ApiResponse } from "@utils/index";
import { 
    RegisterEntity, 
    RegisterResponseEntity, 
    RegisterCompleteEntity, 
    UploadImageEntity, 
    UploadImageResponseEntity,
} from "@app/auth/register/domain/entities";

export abstract class RegisterRepository {
    abstract register( userNew:RegisterEntity ):Promise<ApiResponse<RegisterResponseEntity>>;
    abstract uploadImageProfile( data:UploadImageEntity ):Promise<ApiResponse<UploadImageResponseEntity>>;
    abstract registerComplete( userNewComplete:RegisterCompleteEntity ):Promise<ApiResponse<RegisterResponseEntity>>;
}