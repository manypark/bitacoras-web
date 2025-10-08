import { Injectable } from "@angular/core";
import { HttpResourceRef } from "@angular/common/http";

import { ApiResponse } from "@utils/api_response";
import { RolesEntity, RolesRepository } from "@app/roles/domain";
import { RolesDatasource } from "@app/roles/infrastructure/datasource";

@Injectable({ providedIn: 'root'})
export class RolesRepositoryImpl implements RolesRepository {

    constructor( private datasource:RolesDatasource ) {}
    
    updateRole(role: RolesEntity): Promise<ApiResponse<RolesEntity>> {
        return this.datasource.updateRole(role);
    }

    getAllRoles(): HttpResourceRef<ApiResponse<RolesEntity[]>> {
        return this.datasource.getAllRoles();
    }
}