import { Observable } from "rxjs";
import { HttpResourceRef } from "@angular/common/http";

import { ApiResponse } from "@utils/api_response";
import { RolesEntity, RolesInfoEntity, MenuListResponseEntity } from "@app/roles/domain/entities";

export abstract class RolesRepository {
    abstract getAllRoles(limit: number, offset: number):Promise<ApiResponse<RolesEntity[]>>;
    abstract getAllRolesInfo():HttpResourceRef<ApiResponse<RolesInfoEntity>>;
    abstract getMenuList():Promise<ApiResponse<MenuListResponseEntity[]>>;
    abstract createNewRol( role:RolesEntity ):Observable<ApiResponse<RolesEntity>>;
    abstract updateRole( role:RolesEntity ):Observable<ApiResponse<RolesEntity>>;
    abstract deleteRole( idRole:number ):Observable<void>;
}