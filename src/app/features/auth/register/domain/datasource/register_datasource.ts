import { ApiResponse } from "@utils/index";
import { RegisterEntity, RegisterResponseEntity, RegisterCompleteEntity } from "@app/auth/register/domain/entities";

export interface RegisterDatasource {
    register( userNew:RegisterEntity ):Promise<ApiResponse<RegisterResponseEntity>>;
    registerComplete( userNewComplete:RegisterCompleteEntity ):Promise<ApiResponse<RegisterResponseEntity>>;
}