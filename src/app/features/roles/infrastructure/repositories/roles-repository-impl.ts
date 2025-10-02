import { Injectable } from "@angular/core";
import { HttpResourceRef } from "@angular/common/http";

import { ApiResponse } from "@utils/api_response";
import { RolesEntity, RolesRepository } from "@app/roles/domain";
import { RolesDatasource } from "@app/roles/infrastructure/datasource";

@Injectable({ providedIn: 'root'})
export class RolesRepositoryImpl implements RolesRepository {

    constructor( private datasource:RolesDatasource ) {}

    getAllRoles(): HttpResourceRef<ApiResponse<RolesEntity[]>> {
        return this.datasource.getAllRoles();
    }
}