import { HttpResourceRef } from "@angular/common/http";

import { ApiResponse } from "@utils/api_response";
import { RolesEntity, RolesInfoEntity } from "@app/roles/domain/entities";

export abstract class RolesRepository {
    abstract getAllRoles(limit: number, offset: number):Promise<ApiResponse<RolesEntity[]>>;
    abstract getAllRolesInfo():HttpResourceRef<ApiResponse<RolesInfoEntity>>;
    abstract createNewRol( newRol:string ):Promise<ApiResponse<RolesEntity>>;
    abstract updateRole( role:RolesEntity ):Promise<ApiResponse<RolesEntity>>;
}