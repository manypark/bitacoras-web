import { Observable } from "rxjs";
import { ApiResponse } from "@utils/api_response";

import { CreateUserMenuRolesEntity, UsersMenuRolesEntity } from "@app/users/domain/entities";

export abstract class UsersMenuRolesRepository {
    abstract getUsersRolesList():Promise<ApiResponse<UsersMenuRolesEntity[]>>;
    abstract createUserMenuRoles( data:CreateUserMenuRolesEntity ):Promise<ApiResponse<any[]>>;
    abstract updateUserMenuRoles( data:CreateUserMenuRolesEntity ):Promise<ApiResponse<any[]>>;
    abstract deleteUser( idUser:number ):Observable<ApiResponse<void>>;
}