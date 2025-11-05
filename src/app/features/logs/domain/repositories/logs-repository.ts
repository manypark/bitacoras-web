import { ApiResponse } from "@utils/api_response";
import { LogsEntity, LogsParamsEntity } from "@app/logs/domain/entities";

export abstract class LogsRepository {
    abstract getLogsList( params:LogsParamsEntity ):Promise<ApiResponse<LogsEntity[]>>;
}