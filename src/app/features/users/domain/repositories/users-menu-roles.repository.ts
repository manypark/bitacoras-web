import { Observable } from "rxjs";
import { ApiResponse } from "@utils/api_response";

import { UsersEntity } from "@app/tasks/domain/entities";
import { UpdateUserEntity, UsersMenuRolesEntity } from "@app/users/domain/entities";

export abstract class UsersMenuRolesRepository {
    abstract getUsersRolesList():Promise<ApiResponse<UsersMenuRolesEntity[]>>;
    abstract getUserInfo( idUser:number ):Promise<ApiResponse<UsersEntity>>;
    abstract updateUser( idUser:number, data:UpdateUserEntity ):Promise<ApiResponse<any>>;
    abstract deleteUser( idUser:number ):Observable<ApiResponse<void>>;
}