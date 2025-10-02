import { RolesEntity } from "@app/roles/domain/entities";
import { RolesResponseDto } from "@app/roles/infrastructure/dtos";

export class RolesMapper {

    static toEntity( dto:RolesResponseDto ):RolesEntity {
        return { ...dto };
    }

    static toDto( dto:RolesEntity ):RolesResponseDto {
        return { ...dto };
    }
}