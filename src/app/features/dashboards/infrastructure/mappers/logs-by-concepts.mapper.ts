import { LogsByConceptEntity } from "@app/dashboards/domain/entities";
import { LogsByConceptDTO } from "@app/dashboards/infrastructure/dtos";

export class LogsByConceptsMapper {
  static fromResponseDto( dto : LogsByConceptDTO ) : LogsByConceptEntity {
    return { ...dto };
  }
}