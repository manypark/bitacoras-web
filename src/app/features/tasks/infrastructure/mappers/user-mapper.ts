import { UsersEntity } from "@app/tasks/domain";
import { UserResponseDto } from "@app/tasks/infrastructure/dtos/response/user_response.dto";

export class UserMapper {
    
  static fromDto(dto: UserResponseDto): UsersEntity {
    return new UsersEntity(
      dto.idUser,
      dto.user,
      dto.email,
      dto.active,
      dto.avatarUrl,
      dto.menuList,
      dto.rolesList,
    );
  }

  static toDto(entity: UsersEntity): UserResponseDto {
    return {
      idUser: entity.idUser,
      user: entity.user,
      email: entity.email,
      active: entity.active,
      avatarUrl: entity.avatarUrl,
      menuList: entity.menuList,
      rolesList: entity.rolesList,
    };
  }
}