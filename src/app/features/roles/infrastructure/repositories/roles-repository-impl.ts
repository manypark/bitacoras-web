import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpResourceRef } from "@angular/common/http";

import { ApiResponse } from "@utils/api_response";
import { RolesDatasource } from "@app/roles/infrastructure/datasource";
import { MenuRolesMapper } from "@app/roles/infrastructure/mappers/menu-list.mapper";
import { MenuListResponseEntity, RolesEntity, RolesInfoEntity, RolesRepository } from "@app/roles/domain";

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

    async getMenuList( limit = 5, offset = 0 ): Promise<ApiResponse<MenuListResponseEntity[]>> {
        const { data, message, status } = await this.datasource.getMenuList( limit, offset );
        const dataMapped = data.map( userMenuRol => MenuRolesMapper.fromResponseDto(userMenuRol) );
        return { message, status, data: dataMapped } as ApiResponse<MenuListResponseEntity[]>;
    }

    createNewRol(newRol: string): Observable<ApiResponse<RolesEntity>> {
        return this.datasource.createRoleObs( newRol );
    }

    deleteRole( idRole:number ): Observable<void> {
        return this.datasource.deleteRole( idRole );
    }
}