import { GeneralInfoEntity } from "@app/dashboards/domain/entities";
import { GeneralInfoResponseDto } from "@app/dashboards/infrastructure/dtos";

export class GeneralInfoMapper {
  static fromResponseDto( dto : GeneralInfoResponseDto) : GeneralInfoEntity {
    return { ...dto };
  }
}