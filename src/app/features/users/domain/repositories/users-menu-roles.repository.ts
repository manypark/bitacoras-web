import { Observable } from "rxjs";
import { ApiResponse } from "@utils/api_response";

import { UsersEntity } from "@app/tasks/domain/entities";
import { CreateUserMenuRolesEntity, UsersMenuRolesEntity } from "@app/users/domain/entities";

export abstract class UsersMenuRolesRepository {
    abstract getUsersRolesList():Promise<ApiResponse<UsersMenuRolesEntity[]>>;
    abstract createUserMenuRoles( data:CreateUserMenuRolesEntity ):Promise<ApiResponse<any[]>>;
    abstract updateUserMenuRoles( data:CreateUserMenuRolesEntity ):Promise<ApiResponse<any[]>>;
    abstract getUserInfo( idUser:number ):Promise<ApiResponse<UsersEntity>>;
    abstract deleteUser( idUser:number ):Observable<ApiResponse<void>>;
}