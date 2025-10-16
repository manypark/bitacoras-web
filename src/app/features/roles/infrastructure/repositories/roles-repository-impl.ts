import { Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { RolesEntity, RolesInfoEntity, RolesRepository } from "@app/roles/domain";
import { RolesDatasource } from "@app/roles/infrastructure/datasource";
import { HttpResourceRef } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root'})
export class RolesRepositoryImpl implements RolesRepository {

    constructor( private datasource:RolesDatasource ) {}

    getAllRolesInfo(): HttpResourceRef<ApiResponse<RolesInfoEntity>> {
        return this.datasource.getAllRolesInfo();
    }
    
    updateRole(role: RolesEntity): Observable<ApiResponse<RolesEntity>> {
        return this.datasource.updateRole(role);
    }

    getAllRoles(limit: number, offset: number): Promise<ApiResponse<RolesEntity[]>> {
        return this.datasource.getAllRoles( limit, offset );
    }

    createNewRol(newRol: string): Observable<ApiResponse<RolesEntity>> {
        return this.datasource.createRoleObs( newRol );
    }
}