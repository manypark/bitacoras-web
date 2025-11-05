import { catchError, firstValueFrom, throwError } from "rxjs";

import { ApiResponse } from "@utils/api_response";
import { inject, Injectable } from "@angular/core";
import { HttpClientService } from "../../../../core/services";
import { LogsEntity, LogsParamsEntity } from "@app/logs/domain";

@Injectable({ providedIn: 'root'})
export class LogsListDatasource {

    private httpClient = inject(HttpClientService);

    async getLogsList( params: LogsParamsEntity ) {
        return await firstValueFrom( this.httpClient.get<ApiResponse<LogsEntity[]>>('/logs/by-user',  { params: { ...params } }).pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            )
        );
    }   
}