import { ApiResponse } from "@utils/api_response";
import { CreateUserMenuRolesEntity, MenuListEntity, UsersMenuRolesEntity } from "@app/users/domain/entities";

export abstract class UsersMenuRolesRepository {
    abstract getMenuList():Promise<ApiResponse<MenuListEntity[]>>;
    abstract getUsersList():Promise<ApiResponse<UsersMenuRolesEntity[]>>;
    abstract createUserMenuList( data:CreateUserMenuRolesEntity ):Promise<ApiResponse<any[]>>;
    abstract updateUserMenuList( data:CreateUserMenuRolesEntity ):Promise<ApiResponse<any[]>>;
}