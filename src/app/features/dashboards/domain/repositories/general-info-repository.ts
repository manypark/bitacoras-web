import { ApiResponse } from "@utils/api_response";
import { GeneralInfoEntity, LogsByConceptEntity, LogsByUserEntity } from "@app/dashboards/domain/entities";

export abstract class GeneralInfoRepository {
    abstract getLogsInfo():Promise<ApiResponse<GeneralInfoEntity>>;
    abstract getRolesInfo():Promise<ApiResponse<GeneralInfoEntity>>;
    abstract getTasksInfo():Promise<ApiResponse<GeneralInfoEntity>>;
    abstract getUsersInfo():Promise<ApiResponse<GeneralInfoEntity>>;

    abstract getLogsByConcept( idConcepts:string ):Promise<ApiResponse<LogsByConceptEntity[]>>;
    abstract getLogsByUser( date:string, idUserAssigned:string ):Promise<ApiResponse<LogsByUserEntity[]>>;
}