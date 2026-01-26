import { MenuListResponseDto } from "@app/roles/infrastructure/dtos";
import { MenuListResponseEntity } from "@app/roles/domain/entities/menu-list.entity";

export class MenuRolesMapper {
    static fromResponseDto( dto:MenuListResponseDto ):MenuListResponseEntity {
        return { ...dto };
    }
}