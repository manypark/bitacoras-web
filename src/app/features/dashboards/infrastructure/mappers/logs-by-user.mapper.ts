import { LogsByUserEntity } from "@app/dashboards/domain/entities";
import { LogsByUserDto } from "@app/dashboards/infrastructure/dtos";

export class LogsByUserMapper {
  static fromResponseDto( dto : LogsByUserDto ) : LogsByUserEntity {
    return { ...dto };
  }
}