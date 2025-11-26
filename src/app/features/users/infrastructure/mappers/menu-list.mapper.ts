import { MenuListResponseEntity} from "@app/users/domain/entities";
import { MenuListResponseDto } from "@app/users/infrastructure/dtos/responses";

export class MenuRolesMapper {
    static fromResponseDto( dto:MenuListResponseDto ):MenuListResponseEntity {
        return { ...dto };
    }
}