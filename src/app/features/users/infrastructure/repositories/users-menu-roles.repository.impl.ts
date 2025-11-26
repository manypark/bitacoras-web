import { Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { UsersMenuRolesRepository } from "@app/users/domain/repositories";
import { UserMenuRolesDatasource } from "@app/users/infrastructure/datasource";
import { CreateUserMenuRolesMapper, MenuRolesMapper, UserMenuRolesMapper } from "@app/users/infrastructure/mappers";
import { UsersMenuRolesEntity, MenuListResponseEntity, CreateUserMenuRolesEntity } from "@app/users/domain/entities";

@Injectable({ providedIn: 'root'})
export class UsersMenuRolesRepositoryImpl implements UsersMenuRolesRepository {

    constructor( private readonly datasource:UserMenuRolesDatasource ) {}

    async getUsersRolesList( limit = 5, offset = 0 ): Promise<ApiResponse<UsersMenuRolesEntity[]>> {
        const { data, message, status } = await this.datasource.getUserMenuList( limit, offset );
        const dataMapped = data.map( userMenuRol => UserMenuRolesMapper.fromResponseDto(userMenuRol) );
        return { message, status, data: dataMapped } as ApiResponse<UsersMenuRolesEntity[]>;
    }

    async getMenuList( limit = 5, offset = 0 ): Promise<ApiResponse<MenuListResponseEntity[]>> {
        const { data, message, status } = await this.datasource.getMenuList( limit, offset );
        const dataMapped = data.map( userMenuRol => MenuRolesMapper.fromResponseDto(userMenuRol) );
        return { message, status, data: dataMapped } as ApiResponse<MenuListResponseEntity[]>;
    }

    async createUserMenuRoles( createMenuUserRole:CreateUserMenuRolesEntity ) : Promise<ApiResponse<any[]>> {
        const createMenuUserRoleMapped = CreateUserMenuRolesMapper.fromResponseDto( createMenuUserRole );
        return this.datasource.createUserMenuRoles( createMenuUserRoleMapped );
    }

    async updateUserMenuRoles( updateMenuUserRole: CreateUserMenuRolesEntity): Promise<ApiResponse<any[]>> {
        const createMenuUserRoleMapped = CreateUserMenuRolesMapper.fromResponseDto( updateMenuUserRole );
        return this.datasource.updateUserMenuRoles( createMenuUserRoleMapped );
    }
}