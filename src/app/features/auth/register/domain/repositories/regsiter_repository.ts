import { ApiResponse } from "@utils/index";
import { RegisterEntity, RegisterResponseEntity, RegisterCompleteEntity } from "@app/auth/register/domain/entities";

export abstract class RegisterRepository {
    abstract register( userNew:RegisterEntity ):Promise<ApiResponse<RegisterResponseEntity>>;
    abstract registerComplete( userNewComplete:RegisterCompleteEntity ):Promise<ApiResponse<RegisterResponseEntity>>;
}