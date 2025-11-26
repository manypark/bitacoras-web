import { ApiResponse } from "@utils/api_response";
import { CreateUserMenuRolesEntity, MenuListResponseEntity, UsersMenuRolesEntity } from "@app/users/domain/entities";

export abstract class UsersMenuRolesRepository {
    abstract getUsersRolesList():Promise<ApiResponse<UsersMenuRolesEntity[]>>;
    abstract getMenuList():Promise<ApiResponse<MenuListResponseEntity[]>>;
    abstract createUserMenuRoles( data:CreateUserMenuRolesEntity ):Promise<ApiResponse<any[]>>;
    abstract updateUserMenuRoles( data:CreateUserMenuRolesEntity ):Promise<ApiResponse<any[]>>;
}