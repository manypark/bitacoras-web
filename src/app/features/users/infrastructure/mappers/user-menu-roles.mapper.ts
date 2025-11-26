import { UsersMenuRolesEntity } from "@app/users/domain/entities";
import { UsersMenuRolesDto } from "@app/users/infrastructure/dtos";

export class UserMenuRolesMapper {
    static fromResponseDto( dto:UsersMenuRolesDto ):UsersMenuRolesEntity {
        return { ...dto };
    }
}