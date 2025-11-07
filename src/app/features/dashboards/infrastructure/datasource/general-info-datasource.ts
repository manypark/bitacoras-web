import { inject, Injectable } from "@angular/core";
import { catchError, firstValueFrom, throwError } from "rxjs";

import { ApiResponse } from "@utils/api_response";
import { HttpClientService } from "../../../../core/services";
import { GeneralInfoResponseDto } from "@app/dashboards/infrastructure/dtos";

@Injectable({ providedIn: 'root'})
export class GeneralInfoDatasource {

    private httpClient = inject(HttpClientService);

    async getUsersInfo():Promise<ApiResponse<GeneralInfoResponseDto>> {
        return await firstValueFrom(
            this.httpClient.get<ApiResponse<GeneralInfoResponseDto>>('/users/info').pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            ),
        );
    }
    
    async getRolesInfo():Promise<ApiResponse<GeneralInfoResponseDto>> {
        return await firstValueFrom(
            this.httpClient.get<ApiResponse<GeneralInfoResponseDto>>('/roles/info').pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            ),
        );
    }

    async getTasksInfo():Promise<ApiResponse<GeneralInfoResponseDto>> {
        return await firstValueFrom(
            this.httpClient.get<ApiResponse<GeneralInfoResponseDto>>('/tasks/info').pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            ),
        );
    }

    async getLogsInfo():Promise<ApiResponse<GeneralInfoResponseDto>> {
        return await firstValueFrom(
            this.httpClient.get<ApiResponse<GeneralInfoResponseDto>>('/logs/info').pipe(
                catchError(error =>  throwError( () => new Error(error.error.message[0]) ) ),
            ),
        );
    }   
}