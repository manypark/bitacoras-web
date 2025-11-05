import { Injectable } from "@angular/core";

import { ApiResponse } from "@utils/api_response";
import { LogsListDatasource } from "@app/logs/infrastructure/datasource";
import { LogsEntity, LogsParamsEntity, LogsRepository } from "@app/logs/domain";

@Injectable({ providedIn: 'root'})
export class LogsListRepositoryImpl implements LogsRepository {

    constructor( private readonly datasource:LogsListDatasource ) {}

    getLogsList( params:LogsParamsEntity ): Promise<ApiResponse<LogsEntity[]>> {
        return this.datasource.getLogsList( params );
    }
}