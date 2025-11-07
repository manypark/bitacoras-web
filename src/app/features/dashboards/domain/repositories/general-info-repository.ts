import { ApiResponse } from "@utils/api_response";
import { GeneralInfoEntity } from "@app/dashboards/domain/entities";

export abstract class GeneralInfoRepository {
    abstract getUsersInfo():Promise<ApiResponse<GeneralInfoEntity>>;
    abstract getRolesInfo():Promise<ApiResponse<GeneralInfoEntity>>;
    abstract getTasksInfo():Promise<ApiResponse<GeneralInfoEntity>>;
    abstract getLogsInfo():Promise<ApiResponse<GeneralInfoEntity>>;
}