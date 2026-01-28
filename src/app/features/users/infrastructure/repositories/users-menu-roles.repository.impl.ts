import { Injectable } from "@angular/core";

import { UsersEntity } from "@app/tasks/domain";
import { ApiResponse } from "@utils/api_response";
import { UserMenuRolesMapper } from "@app/users/infrastructure/mappers";
import { UsersMenuRolesRepository } from "@app/users/domain/repositories";
import { UserMapper } from "@app/tasks/infrastructure/mappers/user-mapper";
import { UserMenuRolesDatasource } from "@app/users/infrastructure/datasource";
import { UsersMenuRolesEntity, UpdateUserEntity } from "@app/users/domain/entities";


@Injectable({ providedIn: 'root'})
export class UsersMenuRolesRepositoryImpl implements UsersMenuRolesRepository {

    constructor( private readonly datasource:UserMenuRolesDatasource ) {}

    async getUsersRolesList( limit = 5, offset = 0 ): Promise<ApiResponse<UsersMenuRolesEntity[]>> {
        const { data, message, status } = await this.datasource.getUserMenuList( limit, offset );
        const dataMapped = data.map( userMenuRol => UserMenuRolesMapper.fromResponseDto(userMenuRol) );
        return { message, status, data: dataMapped } as ApiResponse<UsersMenuRolesEntity[]>;
    }

    async getUserInfo( idUser : number ) : Promise<ApiResponse<UsersEntity>> {
        const { message, status, data } = await this.datasource.getUserInfo( idUser );
        const dataMapped = UserMapper.fromDto(data);
        return { message, status, data:dataMapped };
    }

    deleteUser = ( idUser:number ) => this.datasource.deleteUser(idUser);

    async updateUser(idUser: number, data: UpdateUserEntity): Promise<ApiResponse<UsersEntity>> {
        return this.datasource.updateUser( idUser, data);
    }
}