import { UsersEntity } from "@app/tasks/domain";
import { UserResponseDto } from "@app/tasks/infrastructure/dtos/response/user_response.dto";

export class UserMapper {
    
  static fromDto(dto: UserResponseDto): UsersEntity {
    return new UsersEntity(
      dto.idUser,
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.active,
      dto.avatarUrl,
    );
  }

  static toDto(entity: UsersEntity): UserResponseDto {
    return {
      idUser: entity.idUser,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      active: entity.active,
      avatarUrl: entity.avatarUrl,
    };
  }
}