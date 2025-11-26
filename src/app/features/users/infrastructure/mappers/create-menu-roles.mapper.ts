import { CreateUserMenuRolesEntity } from "@app/users/domain/entities";
import { CreateUserMenuRolesDto } from "@app/users/infrastructure/dtos/request";

export class CreateUserMenuRolesMapper {
    static fromResponseDto( dto:CreateUserMenuRolesEntity ): CreateUserMenuRolesDto {
        return { ...dto };
    }
}